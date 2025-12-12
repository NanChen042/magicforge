import { ref, reactive, watch } from 'vue';
import DeepseekClient from '../services/DeepseekClient';
import { API_CONFIG, updateApiConfig } from '../services/deepseekService';

/**
 * Deepseek API Hooks
 * 提供统一的API请求封装和状态管理
 */
export function useDeepseekApi() {
  // 基础配置
  const apiKey = ref(API_CONFIG.apiKey);
  const apiUrl = ref(API_CONFIG.baseUrl);
  const isProcessing = ref(false);
  const error = ref('');
  const streamProgress = ref(0);
  const isThinking = ref(false);

  // 聊天历史
  const conversationHistory = reactive<Array<{role: string; content: string}>>([]);

  // 思维链内容
  const reasoningContent = ref('');

  // 添加控制器引用，用于中止请求
  const abortController = ref<AbortController | null>(null);

  // 跟踪最近一条消息是否被手动停止
  const isLastMessageStopped = ref(false);

  // 同步API配置变化
  watch(apiUrl, (newUrl) => {
    if (newUrl && newUrl !== API_CONFIG.baseUrl) {
      updateApiConfig({ baseUrl: newUrl });
      console.log('API Hooks: 已更新API地址', newUrl);
    }
  });

  watch(apiKey, (newKey) => {
    if (newKey && newKey !== API_CONFIG.apiKey) {
      updateApiConfig({ apiKey: newKey });
      localStorage.setItem('apiKey', newKey);
      console.log('API Hooks: 已更新API Key');
    }
  });

  // 创建客户端实例
  const createClient = (options?: {
    temperature?: number;
    maxTokens?: number;
    model?: string;
  }) => {
    return new DeepseekClient({
      apiKey: apiKey.value,
      baseURL: apiUrl.value,
      temperature: options?.temperature || API_CONFIG.temperature,
      maxTokens: options?.maxTokens || API_CONFIG.maxTokens,
      model: options?.model || API_CONFIG.model
    });
  };

  // 发送聊天消息（非流式）
  const sendChatMessage = async (
    message: string,
    options?: {
      temperature?: number;
      maxTokens?: number;
      model?: string;
      systemPrompt?: string;
    }
  ) => {
    if (!message.trim()) return null;

    try {
      error.value = '';
      isProcessing.value = true;
      isThinking.value = true;

      // 添加用户消息到历史
      conversationHistory.push({
        role: 'user',
        content: message
      });

      // 准备消息列表
      const messages = [...conversationHistory];

      // 如果有系统提示，添加到最前面
      if (options?.systemPrompt) {
        messages.unshift({
          role: 'system',
          content: options.systemPrompt
        });
      }

      // 创建客户端并发送请求
      const client = createClient(options);
      let response;

      try {
        // 优先尝试使用OpenAI兼容格式
        if (client.chat?.completions?.create) {
          response = await client.chat.completions.create({
            messages,
            stream: false
          });
        } else if (client.completions?.create) {
          response = await client.completions.create({
            messages,
            stream: false
          });
        } else {
          // 直接调用chatCompletion方法
          response = await client.chatCompletion({
            messages,
            stream: false
          });
        }
      } catch (err) {
        console.error('尝试多种API调用格式均失败:', err);
        throw err;
      }

      // 处理响应
      if (response.choices && response.choices.length > 0) {
        const assistantMessage = response.choices[0].message.content;
        const reasoning = response.choices[0].message.reasoning_content;

        // 更新思维链内容
        if (reasoning) {
          reasoningContent.value = reasoning;
        }

        // 添加助手回复到历史
        conversationHistory.push({
          role: 'assistant',
          content: assistantMessage
        });

        return {
          content: assistantMessage,
          reasoning
        };
      }

      return null;
    } catch (err: any) {
      error.value = err?.message || '请求失败';
      console.error('API请求失败:', err);
      return null;
    } finally {
      isProcessing.value = false;
      isThinking.value = false;
    }
  };

  // 添加终止生成的方法
  const stopGeneration = () => {
    if (isProcessing.value) {
      // 停止处理
      isProcessing.value = false;

      // 标记最近的消息被停止
      isLastMessageStopped.value = true;

      // 如果有活跃的控制器，发送中止信号
      if (abortController.value) {
        abortController.value.abort();
        abortController.value = null;
      }

      // 重置进度
      streamProgress.value = 100;
      isThinking.value = false;
    }
  };

  // 发送聊天消息（流式）
  const streamChatMessage = async (
    message: string,
    callbacks?: {
      onContent?: (content: string) => void;
      onReasoning?: (reasoning: string) => void;
      onError?: (error: any) => void;
      onComplete?: () => void;
    },
    options?: {
      temperature?: number;
      maxTokens?: number;
      model?: string;
      systemPrompt?: string;
    }
  ) => {
    if (!message.trim()) return null;

    try {
      error.value = '';
      isProcessing.value = true;
      reasoningContent.value = '';
      streamProgress.value = 0;
      isThinking.value = true;
      // 重置停止状态
      isLastMessageStopped.value = false;

      // 创建新的abort controller
      abortController.value = new AbortController();

      // 添加用户消息到历史
      conversationHistory.push({
        role: 'user',
        content: message
      });

      // 添加AI响应占位
      const aiResponseIndex = conversationHistory.length;
      conversationHistory.push({
        role: 'assistant',
        content: ''
      });

      // 准备消息列表
      const messages = [...conversationHistory.slice(0, -1)]; // 不包含最后一个空AI响应

      // 如果有系统提示，添加到最前面
      if (options?.systemPrompt) {
        messages.unshift({
          role: 'system',
          content: options.systemPrompt
        });
      }

      // 创建客户端并发送请求
      const client = createClient(options);
      let fullContent = '';
      let fullReasoning = '';
      let isFirstContent = true;
      let isCodeBlock = false;
      let currentCodeBlock = '';
      let currentCodeLang = '';

      if (client.chat?.completions?.create) {
        const stream = await client.chat.completions.create({
          messages,
          stream: true,
          // @ts-ignore: API类型定义中可能没有包含signal属性
          signal: abortController.value.signal
        });

        for await (const chunk of stream) {
          if (!isProcessing.value) break; // 允许中途取消

          const content = chunk.choices?.[0]?.delta?.content || '';
          const reasoning = chunk.choices?.[0]?.delta?.reasoning_content || '';

          // 处理思维链内容
          if (reasoning) {
            fullReasoning += reasoning;
            reasoningContent.value = fullReasoning;

            if (callbacks?.onReasoning) {
              callbacks.onReasoning(reasoning);
            }
          }

          // 处理普通内容
          if (content) {
            // 一旦有实际内容开始生成，将思考状态设为false
            if (isFirstContent) {
              isFirstContent = false;
              isThinking.value = false;
            }

            // 检测并处理代码块开始
            if (content.includes('```') && !isCodeBlock) {
              const parts = content.split('```');
              if (parts.length > 1) {
                isCodeBlock = true;
                // 检查是否有语言标识
                const langMatch = parts[1].match(/^([a-z]+)\n/);
                if (langMatch) {
                  currentCodeLang = langMatch[1];
                  currentCodeBlock = parts[1].substring(langMatch[0].length);
                } else {
                  currentCodeLang = '';
                  currentCodeBlock = parts[1];
                }
                fullContent += parts[0] + '```' + currentCodeLang + '\n';
              } else {
                fullContent += content;
              }
            }
            // 检测代码块结束
            else if (content.includes('```') && isCodeBlock) {
              const parts = content.split('```');
              currentCodeBlock += parts[0];
              fullContent += currentCodeBlock + '```';
              if (parts.length > 1) {
                fullContent += parts[1];
              }
              isCodeBlock = false;
              currentCodeBlock = '';
              currentCodeLang = '';
            }
            // 在代码块内
            else if (isCodeBlock) {
              currentCodeBlock += content;
              fullContent += content;
            }
            // 普通文本
            else {
              fullContent += content;
            }

            // 更新对话历史
            conversationHistory[aiResponseIndex].content = fullContent;

            if (callbacks?.onContent) {
              callbacks.onContent(content);
            }
          }

          // 更新进度（模拟，实际API可能没有进度信息）
          streamProgress.value = Math.min(streamProgress.value + 1, 99);
        }
      }

      // 完成
      streamProgress.value = 100;
      isProcessing.value = false;
      isThinking.value = false;

      // 流式响应完成
      if (callbacks?.onComplete) {
        // 如果有推理内容，设置一个短暂延迟让用户看到推理过程后再切换到最终结果
        if (fullReasoning && fullReasoning.length > 0) {
          setTimeout(() => {
            callbacks.onComplete?.();
          }, 500);
        } else {
          callbacks.onComplete();
        }
      }

      return {
        content: fullContent,
        reasoning: fullReasoning
      };
    } catch (err: any) {
      // 判断是否为用户主动中止的请求
      if (err.name === 'AbortError') {
        console.log('请求被用户中止');
        // 可以选择不设置错误信息，因为这是预期行为
      } else {
        console.error('Stream请求出错:', err);
        error.value = `请求失败: ${err.message || JSON.stringify(err)}`;

        if (callbacks?.onError) {
          callbacks.onError(err);
        }
      }

      isProcessing.value = false;
      isThinking.value = false;
      return null;
    } finally {
      // 清理控制器
      abortController.value = null;
    }
  };

  // 清空历史
  const clearHistory = () => {
    conversationHistory.splice(0, conversationHistory.length);
    reasoningContent.value = '';
    error.value = '';
  };

  return {
    // 状态
    apiKey,
    apiUrl,
    isProcessing,
    error,
    streamProgress,
    conversationHistory,
    reasoningContent,
    isThinking,
    isLastMessageStopped,

    // 方法
    sendChatMessage,
    streamChatMessage,
    clearHistory,
    createClient,
    stopGeneration
  };
}

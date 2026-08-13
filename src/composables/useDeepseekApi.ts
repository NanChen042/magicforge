import { ref, reactive, watch } from 'vue';
import { storeToRefs } from 'pinia';
import DeepseekClient from '../services/DeepseekClient';
import { API_CONFIG, updateApiConfig } from '../services/deepseekService';
import { useApiStore } from '@/stores/api';
import { getModelCapabilities } from '@/constants/modelConfig';

/**
 * Deepseek API Hooks
 * 提供统一的API请求封装和状态管理
 */
export function useDeepseekApi() {
  // 基础配置
  const apiStore = useApiStore();
  const { apiKey, apiUrl } = storeToRefs(apiStore);
  const isProcessing = ref(false);
  const error = ref('');
  const streamProgress = ref(0);
  const isThinking = ref(false);

  // 聊天历史
  const conversationHistory = reactive<Array<{role: string; content: string; reasoning?: string; images?: string[]; usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number; cache_hit_tokens?: number }}>>([]);

  // 思维链内容
  const reasoningContent = ref('');

  // 添加控制器引用，用于中止请求
  const abortController = ref<AbortController | null>(null);

  // 跟踪最近一条消息是否被手动停止
  const isLastMessageStopped = ref(false);

  // 同步API配置变化
  watch(apiUrl, (newUrl) => {
    if (newUrl && newUrl !== API_CONFIG.baseUrl) {
      apiStore.setApiUrl(newUrl);
      console.log('API Hooks: 已更新API地址', newUrl);
    }
  });

  watch(apiKey, (newKey) => {
    if (newKey !== API_CONFIG.apiKey) {
      apiStore.setApiKey(newKey);
      console.log('API Hooks: 已更新API Key');
    }
  });

  // 创建客户端实例
  const createClient = (options?: {
    temperature?: number;
    maxTokens?: number;
    model?: string;
    topP?: number;
    topK?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
  }) => {
    const model = options?.model ?? API_CONFIG.model;
    const capabilities = getModelCapabilities(model);
    return new DeepseekClient({
      apiKey: apiKey.value,
      baseURL: apiUrl.value,
      temperature: options?.temperature ?? API_CONFIG.temperature,
      maxTokens: options?.maxTokens ?? API_CONFIG.maxTokens,
      model,
      topP: capabilities.topP ? options?.topP : undefined,
      topK: capabilities.topK ? options?.topK : undefined,
      frequencyPenalty: capabilities.frequencyPenalty ? options?.frequencyPenalty : undefined,
      presencePenalty: capabilities.presencePenalty ? options?.presencePenalty : undefined
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
      topP?: number;
      topK?: number;
      frequencyPenalty?: number;
      presencePenalty?: number;
      images?: Array<{ base64: string; mimeType?: string }>;
      imageUrls?: string[]; // 图片预览 URL，用于显示在对话中
    }
  ) => {
    if (!message.trim()) return null;

    try {
      error.value = '';
      isProcessing.value = true;
      isThinking.value = true;

      // 构建用户消息内容（支持图片）
      let userContent: string | Array<{ type: string; text?: string; image_url?: { url: string } }> = message;
      
      if (options?.images && options.images.length > 0) {
        userContent = [
          // 先添加图片
          ...options.images.map(img => ({
            type: 'image_url' as const,
            image_url: {
              url: `data:${img.mimeType || 'image/jpeg'};base64,${img.base64}`
            }
          })),
          // 再添加文本
          { type: 'text' as const, text: message }
        ];
      }

      // 添加用户消息到历史
      conversationHistory.push({
        role: 'user',
        content: typeof userContent === 'string' ? userContent : message, // 历史记录只保存文本
        images: options?.imageUrls // 保存图片预览 URL
      });

      // 准备消息列表
      const messages: Array<{ role: string; content: string | Array<{ type: string; text?: string; image_url?: { url: string } }> }> = 
        conversationHistory.slice(0, -1).map(m => ({ role: m.role, content: m.content }));
      
      // 添加当前用户消息（可能包含图片）
      messages.push({
        role: 'user',
        content: userContent
      });

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
      topP?: number;
      topK?: number;
      frequencyPenalty?: number;
      presencePenalty?: number;
      images?: Array<{ base64: string; mimeType?: string }>;
      imageUrls?: string[]; // 图片预览 URL，用于显示在对话中
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

      // 构建用户消息内容（支持图片）
      let userContent: string | Array<{ type: string; text?: string; image_url?: { url: string } }> = message;
      
      if (options?.images && options.images.length > 0) {
        userContent = [
          // 先添加图片
          ...options.images.map(img => ({
            type: 'image_url' as const,
            image_url: {
              url: `data:${img.mimeType || 'image/jpeg'};base64,${img.base64}`
            }
          })),
          // 再添加文本
          { type: 'text' as const, text: message }
        ];
      }

      // 添加用户消息到历史（只保存文本）
      conversationHistory.push({
        role: 'user',
        content: message,
        images: options?.imageUrls // 保存图片预览 URL
      });

      // 添加AI响应占位
      const aiResponseIndex = conversationHistory.length;
      conversationHistory.push({
        role: 'assistant',
        content: '',
        reasoning: ''
      });

      // 准备消息列表（不包含最后一个空AI响应，并过滤掉历史中可能存在的空消息）
      const historyMessages = conversationHistory.slice(0, -2).filter(m => typeof m.content === 'string' ? m.content.trim() !== '' : true);
      const messages: Array<{ role: string; content: string | Array<{ type: string; text?: string; image_url?: { url: string } }> }> = 
        historyMessages.map(m => ({ role: m.role, content: m.content }));
      
      // 添加当前用户消息（可能包含图片）
      messages.push({
        role: 'user',
        content: userContent
      });

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

      if (client.chat?.completions?.create) {
        const stream = await client.chat.completions.create({
          messages,
          stream: true,
          stream_options: { include_usage: true },
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
            conversationHistory[aiResponseIndex].reasoning = fullReasoning;

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

            // 直接追加流字符，由 markdown-it 全权负责标准语法解析与代码高亮
            fullContent += content;

            // 更新对话历史
            conversationHistory[aiResponseIndex].content = fullContent;

            if (callbacks?.onContent) {
              callbacks.onContent(content);
            }
          }

          // Capture usage from the final chunk (SiliconFlow sends usage on the last data chunk)
          if (chunk.usage) {
            conversationHistory[aiResponseIndex].usage = {
              prompt_tokens: chunk.usage.prompt_tokens || 0,
              completion_tokens: chunk.usage.completion_tokens || 0,
              total_tokens: chunk.usage.total_tokens || 0,
              cache_hit_tokens: chunk.usage.prompt_cache_hit_tokens ?? chunk.usage.cache_hit_tokens
            };
          }
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
      // 移除刚才增加但内容为空的 AI 回复占位符，防止产生 "[响应内容为空]" 且污染下一次 API 请求
      const lastMsg = conversationHistory[conversationHistory.length - 1];
      if (lastMsg && lastMsg.role === 'assistant' && !lastMsg.content && !lastMsg.reasoning) {
        conversationHistory.pop();
      }

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

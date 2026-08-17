import { ref, reactive, watch } from 'vue';
import { storeToRefs } from 'pinia';
import DeepseekClient from '../services/DeepseekClient';
import { API_CONFIG, updateApiConfig } from '../services/deepseekService';
import { useApiStore } from '@/stores/api';
import { getModelCapabilities } from '@/constants/modelConfig';

export interface ChatMessage {
  role: string;
  content: string;
  reasoning?: string;
  images?: string[];
  isError?: boolean;
  errorCode?: string;
  error?: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    cache_hit_tokens?: number;
  };
}

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
  const conversationHistory = reactive<Array<ChatMessage>>([]);

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
      apiKey: apiKey.value || API_CONFIG.apiKey,
      baseURL: apiUrl.value || API_CONFIG.baseUrl,
      model,
      temperature: capabilities.temperature ? (options?.temperature ?? API_CONFIG.temperature) : undefined,
      maxTokens: options?.maxTokens ?? API_CONFIG.maxTokens,
      topP: capabilities.topP ? (options?.topP ?? API_CONFIG.topP) : undefined,
      topK: capabilities.topK ? (options?.topK ?? API_CONFIG.topK) : undefined,
      frequencyPenalty: capabilities.frequencyPenalty ? (options?.frequencyPenalty ?? API_CONFIG.frequencyPenalty) : undefined,
      presencePenalty: capabilities.presencePenalty ? (options?.presencePenalty ?? API_CONFIG.presencePenalty) : undefined
    });
  };

  // 更新配置
  const updateConfig = (newConfig: {
    apiKey?: string;
    apiUrl?: string;
    temperature?: number;
    maxTokens?: number;
  }) => {
    if (newConfig.apiUrl) {
      apiStore.setApiUrl(newConfig.apiUrl);
    }

    if (newConfig.apiKey) {
      apiStore.setApiKey(newConfig.apiKey);
    }

    updateApiConfig(newConfig);
  };

  // 发送聊天消息（非流式）
  const chatMessage = async (
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
      reasoningContent.value = '';
      isThinking.value = true;
      // 重置停止状态
      isLastMessageStopped.value = false;

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

      // 准备消息列表（过滤掉历史中错误的记录）
      const historyMessages = conversationHistory
        .slice(0, -1)
        .filter(m => !m.isError && (typeof m.content === 'string' ? m.content.trim() !== '' : true));

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
      let response;

      try {
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
          content: assistantMessage,
          reasoning,
          usage: response.usage ? {
            prompt_tokens: response.usage.prompt_tokens || 0,
            completion_tokens: response.usage.completion_tokens || 0,
            total_tokens: response.usage.total_tokens || 0,
            cache_hit_tokens: response.usage.prompt_cache_hit_tokens ?? response.usage.cache_hit_tokens
          } : undefined
        });

        return {
          content: assistantMessage,
          reasoning
        };
      }

      return null;
    } catch (err: any) {
      const errMsg = err?.message || String(err);
      const isBalance = errMsg.includes('402') || errMsg.includes('30001') || errMsg.toLowerCase().includes('balance');
      const isAuth = errMsg.includes('401') || errMsg.toLowerCase().includes('unauthorized') || errMsg.toLowerCase().includes('invalid_api_key');
      const isRateLimit = errMsg.includes('429') || errMsg.toLowerCase().includes('rate');
      const errorCode = isBalance ? '402' : isAuth ? '401' : isRateLimit ? '429' : '500';

      if (errorCode === '500') {
        // 对于 500 或未知 JS 异常，仅依赖右侧 Notification，不污染对话列表
        if (conversationHistory[conversationHistory.length - 1]?.role === 'assistant' && 
            !conversationHistory[conversationHistory.length - 1].content) {
          conversationHistory.pop();
        }
      } else {
        conversationHistory.push({
          role: 'assistant',
          content: '',
          isError: true,
          errorCode,
          error: errMsg
        });
      }

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
      isProcessing.value = false;
      isLastMessageStopped.value = true;

      if (abortController.value) {
        abortController.value.abort();
        abortController.value = null;
      }

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
      isLastMessageStopped.value = false;

      abortController.value = new AbortController();

      // 构建用户消息内容（支持图片）
      let userContent: string | Array<{ type: string; text?: string; image_url?: { url: string } }> = message;
      
      if (options?.images && options.images.length > 0) {
        userContent = [
          ...options.images.map(img => ({
            type: 'image_url' as const,
            image_url: {
              url: `data:${img.mimeType || 'image/jpeg'};base64,${img.base64}`
            }
          })),
          { type: 'text' as const, text: message }
        ];
      }

      // 添加用户消息到历史
      conversationHistory.push({
        role: 'user',
        content: message,
        images: options?.imageUrls
      });

      // 添加AI响应占位
      const aiResponseIndex = conversationHistory.length;
      conversationHistory.push({
        role: 'assistant',
        content: '',
        reasoning: ''
      });

      // 准备消息列表（过滤掉历史中错误的记录）
      const historyMessages = conversationHistory
        .slice(0, -2)
        .filter(m => !m.isError && (typeof m.content === 'string' ? m.content.trim() !== '' : true));

      const messages: Array<{ role: string; content: string | Array<{ type: string; text?: string; image_url?: { url: string } }> }> = 
        historyMessages.map(m => ({ role: m.role, content: m.content }));
      
      messages.push({
        role: 'user',
        content: userContent
      });

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
          if (!isProcessing.value) break;

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
            if (isFirstContent) {
              isFirstContent = false;
              isThinking.value = false;
            }

            fullContent += content;
            conversationHistory[aiResponseIndex].content = fullContent;

            if (callbacks?.onContent) {
              callbacks.onContent(content);
            }
          }

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

      // 兜底提取 <think> 标签（某些推理模型会将思考过程作为 <think>...</think> 放在 content 中）
      if (!fullReasoning && fullContent.includes('<think>')) {
        const thinkMatch = fullContent.match(/<think>([\s\S]*?)(?:<\/think>|$)/i);
        if (thinkMatch) {
          fullReasoning = thinkMatch[1].trim();
          fullContent = fullContent.replace(/<think>[\s\S]*?(?:<\/think>|$)/i, '').trim();
          reasoningContent.value = fullReasoning;
          conversationHistory[aiResponseIndex].reasoning = fullReasoning;
          conversationHistory[aiResponseIndex].content = fullContent;
        }
      }

      streamProgress.value = 100;
      isProcessing.value = false;
      isThinking.value = false;

      if (callbacks?.onComplete) {
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
      const errMsg = err?.message || String(err);
      const isBalance = errMsg.includes('402') || errMsg.includes('30001') || errMsg.toLowerCase().includes('balance') || errMsg.includes('insufficient');
      const isAuth = errMsg.includes('401') || errMsg.toLowerCase().includes('unauthorized') || errMsg.toLowerCase().includes('invalid_api_key');
      const isRateLimit = errMsg.includes('429') || errMsg.toLowerCase().includes('rate');
      const errorCode = isBalance ? '402' : isAuth ? '401' : isRateLimit ? '429' : '500';

      const lastMsg = conversationHistory[conversationHistory.length - 1];
      if (lastMsg && lastMsg.role === 'assistant' && !lastMsg.content && !lastMsg.reasoning) {
        if (err.name === 'AbortError' || errorCode === '500') {
          conversationHistory.pop();
        } else {
          lastMsg.isError = true;
          lastMsg.errorCode = errorCode;
          lastMsg.error = errMsg;
        }
      }

      if (err.name === 'AbortError') {
        console.log('请求被用户中止');
      } else {
        console.error('Stream请求出错:', err);
        error.value = `请求失败: ${errMsg}`;

        if (callbacks?.onError) {
          callbacks.onError(err);
        }
      }

      isProcessing.value = false;
      isThinking.value = false;
      return null;
    } finally {
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
    isThinking,
    isLastMessageStopped,
    conversationHistory,
    reasoningContent,

    // 方法
    updateConfig,
    sendChatMessage: chatMessage,
    streamChatMessage,
    stopGeneration,
    clearHistory
  };
}

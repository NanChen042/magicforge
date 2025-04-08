import { useApiStore } from '../stores/api';
import DeepseekClient from './DeepseekClient';
import type { AsyncIterableResponse } from '../types/api';

/**
 * 统一API接口层
 * 将所有API相关操作集中在这里，提供一致的接口
 */
export class ApiService {
  private static instance: ApiService;
  private client: DeepseekClient | null = null;

  private constructor() {
    // 私有构造函数，防止外部直接创建实例
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  /**
   * 获取API客户端
   */
  private getClient(options?: {
    temperature?: number;
    maxTokens?: number;
    model?: string;
  }): DeepseekClient {
    const apiStore = useApiStore();

    // 使用处理过的URL以解决跨域问题
    const baseURL = this.getProxyUrl(apiStore.apiUrl);

    // 如果已经有客户端实例且没有传入特殊配置，则复用
    if (this.client && !options) {
      return this.client;
    }

    // 创建新客户端
    this.client = new DeepseekClient({
      apiKey: apiStore.apiKey || '123',  // 默认使用一个临时键值，实际使用中应该提供真实密钥
      baseURL: baseURL,
      temperature: options?.temperature || 0.7,
      maxTokens: options?.maxTokens || 2000,
      model: options?.model || apiStore.modelName
    });

    return this.client;
  }

  /**
   * 转换API URL以处理输入格式
   */
  private getProxyUrl(url: string): string {
    // 处理URL，移除前缀的@符号（如果有）
    const cleanUrl = url.startsWith('@') ? url.substring(1) : url;

    // 直接返回清理后的URL，不添加任何代理
    return cleanUrl;
  }

  /**
   * 发送聊天消息（非流式）
   */
  public async sendChatMessage(
    message: string | Array<{role: string; content: string}>,
    options?: {
      temperature?: number;
      maxTokens?: number;
      model?: string;
      systemPrompt?: string;
    }
  ): Promise<{content: string; reasoning?: string} | null> {
    try {
      const client = this.getClient(options);
      let messages: Array<{role: string; content: string}>;

      // 处理消息格式
      if (typeof message === 'string') {
        messages = [{ role: 'user', content: message }];
      } else {
        messages = [...message];
      }

      // 添加系统提示
      if (options?.systemPrompt) {
        messages.unshift({
          role: 'system',
          content: options.systemPrompt
        });
      }

      // 发送请求
      let response;
      try {
        if (client.chat?.completions?.create) {
          response = await client.chat.completions.create({
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
        console.error('API调用失败:', err);
        throw err;
      }

      // 处理响应
      if (response?.choices && response.choices.length > 0) {
        return {
          content: response.choices[0].message.content,
          reasoning: response.choices[0].message.reasoning_content
        };
      }

      return null;
    } catch (error) {
      console.error('发送聊天消息失败:', error);
      throw error;
    }
  }

  /**
   * 发送聊天消息（流式）
   */
  public async streamChatMessage(
    message: string | Array<{role: string; content: string}>,
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
      signal?: AbortSignal;
    }
  ): Promise<{content: string; reasoning?: string} | null> {
    try {
      const client = this.getClient(options);
      let messages: Array<{role: string; content: string}>;

      // 处理消息格式
      if (typeof message === 'string') {
        messages = [{ role: 'user', content: message }];
      } else {
        messages = [...message];
      }

      // 添加系统提示
      if (options?.systemPrompt) {
        messages.unshift({
          role: 'system',
          content: options.systemPrompt
        });
      }

      // 创建流式请求
      let stream;
      try {
        if (client.chat?.completions?.create) {
          stream = await client.chat.completions.create({
            messages,
            stream: true,
            // @ts-ignore: API类型定义中可能没有包含signal属性
            signal: options?.signal
          });
        } else {
          stream = await client.chatCompletion({
            messages,
            stream: true
          });
        }
      } catch (err) {
        console.error('流式API调用失败:', err);
        callbacks?.onError?.(err);
        throw err;
      }

      // 处理流式响应
      let fullContent = '';
      let fullReasoning = '';

      for await (const chunk of stream) {
        if (options?.signal?.aborted) break;

        const delta = chunk.choices[0].delta;

        // 处理内容
        if (delta.content) {
          fullContent += delta.content;
          callbacks?.onContent?.(fullContent);
        }

        // 处理思维链
        if (delta.reasoning_content) {
          fullReasoning += delta.reasoning_content;
          callbacks?.onReasoning?.(fullReasoning);
        }
      }

      callbacks?.onComplete?.();

      return {
        content: fullContent,
        reasoning: fullReasoning || undefined
      };
    } catch (error) {
      console.error('流式聊天消息失败:', error);
      callbacks?.onError?.(error);
      throw error;
    }
  }
}

// 导出服务实例
export const apiService = ApiService.getInstance();

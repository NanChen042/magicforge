/**
 * OpenAI 兼容格式 API 调用示例
 *
 * 本示例展示如何使用标准的 OpenAI SDK 格式调用 Deepseek 接口
 * 在实际项目中，你可以使用 OpenAI 官方 SDK 替换这个简化实现
 */

// OpenAI 兼容的客户端简化实现
class OpenAI {
  private apiKey: string;
  private baseURL: string;

  constructor(options: { apiKey: string, baseURL: string }) {
    this.apiKey = options.apiKey;
    this.baseURL = options.baseURL;
  }

  chat = {
    completions: {
      create: async (options: {
        model: string;
        messages: Array<{ role: string; content: string }>;
        temperature?: number;
        max_tokens?: number;
        stream?: boolean;
      }) => {
        const url = `${this.baseURL}/chat/completions`;
        const { model, messages, temperature = 0.7, max_tokens = 1000, stream = false } = options;

        const requestBody = {
          model,
          messages,
          temperature,
          max_tokens,
          stream
        };

        // 流式响应处理
        if (stream) {
          return this.createStreamingResponse(url, requestBody);
        }

        // 普通响应处理
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API 请求失败: ${response.status} - ${errorText}`);
        }

        return await response.json();
      }
    }
  };

  // 处理流式响应
  private async createStreamingResponse(url: string, requestBody: any) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API 请求失败: ${response.status} - ${errorText}`);
    }

    // 检查响应头，确认是否为流式响应
    if (!response.headers.get('content-type')?.includes('text/event-stream')) {
      throw new Error('服务器没有返回流式响应');
    }

    // 创建异步迭代器
    const reader = response.body?.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    return {
      [Symbol.asyncIterator]() {
        return {
          async next(): Promise<IteratorResult<any>> {
            if (!reader) {
              return { done: true, value: undefined };
            }

            try {
              const { done, value } = await reader.read();

              if (done) {
                return { done: true, value: undefined };
              }

              buffer += decoder.decode(value, { stream: true });

              // 处理事件流中的数据
              if (buffer.includes('data: ')) {
                const lines = buffer.split('\n');
                buffer = '';

                for (const line of lines) {
                  if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') {
                      return { done: true, value: undefined };
                    }

                    try {
                      const parsed = JSON.parse(data);
                      return { done: false, value: parsed };
                    } catch (e) {
                      console.warn('无法解析事件流数据:', data);
                    }
                  } else if (line) {
                    buffer += line + '\n';
                  }
                }
              }

              return this.next();
            } catch (error) {
              reader.cancel();
              throw error;
            }
          }
        };
      }
    };
  }
}

/**
 * 示例 1: 普通聊天请求
 */
async function basicChatExample() {
  // 初始化客户端
  const client = new OpenAI({
    apiKey: '123',  // 您的 API 密钥
    baseURL: 'https://test-app0-9gyupkmi10ed2654.api.tcloudbasegateway.com/v1/ai/deepseek/v1',
  });

  try {
    const completion = await client.chat.completions.create({
      model: 'deepseek-r1',
      messages: [
        { role: 'system', content: '你是一个简洁明了的助手，回答简短。' },
        { role: 'user', content: '请用一句话解释什么是大语言模型。' }
      ],
      temperature: 0.3,
      max_tokens: 100
    });

    console.log('API 返回的完整响应:', completion);
    console.log('\n生成的文本:', completion.choices[0].message.content);
  } catch (error) {
    console.error('请求失败:', error);
  }
}

/**
 * 示例 2: 流式聊天请求
 */
async function streamingChatExample() {
  // 初始化客户端
  const client = new OpenAI({
    apiKey: '123',  // 您的 API 密钥
    baseURL: 'https://test-app0-9gyupkmi10ed2654.api.tcloudbasegateway.com/v1/ai/deepseek/v1',
  });

  try {
    console.log('开始流式生成...');
    const stream = await client.chat.completions.create({
      model: 'deepseek-r1',
      messages: [
        { role: 'user', content: '请写一首关于人工智能的小诗。' }
      ],
      temperature: 0.7,
      max_tokens: 200,
      stream: true
    });

    let fullContent = '';
    console.log('\n生成内容:');

    for await (const chunk of stream) {
      if (chunk.choices[0]?.delta?.content) {
        const content = chunk.choices[0].delta.content;
        fullContent += content;
        console.log(content);
      }
    }

    console.log('\n完整内容:', fullContent);
  } catch (error) {
    console.error('流式请求失败:', error);
  }
}

// 运行示例
async function main() {
  console.log('=== 普通聊天请求示例 ===');
  await basicChatExample();

  console.log('\n=== 流式聊天请求示例 ===');
  await streamingChatExample();
}

// 是否为 Node.js 环境
const isNodeEnvironment = typeof window === 'undefined';

// 如果是 Node.js 环境，直接运行；否则导出函数
if (isNodeEnvironment) {
  main().catch(console.error);
}

export {
  OpenAI,
  basicChatExample,
  streamingChatExample
};

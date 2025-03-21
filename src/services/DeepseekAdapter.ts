import DeepseekClient from './DeepseekClient';

/**
 * Deepseek 适配器
 * 将 DeepseekClient 转换为与 ai.createModel 类似的接口风格
 */
export class DeepseekAI {
  /**
   * 创建模型
   */
  createModel(modelType: string, options: any = {}) {
    if (modelType !== 'deepseek') {
      throw new Error(`不支持的模型类型: ${modelType}`);
    }

    const defaultOptions = {
      apiKey: '123',
      baseURL: 'http://106.14.176.242:9998/v1',
      ...options
    };

    const client = new DeepseekClient(defaultOptions);

    return {
      /**
       * 流式生成文本
       */
      streamText: async (params: {
        model: string;
        messages: Array<{role: string; content: string}>;
        temperature?: number;
        max_tokens?: number;
      }) => {
        const stream = await client.chat.completions.create({
          model: params.model,
          messages: params.messages,
          temperature: params.temperature,
          max_tokens: params.max_tokens,
          stream: true
        });

        // 返回一个包含 dataStream 的对象，以匹配用户提供的接口
        return {
          dataStream: stream
        };
      },

      /**
       * 生成文本（非流式）
       */
      generateText: async (params: {
        model: string;
        messages: Array<{role: string; content: string}>;
        temperature?: number;
        max_tokens?: number;
      }) => {
        const response = await client.chat.completions.create({
          model: params.model,
          messages: params.messages,
          temperature: params.temperature,
          max_tokens: params.max_tokens,
          stream: false
        });

        return response;
      }
    };
  }
}

// 创建全局实例
const ai = new DeepseekAI();

// 使用示例
async function exampleUsage() {
  // 创建模型
  const aiModel = ai.createModel("deepseek");

  // 流式文本生成
  const res = await aiModel.streamText({
    model: "deepseek-r1",
    messages: [
      { role: "user", content: "你好，请你介绍一下李白" },
    ],
  });

  // 流式处理响应
  for await (let data of res.dataStream) {
    // 打印思维链内容
    const think = (data?.choices?.[0]?.delta)?.reasoning_content;
    if (think) {
      console.log('思维过程:', think);
    }

    // 打印生成文本内容
    const text = data?.choices?.[0]?.delta?.content;
    if (text) {
      console.log('生成内容:', text);
    }
  }
}

export default ai;

import DeepseekClient from '../services/DeepseekClient';

/**
 * 流式输出示例
 * 演示如何使用 DeepseekClient 流式输出文本和思维链内容
 */

// 创建客户端
const client = new DeepseekClient({
  apiKey: 'YOUR_API_KEY', // 请替换为您的API密钥
  baseURL: 'YOUR_API_ENDPOINT', // 请替换为您的API端点
  model: 'deepseek-r1', // 使用 deepseek-r1 模型，它支持思维链输出
  temperature: 0.7,
  maxTokens: 2000
});

/**
 * 示例 1: 流式输出文本和思维链
 */
async function streamingOutputExample() {
  try {
    console.log('开始流式生成...\n');

    // 创建流式响应
    const stream = await client.chat.completions.create({
      messages: [
        { role: 'system', content: '你是一个知识渊博的助手，请先思考后回答。' },
        { role: 'user', content: '请介绍一下唐代诗人李白。' }
      ],
      stream: true
    });

    // 用于累积完整内容
    let fullContent = '';
    let fullReasoning = '';

    // 逐个处理返回的数据块
    for await (const chunk of stream) {
      // 提取思维链内容（reasoning_content 字段）
      const reasoning = chunk.choices?.[0]?.delta?.reasoning_content;
      if (reasoning) {
        fullReasoning += reasoning;
        console.log('🤔 思维过程:', reasoning);
      }

      // 提取生成的文本内容
      const content = chunk.choices?.[0]?.delta?.content;
      if (content) {
        fullContent += content;
        console.log('💬 生成内容:', content);
      }
    }

    console.log('\n==== 生成完毕 ====');
    console.log('\n📝 完整思维过程:\n', fullReasoning);
    console.log('\n📝 完整生成内容:\n', fullContent);
  } catch (error) {
    console.error('流式生成失败:', error);
  }
}

/**
 * 示例 2: 纯文本流式输出（无思维链）
 */
async function pureTextStreamingExample() {
  try {
    console.log('开始纯文本流式生成...\n');

    // 创建流式响应
    const stream = await client.chat.completions.create({
      messages: [
        { role: 'user', content: '写一首关于春天的短诗。' }
      ],
      stream: true
    });

    // 用于累积完整内容
    let fullContent = '';
    let counter = 0;
    let buffer = '';

    // 逐个处理返回的数据块，并以更直观的方式展示流式特性
    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content;
      if (content) {
        fullContent += content;
        buffer += content;
        counter++;

        // 每10个字符一行，模拟流式效果
        if (counter % 10 === 0) {
          console.log(`(${counter}) ${buffer}`);
          buffer = '';
        }
      }
    }

    // 输出剩余的内容
    if (buffer) {
      console.log(`(${counter}) ${buffer}`);
    }

    console.log('\n\n==== 生成完毕 ====');
    console.log('\n📝 完整生成内容:\n', fullContent);
  } catch (error) {
    console.error('流式生成失败:', error);
  }
}

/**
 * 示例 3: 在 Web 环境中使用流式输出
 * 此函数演示在浏览器环境中如何使用流式输出更新 UI
 */
function webStreamingExample() {
  // 这个示例需要在浏览器环境中运行
  // 假设 HTML 中有 <div id="output"></div> 和 <div id="thinking"></div> 两个元素

  const outputCode = `
  // 创建客户端
  const client = new DeepseekClient({
    apiKey: 'your-api-key',
    baseURL: 'https://your-api-endpoint.com/v1',
    model: 'deepseek-r1'
  });

  // 获取 DOM 元素
  const outputElement = document.getElementById('output');
  const thinkingElement = document.getElementById('thinking');

  // 定义按钮点击处理函数
  async function handleGenerate() {
    // 重置输出
    outputElement.textContent = '';
    thinkingElement.textContent = '';

    // 创建流式响应
    const stream = await client.chat.completions.create({
      messages: [
        { role: 'system', content: '你是一个有帮助的助手。' },
        { role: 'user', content: document.getElementById('prompt').value }
      ],
      stream: true
    });

    // 流式处理响应
    for await (const chunk of stream) {
      // 处理思维链内容
      const reasoning = chunk.choices?.[0]?.delta?.reasoning_content;
      if (reasoning) {
        thinkingElement.textContent += reasoning;
        // 自动滚动到底部
        thinkingElement.scrollTop = thinkingElement.scrollHeight;
      }

      // 处理生成内容
      const content = chunk.choices?.[0]?.delta?.content;
      if (content) {
        outputElement.textContent += content;
        // 自动滚动到底部
        outputElement.scrollTop = outputElement.scrollHeight;
      }
    }
  }
  `;

  console.log('Web 环境中使用流式输出的示例代码:');
  console.log(outputCode);
}

/**
 * 示例 4: 模拟您提供的代码示例
 */
async function simulateUserCodeExample() {
  try {
    console.log('模拟您的代码例子...\n');

    // 创建客户端 (模拟 ai.createModel)
    const client = new DeepseekClient({
      apiKey: '123',
      baseURL: 'http://106.14.176.242:9998/v1',
      model: 'deepseek-r1'
    });

    // 模拟 aiModel.streamText
    const res = await client.chat.completions.create({
      messages: [
        { role: "user", content: "你好，请你介绍一下李白" },
      ],
      stream: true
    });

    // 使用您的代码风格处理流
    for await (let data of res) {
      // 打印思维链内容
      const think = (data?.choices?.[0]?.delta)?.reasoning_content;
      if (think) {
        console.log('思维链:', think);
      }

      // 打印生成文本内容
      const text = data?.choices?.[0]?.delta?.content;
      if (text) {
        console.log('内容:', text);
      }
    }

    console.log('\n==== 生成完毕 ====');
  } catch (error) {
    console.error('流式生成失败:', error);
  }
}

// 运行示例
async function main() {
  console.log('=== 流式输出示例 ===\n');

  console.log('1. 流式输出文本和思维链');
  await streamingOutputExample();

  console.log('\n\n2. 纯文本流式输出');
  await pureTextStreamingExample();

  console.log('\n\n3. Web 环境中使用流式输出');
  webStreamingExample();

  console.log('\n\n4. 模拟您的代码例子');
  await simulateUserCodeExample();

  console.log('\n=== 示例结束 ===');
}

// 仅在 Node.js 环境中运行
const isNodeEnvironment = typeof window === 'undefined';
if (isNodeEnvironment) {
  main().catch(console.error);
}

// 导出函数供其他模块使用
export {
  streamingOutputExample,
  pureTextStreamingExample,
  webStreamingExample,
  simulateUserCodeExample
};

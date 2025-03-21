import ai from '../services/DeepseekAdapter';

/**
 * 使用 DeepseekAdapter 的示例
 * 展示如何按照 ai.createModel 的用法风格进行流式输出
 */

/**
 * 基本流式输出示例
 */
async function basicStreamExample() {
  try {
    console.log('=== 基本流式输出示例 ===\n');

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
    for await (const data of res.dataStream) {
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

    console.log('\n=== 示例结束 ===');
  } catch (error) {
    console.error('流式生成失败:', error);
  }
}

/**
 * 高级流式输出示例
 * 展示如何在网页中使用 progressCallback 展示生成进度
 */
async function webUIStreamExample() {
  console.log('=== Web UI 流式输出示例代码 ===\n');

  const exampleCode = `
  import ai from './services/DeepseekAdapter';

  // 获取 DOM 元素
  const outputEl = document.getElementById('output');
  const thinkingEl = document.getElementById('thinking');
  const progressEl = document.getElementById('progress');

  // 重置输出区域
  outputEl.textContent = '';
  thinkingEl.textContent = '';
  progressEl.value = 0;

  // 创建模型
  const aiModel = ai.createModel("deepseek");

  // 计数器用于跟踪生成进度
  let tokenCount = 0;
  const estimatedTotalTokens = 500; // 估计生成的总token数

  // 流式文本生成
  const res = await aiModel.streamText({
    model: "deepseek-r1",
    messages: [
      { role: "system", content: "你是一个有帮助的助手。" },
      { role: "user", content: "请详细介绍一下李白的生平和成就。" }
    ],
  });

  // 流式处理响应
  for await (const data of res.dataStream) {
    // 思维链内容
    const think = (data?.choices?.[0]?.delta)?.reasoning_content;
    if (think) {
      thinkingEl.textContent += think;
      thinkingEl.scrollTop = thinkingEl.scrollHeight; // 自动滚动
    }

    // 生成文本内容
    const text = data?.choices?.[0]?.delta?.content;
    if (text) {
      outputEl.textContent += text;
      outputEl.scrollTop = outputEl.scrollHeight; // 自动滚动

      // 更新生成进度
      tokenCount += 1;
      const progress = Math.min(100, Math.round((tokenCount / estimatedTotalTokens) * 100));
      progressEl.value = progress;
    }
  }

  // 生成完成，进度设为100%
  progressEl.value = 100;
  `;

  console.log(exampleCode);
  console.log('\n=== 示例代码结束 ===');
}

/**
 * 动态思维链显示示例
 * 展示如何使用思维链进行动态展示
 */
async function dynamicReasoningExample() {
  try {
    console.log('=== 动态思维链显示示例 ===\n');

    // 创建模型
    const aiModel = ai.createModel("deepseek");

    console.log('正在分析问题...\n');

    // 流式文本生成
    const res = await aiModel.streamText({
      model: "deepseek-r1",
      messages: [
        { role: "system", content: "你是一个解答问题的助手，首先分析问题，然后给出答案。" },
        { role: "user", content: "如果一个长方形的长是8厘米，宽是6厘米，它的面积和周长分别是多少？" },
      ],
    });

    // 缓存思维链和内容
    let reasoning = '';
    let content = '';
    let isReasoningPhase = true;

    // 流式处理响应
    for await (const data of res.dataStream) {
      // 思维链内容
      const think = (data?.choices?.[0]?.delta)?.reasoning_content;
      if (think) {
        reasoning += think;

        // 在思维链阶段，实时显示分析过程
        if (isReasoningPhase) {
          console.log(`思考: ${think}`);
        }
      }

      // 生成文本内容
      const text = data?.choices?.[0]?.delta?.content;
      if (text) {
        content += text;

        // 检测到生成内容，切换到回答阶段
        if (isReasoningPhase) {
          isReasoningPhase = false;
          console.log('\n分析完成，正在生成答案...\n');
        }

        // 显示生成内容
        console.log(`回答: ${text}`);
      }
    }

    // 总结
    console.log('\n=== 生成完成 ===');
    console.log(`\n思维过程共 ${reasoning.length} 字符`);
    console.log(`回答内容共 ${content.length} 字符\n`);
  } catch (error) {
    console.error('流式生成失败:', error);
  }
}

// 运行示例
async function main() {
  await basicStreamExample();
  console.log('\n\n');
  await dynamicReasoningExample();
  console.log('\n\n');
  await webUIStreamExample();
}

// 仅在 Node.js 环境中运行
const isNodeEnvironment = typeof window === 'undefined';
if (isNodeEnvironment) {
  main().catch(console.error);
}

// 导出函数供其他模块使用
export {
  basicStreamExample,
  webUIStreamExample,
  dynamicReasoningExample
};

import DeepseekClient from '../services/DeepseekClient';
import type { StoryProgress } from '../stores/game';

/**
 * DeepseekClient 使用示例
 * 展示如何使用 OpenAI 兼容格式的接口调用 Deepseek 服务
 */

// 初始化客户端
const client = new DeepseekClient({
  apiKey: 'YOUR_API_KEY',  // 请替换为您的API密钥
  baseURL: 'YOUR_API_ENDPOINT',  // 请替换为您的API端点
  model: 'QwQ-32B',  // 模型名称
  temperature: 0.8,  // 温度参数
  maxTokens: 2000  // 最大 token 数量
});

/**
 * 示例 1: 基本聊天请求
 */
async function basicChatExample() {
  try {
    const completion = await client.chat.completions.create({
      messages: [
        { role: 'system', content: '你是一个有趣的聊天助手。' },
        { role: 'user', content: '你好，请用简短的句子介绍一下自己。' }
      ]
    });

    console.log('基本聊天响应:', completion.choices[0].message.content);
  } catch (error) {
    console.error('基本聊天请求失败:', error);
  }
}

/**
 * 示例 2: 流式聊天请求
 */
async function streamingChatExample() {
  try {
    const stream = await client.chat.completions.create({
      messages: [
        { role: 'system', content: '你是一个有趣的聊天助手。' },
        { role: 'user', content: '请编写一个短故事，主题是"未来的学校"。' }
      ],
      stream: true
    });

    console.log('流式响应开始:');
    for await (const chunk of stream) {
      if (chunk.choices[0]?.delta?.content) {
        console.log(chunk.choices[0].delta.content);
      }
    }
    console.log('\n流式响应结束');
  } catch (error) {
    console.error('流式聊天请求失败:', error);
  }
}

/**
 * 示例 3: 生成游戏初始场景
 */
async function generateInitialSceneExample() {
  try {
    const scene = await client.generateInitialScene();
    console.log('初始场景生成成功:');
    console.log('描述:', scene.description);
    console.log('对话:', scene.dialog);
    console.log('选项:', scene.options.map(opt => opt.text).join(', '));
  } catch (error) {
    console.error('生成初始场景失败:', error);
  }
}

/**
 * 示例 4: 生成后续游戏场景
 */
async function generateNextSceneExample() {
  try {
    // 模拟游戏进度
    const storyProgress: StoryProgress = {
      mainQuests: {
        gaming: 50,
        study: 30,
        social: 40
      },
      relationships: {
        '李雪': {
          character: '李雪',
          affinity: 20,
          events: ['初次见面', '游戏配合']
        },
        '王老师': {
          character: '王老师',
          affinity: -10,
          events: ['被抓打游戏']
        },
        '张三': {
          character: '张三',
          affinity: 5,
          events: []
        }
      },
      flags: new Set<string>()
    };

    const scene = await client.generateScene({
      playerName: '小明',
      currentSceneId: 1,
      choiceText: '去打游戏',
      previousChoices: ['去上课', '认真听讲'],
      storyProgress,
      stream: false  // 设为 true 可以获取流式响应
    });

    // 如果不是流式响应，直接使用场景数据
    console.log('后续场景生成成功:');
    console.log('描述:', (scene as any).description);
    console.log('对话:', (scene as any).dialog);
    console.log('选项:', (scene as any).options.map((opt: any) => opt.text).join(', '));
    console.log('检查点ID:', (scene as any).checkpointId);
  } catch (error) {
    console.error('生成后续场景失败:', error);
  }
}

/**
 * 示例 5: 生成流式游戏场景
 */
async function generateStreamingSceneExample() {
  try {
    // 模拟游戏进度
    const storyProgress: StoryProgress = {
      mainQuests: {
        gaming: 50,
        study: 30,
        social: 40
      },
      relationships: {
        '李雪': {
          character: '李雪',
          affinity: 20,
          events: ['初次见面', '游戏配合']
        },
        '王老师': {
          character: '王老师',
          affinity: -10,
          events: ['被抓打游戏']
        },
        '张三': {
          character: '张三',
          affinity: 5,
          events: []
        }
      },
      flags: new Set<string>()
    };

    const stream = await client.generateScene({
      playerName: '小明',
      currentSceneId: 2,
      choiceText: '和李雪聊天',
      previousChoices: ['去打游戏', '邀请朋友'],
      storyProgress,
      stream: true  // 启用流式响应
    });

    // 处理流式响应
    if (Symbol.asyncIterator in (stream as any)) {
      console.log('流式场景生成开始:');
      let fullContent = '';

      for await (const chunk of stream as AsyncIterable<any>) {
        if (chunk.choices[0]?.delta?.content) {
          const content = chunk.choices[0].delta.content;
          fullContent += content;
          console.log(content);
        }
      }

      console.log('\n流式响应内容收集完成，接下来解析JSON并处理场景...');
      // 实际应用中，这里需要解析 fullContent 并处理场景数据
    }
  } catch (error) {
    console.error('生成流式场景失败:', error);
  }
}

/**
 * 运行所有示例
 */
async function runAllExamples() {
  console.log('=== DeepseekClient 使用示例 ===');

  console.log('\n1. 基本聊天请求示例');
  await basicChatExample();

  console.log('\n2. 流式聊天请求示例');
  await streamingChatExample();

  console.log('\n3. 生成游戏初始场景示例');
  await generateInitialSceneExample();

  console.log('\n4. 生成后续游戏场景示例');
  await generateNextSceneExample();

  console.log('\n5. 生成流式游戏场景示例');
  await generateStreamingSceneExample();

  console.log('\n=== 所有示例执行完毕 ===');
}

// 确认当前环境是否为 Node.js
const isNodeEnvironment = typeof window === 'undefined';

// 在 Node.js 环境中直接运行，在浏览器环境中通过导出函数
if (isNodeEnvironment) {
  runAllExamples().catch(console.error);
}

// 导出函数以便单独调用
export {
  basicChatExample,
  streamingChatExample,
  generateInitialSceneExample,
  generateNextSceneExample,
  generateStreamingSceneExample
};

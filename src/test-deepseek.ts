import { DeepseekService } from './services/deepseekService'

async function testDeepseek() {
  console.log('开始测试Deepseek API...');

  try {
    console.log('测试初始场景生成...');
    const initialScene = await DeepseekService.generateInitialScene();
    console.log('初始场景生成结果:', JSON.stringify(initialScene, null, 2));

    console.log('\n测试后续场景生成...');
    const nextScene = await DeepseekService.generateScene({
      playerName: '测试玩家',
      currentSceneId: 1,
      choiceText: '专注提升厨艺',
      currentScene: initialScene,
      previousChoices: []
    });
    console.log('后续场景生成结果:', JSON.stringify(nextScene, null, 2));

  } catch (error) {
    console.error('测试过程中发生错误:', error);
  }
}

// 运行测试
testDeepseek();

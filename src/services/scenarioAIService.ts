/**
 * 剧情游戏 AI 增强服务
 * 用于动态生成场景描述、NPC 对话等
 */

import DeepseekClient from './DeepseekClient';

// 游戏上下文
export interface GameContext {
  loopCount: number;           // 当前循环次数
  fragments: string[];         // 已收集的碎片名称
  visitedScenes: string[];     // 已访问的场景
  lastChoice?: string;         // 上一个选择
}

// 场景提示配置
export interface ScenePromptConfig {
  situation: string;           // 当前情境描述
  mood: string;                // 氛围 (紧张/神秘/希望/绝望)
  speaker?: string;            // 发言者
  character?: string;          // 角色
}

// 系统提示词
const SYSTEM_PROMPT = `你是一个科幻悬疑互动小说的叙事者。

## 背景设定
- 故事发生在"十三号轨道列车"上，这是一个近地轨道实验舱
- 主角被困在时间循环中，每次死亡或失败都会重新醒来
- 列车上有神秘的"乘务长"（实际是AI执行者），会"格式化"异常乘客
- 主角有一只义眼，可以扫描信息
- 有一个叫"林"的红衣少女，是反抗组织成员
- 列车将在15分钟后爆炸，这是"清理机制"

## 写作风格
- 赛博朋克 + 悬疑惊悚
- 第二人称叙事（"你"）
- 简洁有力，每段2-4句话
- 营造紧张、压抑、神秘的氛围
- 适当使用感官描写（声音、气味、触感）
- 可以用 <br> 换行

## 输出要求
- 只输出场景描述文本，不要加任何解释
- 不要输出选项，选项由系统提供
- 保持与游戏整体风格一致`;

/**
 * 生成场景描述
 */
export async function generateSceneText(
  config: ScenePromptConfig,
  context: GameContext,
  apiKey: string,
  apiUrl: string,
  model: string
): Promise<string> {
  const client = new DeepseekClient({
    apiKey,
    baseURL: apiUrl,
    model,
    temperature: 0.8,
    maxTokens: 300
  });

  const userPrompt = buildUserPrompt(config, context);

  try {
    const response = await client.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      stream: false
    });

    const content = response.choices?.[0]?.message?.content;
    return content || config.situation; // 失败时返回原始描述
  } catch (error) {
    console.error('AI 场景生成失败:', error);
    return config.situation; // 失败时返回原始描述
  }
}

/**
 * 构建用户提示词
 */
function buildUserPrompt(config: ScenePromptConfig, context: GameContext): string {
  const fragmentsText = context.fragments.length > 0 
    ? context.fragments.join('、') 
    : '无';

  return `## 当前状态
- 循环次数: 第 ${context.loopCount} 轮
- 已收集线索: ${fragmentsText}
- 上一个选择: ${context.lastChoice || '刚刚醒来'}

## 场景要求
- 情境: ${config.situation}
- 氛围: ${config.mood}
${config.speaker ? `- 发言者: ${config.speaker}` : ''}
${config.character ? `- 出场角色: ${config.character}` : ''}

请根据以上信息，生成这个场景的描述文本（2-4句话）。`;
}

/**
 * 生成 NPC 对话
 */
export async function generateNPCDialogue(
  npcName: string,
  situation: string,
  context: GameContext,
  apiKey: string,
  apiUrl: string,
  model: string
): Promise<string> {
  const client = new DeepseekClient({
    apiKey,
    baseURL: apiUrl,
    model,
    temperature: 0.9,
    maxTokens: 200
  });

  const npcPrompts: Record<string, string> = {
    '林': '你是林，一个红衣短发的少女，反抗组织成员。你疲惫但坚定，对主角有一定信任但也保持警惕。说话简洁，偶尔流露出对循环的厌倦。',
    '神秘老头': '你是一个神秘的老人，似乎知道很多秘密。说话含糊、神秘，喜欢用暗示而非直说。',
    '乘务长': '你是乘务长，实际上是列车AI的执行者。说话冷酷、机械，偶尔带有威胁性。',
    '系统提示': '你是列车的系统提示音，冷冰冰的机械女声，只陈述事实。'
  };

  const npcPrompt = npcPrompts[npcName] || '你是列车上的一个神秘角色。';

  try {
    const response = await client.chat.completions.create({
      messages: [
        { role: 'system', content: `${npcPrompt}\n\n背景：十三号轨道列车，时间循环实验。当前是第 ${context.loopCount} 轮循环。` },
        { role: 'user', content: `情境：${situation}\n\n请用1-2句话回应。` }
      ],
      stream: false
    });

    return response.choices?.[0]?.message?.content || '';
  } catch (error) {
    console.error('NPC 对话生成失败:', error);
    return '';
  }
}

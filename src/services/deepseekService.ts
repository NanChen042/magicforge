import type { GameScene, StoryProgress } from '../stores/game'
import CheckpointService from './CheckpointService';

// API配置 - 现在是可动态配置的
export const API_CONFIG = {
  apiKey: localStorage.getItem('apiKey') || 'sk-etybbrewlaafxjjqtlgfeqaaskzrmryfndjtjjecyixbsznw',
  baseUrl: localStorage.getItem('apiUrl') || 'https://api.siliconflow.cn/v1/chat/completions',
  model: localStorage.getItem('modelName') || '',
  temperature: 0.8,
  maxTokens: 2000
};

// 提供一个函数来更新API配置
export function updateApiConfig(config: Partial<typeof API_CONFIG>) {
  Object.assign(API_CONFIG, config);

  // 将更新后的值保存到localStorage
  if (config.apiKey) localStorage.setItem('apiKey', config.apiKey);
  if (config.baseUrl) localStorage.setItem('apiUrl', config.baseUrl);
  if (config.model) localStorage.setItem('modelName', config.model);
}

/**
 * Deepseek AI服务
 * 用于生成游戏场景和对话
 */
export class DeepseekService {
  // 使用API_CONFIG.model替代静态属性
  // private static currentModel = 'QwQ-32B';

  // 添加场景历史记录
  private static sceneHistory: {
    type: string;
    description: string;
    dialog: string;
  }[] = [];

  // 记录已使用的特殊事件，避免重复
  private static usedSpecialEvents = new Set<string>();

  private static characterBackground = `角色背景：
- 姓名：小明（游戏ID：最强剑魔）
- 身份：高三学生，知名游戏主播
- 游戏特长：英雄联盟剑魔玩家，连续29天冲击王者失败
- 性格特点：
  1. 游戏时激情四射，现实中是个普通学生
  2. 直播时经常情绪激动导致麦克风爆音
  3. 对游戏有着极强的执着
  4. 对感情和生活有独特见解
- 说话特点：
  1. 游戏相关：
     - "回答我！我Q会不会空？"
     - "这把打完我得了MVP！"
     - "躺赢狗！"
     - "炸麦警告！"
     - "你们可能不知道，我学凯南学得有多像"
  2. 生活感悟：
     - "怎么不找找自己的问题？"
     - "我要采一朵花送给妈妈"
     - "去洗了点阳光青提"
     - "我真的很不明白"
  3. 情感态度：
     - "你很不稳重"
     - "你这三观还是存在点问题"
     - "不要被表面现象所迷惑"
     - "看破不说破，没啥疑不疑惑的"
- 生活环境：
  1. 正在备战高考
  2. 暗恋同学李雪（游戏ID：疯狂打野）
  3. 被班主任王老师重点关注
- 日常挑战：
  1. 平衡学习和游戏时间
  2. 控制直播时的情绪
  3. 处理同学和粉丝关系
  4. 应对高考压力`;

  private static sceneTypes = [
    '课堂学习',
    '游戏训练',
    '排位赛',
    '直播现场',
    '考试现场',
    '社交互动',
    '家庭生活',
    '社团活动',
    '比赛解说',
    '粉丝互动',
    '感情困惑',
    '人生思考'
  ];

  private static specialEvents = [
    '炸麦警告（情绪激动导致麦克风爆音）',
    '躺赢时刻（队友carry）',
    '连招练习（剑魔技能连招）',
    '偶遇李雪（暗恋对象）',
    '王老师突袭（被抓打游戏）',
    '高考倒计时（压力事件）',
    '粉丝认出（身份暴露）',
    '网络卡顿（比赛掉线）',
    '家长谈话（成绩下滑）',
    '赛事解说（受邀解说）',
    '感情困惑（对话选择）',
    '人生思考（价值观碰撞）'
  ];

  private static classicQuotes = [
    // 游戏相关
    '回答我！我Q会不会空？',
    '这把打完我得了MVP！',
    '躺赢狗！',
    '炸麦警告！',
    '你们可能不知道，我学凯南学得有多像',
    '我要抽陀螺了！',

    // 生活感悟
    '怎么不找找自己的问题？',
    '我要采一朵花送给妈妈',
    '去洗了点阳光青提',
    '我真的很不明白',

    // 情感态度
    '你很不稳重',
    '你这三观还是存在点问题',
    '你越大度你对另一半就是不负责的表现',
    '如果要谈你这个年纪就要考虑下半辈子',
    '不要被表面现象所迷惑',
    '看破不说破，没啥疑不疑惑的',

    // 对话金句
    '你俩能聊就聊',
    '你管她干哈',
    '你俩成不成都不好说',
    '漂亮的玩的花',
    '想这么多干啥',
    '这不是很正常的行为吗',
    '我等会就要骂你了',
    '逆天言论',
    '你真是人才',
    '我干了',

    // 情感思考
    '既然跟你谈了你们就要自己有边界感',
    '能不能听进去我说的',
    '我只能管好我自己',
    '你不是在找个合作租房的室友，你是在找个可以一起面对生活互相扶持的伴侣'
  ];

  private static dialogueTypes = {
    gaming: [
      '回答我！我Q会不会空？',
      '这把打完我得了MVP！',
      '躺赢狗！',
      '炸麦警告！',
      '你们可能不知道，我学凯南学得有多像'
    ],
    life: [
      '怎么不找找自己的问题？',
      '我要采一朵花送给妈妈',
      '去洗了点阳光青提',
      '我真的很不明白'
    ],
    relationship: [
      '你很不稳重',
      '你这三观还是存在点问题',
      '不要被表面现象所迷惑',
      '看破不说破，没啥疑不疑惑的'
    ],
    advice: [
      '你俩能聊就聊',
      '你管她干哈',
      '想这么多干啥',
      '这不是很正常的行为吗'
    ]
  };

  /**
   * 设置模型版本
   */
  public static setModelVersion(version: string): void {
    if (version === 'r1') {
      // this.currentModel = 'deepseek-reasoner';
      API_CONFIG.model = 'deepseek-r1';
      console.log('已切换到DeepSeek-R1模型');
    } else if (version === 'v3') {
      API_CONFIG.model = 'deepseek-chat';
      console.log('已切换到DeepSeek-Chat模型');
    } else {
      console.error('不支持的模型版本:', version);
    }
  }

  /**
   * 获取当前模型版本
   */
  public static getModelVersion(): string {
    return API_CONFIG.model === 'deepseek-chat' ? 'v3' : 'r1';
  }

  /**
   * 发送API请求
   */
  private static async sendRequest(messages: any[]): Promise<any> {
    try {
      console.log('发送请求到Deepseek API...');
      console.log('使用模型:', API_CONFIG.model);
      console.log('API地址:', API_CONFIG.baseUrl);

      // 检查API地址是否有效
      if (!API_CONFIG.baseUrl || !API_CONFIG.baseUrl.startsWith('http')) {
        throw new Error('无效的API地址: ' + API_CONFIG.baseUrl);
      }

      const requestBody = {
        model: API_CONFIG.model,
        messages,
        temperature: API_CONFIG.temperature,
        max_tokens: API_CONFIG.maxTokens,
        stream: false,
        stop: null // 移除stop参数，避免截断JSON
      };

      console.log('请求体:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(API_CONFIG.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_CONFIG.apiKey}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API错误响应:', errorText);
        throw new Error(`API请求失败: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API响应:', data);

      if (!data.choices?.[0]?.message?.content) {
        console.error('API响应格式异常:', data);
        throw new Error('API响应格式不正确: ' + JSON.stringify(data));
      }

      return data;
    } catch (error) {
      console.error('API请求失败:', error);
      throw error;
    }
  }

  /**
   * 生成初始场景
   */
  public static async generateInitialScene(): Promise<GameScene> {
    const sceneType = this.sceneTypes[Math.floor(Math.random() * this.sceneTypes.length)];
    const specialEvent = Math.random() > 0.7 ? this.specialEvents[Math.floor(Math.random() * this.specialEvents.length)] : undefined;

    const initialPrompt = `请以第一人称的视角，扮演小明（最强剑魔）生成游戏开场场景。

${this.characterBackground}

场景类型：${sceneType}
${specialEvent ? `特殊事件：${specialEvent}` : ''}

要求：
1. 场景描述要生动有趣，突出高中生活和游戏双重身份的冲突
2. 对话要用小明的语气，多用游戏梗和台词
3. 描述要有细节，包括天气、环境、人物心情等
4. 选项要有趣且符合人物性格
5. 如果有特殊事件，要自然地融入场景中

输出格式：
{
  "description": "场景描述（200字以内）",
  "dialog": "小明的对话（50字以内）",
  "options": [
    {"text": "选项1（15字以内）", "hint": "选项提示（20字以内）"},
    {"text": "选项2（15字以内）", "hint": "选项提示（20字以内）"}
  ],
  "specialEvent": "特殊事件的具体描述（可选，50字以内）"
}`;

    try {
      const messages = [
        {
          role: 'system',
          content: '你现在是小明（游戏ID：最强剑魔），一个高三学生兼游戏主播。你要生动地讲述在学习和游戏之间的故事。确保输出是合法的JSON格式。'
        },
        {
          role: 'user',
          content: initialPrompt
        }
      ];

      const data = await this.sendRequest(messages);
      const content = data.choices[0].message.content;
      return this.parseResponse(content, 1);
    } catch (error) {
      console.error('生成初始场景失败:', error);
      throw error;
    }
  }

  /**
   * 创建模型并返回支持流式输出的客户端
   */
  public static createModel(params = {}) {
    return {
      streamText: async ({
        messages,
        model = API_CONFIG.model,
        temperature = API_CONFIG.temperature,
        max_tokens = API_CONFIG.maxTokens
      }: {
        messages: any[];
        model?: string;
        temperature?: number;
        max_tokens?: number;
      }) => {
        console.log('使用模型:', model);

        try {
          const response = await fetch(API_CONFIG.baseUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${API_CONFIG.apiKey}`
            },
            body: JSON.stringify({
              model,
              messages,
              temperature,
              max_tokens,
              stream: true
            })
          });

          if (!response.ok) {
            const error = await response.text();
            throw new Error(`API响应错误 ${response.status}: ${error}`);
          }

          // 返回可用于for await...of循环的异步迭代器
          return {
            dataStream: this._createAsyncIterator(response)
          };
        } catch (error) {
          console.error('流式请求失败:', error);
          throw error;
        }
      }
    };
  }

  /**
   * 创建处理流式响应的异步迭代器
   */
  private static async* _createAsyncIterator(response: Response) {
    if (!response.body) {
      throw new Error('响应没有可读的正文');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // 处理数据行
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim() === '') continue;
          if (line.trim() === 'data: [DONE]') continue;

          // 提取数据部分
          if (line.startsWith('data: ')) {
            try {
              // 解析JSON数据
              const json = JSON.parse(line.substring(5));
              yield json;
            } catch (error) {
              console.error('解析流数据时出错:', error, 'Line:', line);
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  /**
   * 生成场景，支持流式输出
   */
  public static async generateScene(params: {
    playerName: string;
    currentSceneId: number;
    choiceText: string;
    currentScene?: GameScene;
    previousChoices?: string[];
    storyProgress: StoryProgress;
    checkpointId?: string;
    streamCallbacks?: {
      onReasoningUpdate?: (content: string) => void;
      onDialogUpdate?: (content: string) => void;
    };
  }): Promise<GameScene> {
    try {
      // 如果已有检查点ID，尝试恢复
      if (params.checkpointId) {
        try {
          const checkpoint = await CheckpointService.loadCheckpoint(params.checkpointId);
          if (checkpoint) {
            console.log('已从检查点恢复场景:', params.checkpointId);
            return checkpoint as GameScene;
          }
        } catch (error) {
          console.error('恢复检查点失败:', error);
        }
      }

      // 更新当前场景到历史记录
      if (params.currentScene) {
        this.updateSceneHistory(params.currentScene);
      }

      // 准备提示词 - 更加简化，无需每次都传递全部上下文
      const messages = [
        {
          role: 'system',
          content: this.characterBackground  // 只在首次传递，利用模型的上下文能力
        },
        {
          role: 'user',
          content: `玩家选择了: "${params.choiceText}"。请为"最强剑魔是高三生"游戏生成下一个场景，场景ID ${params.currentSceneId + 1}。

          请以JSON格式返回以下内容：
          1. description: 场景描述 (200字以内)
          2. dialog: 主角内心独白或对话 (50字以内)
          3. options: 3个选项，每个包含text(文本)、hint(提示)、next(下一场景ID)
          4. specialEvent: 特殊事件 (可选)

          注意考虑当前游戏进度：gaming=${params.storyProgress.mainQuests.gaming}, study=${params.storyProgress.mainQuests.study}, social=${params.storyProgress.mainQuests.social}`
        }
      ];

      // 使用新的流式处理方法
      if (params.streamCallbacks?.onReasoningUpdate || params.streamCallbacks?.onDialogUpdate) {
        // 使用新的createModel方法
        const aiModel = this.createModel();
        const res = await aiModel.streamText({ messages });

        let completeResponse = '';
        let reasoningContent = '';

        // 处理流式响应
        for await (let data of res.dataStream) {
          // 处理思维链内容
          const think = data?.choices?.[0]?.delta?.reasoning_content;
          if (think && params.streamCallbacks?.onReasoningUpdate) {
            reasoningContent += think;
            params.streamCallbacks.onReasoningUpdate(think);
          }

          // 处理普通文本内容
          const text = data?.choices?.[0]?.delta?.content;
          if (text) {
            completeResponse += text;
            if (params.streamCallbacks?.onDialogUpdate) {
              params.streamCallbacks.onDialogUpdate(text);
            }
          }
        }

        // 解析最终生成的响应
        const scene = this.parseResponse(completeResponse, params.currentSceneId + 1);

        // 添加思维链内容
        if (reasoningContent) {
          scene.reasoning = reasoningContent;
        }

        // 保存检查点
        try {
          const checkpointId = await CheckpointService.saveCheckpoint(scene);
          if (checkpointId) {
            scene.checkpointId = checkpointId;
          }
        } catch (error) {
          console.error('保存检查点失败:', error);
        }

        return scene;
      } else {
        // 使用原始请求方法
        const response = await this.sendRequest(messages);
        const scene = this.parseResponse(response.choices[0].message.content, params.currentSceneId + 1);

        // 保存检查点
        try {
          const checkpointId = await CheckpointService.saveCheckpoint(scene);
          if (checkpointId) {
            scene.checkpointId = checkpointId;
          }
        } catch (error) {
          console.error('保存检查点失败:', error);
        }

        return scene;
      }
    } catch (error) {
      console.error('生成场景失败:', error);
      throw error;
    }
  }

  /**
   * 根据进度获取情绪基调
   */
  private static getMoodBasedOnProgress(progress: StoryProgress): string {
    const { gaming, study, social } = progress.mainQuests;

    if (gaming > 80) return '自信';
    if (study > 80) return '充实';
    if (social > 80) return '开心';

    if (gaming < 20 && study < 20) return '迷茫';
    if (gaming > 60 && study < 30) return '焦虑';
    if (study > 60 && gaming < 30) return '压抑';

    return '平静';
  }

  /**
   * 获取下一个场景类型
   */
  private static getNextSceneType(
    choiceText: string,
    currentDescription?: string,
    progress?: StoryProgress
  ): string {
    // 分析玩家选择和当前场景的关键词
    const keywords = new Set<string>();
    choiceText.split(/\s+/).forEach(word => keywords.add(word));
    currentDescription?.split(/\s+/).forEach(word => keywords.add(word));

    // 根据进度和关键词智能选择下一个场景类型
    if (progress) {
      const { gaming, study, social } = progress.mainQuests;

      // 如果某个方向进度过低，增加相关场景出现概率
      if (gaming < 30 && keywords.has('游戏')) {
        const gameScenes = ['游戏训练', '排位赛', '直播现场'];
        return this.getRandomUnusedScene(gameScenes);
      }

      if (study < 30 && keywords.has('学习')) {
        const studyScenes = ['课堂学习', '考试现场', '社团活动'];
        return this.getRandomUnusedScene(studyScenes);
      }

      if (social < 30 && (keywords.has('社交') || keywords.has('朋友'))) {
        const socialScenes = ['社交互动', '粉丝互动', '感情困惑'];
        return this.getRandomUnusedScene(socialScenes);
      }

      // 根据关系值选择场景
      for (const [character, relation] of Object.entries(progress.relationships)) {
        if (relation.affinity < -20 && Math.random() < 0.3) {
          // 30%概率触发关系修复场景
          return character === '李雪' ? '社交互动' : '课堂学习';
        }
      }
    }

    // 如果没有特殊情况，使用原有的场景选择逻辑
    if (keywords.has('游戏') || keywords.has('直播')) {
      const gameScenes = ['游戏训练', '排位赛', '直播现场'];
      return this.getRandomUnusedScene(gameScenes);
    } else if (keywords.has('学习') || keywords.has('考试')) {
      const studyScenes = ['课堂学习', '考试现场', '社团活动'];
      return this.getRandomUnusedScene(studyScenes);
    } else if (keywords.has('社交') || keywords.has('朋友')) {
      const socialScenes = ['社交互动', '粉丝互动', '感情困惑'];
      return this.getRandomUnusedScene(socialScenes);
    }

    return this.getRandomUnusedScene(this.sceneTypes);
  }

  /**
   * 获取一个未使用过的特殊事件
   */
  private static getNextSpecialEvent(progress?: StoryProgress): string | undefined {
    if (Math.random() <= 0.7) return undefined;

    // 根据进度选择特殊事件
    if (progress) {
      const { gaming, study, social } = progress.mainQuests;

      // 如果游戏进度高，增加游戏相关特殊事件概率
      if (gaming > 70 && Math.random() < 0.4) {
        const gameEvents = [
          '炸麦警告（情绪激动导致麦克风爆音）',
          '躺赢时刻（队友carry）',
          '连招练习（剑魔技能连招）'
        ];
        return gameEvents[Math.floor(Math.random() * gameEvents.length)];
      }

      // 如果学习进度低，增加学习相关特殊事件概率
      if (study < 30 && Math.random() < 0.4) {
        const studyEvents = [
          '王老师突袭（被抓打游戏）',
          '高考倒计时（压力事件）',
          '家长谈话（成绩下滑）'
        ];
        return studyEvents[Math.floor(Math.random() * studyEvents.length)];
      }

      // 根据关系值触发特殊事件
      for (const [character, relation] of Object.entries(progress.relationships)) {
        if (relation.affinity > 50 && Math.random() < 0.3) {
          return character === '李雪' ? '偶遇李雪（暗恋对象）' : undefined;
        }
      }
    }

    const unusedEvents = this.specialEvents.filter(event => !this.usedSpecialEvents.has(event));
    if (unusedEvents.length === 0) {
      this.usedSpecialEvents.clear();
      return this.specialEvents[Math.floor(Math.random() * this.specialEvents.length)];
    }

    const event = unusedEvents[Math.floor(Math.random() * unusedEvents.length)];
    this.usedSpecialEvents.add(event);
    return event;
  }

  /**
   * 获取对话类型
   */
  private static getDialogueType(sceneType: string, previousChoices?: string[]): string {
    if (sceneType.includes('游戏') || sceneType.includes('直播')) {
      return 'gaming';
    } else if (sceneType.includes('社交') || sceneType.includes('感情')) {
      return 'relationship';
    } else if (sceneType.includes('生活') || sceneType.includes('思考')) {
      return 'life';
    }
    return 'advice';
  }

  /**
   * 获取一个随机的未使用场景类型
   */
  private static getRandomUnusedScene(scenes: string[]): string {
    const recentScenes = this.sceneHistory.slice(-3).map(h => h.type);
    const unusedScenes = scenes.filter(scene => !recentScenes.includes(scene));

    if (unusedScenes.length === 0) {
      return scenes[Math.floor(Math.random() * scenes.length)];
    }

    return unusedScenes[Math.floor(Math.random() * unusedScenes.length)];
  }

  /**
   * 格式化场景历史记录
   */
  private static formatSceneHistory(): string {
    return this.sceneHistory.slice(-3).map((scene, index) =>
      `场景${index + 1}:
类型: ${scene.type}
描述: ${scene.description}
对话: ${scene.dialog}`
    ).join('\n\n');
  }

  /**
   * 更新场景历史记录
   */
  private static updateSceneHistory(scene: GameScene): void {
    this.sceneHistory.push({
      type: this.getSceneTypeFromDescription(scene.description),
      description: scene.description,
      dialog: scene.dialog
    });

    // 只保留最近的10个场景记录
    if (this.sceneHistory.length > 10) {
      this.sceneHistory.shift();
    }
  }

  /**
   * 从场景描述中推断场景类型
   */
  private static getSceneTypeFromDescription(description: string): string {
    for (const type of this.sceneTypes) {
      if (description.includes(type)) {
        return type;
      }
    }
    return '日常生活';
  }

  /**
   * 解析API响应
   */
  private static parseResponse(content: string, nextSceneId: number): GameScene {
    try {
      console.log('解析响应内容:', content);

      // 1. 提取JSON内容，支持多种格式
      let jsonContent = content;

      // 尝试提取Markdown代码块中的JSON
      const jsonBlockMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonBlockMatch && jsonBlockMatch[1]) {
        jsonContent = jsonBlockMatch[1];
        console.log('从代码块中提取的JSON:', jsonContent);
      }

      // 清理内容中的特殊字符和格式
      jsonContent = jsonContent
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // 移除控制字符
        .replace(/:\s*\+(\d+)/g, ': $1') // 移除数值前的加号，如 +10 改为 10
        .replace(/,\s*}/g, '}') // 修复尾部多余的逗号
        .replace(/,\s*]/g, ']') // 修复数组尾部多余的逗号
        .replace(/([{,][^,{]*?)(\w+)(\s*:)/g, '$1"$2"$3') // 为未加引号的键添加引号
        .replace(/:\s*([^",\[\]{}][^,\[\]{}]*?)(\s*[,}])/g, ':"$1"$2'); // 为未加引号的非数字值添加引号

      console.log('清理后的JSON内容:', jsonContent);

      // 2. 尝试解析JSON
      let parsed;
      try {
        parsed = JSON.parse(jsonContent);
        console.log('成功解析JSON:', parsed);
      } catch (e) {
        console.error('JSON解析失败，错误:', e);

        try {
          // 尝试更激进的清理
          jsonContent = jsonContent
            .replace(/\s*:\s*/g, ':') // 移除冒号周围空格
            .replace(/\s*,\s*/g, ',') // 移除逗号周围空格
            .replace(/([{,][^,{]*?)(\w+)(\s*:)/g, '$1"$2"$3') // 为未加引号的键添加引号
            .replace(/:\s*([^",\[\]{}][^,\[\]{}]*?)(\s*[,}])/g, ':"$1"$2') // 为未加引号的非数字值添加引号
            .replace(/:\s*(true|false)(\s*[,}])/g, ':"$1"$2') // 处理布尔值
            .replace(/,\s*}/g, '}') // 修复尾部多余的逗号
            .replace(/,\s*]/g, ']') // 修复数组尾部多余的逗号
            .replace(/([{,]\s*)"([^"]+)"\s*:\s*"([^"]*)"\s*([,}])/g, '$1"$2":"$3"$4'); // 规范化键值对格式

          // *** 特别针对第20位置附近的处理 ***
          // 打印前30个字符以便排查
          console.log('JSON内容前30个字符:', jsonContent.substring(0, 30));

          // 特别针对位置20附近的错误进行预处理
          if (jsonContent.length >= 30) {
            // 检查第20个字符前后的内容
            const char19 = jsonContent.charAt(19); // 索引从0开始，所以第20个位置是索引19
            const char20 = jsonContent.charAt(20);
            const char21 = jsonContent.charAt(21);
            console.log(`字符位置19-21: "${char19}${char20}${char21}"`);

            // 针对位置20常见错误进行修复
            // 情况1: {"description":"xxx"title":"yyy"}  - 缺少逗号
            if (char19 === '"' && char20 !== ':' && char20 !== ',' && char20 !== '}') {
              console.log('检测到位置20缺少逗号，添加逗号');
              jsonContent = jsonContent.substring(0, 20) + ',' + jsonContent.substring(20);
            }

            // 情况2: {"description": xxx, - 缺少值引号
            if (char19 === ':' && !char20.match(/[\s",\d\[\{]/)) {
              console.log('检测到位置20缺少值引号，添加引号');
              jsonContent = jsonContent.substring(0, 20) + '"' + jsonContent.substring(20);

              // 寻找值的结束位置添加引号
              const endPos = jsonContent.substring(20).search(/[,\}]/);
              if (endPos > 0) {
                jsonContent = jsonContent.substring(0, 20 + endPos) + '"' + jsonContent.substring(20 + endPos);
              }
            }

            // 情况3: {"description": "xxx - 缺少右引号
            const openQuotePos = jsonContent.substring(0, 20).lastIndexOf('"');
            if (openQuotePos >= 0 && !jsonContent.substring(openQuotePos + 1, 25).includes('"')) {
              let endPos = jsonContent.substring(20).search(/[,\}]/);
              if (endPos > 0) {
                console.log('检测到缺少闭合引号，添加引号');
                jsonContent = jsonContent.substring(0, 20 + endPos) + '"' + jsonContent.substring(20 + endPos);
              }
            }
          }

          // 重建整个JSON
          if (jsonContent.startsWith('{') && !jsonContent.endsWith('}')) {
            console.log('检测到缺少结束大括号，添加结束大括号');
            jsonContent = jsonContent + '}';
          }

          console.log('清理后的JSON内容:', jsonContent);

          try {
            parsed = JSON.parse(jsonContent);
            console.log('成功解析修复后的JSON');
          } catch (parseError) {
            console.error('仍解析失败:', parseError);

            // 最后尝试更通用的JSON修复
            console.log('尝试使用更通用的错误修复...');

            // 强制提取有效的JSON部分
            let validJson = '{'
            const keyValueRegex = /"([^"]+)"\s*:\s*("[^"]*"|[0-9]+|true|false|\{.*?\}|\[.*?\])/g;
            let matches: RegExpExecArray | null;
            let matchCount = 0;

            while ((matches = keyValueRegex.exec(jsonContent)) !== null) {
              if (matchCount > 0) validJson += ',';
              validJson += `"${matches[1]}":${matches[2]}`;
              matchCount++;
            }
            validJson += '}';

            console.log('构造的有效JSON:', validJson);

            try {
              parsed = JSON.parse(validJson);
              console.log('成功解析重构的JSON');
            } catch (finalError) {
              // 如果仍然失败，直接使用默认值
              console.error('无法修复JSON，使用默认值');
              parsed = {
                description: "由于技术原因，无法加载场景描述",
                dialog: "系统：发生了一些错误，但我们继续前进吧",
                options: [],
                context: {
                  mood: "困惑",
                  location: "未知位置",
                  timeOfDay: "现在",
                  previousEvents: ["系统恢复"]
                }
              };
            }
          }

        } catch (innerError) {
          console.error('更激进清理后仍解析失败:', innerError);

          // 使用默认值
          parsed = {
            description: "无法解析场景描述，请尝试选择其他选项",
            dialog: "（系统错误，无法获取对话）",
            options: [
              {
                text: "继续尝试",
                hint: "再试一次",
                impact: {
                  quest: { type: 'social', value: 1 },
                  relationship: { character: '李雪', value: 0 }
                }
              },
              {
                text: "返回上一步",
                hint: "回到上一个选择",
                impact: {
                  quest: { type: 'study', value: 1 },
                  relationship: { character: '李雪', value: 0 }
                }
              }
            ],
            context: {
              mood: "困惑",
              location: "错误场景",
              timeOfDay: "现在",
              previousEvents: ["JSON解析错误"]
            }
          };
        }
      }

      // 6. 验证和补充必要字段
      if (!parsed.description || typeof parsed.description !== 'string') {
        console.warn('缺少场景描述或格式不正确，使用默认描述');
        parsed.description = '小明站在教室里，思考着下一步该怎么做。周围的同学们各忙各的，有人看书，有人聊天，还有人偷偷玩手机。';
      }

      if (!parsed.dialog || typeof parsed.dialog !== 'string') {
        console.warn('缺少对话内容或格式不正确，使用默认对话');
        parsed.dialog = '我该怎么选择呢？游戏和学习，这是个问题...';
      }

      if (!Array.isArray(parsed.options)) {
        console.warn('缺少选项或格式不正确，使用默认选项');
        parsed.options = [];
      }

      // 确保至少有两个选项
      while (parsed.options.length < 2) {
        const optionTypes = ['study', 'gaming', 'social'];
        const randomType = optionTypes[parsed.options.length % optionTypes.length];

        parsed.options.push({
          text: parsed.options.length === 0 ? "专注于学习" : "打会游戏放松",
          hint: parsed.options.length === 0 ? "提高成绩是当务之急" : "游戏也很重要",
          impact: {
            quest: {
              type: randomType,
              value: 5
            },
            relationship: {
              character: '李雪',
              value: 0
            }
          }
        });
      }

      // 7. 构建场景对象
      const scene: GameScene = {
        id: nextSceneId,
        image: `https://source.unsplash.com/800x500/?${this.getImageKeywords(parsed.description)}&t=${Date.now()}`,
        description: parsed.description.slice(0, 300), // 增加长度限制
        dialog: parsed.dialog.slice(0, 80), // 增加长度限制
        options: parsed.options.slice(0, 3).map((opt: any, index: number) => { // 支持3个选项
          // 生成多样化的影响类型
          const optionTypes = ['gaming', 'study', 'social'];
          const optionText = (opt.text || "继续探索").toLowerCase();

          // 尝试根据选项文本内容判断影响类型
          let impactType = optionTypes[index % optionTypes.length]; // 默认按顺序分配不同类型

          // 根据选项文本确定更合适的类型
          if (optionText.includes('游戏') || optionText.includes('打') || optionText.includes('剑魔') ||
             optionText.includes('技能') || optionText.includes('排位')) {
            impactType = 'gaming';
          } else if (optionText.includes('学习') || optionText.includes('考试') || optionText.includes('上课') ||
                   optionText.includes('听讲') || optionText.includes('作业')) {
            impactType = 'study';
          } else if (optionText.includes('朋友') || optionText.includes('聊天') || optionText.includes('交流') ||
                   optionText.includes('李雪') || optionText.includes('关系')) {
            impactType = 'social';
          }

          return {
            text: (opt.text || "继续探索").slice(0, 20), // 增加长度
            next: -1,
            hint: (opt.hint || "看看接下来会发生什么").slice(0, 30), // 增加长度
            impact: opt.impact || {
              quest: { type: impactType, value: 5 },
              relationship: { character: '李雪', value: 0 }
            }
          };
        }),
        isAIGenerated: true,
        specialEvent: parsed.specialEvent?.slice(0, 50),
        context: parsed.context || {
          mood: '平静',
          location: '教室',
          timeOfDay: '上午',
          previousEvents: []
        },
        reasoning: parsed.reasoning
      };

      return scene;
    } catch (error) {
      console.error('解析响应失败:', error);
      console.error('原始内容:', content);

      // 8. 如果解析失败，返回一个默认场景
      return {
        id: nextSceneId,
        image: 'https://source.unsplash.com/800x500/?classroom,error&t=' + Date.now(),
        description: '（系统：由于技术原因，无法生成新场景。）小明站在原地，思考着下一步该怎么办。',
        dialog: '（让我想想接下来该做什么...）',
        options: [
          {
            text: '重新尝试',
            next: -1,
            hint: '再试一次',
            impact: {
              quest: { type: 'social', value: 0 },
              relationship: { character: '李雪', value: 0 }
            }
          },
          {
            text: '换个方向',
            next: -1,
            hint: '尝试其他选择',
            impact: {
              quest: { type: 'social', value: 0 },
              relationship: { character: '李雪', value: 0 }
            }
          }
        ],
        isAIGenerated: true,
        context: {
          mood: '困惑',
          location: '当前位置',
          timeOfDay: '现在',
          previousEvents: ['系统错误']
        }
      };
    }
  }

  /**
   * 根据场景描述生成图片关键词
   */
  private static getImageKeywords(description: string): string {
    const keywords = new Set<string>();

    // 基础关键词
    keywords.add('chinese');
    keywords.add('student');

    // 根据描述添加关键词
    if (description.includes('游戏') || description.includes('直播')) {
      keywords.add('gaming');
      keywords.add('computer');
    }
    if (description.includes('学习') || description.includes('考试')) {
      keywords.add('classroom');
      keywords.add('study');
    }
    if (description.includes('社交') || description.includes('朋友')) {
      keywords.add('friends');
      keywords.add('people');
    }

    return Array.from(keywords).slice(0, 3).join(',');
  }
}

export default DeepseekService;

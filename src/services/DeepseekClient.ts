import type { GameScene, StoryProgress } from '../stores/game';
import CheckpointService from './CheckpointService';

/**
 * DeepseekClient - OpenAI兼容格式的客户端
 * 用于生成游戏场景和对话，支持流式响应
 */
export class DeepseekClient {
  private apiKey: string;
  private baseURL: string;
  private model: string;
  private temperature: number;
  private maxTokens: number;

  // 场景历史记录
  private sceneHistory: {
    type: string;
    description: string;
    dialog: string;
  }[] = [];

  // 记录已使用的特殊事件
  private usedSpecialEvents = new Set<string>();

  // 场景类型列表
  private sceneTypes = [
    '课堂学习', '游戏训练', '排位赛', '直播现场', '考试现场',
    '社交互动', '家庭生活', '社团活动', '比赛解说', '粉丝互动',
    '感情困惑', '人生思考'
  ];

  private specialEvents = [
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

  // 角色背景信息
  private characterBackground = `角色背景：
- 姓名：小明（游戏ID：最强剑魔）
- 身份：高三学生，知名游戏主播
- 游戏特长：英雄联盟剑魔玩家，连续29天冲击王者失败
- 性格特点：
  1. 游戏时激情四射，现实中是个普通学生
  2. 直播时经常情绪激动导致麦克风爆音
  3. 对游戏有着极强的执着
  4. 对感情和生活有独特见解`;

  /**
   * 构造函数
   */
  constructor(options: {
    apiKey: string;
    baseURL: string;
    model?: string;
    temperature?: number;
    maxTokens?: number;
  }) {
    this.apiKey = options.apiKey;
    this.baseURL = options.baseURL;
    this.model = options.model || 'deepseek-r1';
    this.temperature = options.temperature || 0.8;
    this.maxTokens = options.maxTokens || 2000;
  }

  /**
   * 使用OpenAI API格式创建聊天完成
   */
  async chatCompletion(params: {
    messages: Array<{role: string; content: string}>;
    stream?: boolean;
  }): Promise<any> {
    try {
      // 确保API地址格式正确
      const apiURL = this.ensureCorrectApiUrl(this.baseURL);

      const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: params.messages,
          temperature: this.temperature,
          max_tokens: this.maxTokens,
          stream: params.stream || false
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `API请求失败: ${response.status} ${response.statusText}\n${
            errorData ? JSON.stringify(errorData) : ''
          }`
        );
      }

      if (params.stream) {
        return this.handleStream(response);
      } else {
        return response.json();
      }
    } catch (error) {
      console.error('API请求失败:', error);
      throw error;
    }
  }

  /**
   * 提供与OpenAI API兼容的接口结构
   */
  get completions() {
    return {
      create: (params: {
        messages: Array<{role: string; content: string}>;
        stream?: boolean;
      }) => this.chatCompletion(params)
    };
  }

  /**
   * 兼容OpenAI API的嵌套结构
   */
  get chat() {
    const self = this;
    return {
      completions: {
        create: (params: {
          messages: Array<{role: string; content: string}>;
          stream?: boolean;
        }) => self.chatCompletion(params)
      }
    };
  }

  /**
   * 确保API地址正确包含/chat/completions
   */
  private ensureCorrectApiUrl(url: string): string {
    if (url.includes('/chat/completions')) {
      return url;
    }

    // 移除末尾斜杠
    const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    return `${baseUrl}/chat/completions`;
  }

  /**
   * 处理流式响应
   */
  private async handleStream(response: Response): Promise<AsyncIterable<any>> {
    // 自定义异步迭代器来处理流式响应
    const iterator = {
      [Symbol.asyncIterator]() {
        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        return {
          async next(): Promise<IteratorResult<any>> {
            try {
              const { done, value } = await reader.read();

              if (done) {
                // 处理缓冲区中剩余的数据
                if (buffer.trim().length > 0) {
                  // 尝试解析最后的数据块
                  try {
                    const chunk = buffer.trim();
                    if (chunk.startsWith('data: ')) {
                      const jsonStr = chunk.slice(6).trim();
                      if (jsonStr !== '[DONE]') {
                        const data = JSON.parse(jsonStr);
                        buffer = '';
                        return { value: data, done: false };
                      }
                    }
                  } catch (e) {
                    console.warn('解析流式数据最后一块时出错', e);
                  }
                }
                return { done: true, value: undefined };
              }

              // 将新的数据块添加到缓冲区
              buffer += decoder.decode(value, { stream: true });

              // 从缓冲区中提取完整的数据行
              const lines = buffer.split('\n');
              buffer = lines.pop() || ''; // 最后一行可能不完整，保留到下一次

              // 处理所有完整的行
              for (const line of lines) {
                const trimmedLine = line.trim();
                if (trimmedLine === '') continue;

                if (trimmedLine.startsWith('data: ')) {
                  const jsonStr = trimmedLine.slice(6).trim();
                  if (jsonStr === '[DONE]') {
                    return { done: true, value: undefined };
                  }

                  try {
                    const data = JSON.parse(jsonStr);
                    return { value: data, done: false };
                  } catch (e) {
                    console.warn('解析JSON数据时出错', e, jsonStr);
                    continue;
                  }
                }
              }

              // 如果没有找到有效的数据行，继续读取
              return this.next();
            } catch (error) {
              console.error('流式处理出错', error);
              return { done: true, value: undefined };
            }
          },

          async return(): Promise<IteratorResult<any>> {
            // 清理资源
            await reader.cancel();
            return { done: true, value: undefined };
          }
        };
      }
    };

    return iterator;
  }

  /**
   * 创建流式响应（兼容旧代码）
   */
  private async createStreamingResponse(url: string, body: any): Promise<AsyncIterable<any>> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API请求失败: ${response.status} - ${errorText}`);
    }

    return this.handleStream(response);
  }

  /**
   * 生成初始场景
   */
  async generateInitialScene(): Promise<GameScene> {
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

      const response = await this.chatCompletion({
        messages,
        stream: false
      });

      const content = response.choices[0].message.content;
      return this.parseResponse(content, 1);
    } catch (error) {
      console.error('生成初始场景失败:', error);
      throw error;
    }
  }

  /**
   * 生成新的游戏场景（支持流式响应）
   */
  async generateScene(params: {
    playerName: string;
    currentSceneId: number;
    choiceText: string;
    currentScene?: GameScene;
    previousChoices?: string[];
    storyProgress: StoryProgress;
    checkpointId?: string;
    stream?: boolean;
  }): Promise<GameScene | AsyncIterable<any>> {
    try {
      // 1. 尝试从检查点恢复上下文
      if (params.checkpointId) {
        const checkpoint = CheckpointService.get(params.checkpointId);
        if (checkpoint) {
          this.sceneHistory = checkpoint.sceneHistory;
          console.log('从检查点恢复场景历史:', this.sceneHistory);
        }
      }

      // 2. 生成场景
      const sceneType = this.getNextSceneType(params.choiceText, params.currentScene?.description, params.storyProgress);
      const specialEvent = this.getNextSpecialEvent(params.storyProgress);

      const prompt = this.generatePrompt({
        ...params,
        sceneType,
        specialEvent,
        sceneHistory: this.sceneHistory.slice(-3)  // 只使用最近的3个场景
      });

      const messages = [
        {
          role: 'system',
          content: '你是一个擅长通过思维链推理来生成故事情节的AI。你需要分析当前情况，考虑人物关系发展，并选择最合适的剧情走向。确保输出是合法的JSON格式。'
        },
        {
          role: 'user',
          content: prompt
        }
      ];

      // 3. 处理流式响应
      if (params.stream) {
        return this.chatCompletion({
          messages,
          stream: true
        });
      }

      // 4. 处理普通响应
      const response = await this.chatCompletion({
        messages,
        stream: false
      });

      const content = response.choices[0].message.content;
      const scene = this.parseResponse(content, params.currentSceneId + 1);

      // 5. 更新历史记录
      this.updateSceneHistory(scene);

      // 6. 创建新的检查点
      const checkpointId = CheckpointService.create({
        sceneHistory: this.sceneHistory,
        storyProgress: params.storyProgress,
        currentScene: scene,
        lastChoices: params.previousChoices || []
      });

      // 7. 返回场景和检查点ID
      return {
        ...scene,
        checkpointId
      };
    } catch (error) {
      console.error('生成场景失败:', error);
      throw error;
    }
  }

  /**
   * 生成场景提示词
   */
  private generatePrompt(params: {
    sceneType: string;
    specialEvent?: string;
    sceneHistory: Array<{type: string; description: string; dialog: string}>;
    storyProgress: StoryProgress;
    currentScene?: GameScene;
    choiceText: string;
    previousChoices?: string[];
  }): string {
    return `作为一个AI助手，你需要基于以下信息生成游戏的下一个场景。请注意故事的连贯性和角色关系发展。

思考步骤：
1. 分析当前场景和玩家选择
2. 考虑角色关系发展
3. 结合主线任务进度
4. 选择合适的场景发展方向
5. 设计有意义的选项
6. 整合特殊事件（如果有）

${this.characterBackground}

当前进度：
游戏成就: ${params.storyProgress.mainQuests.gaming}/100
学习进度: ${params.storyProgress.mainQuests.study}/100
社交关系: ${params.storyProgress.mainQuests.social}/100

重要关系：
${Object.entries(params.storyProgress.relationships)
  .map(([name, rel]) => `${name}（好感度：${rel.affinity}）`)
  .join('\n')}

历史场景：
${params.sceneHistory.map((scene, index) =>
  `场景${index + 1}:
类型: ${scene.type}
描述: ${scene.description}
对话: ${scene.dialog}`
).join('\n\n')}

当前情况：
场景类型: ${params.sceneType}
${params.specialEvent ? `特殊事件: ${params.specialEvent}` : ''}
玩家选择: ${params.choiceText}
${params.previousChoices?.length ? `之前的选择: ${params.previousChoices.join(' -> ')}` : ''}

要求：
1. 根据玩家的选择和当前情况，合理发展剧情
2. 考虑角色关系的发展，体现好感度变化
3. 根据主线任务进度调整剧情走向
4. 选项要能推动故事发展，并影响角色关系
5. 特殊事件要自然融入场景
6. 确保故事的连贯性和合理性
7. 避免与历史场景重复

请按照以下格式输出JSON：
{
  "description": "场景描述（200字以内）",
  "dialog": "小明的对话（50字以内）",
  "options": [
    {
      "text": "选项1（15字以内）",
      "hint": "选项提示（20字以内）",
      "impact": {
        "quest": {"type": "gaming|study|social", "value": number},
        "relationship": {"character": "string", "value": number},
        "flag": "string"
      }
    }
  ],
  "specialEvent": "特殊事件的具体描述（可选，50字以内）",
  "context": {
    "mood": "当前情绪",
    "location": "场景位置",
    "timeOfDay": "时间段",
    "previousEvents": ["重要历史事件"]
  },
  "reasoning": "思维过程说明（可选）"
}`;
  }

  /**
   * 解析API响应
   */
  private parseResponse(content: string, nextSceneId: number): GameScene {
    // 与原始实现相同的解析逻辑
    try {
      console.log('解析响应内容:', content);

      // 1. 清理内容中的特殊字符和格式
      let jsonContent = content
        .replace(/```json\s*|\s*```/g, '')  // 移除 markdown 代码块标记
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // 移除控制字符
        .replace(/\\n/g, ' ')  // 将换行符替换为空格
        .replace(/\s+/g, ' ')  // 将多个空格合并为一个
        .trim();

      // 2. 尝试提取最外层的 JSON 对象
      const jsonMatch = jsonContent.match(/\{(?:[^{}]|(\{[^{}]*\}))*\}/);
      if (jsonMatch) {
        jsonContent = jsonMatch[0];
      }

      // 3. 尝试修复常见的 JSON 格式错误
      jsonContent = jsonContent
        .replace(/,\s*([}\]])/g, '$1')  // 移除对象或数组末尾多余的逗号
        .replace(/([{,])\s*([^"'\s].*?):/g, '$1"$2":')  // 为未加引号的键名添加引号
        .replace(/:\s*'([^']*)'/g, ':"$1"')  // 将单引号替换为双引号
        .replace(/"\s*\+\s*"/g, '')  // 移除字符串连接符
        .replace(/\\/g, '\\\\');  // 转义反斜杠

      // 4. 解析 JSON
      let parsed;
      try {
        parsed = JSON.parse(jsonContent);
      } catch (e) {
        console.error('第一次 JSON 解析失败，错误:', e);
        console.log('尝试进一步清理内容...');

        // 5. 如果解析失败，尝试更激进的清理
        jsonContent = jsonContent
          .replace(/[^\x20-\x7E]+/g, '')  // 只保留基本 ASCII 字符
          .replace(/\s*:\s*/g, ':')  // 规范化冒号周围的空格
          .replace(/\s*,\s*/g, ',')  // 规范化逗号周围的空格
          .replace(/^\s*{\s*/, '{')  // 清理开头的空格
          .replace(/\s*}\s*$/, '}'); // 清理结尾的空格

        parsed = JSON.parse(jsonContent);
      }

      // 6. 验证和补充必要字段
      if (!parsed.description || typeof parsed.description !== 'string') {
        throw new Error('缺少场景描述或格式不正确');
      }

      if (!parsed.dialog || typeof parsed.dialog !== 'string') {
        throw new Error('缺少对话内容或格式不正确');
      }

      if (!Array.isArray(parsed.options)) {
        parsed.options = [];
      }

      // 确保至少有两个选项
      while (parsed.options.length < 2) {
        parsed.options.push({
          text: "继续探索",
          hint: "看看接下来会发生什么",
          impact: {
            quest: { type: 'social', value: 5 },
            relationship: { character: '李雪', value: 0 }
          }
        });
      }

      // 7. 构建场景对象
      const scene: GameScene = {
        id: nextSceneId,
        image: `https://source.unsplash.com/800x500/?${this.getImageKeywords(parsed.description)}&t=${Date.now()}`,
        description: parsed.description.slice(0, 200), // 限制长度
        dialog: parsed.dialog.slice(0, 50), // 限制长度
        options: parsed.options.slice(0, 2).map((opt: any) => ({
          text: (opt.text || "继续探索").slice(0, 15),
          next: -1,
          hint: (opt.hint || "看看接下来会发生什么").slice(0, 20),
          impact: opt.impact || {
            quest: { type: 'social', value: 5 },
            relationship: { character: '李雪', value: 0 }
          }
        })),
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
  private getImageKeywords(description: string): string {
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

  /**
   * 获取下一个场景类型
   */
  private getNextSceneType(
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
   * 获取一个随机的未使用场景类型
   */
  private getRandomUnusedScene(scenes: string[]): string {
    const recentScenes = this.sceneHistory.slice(-3).map(h => h.type);
    const unusedScenes = scenes.filter(scene => !recentScenes.includes(scene));

    if (unusedScenes.length === 0) {
      return scenes[Math.floor(Math.random() * scenes.length)];
    }

    return unusedScenes[Math.floor(Math.random() * unusedScenes.length)];
  }

  /**
   * 获取一个未使用过的特殊事件
   */
  private getNextSpecialEvent(progress?: StoryProgress): string | undefined {
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
   * 更新场景历史记录
   */
  private updateSceneHistory(scene: GameScene): void {
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
  private getSceneTypeFromDescription(description: string): string {
    for (const type of this.sceneTypes) {
      if (description.includes(type)) {
        return type;
      }
    }
    return '日常生活';
  }
}

export default DeepseekClient;

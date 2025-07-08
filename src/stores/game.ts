import { defineStore } from 'pinia'
import DeepseekService from '../services/deepseekService'

export interface GameLog {
  sceneId: number
  choiceText: string
  timestamp: string
}

export interface GameScene {
  id: number
  image?: string
  description: string
  dialog: string
  options: {
    text: string
    hint?: string
    next?: number
    impact?: {
      quest?: { type: string, value: number }
      relationship?: { character: string, value: number }
      flag?: string
    }
  }[]
  context?: {
    mood?: string
    location?: string
    timeOfDay?: string
    previousEvents?: string[]
  }
  specialEvent?: string
  reasoning?: string
  isAIGenerated?: boolean
  checkpointId?: string
}

export interface StoryProgress {
  mainQuests: {
    gaming: number
    study: number
    social: number
    other: number
  }
  relationships: {
    [character: string]: {
      character: string
      affinity: number
      events: string[]
    }
  }
  flags: Set<string>
}

export const useGameStore = defineStore('game', {
  state: () => ({
    playerName: '',
    currentSceneId: 1,
    currentScene: undefined as GameScene | undefined,
    isGenerating: false,
    aiErrorMessage: '',
    gameLogs: [] as GameLog[],

    // 故事进度追踪
    storyProgress: {
      mainQuests: {
        gaming: 0,
        study: 0,
        social: 0,
        other: 0
      },
      relationships: {
        '李雪': {
          character: '李雪',
          affinity: 0,
          events: []
        },
        '王老师': {
          character: '王老师',
          affinity: 0,
          events: []
        }
      },
      flags: new Set<string>()
    } as StoryProgress,

    // 只保留初始场景，其余场景由AI生成
    initialScene: {
      id: 1,
      image: 'https://source.unsplash.com/800x500/?classroom,student,chinese&t=' + Date.now(),
      description: '高考倒计时30天，某市第一高中的教室里，小明正心不在焉地听着班主任王老师讲解数学题。但他的心思完全在今晚的游戏排位赛上 —— 作为服务器知名的剑魔玩家"最强剑魔"，他已经连续29天冲击王者失败了。昨晚的直播间里，他又因为激动地大喊"回答我！"把麦克风震炸了。',
      dialog: '（小明看着手机里的游戏战绩，自言自语）"怎么不找找自己的问题呢...这把打完我要是能拿MVP就好了。"',
      options: [
        {
          text: '专心听课',
          next: 2,
          hint: '做一个好学生',
          impact: {
            quest: { type: 'study', value: 10 },
            relationship: { character: '王老师', value: 5 }
          }
        },
        {
          text: '继续研究剑魔连招',
          next: 3,
          hint: '今晚一定要上王者',
          impact: {
            quest: { type: 'gaming', value: 10 },
            relationship: { character: '王老师', value: -5 }
          }
        },
        {
          text: '给李雪递纸条',
          next: 4,
          hint: '要不要约她双排？',
          impact: {
            quest: { type: 'social', value: 5 },
            relationship: { character: '李雪', value: 10 }
          }
        }
      ],
      context: {
        mood: '焦虑',
        location: '教室',
        timeOfDay: '上午',
        previousEvents: ['昨晚直播麦克风炸了', '连续29天冲击王者失败']
      },
      specialEvent: '王老师正在讲解一道高考压轴题，黑板上写满了公式。小明的手机里还在循环播放着昨晚的直播片段。'
    } as GameScene
  }),

  actions: {
    setPlayerName(name: string) {
      this.playerName = name
    },

    async startNewGame() {
      this.currentScene = this.initialScene
      this.currentSceneId = 1
      this.gameLogs = []
      this.addGameLog(1, '游戏开始')
    },

    async handleChoice(option: { text: string, next?: number, impact?: any }) {
      try {
        this.isGenerating = true
        this.aiErrorMessage = ''
        const choiceText = option.text

        // 记录当前选择
        this.addGameLog(this.currentSceneId, choiceText)

        // 处理选项的影响（如果有）
        if (option.impact) {
          this.processImpact(option.impact)
        }

        // 生成下一个场景（完全通过AI）
        const nextScene = await DeepseekService.generateScene({
          playerName: this.playerName,
          currentSceneId: this.currentSceneId,
          choiceText: choiceText,
          currentScene: this.currentScene,
          storyProgress: this.storyProgress,
          streamCallbacks: {
            onReasoningUpdate: (content) => {
              this.updateReasoningStream(content)
            },
            onDialogUpdate: (content) => {
              this.updateDialogStream(content)
            }
          }
        })

        // 更新当前场景
        this.currentScene = nextScene
        this.currentSceneId = nextScene.id

      } catch (error: any) {
        console.error('处理选择时出错:', error)

        // 提供更详细的错误信息
        let errorMessage = '场景生成遇到问题';
        if (error.message) {
          if (error.message.includes('JSON')) {
            errorMessage = 'AI响应格式异常，正在尝试修复...';
          } else if (error.message.includes('network') || error.message.includes('fetch')) {
            errorMessage = '网络连接问题，请检查网络设置';
          } else if (error.message.includes('401') || error.message.includes('unauthorized')) {
            errorMessage = 'API密钥无效，请检查配置';
          } else if (error.message.includes('429')) {
            errorMessage = '请求过于频繁，请稍后再试';
          } else {
            errorMessage = `生成失败: ${error.message}`;
          }
        }

        this.aiErrorMessage = errorMessage;

        // 尝试使用备用场景恢复
        console.log('尝试使用备用场景恢复...');
        try {
          // 创建一个简单的备用场景
          const backupScene = {
            id: this.currentSceneId + 1,
            image: `https://source.unsplash.com/800x500/?classroom,student&t=${Date.now()}`,
            description: `小明在${this.currentScene?.context?.location || '教室'}里继续他的故事。虽然刚才遇到了一些小插曲，但生活还在继续。他需要重新整理思路，决定下一步该怎么做。`,
            dialog: '虽然有些意外，但我要继续前进...这次我要更仔细地考虑。',
            options: [
              {
                text: '专注学习',
                hint: '把注意力放在功课上',
                impact: {
                  quest: { type: 'study', value: 8 },
                  relationship: { character: '李雪', value: 2 }
                }
              },
              {
                text: '打开游戏',
                hint: '适当放松调整状态',
                impact: {
                  quest: { type: 'gaming', value: 8 },
                  relationship: { character: '李雪', value: 0 }
                }
              },
              {
                text: '和朋友聊天',
                hint: '社交也很重要',
                impact: {
                  quest: { type: 'social', value: 8 },
                  relationship: { character: '李雪', value: 3 }
                  }
                }
              ],
              context: {
                mood: '坚定',
                location: this.currentScene?.context?.location || '教室',
                timeOfDay: this.currentScene?.context?.timeOfDay || '现在',
                previousEvents: ['遇到技术问题但已恢复']
              },
              isAIGenerated: false
            };

            this.currentScene = backupScene;
            this.currentSceneId = backupScene.id;
            this.aiErrorMessage = ''; // 清除错误信息，因为已经恢复
          } catch (backupError) {
            console.error('备用场景创建失败:', backupError);
          }
      } finally {
        this.isGenerating = false
      }
    },

    // 处理选项的影响
    processImpact(impact: any) {
      // 处理任务进度
      if (impact.quest) {
        const { type, value } = impact.quest
        if (type && typeof value === 'number') {
          if (type === 'gaming') this.storyProgress.mainQuests.gaming = Math.min(100, this.storyProgress.mainQuests.gaming + value)
          if (type === 'study') this.storyProgress.mainQuests.study = Math.min(100, this.storyProgress.mainQuests.study + value)
          if (type === 'social') this.storyProgress.mainQuests.social = Math.min(100, this.storyProgress.mainQuests.social + value)
          if (type === 'other') this.storyProgress.mainQuests.other = Math.min(100, this.storyProgress.mainQuests.other + value)
        }
      }

      // 处理关系变化
      if (impact.relationship) {
        const { character, value } = impact.relationship
        if (character && typeof value === 'number' && this.storyProgress.relationships[character]) {
          this.storyProgress.relationships[character].affinity += value

          // 可选：记录事件
          if (value !== 0) {
            const event = value > 0 ? '关系改善' : '关系恶化'
            this.storyProgress.relationships[character].events.push(event)
          }
        }
      }

      // 处理标志位（如果有）
      if (impact.flag) {
        this.storyProgress.flags.add(impact.flag)
      }
    },

    // 流式输出更新函数
    updateReasoningStream(content: string) {
      // 处理思维链流式内容
      // console.log('思维链更新:', content)
      // 此处不修改状态，由组件自行处理
    },

    updateDialogStream(content: string) {
      // 处理对话流式内容
      // console.log('对话更新:', content)
      // 此处不修改状态，由组件自行处理
    },

    addGameLog(sceneId: number, choiceText: string) {
      this.gameLogs.push({
        sceneId,
        choiceText,
        timestamp: new Date().toISOString()
      })
    },

    resetGame() {
      this.currentScene = this.initialScene;
      this.currentSceneId = 1;
      this.gameLogs = [];
      this.isGenerating = false;
      this.aiErrorMessage = '';

      // 重置故事进度
      this.storyProgress = {
        mainQuests: {
          gaming: 0,
          study: 0,
          social: 0,
          other: 0
        },
        relationships: {
          '李雪': {
            character: '李雪',
            affinity: 0,
            events: []
          },
          '王老师': {
            character: '王老师',
            affinity: 0,
            events: []
          }
        },
        flags: new Set<string>()
      };
    }
  }
})

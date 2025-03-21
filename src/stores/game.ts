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
        social: 0
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
        this.aiErrorMessage = '生成场景失败: ' + (error.message || '未知错误')
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
      console.log('思维链更新:', content)
      // 此处不修改状态，由组件自行处理
    },

    updateDialogStream(content: string) {
      // 处理对话流式内容
      console.log('对话更新:', content)
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
          social: 0
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

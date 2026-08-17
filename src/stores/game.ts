import { defineStore } from 'pinia'
import DeepseekService from '../services/deepseekService'
import { GAME_SCRIPTS, type GameScript } from '../constants/gameScripts'

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
    activeScriptId: GAME_SCRIPTS[0].id,
    activeScript: GAME_SCRIPTS[0] as GameScript,
    activeTraitId: 'gaming',

    // 故事进度追踪
    storyProgress: {
      mainQuests: {
        gaming: 25,
        study: 15,
        social: 10,
        other: 0
      },
      relationships: {} as Record<string, { character: string; affinity: number; events: string[] }>,
      flags: new Set<string>()
    } as StoryProgress,

    // 初始场景
    initialScene: GAME_SCRIPTS[0].initialScene as GameScene
  }),

  actions: {
    setPlayerName(name: string) {
      this.playerName = name
    },

    setScript(scriptId: string) {
      const found = GAME_SCRIPTS.find(s => s.id === scriptId)
      if (found) {
        this.activeScriptId = found.id
        this.activeScript = found
        this.initialScene = found.initialScene as GameScene
        DeepseekService.setActiveScript(found)
      }
    },

    setCustomScript(customScript: GameScript) {
      this.activeScriptId = customScript.id
      this.activeScript = customScript
      this.initialScene = customScript.initialScene as GameScene
      DeepseekService.setActiveScript(customScript)
    },

    async startNewGame(traitId: string = 'balanced', scriptId?: string) {
      if (scriptId) {
        this.setScript(scriptId)
      }

      this.activeTraitId = traitId
      this.currentScene = JSON.parse(JSON.stringify(this.activeScript.initialScene)) as GameScene
      this.currentSceneId = 1
      this.gameLogs = []
      
      const foundTrait = this.activeScript.traits.find(t => t.id === traitId)
      if (foundTrait?.bonus) {
        this.storyProgress.mainQuests = {
          gaming: foundTrait.bonus.gaming ?? 15,
          study: foundTrait.bonus.study ?? 15,
          social: foundTrait.bonus.social ?? 10,
          other: foundTrait.bonus.other ?? 0
        }
      } else {
        this.storyProgress.mainQuests = { gaming: 15, study: 15, social: 10, other: 0 }
      }

      this.storyProgress.relationships = {}
      this.storyProgress.flags = new Set<string>()

      // 同步到 DeepseekService
      DeepseekService.setActiveScript(this.activeScript)

      this.addGameLog(1, `世界线【${this.activeScript.title}】启动，身份【${this.playerName || '主角'}】就绪`)
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
          playerName: this.playerName || '主角',
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

        if (!nextScene) {
          throw new Error('未能生成有效场景数据')
        }

        // 如果新场景自带 impact，也同步应用
        if (nextScene.options) {
          // ensure each option has basic next or impact structure
          nextScene.options.forEach((opt: any, idx: number) => {
            if (!opt.impact) {
              const types: ('gaming' | 'study' | 'social' | 'other')[] = ['gaming', 'study', 'social', 'other']
              opt.impact = {
                quest: { type: types[idx % 4], value: 8 + Math.floor(Math.random() * 5) }
              }
            }
          })
        }

        // 成功生成，更新场景
        this.currentScene = nextScene
        this.currentSceneId = nextScene.id

      } catch (error: any) {
        console.error('生成下一个场景失败:', error)
        this.aiErrorMessage = error.message || '生成场景失败，请重试'
        throw error
      } finally {
        this.isGenerating = false
      }
    },

    // 处理选项对故事进度的影响
    processImpact(impact: {
      quest?: { type: string, value: number }
      relationship?: { character: string, value: number }
      flag?: string
    }) {
      if (impact.quest) {
        const { type, value } = impact.quest
        if (type in this.storyProgress.mainQuests) {
          const currentVal = this.storyProgress.mainQuests[type as keyof typeof this.storyProgress.mainQuests] || 0
          this.storyProgress.mainQuests[type as keyof typeof this.storyProgress.mainQuests] = 
            Math.max(0, Math.min(100, currentVal + value))
        }
      }

      if (impact.relationship) {
        const { character, value } = impact.relationship
        if (!this.storyProgress.relationships[character]) {
          this.storyProgress.relationships[character] = {
            character,
            affinity: 0,
            events: []
          }
        }
        this.storyProgress.relationships[character].affinity = 
          Math.max(-100, Math.min(100, this.storyProgress.relationships[character].affinity + value))
      }

      if (impact.flag) {
        this.storyProgress.flags.add(impact.flag)
      }
    },

    addGameLog(sceneId: number, choiceText: string) {
      this.gameLogs.push({
        sceneId,
        choiceText,
        timestamp: new Date().toLocaleTimeString()
      })
    },

    updateReasoningStream(_content: string) {
      // 触发订阅监听
    },

    updateDialogStream(_content: string) {
      // 触发订阅监听
    },

    resetGame() {
      this.currentSceneId = 1
      this.currentScene = JSON.parse(JSON.stringify(this.activeScript.initialScene)) as GameScene
      this.gameLogs = []
      
      const foundTrait = this.activeScript.traits.find(t => t.id === this.activeTraitId)
      if (foundTrait?.bonus) {
        this.storyProgress.mainQuests = {
          gaming: foundTrait.bonus.gaming ?? 15,
          study: foundTrait.bonus.study ?? 15,
          social: foundTrait.bonus.social ?? 10,
          other: foundTrait.bonus.other ?? 0
        }
      } else {
        this.storyProgress.mainQuests = { gaming: 15, study: 15, social: 10, other: 0 }
      }
      
      this.storyProgress.relationships = {}
      this.storyProgress.flags = new Set<string>()
      this.isGenerating = false
      this.aiErrorMessage = ''
    }
  }
})

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
    activeScriptId: 'sword_gaokao',
    activeScript: GAME_SCRIPTS[0] as GameScript,

    // 故事进度追踪
    storyProgress: {
      mainQuests: {
        gaming: 15,
        study: 15,
        social: 10,
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
      }
    },

    setCustomScript(customScript: GameScript) {
      this.activeScriptId = customScript.id
      this.activeScript = customScript
      this.initialScene = customScript.initialScene as GameScene
    },

    async startNewGame(trait: string = 'balanced', scriptId?: string) {
      if (scriptId) {
        this.setScript(scriptId)
      }

      this.currentScene = this.activeScript.initialScene as GameScene
      this.currentSceneId = 1
      this.gameLogs = []
      
      const foundTrait = this.activeScript.traits.find(t => t.id === trait)
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

      // 同步到 DeepseekService
      DeepseekService.setActiveScript(this.activeScript)

      this.addGameLog(1, `剧本【${this.activeScript.title}】开启，玩家【${this.playerName}】登场`)
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

        if (!nextScene) {
          throw new Error('未能生成有效场景数据')
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
          this.storyProgress.mainQuests[type as keyof typeof this.storyProgress.mainQuests] = 
            Math.max(0, Math.min(100, this.storyProgress.mainQuests[type as keyof typeof this.storyProgress.mainQuests] + value))
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

    updateReasoningStream(content: string) {
      if (this.currentScene) {
        if (!this.currentScene.reasoning) {
          this.currentScene.reasoning = ''
        }
        this.currentScene.reasoning += content
      }
    },

    updateDialogStream(content: string) {
      if (this.currentScene) {
        if (!this.currentScene.dialog) {
          this.currentScene.dialog = ''
        }
        this.currentScene.dialog += content
      }
    },

    resetGame() {
      this.currentSceneId = 1
      this.currentScene = this.activeScript.initialScene as GameScene
      this.gameLogs = []
      this.storyProgress = {
        mainQuests: {
          gaming: 15,
          study: 15,
          social: 10,
          other: 0
        },
        relationships: {},
        flags: new Set<string>()
      }
      this.isGenerating = false
      this.aiErrorMessage = ''
    }
  }
})

import type { GameScene, StoryProgress } from '../stores/game'
import { GAME_SCRIPTS, type GameScript } from '../constants/gameScripts'
import CheckpointService from './CheckpointService'

// API配置 - 优先从 localStorage 读取，其次从 Vite 环境变量 .env 中读取，最后为系统默认值
export const API_CONFIG = {
  apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY || '',
  baseUrl: localStorage.getItem('apiUrl') || import.meta.env.VITE_DEEPSEEK_BASE_URL || 'https://api.siliconflow.cn/v1',
  model: localStorage.getItem('modelName') || import.meta.env.VITE_DEEPSEEK_MODEL || 'Qwen/Qwen2.5-7B-Instruct',
  temperature: 0.8,
  maxTokens: 2000,
  topP: 0.9,
  topK: -1,
  frequencyPenalty: 0,
  presencePenalty: 0
}

// 提供一个函数来更新API配置
export function updateApiConfig(config: Partial<typeof API_CONFIG>) {
  Object.assign(API_CONFIG, config)
  if (config.baseUrl) localStorage.setItem('apiUrl', config.baseUrl)
  if (config.model) localStorage.setItem('modelName', config.model)
}

/**
 * 确保 API 地址包含 /chat/completions
 */
export function getFormattedEndpoint(url: string): string {
  if (!url) return ''
  if (url.includes('/chat/completions')) return url
  const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url
  return `${cleanUrl}/chat/completions`
}

/**
 * Deepseek AI 叙事推演服务
 * 深度支持多剧本动态分支生成、思维链解析与沉浸式 RPG 交互
 */
export class DeepseekService {
  private static activeScript: GameScript = GAME_SCRIPTS[0]
  private static sceneHistory: {
    description: string
    dialog: string
    choice?: string
  }[] = []

  public static setActiveScript(script: GameScript) {
    if (!script) return
    this.activeScript = script
    this.sceneHistory = []
  }

  public static getActiveScript(): GameScript {
    return this.activeScript
  }

  /**
   * 发送非流式 API 请求
   */
  private static async sendRequest(messages: any[]): Promise<any> {
    try {
      if (!API_CONFIG.baseUrl || !API_CONFIG.baseUrl.startsWith('http')) {
        throw new Error('无效的 API 地址: ' + API_CONFIG.baseUrl)
      }

      const requestBody = {
        model: API_CONFIG.model,
        messages,
        temperature: API_CONFIG.temperature,
        max_tokens: API_CONFIG.maxTokens,
        stream: false
      }

      const targetUrl = getFormattedEndpoint(API_CONFIG.baseUrl)

      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_CONFIG.apiKey}`
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API 请求失败: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      if (!data.choices?.[0]?.message?.content) {
        throw new Error('API 响应格式异常')
      }

      return data
    } catch (error) {
      console.error('DeepseekService sendRequest 失败:', error)
      throw error
    }
  }

  /**
   * 创建流式客户端
   */
  public static createModel() {
    return {
      streamText: async ({
        messages,
        model = API_CONFIG.model,
        temperature = API_CONFIG.temperature,
        max_tokens = API_CONFIG.maxTokens
      }: {
        messages: any[]
        model?: string
        temperature?: number
        max_tokens?: number
      }) => {
        try {
          const targetUrl = getFormattedEndpoint(API_CONFIG.baseUrl)
          const response = await fetch(targetUrl, {
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
          })

          if (!response.ok) {
            const error = await response.text()
            throw new Error(`API 响应错误 ${response.status}: ${error}`)
          }

          return {
            dataStream: this._createAsyncIterator(response)
          }
        } catch (error) {
          console.error('流式请求失败:', error)
          throw error
        }
      }
    }
  }

  /**
   * 处理流式响应的异步迭代器
   */
  private static async* _createAsyncIterator(response: Response) {
    if (!response.body) {
      throw new Error('响应没有可读的正文')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed || trimmed === 'data: [DONE]') continue

          if (trimmed.startsWith('data: ')) {
            try {
              const json = JSON.parse(trimmed.substring(6))
              yield json
            } catch (error) {
              console.warn('解析流式行数据忽略:', trimmed)
            }
          }
        }
      }
    } finally {
      reader.releaseLock()
    }
  }

  /**
   * 核心场景生成：根据当前剧本与玩家选择动态生成后续分支
   */
  public static async generateScene(params: {
    playerName: string
    currentSceneId: number
    choiceText: string
    currentScene?: GameScene
    storyProgress: StoryProgress
    checkpointId?: string
    streamCallbacks?: {
      onReasoningUpdate?: (content: string) => void
      onDialogUpdate?: (content: string) => void
    }
  }): Promise<GameScene> {
    try {
      const script = this.activeScript || GAME_SCRIPTS[0]
      const nextSceneId = params.currentSceneId + 1

      // 记录历史
      if (params.currentScene) {
        this.sceneHistory.push({
          description: params.currentScene.description,
          dialog: params.currentScene.dialog,
          choice: params.choiceText
        })
        if (this.sceneHistory.length > 5) this.sceneHistory.shift()
      }

      // 结局判定 (总幕数为 10)
      if (nextSceneId > 10) {
        return this.generateEnding(params.storyProgress, params.playerName)
      }

      // 组装动态属性描述
      const attrNames = script.attributeNames || {
        gaming: { label: '行动执行' },
        study: { label: '真相解析' },
        social: { label: '关系影响' },
        other: { label: '神秘感知' }
      }

      const recentContext = this.sceneHistory.map((h, idx) => 
        `[前情 ${idx + 1}] 场景：${h.description.slice(0, 80)}... 主角选择："${h.choice || ''}"`
      ).join('\n')

      const systemPrompt = `你是一位顶级沉浸式文字 RPG 叙事总监兼世界观推演大师。
当前推演剧本：《${script.title}》
题材标签：${script.tag || script.genre}
世界观与角色设定：
${script.characterBackground || script.description}

推演规则：
1. 主角姓名/代号：${params.playerName || '主角'}。
2. 当前推演进度：第 ${nextSceneId}/10 幕。
3. 四维属性当前数值：
   - ${attrNames.gaming.label}(gaming): ${params.storyProgress.mainQuests.gaming}/100
   - ${attrNames.study.label}(study): ${params.storyProgress.mainQuests.study}/100
   - ${attrNames.social.label}(social): ${params.storyProgress.mainQuests.social}/100
   - ${attrNames.other.label}(other): ${params.storyProgress.mainQuests.other}/100
4. 根据玩家刚才的决策 "${params.choiceText}" 与前情脉络，严谨且极具沉浸感地推演后续发展。
5. 必须输出合法 JSON 格式，不得包含任何额外前缀或后缀文本。

JSON 结构规范：
\`\`\`json
{
  "dialog": "主角在当前局势下的第一人称内心独白或当面对话（30-80字）",
  "description": "第${nextSceneId}幕环境氛围与剧情展开（150-250字，文笔生动有画面感）",
  "specialEvent": "突发关键事件描述（可选，无则留空字符串）",
  "options": [
    {
      "text": "激进行动/专长抉择（10-25字）",
      "hint": "行动潜在影响与风格提示",
      "impact": { "quest": { "type": "gaming", "value": 10 } }
    },
    {
      "text": "缜密调查/智慧解析抉择（10-25字）",
      "hint": "调查潜在影响与风格提示",
      "impact": { "quest": { "type": "study", "value": 10 } }
    },
    {
      "text": "人际斡旋/求助阵营抉择（10-25字）",
      "hint": "社交潜在影响与风格提示",
      "impact": { "quest": { "type": "social", "value": 10 } }
    },
    {
      "text": "直觉洞察/神秘机缘抉择（10-25字）",
      "hint": "直觉潜在影响与风格提示",
      "impact": { "quest": { "type": "other", "value": 10 } }
    }
  ]
}
\`\`\``

      const userPrompt = `前情概要：
${recentContext || '故事第一幕展开'}

玩家做出的最新行动抉择：
"${params.choiceText}"

请根据剧本《${script.title}》的世界观，立即为主角【${params.playerName || '主角'}】生成第 ${nextSceneId} 幕的剧情及4个不同维度的行动选项。直接输出 JSON。`

      const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]

      // 流式生成处理
      if (params.streamCallbacks?.onReasoningUpdate || params.streamCallbacks?.onDialogUpdate) {
        const aiModel = this.createModel()
        const res = await aiModel.streamText({ messages })

        let completeResponse = ''
        let reasoningContent = ''

        for await (const data of res.dataStream) {
          const think = data?.choices?.[0]?.delta?.reasoning_content
          if (think && params.streamCallbacks?.onReasoningUpdate) {
            reasoningContent += think
            params.streamCallbacks.onReasoningUpdate(think)
          }

          const text = data?.choices?.[0]?.delta?.content
          if (text) {
            completeResponse += text
            if (params.streamCallbacks?.onDialogUpdate) {
              params.streamCallbacks.onDialogUpdate(text)
            }
          }
        }

        const scene = this.parseResponse(completeResponse, nextSceneId, script, params.playerName)
        if (reasoningContent) {
          scene.reasoning = reasoningContent
        }

        try {
          const checkpointId = await CheckpointService.saveCheckpoint(scene)
          if (checkpointId) scene.checkpointId = checkpointId
        } catch (e) {
          console.warn('检查点保存跳过:', e)
        }

        return scene
      } else {
        const response = await this.sendRequest(messages)
        const scene = this.parseResponse(response.choices[0].message.content, nextSceneId, script, params.playerName)

        try {
          const checkpointId = await CheckpointService.saveCheckpoint(scene)
          if (checkpointId) scene.checkpointId = checkpointId
        } catch (e) {
          console.warn('检查点保存跳过:', e)
        }

        return scene
      }
    } catch (error) {
      console.error('DeepseekService generateScene 失败:', error)
      throw error
    }
  }

  /**
   * 动态生成故事终局
   */
  private static generateEnding(storyProgress: StoryProgress, playerName: string): GameScene {
    const script = this.activeScript || GAME_SCRIPTS[0]
    const p = storyProgress.mainQuests
    const attr = script.attributeNames

    let endingTitle = '因果终局 · 平衡之道'
    let endingDesc = `在历经十幕波澜壮阔的命运抉择后，${playerName} 在多方势力与因果律动中找到了奇迹般的平衡。你的名字成为了这片世界线中流传的传奇篇章。`
    let endingDialog = `“所有的抉择铸就了现在的我。这条路，我无怨无悔。”`

    // 根据四维最高项确定倾向
    const maxVal = Math.max(p.gaming, p.study, p.social, p.other)

    if (maxVal === p.gaming && p.gaming >= 40) {
      endingTitle = `【${attr.gaming?.label || '行动'}之巅】极致破局者`
      endingDesc = `依靠无与伦比的决断与高强度执行力，${playerName} 凭一己之力斩断了眼前的所有阻碍，强行改写了整个《${script.title}》的既定结局，登临至高之位！`
      endingDialog = `“唯有绝对的力量与行动，能突破虚伪的命运枷锁。”`
    } else if (maxVal === p.study && p.study >= 40) {
      endingTitle = `【${attr.study?.label || '真相'}极境】全知解构者`
      endingDesc = `凭借缜密的逻辑剖析与抽丝剥茧的调查，${playerName} 彻底揭开了隐藏在《${script.title}》世界最底层的全部真相与核心机密，成为了掌控全局的幕后推手。`
      endingDialog = `“真相虽然残酷，但虚妄的平静毫无意义。”`
    } else if (maxVal === p.social && p.social >= 40) {
      endingTitle = `【${attr.social?.label || '羁绊'}核心】命运统御者`
      endingDesc = `${playerName} 凭借过人的魅力与人际智慧，将各方阵营紧密联结，在纷乱的冲突中构筑起坚不可摧的同盟网络，谱写了最壮丽的众志成城之篇章。`
      endingDialog = `“真正的强者从不孤单，羁绊就是最锋利的刃。”`
    } else if (maxVal === p.other && p.other >= 40) {
      endingTitle = `【${attr.other?.label || '回声'}觉醒】超凡觉悟者`
      endingDesc = `在神秘感知与宿命契约的指引下，${playerName} 触碰到了跨越时空的深层维度，获得了超然于现实之上的终极启示与无限可能。`
      endingDialog = `“我听见了因果的齿轮在回响……新的篇章刚刚开始。”`
    }

    return {
      id: 999,
      description: endingDesc,
      dialog: endingDialog,
      options: [],
      specialEvent: `达成成就：${endingTitle}`,
      context: {
        mood: '超然',
        location: '命运归宿',
        timeOfDay: '破晓',
        previousEvents: [`完成了《${script.title}》全部推演`]
      }
    }
  }

  /**
   * 健壮的 JSON 解析与容错修复机制
   */
  private static parseResponse(
    content: string,
    nextSceneId: number,
    script: GameScript,
    playerName: string
  ): GameScene {
    let parsed: any = null

    try {
      let jsonStr = content.trim()
      // 提取 Markdown ```json ... ```
      const match = jsonStr.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
      if (match && match[1]) {
        jsonStr = match[1].trim()
      } else {
        const firstBrace = jsonStr.indexOf('{')
        const lastBrace = jsonStr.lastIndexOf('}')
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
          jsonStr = jsonStr.substring(firstBrace, lastBrace + 1)
        }
      }

      // 清理常见 JSON 格式瑕疵
      jsonStr = jsonStr
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
        .replace(/,\s*}/g, '}')
        .replace(/,\s*]/g, ']')

      parsed = JSON.parse(jsonStr)
    } catch (err) {
      console.warn('JSON 直接解析失败，启用启发式提取:', err)
      parsed = null
    }

    // 容错兜底
    if (!parsed || !parsed.description) {
      const defaultOptions = script.initialScene?.options || [
        { text: '保持警惕，快速突进前方的安全区域', hint: '优先确保自身机动性与安全', impact: { quest: { type: 'gaming', value: 10 } } },
        { text: '深度扫描周围环境，分析异常信号来源', hint: '搜集更多关键情报线索', impact: { quest: { type: 'study', value: 10 } } },
        { text: '尝试向附近的潜在中立目标发起隐蔽联络', hint: '探寻结盟或协助的可能', impact: { quest: { type: 'social', value: 10 } } },
        { text: '静心感受周围异常的能量律动与未知回响', hint: '激发潜意识深处的神秘感知', impact: { quest: { type: 'other', value: 10 } } }
      ]

      return {
        id: nextSceneId,
        description: `局势正在迅速发展，${playerName} 站在命运的十字路口。四周弥漫着未知的气息，每一个决策都将引发不可逆转的连锁反应。`,
        dialog: `“时间紧迫，我必须立即采取行动。”`,
        options: defaultOptions.map((opt, i) => ({
          text: opt.text,
          hint: opt.hint,
          impact: opt.impact || { quest: { type: (['gaming', 'study', 'social', 'other'] as const)[i % 4], value: 10 } }
        })),
        isAIGenerated: true
      }
    }

    // 确保 options 规范有效
    const rawOptions = Array.isArray(parsed.options) ? parsed.options : []
    const optionTypes: ('gaming' | 'study' | 'social' | 'other')[] = ['gaming', 'study', 'social', 'other']

    const cleanOptions = rawOptions.slice(0, 4).map((opt: any, index: number) => {
      const impactType = opt.impact?.quest?.type || optionTypes[index % 4]
      const impactVal = opt.impact?.quest?.value || (8 + Math.floor(Math.random() * 5))

      return {
        text: String(opt.text || `推演抉择方案 ${index + 1}`).slice(0, 40),
        hint: String(opt.hint || '根据当前局势做出决断').slice(0, 40),
        impact: {
          quest: {
            type: impactType,
            value: impactVal
          }
        }
      }
    })

    // 确保至少有 3 个选项
    while (cleanOptions.length < 3) {
      const idx = cleanOptions.length
      cleanOptions.push({
        text: `因地制宜，执行第 ${idx + 1} 阶段应急行动`,
        hint: `根据直觉把握当下时机`,
        impact: {
          quest: {
            type: optionTypes[idx % 4],
            value: 10
          }
        }
      })
    }

    return {
      id: nextSceneId,
      description: String(parsed.description || '').trim(),
      dialog: String(parsed.dialog || '').trim(),
      specialEvent: parsed.specialEvent ? String(parsed.specialEvent).trim() : undefined,
      options: cleanOptions,
      isAIGenerated: true
    }
  }
}

export default DeepseekService

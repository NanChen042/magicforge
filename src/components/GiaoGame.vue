<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useGameStore } from '../stores/game'
import { DeepseekService, updateApiConfig } from '../services/deepseekService'

// 定义属性
const props = defineProps({
  apiBaseUrl: {
    type: String,
    default: ''
  }
})

const gameStore = useGameStore()
const playerName = ref('')
const showIntro = ref(true)
const apiUrl = ref('https://api.siliconflow.cn/v1/chat/completions')
const apiKey = ref('sk-etybbrewlaafxjjqtlgfeqaaskzrmryfndjtjjecyixbsznw')
const modelName = ref('deepseek-ai/DeepSeek-R1-Distill-Qwen-7B')
const selectedMode = ref('story')
const userInput = ref('')
const loading = ref(false)
const showModelInfo = ref(false)
const reasoningContent = ref('')
const isThinking = ref(false)
const currentDialogStream = ref('')
const isStreamResponseActive = ref(false)
const customModelName = ref('')

// 游戏结束状态
const showGameOver = ref(false)
const gameOverTitle = ref('')
const gameOverMessage = ref('')
const gameOverType = ref('') // gaming, study, social

// 游戏进度状态
const gameProgress = ref({
  gaming: 25,
  study: 10,
  social: 5,
  other: 0
})

// 初始信息
const messages = ref([
  { role: 'assistant', content: '欢迎来到 AI 互动游戏！请选择你想要的游戏模式，我们将开始一段奇妙的旅程。' }
])

// 流式监听状态
const streamListenersSet = ref(false)

// API错误对照表
interface ApiErrorInfo {
  title: string;
  reason: string;
  solution: string;
}

interface ApiErrorCodes {
  [key: string]: ApiErrorInfo;
}

const apiErrorCodes: ApiErrorCodes = {
  '400': {
    title: '格式错误',
    reason: '请求体格式错误',
    solution: '请根据错误信息提示修改请求体'
  },
  '401': {
    title: '认证失败',
    reason: 'API key 错误，认证失败',
    solution: '请检查您的 API key 是否正确，如没有 API key，请先创建 API key'
  },
  '402': {
    title: '余额不足',
    reason: '账号余额不足',
    solution: '请确认账户余额，并前往充值页面进行充值'
  },
  '422': {
    title: '参数错误',
    reason: '请求体参数错误',
    solution: '请根据错误信息提示修改相关参数'
  },
  '429': {
    title: '请求速率达到上限',
    reason: '请求速率（TPM 或 RPM）达到上限',
    solution: '请合理规划您的请求速率'
  },
  '500': {
    title: '服务器故障',
    reason: '服务器内部故障',
    solution: '请等待后重试。若问题一直存在，请联系我们解决'
  },
  '503': {
    title: '服务器繁忙',
    reason: '服务器负载过高',
    solution: '请稍后重试您的请求'
  }
}

// 错误信息状态
const apiError = ref({
  show: false,
  code: '',
  message: '',
  details: null as ApiErrorInfo | null
})

// 选项卡状态
const activeTab = ref('dialog') // dialog, reasoning, error

// 监听API地址变化
watch(() => props.apiBaseUrl, (newUrl) => {
  if (newUrl) {
    // 更新API配置
    apiUrl.value = newUrl
    updateApiConfig({ baseUrl: newUrl })
    console.log('游戏组件: API地址已更新为', newUrl)
  }
}, { immediate: true })

// 计算属性
const currentScene = computed(() => gameStore.currentScene)
const isGenerating = computed(() => gameStore.isGenerating)
const aiErrorMessage = computed(() => gameStore.aiErrorMessage)

// 设置模型
const setModel = (model: string) => {
  modelName.value = model
  // 更新API配置
  updateApiConfig({
    baseUrl: apiUrl.value,
    apiKey: apiKey.value,
    model: model
  })
  console.log('模型已更新为:', model)
}

// 启动游戏
const startGame = async () => {
  if (!playerName.value) {
    alert('请输入你的名字')
    return
  }

  if (apiUrl.value) {
    // 更新API配置
    updateApiConfig({
      baseUrl: apiUrl.value,
      apiKey: apiKey.value,
      model: modelName.value
    })
  }

  loading.value = true

  try {
    gameStore.setPlayerName(playerName.value)
    showIntro.value = false
    await gameStore.startNewGame()
    updateProgressData()
  } catch (error) {
    console.error('游戏启动错误:', error)
    alert('游戏启动失败，请检查API设置或稍后再试')
  } finally {
    loading.value = false
  }
}

// 设置流式监听器
const setupStreamListeners = () => {
  gameStore.$onAction(({ name, args }) => {
    if (name === 'updateReasoningStream' && args[0]) {
      reasoningContent.value += args[0]
      // 如果有推理内容且当前不是推理选项卡，可以自动切换
      if (modelName.value !== 'deepseek-chat' && reasoningContent.value && activeTab.value === 'dialog') {
        activeTab.value = 'reasoning'
      }
    }
    if (name === 'updateDialogStream' && args[0]) {
      currentDialogStream.value += args[0]
      // 如果有对话内容，可以自动切换到对话选项卡
      if (currentDialogStream.value && activeTab.value === 'reasoning') {
        activeTab.value = 'dialog'
      }
    }
  })

  streamListenersSet.value = true
  console.log('已设置流式监听器')
}

// 处理选择，流式响应处理
const handleChoice = async (option: { text: string, next?: number, impact?: any }) => {
  try {
    // 重置流式输出内容
    reasoningContent.value = ''
    currentDialogStream.value = ''
    isThinking.value = modelName.value !== 'deepseek-chat'
    isStreamResponseActive.value = true
    clearApiError() // 清除之前的错误状态

    // 一次性设置监听器
    if (!streamListenersSet.value) {
      setupStreamListeners()
    }

    // 处理选项并更新进度
    console.log(option);

    if (option.impact) {
      processImpact(option.impact)

      // 记录选项分析 - 有预设影响
      lastChoiceAnalysis.value = {
        text: option.text,
        matchedKeywords: {
          gaming: [],
          study: [],
          social: [],
          other: []
        },
        impactType: option.impact.quest?.type || 'other',
        impactText: ''
      }
    } else {
      // 如果选项没有定义impact属性，根据选项内容自动添加不同类型的影响
      const optionText = option.text.toLowerCase()

      // 创建一个评分系统，根据关键词匹配程度决定影响类型
      const scores = {
        gaming: 0,
        study: 0,
        social: 0,
        other: 0
      }

      // 游戏相关关键词 - 更精确的词组
      const gamingKeywords = ['游戏', '剑魔', '技能', '排位', '连招', '对线', '比赛', '击败', '电竞', '英雄', '段位', 'LOL', '打野', '屏幕', '键盘', '打游戏', '王者', 'MVP', '玩家']
      // 学习相关关键词
      const studyKeywords = ['学习', '考试', '上课', '听讲', '作业', '专心', '知识', '读书', '笔记', '成绩', '课程', '教授', '学校', '老师', '教室', '课本', '学科', '复习', '思考']
      // 社交相关关键词 - 更精确的词组，避免普通词
      const socialKeywords = ['朋友', '社交', '关系', '交流', '合作', '团队', '聚会', '聚餐', '派对', '沟通', '网友', '约会', '同学会', '女生', '男生', '聚在一起']
      // 其他神秘能力关键词
      const otherKeywords = ['神秘', '命运', '思考', '冥想', '灵感', '直觉', '预感', '奇怪', '奇特', '感悟', '超自然', '第六感', '梦境', '星象', '符文']

      // 计算分数 - 使用更智能的计分系统
      let totalKeywords = 0
      let matchedKeywords = {
        gaming: [] as string[],
        study: [] as string[],
        social: [] as string[],
        other: [] as string[]
      }

      gamingKeywords.forEach(keyword => {
        if (optionText.includes(keyword)) {
          scores.gaming += 1
          totalKeywords += 1
          matchedKeywords.gaming.push(keyword)
        }
      })

      studyKeywords.forEach(keyword => {
        if (optionText.includes(keyword)) {
          scores.study += 1
          totalKeywords += 1
          matchedKeywords.study.push(keyword)
        }
      })

      socialKeywords.forEach(keyword => {
        if (optionText.includes(keyword)) {
          scores.social += 1
          totalKeywords += 1
          matchedKeywords.social.push(keyword)
        }
      })

      // 检查其他能力关键词
      otherKeywords.forEach(keyword => {
        if (optionText.includes(keyword)) {
          scores.other += 1
          totalKeywords += 1
          matchedKeywords.other = matchedKeywords.other || []
          matchedKeywords.other.push(keyword)
        }
      })

      // 调整关键词权重 - 让社交关键词权重降低一些
      if (scores.social > 0 && scores.social <= 2) {
        scores.social *= 0.7;
      }

      // 让神秘能力权重高一些
      if (scores.other > 0) {
        scores.other *= 1.2;
      }

      // 详细记录关键词匹配情况
      console.log('选项文本:', optionText);
      console.log('匹配到的关键词:', matchedKeywords);
      console.log('调整权重后分数:', scores);
      console.log('总匹配关键词数:', totalKeywords);

      // 如果没有匹配任何关键词，使用"其他"技能
      if (totalKeywords === 0) {
        scores.other = 1;
        console.log('未匹配到任何关键词，增加"其他"能力');
      }

      // 决定影响类型 - 不再有默认值，公平比较
      let impactType: 'gaming' | 'study' | 'social' | 'other' = 'gaming';
      let maxScore = -1;

      // 获取当前最低进度的类型（用于同分情况下的平衡）
      let lowestProgressType: 'gaming' | 'study' | 'social' | 'other' = 'gaming';
      if (gameProgress.value.study < gameProgress.value[lowestProgressType]) {
        lowestProgressType = 'study';
      }
      if (gameProgress.value.social < gameProgress.value[lowestProgressType]) {
        lowestProgressType = 'social';
      }
      if (gameProgress.value.other < gameProgress.value[lowestProgressType]) {
        lowestProgressType = 'other';
      }

      // 检查能力分数
      if (scores.gaming > maxScore) {
        maxScore = scores.gaming;
        impactType = 'gaming';
      }

      if (scores.study > maxScore) {
        maxScore = scores.study;
        impactType = 'study';
      } else if (scores.study === maxScore) {
        // 如果学习和当前最高分相同，比较进度
        if (gameProgress.value.study < gameProgress.value[impactType]) {
          impactType = 'study';
        }
      }

      if (scores.social > maxScore) {
        maxScore = scores.social;
        impactType = 'social';
      } else if (scores.social === maxScore) {
        // 如果社交和当前最高分相同，比较进度
        if (gameProgress.value.social < gameProgress.value[impactType]) {
          impactType = 'social';
        }
      }

      // 检查其他能力
      if (scores.other > maxScore) {
        maxScore = scores.other;
        impactType = 'other';
      } else if (scores.other === maxScore) {
        // 如果其他和当前最高分相同，比较进度
        if (gameProgress.value.other < gameProgress.value[impactType]) {
          impactType = 'other';
        }
      }

      // 如果所有分数都相同，选择进度最低的能力
      if (scores.gaming === scores.study && scores.study === scores.social && scores.social === scores.other) {
        impactType = lowestProgressType;
      }

      // 基础增加值加上选项长度和复杂度的奖励
      const baseValue = 5
      const lengthBonus = Math.min(3, Math.floor(option.text.length / 20)) // 最多3点长度奖励
      const valueIncrease = baseValue + lengthBonus

      // 输出调试信息到控制台
      console.log('选项分析:', {
        text: optionText,
        scores: scores,
        selected: impactType,
        value: valueIncrease,
        currentProgress: gameProgress.value
      });

      // 保存到上次选择分析
      lastChoiceAnalysis.value = {
        text: option.text,
        matchedKeywords: {
          gaming: matchedKeywords.gaming || [],
          study: matchedKeywords.study || [],
          social: matchedKeywords.social || [],
          other: matchedKeywords.other || []
        },
        impactType: impactType,
        impactText: ''
      }

      // 创建一个新的impact对象并处理
      const newImpact = {
        quest: { type: impactType, value: valueIncrease }
      }
      processImpact(newImpact)
    }

    // 如果是deepseek-chat模型，直接切换到对话选项卡
    // 否则先切换到思维过程选项卡
    if (modelName.value === 'deepseek-chat') {
      activeTab.value = 'dialog'
    } else {
      activeTab.value = 'reasoning'
    }

    // 执行选择操作
    await gameStore.handleChoice(option)

    // 设置调试信息
    if (currentScene.value) {
      setDebugInfo(currentScene.value)
    }

    // 处理完成后
    isThinking.value = false
    isStreamResponseActive.value = false

  } catch (error) {
    console.error('处理选择时出错:', error)
    isThinking.value = false
    isStreamResponseActive.value = false
    handleApiError(error) // 处理API错误
  }
}

// 处理影响效果
const processImpact = (impact: any) => {
  if (impact.quest) {
    const { type, value } = impact.quest
    if (type === 'gaming') gameProgress.value.gaming = Math.min(100, gameProgress.value.gaming + value)
    if (type === 'study') gameProgress.value.study = Math.min(100, gameProgress.value.study + value)
    if (type === 'social') gameProgress.value.social = Math.min(100, gameProgress.value.social + value)
    if (type === 'other') gameProgress.value.other = Math.min(100, gameProgress.value.other + value)

    // 检查是否有满值的进度
    checkGameProgress()
  }
}

// 检查游戏进度是否有满值
const checkGameProgress = () => {
  // 跟踪哪些能力已达到满值
  const completedAbilities = []

  if (gameProgress.value.gaming >= 100) {
    completedAbilities.push('gaming')
  }
  if (gameProgress.value.study >= 100) {
    completedAbilities.push('study')
  }
  if (gameProgress.value.social >= 100) {
    completedAbilities.push('social')
  }
  if (gameProgress.value.other >= 100) {
    completedAbilities.push('other')
  }

  // 如果没有满值能力或已经显示了结局，则返回
  if (completedAbilities.length === 0 || showGameOver.value) {
    return
  }

  // 处理多个能力同时达到满值的情况
  // 策略：选择最近增长最快的能力作为主要结局
  // 简化起见，这里只选择列表中的第一个能力
  const primaryAbility = completedAbilities[0]

  if (primaryAbility === 'gaming') {
    gameOverTitle.value = '游戏大师'
    gameOverMessage.value = `恭喜${playerName.value}！你在游戏技能方面达到了顶峰！你成为了传说中的电竞选手！`

    // 如果有其他能力也达到满值，添加额外信息
    if (completedAbilities.length > 1) {
      gameOverMessage.value += `\n\n另外，你也在${completedAbilities.includes('study') ? '学业' : ''}${completedAbilities.includes('study') && completedAbilities.includes('social') ? '和' : ''}${completedAbilities.includes('social') ? '社交' : ''}方面表现出色！`
    }

    gameOverType.value = 'gaming'
  } else if (primaryAbility === 'study') {
    gameOverTitle.value = '学霸之路'
    gameOverMessage.value = `恭喜${playerName.value}！你在学业上取得了令人瞩目的成就！成为了学院最年轻的教授！`

    // 如果有其他能力也达到满值，添加额外信息
    if (completedAbilities.length > 1) {
      gameOverMessage.value += `\n\n另外，你也在${completedAbilities.includes('gaming') ? '游戏' : ''}${completedAbilities.includes('gaming') && completedAbilities.includes('social') ? '和' : ''}${completedAbilities.includes('social') ? '社交' : ''}方面表现出色！`
    }

    gameOverType.value = 'study'
  } else if (primaryAbility === 'social') {
    gameOverTitle.value = '社交之星'
    gameOverMessage.value = `恭喜${playerName.value}！你的社交能力已经炉火纯青！成为了人际关系网络的中心，拥有无数忠实的朋友！`

    // 如果有其他能力也达到满值，添加额外信息
    if (completedAbilities.length > 1) {
      gameOverMessage.value += `\n\n另外，你也在${completedAbilities.includes('gaming') ? '游戏' : ''}${completedAbilities.includes('gaming') && completedAbilities.includes('study') ? '和' : ''}${completedAbilities.includes('study') ? '学业' : ''}方面表现出色！`
    }

    gameOverType.value = 'social'
  } else if (primaryAbility === 'other') {
    gameOverTitle.value = '神秘技能'
    gameOverMessage.value = `恭喜${playerName.value}！你掌握了一种无法言明的神秘能力！似乎命运的齿轮在你手中转动！`

    // 如果有其他能力也达到满值，添加额外信息
    if (completedAbilities.length > 1) {
      gameOverMessage.value += `\n\n另外，你也在${completedAbilities.includes('gaming') ? '游戏' : ''}${completedAbilities.includes('gaming') && (completedAbilities.includes('study') || completedAbilities.includes('social')) ? '、' : ''}${completedAbilities.includes('study') ? '学业' : ''}${(completedAbilities.includes('gaming') || completedAbilities.includes('study')) && completedAbilities.includes('social') ? '和' : ''}${completedAbilities.includes('social') ? '社交' : ''}方面表现出色！`
    }

    gameOverType.value = 'other'
  }

  showGameOver.value = true
}

// 更新进度数据
const updateProgressData = () => {
  // 可以从游戏状态获取真实数据
  gameProgress.value = {
    gaming: gameStore.storyProgress?.mainQuests?.gaming || 25,
    study: gameStore.storyProgress?.mainQuests?.study || 10,
    social: gameStore.storyProgress?.mainQuests?.social || 5,
    other: gameStore.storyProgress?.mainQuests?.other || 0
  }

  // 检查是否有满值的进度
  checkGameProgress()
}

// 重置游戏
const resetGame = () => {
  if (confirm('确定要重置游戏进度吗？')) {
    // 重置UI状态
    currentDialogStream.value = ''
    reasoningContent.value = ''
    userInput.value = ''
    activeTab.value = 'dialog'
    showGameOver.value = false
    isThinking.value = false
    isStreamResponseActive.value = false

    // 清除错误状态
    clearApiError()

    // 重置游戏状态
    gameStore.resetGame()

    // 重置进度
    gameProgress.value = {
      gaming: 25,
      study: 10,
      social: 5,
      other: 0
    }
  }
}

// 显示模型信息
const toggleModelIndicator = () => {
  showModelInfo.value = !showModelInfo.value
}

// 切换模型
const changeModel = () => {
  // 循环切换模型
  const models = ['deepseek-ai/DeepSeek-R1-Distill-Qwen-7B', 'deepseek-r1', 'deepseek-chat', 'QwQ-32B']
  const currentIndex = models.indexOf(modelName.value)
  const nextIndex = (currentIndex + 1) % models.length

  // 切换前清理状态
  reasoningContent.value = ''
  currentDialogStream.value = ''

  // 设置新模型
  setModel(models[nextIndex])

  // 如果切换到不支持思维链的模型，自动切换到对话选项卡
  if (models[nextIndex] === 'deepseek-chat' && activeTab.value === 'reasoning') {
    activeTab.value = 'dialog'
  }

  showModelInfo.value = false
}

// 切换选项卡
const switchTab = (tab: string) => {
  activeTab.value = tab
}

// 处理API错误
const handleApiError = (error: any) => {
  // 重置生成状态
  isThinking.value = false
  isStreamResponseActive.value = false

  // 检查是否是API错误
  if (error?.response?.status) {
    const statusCode = error.response.status.toString()
    apiError.value = {
      show: true,
      code: statusCode,
      message: error.message || '未知错误',
      details: apiErrorCodes[statusCode] || null
    }
  } else {
    // 处理没有标准响应对象的错误
    const errorMessage = error?.message || '连接失败，请检查API地址和网络连接'
    apiError.value = {
      show: true,
      code: 'UNKNOWN',
      message: errorMessage,
      details: {
        title: '连接错误',
        reason: '无法连接到API服务器或请求被中断',
        solution: '请检查API地址是否正确，网络连接是否稳定，或API密钥是否有效'
      }
    }
  }
  // 切换到错误选项卡
  activeTab.value = 'error'
}

// 清除错误状态
const clearApiError = () => {
  apiError.value.show = false
  // 如果当前是错误选项卡，切换回对话选项卡
  if (activeTab.value === 'error') {
    activeTab.value = 'dialog'
  }
}

// 在组件挂载时准备游戏环境
onMounted(() => {
  // 检查是否有API端点设置
  if (props.apiBaseUrl) {
    apiUrl.value = props.apiBaseUrl
  }

  // 初始化 API 设置
  updateApiConfig({
    baseUrl: apiUrl.value,
    apiKey: apiKey.value,
    model: modelName.value
  })

  // 设置流式监听器
  setupStreamListeners()
})

// 设置自定义模型
const setCustomModel = () => {
  if (customModelName.value) {
    // 简单验证模型名称
    const modelNameTrimmed = customModelName.value.trim()
    if (!modelNameTrimmed) {
      return
    }

    // 清理状态
    reasoningContent.value = ''
    currentDialogStream.value = ''

    setModel(modelNameTrimmed)
    customModelName.value = ''
  }
}

// 返回首页
const backToHomepage = () => {
  console.log('开始返回首页')
  try {
    // 重置UI状态
    currentDialogStream.value = ''
    reasoningContent.value = ''
    userInput.value = ''
    activeTab.value = 'dialog'
    showGameOver.value = false
    isThinking.value = false
    isStreamResponseActive.value = false

    // 清除错误状态
    clearApiError()

    // 重置游戏状态
    gameStore.resetGame()

    // 重置进度
    gameProgress.value = {
      gaming: 25,
      study: 10,
      social: 5,
      other: 0
    }

    // 显示开始界面
    showIntro.value = true

    console.log('已返回游戏首页', showIntro.value)
  } catch (error) {
    console.error('返回首页出错:', error)
  }
}

// 关闭游戏结束弹窗并返回首页
const closeGameOverAndReset = () => {
  showGameOver.value = false
  backToHomepage()
}

// 重新生成当前场景
const retryCurrentScene = async () => {
  try {
    // 清除当前错误状态
    clearApiError()
    gameStore.aiErrorMessage = ''

    // 重置流式内容
    currentDialogStream.value = ''
    reasoningContent.value = ''

    // 设置重试状态
    isThinking.value = modelName.value !== 'deepseek-chat'
    isStreamResponseActive.value = true

    // 重新生成当前场景，使用更简单的重试选择
    const retryChoice = {
      text: "继续当前场景",
      next: gameStore.currentSceneId
    }

    console.log('开始重新生成场景...')
    await gameStore.handleChoice(retryChoice)

    console.log('场景重新生成成功')

    // 重置状态
    isThinking.value = false
    isStreamResponseActive.value = false
  } catch (error) {
    console.error('重新生成场景失败:', error)
    isThinking.value = false
    isStreamResponseActive.value = false
    handleApiError(error)
  }
}

// 游戏手册浮动按钮
const showGameGuide = ref(false)
// 上次选择分析
const lastChoiceAnalysis = ref({
  text: '',
  matchedKeywords: {
    gaming: [] as string[],
    study: [] as string[],
    social: [] as string[],
    other: [] as string[]
  },
  impactType: 'gaming',
  impactText: ''
})
// 调试开关
const showDebugInfo = ref(false)
// 调试信息
const debugInfo = ref({
  lastChoice: {
    text: '',
    matchedKeywords: {
      gaming: [] as string[],
      study: [] as string[],
      social: [] as string[],
      other: [] as string[]
    },
    impactType: 'gaming',
    impactText: ''
  },
  currentScene: {
    id: 1,
    dialog: '',
    reasoning: '',
    specialEvent: '',
    options: []
  }
})

// 上次选择分析文本
const lastChoiceImpactText = computed(() => {
  switch (lastChoiceAnalysis.value.impactType) {
    case 'gaming':
      return '游戏技能'
    case 'study':
      return '学习能力'
    case 'social':
      return '社交关系'
    case 'other':
      return '神秘能力'
    default:
      return ''
  }
})

// 调试信息文本
const debugInfoText = computed(() => {
  return `当前场景: ${debugInfo.value.currentScene.id}\n对话: ${debugInfo.value.currentScene.dialog}\n思维过程: ${debugInfo.value.currentScene.reasoning}\n特殊事件: ${debugInfo.value.currentScene.specialEvent}`
})

// 设置上次选择分析
const setLastChoiceAnalysis = (option: { text: string, next?: number, impact?: any }) => {
  lastChoiceAnalysis.value = {
    text: option.text,
    matchedKeywords: {
      gaming: [],
      study: [],
      social: [],
      other: []
    },
    impactType: 'gaming',
    impactText: ''
  }
  if (option.impact) {
    lastChoiceAnalysis.value.impactText = option.impact.quest.type
    lastChoiceAnalysis.value.matchedKeywords = option.impact.quest.matchedKeywords
  }
}

// 设置调试信息
const setDebugInfo = (scene: any) => {
  debugInfo.value = {
    lastChoice: {
      text: lastChoiceAnalysis.value.text,
      matchedKeywords: {
        gaming: [...lastChoiceAnalysis.value.matchedKeywords.gaming],
        study: [...lastChoiceAnalysis.value.matchedKeywords.study],
        social: [...lastChoiceAnalysis.value.matchedKeywords.social],
        other: [...(lastChoiceAnalysis.value.matchedKeywords.other || [])]
      },
      impactType: lastChoiceAnalysis.value.impactType,
      impactText: lastChoiceAnalysis.value.impactText
    },
    currentScene: {
      id: scene.id,
      dialog: scene.dialog,
      reasoning: scene.reasoning,
      specialEvent: scene.specialEvent,
      options: scene.options
    }
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-white via-slate-50/50 to-gray-50/30 relative">
    <!-- 高级背景装饰 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- 精致光效 -->
      <div class="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-br from-blue-100/40 to-indigo-100/30 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-violet-100/40 to-purple-100/30 rounded-full blur-3xl"></div>
      <!-- 微妙纹理 -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.03),transparent_50%)]"></div>
    </div>

    <!-- 开始界面 -->
    <div v-if="showIntro" class="relative min-h-screen flex items-center justify-center px-4 sm:px-6">

      <!-- 主内容容器 -->
      <div class="relative z-10 w-full max-w-7xl mx-auto">
        <!-- 顶部标题区域 -->
        <div class="text-center mb-12">
          <!-- 高级Logo和标题设计 -->
          <div class="mb-12">
            <!-- 温和Logo设计 -->
            <div class="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-500 shadow-xl shadow-indigo-500/20 mb-8 relative group border border-indigo-200/30">
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent"></div>
              <span class="text-4xl relative z-10 filter brightness-110">⚔️</span>
              <!-- 精致光环 -->
              <div class="absolute -inset-1 rounded-2xl bg-gradient-to-br from-indigo-200/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <h1 class="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              <span class="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
                剑道传奇
              </span>
            </h1>

            <p class="text-base sm:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed font-normal">
              在这个充满挑战的武侠世界中，你将扮演一名初入江湖的剑客
            </p>
          </div>

          <!-- 高级特色标签 -->
          <div class="flex flex-wrap justify-center gap-3 mb-12">
            <div class="px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/60 shadow-sm hover:shadow-md hover:border-gray-300/60 transition-all duration-300 group">
              <span class="text-sm font-medium text-gray-700 group-hover:text-gray-900 flex items-center gap-2">
                <span class="text-base">🎮</span>
                互动剧情
              </span>
            </div>
            <div class="px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/60 shadow-sm hover:shadow-md hover:border-gray-300/60 transition-all duration-300 group">
              <span class="text-sm font-medium text-gray-700 group-hover:text-gray-900 flex items-center gap-2">
                <span class="text-base">🤖</span>
                AI驱动
              </span>
            </div>
            <div class="px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/60 shadow-sm hover:shadow-md hover:border-gray-300/60 transition-all duration-300 group">
              <span class="text-sm font-medium text-gray-700 group-hover:text-gray-900 flex items-center gap-2">
                <span class="text-base">📈</span>
                成长系统
              </span>
            </div>
          </div>
        </div>

        <!-- 主要内容区域 -->
        <div class="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto items-center lg:items-start justify-center">
          <!-- 左侧：游戏开始 -->
          <div class="flex-1 lg:flex-[2]">
            <!-- 高级主卡片设计 -->
            <div class="relative group">
              <!-- 主卡片背景 -->
              <div class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl shadow-gray-900/10 border border-gray-200/50 p-8 relative overflow-hidden">
                <!-- 精致顶部装饰 -->
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-300 via-purple-400 to-violet-300"></div>
                <!-- 微妙装饰元素 -->
                <div class="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-60"></div>

                <div class="text-center mb-8">
                  <h2 class="text-2xl font-semibold text-indigo-800 mb-3">开始你的传奇</h2>
                  <p class="text-purple-600 font-normal text-sm leading-relaxed">输入你的名字，踏上剑道修行之路</p>
                </div>

                <!-- 高级玩家名称输入 -->
                <div class="mb-8">
                  <div class="relative">
                    <input v-model="playerName" type="text" placeholder="请输入你的剑客名字..." class="w-full px-5 py-4 pl-12 bg-indigo-50/80 rounded-xl border border-indigo-200 text-indigo-900 placeholder-indigo-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/50 focus:bg-white transition-all duration-300 text-base font-normal shadow-sm hover:shadow-md hover:border-indigo-300" @keyup.enter="startGame">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-indigo-400">⚔️</span>
                  </div>
                </div>

                <!-- 高级开始按钮 -->
                <button @click="startGame" :disabled="!playerName" class="w-full group relative overflow-hidden">
                  <!-- 按钮背景 -->
                  <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 rounded-xl"></div>
                  <!-- 悬停效果 -->
                  <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <!-- 按钮内容 -->
                  <div class="relative px-6 py-4 text-white font-medium text-base transform group-hover:-translate-y-0.5 group-active:translate-y-0 transition-all duration-200 group-disabled:opacity-50 group-disabled:cursor-not-allowed group-disabled:transform-none">
                    <span class="flex items-center justify-center gap-3">
                      <span class="text-lg">🗡️</span>
                      <span>踏上剑道之路</span>
                      <span class="text-lg">✨</span>
                    </span>
                  </div>
                  <!-- 精致光效 -->
                  <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <!-- 高级特色说明 -->
                <div class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div class="text-center p-4 bg-indigo-50/60 rounded-lg border border-indigo-100 hover:shadow-md hover:border-indigo-200 transition-all duration-300 group">
                    <div class="text-xl mb-2 group-hover:scale-105 transition-transform duration-300">🎯</div>
                    <div class="text-xs font-medium text-indigo-700 group-hover:text-indigo-900">多重选择</div>
                  </div>
                  <div class="text-center p-4 bg-purple-50/60 rounded-lg border border-purple-100 hover:shadow-md hover:border-purple-200 transition-all duration-300 group">
                    <div class="text-xl mb-2 group-hover:scale-105 transition-transform duration-300">⚡</div>
                    <div class="text-xs font-medium text-purple-700 group-hover:text-purple-900">能力成长</div>
                  </div>
                  <div class="text-center p-4 bg-violet-50/60 rounded-lg border border-violet-100 hover:shadow-md hover:border-violet-200 transition-all duration-300 group">
                    <div class="text-xl mb-2 group-hover:scale-105 transition-transform duration-300">🌟</div>
                    <div class="text-xs font-medium text-violet-700 group-hover:text-violet-900">动态剧情</div>
                  </div>
                </div>
              </div>
            </div>

          <!-- 右侧：配置面板 -->
          <div class="flex-1 space-y-6">
            <!-- 高级API配置 -->
            <div class="bg-white/95 backdrop-blur-sm rounded-xl p-6 border border-gray-200/60 shadow-lg shadow-gray-900/5">
              <h3 class="text-lg font-semibold text-indigo-800 mb-6 flex items-center gap-3">
                <span class="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-sm border border-indigo-200">🔧</span>
                API 配置
              </h3>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-indigo-700 mb-2">API 地址</label>
                  <input v-model="apiUrl" type="text" placeholder="请输入API地址" class="w-full px-4 py-3 bg-indigo-50/80 rounded-lg border border-indigo-200 text-indigo-800 placeholder-indigo-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/50 focus:bg-white transition-all duration-200 text-sm">
                </div>
                <div>
                  <label class="block text-sm font-medium text-indigo-700 mb-2">API Key</label>
                  <input v-model="apiKey" type="password" placeholder="请输入您的API密钥" class="w-full px-4 py-3 bg-indigo-50/80 rounded-lg border border-indigo-200 text-indigo-800 placeholder-indigo-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/50 focus:bg-white transition-all duration-200 text-sm">
                </div>
              </div>
            </div>

            <!-- 高级模型选择 -->
            <div class="bg-white/95 backdrop-blur-sm rounded-xl p-6 border border-gray-200/60 shadow-lg shadow-gray-900/5">
              <h3 class="text-lg font-semibold text-purple-800 mb-6 flex items-center gap-3">
                <span class="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center text-sm border border-purple-200">🤖</span>
                模型选择
              </h3>

              <div class="space-y-2">
                <button v-for="model in ['deepseek-ai/DeepSeek-R1-Distill-Qwen-7B', 'deepseek-r1', 'deepseek-chat', 'QwQ-32B']" :key="model" @click="setModel(model)" class="w-full px-4 py-3 text-sm rounded-lg transition-all duration-200 text-left font-medium" :class="modelName === model
                  ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-md'
                  : 'bg-purple-50/80 text-purple-700 border border-purple-200 hover:bg-purple-100 hover:border-purple-300'">
                  {{ model }}
                </button>

                <div class="pt-4 border-t border-purple-200">
                  <div class="flex gap-2">
                    <input v-model="customModelName" type="text" placeholder="自定义模型" class="flex-1 px-3 py-2 bg-purple-50/80 rounded-lg border border-purple-200 text-purple-800 placeholder-purple-400 text-sm focus:outline-none focus:border-purple-400 focus:bg-white transition-all duration-200" @keyup.enter="setCustomModel">
                    <button @click="setCustomModel" class="px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg text-sm hover:from-purple-500 hover:to-violet-500 transition-all duration-200 font-medium">
                      设置
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>


        </div>

      </div>



      <!-- 游戏结束弹窗 - 超级炫酷版 -->
      <div v-if="showGameOver" class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
        <div class="relative max-w-lg w-full mx-4">
          <!-- 背景光效 -->
          <div class="absolute -inset-4 rounded-3xl" :class="{
            'bg-gradient-to-br from-blue-600/20 to-indigo-600/20': gameOverType === 'gaming',
            'bg-gradient-to-br from-green-600/20 to-emerald-600/20': gameOverType === 'study',
            'bg-gradient-to-br from-purple-600/20 to-indigo-600/20': gameOverType === 'social',
            'bg-gradient-to-br from-amber-600/20 to-orange-600/20': gameOverType === 'other'
          }"></div>

          <div class="relative overflow-hidden bg-white/90 backdrop-blur-lg rounded-xl sm:rounded-2xl p-8 sm:p-10 shadow-xl border border-white/50">
            <!-- 上部装饰线 -->
            <div class="absolute top-0 left-0 w-full h-[2px]" :class="{
              'bg-gradient-to-r from-transparent via-blue-400 to-transparent': gameOverType === 'gaming',
              'bg-gradient-to-r from-transparent via-green-400 to-transparent': gameOverType === 'study',
              'bg-gradient-to-r from-transparent via-purple-400 to-transparent': gameOverType === 'social',
              'bg-gradient-to-r from-transparent via-amber-400 to-transparent': gameOverType === 'other'
            }"></div>

            <!-- 动态装饰元素 -->
            <div class="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl animate-pulse-slow" :class="{
              'bg-blue-500/10': gameOverType === 'gaming',
              'bg-green-500/10': gameOverType === 'study',
              'bg-purple-500/10': gameOverType === 'social',
              'bg-amber-500/10': gameOverType === 'other'
            }"></div>
            <div class="absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl animate-pulse-slow" :class="{
              'bg-blue-600/10': gameOverType === 'gaming',
              'bg-emerald-500/10': gameOverType === 'study',
              'bg-indigo-600/10': gameOverType === 'social',
              'bg-orange-600/10': gameOverType === 'other'
            }"></div>

            <!-- 标题 -->
            <div class="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" :class="{
              'bg-gradient-to-br from-blue-500 to-indigo-600': gameOverType === 'gaming',
              'bg-gradient-to-br from-green-500 to-emerald-600': gameOverType === 'study',
              'bg-gradient-to-br from-purple-500 to-indigo-600': gameOverType === 'social',
              'bg-gradient-to-br from-amber-500 to-orange-600': gameOverType === 'other'
            }">
              <span class="text-white text-2xl">
                <template v-if="gameOverType === 'gaming'">🎮</template>
                <template v-else-if="gameOverType === 'study'">🎓</template>
                <template v-else-if="gameOverType === 'social'">👥</template>
                <template v-else>✨</template>
              </span>
            </div>

            <h2 class="text-2xl sm:text-3xl font-bold text-center mb-2 bg-clip-text text-transparent" :class="{
              'bg-gradient-to-r from-blue-600 to-indigo-600': gameOverType === 'gaming',
              'bg-gradient-to-r from-green-600 to-emerald-600': gameOverType === 'study',
              'bg-gradient-to-r from-purple-600 to-indigo-600': gameOverType === 'social',
              'bg-gradient-to-r from-amber-600 to-orange-600': gameOverType === 'other'
            }">
              {{ gameOverTitle }}
            </h2>

            <div class="w-1/3 h-[1px] mx-auto mb-6" :class="{
              'bg-gradient-to-r from-transparent via-blue-300 to-transparent': gameOverType === 'gaming',
              'bg-gradient-to-r from-transparent via-green-300 to-transparent': gameOverType === 'study',
              'bg-gradient-to-r from-transparent via-purple-300 to-transparent': gameOverType === 'social',
              'bg-gradient-to-r from-transparent via-amber-300 to-transparent': gameOverType === 'other'
            }"></div>

            <!-- 内容 -->
            <div class="bg-white/60 rounded-lg p-4 mb-6 border" :class="{
              'border-blue-100': gameOverType === 'gaming',
              'border-green-100': gameOverType === 'study',
              'border-purple-100': gameOverType === 'social',
              'border-amber-100': gameOverType === 'other'
            }">
              <p class="text-slate-700 text-center">{{ gameOverMessage }}</p>
            </div>

            <!-- 按钮 -->
            <button @click="closeGameOverAndReset" class="w-full py-3 rounded-xl font-medium text-white transition transform hover:-translate-y-1 hover:shadow-lg" :class="{
              'bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-blue-200/50': gameOverType === 'gaming',
              'bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-green-200/50': gameOverType === 'study',
              'bg-gradient-to-r from-purple-500 to-indigo-600 hover:shadow-purple-200/50': gameOverType === 'social',
              'bg-gradient-to-r from-amber-500 to-orange-600 hover:shadow-amber-200/50': gameOverType === 'other'
            }">
              <span class="flex items-center justify-center gap-2">
                <span>继续冒险</span>
                <template v-if="gameOverType === 'gaming'">🎮</template>
                <template v-else-if="gameOverType === 'study'">📚</template>
                <template v-else-if="gameOverType === 'social'">🌟</template>
                <template v-else>✨</template>
              </span>
            </button>
          </div>
        </div>
      </div>

    </div>
        <!-- 游戏主界面 -->
    <div v-else class="min-h-screen">
      <!-- 背景装饰 -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <!-- 游戏手册浮动按钮 -->
          <div class="fixed bottom-4 right-4 z-40">
            <button @click="showGameGuide = !showGameGuide" class="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <span class="text-white text-xl">📖</span>
            </button>
          </div>

          <!-- 游戏手册浮动面板 -->
          <div v-if="showGameGuide" class="fixed right-4 bottom-20 w-72 sm:w-80 bg-white rounded-xl border border-indigo-100 shadow-xl z-40 overflow-hidden">
            <div class="bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-3 flex justify-between items-center">
              <h3 class="text-white font-medium">游戏手册</h3>
              <button @click="showGameGuide = false" class="text-white hover:text-indigo-100">×</button>
            </div>
            <div class="p-4 max-h-96 overflow-y-auto">
              <div class="space-y-4">
                <!-- 当前状态 -->
                <div>
                  <h4 class="font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <span class="text-indigo-500">🎮</span>
                    <span>当前状态</span>
                  </h4>
                  <div class="bg-slate-50 rounded-lg p-3 text-sm border border-slate-100">
                    <div><span class="font-medium">玩家:</span> {{ playerName }}</div>
                    <div><span class="font-medium">场景:</span> {{ currentScene?.id || '初始' }}</div>
                    <div><span class="font-medium">模型:</span> {{ modelName }}</div>
                  </div>
                </div>

                <!-- 能力值 -->
                <div>
                  <h4 class="font-bold text-white mb-6 flex items-center gap-3">
                    <span class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-sm">📊</span>
                    <span>能力值</span>
                  </h4>
                  <div class="space-y-4">
                    <!-- 游戏技能 -->
                    <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
                      <div class="flex justify-between items-center mb-3">
                        <div class="flex items-center gap-3">
                          <span class="text-2xl">🎮</span>
                          <span class="text-blue-300 font-medium">游戏技能</span>
                        </div>
                        <span class="text-blue-200 font-bold text-lg">{{ Math.round(gameProgress.gaming) }}%</span>
                      </div>
                      <div class="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-700 shadow-lg shadow-blue-500/25" :style="`width: ${gameProgress.gaming}%`"></div>
                      </div>
                    </div>

                    <!-- 学习能力 -->
                    <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
                      <div class="flex justify-between items-center mb-3">
                        <div class="flex items-center gap-3">
                          <span class="text-2xl">📚</span>
                          <span class="text-green-300 font-medium">学习能力</span>
                        </div>
                        <span class="text-green-200 font-bold text-lg">{{ Math.round(gameProgress.study) }}%</span>
                      </div>
                      <div class="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-700 shadow-lg shadow-green-500/25" :style="`width: ${gameProgress.study}%`"></div>
                      </div>
                    </div>

                    <!-- 社交关系 -->
                    <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
                      <div class="flex justify-between items-center mb-3">
                        <div class="flex items-center gap-3">
                          <span class="text-2xl">👥</span>
                          <span class="text-purple-300 font-medium">社交关系</span>
                        </div>
                        <span class="text-purple-200 font-bold text-lg">{{ Math.round(gameProgress.social) }}%</span>
                      </div>
                      <div class="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-700 shadow-lg shadow-purple-500/25" :style="`width: ${gameProgress.social}%`"></div>
                      </div>
                    </div>

                    <!-- 神秘能力 -->
                    <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
                      <div class="flex justify-between items-center mb-3">
                        <div class="flex items-center gap-3">
                          <span class="text-2xl">✨</span>
                          <span class="text-amber-300 font-medium">神秘能力</span>
                        </div>
                        <span class="text-amber-200 font-bold text-lg">{{ Math.round(gameProgress.other) }}%</span>
                      </div>
                      <div class="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-700 shadow-lg shadow-amber-500/25" :style="`width: ${gameProgress.other}%`"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 上次选择分析 -->
                <div v-if="lastChoiceAnalysis.text">
                  <h4 class="font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <span class="text-indigo-500">🔍</span>
                    <span>上次选择分析</span>
                  </h4>
                  <div class="bg-slate-50 rounded-lg p-3 text-sm border border-slate-100">
                    <div class="mb-1 font-medium">选择: "{{ lastChoiceAnalysis.text }}"</div>
                    <div class="text-xs text-slate-500 space-y-1">
                      <div v-if="lastChoiceAnalysis.matchedKeywords.gaming?.length">
                        <span class="text-blue-600 font-medium">游戏关键词:</span> {{ lastChoiceAnalysis.matchedKeywords.gaming.join(', ') }}
                      </div>
                      <div v-if="lastChoiceAnalysis.matchedKeywords.study?.length">
                        <span class="text-green-600 font-medium">学习关键词:</span> {{ lastChoiceAnalysis.matchedKeywords.study.join(', ') }}
                      </div>
                      <div v-if="lastChoiceAnalysis.matchedKeywords.social?.length">
                        <span class="text-purple-600 font-medium">社交关键词:</span> {{ lastChoiceAnalysis.matchedKeywords.social.join(', ') }}
                      </div>
                      <div v-if="lastChoiceAnalysis.matchedKeywords.other?.length">
                        <span class="text-amber-600 font-medium">神秘关键词:</span> {{ lastChoiceAnalysis.matchedKeywords.other.join(', ') }}
                      </div>
                      <div v-if="!Object.values(lastChoiceAnalysis.matchedKeywords).some(arr => arr?.length)">
                        无匹配关键词，增加了神秘能力
                      </div>
                      <div class="mt-2 font-medium">
                        增加了: <span :class="{
                          'text-blue-600': lastChoiceAnalysis.impactType === 'gaming',
                          'text-green-600': lastChoiceAnalysis.impactType === 'study',
                          'text-purple-600': lastChoiceAnalysis.impactType === 'social',
                          'text-amber-600': lastChoiceAnalysis.impactType === 'other'
                        }">{{ lastChoiceImpactText }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 调试开关 -->
                <div>
                  <div class="inline-flex items-center">
                    <label class="relative flex items-center cursor-pointer">
                      <input type="checkbox" v-model="showDebugInfo" class="sr-only peer">
                      <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500"></div>
                      <span class="ml-2 text-xs font-medium text-slate-600">显示调试信息</span>
                    </label>
                  </div>
                </div>

                <!-- 调试信息 -->
                <div v-if="showDebugInfo" class="bg-slate-800 text-slate-200 p-3 rounded-lg text-xs font-mono overflow-x-auto">
                  <pre>{{ JSON.stringify(debugInfo, null, 2) }}</pre>
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-xl sm:rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-lg shadow-indigo-100/50">
            <!-- 状态栏 -->
            <div class="bg-slate-50 border-b border-slate-100 p-4 sm:p-6">
              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div class="flex items-center gap-3 sm:gap-4">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 p-[1px]">
                    <div class="w-full h-full rounded-[10px] bg-white flex items-center justify-center">
                      <span class="text-xl sm:text-2xl">⚔️</span>
                    </div>
                  </div>
                  <div>
                    <div class="text-base sm:text-lg font-bold text-slate-800">{{ playerName }}</div>
                    <div class="text-xs sm:text-sm text-slate-500">见习剑客</div>
                  </div>
                </div>

                <div class="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
                  <div class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm">
                    第 {{ currentScene?.id || '?' }} 章
                  </div>
                  <button @click="toggleModelIndicator" class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border transition-colors duration-200 text-sm" :class="[modelName === 'deepseek-r1' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200']">
                    {{ modelName }}
                  </button>
                  <button @click="resetGame" class="group px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all duration-300 text-sm">
                    <span class="flex items-center gap-2">
                      <span class="text-base sm:text-lg group-hover:rotate-180 transition-transform duration-500">🔄</span>
                      <span class="hidden sm:inline">重新开始</span>
                    </span>
                  </button>
                  <button @click="backToHomepage" class="group px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 hover:bg-indigo-100 transition-all duration-300 text-sm">
                    <span class="flex items-center gap-2">
                      <span class="text-base sm:text-lg">🏠</span>
                      <span class="hidden sm:inline">返回首页</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <!-- 场景内容 -->
            <div class="p-4 sm:p-8 space-y-4 sm:space-y-6 bg-white">
              <!-- 对话与思维过程选项卡 -->
              <div class="mb-4 sm:mb-6 border border-slate-100 rounded-2xl overflow-hidden bg-white">
                <!-- 选项卡导航 -->
                <div class="flex border-b border-slate-100">
                  <button @click="switchTab('dialog')" class="flex-1 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors duration-200 relative" :class="activeTab === 'dialog'
                    ? 'text-indigo-600 bg-indigo-50/50'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'">
                    <span class="flex items-center justify-center gap-1 sm:gap-2">
                      <span class="text-base sm:text-lg">💭</span>
                      <span>对话内容</span>
                    </span>
                    <span v-if="activeTab === 'dialog'" class="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500"></span>
                  </button>

                  <button v-if="modelName !== 'deepseek-chat'" @click="switchTab('reasoning')" class="flex-1 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors duration-200 relative" :class="activeTab === 'reasoning'
                    ? 'text-purple-600 bg-purple-50/50'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'">
                    <span class="flex items-center justify-center gap-1 sm:gap-2">
                      <span class="text-base sm:text-lg">🤔</span>
                      <span>思维过程</span>
                      <span v-if="isThinking && !reasoningContent" class="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                        思考中
                        <span class="ml-1 flex space-x-1">
                          <span class="w-1 h-1 bg-purple-700 rounded-full animate-bounce" style="animation-delay: 0s"></span>
                          <span class="w-1 h-1 bg-purple-700 rounded-full animate-bounce" style="animation-delay: 0.1s"></span>
                          <span class="w-1 h-1 bg-purple-700 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                        </span>
                      </span>
                    </span>
                    <span v-if="activeTab === 'reasoning'" class="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500"></span>
                  </button>

                  <button v-if="apiError.show" @click="switchTab('error')" class="flex-1 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors duration-200 relative" :class="activeTab === 'error'
                    ? 'text-red-600 bg-red-50/50'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'">
                    <span class="flex items-center justify-center gap-1 sm:gap-2">
                      <span class="text-base sm:text-lg">⚠️</span>
                      <span>错误信息</span>
                    </span>
                    <span v-if="activeTab === 'error'" class="absolute bottom-0 left-0 w-full h-0.5 bg-red-500"></span>
                  </button>
                </div>

                <!-- 选项卡内容 -->
                <div class="p-4 sm:p-6">
                  <!-- 对话内容选项卡 -->
                  <div v-if="activeTab === 'dialog'" class="animate-fadeIn">
                    <div class="flex gap-3 sm:gap-4">
                      <div class="text-xl sm:text-2xl shrink-0">💭</div>
                      <div v-if="isGenerating && !currentDialogStream" class="text-slate-600 italic">
                        <div class="flex items-center text-slate-500 text-sm sm:text-base">
                          <span>AI正在生成对话</span>
                          <span class="ml-2 flex space-x-1">
                            <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0s"></span>
                            <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></span>
                            <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                          </span>
                        </div>
                      </div>
                      <div v-if="currentDialogStream" class="text-slate-600 italic text-sm sm:text-base">
                        {{ currentDialogStream }}
                      </div>
                      <div v-else-if="currentScene?.dialog" class="text-slate-600 italic text-sm sm:text-base">
                        {{ currentScene.dialog }}
                      </div>
                      <div v-else-if="aiErrorMessage && aiErrorMessage.includes('修复')" class="text-amber-600 text-sm sm:text-base italic">
                        <div class="flex items-center gap-2">
                          <span class="text-lg">🔧</span>
                          <span>正在修复对话内容...</span>
                        </div>
                      </div>
                      <div v-else-if="aiErrorMessage" class="text-red-600 text-sm sm:text-base">
                        <div class="flex items-center gap-2">
                          <span class="text-lg">⚠️</span>
                          <span>{{ aiErrorMessage }}</span>
                        </div>
                      </div>
                      <div v-else class="text-slate-500 text-sm sm:text-base italic">
                        <div class="flex items-center gap-2">
                          <span class="text-lg">💭</span>
                          <span>等待对话内容...</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 思维过程选项卡 -->
                  <div v-else-if="activeTab === 'reasoning'" class="animate-fadeIn">
                    <div class="flex gap-3 sm:gap-4">
                      <div class="text-xl sm:text-2xl shrink-0">🤔</div>
                      <div v-if="isGenerating && !reasoningContent" class="text-slate-600 italic">
                        <div class="flex items-center text-slate-500 text-sm sm:text-base">
                          <span>AI正在生成思维过程</span>
                          <span class="ml-2 flex space-x-1">
                            <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0s"></span>
                            <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></span>
                            <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                          </span>
                        </div>
                      </div>
                      <p class="text-slate-700 leading-relaxed text-sm sm:text-base">{{ reasoningContent || (currentScene ? currentScene.reasoning : '') }}</p>
                    </div>
                  </div>

                  <!-- 错误信息选项卡 -->
                  <div v-else-if="activeTab === 'error'" class="animate-fadeIn">
                    <div class="bg-red-50 rounded-lg p-3 sm:p-4 border border-red-100">
                      <div class="flex items-start gap-2 sm:gap-3">
                        <div class="text-xl sm:text-2xl text-red-500 shrink-0">⚠️</div>
                        <div>
                          <h3 class="font-bold text-red-700 flex items-center gap-2 text-sm sm:text-base">
                            <span>错误 {{ apiError.code }}</span>
                            <span v-if="apiError.details">- {{ apiError.details.title }}</span>
                          </h3>

                          <p class="text-red-600 mt-1 mb-2 text-xs sm:text-sm">{{ apiError.message }}</p>

                          <div v-if="apiError.details" class="text-xs sm:text-sm space-y-2 text-slate-700">
                            <p>
                              <span class="font-medium">原因：</span>
                              <span>{{ apiError.details.reason }}</span>
                            </p>
                            <p>
                              <span class="font-medium">解决方法：</span>
                              <span>{{ apiError.details.solution }}</span>
                            </p>
                          </div>

                          <div class="mt-3 sm:mt-4">
                            <button @click="clearApiError" class="px-3 py-1 text-xs rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors">
                              关闭错误提示
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 场景描述 - 高级炫酷版 -->
              <div class="relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/30 to-blue-50/30 rounded-xl sm:rounded-2xl p-5 sm:p-7 border border-indigo-100/50 mb-4 sm:mb-6 shadow-lg shadow-indigo-100/20 backdrop-blur-sm group">
                <!-- 装饰元素 -->
                <div class="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-300 to-transparent opacity-70"></div>
                <div class="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-r from-blue-300 via-transparent to-transparent opacity-70"></div>
                <div class="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-700"></div>
                <div class="absolute -bottom-32 -left-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all duration-700"></div>

                <div class="relative flex items-start">
                  <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200/30 mr-4 sm:mr-5">
                    <span class="text-white text-xl">📜</span>
                  </div>

                  <div class="flex-1">
                    <h3 class="font-bold text-indigo-700 text-lg sm:text-xl mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-700">当前场景</h3>
                    <div v-if="currentScene?.description" class="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                      {{ currentScene.description }}
                    </div>
                    <div v-else-if="isGenerating" class="text-slate-500 text-sm sm:text-base italic">
                      <div class="flex items-center gap-2">
                        <span>AI正在生成场景描述</span>
                        <span class="flex space-x-1">
                          <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0s"></span>
                          <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></span>
                          <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                        </span>
                      </div>
                    </div>
                    <div v-else-if="aiErrorMessage && aiErrorMessage.includes('修复')" class="text-amber-600 text-sm sm:text-base">
                      <div class="flex items-center gap-2">
                        <span class="text-lg">🔧</span>
                        <span>{{ aiErrorMessage }}</span>
                      </div>
                    </div>
                    <div v-else-if="aiErrorMessage" class="text-red-600 text-sm sm:text-base">
                      <div class="flex items-center justify-between gap-2">
                        <div class="flex items-center gap-2">
                          <span class="text-lg">⚠️</span>
                          <span>{{ aiErrorMessage }}</span>
                        </div>
                        <button @click="retryCurrentScene" class="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs">
                          重试
                        </button>
                      </div>
                    </div>
                    <div v-else class="text-slate-600 text-sm sm:text-base">
                      <div class="flex items-center gap-2">
                        <span class="text-lg">📝</span>
                        <span>等待场景内容...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 对话内容 - 高级炫酷版 -->
              <div class="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50/20 to-blue-50/20 rounded-xl sm:rounded-2xl p-5 sm:p-7 border border-indigo-200/50 mb-4 sm:mb-6 shadow-lg shadow-indigo-200/20 backdrop-blur-sm group">
                <!-- 装饰元素 -->
                <div class="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-r from-indigo-300 via-purple-300/70 to-transparent opacity-70"></div>
                <div class="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-300/70 to-indigo-300 opacity-70"></div>
                <div class="absolute -top-24 -left-20 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all duration-700"></div>
                <div class="absolute -bottom-32 -right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-all duration-700"></div>

                <div class="absolute top-4 right-4 text-4xl opacity-5 group-hover:opacity-10 transition-opacity duration-700 transform rotate-12">💬</div>

                <div class="relative flex items-start">
                  <div class="flex-shrink-0 mr-4 sm:mr-5">
                    <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-md shadow-indigo-200/30 p-0.5">
                      <div class="w-full h-full rounded-full bg-white/90 flex items-center justify-center">
                        <span class="text-indigo-600 text-xl">💭</span>
                      </div>
                    </div>
                  </div>

                  <div class="flex-1">
                    <h3 class="font-bold text-purple-700 text-lg sm:text-xl mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">对话内容</h3>
                    <div class="bg-white/40 backdrop-blur-sm rounded-lg p-4 border border-indigo-100/50 shadow-sm">
                      <div v-if="currentScene?.dialog" class="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                        {{ currentScene.dialog }}
                      </div>
                      <div v-else-if="currentDialogStream" class="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                        {{ currentDialogStream }}
                      </div>
                      <div v-else-if="isGenerating" class="text-slate-500 text-sm sm:text-base italic">
                        <div class="flex items-center gap-2">
                          <span>AI正在生成对话内容</span>
                          <span class="flex space-x-1">
                            <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0s"></span>
                            <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></span>
                            <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                          </span>
                        </div>
                      </div>
                      <div v-else-if="aiErrorMessage && aiErrorMessage.includes('修复')" class="text-amber-600 text-sm sm:text-base italic">
                        <div class="flex items-center gap-2">
                          <span class="text-lg">🔧</span>
                          <span>正在修复内容格式...</span>
                        </div>
                      </div>
                      <div v-else-if="aiErrorMessage" class="text-red-600 text-sm sm:text-base">
                        <div class="flex items-center gap-2">
                          <span class="text-lg">⚠️</span>
                          <span>{{ aiErrorMessage }}</span>
                        </div>
                      </div>
                      <div v-else class="text-slate-600 text-sm sm:text-base italic">
                        <div class="flex items-center gap-2">
                          <span class="text-lg">💭</span>
                          <span>等待对话内容...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 特殊事件 -->
              <div v-if="currentScene?.specialEvent" class="relative overflow-hidden bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-indigo-100 mb-4 sm:mb-6">
                <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-indigo-200 to-blue-200"></div>
                <div class="flex gap-3 sm:gap-4">
                  <div class="text-xl sm:text-2xl">⚡</div>
                  <div>
                    <h3 class="font-bold text-slate-800 mb-2 text-sm sm:text-base">特殊事件</h3>
                    <p class="text-slate-600 text-sm sm:text-base">{{ currentScene?.specialEvent }}</p>
                  </div>
                </div>
              </div>

              <!-- 游戏进度指标 -->
              <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div class="bg-white rounded-xl border border-slate-100 p-3 sm:p-4 relative overflow-hidden group">
                  <div class="text-xs sm:text-sm text-slate-500 mb-1 flex justify-between items-center">
                    <span>游戏技能</span>
                    <span class="font-medium" :class="{ 'text-blue-600': gameProgress.gaming >= 100 }">{{ gameProgress.gaming }}%</span>
                  </div>
                  <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div class="h-2 rounded-full transition-all duration-700 ease-out" :class="[
                      gameProgress.gaming >= 100
                        ? 'bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 animate-pulse'
                        : 'bg-blue-500'
                    ]" :style="`width: ${gameProgress.gaming}%`"></div>
                  </div>
                  <!-- 满值时的特效 -->
                  <div v-if="gameProgress.gaming >= 100" class="absolute inset-0 pointer-events-none">
                    <div class="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-20 blur-xl"></div>
                    <div class="absolute top-1 right-2 text-xs font-bold text-blue-600 animate-bounce">满级!</div>
                  </div>
                </div>
                <div class="bg-white rounded-xl border border-slate-100 p-3 sm:p-4 relative overflow-hidden group">
                  <div class="text-xs sm:text-sm text-slate-500 mb-1 flex justify-between items-center">
                    <span>学习能力</span>
                    <span class="font-medium" :class="{ 'text-green-600': gameProgress.study >= 100 }">{{ gameProgress.study }}%</span>
                  </div>
                  <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div class="h-2 rounded-full transition-all duration-700 ease-out" :class="[
                      gameProgress.study >= 100
                        ? 'bg-gradient-to-r from-green-400 via-green-500 to-emerald-500 animate-pulse'
                        : 'bg-green-500'
                    ]" :style="`width: ${gameProgress.study}%`"></div>
                  </div>
                  <!-- 满值时的特效 -->
                  <div v-if="gameProgress.study >= 100" class="absolute inset-0 pointer-events-none">
                    <div class="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 opacity-20 blur-xl"></div>
                    <div class="absolute top-1 right-2 text-xs font-bold text-green-600 animate-bounce">满级!</div>
                  </div>
                </div>
                <div class="bg-white rounded-xl border border-slate-100 p-3 sm:p-4 relative overflow-hidden group">
                  <div class="text-xs sm:text-sm text-slate-500 mb-1 flex justify-between items-center">
                    <span>社交关系</span>
                    <span class="font-medium" :class="{ 'text-purple-600': gameProgress.social >= 100 }">{{ gameProgress.social }}%</span>
                  </div>
                  <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div class="h-2 rounded-full transition-all duration-700 ease-out" :class="[
                      gameProgress.social >= 100
                        ? 'bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-500 animate-pulse'
                        : 'bg-purple-500'
                    ]" :style="`width: ${gameProgress.social}%`"></div>
                  </div>
                  <!-- 满值时的特效 -->
                  <div v-if="gameProgress.social >= 100" class="absolute inset-0 pointer-events-none">
                    <div class="absolute -inset-1 bg-gradient-to-r from-purple-400 to-indigo-500 opacity-20 blur-xl"></div>
                    <div class="absolute top-1 right-2 text-xs font-bold text-purple-600 animate-bounce">满级!</div>
                  </div>
                </div>
                <div class="bg-white rounded-xl border border-slate-100 p-3 sm:p-4 relative overflow-hidden group">
                  <div class="text-xs sm:text-sm text-slate-500 mb-1 flex justify-between items-center">
                    <span>神秘能力</span>
                    <span class="font-medium" :class="{ 'text-amber-600': gameProgress.other >= 100 }">{{ gameProgress.other }}%</span>
                  </div>
                  <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div class="h-2 rounded-full transition-all duration-700 ease-out" :class="[
                      gameProgress.other >= 100
                        ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 animate-pulse'
                        : 'bg-amber-500'
                    ]" :style="`width: ${gameProgress.other}%`"></div>
                  </div>
                  <!-- 满值时的特效 -->
                  <div v-if="gameProgress.other >= 100" class="absolute inset-0 pointer-events-none">
                    <div class="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 opacity-20 blur-xl"></div>
                    <div class="absolute top-1 right-2 text-xs font-bold text-amber-600 animate-bounce">满级!</div>
                  </div>
                </div>
              </div>

              <!-- 选项列表 -->
              <div class="space-y-3 sm:space-y-4" :class="{ 'opacity-50 pointer-events-none': isGenerating }">
                <!-- 当有选项时显示选项 -->
                <div v-for="(option, index) in currentScene?.options || []" :key="`option-${index}-${option.text}`" class="group cursor-pointer relative overflow-hidden touch-manipulation" @click="!isGenerating && handleChoice(option)">
                  <div class="absolute inset-0 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="relative bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-100 transform group-hover:-translate-y-1 transition-all duration-300 group-hover:shadow-md group-hover:shadow-indigo-100/50">
                    <div class="text-slate-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">{{ option.text }}</div>
                    <div v-if="option.hint" class="text-slate-500 text-xs sm:text-sm italic">{{ option.hint }}</div>
                    <!-- 选项禁用状态提示 -->
                    <div v-if="isGenerating" class="absolute top-2 right-2 flex items-center justify-center">
                      <div class="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center">
                        <div class="w-2 h-2 rounded-full bg-slate-400 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 游戏结局显示 -->
                <div v-if="!isGenerating && currentScene?.id === 999" class="text-center py-8">
                  <div class="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-8">
                    <div class="text-4xl mb-4">🎉</div>
                    <div class="text-indigo-800 font-bold text-xl mb-4">游戏结束</div>
                    <div class="text-indigo-600 mb-6">恭喜你完成了剑道传奇的故事！</div>
                    <button @click="backToHomepage" class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300">
                      重新开始
                    </button>
                  </div>
                </div>

                <!-- 当没有选项时的提示 -->
                <div v-else-if="!isGenerating && (!currentScene?.options || currentScene.options.length === 0)" class="text-center py-8">
                  <div class="bg-red-50 border border-red-200 rounded-xl p-6">
                    <div class="text-red-600 text-lg mb-2">⚠️</div>
                    <div class="text-red-700 font-medium mb-2">场景选项加载失败</div>
                    <div class="text-red-600 text-sm mb-4">可能是API响应格式错误或网络问题</div>
                    <button @click="retryCurrentScene" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      重新生成场景
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 模型信息弹窗 -->
        <div v-if="showModelInfo" class="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50" @click="showModelInfo = false">
          <div class="relative bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-xs sm:max-w-md w-full mx-4 shadow-xl" @click.stop>
            <h2 class="text-xl sm:text-2xl font-bold text-slate-800 mb-4">AI模型信息</h2>
            <div class="space-y-4">
              <div>
                <h3 class="text-xs sm:text-sm font-medium text-slate-500">当前模型</h3>
                <p class="text-base sm:text-lg font-medium text-slate-800">{{ modelName }}</p>
              </div>

              <div>
                <h3 class="text-xs sm:text-sm font-medium text-slate-500">模型特点</h3>
                <ul class="mt-2 space-y-2">
                  <li v-if="modelName === 'deepseek-r1'" class="flex items-start gap-2">
                    <span class="text-purple-500 mt-0.5">✓</span>
                    <span class="text-slate-700 text-xs sm:text-sm">支持思维链展示，可观察AI思考过程</span>
                  </li>
                  <li v-if="modelName === 'deepseek-r1'" class="flex items-start gap-2">
                    <span class="text-purple-500 mt-0.5">✓</span>
                    <span class="text-slate-700 text-xs sm:text-sm">更强的推理和剧情架构能力</span>
                  </li>
                  <li v-if="modelName === 'deepseek-chat'" class="flex items-start gap-2">
                    <span class="text-blue-500 mt-0.5">✓</span>
                    <span class="text-slate-700 text-xs sm:text-sm">更流畅的对话体验</span>
                  </li>
                  <li v-if="modelName === 'QwQ-32B'" class="flex items-start gap-2">
                    <span class="text-blue-500 mt-0.5">✓</span>
                    <span class="text-slate-700 text-xs sm:text-sm">更大模型参数，知识面更广</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-green-500 mt-0.5">✓</span>
                    <span class="text-slate-700 text-xs sm:text-sm">实时流式生成，响应更快</span>
                  </li>
                </ul>
              </div>

              <div class="pt-4">
                <button @click="changeModel" class="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl font-medium text-sm sm:text-base">
                  切换模型
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 加载状态 - 增强版 -->
        <div v-if="isGenerating && !isStreamResponseActive" class="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div class="relative">
            <div class="relative bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-lg shadow-indigo-100/50">
              <div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4">
                <svg class="animate-spin w-full h-full text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p class="text-slate-800 text-base sm:text-lg font-medium text-center">正在书写剧情...</p>
              <!-- 添加更详细的状态显示 -->
              <p class="text-slate-500 text-xs sm:text-sm text-center mt-2">
                <span v-if="activeTab === 'reasoning'">正在思考中，请稍候...</span>
                <span v-else>AI正在创作，故事即将呈现...</span>
              </p>
              <!-- 添加进度条 -->
              <div class="w-full h-1 bg-slate-100 rounded-full mt-4 overflow-hidden">
                <div class="h-full bg-indigo-400 rounded-full animate-progressBar"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 错误提示 -->
        <div v-if="aiErrorMessage" class="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-50">
          <div class="relative">
            <div class="relative bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-red-100 text-red-500 flex items-center gap-2 sm:gap-3 shadow-lg shadow-red-100/50 text-sm sm:text-base">
              <span class="text-lg sm:text-xl">❌</span>
              <span class="font-medium">{{ aiErrorMessage }}</span>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<style scoped>
:root {
  color-scheme: light;
}

@media (max-width: 640px) {
  .animate-fadeIn {
    animation-duration: 0.2s;
  }
}

.touch-manipulation {
  touch-action: manipulation;
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(99, 102, 241, 0.3) rgba(241, 245, 249, 0.1);
}

/* 在移动端优化触摸目标大小 */
@media (max-width: 640px) {

  button,
  [role="button"],
  .cursor-pointer {
    min-height: 44px;
  }
}

/* 游戏风格动画 */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* 浮动粒子动画 */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.7;
  }
  25% {
    transform: translateY(-10px) rotate(90deg);
    opacity: 1;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.8;
  }
  75% {
    transform: translateY(-10px) rotate(270deg);
    opacity: 1;
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* 进度条动画 */
@keyframes progressBar {
  0% {
    width: 0%;
    opacity: 0.5;
  }

  20% {
    width: 20%;
    opacity: 0.7;
  }

  50% {
    width: 50%;
    opacity: 0.8;
  }

  80% {
    width: 80%;
    opacity: 0.9;
  }

  95% {
    width: 95%;
  }

  100% {
    width: 98%;
  }
}

.animate-progressBar {
  animation: progressBar 8s cubic-bezier(0.1, 0.5, 0.2, 1) infinite;
}

/* 游戏风格发光效果 */
@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 5px rgba(34, 211, 238, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(34, 211, 238, 0.8), 0 0 30px rgba(34, 211, 238, 0.6);
  }
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}

/* 游戏风格闪烁效果 */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.animate-shimmer {
  background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.4), transparent);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

/* 游戏风格缩放脉冲 */
@keyframes scale-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.animate-scale-pulse {
  animation: scale-pulse 2s ease-in-out infinite;
}
</style>

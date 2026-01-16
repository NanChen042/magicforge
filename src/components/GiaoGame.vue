<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useGameStore } from '../stores/game'
import { updateApiConfig } from '../services/deepseekService'

// 子组件
import GameIntro from './game/GameIntro.vue'
import GameStatusBar from './game/GameStatusBar.vue'
import GameScene from './game/GameScene.vue'
import GameProgress from './game/GameProgress.vue'
import GameOptions from './game/GameOptions.vue'
import GameGuide from './game/GameGuide.vue'
import GameOverModal from './game/GameOverModal.vue'

// Props
const props = defineProps({
  apiBaseUrl: {
    type: String,
    default: ''
  }
})

// Store
const gameStore = useGameStore()

// 基础状态
const playerName = ref('')
const showIntro = ref(true)
const apiUrl = ref('https://api.siliconflow.cn/v1/chat/completions')
const apiKey = ref('sk-etybbrewlaafxjjqtlgfeqaaskzrmryfndjtjjecyixbsznw')
const modelName = ref('Qwen/Qwen2.5-7B-Instruct')
const loading = ref(false)

// UI 状态
const showModelInfo = ref(false)
const showGameGuide = ref(false)
const showDebugInfo = ref(false)
const activeTab = ref('dialog')

// 流式响应状态
const reasoningContent = ref('')
const currentDialogStream = ref('')
const isThinking = ref(false)
const isStreamResponseActive = ref(false)
const streamListenersSet = ref(false)

// 游戏结束状态
const showGameOver = ref(false)
const gameOverTitle = ref('')
const gameOverMessage = ref('')
const gameOverType = ref('')

// 游戏进度
const gameProgress = ref({
  gaming: 25,
  study: 10,
  social: 5,
  other: 0
})

// 选择分析
const lastChoiceAnalysis = ref({
  text: '',
  matchedKeywords: {
    gaming: [] as string[],
    study: [] as string[],
    social: [] as string[],
    other: [] as string[]
  },
  impactType: 'gaming'
})

// 调试信息
const debugInfo = ref({
  lastChoice: {
    text: '',
    matchedKeywords: { gaming: [] as string[], study: [] as string[], social: [] as string[], other: [] as string[] },
    impactType: 'gaming',
    impactText: ''
  },
  currentScene: { id: 1, dialog: '', reasoning: '', specialEvent: '', options: [] as any[] }
})

// API 错误
interface ApiErrorInfo {
  title: string
  reason: string
  solution: string
}

const apiErrorCodes: Record<string, ApiErrorInfo> = {
  '400': { title: '格式错误', reason: '请求体格式错误', solution: '请根据错误信息提示修改请求体' },
  '401': { title: '认证失败', reason: 'API key 错误，认证失败', solution: '请检查您的 API key 是否正确' },
  '402': { title: '余额不足', reason: '账号余额不足', solution: '请确认账户余额，并前往充值页面进行充值' },
  '422': { title: '参数错误', reason: '请求体参数错误', solution: '请根据错误信息提示修改相关参数' },
  '429': { title: '请求速率达到上限', reason: '请求速率达到上限', solution: '请合理规划您的请求速率' },
  '500': { title: '服务器故障', reason: '服务器内部故障', solution: '请等待后重试' },
  '503': { title: '服务器繁忙', reason: '服务器负载过高', solution: '请稍后重试您的请求' }
}

const apiError = ref({
  show: false,
  code: '',
  message: '',
  details: null as ApiErrorInfo | null
})

// 计算属性
const currentScene = computed(() => gameStore.currentScene)
const isGenerating = computed(() => gameStore.isGenerating)
const aiErrorMessage = computed(() => gameStore.aiErrorMessage)

// 监听 API 地址变化
watch(() => props.apiBaseUrl, (newUrl) => {
  if (newUrl) {
    apiUrl.value = newUrl
    updateApiConfig({ baseUrl: newUrl })
  }
}, { immediate: true })

// 设置模型
const setModel = (model: string) => {
  modelName.value = model
  updateApiConfig({ baseUrl: apiUrl.value, apiKey: apiKey.value, model })
}

// 处理 API 配置更新
const handleApiConfigUpdate = (config: { apiKey: string; model: string }) => {
  apiKey.value = config.apiKey
  modelName.value = config.model
  updateApiConfig({ baseUrl: apiUrl.value, apiKey: config.apiKey, model: config.model })
}

// 启动游戏
const startGame = async (name: string) => {
  playerName.value = name
  loading.value = true

  try {
    updateApiConfig({ baseUrl: apiUrl.value, apiKey: apiKey.value, model: modelName.value })
    gameStore.setPlayerName(name)
    showIntro.value = false
    await gameStore.startNewGame()
    updateProgressData()
  } catch (error) {
    console.error('游戏启动错误:', error)
  } finally {
    loading.value = false
  }
}

// 设置流式监听器
const setupStreamListeners = () => {
  if (streamListenersSet.value) return

  gameStore.$onAction(({ name, args }) => {
    if (name === 'updateReasoningStream' && args[0]) {
      reasoningContent.value += args[0]
      if (modelName.value !== 'deepseek-chat' && reasoningContent.value && activeTab.value === 'dialog') {
        activeTab.value = 'reasoning'
      }
    }
    if (name === 'updateDialogStream' && args[0]) {
      currentDialogStream.value += args[0]
      if (currentDialogStream.value && activeTab.value === 'reasoning') {
        activeTab.value = 'dialog'
      }
    }
  })

  streamListenersSet.value = true
}

// 处理选择
const handleChoice = async (option: { text: string; next?: number; impact?: any }) => {
  try {
    reasoningContent.value = ''
    currentDialogStream.value = ''
    isThinking.value = modelName.value !== 'deepseek-chat'
    isStreamResponseActive.value = true
    clearApiError()

    if (!streamListenersSet.value) {
      setupStreamListeners()
    }

    if (option.impact) {
      processImpact(option.impact)
      lastChoiceAnalysis.value = {
        text: option.text,
        matchedKeywords: { gaming: [], study: [], social: [], other: [] },
        impactType: option.impact.quest?.type || 'other'
      }
    } else {
      analyzeChoice(option.text)
    }

    activeTab.value = modelName.value === 'deepseek-chat' ? 'dialog' : 'reasoning'
    await gameStore.handleChoice(option)

    if (currentScene.value) {
      setDebugInfo(currentScene.value)
    }

    isThinking.value = false
    isStreamResponseActive.value = false
  } catch (error) {
    console.error('处理选择时出错:', error)
    isThinking.value = false
    isStreamResponseActive.value = false
    handleApiError(error)
  }
}

// 分析选择
const analyzeChoice = (text: string) => {
  const optionText = text.toLowerCase()
  const scores = { gaming: 0, study: 0, social: 0, other: 0 }
  const matchedKeywords = { gaming: [] as string[], study: [] as string[], social: [] as string[], other: [] as string[] }

  const keywords = {
    gaming: ['游戏', '剑魔', '技能', '排位', '连招', '对线', '比赛', '击败', '电竞', '英雄', '段位', 'LOL', '打野', '屏幕', '键盘', '打游戏', '王者', 'MVP', '玩家'],
    study: ['学习', '考试', '上课', '听讲', '作业', '专心', '知识', '读书', '笔记', '成绩', '课程', '教授', '学校', '老师', '教室', '课本', '学科', '复习', '思考'],
    social: ['朋友', '社交', '关系', '交流', '合作', '团队', '聚会', '聚餐', '派对', '沟通', '网友', '约会', '同学会', '女生', '男生', '聚在一起'],
    other: ['神秘', '命运', '思考', '冥想', '灵感', '直觉', '预感', '奇怪', '奇特', '感悟', '超自然', '第六感', '梦境', '星象', '符文']
  }

  Object.entries(keywords).forEach(([type, words]) => {
    words.forEach(word => {
      if (optionText.includes(word)) {
        scores[type as keyof typeof scores]++
        matchedKeywords[type as keyof typeof matchedKeywords].push(word)
      }
    })
  })

  // 权重调整
  if (scores.social > 0 && scores.social <= 2) scores.social *= 0.7
  if (scores.other > 0) scores.other *= 1.2

  // 确定影响类型
  let impactType: 'gaming' | 'study' | 'social' | 'other' = 'gaming'
  let maxScore = -1

  Object.entries(scores).forEach(([type, score]) => {
    if (score > maxScore) {
      maxScore = score
      impactType = type as typeof impactType
    }
  })

  if (maxScore === 0) impactType = 'other'

  const baseValue = 5
  const lengthBonus = Math.min(3, Math.floor(text.length / 20))
  const valueIncrease = baseValue + lengthBonus

  lastChoiceAnalysis.value = { text, matchedKeywords, impactType }
  processImpact({ quest: { type: impactType, value: valueIncrease } })
}

// 处理影响
const processImpact = (impact: any) => {
  if (impact.quest) {
    const { type, value } = impact.quest
    if (type === 'gaming') gameProgress.value.gaming = Math.min(100, gameProgress.value.gaming + value)
    if (type === 'study') gameProgress.value.study = Math.min(100, gameProgress.value.study + value)
    if (type === 'social') gameProgress.value.social = Math.min(100, gameProgress.value.social + value)
    if (type === 'other') gameProgress.value.other = Math.min(100, gameProgress.value.other + value)
    checkGameProgress()
  }
}

// 检查游戏进度
const checkGameProgress = () => {
  const completedAbilities: string[] = []

  if (gameProgress.value.gaming >= 100) completedAbilities.push('gaming')
  if (gameProgress.value.study >= 100) completedAbilities.push('study')
  if (gameProgress.value.social >= 100) completedAbilities.push('social')
  if (gameProgress.value.other >= 100) completedAbilities.push('other')

  if (completedAbilities.length === 0 || showGameOver.value) return

  const primaryAbility = completedAbilities[0]
  const titles: Record<string, string> = {
    gaming: '游戏大师',
    study: '学霸之路',
    social: '社交之星',
    other: '神秘技能'
  }

  const messages: Record<string, string> = {
    gaming: `恭喜${playerName.value}！你在游戏技能方面达到了顶峰！你成为了传说中的电竞选手！`,
    study: `恭喜${playerName.value}！你在学业上取得了令人瞩目的成就！成为了学院最年轻的教授！`,
    social: `恭喜${playerName.value}！你的社交能力已经炉火纯青！成为了人际关系网络的中心！`,
    other: `恭喜${playerName.value}！你掌握了一种无法言明的神秘能力！似乎命运的齿轮在你手中转动！`
  }

  gameOverTitle.value = titles[primaryAbility] || '游戏结束'
  gameOverMessage.value = messages[primaryAbility] || '恭喜完成游戏！'
  gameOverType.value = primaryAbility
  showGameOver.value = true
}

// 更新进度数据
const updateProgressData = () => {
  gameProgress.value = {
    gaming: gameStore.storyProgress?.mainQuests?.gaming || 25,
    study: gameStore.storyProgress?.mainQuests?.study || 10,
    social: gameStore.storyProgress?.mainQuests?.social || 5,
    other: gameStore.storyProgress?.mainQuests?.other || 0
  }
  checkGameProgress()
}

// 重置游戏
const resetGame = () => {
  if (!confirm('确定要重置游戏进度吗？')) return

  currentDialogStream.value = ''
  reasoningContent.value = ''
  activeTab.value = 'dialog'
  showGameOver.value = false
  isThinking.value = false
  isStreamResponseActive.value = false
  clearApiError()
  gameStore.resetGame()
  gameProgress.value = { gaming: 25, study: 10, social: 5, other: 0 }
}

// 返回首页
const backToHomepage = () => {
  currentDialogStream.value = ''
  reasoningContent.value = ''
  activeTab.value = 'dialog'
  showGameOver.value = false
  isThinking.value = false
  isStreamResponseActive.value = false
  clearApiError()
  gameStore.resetGame()
  gameProgress.value = { gaming: 25, study: 10, social: 5, other: 0 }
  showIntro.value = true
}

// 关闭游戏结束弹窗
const closeGameOverAndReset = () => {
  showGameOver.value = false
  backToHomepage()
}

// 重试当前场景
const retryCurrentScene = async () => {
  try {
    clearApiError()
    gameStore.aiErrorMessage = ''
    currentDialogStream.value = ''
    reasoningContent.value = ''
    isThinking.value = modelName.value !== 'deepseek-chat'
    isStreamResponseActive.value = true

    await gameStore.handleChoice({ text: '继续当前场景', next: gameStore.currentSceneId })

    isThinking.value = false
    isStreamResponseActive.value = false
  } catch (error) {
    console.error('重新生成场景失败:', error)
    isThinking.value = false
    isStreamResponseActive.value = false
    handleApiError(error)
  }
}

// 处理 API 错误
const handleApiError = (error: any) => {
  isThinking.value = false
  isStreamResponseActive.value = false

  if (error?.response?.status) {
    const statusCode = error.response.status.toString()
    apiError.value = {
      show: true,
      code: statusCode,
      message: error.message || '未知错误',
      details: apiErrorCodes[statusCode] || null
    }
  } else {
    apiError.value = {
      show: true,
      code: 'UNKNOWN',
      message: error?.message || '连接失败，请检查API地址和网络连接',
      details: {
        title: '连接错误',
        reason: '无法连接到API服务器或请求被中断',
        solution: '请检查API地址是否正确，网络连接是否稳定'
      }
    }
  }
  activeTab.value = 'error'
}

// 清除错误
const clearApiError = () => {
  apiError.value.show = false
  if (activeTab.value === 'error') activeTab.value = 'dialog'
}

// 切换选项卡
const switchTab = (tab: string) => {
  activeTab.value = tab
}

// 切换模型
const changeModel = () => {
  const models = ['Qwen/Qwen2.5-7B-Instruct', 'Qwen/Qwen3-8B', 'THUDM/GLM-4-9B-Chat', 'Qwen/Qwen2-7B-Instruct']
  const currentIndex = models.indexOf(modelName.value)
  const nextIndex = (currentIndex + 1) % models.length

  reasoningContent.value = ''
  currentDialogStream.value = ''
  setModel(models[nextIndex])

  if (models[nextIndex] === 'deepseek-chat' && activeTab.value === 'reasoning') {
    activeTab.value = 'dialog'
  }
  showModelInfo.value = false
}

// 设置调试信息
const setDebugInfo = (scene: any) => {
  debugInfo.value = {
    lastChoice: {
      text: lastChoiceAnalysis.value.text,
      matchedKeywords: { ...lastChoiceAnalysis.value.matchedKeywords },
      impactType: lastChoiceAnalysis.value.impactType,
      impactText: ''
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

// 组件挂载
onMounted(() => {
  if (props.apiBaseUrl) apiUrl.value = props.apiBaseUrl
  updateApiConfig({ baseUrl: apiUrl.value, apiKey: apiKey.value, model: modelName.value })
  setupStreamListeners()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 relative">
    <!-- 全局背景装饰 -->
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <!-- 柔和光效 -->
      <div class="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-200/30 rounded-full blur-[100px]"></div>
      <div class="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-[80px]"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/20 rounded-full blur-[120px]"></div>
    </div>

    <!-- 开始界面 -->
    <GameIntro
      v-if="showIntro"
      @start-game="startGame"
      @update-api-config="handleApiConfigUpdate"
    />

    <!-- 游戏主界面 -->
    <div v-else class="relative z-10 min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <!-- 主容器 -->
        <div class="rounded-2xl sm:rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl shadow-slate-200/50">
          <!-- 状态栏 -->
          <GameStatusBar
            :player-name="playerName"
            :scene-id="currentScene?.id"
            :model-name="modelName"
            :is-generating="isGenerating"
            @toggle-model-info="showModelInfo = !showModelInfo"
            @reset-game="resetGame"
            @back-to-homepage="backToHomepage"
          />

          <!-- 内容区 -->
          <div class="p-4 sm:p-8 space-y-4 sm:space-y-6">
            <!-- 场景内容 -->
            <GameScene
              :current-scene="currentScene"
              :is-generating="isGenerating"
              :ai-error-message="aiErrorMessage"
              :active-tab="activeTab"
              :model-name="modelName"
              :is-thinking="isThinking"
              :reasoning-content="reasoningContent"
              :current-dialog-stream="currentDialogStream"
              :api-error="apiError"
              @switch-tab="switchTab"
              @clear-api-error="clearApiError"
              @retry-current-scene="retryCurrentScene"
            />

            <!-- 进度条 -->
            <GameProgress :game-progress="gameProgress" />

            <!-- 选项列表 -->
            <GameOptions
              :current-scene="currentScene"
              :is-generating="isGenerating"
              @handle-choice="handleChoice"
              @retry-current-scene="retryCurrentScene"
              @back-to-homepage="backToHomepage"
            />
          </div>
        </div>
      </div>

      <!-- 游戏手册 -->
      <GameGuide
        :show="showGameGuide"
        :player-name="playerName"
        :scene-id="currentScene?.id"
        :model-name="modelName"
        :game-progress="gameProgress"
        :last-choice-analysis="lastChoiceAnalysis"
        :show-debug-info="showDebugInfo"
        :debug-info="debugInfo"
        @close="showGameGuide = !showGameGuide"
        @update:show-debug-info="showDebugInfo = $event"
      />

      <!-- 模型信息弹窗 -->
      <Teleport to="body">
        <Transition
          enter-active-class="transition-opacity duration-200"
          enter-from-class="opacity-0"
          leave-active-class="transition-opacity duration-150"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="showModelInfo"
            class="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
            @click="showModelInfo = false"
          >
            <div
              class="relative bg-white rounded-2xl p-6 sm:p-8 max-w-xs sm:max-w-md w-full mx-4 shadow-2xl border border-slate-100"
              @click.stop
            >
              <h2 class="text-xl sm:text-2xl font-bold text-slate-800 mb-4">AI模型信息</h2>
              <div class="space-y-4">
                <div>
                  <h3 class="text-xs sm:text-sm font-medium text-slate-500">当前模型</h3>
                  <p class="text-base sm:text-lg font-medium text-slate-800">{{ modelName }}</p>
                </div>
                <div>
                  <h3 class="text-xs sm:text-sm font-medium text-slate-500">模型特点</h3>
                  <ul class="mt-2 space-y-2">
                    <li v-if="modelName.includes('r1') || modelName.includes('R1')" class="flex items-start gap-2">
                      <span class="text-purple-500 mt-0.5">✓</span>
                      <span class="text-slate-600 text-xs sm:text-sm">支持思维链展示，可观察AI思考过程</span>
                    </li>
                    <li v-if="modelName === 'deepseek-chat'" class="flex items-start gap-2">
                      <span class="text-blue-500 mt-0.5">✓</span>
                      <span class="text-slate-600 text-xs sm:text-sm">更流畅的对话体验</span>
                    </li>
                    <li v-if="modelName === 'QwQ-32B'" class="flex items-start gap-2">
                      <span class="text-blue-500 mt-0.5">✓</span>
                      <span class="text-slate-600 text-xs sm:text-sm">更大模型参数，知识面更广</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-green-500 mt-0.5">✓</span>
                      <span class="text-slate-600 text-xs sm:text-sm">实时流式生成，响应更快</span>
                    </li>
                  </ul>
                </div>
                <div class="pt-4">
                  <button
                    @click="changeModel"
                    class="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl font-medium text-sm sm:text-base transition-all shadow-lg shadow-indigo-200"
                  >
                    切换模型
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>

      <!-- 加载状态 -->
      <Teleport to="body">
        <Transition
          enter-active-class="transition-opacity duration-200"
          enter-from-class="opacity-0"
          leave-active-class="transition-opacity duration-150"
          leave-to-class="opacity-0"
        >
          <div
            v-if="isGenerating && !isStreamResponseActive"
            class="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-2xl shadow-slate-200/50">
              <div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4">
                <svg class="animate-spin w-full h-full text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p class="text-slate-800 text-base sm:text-lg font-medium text-center">正在书写剧情...</p>
              <p class="text-slate-500 text-xs sm:text-sm text-center mt-2">AI正在创作，故事即将呈现...</p>
              <div class="w-full h-1.5 bg-slate-100 rounded-full mt-4 overflow-hidden">
                <div class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-progressBar"></div>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>

    <!-- 游戏结束弹窗 -->
    <GameOverModal
      :show="showGameOver"
      :title="gameOverTitle"
      :message="gameOverMessage"
      :type="gameOverType"
      @close="closeGameOverAndReset"
    />
  </div>
</template>

<style scoped>
/* 进度条动画 */
@keyframes progressBar {
  0% { width: 0%; }
  20% { width: 20%; }
  50% { width: 50%; }
  80% { width: 80%; }
  95% { width: 95%; }
  100% { width: 98%; }
}

.animate-progressBar {
  animation: progressBar 8s cubic-bezier(0.1, 0.5, 0.2, 1) infinite;
}
</style>

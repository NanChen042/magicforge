<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useGameStore } from '../stores/game'
import { useApiStore } from '../stores/api'

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
const apiStore = useApiStore()

// 基础状态
const playerName = ref('')
const showIntro = ref(true)
const apiUrl = ref(apiStore.apiUrl)
const apiKey = ref(apiStore.apiKey)
const modelName = ref(apiStore.modelName)
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

// 动态四维属性（直接映射 store 单一数据源）
const gameProgress = computed(() => gameStore.storyProgress.mainQuests)

// 选择分析
const lastChoiceAnalysis = ref({
  text: '',
  impactType: 'gaming'
})

// 调试信息
const debugInfo = ref({
  lastChoice: {
    text: '',
    impactType: 'gaming'
  },
  currentScene: { id: 1, dialog: '', reasoning: '', specialEvent: '', options: [] as any[] }
})

// 判断当前模型是否为深度思考/推理模型
const isReasoningModel = computed(() => {
  const m = (modelName.value || '').toLowerCase()
  return m.includes('r1') || m.includes('reasoner') || m.includes('qwq') || m.includes('deepseek-r1')
})

// API 错误
interface ApiErrorInfo {
  title: string
  reason: string
  solution: string
}

const apiErrorCodes: Record<string, ApiErrorInfo> = {
  '400': { title: '格式错误', reason: '请求体格式错误', solution: '请根据错误信息提示修改请求体' },
  '401': { title: '认证失败', reason: 'API key 错误或未设置', solution: '请检查您的 API key 是否正确配置' },
  '402': { title: '余额不足', reason: '账号余额不足', solution: '请确认服务平台账户余额并充值' },
  '403': { title: '模型访问受限', reason: '当前模型已下线或未对当前账户开放权限', solution: '请切换至其他可用模型（如免费模型）' },
  '422': { title: '参数错误', reason: '请求参数超出模型上下文限制', solution: '请尝试重置或切换模型' },
  '429': { title: '请求速率达到上限', reason: '请求过于频繁，触发限流保护', solution: '请稍候片刻再继续推演' },
  '500': { title: '服务器故障', reason: '服务端处理异常', solution: '请等待片刻后点击重试' },
  '503': { title: '服务器繁忙', reason: '模型推理集群负载过高', solution: '请稍后重试或切换其他可用模型' }
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
    apiStore.setApiUrl(newUrl)
  }
}, { immediate: true })

// 设置模型
const setModel = (model: string) => {
  modelName.value = model
  apiStore.setApiUrl(apiUrl.value)
  apiStore.setApiKey(apiKey.value)
  apiStore.setModelName(model)
}

// 启动游戏
const startGame = async (name: string, trait: string = 'balanced', scriptId?: string) => {
  playerName.value = name || '主角'
  loading.value = true

  try {
    apiStore.setApiUrl(apiUrl.value)
    apiStore.setApiKey(apiKey.value)
    apiStore.setModelName(modelName.value)
    gameStore.setPlayerName(playerName.value)
    showIntro.value = false
    await gameStore.startNewGame(trait, scriptId)
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
    }
    if (name === 'updateDialogStream' && args[0]) {
      currentDialogStream.value += args[0]
    }
  })

  streamListenersSet.value = true
}

// 处理选择
const handleChoice = async (option: { text: string; next?: number; impact?: any }) => {
  try {
    reasoningContent.value = ''
    currentDialogStream.value = ''
    isThinking.value = isReasoningModel.value
    isStreamResponseActive.value = true
    clearApiError()

    if (!streamListenersSet.value) {
      setupStreamListeners()
    }

    lastChoiceAnalysis.value = {
      text: option.text,
      impactType: option.impact?.quest?.type || 'gaming'
    }

    await gameStore.handleChoice(option)

    if (currentScene.value) {
      setDebugInfo(currentScene.value)
      // 如果到达结局（ID === 999）
      if (currentScene.value.id === 999) {
        checkEndingMilestone()
      }
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

// 检查故事完成情况
const checkEndingMilestone = () => {
  const script = gameStore.activeScript
  gameOverTitle.value = `《${script?.title || '世界线'}》推演终局`
  gameOverMessage.value = currentScene.value?.description || '你已完成了本次世界线的全部抉择，因果命运已尘埃落定。'
  gameOverType.value = 'success'
  showGameOver.value = true
}

// 重置游戏
const resetGame = () => {
  if (!confirm('确定要重新开始当前剧本吗？')) return

  currentDialogStream.value = ''
  reasoningContent.value = ''
  activeTab.value = 'dialog'
  showGameOver.value = false
  isThinking.value = false
  isStreamResponseActive.value = false
  clearApiError()
  gameStore.resetGame()
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
    isThinking.value = isReasoningModel.value
    isStreamResponseActive.value = true

    await gameStore.handleChoice({ text: '根据当前情势重新推演后续行动' })

    activeTab.value = 'dialog'
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

  let statusCode = ''
  let errorMsg = error?.message || '未知错误'

  if (error?.response?.status) {
    statusCode = error.response.status.toString()
  } else if (errorMsg.includes('API 响应错误')) {
    const match = errorMsg.match(/API 响应错误 (\d+):/)
    if (match && match[1]) {
      statusCode = match[1]
    }
  }

  if (statusCode) {
    apiError.value = {
      show: true,
      code: statusCode,
      message: errorMsg,
      details: apiErrorCodes[statusCode] || null
    }
  } else {
    apiError.value = {
      show: true,
      code: 'NETWORK_ERROR',
      message: errorMsg,
      details: {
        title: '通信异常',
        reason: '无法连接到 API 服务或响应超时',
        solution: '请检查控制台网络设置与 API Key 有效性'
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
  const models = [
    'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
    'Qwen/Qwen2.5-7B-Instruct',
    'THUDM/glm-4-9b-chat',
    'Qwen/Qwen2.5-Coder-7B-Instruct'
  ]
  const currentIndex = models.indexOf(modelName.value)
  const nextIndex = (currentIndex + 1) % models.length

  reasoningContent.value = ''
  currentDialogStream.value = ''
  setModel(models[nextIndex])

  if (!models[nextIndex].includes('R1') && activeTab.value === 'reasoning') {
    activeTab.value = 'dialog'
  }
  showModelInfo.value = false
}

// 设置调试信息
const setDebugInfo = (scene: any) => {
  debugInfo.value = {
    lastChoice: {
      text: lastChoiceAnalysis.value.text,
      impactType: lastChoiceAnalysis.value.impactType
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
  apiStore.setApiUrl(apiUrl.value)
  apiStore.setApiKey(apiKey.value)
  apiStore.setModelName(modelName.value)
  setupStreamListeners()
})
</script>

<template>
  <div class="min-h-screen bg-white text-zinc-800 font-sans selection:bg-blue-600 selection:text-white">

    <!-- 开始界面 -->
    <GameIntro
      v-if="showIntro"
      @start-game="startGame"
    />

    <!-- 游戏主推演界面 -->
    <div v-else class="relative z-10 min-h-screen pb-16">
      <div class="max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        
        <!-- 主交互画卷容器 -->
        <div class="rounded-xs overflow-hidden bg-white border border-zinc-200 shadow-xs transition-all duration-200">
          
          <!-- 状态栏 -->
          <GameStatusBar
            :player-name="playerName"
            :scene-id="currentScene?.id"
            :model-name="modelName"
            :is-generating="isGenerating"
            @update:model-name="setModel"
            @toggle-model-info="showModelInfo = !showModelInfo"
            @retry-current-scene="retryCurrentScene"
            @back-to-homepage="backToHomepage"
            @show-help="showGameGuide = !showGameGuide"
          />

          <!-- 内容主体区 -->
          <div class="p-4 sm:p-6 space-y-4 sm:space-y-5">
            
            <!-- 场景与对话/思维链内容 -->
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

            <!-- 动态四维属性遥测仪表 -->
            <GameProgress :game-progress="gameProgress" />

            <!-- 行动抉择分支 -->
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
    </div>

    <!-- 游戏结束与成就结算弹窗 -->
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
@keyframes progressBar {
  0% { width: 0%; }
  50% { width: 60%; }
  80% { width: 85%; }
  100% { width: 98%; }
}

.animate-progressBar {
  animation: progressBar 6s cubic-bezier(0.1, 0.5, 0.2, 1) infinite;
}
</style>

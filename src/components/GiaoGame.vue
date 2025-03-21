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
const apiUrl = ref('')
const apiKey = ref('')
const modelName = ref('deepseek-r1')
const selectedMode = ref('story')
const userInput = ref('')
const loading = ref(false)
const showModelInfo = ref(false)
const reasoningContent = ref('')
const isThinking = ref(false)
const currentDialogStream = ref('')
const isStreamResponseActive = ref(false)

// 游戏进度状态
const gameProgress = ref({
  gaming: 25,
  study: 10,
  social: 5
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
    if (option.impact) {
      processImpact(option.impact)
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
  }
}

// 更新进度数据
const updateProgressData = () => {
  // 可以从游戏状态获取真实数据
  gameProgress.value = {
    gaming: gameStore.storyProgress?.mainQuests?.gaming || 25,
    study: gameStore.storyProgress?.mainQuests?.study || 10,
    social: gameStore.storyProgress?.mainQuests?.social || 5
  }
}

// 重置游戏
const resetGame = () => {
  if (confirm('确定要重置游戏进度吗？')) {
    currentDialogStream.value = ''
    gameStore.resetGame()

    // 重置进度
    gameProgress.value = {
      gaming: 25,
      study: 10,
      social: 5
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
  const models = ['deepseek-r1', 'deepseek-chat', 'QwQ-32B']
  const currentIndex = models.indexOf(modelName.value)
  const nextIndex = (currentIndex + 1) % models.length
  setModel(models[nextIndex])
  showModelInfo.value = false
}

// 切换选项卡
const switchTab = (tab: string) => {
  activeTab.value = tab
}

// 处理API错误
const handleApiError = (error: any) => {
  // 检查是否是API错误
  if (error?.response?.status) {
    const statusCode = error.response.status.toString()
    apiError.value = {
      show: true,
      code: statusCode,
      message: error.message || '未知错误',
      details: apiErrorCodes[statusCode] || null
    }
    // 切换到错误选项卡
    activeTab.value = 'error'
  } else {
    apiError.value = {
      show: true,
      code: 'UNKNOWN',
      message: error.message || '未知错误',
      details: null
    }
    // 切换到错误选项卡
    activeTab.value = 'error'
  }
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
  } else {
    // 默认值
    apiUrl.value = 'http://106.14.176.242:9998/v1/chat/completions'
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
</script>

<template>
  <div class="min-h-screen bg-slate-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(94,114,228,0.05),rgba(255,255,255,0))]">
    <!-- 开始界面 -->
    <div v-if="!currentScene" class="max-w-5xl mx-auto px-6 py-12">
      <div class="relative rounded-3xl overflow-hidden bg-white p-12 text-center min-h-[600px] shadow-lg shadow-indigo-100/50 border border-slate-100">
        <!-- 装饰背景 -->
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(94,114,228,0.05),rgba(255,255,255,0))]"></div>
        <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-100 to-transparent"></div>

        <!-- 标题区域 -->
        <div class="relative z-10 mb-16">
          <div class="inline-block">
            <div class="relative">
              <h1 class="text-5xl sm:text-6xl font-bold text-slate-800 pb-2 tracking-tight">
                最强剑魔是高三生
              </h1>
              <div class="absolute -bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-200 to-transparent"></div>
            </div>
            <p class="mt-6 text-lg text-slate-500">一段关于剑道、学业与青春的传奇</p>
          </div>
        </div>

        <!-- API设置区域 -->
        <div class="relative z-10 w-full max-w-md mx-auto mb-8">
          <div class="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 class="text-lg font-medium text-slate-700 mb-4">API 设置</h3>

            <div class="space-y-4">
              <div>
                <label class="block text-sm text-slate-600 mb-1">API 地址</label>
                <input
                  v-model="apiUrl"
                  type="text"
                  placeholder="请输入API地址"
                  class="w-full px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 text-sm focus:outline-none focus:border-indigo-200 focus:ring-2 focus:ring-indigo-100"
                >
              </div>
              <div>
                <label class="block text-sm text-slate-600 mb-1">API key</label>
                <input
                  v-model="apiKey"
                  type="password"
                  placeholder="没有可以去deepseek官网注册"
                  class="w-full px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 text-sm focus:outline-none focus:border-indigo-200 focus:ring-2 focus:ring-indigo-100"
                >
              </div>
              <div>
                <label class="block text-sm text-slate-600 mb-1">模型选择</label>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="model in ['deepseek-r1', 'deepseek-chat', 'QwQ-32B']"
                    :key="model"
                    @click="setModel(model)"
                    class="px-3 py-1 text-sm rounded-md transition-colors duration-200"
                    :class="modelName === model
                      ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'"
                  >
                    {{ model }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 输入区域 -->
        <div class="relative z-10 w-full max-w-md mx-auto">
          <div class="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-100 shadow-sm">
            <div class="mb-8">
              <div class="relative group">
                <input
                  v-model="playerName"
                  type="text"
                  placeholder="输入你的名字，剑客"
                  class="w-full px-14 py-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-200 focus:ring-2 focus:ring-indigo-100 transition-all duration-300"
                  @keyup.enter="startGame"
                >
                <span class="absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-slate-400 group-focus-within:text-indigo-400 transition-colors duration-300">⚔️</span>
              </div>
            </div>

            <button
              @click="startGame"
              :disabled="!playerName"
              class="relative w-full group"
            >
              <div class="relative bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl px-6 py-4 text-white font-medium transform group-hover:-translate-y-1 group-active:translate-y-0 transition-all duration-300 shadow-md shadow-indigo-100">
                <span class="flex items-center justify-center gap-3">
                  <span class="text-lg">开启传奇</span>
                  <span class="text-xl">🗡️</span>
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 游戏主界面 -->
    <div v-else class="max-w-5xl mx-auto px-6 py-12">
      <div class="rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-lg shadow-indigo-100/50">
        <!-- 状态栏 -->
        <div class="bg-slate-50 border-b border-slate-100 p-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 p-[1px]">
                <div class="w-full h-full rounded-[10px] bg-white flex items-center justify-center">
                  <span class="text-2xl">⚔️</span>
                </div>
              </div>
              <div>
                <div class="text-lg font-bold text-slate-800">{{ playerName }}</div>
                <div class="text-sm text-slate-500">见习剑客</div>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                第 {{ currentScene.id }} 章
              </div>
              <button @click="toggleModelIndicator" class="px-4 py-2 rounded-xl border transition-colors duration-200" :class="[modelName === 'deepseek-r1' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200']">
                {{ modelName }}
              </button>
              <button
                @click="resetGame"
                class="group px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all duration-300"
              >
                <span class="flex items-center gap-2">
                  <span class="text-lg group-hover:rotate-180 transition-transform duration-500">🔄</span>
                  <span class="hidden sm:inline">重新开始</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        <!-- 场景内容 -->
        <div class="p-8 space-y-6 bg-white">
          <!-- 对话与思维过程选项卡 -->
          <div class="mb-6 border border-slate-100 rounded-2xl overflow-hidden bg-white">
            <!-- 选项卡导航 -->
            <div class="flex border-b border-slate-100">
              <button
                @click="switchTab('dialog')"
                class="flex-1 py-3 text-sm font-medium transition-colors duration-200 relative"
                :class="activeTab === 'dialog'
                  ? 'text-indigo-600 bg-indigo-50/50'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'"
              >
                <span class="flex items-center justify-center gap-2">
                  <span class="text-lg">💭</span>
                  <span>对话内容</span>
                </span>
                <span v-if="activeTab === 'dialog'" class="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500"></span>
              </button>

              <button
                v-if="modelName !== 'deepseek-chat'"
                @click="switchTab('reasoning')"
                class="flex-1 py-3 text-sm font-medium transition-colors duration-200 relative"
                :class="activeTab === 'reasoning'
                  ? 'text-purple-600 bg-purple-50/50'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'"
              >
                <span class="flex items-center justify-center gap-2">
                  <span class="text-lg">🤔</span>
                  <span>思维过程</span>
                  <span v-if="isThinking && !reasoningContent" class="inline-flex items-center px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
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

              <button
                v-if="apiError.show"
                @click="switchTab('error')"
                class="flex-1 py-3 text-sm font-medium transition-colors duration-200 relative"
                :class="activeTab === 'error'
                  ? 'text-red-600 bg-red-50/50'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'"
              >
                <span class="flex items-center justify-center gap-2">
                  <span class="text-lg">⚠️</span>
                  <span>错误信息</span>
                </span>
                <span v-if="activeTab === 'error'" class="absolute bottom-0 left-0 w-full h-0.5 bg-red-500"></span>
              </button>
            </div>

            <!-- 选项卡内容 -->
            <div class="p-6">
              <!-- 对话内容选项卡 -->
              <div v-if="activeTab === 'dialog'" class="animate-fadeIn">
                <div class="flex gap-4">
                  <div class="text-2xl shrink-0">💭</div>
                  <div v-if="isGenerating && !currentDialogStream" class="text-slate-600 italic">
                    <div class="flex items-center text-slate-500">
                      <span>AI正在生成对话</span>
                      <span class="ml-2 flex space-x-1">
                        <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0s"></span>
                        <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></span>
                        <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                      </span>
                    </div>
                  </div>
                  <p class="text-slate-600 italic">{{ currentDialogStream || (currentScene ? currentScene.dialog : '') }}</p>
                </div>
              </div>

              <!-- 思维过程选项卡 -->
              <div v-else-if="activeTab === 'reasoning'" class="animate-fadeIn">
                <div class="flex gap-4">
                  <div class="text-2xl shrink-0">🤔</div>
                  <div v-if="isGenerating && !reasoningContent" class="text-slate-600 italic">
                    <div class="flex items-center text-slate-500">
                      <span>AI正在生成思维过程</span>
                      <span class="ml-2 flex space-x-1">
                        <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0s"></span>
                        <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></span>
                        <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                      </span>
                    </div>
                  </div>
                  <p class="text-slate-700 leading-relaxed">{{ reasoningContent || (currentScene ? currentScene.reasoning : '') }}</p>
                </div>
              </div>

              <!-- 错误信息选项卡 -->
              <div v-else-if="activeTab === 'error'" class="animate-fadeIn">
                <div class="bg-red-50 rounded-lg p-4 border border-red-100">
                  <div class="flex items-start gap-3">
                    <div class="text-2xl text-red-500 shrink-0">⚠️</div>
                    <div>
                      <h3 class="font-bold text-red-700 flex items-center gap-2">
                        <span>错误 {{ apiError.code }}</span>
                        <span v-if="apiError.details">- {{ apiError.details.title }}</span>
                      </h3>

                      <p class="text-red-600 mt-1 mb-2">{{ apiError.message }}</p>

                      <div v-if="apiError.details" class="text-sm space-y-2 text-slate-700">
                        <p>
                          <span class="font-medium">原因：</span>
                          <span>{{ apiError.details.reason }}</span>
                        </p>
                        <p>
                          <span class="font-medium">解决方法：</span>
                          <span>{{ apiError.details.solution }}</span>
                        </p>
                      </div>

                      <div class="mt-4">
                        <button
                          @click="clearApiError"
                          class="px-3 py-1 text-xs rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                        >
                          关闭错误提示
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 场景描述 -->
          <div class="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-6">
            <p class="text-slate-700 text-lg leading-relaxed">{{ currentScene.description }}</p>
          </div>

          <!-- 特殊事件 -->
          <div v-if="currentScene.specialEvent" class="relative overflow-hidden bg-slate-50 rounded-2xl p-6 border border-indigo-100 mb-6">
            <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-indigo-200 to-blue-200"></div>
            <div class="flex gap-4">
              <div class="text-2xl">⚡</div>
              <div>
                <h3 class="font-bold text-slate-800 mb-2">特殊事件</h3>
                <p class="text-slate-600">{{ currentScene.specialEvent }}</p>
              </div>
            </div>
          </div>

          <!-- 游戏进度指标 -->
          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="bg-white rounded-xl border border-slate-100 p-4">
              <div class="text-sm text-slate-500 mb-1">游戏技能</div>
              <div class="w-full bg-slate-100 rounded-full h-2">
                <div class="bg-blue-500 h-2 rounded-full" :style="`width: ${gameProgress.gaming}%`"></div>
              </div>
            </div>
            <div class="bg-white rounded-xl border border-slate-100 p-4">
              <div class="text-sm text-slate-500 mb-1">学习能力</div>
              <div class="w-full bg-slate-100 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full" :style="`width: ${gameProgress.study}%`"></div>
              </div>
            </div>
            <div class="bg-white rounded-xl border border-slate-100 p-4">
              <div class="text-sm text-slate-500 mb-1">社交关系</div>
              <div class="w-full bg-slate-100 rounded-full h-2">
                <div class="bg-purple-500 h-2 rounded-full" :style="`width: ${gameProgress.social}%`"></div>
              </div>
            </div>
          </div>

          <!-- 选项列表 -->
          <div class="space-y-4" :class="{ 'opacity-50 pointer-events-none': isGenerating }">
            <div
              v-for="option in currentScene.options"
              :key="option.text"
              class="group cursor-pointer relative overflow-hidden"
              @click="!isGenerating && handleChoice(option)"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="relative bg-slate-50 rounded-2xl p-6 border border-slate-100 transform group-hover:-translate-y-1 transition-all duration-300 group-hover:shadow-md group-hover:shadow-indigo-100/50">
                <div class="text-slate-700 font-medium mb-2">{{ option.text }}</div>
                <div v-if="option.hint" class="text-slate-500 text-sm italic">{{ option.hint }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 模型信息弹窗 -->
    <div v-if="showModelInfo" class="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50" @click="showModelInfo = false">
      <div class="relative bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl" @click.stop>
        <h2 class="text-2xl font-bold text-slate-800 mb-4">AI模型信息</h2>
        <div class="space-y-4">
          <div>
            <h3 class="text-sm font-medium text-slate-500">当前模型</h3>
            <p class="text-lg font-medium text-slate-800">{{ modelName }}</p>
          </div>

          <div>
            <h3 class="text-sm font-medium text-slate-500">模型特点</h3>
            <ul class="mt-2 space-y-2">
              <li v-if="modelName === 'deepseek-r1'" class="flex items-start gap-2">
                <span class="text-purple-500 mt-0.5">✓</span>
                <span class="text-slate-700">支持思维链展示，可观察AI思考过程</span>
              </li>
              <li v-if="modelName === 'deepseek-r1'" class="flex items-start gap-2">
                <span class="text-purple-500 mt-0.5">✓</span>
                <span class="text-slate-700">更强的推理和剧情架构能力</span>
              </li>
              <li v-if="modelName === 'deepseek-chat'" class="flex items-start gap-2">
                <span class="text-blue-500 mt-0.5">✓</span>
                <span class="text-slate-700">更流畅的对话体验</span>
              </li>
              <li v-if="modelName === 'QwQ-32B'" class="flex items-start gap-2">
                <span class="text-blue-500 mt-0.5">✓</span>
                <span class="text-slate-700">更大模型参数，知识面更广</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-500 mt-0.5">✓</span>
                <span class="text-slate-700">实时流式生成，响应更快</span>
              </li>
            </ul>
          </div>

          <div class="pt-4">
            <button @click="changeModel" class="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl font-medium">
              切换模型
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="isGenerating && !isStreamResponseActive" class="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="relative">
        <div class="relative bg-white rounded-2xl p-8 border border-slate-100 shadow-lg shadow-indigo-100/50">
          <div class="w-16 h-16 mx-auto mb-4">
            <svg class="animate-spin w-full h-full text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p class="text-slate-800 text-lg font-medium text-center">正在书写剧情...</p>
        </div>
      </div>
    </div>

    <!-- 错误提示 -->
    <div v-if="aiErrorMessage" class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div class="relative">
        <div class="relative bg-white px-6 py-4 rounded-xl border border-red-100 text-red-500 flex items-center gap-3 shadow-lg shadow-red-100/50">
          <span class="text-xl">❌</span>
          <span class="font-medium">{{ aiErrorMessage }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  color-scheme: light;
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(99, 102, 241, 0.3) rgba(241, 245, 249, 0.1);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(241, 245, 249, 0.1);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(99, 102, 241, 0.3);
  border-radius: 3px;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}
</style>




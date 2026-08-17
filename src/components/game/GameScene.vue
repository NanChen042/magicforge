<template>
  <div class="space-y-3 font-sans text-zinc-800">
    
    <!-- 异常告警横幅 (若有 API 错误时显示) -->
    <transition name="fade">
      <ApiErrorBanner
        v-if="apiError.show"
        :code="apiError.code"
        :message="apiError.message"
        :details="apiError.details"
        :show-close="true"
        :show-retry="true"
        @close="emit('clearApiError')"
        @retry="emit('retryCurrentScene')"
      />
    </transition>

    <!-- 深度思考折叠展台 (置于顶层优先展示思考过程，纯白极简无脏灰底色) -->
    <div 
      v-if="hasEffectiveReasoning || isThinking" 
      class="bg-white rounded-xs border border-zinc-200 shadow-2xs overflow-hidden transition-all"
    >
      <!-- 折叠卡片标头 -->
      <button
        type="button"
        @click="isReasoningExpanded = !isReasoningExpanded"
        class="w-full px-4 py-2.5 bg-white hover:bg-zinc-50 flex items-center justify-between transition-colors cursor-pointer text-left border-b border-zinc-100/80"
      >
        <div class="flex items-center gap-2.5">
          <span class="w-2 h-2 rounded-full shadow-sm" :class="isThinking ? 'bg-blue-600 animate-pulse' : 'bg-blue-500'"></span>
          <span class="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span>{{ isThinking ? 'DeepSeek 正在推演逻辑...' : '推演完成' }}</span>
          </span>
          <span v-if="reasoningWordCount > 0" class="text-xs text-zinc-500 font-medium tabular-nums px-1.5 py-0.5 rounded-xs border border-zinc-200/80 bg-zinc-50/50">
            {{ reasoningWordCount }} 字
          </span>
        </div>

        <div class="flex items-center gap-1 text-xs text-blue-600 font-medium">
          <span>{{ isReasoningExpanded ? '收起' : '展开查看' }}</span>
          <svg 
            class="w-3.5 h-3.5 transition-transform duration-200"
            :class="{ 'rotate-180': isReasoningExpanded }"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <!-- 折叠展开的思考内容区域 (柔和典雅纯白) -->
      <div 
        v-show="isReasoningExpanded" 
        ref="reasoningBoxRef"
        class="p-4 sm:p-5 bg-white text-xs sm:text-sm text-zinc-600 leading-relaxed max-h-[300px] overflow-y-auto custom-scrollbar whitespace-pre-wrap font-sans antialiased"
      >
        <div v-if="displayReasoning">
          {{ displayReasoning }}
        </div>
        <div v-else-if="isThinking" class="flex items-center gap-2 text-zinc-400 py-2">
          <div class="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span>引擎正在深层解析因果链条，请稍候...</span>
        </div>
      </div>
    </div>

    <!-- 核心剧情叙事卡片 (Scene Context Narrative) -->
    <div class="bg-white rounded-xs p-4 sm:p-5 border border-zinc-200 shadow-2xs space-y-4">
      
      <!-- 场景标题与幕数指示 -->
      <div class="flex items-center justify-between border-b border-zinc-100 pb-3">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-xs bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center shadow-2xs">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span class="font-bold text-sm text-zinc-900 tracking-tight antialiased">
            当前场景实况
          </span>
        </div>

        <div class="flex items-center gap-2">
          <span v-if="isGenerating && !isThinking" class="text-xs text-blue-600 flex items-center gap-1.5 font-medium animate-pulse">
            <span class="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>生成正文中...</span>
          </span>
          <span class="text-xs text-zinc-600 bg-zinc-50 px-2 py-0.5 rounded-xs border border-zinc-200 font-bold tabular-nums">
            第 {{ currentScene?.id || 1 }} 幕
          </span>
        </div>
      </div>

      <!-- 场景情景描述正文 -->
      <div class="text-zinc-800 leading-relaxed text-sm font-normal text-justify antialiased min-h-[60px]">
        <div v-if="isGenerating && streamingDescription" class="animate-in fade-in duration-200">
          {{ streamingDescription }}
          <span class="inline-block w-1.5 h-3 bg-blue-500 animate-pulse ml-1 align-baseline"></span>
        </div>
        <div v-else-if="isGenerating && !streamingDescription" class="flex items-center gap-2 text-blue-600 text-xs py-4 bg-blue-50/50 rounded-xs px-3 border border-blue-100/50 animate-pulse">
          <div class="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span class="font-bold">引擎正在渲染下一幕的剧情与环境细节，请稍候...</span>
        </div>
        <div v-else-if="currentScene?.description" class="animate-in fade-in duration-200">
          {{ currentScene.description }}
        </div>
        <div v-else class="text-zinc-400 italic text-xs py-2">
          等待剧情展开...
        </div>
      </div>

      <!-- 主角心声 / 现场对白 (干净无瑕的样式) -->
      <div class="bg-white border-l-4 border-blue-600 rounded-r-xs p-3.5 sm:p-4 space-y-2 border-y border-r border-zinc-100 shadow-2xs">
        <div class="flex items-center gap-1.5 text-xs font-bold text-blue-900">
          <svg class="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span>主角心声 · 现场对白</span>
        </div>

        <div v-if="isGenerating && streamingDialog" class="text-zinc-800 text-sm leading-relaxed whitespace-pre-line font-medium animate-in fade-in antialiased">
          {{ streamingDialog }}
          <span class="inline-block w-1.5 h-3 bg-blue-500 animate-pulse ml-1 align-baseline"></span>
        </div>
        <div v-else-if="isGenerating && !streamingDialog && !isThinking" class="flex items-center gap-1.5 text-xs text-blue-500 py-2">
          <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
          <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-100"></div>
          <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-200"></div>
          <span class="font-medium ml-1">AI 正在组织角色对白...</span>
        </div>
        <div v-else-if="isGenerating && isThinking" class="text-xs text-zinc-400 py-1">
          等待思考完成...
        </div>
        <div v-else-if="currentScene?.dialog" class="text-zinc-800 text-sm leading-relaxed whitespace-pre-line font-medium animate-in fade-in antialiased">
          {{ currentScene.dialog }}
        </div>
        <div v-else class="text-zinc-400 italic text-xs">
          暂无对白记录
        </div>
      </div>

    </div>

    <!-- 关键特殊事件横幅 -->
    <transition name="fade">
      <div v-if="currentScene?.specialEvent" class="bg-gradient-to-r from-amber-50 to-orange-50/40 rounded-xs p-3.5 border border-amber-200/90 shadow-2xs">
        <div class="flex items-center gap-3">
          <div class="w-7 h-7 rounded-xs bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 class="text-amber-900 font-bold text-xs tracking-wide flex items-center gap-1.5">
              <span>触发世界线特殊事件</span>
            </h3>
            <p class="text-amber-800 text-xs font-normal mt-0.5 leading-relaxed">{{ currentScene.specialEvent }}</p>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import type { GameScene } from '../../stores/game'
import ApiErrorBanner from '../common/ApiErrorBanner.vue'

const props = defineProps<{
  currentScene: GameScene | undefined
  isGenerating: boolean
  aiErrorMessage: string
  activeTab?: string
  modelName?: string
  isThinking?: boolean
  reasoningContent?: string
  currentDialogStream?: string
  apiError: {
    show: boolean
    code: string
    message: string
    details: { title: string; reason: string; solution: string } | null
  }
}>()

const emit = defineEmits<{
  switchTab: [tab: string]
  clearApiError: []
  retryCurrentScene: []
}>()

const isReasoningExpanded = ref(false)
const reasoningBoxRef = ref<HTMLElement | null>(null)

const displayReasoning = computed(() => {
  return (props.reasoningContent || props.currentScene?.reasoning || '').trim()
})

const hasEffectiveReasoning = computed(() => {
  return displayReasoning.value.length > 0
})

const reasoningWordCount = computed(() => {
  return displayReasoning.value.length
})

const extractJsonValue = (jsonString: string, key: string) => {
  if (!jsonString) return ''
  const keyMatch = jsonString.match(new RegExp(`"${key}"\\s*:\\s*"`))
  if (!keyMatch || keyMatch.index === undefined) return ''

  const valueStart = keyMatch.index + keyMatch[0].length
  let valueEnd = jsonString.length
  let escaped = false

  // The field is intentionally allowed to be incomplete while the SSE response is arriving.
  for (let index = valueStart; index < jsonString.length; index += 1) {
    const character = jsonString[index]
    if (escaped) {
      escaped = false
      continue
    }
    if (character === '\\') {
      escaped = true
    } else if (character === '"') {
      valueEnd = index
      break
    }
  }

  const rawValue = jsonString.slice(valueStart, valueEnd)
  try {
    // JSON.parse correctly handles escaped quotes, newlines, and unicode in complete values.
    return JSON.parse(`"${rawValue}"`)
  } catch {
    // A partial escape sequence is valid during streaming; keep the visible text useful.
    return rawValue
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
  }
}

const streamingDescription = computed(() => {
  if (!props.isGenerating || !props.currentDialogStream) return ''
  return extractJsonValue(props.currentDialogStream, 'description')
})

const streamingDialog = computed(() => {
  if (!props.isGenerating || !props.currentDialogStream) return ''
  return extractJsonValue(props.currentDialogStream, 'dialog')
})

// 当开始思考时自动展开，思考结束自动保持整洁
watch(() => props.isThinking, (thinking) => {
  if (thinking) {
    isReasoningExpanded.value = true
  }
})

// 思考流式输出时自动向下滚动
watch(() => props.reasoningContent, () => {
  if (isReasoningExpanded.value && reasoningBoxRef.value) {
    nextTick(() => {
      if (reasoningBoxRef.value) {
        reasoningBoxRef.value.scrollTop = reasoningBoxRef.value.scrollHeight
      }
    })
  }
})
</script>

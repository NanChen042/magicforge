<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  show: boolean
  playerName: string
  sceneId: number | undefined
  modelName: string
  gameProgress: {
    gaming: number
    study: number
    social: number
    other: number
  }
  lastChoiceAnalysis: {
    text: string
    matchedKeywords: {
      gaming: string[]
      study: string[]
      social: string[]
      other: string[]
    }
    impactType: string
  }
  showDebugInfo: boolean
  debugInfo: any
}>()

const emit = defineEmits<{
  close: []
  'update:showDebugInfo': [value: boolean]
}>()

const lastChoiceImpactText = computed(() => {
  switch (props.lastChoiceAnalysis.impactType) {
    case 'gaming': return '游戏战绩'
    case 'study': return '高考复习'
    case 'social': return '人际社交'
    case 'other': return '状态机缘'
    default: return ''
  }
})
</script>

<template>
  <!-- 浮动入口按钮 -->
  <div class="fixed bottom-6 right-6 z-30">
    <button
      @click="emit('close')"
      class="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 active:scale-95 transition-all cursor-pointer"
      title="查看故事图鉴与手册"
    >
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    </button>
  </div>

  <!-- 侧边滑出面板 -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-full"
    >
      <div
        v-if="show"
        class="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white border-l border-zinc-200 shadow-2xl flex flex-col font-sans"
      >
        <!-- 头部 -->
        <div class="bg-zinc-50 px-5 py-4 border-b border-zinc-200 flex justify-between items-center">
          <div class="flex items-center gap-2">
             <div class="w-7 h-7 rounded-sm bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
             </div>
             <h3 class="text-zinc-900 font-bold text-sm tracking-tight">故事图鉴与手册</h3>
          </div>
          <button @click="emit('close')" class="text-zinc-400 hover:text-zinc-700 transition-colors p-1 rounded-sm hover:bg-zinc-100 cursor-pointer">
             <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- 内容区 -->
        <div class="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
          
          <!-- A. 玩家档案 -->
          <div>
             <h4 class="text-xs font-bold text-zinc-500 uppercase tracking-wide mb-2.5">
                当前状态档案
             </h4>
             <div class="bg-zinc-50 rounded-sm border border-zinc-200 p-3.5 space-y-2 text-xs">
                <div class="flex justify-between items-center">
                   <span class="text-zinc-500">主角姓名</span>
                   <span class="text-zinc-900 font-bold font-mono">{{ playerName }}</span>
                </div>
                <div class="flex justify-between items-center">
                   <span class="text-zinc-500">故事进度</span>
                   <span class="text-blue-600 font-bold font-mono">第 {{ sceneId || 1 }} 幕</span>
                </div>
                <div class="flex justify-between items-center">
                   <span class="text-zinc-500">AI 推理模型</span>
                   <span class="text-zinc-700 font-mono text-[11px] bg-zinc-200/60 px-1.5 py-0.5 rounded-sm">{{ modelName }}</span>
                </div>
             </div>
          </div>

          <!-- B. 能力数值 -->
          <div>
             <h4 class="text-xs font-bold text-zinc-500 uppercase tracking-wide mb-2.5">
                实时状态面板
             </h4>
             <div class="space-y-2.5">
                <div class="space-y-1">
                   <div class="flex justify-between text-xs">
                      <span class="text-zinc-600 font-medium">游戏战绩</span>
                      <span class="text-blue-600 font-mono font-bold">{{ Math.round(gameProgress.gaming) }}%</span>
                   </div>
                   <div class="h-1.5 w-full bg-zinc-100 rounded-sm overflow-hidden border border-zinc-200/50">
                      <div class="h-full bg-blue-600 transition-all duration-300" :style="`width: ${gameProgress.gaming}%`"></div>
                   </div>
                </div>

                <div class="space-y-1">
                   <div class="flex justify-between text-xs">
                      <span class="text-zinc-600 font-medium">高考复习</span>
                      <span class="text-emerald-600 font-mono font-bold">{{ Math.round(gameProgress.study) }}%</span>
                   </div>
                   <div class="h-1.5 w-full bg-zinc-100 rounded-sm overflow-hidden border border-zinc-200/50">
                      <div class="h-full bg-emerald-600 transition-all duration-300" :style="`width: ${gameProgress.study}%`"></div>
                   </div>
                </div>

                <div class="space-y-1">
                   <div class="flex justify-between text-xs">
                      <span class="text-zinc-600 font-medium">人际社交</span>
                      <span class="text-indigo-600 font-mono font-bold">{{ Math.round(gameProgress.social) }}%</span>
                   </div>
                   <div class="h-1.5 w-full bg-zinc-100 rounded-sm overflow-hidden border border-zinc-200/50">
                      <div class="h-full bg-indigo-600 transition-all duration-300" :style="`width: ${gameProgress.social}%`"></div>
                   </div>
                </div>

                <div class="space-y-1">
                   <div class="flex justify-between text-xs">
                      <span class="text-zinc-600 font-medium">状态机缘</span>
                      <span class="text-amber-600 font-mono font-bold">{{ Math.round(gameProgress.other) }}%</span>
                   </div>
                   <div class="h-1.5 w-full bg-zinc-100 rounded-sm overflow-hidden border border-zinc-200/50">
                      <div class="h-full bg-amber-500 transition-all duration-300" :style="`width: ${gameProgress.other}%`"></div>
                   </div>
                </div>
             </div>
          </div>

          <!-- C. 上次选择推演 -->
          <div v-if="lastChoiceAnalysis.text">
             <h4 class="text-xs font-bold text-zinc-500 uppercase tracking-wide mb-2.5">
                抉择推演分析
             </h4>
             <div class="bg-zinc-50 rounded-sm border border-zinc-200 p-3.5 text-xs space-y-2.5">
                <div class="border-l-2 border-blue-600 pl-2.5 italic text-zinc-600">
                   "{{ lastChoiceAnalysis.text }}"
                </div>
                
                <div class="pt-2 border-t border-zinc-200/60 text-zinc-700 flex justify-between items-center">
                   <span>关联导向：</span>
                   <span class="font-bold text-blue-600">
                      {{ lastChoiceImpactText }} ↑
                   </span>
                </div>
             </div>
          </div>

          <!-- D. 调试接口 -->
          <div class="pt-4 border-t border-zinc-200">
             <label class="flex items-center justify-between cursor-pointer">
                <span class="text-xs text-zinc-500 font-medium">显示运行调试日志</span>
                <input
                   type="checkbox"
                   :checked="showDebugInfo"
                   @change="emit('update:showDebugInfo', ($event.target as HTMLInputElement).checked)"
                   class="rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                >
             </label>

             <div v-if="showDebugInfo" class="mt-3 bg-zinc-900 rounded-sm p-3 font-mono text-[10px] text-zinc-300 overflow-x-auto max-h-40 custom-scrollbar">
                <pre>{{ JSON.stringify(debugInfo, null, 2) }}</pre>
             </div>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e4e4e7;
  border-radius: 4px;
}
</style>

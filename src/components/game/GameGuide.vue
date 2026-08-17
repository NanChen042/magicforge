<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '../../stores/game'

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
    impactType: string
  }
  showDebugInfo: boolean
  debugInfo: any
}>()

const emit = defineEmits<{
  close: []
  'update:showDebugInfo': [value: boolean]
}>()

const gameStore = useGameStore()

const attrConfig = computed(() => {
  return gameStore.activeScript?.attributeNames || {
    gaming: { label: '行动执行', icon: '⚔️', color: 'blue' },
    study: { label: '真相解析', icon: '🔍', color: 'cyan' },
    social: { label: '关系影响', icon: '🎭', color: 'amber' },
    other: { label: '神秘感知', icon: '🌌', color: 'purple' }
  }
})

const lastChoiceImpactText = computed(() => {
  const type = props.lastChoiceAnalysis.impactType as keyof typeof attrConfig.value
  return attrConfig.value[type]?.label || '因果律动'
})
</script>

<template>
  <!-- 浮动入口按钮 -->
  <div class="fixed bottom-6 right-6 z-30">
    <button
      @click="emit('close')"
      class="w-10 h-10 rounded-xs bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer border border-blue-500/50"
      title="查看世界线图鉴与推演档案"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    </button>
  </div>

  <!-- 侧边滑出抽屉面板 -->
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
        <div class="bg-zinc-50 px-5 py-3.5 border-b border-zinc-200 flex justify-between items-center">
          <div class="flex items-center gap-2">
             <div class="w-7 h-7 rounded-xs bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shadow-2xs">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
             </div>
             <div>
               <h3 class="text-zinc-900 font-bold text-sm tracking-tight">世界线档案与图鉴</h3>
               <p class="text-[11px] text-zinc-400 font-mono">{{ gameStore.activeScript?.title?.split('·')[0] }}</p>
             </div>
          </div>
          <button @click="emit('close')" class="text-zinc-400 hover:text-zinc-700 transition-colors p-1 rounded-xs hover:bg-zinc-100 cursor-pointer">
             <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- 内容区 -->
        <div class="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-5">
          
          <!-- A. 玩家主角档案 -->
          <div>
             <h4 class="text-xs font-bold text-zinc-700 uppercase tracking-wide mb-2 font-mono">
                当前身份档案
             </h4>
             <div class="bg-zinc-50 rounded-xs border border-zinc-200/80 p-3.5 space-y-2 text-xs font-mono">
                <div class="flex justify-between items-center">
                   <span class="text-zinc-500">主角代号</span>
                   <span class="text-zinc-900 font-bold">{{ playerName }}</span>
                </div>
                <div class="flex justify-between items-center">
                   <span class="text-zinc-500">世界线模组</span>
                   <span class="text-blue-700 font-bold font-sans">{{ gameStore.activeScript?.badge }} · {{ gameStore.activeScript?.genre }}</span>
                </div>
                <div class="flex justify-between items-center">
                   <span class="text-zinc-500">推演幕数</span>
                   <span class="text-blue-600 font-bold">第 {{ sceneId || 1 }} / 10 幕</span>
                </div>
                <div class="flex justify-between items-center">
                   <span class="text-zinc-500">AI 推理引擎</span>
                   <span class="text-zinc-700 text-[11px] bg-zinc-200/70 px-1.5 py-0.5 rounded-xs">{{ modelName.split('/').pop() }}</span>
                </div>
             </div>
          </div>

          <!-- B. 四维能力数值面板 -->
          <div>
             <h4 class="text-xs font-bold text-zinc-700 uppercase tracking-wide mb-2 font-mono">
                实时因果属性矩阵
             </h4>
             <div class="space-y-2.5">
                <div class="space-y-1">
                   <div class="flex justify-between text-xs font-medium">
                      <span class="text-zinc-700 flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-blue-600 rounded-full shadow-2xs"></span>
                        <span>{{ attrConfig.gaming?.label || '行动执行' }}</span>
                      </span>
                      <span class="text-blue-600 font-mono font-bold">{{ Math.round(gameProgress.gaming || 0) }}%</span>
                   </div>
                   <div class="h-1.5 w-full bg-zinc-100 rounded-xs overflow-hidden border border-zinc-200/60">
                      <div class="h-full bg-blue-600 transition-all duration-300 rounded-xs" :style="`width: ${Math.min(gameProgress.gaming || 0, 100)}%`"></div>
                   </div>
                </div>

                <div class="space-y-1">
                   <div class="flex justify-between text-xs font-medium">
                      <span class="text-zinc-700 flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-cyan-600 rounded-full shadow-2xs"></span>
                        <span>{{ attrConfig.study?.label || '真相解析' }}</span>
                      </span>
                      <span class="text-cyan-600 font-mono font-bold">{{ Math.round(gameProgress.study || 0) }}%</span>
                   </div>
                   <div class="h-1.5 w-full bg-zinc-100 rounded-xs overflow-hidden border border-zinc-200/60">
                      <div class="h-full bg-cyan-600 transition-all duration-300 rounded-xs" :style="`width: ${Math.min(gameProgress.study || 0, 100)}%`"></div>
                   </div>
                </div>

                <div class="space-y-1">
                   <div class="flex justify-between text-xs font-medium">
                      <span class="text-zinc-700 flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-amber-500 rounded-full shadow-2xs"></span>
                        <span>{{ attrConfig.social?.label || '关系影响' }}</span>
                      </span>
                      <span class="text-amber-600 font-mono font-bold">{{ Math.round(gameProgress.social || 0) }}%</span>
                   </div>
                   <div class="h-1.5 w-full bg-zinc-100 rounded-xs overflow-hidden border border-zinc-200/60">
                      <div class="h-full bg-amber-500 transition-all duration-300 rounded-xs" :style="`width: ${Math.min(gameProgress.social || 0, 100)}%`"></div>
                   </div>
                </div>

                <div class="space-y-1">
                   <div class="flex justify-between text-xs font-medium">
                      <span class="text-zinc-700 flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-purple-600 rounded-full shadow-2xs"></span>
                        <span>{{ attrConfig.other?.label || '神秘感知' }}</span>
                      </span>
                      <span class="text-purple-600 font-mono font-bold">{{ Math.round(gameProgress.other || 0) }}%</span>
                   </div>
                   <div class="h-1.5 w-full bg-zinc-100 rounded-xs overflow-hidden border border-zinc-200/60">
                      <div class="h-full bg-purple-600 transition-all duration-300 rounded-xs" :style="`width: ${Math.min(gameProgress.other || 0, 100)}%`"></div>
                   </div>
                </div>
             </div>
          </div>

          <!-- C. 上次选择分析 -->
          <div v-if="lastChoiceAnalysis.text">
             <h4 class="text-xs font-bold text-zinc-700 uppercase tracking-wide mb-2 font-mono">
                最新抉择因果推演
             </h4>
             <div class="bg-zinc-50 rounded-xs border border-zinc-200/80 p-3 text-xs space-y-2">
                <div class="text-zinc-700 font-medium">
                   "{{ lastChoiceAnalysis.text }}"
                </div>
                
                <div class="pt-1.5 border-t border-zinc-200/60 text-zinc-600 flex justify-between items-center">
                   <span>强化属性导向：</span>
                   <span class="font-bold text-blue-600 font-mono">
                      {{ lastChoiceImpactText }} ↑
                   </span>
                </div>
             </div>
          </div>

          <!-- D. 调试接口 -->
          <div class="pt-3 border-t border-zinc-200">
             <label class="flex items-center justify-between cursor-pointer">
                <span class="text-xs text-zinc-500 font-medium">显示运行调试日志</span>
                <el-switch
                  class="app-switch"
                  :model-value="showDebugInfo"
                  @update:model-value="emit('update:showDebugInfo', $event)"
                />
             </label>

             <div v-if="showDebugInfo" class="mt-2.5 bg-zinc-900 rounded-xs p-3 font-mono text-[10px] text-zinc-300 overflow-x-auto max-h-40 custom-scrollbar shadow-inner">
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
  background: #a1a1aa;
  border-radius: 2px;
}
</style>

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
    case 'gaming': return '武学修为'
    case 'study': return '心法悟性'
    case 'social': return '江湖名望'
    case 'other': return '天道气运'
    default: return ''
  }
})
</script>

<template>
  <!-- 1. 浮动入口按钮 (Floating Trigger) -->
  <div class="fixed bottom-6 right-6 z-40 group">
    <!-- 呼吸光晕 -->
    <div class="absolute inset-0 bg-amber-500/30 rounded-full blur-xl animate-pulse-slow group-hover:bg-amber-500/50 transition-all"></div>
    
    <button
      @click="emit('close')"
      class="relative w-14 h-14 rounded-full bg-[#1A1D24] border border-amber-500/50 flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 overflow-hidden"
    >
      <!-- 内部纹理 -->
      <div class="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(245,158,11,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-shine"></div>
      <span class="text-2xl filter drop-shadow-md">📜</span>
    </button>
  </div>

  <!-- 2. 侧边滑出面板 (Side Panel) -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-full"
    >
      <div
        v-if="show"
        class="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-[#0F1115]/95 backdrop-blur-xl border-l border-white/10 shadow-2xl flex flex-col"
      >
        <!-- 头部 (Header) -->
        <div class="relative bg-gradient-to-r from-amber-900/40 to-black px-6 py-5 border-b border-amber-500/20 flex justify-between items-center">
          <div class="flex items-center gap-3">
             <div class="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                📖
             </div>
             <h3 class="text-amber-100 font-bold tracking-wider text-lg">江湖录</h3>
          </div>
          <button @click="emit('close')" class="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
             <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- 内容区 (Scrollable Content) -->
        <div class="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
          
          <!-- A. 玩家档案 -->
          <div class="relative group">
             <div class="absolute -inset-2 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-xl blur-lg pointer-events-none"></div>
             <h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                当前状态 (Status)
             </h4>
             <div class="bg-[#1A1D24] rounded-xl border border-white/5 p-4 space-y-2 relative overflow-hidden">
                <!-- 装饰线 -->
                <div class="absolute top-0 left-0 w-1 h-full bg-indigo-500/50"></div>
                
                <div class="flex justify-between items-center text-sm">
                   <span class="text-slate-400">侠客名讳</span>
                   <span class="text-indigo-300 font-bold font-mono">{{ playerName }}</span>
                </div>
                <div class="flex justify-between items-center text-sm">
                   <span class="text-slate-400">当前章节</span>
                   <span class="text-indigo-300 font-bold font-mono">第 {{ sceneId || 0 }} 回</span>
                </div>
                <div class="flex justify-between items-center text-sm">
                   <span class="text-slate-400">剑魂模型</span>
                   <span class="text-purple-300 font-mono text-xs bg-purple-500/10 px-2 py-0.5 rounded">{{ modelName }}</span>
                </div>
             </div>
          </div>

          <!-- B. 能力雷达 -->
          <div>
             <h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                修为进境 (Stats)
             </h4>
             <div class="space-y-3">
                <!-- 进度条组件封装 -->
                <div class="space-y-1">
                   <div class="flex justify-between text-xs">
                      <span class="text-cyan-400 flex items-center gap-1.5"><span class="text-base">⚔️</span>武学修为</span>
                      <span class="text-cyan-300 font-mono">{{ Math.round(gameProgress.gaming) }}%</span>
                   </div>
                   <div class="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                      <div class="h-full bg-gradient-to-r from-cyan-900 to-cyan-400 rounded-full transition-all duration-500" :style="`width: ${gameProgress.gaming}%`"></div>
                   </div>
                </div>

                <div class="space-y-1">
                   <div class="flex justify-between text-xs">
                      <span class="text-emerald-400 flex items-center gap-1.5"><span class="text-base">📜</span>心法悟性</span>
                      <span class="text-emerald-300 font-mono">{{ Math.round(gameProgress.study) }}%</span>
                   </div>
                   <div class="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                      <div class="h-full bg-gradient-to-r from-emerald-900 to-emerald-400 rounded-full transition-all duration-500" :style="`width: ${gameProgress.study}%`"></div>
                   </div>
                </div>

                <div class="space-y-1">
                   <div class="flex justify-between text-xs">
                      <span class="text-violet-400 flex items-center gap-1.5"><span class="text-base">🍶</span>江湖名望</span>
                      <span class="text-violet-300 font-mono">{{ Math.round(gameProgress.social) }}%</span>
                   </div>
                   <div class="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                      <div class="h-full bg-gradient-to-r from-violet-900 to-violet-400 rounded-full transition-all duration-500" :style="`width: ${gameProgress.social}%`"></div>
                   </div>
                </div>

                <div class="space-y-1">
                   <div class="flex justify-between text-xs">
                      <span class="text-amber-400 flex items-center gap-1.5"><span class="text-base">🔮</span>天道气运</span>
                      <span class="text-amber-300 font-mono">{{ Math.round(gameProgress.other) }}%</span>
                   </div>
                   <div class="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                      <div class="h-full bg-gradient-to-r from-amber-900 to-amber-400 rounded-full transition-all duration-500" :style="`width: ${gameProgress.other}%`"></div>
                   </div>
                </div>
             </div>
          </div>

          <!-- C. 因果分析 -->
          <div v-if="lastChoiceAnalysis.text" class="relative">
             <h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                天机推演 (Analysis)
             </h4>
             <div class="bg-[#1A1D24] rounded-xl border border-white/5 p-4 text-xs space-y-3 relative">
                <!-- 引用 -->
                <div class="border-l-2 border-slate-600 pl-3 italic text-slate-400">
                   "{{ lastChoiceAnalysis.text }}"
                </div>
                
                <!-- 关键词标签 -->
                <div class="flex flex-wrap gap-2">
                   <span v-for="k in lastChoiceAnalysis.matchedKeywords.gaming" :key="k" class="px-2 py-0.5 rounded bg-cyan-900/30 text-cyan-400 border border-cyan-500/20">⚔️ {{ k }}</span>
                   <span v-for="k in lastChoiceAnalysis.matchedKeywords.study" :key="k" class="px-2 py-0.5 rounded bg-emerald-900/30 text-emerald-400 border border-emerald-500/20">📜 {{ k }}</span>
                   <span v-for="k in lastChoiceAnalysis.matchedKeywords.social" :key="k" class="px-2 py-0.5 rounded bg-violet-900/30 text-violet-400 border border-violet-500/20">🍶 {{ k }}</span>
                   <span v-for="k in lastChoiceAnalysis.matchedKeywords.other" :key="k" class="px-2 py-0.5 rounded bg-amber-900/30 text-amber-400 border border-amber-500/20">🔮 {{ k }}</span>
                </div>

                <!-- 结论 -->
                <div class="pt-2 border-t border-white/5 text-slate-300">
                   <span class="text-slate-500">判定结果：</span>
                   <span class="font-bold" :class="{
                      'text-cyan-400': lastChoiceAnalysis.impactType === 'gaming',
                      'text-emerald-400': lastChoiceAnalysis.impactType === 'study',
                      'text-violet-400': lastChoiceAnalysis.impactType === 'social',
                      'text-amber-400': lastChoiceAnalysis.impactType === 'other'
                   }">
                      {{ lastChoiceImpactText }} ↑
                   </span>
                </div>
             </div>
          </div>

          <!-- D. 系统设置 -->
          <div class="pt-6 border-t border-white/10">
             <label class="flex items-center justify-between cursor-pointer group">
                <span class="text-sm text-slate-400 group-hover:text-white transition-colors">显示系统日志 (Debug)</span>
                <div class="relative">
                   <input
                      type="checkbox"
                      :checked="showDebugInfo"
                      @change="emit('update:showDebugInfo', ($event.target as HTMLInputElement).checked)"
                      class="sr-only peer"
                   >
                   <div class="w-10 h-5 bg-slate-800 rounded-full peer peer-checked:bg-amber-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                </div>
             </label>

             <!-- Log Console -->
             <transition name="slide-down">
                <div v-if="showDebugInfo" class="mt-4 bg-black rounded-lg border border-slate-800 p-3 font-mono text-[10px] text-green-400/80 overflow-x-auto max-h-40 custom-scrollbar shadow-inner">
                   <div class="opacity-50 mb-2">// SYSTEM LOGS STREAM</div>
                   <pre>{{ JSON.stringify(debugInfo, null, 2) }}</pre>
                </div>
             </transition>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* 侧边栏滑入动画 */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  max-height: 200px;
  opacity: 1;
}
.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

/* 按钮扫光 */
@keyframes shine {
  100% { transform: translateX(100%); }
}
.animate-shine {
  animation: shine 3s infinite;
}

/* 慢速呼吸 */
@keyframes pulseSlow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}
.animate-pulse-slow {
  animation: pulseSlow 3s ease-in-out infinite;
}

/* 自定义滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>

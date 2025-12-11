<script setup lang="ts">
import type { GameScene } from '../../stores/game'

defineProps<{
  currentScene: GameScene | undefined
  isGenerating: boolean
}>()

const emit = defineEmits<{
  handleChoice: [option: { text: string; hint?: string; next?: number; impact?: any }]
  retryCurrentScene: []
  backToHomepage: []
}>()
</script>

<template>
  <div class="space-y-4" :class="{ 'opacity-60 pointer-events-none grayscale': isGenerating }">
    
    <!-- ==================== 1. 选项列表 (Choices) ==================== -->
    <div
      v-for="(option, index) in currentScene?.options || []"
      :key="`option-${index}-${option.text}`"
      class="group cursor-pointer relative"
      @click="!isGenerating && emit('handleChoice', option)"
    >
      <!-- 选项卡片 -->
      <div class="relative bg-white rounded-xl p-5 border border-slate-200 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-amber-300 group-hover:shadow-md overflow-hidden">
        
        <!-- Hover 时的背景装饰 (极淡的暖色) -->
        <div class="absolute inset-0 bg-gradient-to-r from-amber-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <!-- 左侧激活条 (Active Indicator) -->
        <div class="absolute left-0 top-0 bottom-0 w-1 bg-amber-400 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center"></div>

        <div class="relative flex items-center justify-between gap-4 z-10">
          <div class="flex-1">
            <!-- 头部：序号 + 文本 -->
            <div class="flex items-start gap-3">
               <!-- 序号 -->
               <span class="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 text-slate-500 text-xs font-bold border border-slate-200 group-hover:bg-amber-100 group-hover:text-amber-700 group-hover:border-amber-200 transition-colors mt-0.5">
                  {{ String.fromCharCode(65 + index) }}
               </span>
               
               <!-- 核心文本 (深灰) -->
               <span class="text-slate-700 font-bold text-base sm:text-lg leading-snug group-hover:text-amber-900 transition-colors">
                 {{ option.text }}
               </span>
            </div>
            
            <!-- 底部：提示信息 (Hint) -->
            <div v-if="option.hint" class="mt-2 ml-9 text-slate-400 text-xs flex items-center gap-1.5 group-hover:text-amber-600/80 transition-colors font-medium">
               <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
               <span>{{ option.hint }}</span>
            </div>
          </div>

          <!-- 右侧：悬停箭头 -->
          <div class="text-slate-300 group-hover:text-amber-500 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
             <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
             </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== 2. 游戏结局 (Victory Screen) ==================== -->
    <div v-if="!isGenerating && currentScene?.id === 999" class="text-center py-10 animate-fade-in-up">
      <div class="relative overflow-hidden bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
        <!-- 背景装饰 -->
        <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400"></div>
        <div class="absolute -top-10 -right-10 w-40 h-40 bg-amber-50 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-50 rounded-full blur-3xl"></div>

        <div class="relative z-10">
           <div class="text-6xl mb-4 animate-bounce-slow filter drop-shadow-sm">🏆</div>
           <h2 class="text-3xl font-bold text-slate-800 mb-2">
              传奇落幕
           </h2>
           <div class="w-16 h-1 bg-amber-200 mx-auto mb-4 rounded-full"></div>
           <p class="text-slate-500 mb-8 font-medium leading-relaxed max-w-md mx-auto">
              恭喜你完成了这段惊心动魄的剑道之旅！<br>
              你的名字将永远铭刻在江湖传说之中。
           </p>
           
           <button
             @click="emit('backToHomepage')"
             class="px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-200 hover:shadow-amber-300 transition-all transform hover:-translate-y-1"
           >
             再启征程
           </button>
        </div>
      </div>
    </div>

    <!-- ==================== 3. 错误状态 (Error State) ==================== -->
    <div
      v-else-if="!isGenerating && (!currentScene?.options || currentScene.options.length === 0)"
      class="text-center py-8 animate-pulse"
    >
      <div class="bg-red-50 border border-red-100 rounded-xl p-6 shadow-sm">
        <div class="text-4xl mb-3 text-red-400">📡</div>
        <h3 class="text-red-700 font-bold mb-2">信号中断</h3>
        <p class="text-red-500/80 text-sm mb-6">无法接收到命运的指引 (选项加载失败)</p>
        
        <button
          @click="emit('retryCurrentScene')"
          class="px-6 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm flex items-center justify-center gap-2 mx-auto font-medium shadow-sm"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          重新连接
        </button>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* 结局图标跳动 */
@keyframes bounceSlow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-bounce-slow {
  animation: bounceSlow 3s ease-in-out infinite;
}

/* 淡入上浮 */
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

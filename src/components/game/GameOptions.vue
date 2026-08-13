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
  <div class="space-y-3 pt-1" :class="{ 'opacity-60 pointer-events-none grayscale': isGenerating }">
    
    <!-- 选项卡标头提示 -->
    <div v-if="currentScene?.options && currentScene.options.length > 0" class="flex items-center justify-between px-1 mb-1">
      <span class="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
        下阶段抉择分支 (Choice Action)
      </span>
      <span class="text-[11px] text-zinc-400 font-mono">Select one option to continue</span>
    </div>

    <!-- 选项列表 -->
    <div
      v-for="(option, index) in currentScene?.options || []"
      :key="`option-${index}-${option.text}`"
      class="group cursor-pointer relative"
      @click="!isGenerating && emit('handleChoice', option)"
    >
      <div class="relative bg-white rounded-md p-4 border border-zinc-200 shadow-2xs transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-blue-500 group-hover:bg-gradient-to-r group-hover:from-blue-50/40 group-hover:to-white group-hover:shadow-xs overflow-hidden">
        <!-- 左侧蓝色激活高亮条 -->
        <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-center"></div>

        <div class="relative flex items-center justify-between gap-4 z-10 pl-1">
          <div class="flex-1">
            <div class="flex items-center gap-3">
               <!-- 序号 A, B, C... -->
               <span class="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-sm bg-zinc-100 text-zinc-700 text-xs font-mono font-bold border border-zinc-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-2xs">
                  {{ String.fromCharCode(65 + index) }}
               </span>
               
               <!-- 核心文本 -->
               <span class="text-zinc-800 font-bold text-sm leading-relaxed group-hover:text-blue-950 transition-colors">
                 {{ option.text }}
               </span>
            </div>
            
            <!-- 提示信息 -->
            <div v-if="option.hint" class="mt-1.5 ml-10 text-zinc-400 text-xs flex items-center gap-1.5 group-hover:text-blue-600 transition-colors font-medium">
               <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
               <span>{{ option.hint }}</span>
            </div>
          </div>

          <!-- 右侧：悬停箭头 -->
          <div class="text-zinc-300 group-hover:text-blue-600 transform translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200 shrink-0">
             <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
             </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 游戏结局 -->
    <div v-if="!isGenerating && currentScene?.id === 999" class="text-center py-8 animate-fade-in">
      <div class="relative overflow-hidden bg-white border border-zinc-200 rounded-md p-8 shadow-sm">
        <div class="relative z-10">
           <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
             <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
               <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
             </svg>
           </div>
           <h2 class="text-2xl font-bold text-zinc-900 mb-2">
              故事落幕
           </h2>
           <p class="text-zinc-500 text-xs mb-6 max-w-md mx-auto leading-relaxed">
              你完成了高三最后 30 天的人生探索！每个人的选择都铸就了独特的青春轨迹。
           </p>
           
           <button
             @click="emit('backToHomepage')"
             class="px-6 py-2.5 rounded-sm font-semibold text-xs bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white shadow-2xs transition-all cursor-pointer"
           >
             重新体验人生
           </button>
        </div>
      </div>
    </div>

    <!-- 错误状态 -->
    <div
      v-else-if="!isGenerating && (!currentScene?.options || currentScene.options.length === 0)"
      class="text-center py-6"
    >
      <div class="inline-flex flex-col items-center gap-2 p-4 bg-zinc-50 rounded-md border border-zinc-200 text-xs text-zinc-500">
         <span>当前未能加载后续选项分支</span>
         <button @click="emit('retryCurrentScene')" class="px-3 py-1 bg-blue-600 text-white rounded-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
            重新生成
         </button>
      </div>
    </div>

  </div>
</template>

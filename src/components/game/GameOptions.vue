<script setup lang="ts">
import { useGameStore, type GameScene } from '../../stores/game'

defineProps<{
  currentScene: GameScene | undefined
  isGenerating: boolean
}>()

const emit = defineEmits<{
  handleChoice: [option: { text: string; hint?: string; next?: number; impact?: any }]
  retryCurrentScene: []
  backToHomepage: []
}>()

const gameStore = useGameStore()
</script>

<template>
  <div class="space-y-2.5 pt-1" :class="{ 'opacity-60 pointer-events-none': isGenerating }">
    
    <!-- 选项卡标头提示 -->
    <div v-if="currentScene?.options && currentScene.options.length > 0" class="flex items-center justify-between px-1 mb-1">
      <span class="text-xs font-bold text-zinc-700 tracking-wider flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
        抉择分支
      </span>
      <span class="text-[11px] text-zinc-400 font-mono">请选择后续行动 (1-{{ currentScene.options.length }})</span>
    </div>

    <!-- 选项列表 -->
    <div
      v-for="(option, index) in currentScene?.options || []"
      :key="`option-${index}-${option.text}`"
      class="group cursor-pointer relative"
      @click="!isGenerating && emit('handleChoice', option)"
    >
      <div class="relative bg-white rounded-xs p-3.5 border border-zinc-200 shadow-2xs transition-all duration-150 group-hover:border-blue-600 group-hover:bg-blue-50/20 overflow-hidden">
        <!-- 左侧高亮色条 -->
        <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-150"></div>

        <div class="relative flex items-center justify-between gap-3 z-10 pl-1">
          <div class="flex-1">
            <div class="flex items-start sm:items-center gap-2.5">
               <!-- 序号 [1], [2], [3] -->
               <span class="shrink-0 flex items-center justify-center w-6 h-6 rounded-xs bg-zinc-100 text-zinc-700 text-xs font-mono font-bold border border-zinc-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                  {{ index + 1 }}
               </span>
               
               <!-- 核心文本 -->
               <span class="text-zinc-800 font-semibold text-sm leading-relaxed group-hover:text-blue-900 transition-colors">
                 {{ option.text }}
               </span>
            </div>
            
            <!-- 提示信息 -->
            <div v-if="option.hint" class="mt-1 ml-8.5 text-zinc-400 text-xs flex items-center gap-1.5 group-hover:text-blue-600 transition-colors font-medium">
               <span>↳</span>
               <span>{{ option.hint }}</span>
            </div>
          </div>

          <!-- 右侧：箭头 -->
          <div class="text-zinc-300 group-hover:text-blue-600 transform group-hover:translate-x-0.5 transition-all shrink-0">
             <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
             </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 游戏结局 -->
    <div v-if="!isGenerating && currentScene?.id === 999" class="text-center py-6 animate-fade-in">
      <div class="relative overflow-hidden bg-white border border-zinc-200 rounded-xs p-6 shadow-sm">
        <div class="relative z-10 space-y-4">
           <div class="w-10 h-10 mx-auto rounded-xs bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
             <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
               <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
             </svg>
           </div>

           <div>
             <h2 class="text-xl font-bold text-zinc-900 mb-1">
                故事终局 · 命运落幕
             </h2>
             <p class="text-zinc-500 text-xs max-w-md mx-auto leading-relaxed">
                你已完成剧本【{{ gameStore.activeScript?.title }}】的完整推演，每一个抉择都铸造了专属的结局！
             </p>
           </div>
           
           <button
             @click="emit('backToHomepage')"
             class="px-5 py-2.5 rounded-xs font-bold text-xs bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white shadow-xs transition-all cursor-pointer"
           >
             返回剧本选择
           </button>
        </div>
      </div>
    </div>

    <!-- 错误状态 -->
    <div
      v-else-if="!isGenerating && (!currentScene?.options || currentScene.options.length === 0)"
      class="text-center py-4"
    >
      <div class="inline-flex flex-col items-center gap-2 p-3 bg-zinc-50 rounded-xs border border-zinc-200 text-xs text-zinc-500">
         <span>当前未能加载后续选项分支</span>
         <button @click="emit('retryCurrentScene')" class="px-3 py-1 bg-blue-600 text-white rounded-xs font-medium hover:bg-blue-700 transition-colors cursor-pointer">
            重新生成
         </button>
      </div>
    </div>

  </div>
</template>

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
    <div v-if="currentScene?.options && currentScene.options.length > 0 && currentScene.id !== 999" class="flex items-center justify-between px-0.5">
      <span class="text-xs font-bold text-zinc-900 tracking-wider flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
        <span>行动抉择分支</span>
      </span>
      <span class="text-xs text-zinc-400 font-normal">做出你的行动抉择 (1-{{ currentScene.options.length }})</span>
    </div>

    <!-- 选项列表 -->
    <div
      v-for="(option, index) in (currentScene?.id !== 999 ? (currentScene?.options || []) : [])"
      :key="`option-${index}-${option.text}`"
      class="group cursor-pointer relative"
      @click="!isGenerating && emit('handleChoice', option)"
    >
      <div class="relative bg-white rounded-xs p-3.5 sm:p-4 border border-zinc-200/90 shadow-2xs transition-all duration-150 group-hover:border-blue-600 group-hover:bg-blue-50/20">
        
        <div class="relative flex items-center justify-between gap-3 z-10">
          <div class="flex-1 min-w-0">
            <div class="flex items-start sm:items-center gap-2.5">
               <!-- 序号 [1], [2], [3], [4] -->
               <span class="shrink-0 flex items-center justify-center w-6 h-6 rounded-xs bg-zinc-100 text-zinc-700 text-xs font-mono font-bold border border-zinc-200/80 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                  0{{ index + 1 }}
               </span>
               
               <!-- 核心动作文本 -->
               <span class="text-zinc-800 font-semibold text-sm leading-relaxed group-hover:text-blue-900 transition-colors">
                 {{ option.text }}
               </span>
            </div>
            
            <!-- 策略提示信息 -->
            <div v-if="option.hint" class="mt-1 ml-8.5 text-zinc-500 text-xs flex items-center gap-1.5 group-hover:text-blue-700 transition-colors font-normal">
               <span class="text-blue-600 text-xs">↳</span>
               <span>{{ option.hint }}</span>
            </div>
          </div>

          <!-- 右侧：交互箭头 -->
          <div class="text-zinc-300 group-hover:text-blue-600 transform group-hover:translate-x-0.5 transition-all shrink-0">
             <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
             </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 游戏结局展示卡片 -->
    <div v-if="!isGenerating && currentScene?.id === 999" class="text-center py-6 animate-fade-in">
      <div class="relative overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-zinc-50/50 border border-blue-200/80 rounded-xs p-6 shadow-sm space-y-4">
        
        <div class="w-12 h-12 mx-auto rounded-xs bg-blue-600 text-white flex items-center justify-center shadow-xs">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>

        <div class="space-y-1.5">
          <h2 class="text-xl font-bold text-zinc-900 tracking-tight">
             世界线终局 · 命运落幕
          </h2>
          <p class="text-zinc-600 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
             你已完成了剧本《{{ gameStore.activeScript?.title }}》的全部推演抉择，每一个决定都编织出了独一无二的因果结局！
          </p>
        </div>
        
        <div class="flex items-center justify-center gap-3 pt-2">
          <button
            @click="emit('backToHomepage')"
            class="px-5 py-2.5 rounded-xs font-bold text-xs bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white shadow-2xs transition-all cursor-pointer font-mono tracking-wider"
          >
            载入其他世界线 · 返回剧本工坊
          </button>
        </div>
      </div>
    </div>

    <!-- 选项缺失异常兜底 -->
    <div
      v-else-if="!isGenerating && currentScene?.id !== 999 && (!currentScene?.options || currentScene.options.length === 0)"
      class="text-center py-5"
    >
      <div class="inline-flex flex-col items-center gap-2 p-4 bg-zinc-50 rounded-xs border border-zinc-200 text-xs text-zinc-600">
         <span>当前剧情节点尚未生成后续分支选项</span>
         <button @click="emit('retryCurrentScene')" class="px-3.5 py-1.5 bg-blue-600 text-white rounded-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer shadow-2xs font-mono">
            重新推演该幕选项
         </button>
      </div>
    </div>

  </div>
</template>

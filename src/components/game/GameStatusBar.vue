<script setup lang="ts">
import { useGameStore } from '../../stores/game'

defineProps<{
  playerName: string
  sceneId: number | undefined
  modelName: string
  isGenerating: boolean
}>()

const emit = defineEmits<{
  toggleModelInfo: []
  resetGame: []
  backToHomepage: []
}>()

const gameStore = useGameStore()
</script>

<template>
  <div class="sticky top-0 z-40 bg-white border-b border-zinc-200 px-4 py-2.5 sm:px-6 shadow-2xs">
    
    <div class="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto">
      
      <!-- 左侧：玩家状态 & 剧本标识 -->
      <div class="flex items-center gap-3 w-full sm:w-auto">
        <div class="relative w-9 h-9 rounded-xs bg-slate-900 border border-slate-700 flex items-center justify-center overflow-hidden shadow-2xs shrink-0 text-white font-bold text-sm">
          {{ gameStore.activeScript?.icon || '⚔️' }}
        </div>

        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <h2 class="text-sm font-bold text-zinc-900 tracking-tight truncate">{{ playerName }}</h2>
            <span class="px-1.5 py-0.2 rounded-xs text-[10px] bg-blue-50 text-blue-700 border border-blue-200 font-bold font-mono tracking-wide">
              {{ gameStore.activeScript?.title?.split('·')?.[0]?.trim() || '战役' }}
            </span>
          </div>
          <div class="text-[11px] text-zinc-400 font-mono flex items-center gap-1.5 mt-0.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>STAGE: {{ sceneId || 1 }}/10</span>
          </div>
        </div>
      </div>

      <!-- 右侧：控制台 -->
      <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
        
        <!-- 章节指示器 -->
        <div class="flex items-center gap-1 px-2.5 py-1 rounded-xs bg-zinc-100 border border-zinc-200 text-xs font-mono">
          <span class="text-zinc-500 text-[11px]">第</span>
          <span class="font-bold text-blue-600 text-xs">{{ sceneId || 1 }}</span>
          <span class="text-zinc-500 text-[11px]">幕</span>
        </div>

        <!-- 当前模型标识 -->
        <button
          @click="emit('toggleModelInfo')"
          class="flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-xs font-mono text-zinc-700 transition-colors cursor-pointer"
          title="点击查看/切换模型"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          <span class="truncate max-w-[140px]">{{ modelName }}</span>
        </button>

        <div class="h-4 w-[1px] bg-zinc-200 mx-0.5"></div>

        <!-- 重置按钮 -->
        <button
          @click="emit('resetGame')"
          :disabled="isGenerating"
          class="p-1.5 rounded-xs text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed group cursor-pointer"
          title="重新开始"
        >
          <svg class="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
        </button>

        <!-- 返回剧本选择页按钮 -->
        <button
          @click="emit('backToHomepage')"
          class="px-2.5 py-1 rounded-xs text-zinc-600 hover:text-blue-600 hover:bg-blue-50 border border-zinc-200 transition-colors text-xs font-medium cursor-pointer flex items-center gap-1"
          title="返回剧本选择"
        >
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          <span class="hidden sm:inline">选剧本</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
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
</script>

<template>
  <div class="sticky top-0 z-40 bg-white border-b border-zinc-200 px-4 py-3 sm:px-6 shadow-2xs">
    
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
      
      <!-- 左侧：玩家状态 -->
      <div class="flex items-center gap-3 w-full sm:w-auto">
        <div class="relative w-10 h-10 rounded-sm bg-blue-50 border border-blue-200 flex items-center justify-center overflow-hidden shadow-2xs">
          <img src="@/assets/user.jpg" alt="User" class="w-full h-full object-cover" />
        </div>

        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-base font-bold text-zinc-900 tracking-tight">{{ playerName }}</h2>
            <span class="px-2 py-0.5 rounded-sm text-[10px] bg-blue-50 text-blue-600 border border-blue-200 font-bold tracking-wide">主人公</span>
          </div>
          <div class="flex items-center gap-2 mt-1">
             <div class="h-1.5 w-20 bg-zinc-100 rounded-sm overflow-hidden border border-zinc-200/60">
                <div class="h-full bg-blue-600 w-[65%]"></div>
             </div>
             <span class="text-[10px] text-zinc-400 font-mono">STATUS</span>
          </div>
        </div>
      </div>

      <!-- 右侧：控制台 -->
      <div class="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
        
        <!-- 章节指示器 -->
        <div class="flex items-center gap-1.5 px-3 py-1 rounded-sm bg-zinc-100 border border-zinc-200 text-xs">
          <span class="text-zinc-500 font-medium text-xs">第</span>
          <span class="font-bold text-blue-600 text-sm font-mono">{{ sceneId || 1 }}</span>
          <span class="text-zinc-500 font-medium text-xs">幕</span>
        </div>

        <!-- 当前模型标识 -->
        <div
          class="flex items-center gap-2 px-3 py-1 rounded-sm bg-zinc-50 border border-zinc-200 text-xs font-mono text-zinc-700"
        >
          <span class="w-2 h-2 rounded-full bg-blue-600"></span>
          <span class="truncate max-w-[120px] sm:max-w-none">{{ modelName }}</span>
        </div>

        <div class="h-5 w-[1px] bg-zinc-200 mx-0.5"></div>

        <!-- 重置按钮 -->
        <button
          @click="emit('resetGame')"
          :disabled="isGenerating"
          class="p-1.5 rounded-sm text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed group cursor-pointer"
          title="重新开始"
        >
          <svg class="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
        </button>

        <!-- 返回首页按钮 -->
        <button
          @click="emit('backToHomepage')"
          class="p-1.5 rounded-sm text-zinc-500 hover:text-blue-600 hover:bg-blue-50 transition-colors group cursor-pointer"
          title="返回首页"
        >
          <svg class="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
        </button>
      </div>

    </div>
  </div>
</template>

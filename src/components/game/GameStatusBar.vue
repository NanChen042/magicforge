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
  <!-- 容器：白色磨砂 + 底部细边框 -->
  <div class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-4 py-3 sm:px-6 shadow-sm transition-all duration-300">
    
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
      
      <!-- 左侧：玩家状态 (简约风格) -->
      <div class="flex items-center gap-4 w-full sm:w-auto">
        <!-- 头像容器 -->
        <div class="relative group cursor-default">
           <!-- 头像本体 -->
           <div class="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 flex items-center justify-center overflow-hidden shadow-sm">
              <span class="text-2xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">🤠</span>
           </div>
           <!-- 等级角标 -->
           <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-sm text-[10px] font-bold text-indigo-600">
             1
           </div>
        </div>

        <!-- 文本信息 -->
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-lg font-bold text-slate-800 tracking-tight">{{ playerName }}</h2>
            <span class="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-500 font-bold uppercase tracking-wider">Rookie</span>
          </div>
          <div class="flex items-center gap-2 mt-1">
             <!-- 经验条 -->
             <div class="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-indigo-400 to-indigo-500 w-[60%] rounded-full"></div>
             </div>
             <span class="text-xs text-slate-400 font-medium">EXP</span>
          </div>
        </div>
      </div>

      <!-- 右侧：控制台 (Control Panel) -->
      <div class="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
        
        <!-- 章节指示器 -->
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs sm:text-sm">
          <span class="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Chapter</span>
          <span class="font-bold text-slate-700 text-base font-mono">{{ sceneId || 0 }}</span>
        </div>

        <!-- 模型切换按钮 -->
        <button
          @click="emit('toggleModelInfo')"
          class="flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200 text-xs sm:text-sm font-medium group hover:shadow-sm"
          :class="modelName.includes('deepseek')
            ? 'bg-white border-indigo-100 text-indigo-600 hover:border-indigo-200'
            : 'bg-white border-purple-100 text-purple-600 hover:border-purple-200'"
        >
          <span class="w-2 h-2 rounded-full" 
            :class="modelName.includes('deepseek') ? 'bg-indigo-500' : 'bg-purple-500'">
          </span>
          <span class="truncate max-w-[100px] sm:max-w-none">{{ modelName }}</span>
        </button>

        <!-- 分割线 -->
        <div class="h-6 w-[1px] bg-slate-200 mx-1"></div>

        <!-- 重置按钮 -->
        <button
          @click="emit('resetGame')"
          :disabled="isGenerating"
          class="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed group relative"
          title="重新开始"
        >
          <svg class="w-5 h-5 group-hover:-rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
        </button>

        <!-- 返回首页按钮 -->
        <button
          @click="emit('backToHomepage')"
          class="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors group"
          title="返回首页"
        >
          <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
        </button>
      </div>

    </div>
  </div>
</template>

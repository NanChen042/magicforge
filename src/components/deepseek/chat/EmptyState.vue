<template>
  <div class="flex flex-col items-center justify-center min-h-full py-8 px-4 text-center max-w-3xl mx-auto animate-in fade-in duration-500">
    
    <!-- Hero 标题区域 -->
    <div class="mb-8 flex flex-col items-center">
      <div class="flex items-center gap-3 mb-2">
        <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shadow-md shadow-blue-600/10 border border-zinc-200/80 bg-white">
          <img src="@/assets/ai.png" alt="AI Logo" class="w-full h-full object-cover" />
        </div>
        <h1 class="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
          使用大模型开始对话
        </h1>
      </div>
      <p class="text-xs text-zinc-400">
        可在下方输入框随心切换「深度思考 (R1)」或多模态识图进行推演
      </p>
    </div>

    <!-- 热门话题推荐 (Trending) -->
    <div class="w-full">
      <div class="flex items-center justify-between mb-3 px-1">
        <h3 class="text-xs font-bold text-zinc-500 flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          热门推荐
        </h3>
        <button 
          @click="$emit('refresh-topics')" 
          :disabled="isLoadingTopics"
          class="group flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>{{ isLoadingTopics ? '生成中...' : '换一换' }}</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-3.5 w-3.5 transition-transform" 
            :class="isLoadingTopics ? 'animate-spin' : 'group-hover:rotate-180'"
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <div v-if="isLoadingTopics" class="flex items-center justify-center min-h-[140px] bg-white rounded-lg border border-zinc-200/80 border-dashed">
        <div class="flex flex-col items-center gap-2">
          <div class="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span class="text-xs text-zinc-400">正在获取推荐话题...</span>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        <button
          v-for="(topic, index) in hotTopics"
          :key="index"
          @click="$emit('select-question', topic)"
          class="group w-full p-3 text-left bg-white border border-zinc-200/80 rounded-lg hover:border-blue-500 hover:shadow-2xs transition-all duration-200 active:scale-[0.98] cursor-pointer flex items-center justify-between gap-2"
        >
          <div class="flex items-center gap-2 overflow-hidden">
            <span class="shrink-0 text-xs font-bold text-zinc-400 group-hover:text-blue-600 transition-colors">
              {{ index + 1 }}.
            </span>
            <span class="text-xs font-medium text-zinc-700 group-hover:text-blue-700 leading-relaxed truncate">
              {{ topic }}
            </span>
          </div>
          <!-- 悬停箭头图标 -->
          <div class="shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <svg class="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  hotTopics: string[];
  isLoadingTopics: boolean;
}>();

defineEmits<{
  'select-question': [question: string];
  'refresh-topics': [];
}>();
</script>

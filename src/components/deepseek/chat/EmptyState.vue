<template>
  <div class="flex flex-col items-center justify-center min-h-full p-8 text-center max-w-3xl mx-auto animate-in fade-in duration-500">
    
    <!-- Hero Section: 极简的品牌展示 -->
    <div class="mb-12 flex flex-col items-center relative">
      <!-- 装饰背景光 -->
      <div class="absolute -top-10 -left-10 w-32 h-32 bg-zinc-200 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      
      <div class="w-16 h-16 rounded-2xl bg-linear-to-br from-zinc-900 to-zinc-700 flex items-center justify-center mb-6 shadow-xl shadow-zinc-900/10 ring-1 ring-black/5 rotate-3 hover:rotate-0 transition-transform duration-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      </div>

      <h1 class="text-3xl font-bold text-zinc-900 tracking-tight mb-3">
        How can I help you?
      </h1>
      <p class="text-zinc-500 max-w-md text-sm leading-relaxed">
        探索 AI 的无限可能，从一个简单的问题开始。
      </p>
    </div>

    <!-- 热门话题 (Trending) -->
    <div class="w-full">
      <div class="flex items-center justify-between mb-4 px-1">
        <h3 class="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
          <span class="w-1 h-1 rounded-full bg-zinc-400"></span>
          Trending Now
        </h3>
        <button 
          @click="$emit('refresh-topics')" 
          :disabled="isLoadingTopics"
          class="group flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

      <div v-if="isLoadingTopics" class="flex items-center justify-center min-h-[180px] bg-zinc-50/50 rounded-2xl border border-zinc-100 border-dashed">
        <div class="flex flex-col items-center gap-3">
          <div class="w-6 h-6 border-2 border-zinc-800 border-t-transparent rounded-full animate-spin"></div>
          <span class="text-xs text-zinc-400">AI 正在生成有趣的话题...</span>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <button
          v-for="(topic, index) in hotTopics"
          :key="index"
          @click="$emit('select-question', topic)"
          class="group relative w-full p-3.5 text-left bg-white border border-zinc-200 rounded-xl hover:border-zinc-400 hover:shadow-lg hover:shadow-zinc-900/5 transition-all duration-300 active:scale-[0.98]"
        >
          <div class="flex items-start gap-3">
            <span class="shrink-0 font-mono text-[10px] text-zinc-300 group-hover:text-zinc-900 transition-colors pt-1">
              0{{ index + 1 }}
            </span>
            <span class="text-sm font-medium text-zinc-700 group-hover:text-zinc-900 leading-snug line-clamp-2">
              {{ topic }}
            </span>
          </div>
          <!-- 装饰角标 -->
          <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg class="w-3 h-3 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
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

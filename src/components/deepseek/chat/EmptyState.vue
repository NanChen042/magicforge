<template>
  <div class="flex flex-col items-center justify-center min-h-full py-8 px-4 text-center max-w-3xl mx-auto animate-in fade-in duration-500">
    
    <!-- DeepSeek 官方风格 Hero 区域与模式选择键 -->
    <div class="mb-10 flex flex-col items-center relative">
      <div class="flex items-center gap-3 mb-4">
        <!-- DeepSeek 标识与科技 Icon -->
        <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shadow-md shadow-blue-600/10 border border-zinc-200/80 bg-white">
          <img src="@/assets/ai.png" alt="AI Logo" class="w-full h-full object-cover" />
        </div>
        <h1 class="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
          使用大模型开始对话
        </h1>
      </div>

      <!-- 模式切换芯片组 (DeepSeek Segmented Mode Pills) -->
      <div class="flex items-center gap-2 p-1 bg-zinc-100/80 rounded-full border border-zinc-200/80 shadow-2xs mb-2">
        <button
          v-for="mode in modes"
          :key="mode.id"
          @click="activeMode = mode.id"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer"
          :class="activeMode === mode.id
            ? 'bg-white text-blue-600 shadow-2xs border border-blue-200'
            : 'text-zinc-500 hover:text-blue-600 hover:bg-blue-50/50 border border-transparent'"
        >
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" :d="mode.icon" />
          </svg>
          <span>{{ mode.label }}</span>
        </button>
      </div>
    </div>

    <!-- 热门话题 (Trending) -->
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
          <!-- 装饰角标 (垂直居中并在悬停时平滑滑入) -->
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
import { ref } from 'vue';

defineProps<{
  hotTopics: string[];
  isLoadingTopics: boolean;
}>();

defineEmits<{
  'select-question': [question: string];
  'refresh-topics': [];
}>();

const activeMode = ref('fast');

const modes = [
  { id: 'fast', label: '快速模式', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { id: 'think', label: '深度思考', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { id: 'vision', label: '识图模式', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' }
];
</script>

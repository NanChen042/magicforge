<template>
  <div v-if="show" class="w-full max-w-4xl mx-auto pl-0 sm:pl-12 mt-4 pt-3 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
    <div class="flex items-center justify-between gap-2 mb-2.5">
      <div class="flex items-center gap-1.5 text-zinc-400">
        <svg class="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span class="text-xs font-semibold text-zinc-500 tracking-wide">继续探索</span>
      </div>
      <button 
        v-if="!isLoading"
        @click="$emit('refresh')"
        class="text-xs text-zinc-400 hover:text-blue-600 transition-colors flex items-center gap-1 px-2 py-0.5 rounded hover:bg-blue-50 cursor-pointer"
        title="换一组推荐问题"
      >
        <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        换一批
      </button>
    </div>

    <!-- 加载状态 -->
    <div v-if="isLoading" class="flex flex-wrap gap-2">
      <div v-for="i in 3" :key="i" class="h-8 bg-slate-100 rounded-lg animate-pulse" :style="{ width: `${120 + i * 40}px` }"></div>
    </div>

    <!-- 推荐问题列表 -->
    <div v-else class="flex flex-wrap gap-2">
      <button
        v-for="(suggestion, index) in suggestions"
        :key="index"
        @click="$emit('select', suggestion)"
        class="group inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-zinc-700 bg-white hover:bg-blue-50/80 border border-slate-200/90 hover:border-blue-300 hover:text-blue-700 rounded-lg transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-98 cursor-pointer text-left"
      >
        <span class="max-w-[280px] sm:max-w-md truncate">{{ suggestion }}</span>
        <svg class="w-3 h-3 text-zinc-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  suggestions: string[];
  isLoading: boolean;
  show: boolean;
}>();

defineEmits<{
  select: [suggestion: string];
  refresh: [];
}>();
</script>

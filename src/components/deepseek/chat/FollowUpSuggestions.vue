<template>
  <div v-if="show" class="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
    <div class="flex items-center gap-2 mb-3">
      <svg class="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span class="text-xs font-medium text-zinc-400 uppercase tracking-wide">继续探索</span>
      <button 
        v-if="!isLoading"
        @click="$emit('refresh')"
        class="ml-auto text-xs text-zinc-400 hover:text-zinc-600 transition-colors flex items-center gap-1"
      >
        <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        换一批
      </button>
    </div>

    <!-- 加载状态 -->
    <div v-if="isLoading" class="flex flex-wrap gap-2">
      <div v-for="i in 3" :key="i" class="h-8 bg-zinc-100 rounded-full animate-pulse" :style="{ width: `${80 + i * 20}px` }"></div>
    </div>

    <!-- 推荐问题列表 -->
    <div v-else class="flex flex-wrap gap-2">
      <button
        v-for="(suggestion, index) in suggestions"
        :key="index"
        @click="$emit('select', suggestion)"
        class="group inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-600 bg-zinc-50 border border-zinc-200 rounded-full hover:bg-zinc-100 hover:border-zinc-300 hover:text-zinc-900 transition-all duration-200 active:scale-95"
      >
        <span class="max-w-[200px] truncate">{{ suggestion }}</span>
        <svg class="w-3 h-3 text-zinc-400 group-hover:text-zinc-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
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

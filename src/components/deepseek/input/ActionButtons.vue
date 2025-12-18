<template>
  <div class="w-full md:w-auto order-1 md:order-2 flex flex-wrap gap-3 items-center justify-end">

    <!-- 1. 辅助功能组 -->
    <div class="flex items-center gap-2 mr-1">
      
      <!-- 联网搜索开关 -->
      <label 
        class="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 select-none group"
        :class="enableWebSearch 
          ? 'bg-zinc-900 border-zinc-900 text-white shadow-md shadow-zinc-900/10' 
          : 'bg-white border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50'"
      >
        <input
          type="checkbox"
          class="hidden"
          :checked="enableWebSearch"
          @change="$emit('update:enableWebSearch', ($event.target as HTMLInputElement).checked)"
        />
        <!-- 动态图标：选中时是地球，未选中时是放大镜 -->
        <svg v-if="enableWebSearch" class="h-4 w-4 text-emerald-400 animate-in zoom-in duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
        <svg v-else class="h-4 w-4 transition-colors duration-200 group-hover:text-zinc-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span class="text-xs font-bold uppercase tracking-wide">Web Search</span>
      </label>

      <!-- 关键词优化按钮 -->
      <button
        v-if="!isProcessing"
        @click="$emit('optimize')"
        :disabled="!canSend || isTransforming"
        class="flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-200 text-zinc-600 bg-white hover:bg-zinc-50 hover:border-zinc-300 hover:text-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
        title="AI Optimize Prompt"
      >
        <svg v-if="isTransforming" class="h-4 w-4 animate-spin text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <svg v-else class="h-4 w-4 group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span class="hidden sm:inline text-xs font-medium">Refine</span>
      </button>
    </div>

    <!-- 2. 主操作按钮 (发送/停止) -->
    <div class="flex items-center">
      
      <!-- 场景 A: 正在生成 (停止按钮) -->
      <button
        v-if="isProcessing"
        @click="$emit('stop')"
        class="group relative flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:shadow-sm transition-all active:scale-95"
      >
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <span class="text-sm font-bold tracking-wide">Stop Generating</span>
      </button>

      <!-- 场景 B: 准备发送 (发送按钮) -->
      <button
        v-else
        @click="$emit('send')"
        :disabled="!canSend || isSearching"
        class="group relative flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-900 text-white shadow-lg shadow-zinc-900/20 hover:bg-zinc-800 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:bg-zinc-900 disabled:hover:translate-y-0"
      >
        <!-- Loading Spinner (搜索中) -->
        <svg v-if="isSearching" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>

        <!-- Send Icon -->
        <svg v-else class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7" />
        </svg>

        <span class="text-sm font-bold tracking-wide">
          {{ isSearching ? 'Searching...' : 'Send' }}
        </span>
      </button>

    </div>

  </div>
</template>

<script setup lang="ts">
defineProps<{
  canSend: boolean;
  isProcessing: boolean;
  isSearching: boolean;
  isTransforming: boolean;
  enableWebSearch: boolean;
}>();

defineEmits<{
  'update:enableWebSearch': [value: boolean];
  send: [];
  stop: [];
  optimize: [];
}>();
</script>

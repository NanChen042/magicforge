<template>
  <div class="w-full md:w-auto order-1 md:order-2 flex flex-wrap gap-2 items-center">
    <!-- 联网搜索开关 -->
    <div class="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-200">
      <input
        id="web-search-toggle"
        :checked="enableWebSearch"
        @change="$emit('update:enableWebSearch', ($event.target as HTMLInputElement).checked)"
        type="checkbox"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
      />
      <label for="web-search-toggle" class="text-sm font-medium text-blue-700 cursor-pointer flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
        </svg>
        联网搜索
      </label>
    </div>

    <!-- 关键词转换按钮 -->
    <button
      v-if="!isProcessing"
      @click="$emit('optimize')"
      :disabled="!canSend || isTransforming"
      class="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm hover:shadow-md"
      title="优化提示词"
    >
      <svg v-if="!isTransforming" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947z" clip-rule="evenodd" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      <span>{{ isTransforming ? '转换中' : '优化提示词' }}</span>
    </button>

    <!-- 发送消息按钮 -->
    <button
      v-if="!isProcessing"
      @click="$emit('send')"
      :disabled="!canSend || isSearching"
      class="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-all disabled:bg-gradient-to-r disabled:from-purple-300 disabled:to-purple-400 disabled:opacity-70 disabled:text-purple-100 disabled:shadow-none disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-sm hover:shadow-md"
    >
      <span class="flex items-center gap-2">
        <span v-if="isSearching">搜索中...</span>
        <span v-else>发送</span>
        <svg v-if="isSearching" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </span>
    </button>

    <!-- 终止生成按钮 -->
    <button
      v-else
      @click="$emit('stop')"
      class="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-all bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm hover:shadow-md"
    >
      <span class="flex items-center gap-2">
        <span>停止生成</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clip-rule="evenodd" />
        </svg>
      </span>
    </button>
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

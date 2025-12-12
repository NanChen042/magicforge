<template>
  <div class="flex flex-col space-y-2 mb-2">
    <div class="flex items-center space-x-2 text-sm text-blue-600 font-medium">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      <span>正在思考...</span>
    </div>
    <div class="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-700 leading-relaxed">
      <div class="flex items-center space-x-1.5 mb-2">
        <div class="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
        <div class="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style="animation-delay: 300ms"></div>
        <div class="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style="animation-delay: 600ms"></div>
      </div>
      <p class="text-xs">AI正在分析您的问题，并构建解答思路，请稍候...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

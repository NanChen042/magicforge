<template>
  <div class="flex flex-col space-y-3 mb-4 animate-in fade-in duration-300">
    
    <!-- 状态指示行 -->
    <div class="flex items-center gap-2.5">
      <!-- 自定义呼吸灯动画图标 -->
      <div class="relative flex h-2.5 w-2.5">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-zinc-900"></span>
      </div>
      
      <span class="text-xs font-mono font-medium text-zinc-900 tracking-wide uppercase">
        Processing
      </span>
    </div>

    <!-- 详情卡片 -->
    <div class="relative overflow-hidden bg-white border border-zinc-100 rounded-lg p-4 shadow-sm ring-1 ring-zinc-50">
      <!-- 动态微光背景 -->
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-50/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>

      <div class="relative flex flex-col gap-3">
        <!-- 骨架屏模拟文本生成 -->
        <div class="space-y-2">
          <div class="h-1.5 w-3/4 bg-zinc-100 rounded-full animate-pulse"></div>
          <div class="h-1.5 w-1/2 bg-zinc-100 rounded-full animate-pulse delay-150"></div>
        </div>
        
        <p class="text-[11px] text-zinc-400 font-mono leading-relaxed mt-1">
          Analyzing request context & generating response...
        </p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
/* 自定义 Shimmer 动画 */
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>

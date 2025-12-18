<template>
  <!-- 容器：使用虚线边框暗示内容流被打断 -->
  <div class="group flex items-center gap-3 p-3 mb-4 rounded-lg border border-dashed border-zinc-300 bg-zinc-50/50 hover:bg-zinc-50 transition-colors cursor-default">
    
    <!-- 图标：极简的停止符号 -->
    <div class="flex items-center justify-center w-5 h-5 rounded bg-zinc-200 group-hover:bg-zinc-300 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 text-zinc-600" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" clip-rule="evenodd" />
      </svg>
    </div>

    <!-- 文本：采用 Mono 字体，像是一条系统日志 -->
    <div class="flex items-center gap-2">
      <span class="text-xs font-mono font-medium text-zinc-500 uppercase tracking-wide">
        Stopped by user
      </span>
      <!-- 装饰性分割线 -->
      <span class="h-px w-4 bg-zinc-300"></span>
      <span class="text-xs text-zinc-400">生成已中断</span>
    </div>

  </div>
</template>

<script setup lang="ts">
</script>

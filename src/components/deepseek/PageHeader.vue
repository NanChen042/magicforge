<template>
  <div class="relative max-w-7xl mx-auto mb-16 pt-12 md:pt-20 text-center px-4 overflow-hidden">
    
    <!-- 1. 背景装饰：精密网格 + 顶部光束 -->
    <div class="absolute inset-0 -z-10">
      <!-- 极细的网格背景 -->
      <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <!-- 顶部的聚光灯效果 -->
      <div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400/20 opacity-20 blur-[100px]"></div>
    </div>

    <!-- 2. 版本标签 (Badge) -->
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <span class="flex h-2 w-2 rounded-full bg-zinc-900"></span>
      <span class="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Vista AI Protocol v2.0</span>
    </div>

    <!-- 3. 主标题 -->
    <div class="relative mb-6">
      <h1 class="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
        Vista AI
        <span class="text-zinc-400">Platform</span>
      </h1>
      <!-- 装饰性光标（可选） -->
      <span class="hidden md:inline-block absolute -right-8 top-2 w-6 h-6 text-zinc-300">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"/></svg>
      </span>
    </div>

    <!-- 4. 副标题 -->
    <p class="text-base md:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed font-light animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
      The next-generation intelligence orchestration layer.
      <br class="hidden sm:block" />
      <span class="text-zinc-400">Seamlessly integrate reasoning, generation, and coding.</span>
    </p>

    <!-- 5. 底部装饰线 (极简) -->
    <div class="mt-12 flex justify-center gap-1 opacity-30">
      <div class="w-1 h-1 rounded-full bg-zinc-900"></div>
      <div class="w-1 h-1 rounded-full bg-zinc-900"></div>
      <div class="w-1 h-1 rounded-full bg-zinc-900"></div>
    </div>

  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
/* 也可以添加一些微动画 */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>

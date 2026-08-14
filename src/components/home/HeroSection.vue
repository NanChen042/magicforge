<template>
  <!-- Hero Section: Wrapped 1:1 inside authentic Aceternity AuroraBackground -->
  <AuroraBackground :showRadialGradient="true">
    <!-- 主视觉核心容器 (清晰、大气、无任何多余浮动卡片干扰) -->
    <div class="max-w-4xl mx-auto px-4 relative z-10 space-y-7 text-center select-none py-16">

      <!-- 主标题 (高定字阶与流体渐变) -->
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
        用代码与灵感，锻造
        <span class="relative whitespace-nowrap inline-block">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600">
            MagicForge
          </span>
        </span>
        的全新维度
      </h1>

      <!-- 副标题 -->
      <p class="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
        这里是 MagicForge 智能工坊。融合思维链推理、多模态创作、智能体协议与交互式体验，探索灵感与代码的交汇之处。
      </p>

      <!-- 核心行动按钮群 (精炼聚焦的双主行动) -->
      <div class="pt-2 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <router-link
          to="/api-demo"
          class="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 active:scale-[0.98] text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all flex items-center gap-2.5 cursor-pointer font-sans"
        >
          <span>立即开始探索</span>
          <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </router-link>

        <router-link
          to="/prompt-library"
          class="group px-7 py-3.5 rounded-xl bg-white/90 backdrop-blur-md hover:bg-white active:scale-[0.98] text-slate-700 hover:text-blue-600 font-semibold text-sm border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex items-center gap-2.5 cursor-pointer"
        >
          <svg class="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span>提示词工程库</span>
        </router-link>
      </div>

      <!-- 底部能力规格参数 (纯净无点悬浮参数胶囊) -->
      <div class="pt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600 font-medium max-w-3xl mx-auto">
        <div class="px-3.5 py-1.5 rounded-lg bg-white/80 border border-slate-200/80 shadow-2xs backdrop-blur-sm">
          DeepSeek-R1 ｜ 思维链推理
        </div>

        <div class="px-3.5 py-1.5 rounded-lg bg-white/80 border border-slate-200/80 shadow-2xs backdrop-blur-sm">
          多模态 ｜ 视觉与语音生成
        </div>

        <div class="px-3.5 py-1.5 rounded-lg bg-white/80 border border-slate-200/80 shadow-2xs backdrop-blur-sm">
          SSE 极速流式 ｜ 全链路兼容
        </div>
      </div>

    </div>
  </AuroraBackground>
</template>

<script setup lang="ts">
import AuroraBackground from '../ui/AuroraBackground.vue'
</script>

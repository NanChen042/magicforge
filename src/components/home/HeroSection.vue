<template>
  <!-- Hero Section: 搭载升级版流体极光与弥散渐变 -->
  <AuroraBackground :showRadialGradient="true">
    <!-- 主视觉核心容器 (大气、聚焦、层级分明) -->
    <div class="max-w-4xl mx-auto px-4 relative z-10 space-y-8 text-center select-none py-14 sm:py-20">

      <!-- 主标题 (纯净现代无衬线字阶 + 字母逐字波浪律动 + 丝滑流光) -->
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.3] sm:leading-[1.2]">
        用代码与灵感，锻造
        <span class="relative whitespace-nowrap inline-flex items-baseline mx-1.5">
          <span
            v-for="(letter, i) in brandLetters"
            :key="i"
            class="wave-letter inline-block select-none font-black"
            :style="{ '--i': i }"
          >
            {{ letter }}
          </span>
        </span>
        的全新维度
      </h1>

      <!-- 副标题 -->
      <p class="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
        这里是 MagicForge 智能工坊。融合思维链推理、多模态创作、智能体协议与交互式体验，探索灵感与代码的交汇之处。
      </p>

      <!-- 动态打字机能力指示栏 -->
      <div class="h-6 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-slate-500" aria-hidden="true">
        <span class="text-slate-400">正在启用</span>
        <span class="inline-flex min-w-[5.5rem] justify-start font-mono font-bold text-blue-600">
          {{ displayedCapability }}
        </span>
        <span aria-hidden="true" class="type-cursor h-4 w-0.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
      </div>
      <span class="sr-only">MagicForge 支持深度推理、视觉创作、互动叙事和语音生成。</span>

      <!-- 核心行动按钮群 (精工微圆角 rounded-lg + 质感按钮设计) -->
      <div class="pt-2 flex flex-col sm:flex-row gap-3.5 justify-center items-center">
        
        <!-- 立即开始探索 按钮 (精工主按钮) -->
        <router-link
          to="/api-demo"
          class="group relative overflow-hidden px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm shadow-sm hover:shadow-md hover:shadow-blue-600/25 active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer font-sans"
        >
          <!-- 扫光光效 -->
          <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none" />
          
          <span class="relative z-10 font-medium tracking-wide">立即开始探索</span>
          <svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </router-link>

        <!-- 提示词工程库 按钮 (精致次级按钮) -->
        <router-link
          to="/prompt-library"
          class="group px-6 py-3 rounded-lg bg-white/95 hover:bg-white active:bg-slate-50 text-slate-700 hover:text-blue-600 font-semibold text-sm border border-slate-200 hover:border-blue-300 shadow-2xs hover:shadow-xs active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
        >
          <svg class="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span class="font-medium tracking-wide">提示词工程库</span>
        </router-link>
      </div>

      <!-- 底部能力规格参数 (精工微圆角 + 错峰悬停微动效) -->
      <div class="pt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600 font-medium max-w-3xl mx-auto">
        <div class="float-badge-1 px-3.5 py-1.5 rounded-md bg-white/85 hover:bg-white border border-slate-200/90 hover:border-blue-300 shadow-2xs hover:shadow-xs backdrop-blur-sm transition-all cursor-default">
          <span class="text-blue-600 font-bold">DeepSeek-R1</span> ｜ 思维链推理
        </div>

        <div class="float-badge-2 px-3.5 py-1.5 rounded-md bg-white/85 hover:bg-white border border-slate-200/90 hover:border-blue-300 shadow-2xs hover:shadow-xs backdrop-blur-sm transition-all cursor-default">
          <span class="text-indigo-600 font-bold">多模态</span> ｜ 视觉与语音生成
        </div>

        <div class="float-badge-3 px-3.5 py-1.5 rounded-md bg-white/85 hover:bg-white border border-slate-200/90 hover:border-blue-300 shadow-2xs hover:shadow-xs backdrop-blur-sm transition-all cursor-default">
          <span class="text-sky-600 font-bold">SSE 极速流式</span> ｜ 全链路兼容
        </div>
      </div>

    </div>
  </AuroraBackground>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import AuroraBackground from '../ui/AuroraBackground.vue'

// 品牌单词拆解，实现纯净字母波浪律动
const brandLetters = 'MagicForge'.split('')

const capabilities = ['深度推理', '视觉创作', '互动叙事', '语音生成']
const displayedCapability = ref('')
let timer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    displayedCapability.value = capabilities[0]
    return
  }

  let capabilityIndex = 0
  let isDeleting = false

  const type = () => {
    const capability = capabilities[capabilityIndex]

    if (isDeleting) {
      displayedCapability.value = capability.slice(0, displayedCapability.value.length - 1)
    } else {
      displayedCapability.value = capability.slice(0, displayedCapability.value.length + 1)
    }

    if (!isDeleting && displayedCapability.value === capability) {
      isDeleting = true
      timer = setTimeout(type, 1500)
      return
    }

    if (isDeleting && !displayedCapability.value) {
      isDeleting = false
      capabilityIndex = (capabilityIndex + 1) % capabilities.length
    }

    timer = setTimeout(type, isDeleting ? 65 : 120)
  }

  type()
})

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer)
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800;900&family=Outfit:wght@800;900&family=Lexend:wght@800;900&display=swap');

/* 现代国际顶尖高定科技英文字体 (Plus Jakarta Sans / Outfit · 900 Extra Black) */
.wave-letter {
  font-family: 'Plus Jakarta Sans', 'Outfit', 'Lexend', system-ui, -apple-system, sans-serif;
  font-weight: 900;
  letter-spacing: -0.035em;
  padding: 0 0.5px;
  background: linear-gradient(
    135deg,
    #2563eb 0%,
    #0284c7 22%,
    #6366f1 48%,
    #38bdf8 72%,
    #2563eb 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: 
    letter-wave 2.6s ease-in-out infinite,
    brand-shimmer 6s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.09s), 0s;
  will-change: transform, filter;
  filter: drop-shadow(0 2px 6px rgba(37, 99, 235, 0.12));
}

@keyframes letter-wave {
  0%, 100% {
    transform: translateY(0px);
    filter: drop-shadow(0 2px 6px rgba(37, 99, 235, 0.1));
  }
  40% {
    transform: translateY(-7px);
    filter: drop-shadow(0 10px 18px rgba(37, 99, 235, 0.28));
  }
}

/* 品牌字流光渐变动画 */
@keyframes brand-shimmer {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* 打字机光标闪烁 */
.type-cursor {
  animation: cursor-blink 900ms steps(2, start) infinite;
}

@keyframes cursor-blink {
  50% {
    opacity: 0;
  }
}

/* 底部三个胶囊标签的错峰柔和浮动动画 */
@keyframes float-capsule {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
}

.float-badge-1 {
  animation: float-capsule 4.5s ease-in-out infinite;
}

.float-badge-2 {
  animation: float-capsule 5.2s ease-in-out 0.8s infinite;
}

.float-badge-3 {
  animation: float-capsule 4.8s ease-in-out 1.6s infinite;
}

@media (prefers-reduced-motion: reduce) {
  .wave-letter,
  .type-cursor,
  .float-badge-1,
  .float-badge-2,
  .float-badge-3 {
    animation: none;
  }
}
</style>

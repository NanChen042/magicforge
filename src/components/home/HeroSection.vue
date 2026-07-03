<template>
  <!-- Hero Refactored: 纯净极简浅色风 -->
  <section class="relative pt-20 pb-32 lg:pt-32 lg:pb-40 text-center overflow-hidden">

    <!-- 1. 边缘干净光影层 (无毛玻璃) -->
    <div class="absolute inset-0 z-0 pointer-events-none select-none">
      <!-- A. 左上角：悬浮的纯白逻辑卡片 (Solid White Floating Card) -->
      <div class="absolute top-10 left-[5%] lg:left-[10%] w-48 p-3 rounded-sm bg-white shadow-xl shadow-slate-200/50 border border-slate-100 -rotate-6 animate-float-slow hidden lg:block">
        <!-- 模拟代码块 -->
        <div class="flex items-center gap-2 mb-2">
          <div class="w-2 h-2 rounded-full bg-red-400"></div>
          <div class="w-2 h-2 rounded-full bg-yellow-400"></div>
          <div class="w-2 h-2 rounded-full bg-green-400"></div>
        </div>
        <div class="space-y-1.5">
          <div class="h-1.5 w-3/4 bg-slate-100 rounded-full"></div>
          <div class="h-1.5 w-1/2 bg-indigo-100 rounded-full"></div>
          <div class="h-1.5 w-5/6 bg-slate-100 rounded-full"></div>
        </div>
      </div>

      <!-- B. 右上角：柔和的光晕与线条 -->
      <div class="absolute -top-20 -right-20 w-[500px] h-[500px] opacity-40">
        <div class="absolute inset-[30%] bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl"></div>
        <svg class="absolute inset-0 w-full h-full text-slate-100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 2" class="animate-[spin_60s_linear_infinite]" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="0.5" class="animate-[spin_40s_linear_infinite_reverse]" />
        </svg>
      </div>

      <!-- C. 散落的极简锚点 -->
      <svg class="absolute top-24 right-[15%] w-5 h-5 text-slate-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
      </svg>
      <svg class="absolute bottom-24 left-[10%] w-3 h-3 text-slate-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
      </svg>
    </div>

    <!-- 2. 全局极简背景 (干净的点阵网格) -->
    <div class="absolute inset-0 -z-10 pointer-events-none">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[600px] bg-gradient-to-b from-indigo-50 to-transparent rounded-full blur-3xl opacity-60"></div>
      <div class="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      <!-- 主标题 -->
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.2] animate-fade-in-up animation-delay-200">
        用代码与灵感，锻造
        <span class="relative whitespace-nowrap inline-block">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 animate-gradient-x">
            AI Vista
          </span>
        </span>
        的全新维度
      </h1>

      <!-- 副标题 -->
      <p class="text-base md:text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed font-normal animate-fade-in-up animation-delay-400">
        这里是 SouthernWind 智能工坊。融合思维链推理、多模态创作、智能体协议与交互式体验，探索灵感与代码的交汇之处。
      </p>

      <!-- 按钮组 -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-600">
        <router-link to="/api-demo" class="group relative px-8 py-3.5 bg-slate-900 text-white rounded-sm font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
          <span class="relative flex items-center gap-2">
            开始构建
            <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </router-link>

        <router-link to="/prompt-library" class="group px-8 py-3.5 bg-white text-slate-700 rounded-sm font-medium border border-slate-200 shadow-sm hover:border-indigo-200 hover:text-indigo-600 hover:shadow transition-all duration-300">
          <span class="flex items-center gap-2">
            <svg class="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 6.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 6.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 6.253" />
            </svg>
            浏览提示库
          </span>
        </router-link>
      </div>

      <!-- 底部数据背书 -->
      <div class="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-center gap-8 animate-fade-in-up animation-delay-600">
        <div class="flex items-center gap-2 text-slate-500 text-sm font-medium">
          <div class="flex -space-x-2">
            <div class="w-6 h-6 rounded-full bg-slate-100 border-2 border-white overflow-hidden"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix" alt="avatar" /></div>
            <div class="w-6 h-6 rounded-full bg-slate-100 border-2 border-white overflow-hidden"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Aneka" alt="avatar" /></div>
            <div class="w-6 h-6 rounded-full bg-slate-100 border-2 border-white overflow-hidden"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Jack" alt="avatar" /></div>
          </div>
          <span>2,000+ 开发者正在使用</span>
        </div>
      </div>

    </div>
  </section>
</template>

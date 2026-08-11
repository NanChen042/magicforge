<template>
  <!-- 2. 核心价值 Showcase (重构版：高级光影美学) -->
  <section class="mb-24 px-4 sm:px-6 lg:px-8 relative">

    <!-- 极光背景 (更加柔和、高级) -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none rounded-md">
      <div class="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px] mix-blend-multiply"></div>
      <div class="absolute -bottom-[20%] -right-[10%] w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px] mix-blend-multiply"></div>
      <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
    </div>

    <div class="relative z-10 py-8 md:py-16">

        <!-- 标题区：极简主义排版 -->
        <div class="text-center mb-16 max-w-2xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
            重塑
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-600">
              数字体验
            </span>
            的三大维度
          </h2>
          <p class="text-lg text-slate-500 font-light leading-relaxed">
            摒弃繁杂，回归本质。我们构建了从底层推理到视觉表达，再到沉浸式娱乐的全链路 AI 引擎。
          </p>
        </div>

        <!-- 三大核心卡片：Bento Pro (Glassmorphism + 3D Transforms) -->
        <div class="grid md:grid-cols-3 gap-8">

          <!-- ==============================================================
               Feature 1: 深度思考 (Deep Reasoning) - 神经晶格风格
               ============================================================== -->
          <div class="group relative bg-white rounded-md p-8 border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-700 overflow-hidden z-10">

            <!-- [A] 动态背景光效 -->
            <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-[60px] group-hover:bg-blue-500/20 transition-colors duration-700"></div>

            <!-- [B] 视觉主体：悬浮神经节点 (Neural Node) -->
            <div class="relative h-48 mb-6 perspective-1000 flex items-center justify-center">
              <!-- 装饰网格背景 -->
              <div class="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(circle,black,transparent_80%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <!-- 核心节点动画 -->
              <div class="relative w-24 h-24 transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">
                <!-- 中心球体 -->
                <div class="absolute inset-0 bg-gradient-to-tr from-blue-600 to-sky-500 rounded-md shadow-lg rotate-45 z-10 flex items-center justify-center border border-white/20">
                  <svg class="w-10 h-10 text-white opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <!-- 环绕卫星 (Orbiting Nodes) -->
                <div class="absolute -inset-4 border border-blue-200/50 rounded-full animate-[spin_10s_linear_infinite]">
                  <div class="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                </div>
                <div class="absolute -inset-8 border border-dashed border-blue-200/30 rounded-full animate-[spin_15s_linear_infinite_reverse]">
                  <div class="absolute bottom-1/2 right-0 translate-y-1/2 w-3 h-3 bg-sky-400 rounded-full"></div>
                </div>
              </div>
            </div>

            <!-- [C] 文本内容 -->
            <div class="relative z-10">
              <h3 class="text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-blue-600 transition-colors">认知与推理</h3>
              <p class="text-sm text-slate-500 leading-relaxed mb-6 border-l-2 border-blue-100 pl-4 group-hover:border-blue-500 transition-colors">
                集成 <strong>Deepseek-R1</strong> 核心。通过思维链 (CoT) 技术，赋予 AI 深度 logic 分析与复杂问题拆解能力。
              </p>

              <!-- 底部标签组 -->
              <div class="flex flex-wrap gap-2">
                <span class="px-2.5 py-1 rounded-md bg-blue-50 text-[10px] font-bold text-blue-600 uppercase tracking-wider border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all">Reasoning</span>
                <span class="px-2.5 py-1 rounded-md bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider border border-slate-100">Logic Chain</span>
              </div>
            </div>

            <!-- 装饰：角落角标 -->
            <svg class="absolute bottom-6 right-6 w-6 h-6 text-blue-100 group-hover:text-blue-500 transition-colors duration-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 22h-6v-2h4v-4h2v6z" />
            </svg>
          </div>

          <!-- Feature 2: 视觉创造 (Visual Creativity) - 终极重构：全息光圈 (The Holographic Iris) -->
          <div class="group relative bg-white rounded-md p-8 border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-700 overflow-hidden z-10">

            <!-- [A] 环境氛围光 (保持统一的微光感) -->
            <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="absolute -left-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-[60px] group-hover:bg-blue-500/20 transition-colors duration-700"></div>

            <!-- [B] 视觉主体：全息光圈 (悬浮的机械/光学结构) -->
            <div class="relative h-48 mb-6 flex items-center justify-center perspective-1000">

              <!-- 1. 外层刻度环 (Tech Ring) -->
              <div class="absolute w-32 h-32 rounded-full border border-dashed border-blue-300/50 animate-[spin_20s_linear_infinite] group-hover:border-blue-400 transition-colors"></div>

              <!-- 2. 玻璃透镜层 (Glass Lens) -->
              <div class="relative w-24 h-24 rounded-full bg-gradient-to-tr from-blue-50 to-sky-50 border border-blue-100 shadow-lg flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] z-10">

                <!-- 内部：七彩光谱 (Spectrum) -->
                <div class="absolute inset-2 rounded-full opacity-80 overflow-hidden">
                  <div class="w-full h-full bg-[conic-gradient(from_0deg,transparent_0deg,#c7d2fe_90deg,transparent_180deg)] animate-[spin_4s_linear_infinite]"></div>
                </div>

                <!-- 核心：瞳孔 (Pupil) -->
                <div class="relative w-12 h-12 bg-white rounded-full shadow-inner flex items-center justify-center overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-br from-blue-100 to-sky-100"></div>
                  <div class="w-4 h-4 rounded-full bg-gradient-to-tr from-blue-500 to-sky-600 shadow-lg animate-pulse"></div>
                </div>

                <!-- 表面高光反光 -->
                <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-white/60 via-transparent to-transparent opacity-50 pointer-events-none"></div>
              </div>

              <!-- 3. 悬浮粒子 (Floating Elements) -->
              <div class="absolute w-full h-full animate-[spin_8s_linear_infinite_reverse]">
                <div class="absolute top-2 left-1/2 w-2 h-2 bg-blue-400 rounded-full blur-[1px]"></div>
                <div class="absolute bottom-8 right-8 w-1.5 h-1.5 bg-sky-400 rounded-full"></div>
              </div>

              <!-- 4. 装饰：取景框线 (Focus Marks) -->
              <div class="absolute w-40 h-40 opacity-30 transition-all duration-500 group-hover:scale-90 group-hover:opacity-100 group-hover:text-blue-400">
                <svg class="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1">
                  <path d="M20,20 L30,20 M20,20 L20,30" />
                  <path d="M80,20 L70,20 M80,20 L80,30" />
                  <path d="M20,80 L30,80 M20,80 L20,70" />
                  <path d="M80,80 L70,80 M80,80 L80,70" />
                </svg>
              </div>

            </div>

            <!-- [C] 文本内容 -->
            <div class="relative z-10">
              <h3 class="text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-blue-600 transition-colors">视觉与想象</h3>
              <p class="text-sm text-slate-500 leading-relaxed mb-6 border-l-2 border-blue-100 pl-4 group-hover:border-blue-500 transition-colors">
                打破语言的边界。利用多模态大模型，将抽象的文本指令转化为 4K 级的艺术图像与设计素材。
              </p>

              <div class="flex flex-wrap gap-2">
                <span class="px-2.5 py-1 rounded-md bg-blue-50 text-[10px] font-bold text-blue-600 uppercase tracking-wider border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all">Generative</span>
                <span class="px-2.5 py-1 rounded-md bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider border border-slate-100">Art</span>
              </div>
            </div>

            <svg class="absolute bottom-6 right-6 w-6 h-6 text-blue-100 group-hover:text-blue-500 transition-colors duration-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 22h-6v-2h4v-4h2v6z" />
            </svg>
          </div>

          <!-- ==============================================================
               Feature 3: 互动娱乐 (Interactive) - 时空隧道风格
               ============================================================== -->
          <div class="group relative bg-white rounded-md p-8 border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-700 overflow-hidden z-10">

            <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-[60px] group-hover:bg-blue-500/20 transition-colors duration-700"></div>

            <!-- [B] 视觉主体：无限流接口 (Infinite Interface) -->
            <div class="relative h-48 mb-6 flex items-center justify-center perspective-1000">
              <!-- 隧道背景圈 -->
              <div class="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity">
                <div class="w-40 h-40 border border-blue-500/20 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                <div class="absolute w-28 h-28 border border-blue-500/40 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]"></div>
              </div>

              <!-- 悬浮控制器 -->
              <div class="relative w-32 h-20 bg-gradient-to-b from-slate-900 to-blue-950 rounded-md border border-blue-500/30 shadow-2xl transform rotate-x-12 group-hover:rotate-x-0 group-hover:scale-105 transition-all duration-500 flex items-center justify-center overflow-hidden">
                <!-- 屏幕发光 -->
                <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div class="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-500/20 to-transparent"></div>

                <!-- 动态文字 -->
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  <span class="text-xs font-mono font-bold text-blue-300 tracking-widest">START</span>
                </div>
              </div>

              <!-- 漂浮粒子 -->
              <div class="absolute w-1 h-1 bg-blue-400 rounded-full top-10 left-10 animate-float-fast"></div>
              <div class="absolute w-1.5 h-1.5 bg-blue-500 rounded-full bottom-10 right-10 animate-float-medium"></div>
            </div>

            <div class="relative z-10">
              <h3 class="text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-blue-600 transition-colors">无限流互动</h3>
              <p class="text-sm text-slate-500 leading-relaxed mb-6 border-l-2 border-blue-100 pl-4 group-hover:border-blue-500 transition-colors">
                生成式剧情引擎。打造 Roguelike 游戏与沉浸式互动小说，每一次选择都通向未知的平行宇宙。
              </p>

              <div class="flex flex-wrap gap-2">
                <span class="px-2.5 py-1 rounded-md bg-blue-50 text-[10px] font-bold text-blue-600 uppercase tracking-wider border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all">Gaming</span>
                <span class="px-2.5 py-1 rounded-md bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider border border-slate-100">Roguelike</span>
              </div>
            </div>

            <svg class="absolute bottom-6 right-6 w-6 h-6 text-blue-100 group-hover:text-blue-500 transition-colors duration-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 22h-6v-2h4v-4h2v6z" />
            </svg>
          </div>

        </div>


        <!-- 底部统计：实时遥测仪表盘 (Telemetry Dashboard) -->
        <div class="relative mt-12 pt-10 border-t border-slate-200/60">

          <!-- 装饰：顶部流光线条 -->
          <div class="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">

            <!-- Metric 1: Latency (Speed) -->
            <div class="group relative flex flex-col items-center justify-between">
              <div class="absolute right-0 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent hidden md:block lg:hidden"></div>

              <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <div class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                Latency
              </div>
              <div class="relative">
                <div class="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-slate-800 to-slate-600 group-hover:from-blue-600 group-hover:to-blue-400 transition-all duration-300">
                  50<span class="text-sm font-sans font-medium text-slate-400 ml-1 align-baseline">ms</span>
                </div>
              </div>
              <!-- 微型图表：折线 -->
              <div class="h-6 w-24 mt-3 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                <svg viewBox="0 0 100 20" class="w-full h-full stroke-blue-500 fill-none" stroke-width="2">
                  <path d="M0 10 Q 25 10 35 5 T 60 15 T 85 8 T 100 10" vector-effect="non-scaling-stroke" />
                </svg>
              </div>
            </div>

            <!-- Metric 2: Context (Capacity) -->
            <div class="group relative flex flex-col items-center justify-between">
              <div class="absolute right-0 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent hidden md:block"></div>

              <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <div class="w-1.5 h-1.5 rounded-sm bg-blue-500"></div>
                Context
              </div>
              <div class="relative">
                <div class="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-slate-800 to-slate-600 group-hover:from-blue-600 group-hover:to-blue-400 transition-all duration-300">
                  128<span class="text-sm font-sans font-medium text-slate-400 ml-1 align-baseline">k</span>
                </div>
              </div>
              <!-- 微型图表：柱状 -->
              <div class="h-6 w-24 mt-3 flex items-end justify-center gap-1 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                <div class="w-1 h-2 bg-blue-400 rounded-t"></div>
                <div class="w-1 h-3 bg-blue-400 rounded-t"></div>
                <div class="w-1 h-5 bg-blue-500 rounded-t"></div>
                <div class="w-1 h-4 bg-blue-500 rounded-t"></div>
                <div class="w-1 h-3 bg-blue-400 rounded-t"></div>
                <div class="w-1 h-2 bg-blue-300 rounded-t"></div>
              </div>
            </div>

            <!-- Metric 3: Scenarios (Infinite) -->
            <div class="group relative flex flex-col items-center justify-between">
              <div class="absolute right-0 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent hidden md:block lg:hidden"></div>

              <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                Scenarios
              </div>
              <div class="relative">
                <div class="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-slate-800 to-slate-600 group-hover:from-blue-600 group-hover:to-blue-400 transition-all duration-300">
                  ∞
                </div>
              </div>
              <!-- 微型图表：正弦波 -->
              <div class="h-6 w-24 mt-3 opacity-30 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                <svg viewBox="0 0 100 20" class="w-full h-full stroke-blue-500 fill-none" stroke-width="2">
                  <path d="M0 10 Q 25 20 50 10 T 100 10" class="animate-[dash_2s_linear_infinite]" stroke-dasharray="100" stroke-dashoffset="100" />
                </svg>
              </div>
            </div>

            <!-- Metric 4: Uptime (Reliability) -->
            <div class="group relative flex flex-col items-center justify-between">
              <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                SLA Guarantee
              </div>
              <div class="relative">
                <div class="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-slate-800 to-slate-600 group-hover:from-blue-600 group-hover:to-blue-400 transition-all duration-300">
                  99.9<span class="text-sm font-sans font-medium text-slate-400 ml-1 align-baseline">%</span>
                </div>
              </div>
              <!-- 微型图表：心跳线 -->
              <div class="h-6 w-24 mt-3 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                <svg viewBox="0 0 100 20" class="w-full h-full stroke-blue-500 fill-none" stroke-width="2">
                  <path d="M0 10 H 30 L 40 2 L 50 18 L 60 10 H 100" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </div>
  </section>
</template>

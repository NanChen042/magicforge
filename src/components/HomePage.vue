<template>
  <div class="min-h-screen bg-[#F8FAFC] selection:bg-indigo-500/30 text-slate-800 font-sans">

    <!-- 全局背景装饰 - 更高级的极光效果 -->
    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div class="absolute top-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-indigo-500/10 rounded-full blur-[100px] mix-blend-multiply animate-blob"></div>
      <div class="absolute top-[-10%] right-[-10%] w-[50rem] h-[50rem] bg-violet-500/10 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-[-20%] left-[20%] w-[60rem] h-[60rem] bg-blue-500/5 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-4000"></div>
      <!-- 网格纹理叠加，增加科技感 -->
      <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
      <!-- 1. Hero 区域：更克制、更有力的排版 -->
      <header class="text-center mb-24 max-w-4xl mx-auto">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-indigo-100 shadow-sm mb-8 backdrop-blur-sm animate-fade-in-up">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span class="text-xs font-semibold text-indigo-600 tracking-wide uppercase">AI Vista 2.0 Now Available</span>
        </div>

        <h1 class="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
          探索 <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 relative">AI 智能
            <!-- 下划线装饰 -->
            <svg class="absolute w-full h-3 -bottom-1 left-0 text-indigo-200/50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="8" fill="none" />
            </svg>
          </span>
          的无限边界
        </h1>

        <p class="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
          下一代智能对话与创作平台。集成多种大模型接口，为您提供企业级的流式响应、思维链展示与多模态创作体验。
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <router-link to="/api-demo" class="group relative px-8 py-4 bg-slate-900 text-white rounded-2xl font-medium shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
            <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span class="relative flex items-center gap-2">
              开始构建
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </router-link>

          <router-link to="/prompt-library" class="group px-8 py-4 bg-white text-slate-700 rounded-2xl font-medium border border-slate-200 shadow-sm hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md transition-all duration-300">
            浏览提示库
          </router-link>
        </div>
      </header>

      <!-- 2. 核心价值 Showcase (重构版：高级光影美学) -->
      <section class="mb-24 px-4 sm:px-6 lg:px-8">
        <!-- 容器：极简磨砂玻璃 -->
        <div class="relative bg-white/40 backdrop-blur-2xl rounded-[3rem] p-1 border border-white/60 shadow-xl shadow-slate-200/40">

          <!-- 极光背景 (更加柔和、高级) -->
          <div class="absolute inset-0 overflow-hidden pointer-events-none rounded-[3rem]">
            <div class="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-indigo-100/40 rounded-full blur-[120px] mix-blend-multiply"></div>
            <div class="absolute -bottom-[20%] -right-[10%] w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px] mix-blend-multiply"></div>
            <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
          </div>

          <div class="relative z-10 p-8 md:p-16">

            <!-- 标题区：极简主义排版 -->
            <div class="text-center mb-16 max-w-2xl mx-auto">
              <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                重塑
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                  数字体验
                </span>
                的三大维度
              </h2>
              <p class="text-lg text-slate-500 font-light leading-relaxed">
                摒弃繁杂，回归本质。我们构建了从底层推理到视觉表达，再到沉浸式娱乐的全链路 AI 引擎。
              </p>
            </div>

            <!-- 三大核心卡片：Bento Lite 风格 -->
            <div class="grid md:grid-cols-3 gap-6">

              <!-- Feature 1: 深度思考 (Deep Reasoning) -->
              <div class="group relative bg-white/60 rounded-[2rem] p-8 border border-white/50 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                <!-- 抽象光影装饰 (Abstract Orb) -->
                <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-colors duration-500"></div>

                <!-- 视觉锚点：动态呼吸点 -->
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-white to-indigo-50 border border-indigo-100 flex items-center justify-center mb-6 shadow-sm">
                  <div class="relative flex h-3 w-3">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                  </div>
                </div>

                <h3 class="text-xl font-bold text-slate-900 mb-3 tracking-tight">认知与推理</h3>
                <p class="text-sm text-slate-500 leading-relaxed mb-6">
                  集成 <strong>Deepseek-R1</strong> 核心。通过思维链 (CoT) 技术，赋予 AI 深度逻辑分析与复杂问题拆解能力。
                </p>

                <!-- 极简标签 -->
                <div class="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <span class="text-[10px] uppercase tracking-wider font-semibold text-indigo-600">Reasoning</span>
                  <span class="h-1 w-1 rounded-full bg-slate-300"></span>
                  <span class="text-[10px] uppercase tracking-wider font-semibold text-indigo-600">Logic</span>
                </div>
              </div>

              <!-- Feature 2: 视觉创造 (Visual Creativity) -->
              <div class="group relative bg-white/60 rounded-[2rem] p-8 border border-white/50 shadow-sm hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/20 transition-colors duration-500"></div>

                <!-- 视觉锚点：彩色光晕 -->
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-white to-purple-50 border border-purple-100 flex items-center justify-center mb-6 shadow-sm overflow-hidden">
                  <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400 blur-sm group-hover:blur-md transition-all duration-500 animate-pulse"></div>
                </div>

                <h3 class="text-xl font-bold text-slate-900 mb-3 tracking-tight">视觉与想象</h3>
                <p class="text-sm text-slate-500 leading-relaxed mb-6">
                  打破语言的边界。利用多模态大模型，将抽象的文本指令转化为 4K 级的艺术图像与设计素材。
                </p>

                <div class="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <span class="text-[10px] uppercase tracking-wider font-semibold text-purple-600">Generative</span>
                  <span class="h-1 w-1 rounded-full bg-slate-300"></span>
                  <span class="text-[10px] uppercase tracking-wider font-semibold text-purple-600">Art</span>
                </div>
              </div>

              <!-- Feature 3: 互动娱乐 (Interactive Entertainment) -->
              <div class="group relative bg-white/60 rounded-[2rem] p-8 border border-white/50 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-colors duration-500"></div>

                <!-- 视觉锚点：几何旋转 -->
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-white to-emerald-50 border border-emerald-100 flex items-center justify-center mb-6 shadow-sm">
                  <div class="w-4 h-4 border-2 border-emerald-500 rounded-sm transform rotate-45 group-hover:rotate-90 transition-transform duration-700"></div>
                </div>

                <h3 class="text-xl font-bold text-slate-900 mb-3 tracking-tight">无限流互动</h3>
                <p class="text-sm text-slate-500 leading-relaxed mb-6">
                  生成式剧情引擎。打造 Roguelike 游戏与沉浸式互动小说，每一次选择都通向未知的平行宇宙。
                </p>

                <div class="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <span class="text-[10px] uppercase tracking-wider font-semibold text-emerald-600">Gaming</span>
                  <span class="h-1 w-1 rounded-full bg-slate-300"></span>
                  <span class="text-[10px] uppercase tracking-wider font-semibold text-emerald-600">Flow</span>
                </div>
              </div>

            </div>

            <!-- 底部统计：纯净数字 -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-slate-200/50">
              <div class="text-center group cursor-default">
                <div class="text-3xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">50<span class="text-lg align-top ml-0.5">ms</span></div>
                <div class="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Latency</div>
              </div>
              <div class="text-center group cursor-default">
                <div class="text-3xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">128<span class="text-lg align-top ml-0.5">k</span></div>
                <div class="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Context</div>
              </div>
              <div class="text-center group cursor-default">
                <div class="text-3xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">∞</div>
                <div class="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Scenarios</div>
              </div>
              <div class="text-center group cursor-default">
                <div class="text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">SLA</div>
                <div class="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">99.9% Uptime</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- 3. 特性统计：更干净的数据展示 -->
      <section class="mb-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-slate-200/60 py-12">
        <div class="text-center">
          <div class="text-3xl font-bold text-slate-900 mb-1">Stream</div>
          <div class="text-sm font-medium text-slate-500 uppercase tracking-wider">实时流式输出</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-slate-900 mb-1">CoT</div>
          <div class="text-sm font-medium text-slate-500 uppercase tracking-wider">思维链可视化</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-slate-900 mb-1">REST</div>
          <div class="text-sm font-medium text-slate-500 uppercase tracking-wider">标准接口协议</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-slate-900 mb-1">100%</div>
          <div class="text-sm font-medium text-slate-500 uppercase tracking-wider">参数可配置</div>
        </div>
      </section>

      <section class="mb-24 px-4 sm:px-6 lg:px-8">

        <!-- 标题区：增加更强的引导感 -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div class="max-w-2xl">
            <h2 class="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              释放 AI 的
              <span class="relative inline-block">
                <span class="relative z-10 text-indigo-600">多元潜能</span>
                <span class="absolute bottom-1 left-0 w-full h-3 bg-indigo-100 -z-0 -rotate-1"></span>
              </span>
            </h2>
            <p class="text-lg text-slate-500 leading-relaxed">
              精心打造的功能矩阵，从自然语言处理到多模态创作，为您提供一站式智能体验。
            </p>
          </div>

          <!-- 查看更多链接 -->
          <a href="#" class="hidden md:flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors group">
            查看完整文档
            <span class="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 group-hover:translate-x-1 transition-all">
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
        <!-- Bento Grid 布局：宽幅游戏版 (流体交错结构) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[240px]">

          <!-- 1. 核心卡片：AI 对话 (重构版：战术指挥中心) -->
          <router-link to="/api-demo" class="group relative col-span-1 md:col-span-2 row-span-2 bg-[#020617] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-500/10 hover:shadow-indigo-500/30 transition-all duration-500 border border-white/5 hover:border-indigo-500/40 flex flex-col">

            <!-- 1. 背景层：全息网格 -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
              <!-- 底图 -->
              <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-[3s]" alt="Background">
              <div class="absolute inset-0 bg-[#020617]/90"></div>

              <!-- 装饰网格 (Grid) -->
              <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]" style="background-size: 30px 30px; mask-image: radial-gradient(circle at center, black 40%, transparent 100%);"></div>
            </div>

            <!-- 2. 内部布局：左右分栏 (Grid inside Grid) -->
            <div class="relative z-10 h-full grid grid-cols-1 md:grid-cols-2 p-6 md:p-8 gap-6">

              <!-- === 左侧：控制面板 === -->
              <div class="flex flex-col justify-between h-full">

                <!-- 顶部：Mini Header -->
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                    <svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div class="text-[10px] text-indigo-300 font-mono tracking-widest">DEEPSEEK_V3</div>
                    <div class="flex items-center gap-1.5">
                      <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span class="text-[9px] text-slate-400">System Online</span>
                    </div>
                  </div>
                </div>

                <!-- 中部：大标题与描述 -->
                <div class="space-y-4">
                  <h3 class="text-3xl font-bold text-white leading-tight">
                    智能对话<br>
                    <span class="text-indigo-400">思维引擎</span>
                  </h3>
                  <p class="text-sm text-slate-400 leading-relaxed max-w-[90%]">
                    不仅仅是聊天。体验全链路思维推理、代码生成与复杂逻辑解析。
                  </p>

                  <!-- 能力标签矩阵 -->
                  <div class="grid grid-cols-2 gap-2">
                    <div class="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-[10px] text-slate-300 flex items-center gap-2">
                      <svg class="w-3 h-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      逻辑推理
                    </div>
                    <div class="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-[10px] text-slate-300 flex items-center gap-2">
                      <svg class="w-3 h-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      代码生成
                    </div>
                    <div class="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-[10px] text-slate-300 flex items-center gap-2">
                      <svg class="w-3 h-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                      多模态
                    </div>
                    <div class="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-[10px] text-slate-300 flex items-center gap-2">
                      <svg class="w-3 h-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      实时流式
                    </div>
                  </div>
                </div>

                <!-- 底部：主要按钮 -->
                <div class="group/btn inline-flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-bold text-sm transition-all shadow-lg shadow-indigo-900/50 cursor-pointer">
                  <span>启动引擎</span>
                  <svg class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>

              <!-- === 右侧：动态数据看板 (填补空白的核心) === -->
              <div class="hidden md:flex flex-col gap-4 h-full">

                <!-- 上半部分：思维拓扑图 (SVG Visualization) -->
                <div class="flex-1 bg-slate-900/50 rounded-xl border border-white/5 p-4 relative overflow-hidden group-hover:border-indigo-500/20 transition-colors">
                  <!-- 标题 -->
                  <div class="absolute top-3 left-3 text-[9px] text-slate-500 font-mono">REASONING_TOPOLOGY</div>

                  <!-- 模拟节点动画 -->
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="relative w-32 h-32">
                      <!-- 中心节点 -->
                      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-600 rounded-full border-4 border-slate-900 z-10 animate-pulse"></div>

                      <!-- 环绕节点 1 -->
                      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-600 rounded-full animate-[bounce_2s_infinite]"></div>
                      <!-- 连线 1 -->
                      <div class="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-10 bg-indigo-500/30"></div>

                      <!-- 环绕节点 2 -->
                      <div class="absolute bottom-4 left-4 w-3 h-3 bg-slate-600 rounded-full animate-[bounce_2.5s_infinite]"></div>
                      <!-- 连线 2 -->
                      <div class="absolute bottom-8 left-8 w-8 h-0.5 bg-indigo-500/30 rotate-45 transform origin-right"></div>

                      <!-- 环绕节点 3 -->
                      <div class="absolute bottom-4 right-4 w-3 h-3 bg-slate-600 rounded-full animate-[bounce_3s_infinite]"></div>
                      <!-- 连线 3 -->
                      <div class="absolute bottom-8 right-8 w-8 h-0.5 bg-indigo-500/30 -rotate-45 transform origin-left"></div>

                      <!-- 扫描雷达圈 -->
                      <div class="absolute inset-[-20%] border border-indigo-500/20 rounded-full animate-[spin_8s_linear_infinite] border-dashed"></div>
                    </div>
                  </div>
                </div>

                <!-- 下半部分：终端日志 (Terminal) -->
                <div class="h-24 bg-black/40 rounded-xl border border-white/5 p-3 font-mono text-[9px] text-slate-400 overflow-hidden relative">
                  <div class="absolute top-2 right-2 flex gap-1">
                    <div class="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                    <div class="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                  </div>
                  <div class="space-y-1 opacity-70">
                    <p>> Init_Model(Deepseek-R1)... <span class="text-emerald-500">OK</span></p>
                    <p>> Load_Context_Window(128k)... <span class="text-emerald-500">OK</span></p>
                    <p>> Connecting to Neural_Net...</p>
                    <p class="text-indigo-400 animate-pulse">> Ready for input_</p>
                  </div>
                </div>

              </div>
            </div>
          </router-link>

          <!-- ==================== [Row 1 Right] 工具对 ==================== -->

          <!-- 2. AI 图像 (优化版：流体极光 + 智能取景框) -->
          <router-link to="/ai-image" class="group relative col-span-1 h-full min-h-[240px] bg-slate-900 rounded-[2.5rem] overflow-hidden border border-purple-500/20 hover:border-purple-400/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] transition-all duration-500">

            <!-- 1. 背景：高清流体数字艺术 -->
            <div class="absolute inset-0 overflow-hidden">
              <!-- 新背景图：使用更具科技感和艺术感的 3D 流体 -->
              <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700 ease-out" alt="AI Digital Art">

              <!-- 渐变遮罩：确保文字清晰，同时增加深邃感 -->
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-purple-900/10 mix-blend-multiply"></div>

              <!-- 动态网格覆盖 (Tech Grid) -->
              <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            </div>

            <!-- 2. 视觉主体：模拟 AI 取景框 (Focus Frame) -->
            <!-- 替代原来的问号图标，放在中间稍微偏上，暗示正在生成 -->
            <div class="absolute top-8 right-8 left-8 bottom-24 border border-white/10 rounded-lg pointer-events-none group-hover:border-purple-400/30 transition-colors duration-500">
              <!-- 四个角的对焦标记 -->
              <div class="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-white/30 rounded-tl-sm group-hover:border-purple-400"></div>
              <div class="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-white/30 rounded-tr-sm group-hover:border-purple-400"></div>
              <div class="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-white/30 rounded-bl-sm group-hover:border-purple-400"></div>
              <div class="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-white/30 rounded-br-sm group-hover:border-purple-400"></div>

              <!-- 悬浮的参数标签 (右上角) -->
              <div class="absolute top-2 right-2 flex flex-col items-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-2 group-hover:translate-x-0">
                <span class="px-1.5 py-0.5 bg-black/50 backdrop-blur-md border border-white/10 text-[8px] text-purple-300 rounded font-mono">UPSCALE: 4x</span>
                <span class="px-1.5 py-0.5 bg-black/50 backdrop-blur-md border border-white/10 text-[8px] text-purple-300 rounded font-mono">V6.0 RAW</span>
              </div>
            </div>

            <!-- 3. 内容区域 -->
            <div class="p-6 relative z-10 h-full flex flex-col justify-between">

              <!-- 顶部状态 (左上角) -->
              <div class="flex items-center gap-2 self-start px-2 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <div class="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></div>
                <span class="text-[9px] font-bold text-purple-100/80 tracking-wide uppercase">Imagine</span>
              </div>

              <!-- 底部文字信息 -->
              <div class="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <!-- 图标与标题组合 -->
                <div class="flex items-center gap-3 mb-2">
                  <div class="w-8 h-8 rounded-lg bg-purple-500/20 backdrop-blur-md flex items-center justify-center text-purple-300 border border-purple-500/30">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 class="text-lg font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                    灵感画板
                  </h3>
                </div>

                <p class="text-xs text-slate-300 opacity-80 pl-1 group-hover:text-white transition-colors">
                  输入文本，AI 即刻生成 4K 艺术画作
                </p>
              </div>
            </div>
          </router-link>

          <!-- 3. 提示词库 (重构版：暗金数据终端) -->
          <router-link to="/prompt-library" class="group relative col-span-1 h-full min-h-[240px] bg-slate-900 rounded-[2.5rem] overflow-hidden border border-amber-500/10 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-500">

            <!-- 1. 背景层：流动的代码雨/数据流 -->
            <div class="absolute inset-0 overflow-hidden opacity-20">
              <!-- 径向渐变背景 -->
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-900/40 via-slate-900 to-slate-900"></div>
              <!-- 装饰性字符背景 -->
              <div class="p-4 font-mono text-[10px] leading-tight text-amber-500/30 select-none overflow-hidden h-full mask-image-gradient-b">
                /imagine prompt: masterpiece, best quality, 8k, ray tracing, hdr, cyberpunk city... <br>
                --ar 16:9 --v 6.0 --style raw <br>
                /analyze image_weight: 0.5 <br>
                [System]: Loading prompt template... <br>
                { "category": "portrait", "style": "cyberpunk" } <br>
                /blend <span class="text-amber-400 opacity-50">rendering...</span>
              </div>
            </div>

            <!-- 2. 视觉主体：悬浮的“指令卡” -->
            <div class="absolute bottom-[-20px] right-[-20px] w-40 h-32 group-hover:-translate-y-4 group-hover:-translate-x-2 transition-transform duration-500 ease-out">
              <!-- 卡片 2 (底层) -->
              <div class="absolute top-4 left-6 w-full h-full bg-amber-900/20 backdrop-blur-sm border border-amber-500/10 rounded-xl rotate-6"></div>

              <!-- 卡片 1 (顶层) -->
              <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-500/30 rounded-xl shadow-2xl p-4 rotate-[-3deg] group-hover:rotate-0 transition-transform duration-500 flex flex-col gap-2">
                <!-- 模拟 Prompt 结构 -->
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-amber-500"></div>
                  <div class="h-1.5 w-1/2 bg-amber-500/20 rounded-full"></div>
                </div>
                <div class="h-1.5 w-full bg-slate-700 rounded-full"></div>
                <div class="h-1.5 w-3/4 bg-slate-700 rounded-full"></div>
                <!-- 标签 -->
                <div class="mt-auto flex gap-1">
                  <div class="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/30 text-[8px] text-amber-400 font-mono">--v 6</div>
                  <div class="px-1.5 py-0.5 rounded bg-slate-700 border border-slate-600 text-[8px] text-slate-400 font-mono">RAW</div>
                </div>
              </div>
            </div>

            <!-- 3. 内容区域 -->
            <div class="p-6 relative z-10 h-full flex flex-col justify-between pointer-events-none">

              <!-- 图标 -->
              <div class="w-10 h-10 rounded-xl bg-amber-500/10 backdrop-blur-md flex items-center justify-center text-amber-500 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)] group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>

              <!-- 文字 -->
              <div>
                <h3 class="text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">提示词宝库</h3>
                <p class="text-xs text-slate-400 group-hover:text-amber-100/70 transition-colors">
                  <span class="text-amber-500/80">></span> 结构化 Prompt 模板库
                </p>
              </div>
            </div>
          </router-link>

          <!-- ==================== [Row 2 Right] 变长游戏卡片 ==================== -->

          <!-- 4. 游戏 (终极版：史诗地牢 + 动态光影) -->
          <router-link to="/game" class="group relative col-span-1 md:col-span-2 lg:col-span-2 h-full bg-[#051014] rounded-[2.5rem] overflow-hidden border border-emerald-500/20 hover:border-emerald-400/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all duration-500 flex flex-row items-center">

            <!-- 1. 背景层：高清像素艺术 (Pixel Art) -->
            <div class="absolute inset-0 overflow-hidden">
              <!-- 底图：使用一张更有层次感、光影丰富的像素场景 -->
              <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-[2s] ease-out image-pixelated" style="image-rendering: pixelated; filter: contrast(1.2) hue-rotate(30deg);" alt="Epic Game World">

              <!-- 氛围遮罩：黑->透明->黑，聚焦中间 -->
              <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-[#064e3b]/40 to-black/60"></div>

              <!-- 动态悬浮粒子 (模拟萤火虫/魔法) -->
              <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
              <div class="absolute top-1/4 left-1/3 w-1 h-1 bg-emerald-400 rounded-full animate-ping"></div>
              <div class="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse delay-700"></div>

              <!-- CRT 扫描线 (保留，但减淡，增加细腻感) -->
              <div class="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))]" style="background-size: 100% 3px, 4px 100%; pointer-events: none;"></div>
            </div>

            <!-- 2. 左侧：游戏封面级排版 -->
            <div class="relative z-10 w-[45%] h-full flex flex-col justify-center px-8 space-y-4">
              <!-- 装饰性边框 -->
              <div class="absolute left-0 top-8 bottom-8 w-1 bg-gradient-to-b from-transparent via-emerald-500 to-transparent opacity-50"></div>

              <!-- 标题区 -->
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <span class="px-1.5 py-0.5 rounded-sm bg-emerald-500 text-black text-[9px] font-bold font-mono tracking-tighter">NEW</span>
                  <span class="text-[9px] text-emerald-300 font-mono tracking-widest">RPG ADVENTURE</span>
                </div>
                <h3 class="text-3xl font-black text-white italic tracking-tighter drop-shadow-[0_2px_0_rgba(0,0,0,1)] transform -skew-x-6">
                  SWORD<br>
                  <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500">LEGEND</span>
                </h3>
              </div>

              <!-- 按钮模拟 -->
              <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg group-hover:bg-emerald-500 group-hover:text-black group-hover:border-emerald-400 transition-all duration-300 w-fit cursor-pointer">
                <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span class="text-[10px] font-bold tracking-wide">PLAY NOW</span>
              </div>
            </div>

            <!-- 3. 右侧：全息装备展示 (Holo-Inventory) -->
            <div class="relative z-10 w-[55%] h-full flex items-center justify-center">
              <!-- 悬浮底座 -->
              <div class="absolute bottom-6 w-32 h-8 bg-black/40 blur-lg rounded-[100%] transform rotate-x-60"></div>

              <!-- 核心道具：3D 像素剑 (CSS 3D 旋转效果) -->
              <div class="relative w-32 h-32 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                <!-- 剑后的光环 -->
                <div class="absolute inset-0 bg-gradient-to-tr from-emerald-500/0 via-emerald-400/20 to-emerald-500/0 rounded-full animate-[spin_4s_linear_infinite]"></div>

                <!-- 剑本体 SVG -->
                <svg class="w-24 h-24 text-white drop-shadow-[0_5px_15px_rgba(16,185,129,0.6)] filter contrast-125" viewBox="0 0 24 24" fill="none">
                  <!-- 剑身 -->
                  <path d="M14 4L5.5 12.5L7.5 14.5L16 6L14 4Z" class="fill-slate-200 stroke-slate-900" stroke-width="0.5" />
                  <!-- 剑柄 -->
                  <path d="M4 14.5L6 12.5L8 14.5L6 16.5L4 14.5Z" class="fill-emerald-600 stroke-emerald-900" stroke-width="0.5" />
                  <!-- 剑格 -->
                  <path d="M15.5 5L18.5 2L22 5.5L19 8.5L15.5 5Z" class="fill-emerald-500 stroke-emerald-800" stroke-width="0.5" />
                  <!-- 能量纹路 -->
                  <path d="M12 7L7 12" stroke="#34d399" stroke-width="1.5" stroke-linecap="round" />
                </svg>

                <!-- 悬浮的属性标签 (Stats) -->
                <div class="absolute -right-4 top-4 space-y-1 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                  <div class="px-1.5 py-0.5 bg-black/60 backdrop-blur-sm border border-red-500/50 rounded text-[8px] text-red-300 font-mono font-bold">ATK +999</div>
                  <div class="px-1.5 py-0.5 bg-black/60 backdrop-blur-sm border border-yellow-500/50 rounded text-[8px] text-yellow-300 font-mono font-bold">LEGENDARY</div>
                </div>
              </div>
            </div>

          </router-link>

          <!-- ==================== [Row 3 Left] 变长列车卡片 ==================== -->

          <!-- 5. 第13号列车 (Sci-Fi) - 2列宽 -->
          <router-link to="/scenario" class="group relative col-span-1 md:col-span-2 lg:col-span-2 h-full bg-[#0B1120] rounded-[2.5rem] overflow-hidden border border-slate-800 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-500">
            <!-- 宽版背景：让隧道延伸感更强 -->
            <div class="absolute inset-0 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" class="w-full h-full object-cover opacity-40 mix-blend-screen transition-transform duration-[4s] ease-out group-hover:scale-110 group-hover:rotate-1" />
              <div class="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/60 to-blue-900/20"></div>
              <div class="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent w-full h-[20%] -translate-y-full group-hover:animate-scan"></div>
            </div>

            <!-- HUD 装饰 -->
            <div class="absolute inset-4 border border-white/5 rounded-2xl pointer-events-none">
              <div class="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-blue-500 rounded-tl-lg"></div>
              <div class="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-purple-500 rounded-br-lg"></div>
            </div>

            <div class="p-8 relative z-10 h-full flex flex-col justify-between">
              <div class="flex justify-between items-start">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-blue-500/10 backdrop-blur-md flex items-center justify-center text-blue-400 border border-blue-500/30"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg></div>
                  <span class="px-2 py-1 rounded bg-blue-500/20 border border-blue-500/30 text-[10px] text-blue-200 font-mono tracking-widest">SCENARIO_MODE</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] text-slate-500 font-mono group-hover:text-blue-300 transition-colors">STATUS: ONLINE</span>
                  <div class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                </div>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-white mb-2 tracking-tight"><span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-blue-200">第13号列车</span></h3>
                <p class="text-xs text-slate-400 max-w-[80%] group-hover:text-blue-200/80 transition-colors">
                  无限流交互式小说 · 沉浸体验 · 多分支结局
                </p>
              </div>
            </div>
          </router-link>

          <!-- ==================== [Row 3 Right] 收尾小卡片 ==================== -->

          <!-- 6. MCP 智能体 (1x1) -->
          <router-link to="/mcp-agent" class="group relative col-span-1 h-full bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-700/50 hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] transition-all duration-500">
            <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#22d3ee 1px, transparent 1px); background-size: 16px 16px;"></div>
            <div class="absolute -right-8 -bottom-8 w-32 h-32 border border-cyan-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
              <div class="w-20 h-20 border border-cyan-500/20 rounded-full border-dashed animate-[spin_10s_linear_infinite]"></div>
            </div>
            <div class="p-6 relative z-20 h-full flex flex-col justify-between">
              <div class="px-2 py-1 self-start rounded-full bg-cyan-950/50 border border-cyan-500/30 backdrop-blur-md flex items-center gap-2">
                <span class="relative flex h-1.5 w-1.5"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span><span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span></span>
                <span class="text-[9px] font-mono font-bold text-cyan-400 tracking-wider">MCP_V2</span>
              </div>
              <div>
                <h3 class="text-lg font-bold text-white mb-1">MCP 智能体</h3>
                <p class="text-[10px] text-slate-400">数据神经链路</p>
              </div>
            </div>
          </router-link>

          <!-- 7. 更多功能 (1x1) -->
          <div class="group relative col-span-1 h-full rounded-[2.5rem] overflow-hidden border border-slate-200 border-dashed hover:border-indigo-300 hover:border-solid transition-all duration-300 bg-slate-50/50 hover:bg-white hover:shadow-xl flex flex-col items-center justify-center">
            <div class="relative z-10 flex flex-col items-center transition-transform duration-300 group-hover:-translate-y-2">
              <div class="mb-3 relative">
                <div class="w-10 h-10 rounded-full border-2 border-slate-200 group-hover:border-indigo-200 transition-colors"></div>
                <div class="absolute top-0 left-0 w-10 h-10 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-500">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
              <h3 class="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">敬请期待</h3>
              <p class="text-[10px] text-slate-500 text-center mt-1">语音克隆 · 视频生成</p>
            </div>
          </div>

        </div>

      </section>

      <!-- 5. 代码展示：IDE 风格窗口 -->
      <section class="max-w-5xl mx-auto mb-16">
        <div class="bg-slate-900 rounded-[1.5rem] shadow-2xl shadow-slate-900/50 overflow-hidden ring-1 ring-white/10">

          <!-- 模拟 IDE 标题栏 -->
          <div class="flex items-center justify-between px-6 py-4 bg-slate-800/50 border-b border-white/5 backdrop-blur-sm">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <div class="text-xs font-mono text-slate-400">DeepseekIntegration.ts</div>
            <div class="w-10"></div> <!-- 占位 -->
          </div>

          <!-- 代码内容区，使用 grid 布局 -->
          <div class="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            <!-- Left Code -->
            <div class="p-6 md:p-8">
              <div class="flex items-center gap-2 mb-6">
                <span class="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-mono rounded border border-indigo-500/30">Client Mode</span>
              </div>
              <div class="relative group">
                <div class="absolute -inset-4 bg-indigo-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <pre class="relative text-sm font-mono leading-relaxed text-slate-300 overflow-x-auto"><code><span class="text-purple-400">import</span> DeepseekClient <span class="text-purple-400">from</span> <span class="text-green-400">'./services'</span>;

<span class="text-slate-500">// Initialize Client</span>
<span class="text-purple-400">const</span> client = <span class="text-purple-400">new</span> <span class="text-yellow-300">DeepseekClient</span>({
  apiKey: <span class="text-green-400">'sk-...'</span>,
  model: <span class="text-green-400">'deepseek-r1'</span>
});

<span class="text-purple-400">const</span> stream = <span class="text-purple-400">await</span> client.chat.completions.<span class="text-blue-400">create</span>({
  messages: [{ role: <span class="text-green-400">'user'</span>, content: <span class="text-green-400">'Hi'</span> }],
  stream: <span class="text-orange-400">true</span>
});</code></pre>
              </div>
            </div>

            <!-- Right Code -->
            <div class="p-6 md:p-8">
              <div class="flex items-center gap-2 mb-6">
                <span class="px-2 py-1 bg-violet-500/20 text-violet-300 text-xs font-mono rounded border border-violet-500/30">Adapter Mode</span>
              </div>
              <div class="relative group">
                <div class="absolute -inset-4 bg-violet-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <pre class="relative text-sm font-mono leading-relaxed text-slate-300 overflow-x-auto"><code><span class="text-purple-400">import</span> ai <span class="text-purple-400">from</span> <span class="text-green-400">'./adapter'</span>;

<span class="text-slate-500">// Vercel AI SDK Style</span>
<span class="text-purple-400">const</span> model = ai.<span class="text-blue-400">createModel</span>(<span class="text-green-400">"deepseek"</span>, {
  apiKey: process.env.API_KEY
});

<span class="text-purple-400">const</span> { dataStream } = <span class="text-purple-400">await</span> model.<span class="text-blue-400">streamText</span>({
  model: <span class="text-green-400">"deepseek-r1"</span>,
  messages: history
});</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer Simple -->
      <footer class="text-center text-slate-400 text-sm py-8 border-t border-slate-200/50">
        <p>© 2025 AI Vista Platform. Design for Future.</p>
      </footer>

    </div>
  </div>
</template>

<script setup lang="ts">
// Logic remains the same
</script>

<style scoped>
/* 添加到你的 CSS 文件或 style 标签中 */
@keyframes scan {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(500%);
  }
}
.animate-scan {
  animation: scan 2s linear infinite;
}

/* 
  高级动画与辅助样式 
  使用 CSS Keyframes 增加灵动感
*/

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 隐藏滚动条但保留功能，用于代码块 */
pre::-webkit-scrollbar {
  height: 6px;
}
pre::-webkit-scrollbar-track {
  background: transparent;
}
pre::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}
</style>

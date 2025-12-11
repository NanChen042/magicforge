<template>
  <div class="min-h-screen bg-[#F8FAFC] selection:bg-indigo-500/30 text-slate-800 font-sans">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  relative">
      <!-- Hero Refactored: 浅色科技风 + 边缘悬浮特效 -->
      <section class="relative pt-20 pb-32 lg:pt-32 lg:pb-40 text-center overflow-hidden">
        
        <!-- ==================== [新增] 1. 边缘酷炫特效层 ==================== -->
        <div class="absolute inset-0 z-0 pointer-events-none select-none">
          
          <!-- A. 左上角：悬浮的“玻璃逻辑卡片” (3D Floating Card) -->
          <!-- 仅在大屏显示，增加空间进深感 -->
          <div class="absolute top-10 left-[5%] lg:left-[10%] w-48 p-3 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(31,38,135,0.1)] -rotate-6 animate-float-slow hidden lg:block">
             <!-- 模拟代码块 -->
             <div class="flex items-center gap-2 mb-2">
               <div class="w-2 h-2 rounded-full bg-red-400"></div>
               <div class="w-2 h-2 rounded-full bg-yellow-400"></div>
               <div class="w-2 h-2 rounded-full bg-green-400"></div>
             </div>
             <div class="space-y-1.5">
               <div class="h-1.5 w-3/4 bg-slate-400/20 rounded-full"></div>
               <div class="h-1.5 w-1/2 bg-indigo-500/20 rounded-full"></div>
               <div class="h-1.5 w-5/6 bg-slate-400/20 rounded-full"></div>
             </div>
             <!-- 装饰光泽 -->
             <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent rounded-2xl pointer-events-none"></div>
          </div>

          <!-- B. 右上角：动态“神经轨道” (Spinning Orbits) -->
          <div class="absolute -top-20 -right-20 w-[500px] h-[500px] opacity-30">
             <!-- 轨道 1 -->
             <div class="absolute inset-0 border border-indigo-200/40 rounded-full animate-spin-slower border-dashed"></div>
             <!-- 轨道 2 (反向) -->
             <div class="absolute inset-[15%] border border-violet-200/40 rounded-full animate-reverse-spin border-dotted"></div>
             <!-- 核心光晕 -->
             <div class="absolute inset-[30%] bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full blur-2xl"></div>
          </div>

          <!-- C. 散落的“科技锚点” (Tech Decorators) -->
          <!-- 十字准星 + -->
          <svg class="absolute top-24 right-[15%] w-6 h-6 text-slate-200" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z"/></svg>
          <svg class="absolute bottom-24 left-[10%] w-4 h-4 text-slate-200" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z"/></svg>
          <!-- 刻度线 -->
          <div class="absolute bottom-10 right-10 flex gap-2">
             <div class="w-1 h-4 bg-slate-200"></div>
             <div class="w-1 h-2 bg-slate-200 mt-2"></div>
             <div class="w-1 h-4 bg-slate-200"></div>
          </div>
        </div>

        <!-- ==================== 2. 原有背景装饰 (保留光晕) ==================== -->
        <div class="absolute inset-0 -z-10 pointer-events-none">
           <div class="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px] mix-blend-multiply animate-blob"></div>
           <div class="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>

        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <!-- 顶部胶囊 -->
          <div class="inline-flex items-center justify-center mb-8 animate-fade-in-up">
            <a href="#" class="group relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:border-indigo-300 transition-all duration-300">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span>
              <span class="text-xs font-semibold text-slate-600 group-hover:text-indigo-600 transition-colors uppercase tracking-wide">AI Vista 2.0</span>
              <span class="text-slate-300 mx-1">|</span>
              <span class="text-xs text-slate-500">System Upgrade Available</span>
            </a>
          </div>

          <!-- 主标题 -->
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1] animate-fade-in-up animation-delay-200">
            重塑
            <span class="relative whitespace-nowrap inline-block">
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 animate-gradient-x font-extrabold">
                数字创造力
              </span>
              <!-- 标题背景光晕增强 -->
              <span class="absolute -inset-x-8 -inset-y-6 bg-indigo-400/10 blur-2xl -z-10 rounded-full mix-blend-multiply"></span>
            </span>
            <br class="hidden sm:block" />
            的无限边界
          </h1>

          <!-- 副标题 -->
          <p class="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed font-normal animate-fade-in-up animation-delay-400">
            下一代企业级智能引擎。
            <span class="text-slate-900 font-medium decoration-indigo-200/50 underline underline-offset-4">零延迟</span> 流式响应，
            <span class="text-slate-900 font-medium decoration-indigo-200/50 underline underline-offset-4">全链路</span> 思维推理。
            为开发者打造的极致体验。
          </p>

          <!-- 按钮组 -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-600">
            <router-link to="/api-demo" class="group relative px-8 py-3.5 bg-slate-900 text-white rounded-xl font-medium shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-indigo-900/20 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
              <span class="relative flex items-center gap-2">
                开始构建
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </router-link>

            <router-link to="/prompt-library" class="group px-8 py-3.5 bg-white text-slate-700 rounded-xl font-medium border border-slate-200 shadow-sm hover:border-indigo-200 hover:text-indigo-600 transition-all duration-300">
              <span class="flex items-center gap-2">
                 <svg class="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 6.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 6.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 6.253" />
                 </svg>
                 浏览提示库
              </span>
            </router-link>
          </div>

          <!-- 底部数据背书 -->
          <div class="mt-16 pt-8 border-t border-slate-200/60 flex flex-col md:flex-row items-center justify-center gap-8 animate-fade-in-up animation-delay-600">
             <div class="flex items-center gap-2 text-slate-500 text-sm font-medium">
               <div class="flex -space-x-2">
                 <div class="w-6 h-6 rounded-full bg-slate-200 border-2 border-white"></div>
                 <div class="w-6 h-6 rounded-full bg-slate-300 border-2 border-white"></div>
                 <div class="w-6 h-6 rounded-full bg-slate-400 border-2 border-white"></div>
               </div>
               <span>2,000+ 开发者正在使用</span>
             </div>
          </div>

        </div>
      </section>








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

        <!-- 标题区 (重构版：旗舰级排版) -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 relative z-10">

          <!-- 左侧：标题核心 -->
          <div class="max-w-2xl relative">
            <!-- 装饰：左侧竖线光标 -->
            <div class="absolute -left-6 top-2 w-1 h-12 bg-gradient-to-b from-indigo-500 to-violet-500 rounded-full hidden lg:block"></div>

            <!-- 眉题 Tag -->
            <div class="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/80 border border-indigo-100 backdrop-blur-sm shadow-sm">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span class="text-xs font-semibold text-indigo-600 tracking-wide uppercase">Capabilities Matrix</span>
            </div>

            <!-- 主标题 -->
            <h2 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-[1.2]">
              释放 AI 的
              <span class="relative inline-block">
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 animate-gradient-x">
                  多元潜能
                </span>
                <!-- 科技感下划线 -->
                <svg class="absolute -bottom-2 left-0 w-full h-2 text-indigo-500/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="4 2" />
                </svg>
              </span>
            </h2>

            <!-- 描述文案 -->
            <p class="text-lg text-slate-500 leading-relaxed font-light">
              精心打造的功能矩阵。从<span class="text-slate-800 font-medium">自然语言处理</span>到<span class="text-slate-800 font-medium">多模态创作</span>，为您提供一站式、企业级的智能体验。
            </p>
          </div>

          <!-- 右侧：高级交互按钮 -->
          <a href="#" class="group flex items-center justify-between gap-4 px-6 py-3 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 min-w-[180px]">
            <div class="flex flex-col">
              <span class="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">查看完整文档</span>
              <span class="text-[10px] text-slate-400 font-mono">DOCS & API REF</span>
            </div>

            <!-- 箭头图标容器 -->
            <div class="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-indigo-600 flex items-center justify-center transition-all duration-300 group-hover:rotate-45">
              <svg class="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
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

          <!-- 6. MCP 智能体 (重构版：全息数据枢纽) -->
          <router-link to="/mcp-agent" class="group relative col-span-1 h-full bg-[#081018] rounded-[2.5rem] overflow-hidden border border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] transition-all duration-500">

            <!-- 1. 背景：电路板纹理 -->
            <div class="absolute inset-0 overflow-hidden">
              <!-- 基础底色 -->
              <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/40 via-[#081018] to-[#081018]"></div>

              <!-- 电路网格 -->
              <div class="absolute inset-0 opacity-20" style="background-image: linear-gradient(rgba(34,211,238,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.1) 1px, transparent 1px); background-size: 20px 20px;">
              </div>

              <!-- 扫描光波 -->
              <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-cyan-500/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]"></div>
            </div>

            <!-- 2. 视觉主体：核心与卫星节点 (Hub & Spoke) -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">

              <!-- 旋转轨道 -->
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-cyan-500/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border border-dashed border-cyan-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

              <!-- 中心核心 (Core) -->
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-cyan-900/80 backdrop-blur-md border border-cyan-400 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)] group-hover:scale-110 transition-transform duration-500 z-10">
                <svg class="w-6 h-6 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>

              <!-- 卫星节点 1 (Local File) -->
              <div class="absolute top-1/3 left-1/4 w-8 h-8 bg-slate-800/80 border border-cyan-500/30 rounded-lg flex items-center justify-center animate-bounce duration-[3000ms]">
                <svg class="w-3 h-3 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <!-- 连线 1 -->
              <div class="absolute top-[42%] left-[32%] w-12 h-[1px] bg-cyan-500/30 rotate-12 origin-right"></div>

              <!-- 卫星节点 2 (Tools) -->
              <div class="absolute bottom-1/3 right-1/4 w-8 h-8 bg-slate-800/80 border border-cyan-500/30 rounded-lg flex items-center justify-center animate-bounce duration-[4000ms]">
                <svg class="w-3 h-3 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <!-- 连线 2 -->
              <div class="absolute bottom-[42%] right-[32%] w-12 h-[1px] bg-cyan-500/30 -rotate-12 origin-left"></div>

            </div>

            <!-- 3. 内容区域 -->
            <div class="p-6 relative z-20 h-full flex flex-col justify-between">

              <!-- 顶部 Tag -->
              <div class="flex items-center justify-between">
                <div class="px-2 py-1 rounded-md bg-cyan-950/50 border border-cyan-500/30 backdrop-blur-md flex items-center gap-2">
                  <span class="relative flex h-1.5 w-1.5"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span><span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span></span>
                  <span class="text-[9px] font-mono font-bold text-cyan-400 tracking-wider">PROTOCOL_V2</span>
                </div>
                <!-- 连接数 -->
                <span class="text-[9px] font-mono text-cyan-600/80 group-hover:text-cyan-400 transition-colors">LINKED: 3</span>
              </div>

              <!-- 底部文字 -->
              <div class="bg-slate-900/60 backdrop-blur-sm p-3 rounded-xl border border-white/5 group-hover:bg-slate-900/80 transition-colors">
                <h3 class="text-lg font-bold text-white mb-1 flex items-center gap-2">
                  MCP 智能体
                  <svg class="w-3 h-3 text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </h3>
                <p class="text-[10px] text-slate-400 leading-snug group-hover:text-cyan-100/70 transition-colors">
                  打通本地数据与 AI 的神经链路
                </p>
              </div>
            </div>
          </router-link>


          <!-- 7. 更多功能 (优化版：无冲突·状态切换) -->
          <div class="group relative col-span-1 h-full rounded-[2.5rem] overflow-hidden border border-slate-800 bg-[#0F172A] hover:border-indigo-500/30 transition-all duration-500">

            <!-- 1. 背景：深邃网格 -->
            <div class="absolute inset-0">
              <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]" style="background-size: 20px 20px;"></div>
              <!-- 默认微光 -->
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-colors duration-500"></div>
            </div>

            <!-- 2. 核心内容容器 (Flex 居中) -->
            <div class="absolute inset-0 flex flex-col items-center justify-center z-10">

              <!-- A. 能量立方 (上浮 + 缩小) -->
              <div class="relative w-12 h-12 perspective-1000 transition-all duration-500 ease-out group-hover:-translate-y-6 group-hover:scale-75">
                <!-- 外壳 -->
                <div class="absolute w-full h-full border border-indigo-500/30 bg-indigo-500/5 backdrop-blur-sm animate-[spin_8s_linear_infinite] transform-style-3d"></div>
                <!-- 内核 -->
                <div class="absolute w-8 h-8 top-2 left-2 border border-white/20 bg-white/5 animate-[spin_4s_linear_infinite_reverse]"></div>
                <!-- 锁图标 -->
                <div class="absolute inset-0 flex items-center justify-center text-indigo-300/50">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>

              <!-- B. 状态文字切换区 -->
              <div class="relative h-8 mt-4 w-full flex justify-center">

                <!-- 状态 1: 默认显示 (Hover 时消失) -->
                <div class="absolute top-0 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2">
                  <h3 class="text-xs font-bold text-slate-400 tracking-widest uppercase text-center">Coming Soon</h3>
                  <div class="w-8 h-0.5 bg-slate-700 mx-auto mt-2 rounded-full"></div>
                </div>

                <!-- 状态 2: 悬浮显示 (Hover 时出现) -->
                <div class="absolute top-0 flex flex-col items-center gap-2 transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                  <!-- 功能标签 1 -->
                  <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                    <svg class="w-3 h-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    <span class="text-[10px] text-indigo-300 font-mono">Voice Cloning</span>
                  </div>
                  <!-- 功能标签 2 -->
                  <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <svg class="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span class="text-[10px] text-purple-300 font-mono">Video Gen</span>
                  </div>
                </div>

              </div>
            </div>

            <!-- 3. 装饰：角落对角线 -->
            <div class="absolute bottom-3 right-3 text-slate-800">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M20 20L10 20L20 10L20 20Z" fill="currentColor" />
              </svg>
            </div>

          </div>

        </div>

      </section>

      <!-- 5. 代码展示：IDE 风格窗口 -->
   <section class="max-w-5xl mx-auto mb-8 relative z-20">
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

         <!-- Footer Refactored: 增加内容密度，减少空洞感，保持极简科技风 -->
      <footer class="relative z-10 border-t border-slate-200/60 bg-white/60 backdrop-blur-xl pt-12 pb-8 mt-0">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- 上半部分：多列导航布局 -->
          <div class="grid grid-cols-2 md:grid-cols-12 gap-8 mb-12">
            
            <!-- Column 1: 品牌核心 (占据较宽位置) -->
            <div class="col-span-2 md:col-span-4">
              <div class="flex items-center gap-2 mb-4">
                <span class="relative flex h-3 w-3">
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                </span>
                <span class="text-lg font-bold text-slate-900 tracking-tight">AI Vista</span>
              </div>
              <p class="text-sm text-slate-500 leading-relaxed max-w-xs mb-6">
                构建下一代认知智能基础设施。从大语言模型推理到多模态生成，探索数字创造力的无限边界。
              </p>
              <!-- 社交图标组 -->
              <div class="flex gap-4">
                <a href="#" class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-indigo-500 hover:text-white transition-all duration-300">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-black hover:text-white transition-all duration-300">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>

            <!-- Column 2: 产品 -->
            <div class="col-span-1 md:col-span-2">
              <h4 class="text-sm font-bold text-slate-900 mb-4 tracking-wide">产品矩阵</h4>
              <ul class="space-y-3">
                <li><a href="#" class="text-sm text-slate-500 hover:text-indigo-600 transition-colors">智能对话 (Chat)</a></li>
                <li><a href="#" class="text-sm text-slate-500 hover:text-indigo-600 transition-colors">图像生成 (Image)</a></li>
                <li><a href="#" class="text-sm text-slate-500 hover:text-indigo-600 transition-colors">互动游戏 (Game)</a></li>
                <li><a href="#" class="text-sm text-slate-500 hover:text-indigo-600 transition-colors">API 服务</a></li>
              </ul>
            </div>

            <!-- Column 3: 开发者 -->
            <div class="col-span-1 md:col-span-2">
              <h4 class="text-sm font-bold text-slate-900 mb-4 tracking-wide">开发者</h4>
              <ul class="space-y-3">
                <li><a href="#" class="text-sm text-slate-500 hover:text-indigo-600 transition-colors">文档中心</a></li>
                <li><a href="#" class="text-sm text-slate-500 hover:text-indigo-600 transition-colors">SDK 下载</a></li>
                <li><a href="#" class="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Prompt 库</a></li>
                <li><a href="#" class="text-sm text-slate-500 hover:text-indigo-600 transition-colors">状态监控</a></li>
              </ul>
            </div>

            <!-- Column 4: 公司 -->
            <div class="col-span-1 md:col-span-2">
              <h4 class="text-sm font-bold text-slate-900 mb-4 tracking-wide">关于</h4>
              <ul class="space-y-3">
                <li><a href="#" class="text-sm text-slate-500 hover:text-indigo-600 transition-colors">关于我们</a></li>
                <li><a href="#" class="text-sm text-slate-500 hover:text-indigo-600 transition-colors">官方博客</a></li>
                <li><a href="#" class="text-sm text-slate-500 hover:text-indigo-600 transition-colors">加入我们</a></li>
                <li><a href="#" class="text-sm text-slate-500 hover:text-indigo-600 transition-colors">联系方式</a></li>
              </ul>
            </div>

            <!-- Column 5: 订阅 (紧凑版) -->
            <div class="col-span-1 md:col-span-2">
              <h4 class="text-sm font-bold text-slate-900 mb-4 tracking-wide">动态</h4>
              <div class="flex flex-col gap-2">
                <span class="text-xs text-slate-400">订阅我们的开发者周刊</span>
                <div class="flex gap-2">
                  <input type="email" placeholder="Email" class="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors">
                  <button class="px-3 py-2 bg-slate-900 text-white rounded-lg hover:bg-indigo-600 transition-colors">
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </button>
                </div>
              </div>
            </div>

          </div>

          <!-- 下半部分：版权与法律条款 (更紧凑的分割线) -->
          <div class="pt-8 border-t border-slate-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-xs text-slate-400 font-medium">© 2025 AI Vista Inc. Design for Future.</p>
            <div class="flex gap-6">
              <a href="#" class="text-xs text-slate-400 hover:text-indigo-600 transition-colors">隐私政策</a>
              <a href="#" class="text-xs text-slate-400 hover:text-indigo-600 transition-colors">服务条款</a>
              <a href="#" class="text-xs text-slate-400 hover:text-indigo-600 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>


    </div>
  </div>
</template>

<script setup lang="ts">
// Logic remains the same
</script>

<style scoped>
/* 1. 缓慢缩放：让背景图看起来像是在缓缓移动 */
@keyframes slowZoom {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
.animate-slow-zoom {
  animation: slowZoom 20s ease-in-out infinite;
}

/* 2. 扫描线动画：模拟科幻扫描 */
@keyframes scan {
  0% { transform: translateY(-100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(100%); opacity: 0; }
}
.animate-scan {
  animation: scan 4s linear infinite;
}
/* 按钮内部微光划过 */
@keyframes shine {
  100% { transform: translateX(100%); }
}
.group-hover\:animate-shine:hover {
  animation: shine 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 基础淡入动画 */
.animate-fade-in-up {
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(15px); /* 移动距离也变小了，更细腻 */
}
@keyframes fadeInUp {
  to { opacity: 1; transform: translateY(0); }
}

/* 延迟 */
.animation-delay-200 { animation-delay: 0.15s; }
.animation-delay-400 { animation-delay: 0.3s; }
.animation-delay-600 { animation-delay: 0.45s; }

/* 文字流光 */
.animate-gradient-x {
  background-size: 200% auto;
  animation: gradientX 3s linear infinite;
}
@keyframes gradientX {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

/* 2. 网格流动动画 (模拟前进感) */
@keyframes gridFlow {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 0 40px;
  }
}

.animate-grid-flow {
  animation: gridFlow 3s linear infinite;
}

/* 3. 数据流下落动画 */
@keyframes drop {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(500%);
  }

  /* 跑出屏幕 */
}

.animate-drop {
  animation: drop 4s cubic-bezier(0.4, 0.26, 0, 0.97) infinite;
}

/* 辅助延迟类 */
.animation-delay-2000 {
  animation-delay: 2s;
}

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

/* 1. 悬浮动画 (上下浮动) */
@keyframes floatSlow {
  0%, 100% { transform: translateY(0) rotate(-6deg); }
  50% { transform: translateY(-15px) rotate(-3deg); }
}
.animate-float-slow {
  animation: floatSlow 6s ease-in-out infinite;
}

/* 2. 极慢速旋转 (顺时针) */
@keyframes spinSlower {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slower {
  animation: spinSlower 20s linear infinite;
}

/* 3. 极慢速旋转 (逆时针) */
@keyframes reverseSpin {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}
.animate-reverse-spin {
  animation: reverseSpin 25s linear infinite;
}

/* 之前的动画保持不变 */
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}
@keyframes fadeInUp {
  to { opacity: 1; transform: translateY(0); }
}
.animate-blob {
  animation: blob 7s infinite;
}
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
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

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

      <!-- 2. API Showcase：采用 BENTO GRID 风格，更现代 -->
      <section class="mb-24">
        <div class="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-2 border border-white/40 shadow-2xl shadow-slate-200/50">
          <div class="bg-white/50 rounded-[2rem] p-8 md:p-12 border border-slate-100/50 overflow-hidden relative">

            <!-- 标题区 -->
            <div class="relative z-10 text-center mb-12">
              <h2 class="text-3xl font-bold text-slate-900 mb-4">开发者优先的接口设计</h2>
              <p class="text-slate-500">统一的 API 规范，无缝对接 Deepseek 等主流模型</p>
            </div>

            <!-- 卡片网格 -->
            <div class="grid md:grid-cols-2 gap-6 relative z-10">
              <!-- Card 1 -->
              <div class="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-100 transition-all duration-500 relative overflow-hidden">
                <div class="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" class="text-indigo-500">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM12 7l-5 5 5 5 1.4-1.4L10.8 13H17v-2h-6.2l2.6-2.6L12 7z" />
                  </svg>
                </div>
                <div class="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-slate-900 mb-2">DeepseekClient</h3>
                <p class="text-sm text-slate-500 leading-relaxed mb-4">
                  专为 OpenAI 格式兼容性打造。原生支持流式传输 (Stream) 与思维链 (Chain of Thought) 解析，迁移零成本。
                </p>
                <div class="flex gap-2">
                  <span class="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">OpenAI 兼容</span>
                  <span class="text-xs font-medium px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-md">流式支持</span>
                </div>
              </div>

              <!-- Card 2 -->
              <div class="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-violet-500/5 hover:border-violet-100 transition-all duration-500 relative overflow-hidden">
                <div class="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" class="text-violet-500">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                  </svg>
                </div>
                <div class="w-12 h-12 bg-violet-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-6 h-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-slate-900 mb-2">DeepseekAdapter</h3>
                <p class="text-sm text-slate-500 leading-relaxed mb-4">
                  面向 Vercel AI SDK 风格的适配器。使用 `createModel` 模式，为 Next.js/Nuxt 等现代框架提供极致的开发体验。
                </p>
                <div class="flex gap-2">
                  <span class="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">Vercel 风格</span>
                  <span class="text-xs font-medium px-2.5 py-1 bg-violet-50 text-violet-600 rounded-md">极简配置</span>
                </div>
              </div>
            </div>

            <!-- 背景装饰 -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-indigo-50/50 via-transparent to-violet-50/50 pointer-events-none -z-0 blur-3xl"></div>
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

        <!-- Bento Grid 布局：高度定制化 -->
        <div class="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 grid-rows-auto gap-6">

          <!-- 1. 核心卡片：AI 对话 (占据左侧大面积，强调 UI 模拟) -->
          <router-link to="/api-demo" class="group relative col-span-1 md:col-span-6 lg:col-span-8 row-span-2 bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 hover:shadow-indigo-500/10 transition-all duration-500 border border-slate-800">
            <!-- 背景光效 -->
            <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/30 transition-colors duration-500"></div>

            <div class="relative h-full flex flex-col md:flex-row">
              <!-- 文字区 -->
              <div class="p-10 md:p-12 md:w-1/2 flex flex-col justify-between z-10">
                <div>
                  <div class="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6 backdrop-blur-sm border border-indigo-500/30">
                    <svg class="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h3 class="text-3xl font-bold text-white mb-4">智能对话引擎</h3>
                  <p class="text-slate-400 leading-relaxed mb-8">
                    接入 Deepseek-R1 等顶尖模型，体验毫秒级流式响应。支持思维链可视化，让 AI 的思考过程触手可及。
                  </p>
                </div>
                <div class="flex items-center gap-3 text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  系统在线 · 响应时间 < 50ms </div>
                </div>

                <!-- 模拟 UI 展示区 (右侧/下方) -->
                <div class="relative md:w-1/2 h-64 md:h-auto bg-slate-800/50 border-t md:border-t-0 md:border-l border-white/5 backdrop-blur-sm p-6 overflow-hidden">
                  <!-- 模拟聊天气泡 -->
                  <div class="space-y-4 absolute top-8 left-8 right-8 transition-transform duration-500 group-hover:-translate-y-4">
                    <!-- User Bubble -->
                    <div class="flex justify-end">
                      <div class="bg-indigo-600 text-white px-4 py-3 rounded-2xl rounded-tr-sm text-sm shadow-lg max-w-[80%]">
                        帮我写一个 Python 爬虫脚本
                      </div>
                    </div>
                    <!-- AI Bubble -->
                    <div class="flex justify-start">
                      <div class="bg-slate-700 text-slate-200 px-4 py-3 rounded-2xl rounded-tl-sm text-sm shadow-lg max-w-[90%] border border-white/5">
                        <p class="mb-2 text-xs text-indigo-400 font-mono">Thinking...</p>
                        <div class="flex gap-1 items-center h-4">
                          <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                          <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                          <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                        </div>
                      </div>
                    </div>
                    <!-- Code Snippet (Fake) -->
                    <div class="flex justify-start opacity-50 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      <div class="w-full bg-[#1e1e1e] rounded-xl p-3 border border-white/10">
                        <div class="flex gap-1.5 mb-2">
                          <div class="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                          <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                          <div class="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                        </div>
                        <div class="h-2 w-1/2 bg-slate-700 rounded mb-1.5"></div>
                        <div class="h-2 w-3/4 bg-slate-700 rounded mb-1.5"></div>
                        <div class="h-2 w-2/3 bg-slate-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </router-link>
          <!-- 2. AI 图像生成 (修复版) -->
          <router-link to="/ai-image" class="group relative col-span-1 md:col-span-3 lg:col-span-4 h-[300px] md:h-full min-h-[300px] rounded-[2.5rem] overflow-hidden border border-slate-200 transition-all duration-300 hover:shadow-xl hover:border-purple-200">
            <!-- 1. 动态放大背景图 -->
            <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop" alt="AI Art" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

            <!-- 2. 渐变遮罩 (加深底部，确保文字清晰) -->
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>

            <!-- 3. 内容区域 -->
            <div class="absolute bottom-0 left-0 p-8 w-full z-10">
              <!-- 图标容器 -->
              <div class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 border border-white/20 shadow-lg group-hover:bg-purple-500 group-hover:border-purple-500 group-hover:text-white transition-all duration-300 text-purple-100">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>

              <!-- 标题与描述 -->
              <h3 class="text-2xl font-bold text-white mb-2 tracking-tight">灵感画板</h3>
              <p class="text-sm text-slate-300 line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100 group-hover:text-white transition-opacity">
                输入文字描述，AI 将为您即刻生成 4K 级艺术画作，支持多种艺术风格。
              </p>
            </div>
          </router-link>

          <!-- 3. 提示词库 (模拟卡片堆叠效果) -->
          <router-link to="/prompt-library" class="group relative col-span-1 md:col-span-3 lg:col-span-4 h-[240px] bg-[#FFF8F0] rounded-[2.5rem] overflow-hidden border border-orange-100 hover:border-orange-200 transition-colors">
            <div class="p-8 relative z-10">
              <div class="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center mb-3 text-orange-600">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-1">提示词宝库</h3>
              <p class="text-sm text-slate-500">精选优质 Prompt 模板</p>
            </div>

            <!-- 装饰性卡片堆叠 -->
            <div class="absolute bottom-[-40px] right-[-20px] w-48 h-40 transition-transform duration-300 group-hover:-translate-y-2 group-hover:-translate-x-2">
              <!-- Card 3 -->
              <div class="absolute top-0 left-8 w-full h-full bg-orange-200 rounded-2xl shadow-sm rotate-6"></div>
              <!-- Card 2 -->
              <div class="absolute top-2 left-4 w-full h-full bg-orange-100 rounded-2xl shadow-sm rotate-3"></div>
              <!-- Card 1 -->
              <div class="absolute top-4 left-0 w-full h-full bg-white border border-orange-100 rounded-2xl shadow-md p-4 flex flex-col gap-2">
                <div class="h-2 w-1/3 bg-slate-200 rounded-full"></div>
                <div class="h-2 w-full bg-slate-100 rounded-full"></div>
                <div class="h-2 w-2/3 bg-slate-100 rounded-full"></div>
              </div>
            </div>
          </router-link>

          <!-- 4. 游戏 (Retro 风格) -->
          <router-link to="/game" class="group relative col-span-1 md:col-span-3 lg:col-span-4 h-[240px] bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-800 hover:ring-2 hover:ring-emerald-500/50 transition-all">
            <!-- 像素网格背景 -->
            <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMC41Ij48cGF0aCBkPSJNMCAwaDIwdjIwSDB6Ii8+PC9zdmc+')] opacity-20"></div>

            <div class="absolute inset-0 bg-gradient-to-tr from-emerald-900/20 to-transparent"></div>

            <div class="p-8 relative z-10 h-full flex flex-col justify-between">
              <div>
                <div class="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-3 text-emerald-400 border border-emerald-500/30">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-white mb-1">剑道传奇</h3>
              </div>

              <div class="font-mono text-xs text-emerald-400 bg-black/40 p-3 rounded-lg border border-emerald-500/20 shadow-inner">
                > START_GAME<br>
                > 正在加载世界观...<br>
                <span class="animate-pulse">> _</span>
              </div>
            </div>
          </router-link>
          <!-- 4.5. 新增：第13号列车 (科幻 HUD 风格) -->
          <router-link to="/scenario" class="group relative col-span-1 md:col-span-3 lg:col-span-4 h-[240px] bg-[#0B1120] rounded-[2.5rem] overflow-hidden border border-slate-800 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-500">

            <!-- 1. 背景层：量子隧道 -->
            <div class="absolute inset-0 overflow-hidden">
              <!-- 图片：抽象科幻隧道/光速 -->
              <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" class="w-full h-full object-cover opacity-40 mix-blend-screen transition-transform duration-[3s] ease-out group-hover:scale-125 group-hover:rotate-1" alt="Sci-Fi Tunnel" />

              <!-- 渐变叠加：深邃蓝紫 -->
              <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0B1120]/80 to-blue-900/20"></div>

              <!-- 动态扫描线 (Sci-Fi Scanline) -->
              <div class="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent w-full h-[20%] -translate-y-full group-hover:animate-scan"></div>
            </div>

            <!-- 2. HUD 装饰层 (四个角的科技边框) -->
            <div class="absolute inset-4 border border-white/5 rounded-2xl pointer-events-none">
              <!-- 左上角 -->
              <div class="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-blue-500 rounded-tl-lg transition-all group-hover:w-8 group-hover:h-8"></div>
              <!-- 右上角 -->
              <div class="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-purple-500 rounded-tr-lg transition-all group-hover:w-8 group-hover:h-8"></div>
              <!-- 左下角 -->
              <div class="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-blue-500 rounded-bl-lg transition-all group-hover:w-8 group-hover:h-8"></div>
              <!-- 右下角 -->
              <div class="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-purple-500 rounded-br-lg transition-all group-hover:w-8 group-hover:h-8"></div>
            </div>

            <!-- 3. 内容区域 -->
            <div class="p-8 relative z-10 h-full flex flex-col justify-between">

              <!-- 顶部：全息标签 -->
              <div class="flex justify-between items-start">
                <div class="w-10 h-10 rounded-xl bg-blue-500/10 backdrop-blur-md flex items-center justify-center text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <!-- 图标：无限循环/量子 -->
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>

                <!-- 状态指示灯 -->
                <div class="flex items-center gap-2 px-2 py-1 bg-black/40 rounded-full border border-white/10 backdrop-blur-sm">
                  <span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                  <span class="text-[10px] font-mono text-blue-200 tracking-wider">ONLINE</span>
                </div>
              </div>

              <!-- 底部：文字信息 -->
              <div class="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 class="text-xl font-bold text-white mb-1 tracking-tight drop-shadow-lg">
                  <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-blue-200">第13号列车</span>
                </h3>

                <div class="flex items-center justify-between">
                  <p class="text-xs text-slate-400 font-sans tracking-wide group-hover:text-blue-200/80 transition-colors">
                    沉浸式互动剧情体验
                  </p>

                  <!-- 箭头 -->
                  <span class="text-blue-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </router-link>

          <!-- 5. MCP 智能体 (深空数据流风格) -->
          <router-link to="/mcp-agent" class="group relative col-span-1 md:col-span-3 lg:col-span-4 h-[240px] bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-700/50 hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] transition-all duration-500">

            <!-- 1. 背景：精密点阵网格 -->
            <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#22d3ee 1px, transparent 1px); background-size: 20px 20px;">
            </div>

            <!-- 2. 动态光晕 (呼吸效果) -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/20 rounded-full blur-[60px] group-hover:bg-cyan-400/30 transition-all duration-700"></div>

            <!-- 3. 右侧装饰：旋转的协议环 (模拟接口连接) -->
            <div class="absolute -right-12 -bottom-12 w-64 h-64 border border-cyan-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
              <!-- 内环 -->
              <div class="w-48 h-48 border border-cyan-500/20 rounded-full border-dashed animate-[spin_10s_linear_infinite]"></div>
              <!-- 核心点 -->
              <div class="absolute w-full h-full flex justify-center items-center">
                <div class="w-24 h-24 bg-gradient-to-tr from-slate-800 to-slate-900 rounded-full border border-cyan-500/30 shadow-inner flex items-center justify-center z-10">
                  <svg class="w-10 h-10 text-cyan-400 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- 4. 内容区域 -->
            <div class="p-8 relative z-20 h-full flex flex-col justify-between">

              <!-- 顶部 Tag -->
              <div class="flex items-start">
                <div class="px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 backdrop-blur-md flex items-center gap-2">
                  <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  <span class="text-[10px] font-mono font-bold text-cyan-400 tracking-wider">PROTOCOL_V2</span>
                </div>
              </div>

              <!-- 底部文字 -->
              <div>
                <h3 class="text-2xl font-bold text-white mb-2 tracking-tight flex items-center gap-2">
                  MCP 智能体
                  <svg class="w-4 h-4 text-cyan-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </h3>
                <p class="text-sm text-slate-400 group-hover:text-cyan-100/80 transition-colors leading-relaxed">
                  构建 AI 与本地数据的<br>
                  <span class="text-cyan-400 font-medium">标准化神经链路</span>
                </p>
              </div>
            </div>

            <!-- 5. 悬停时的光效线条 -->
            <div class="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
          </router-link>

          <!-- 6. 更多/敬请期待 (修复居中版) -->
          <div class="group relative col-span-1 md:col-span-6 lg:col-span-4 h-[240px] rounded-[2.5rem] overflow-hidden border border-slate-200 border-dashed hover:border-indigo-300 hover:border-solid transition-all duration-300 bg-slate-50/50 hover:bg-white hover:shadow-xl flex flex-col items-center justify-center">

            <!-- 背景装饰 -->
            <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
            <div class="absolute -top-10 -right-10 w-32 h-32 bg-indigo-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <!-- 内容区域容器：添加 group-hover 位移，给按钮腾出空间 -->
            <div class="relative z-10 flex flex-col items-center transition-transform duration-300 group-hover:-translate-y-4">

              <!-- 动态图标 -->
              <div class="mb-4 relative">
                <div class="w-12 h-12 rounded-full border-2 border-slate-200 group-hover:border-indigo-200 transition-colors"></div>
                <div class="absolute top-0 left-0 w-12 h-12 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-500">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>

              <!-- 文字内容 -->
              <h3 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">更多功能开发中</h3>
              <p class="text-sm text-slate-500 px-4 group-hover:text-slate-600 text-center">
                语音克隆、视频生成、知识库构建...
                <br>
                <span class="text-xs text-indigo-400 mt-2 inline-block font-medium tracking-wide">COMING SOON</span>
              </p>

            </div>

            <!-- 按钮：绝对定位 (不再占用布局空间，确保默认状态完美居中) -->
            <button class="absolute bottom-6 px-6 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-600 shadow-lg shadow-indigo-500/10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 z-20">
              查看开发计划 &rarr;
            </button>

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

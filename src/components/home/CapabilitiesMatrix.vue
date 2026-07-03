<template>
  <section class="mb-24 px-4 sm:px-6 lg:px-8">

    <!-- 标题区 (重构版：旗舰级排版) -->
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 relative z-10">

      <!-- 左侧：标题核心 -->
      <div class="max-w-2xl relative">
        <!-- 装饰：左侧竖线光标 -->
        <div class="absolute -left-6 top-2 w-1 h-12 bg-gradient-to-b from-indigo-505 to-violet-505 rounded-full hidden lg:block"></div>

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
      <a href="#" class="group flex items-center justify-between gap-4 px-6 py-3 rounded-md bg-white border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 min-w-[180px]">
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
      <router-link to="/api-demo" class="group relative col-span-1 md:col-span-2 row-span-2 bg-[#020617] rounded-md overflow-hidden shadow-2xl shadow-indigo-500/10 hover:shadow-indigo-500/30 transition-all duration-500 border border-white/5 hover:border-indigo-500/40 flex flex-col">

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
            <div class="group/btn inline-flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-md text-white font-bold text-sm transition-all shadow-lg shadow-indigo-900/50 cursor-pointer">
              <span>启动引擎</span>
              <svg class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>

          <!-- === 右侧：动态数据看板 (填补空白的核心) === -->
          <div class="hidden md:flex flex-col gap-4 h-full">

            <!-- 上半部分：思维拓扑图 (SVG Visualization) -->
            <div class="flex-1 bg-slate-900/50 rounded-md border border-white/5 p-4 relative overflow-hidden group-hover:border-indigo-500/20 transition-colors">
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
            <div class="h-24 bg-black/40 rounded-md border border-white/5 p-3 font-mono text-[9px] text-slate-400 overflow-hidden relative">
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
      <router-link to="/ai-image" class="group relative col-span-1 h-full min-h-[240px] bg-slate-900 rounded-md overflow-hidden border border-purple-500/20 hover:border-purple-400/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] transition-all duration-500">

        <!-- 1. 背景：高清流体数字艺术 -->
        <div class="absolute inset-0 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700 ease-out" alt="AI Digital Art">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-purple-900/10 mix-blend-multiply"></div>
          <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        <!-- 2. 视觉主体：模拟 AI 取景框 (Focus Frame) -->
        <div class="absolute top-8 right-8 left-8 bottom-24 border border-white/10 rounded-sm pointer-events-none group-hover:border-purple-400/30 transition-colors duration-500">
          <div class="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-white/30 rounded-tl-sm group-hover:border-purple-400"></div>
          <div class="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-white/30 rounded-tr-sm group-hover:border-purple-400"></div>
          <div class="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-white/30 rounded-bl-sm group-hover:border-purple-400"></div>
          <div class="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-white/30 rounded-br-sm group-hover:border-purple-400"></div>

          <!-- 悬浮的参数标签 -->
          <div class="absolute top-2 right-2 flex flex-col items-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-2 group-hover:translate-x-0">
            <span class="px-1.5 py-0.5 bg-black/50 backdrop-blur-md border border-white/10 text-[8px] text-purple-300 rounded font-mono">UPSCALE: 4x</span>
            <span class="px-1.5 py-0.5 bg-black/50 backdrop-blur-md border border-white/10 text-[8px] text-purple-300 rounded font-mono">V6.0 RAW</span>
          </div>
        </div>

        <!-- 3. 内容区域 -->
        <div class="p-6 relative z-10 h-full flex flex-col justify-between">
          <div class="flex items-center gap-2 self-start px-2 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <div class="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></div>
            <span class="text-[9px] font-bold text-purple-100/80 tracking-wide uppercase">Imagine</span>
          </div>

          <!-- 底部文字信息 -->
          <div class="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-8 h-8 rounded-sm bg-purple-500/20 backdrop-blur-md flex items-center justify-center text-purple-300 border border-purple-500/30">
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
      <router-link to="/prompt-library" class="group relative col-span-1 h-full min-h-[240px] bg-slate-900 rounded-md overflow-hidden border border-amber-500/10 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-500">

        <!-- 1. 背景层：流动的代码雨/数据流 -->
        <div class="absolute inset-0 overflow-hidden opacity-20">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-900/40 via-slate-900 to-slate-900"></div>
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
          <div class="absolute top-4 left-6 w-full h-full bg-amber-900/20 backdrop-blur-sm border border-amber-500/10 rounded-md rotate-6"></div>
          <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-500/30 rounded-md shadow-2xl p-4 rotate-[-3deg] group-hover:rotate-0 transition-transform duration-500 flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 rounded-full bg-amber-500"></div>
              <div class="h-1.5 w-1/2 bg-amber-500/20 rounded-full"></div>
            </div>
            <div class="h-1.5 w-full bg-slate-700 rounded-full"></div>
            <div class="h-1.5 w-3/4 bg-slate-700 rounded-full"></div>
            <div class="mt-auto flex gap-1">
              <div class="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/30 text-[8px] text-amber-400 font-mono">--v 6</div>
              <div class="px-1.5 py-0.5 rounded bg-slate-700 border border-slate-600 text-[8px] text-slate-400 font-mono">RAW</div>
            </div>
          </div>
        </div>

        <!-- 3. 内容区域 -->
        <div class="p-6 relative z-10 h-full flex flex-col justify-between pointer-events-none">
          <div class="w-10 h-10 rounded-md bg-amber-500/10 backdrop-blur-md flex items-center justify-center text-amber-500 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)] group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
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
      <router-link to="/game" class="group relative col-span-1 md:col-span-2 lg:col-span-2 h-full bg-[#051014] rounded-md overflow-hidden border border-emerald-500/20 hover:border-emerald-400/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all duration-500 flex flex-row items-center">

        <!-- 1. 背景层 -->
        <div class="absolute inset-0 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-[2s] ease-out image-pixelated" style="image-rendering: pixelated; filter: contrast(1.2) hue-rotate(30deg);" alt="Epic Game World">
          <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-[#064e3b]/40 to-black/60"></div>
          <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
          <div class="absolute top-1/4 left-1/3 w-1 h-1 bg-emerald-400 rounded-full animate-ping"></div>
          <div class="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse delay-700"></div>

          <!-- CRT 扫描线 -->
          <div class="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))]" style="background-size: 100% 3px, 4px 100%; pointer-events: none;"></div>
        </div>

        <!-- 2. 左侧：游戏布局 -->
        <div class="relative z-10 w-[45%] h-full flex flex-col justify-center px-8 space-y-4">
          <div class="absolute left-0 top-8 bottom-8 w-1 bg-gradient-to-b from-transparent via-emerald-500 to-transparent opacity-50"></div>
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

          <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-sm group-hover:bg-emerald-500 text-emerald-500 group-hover:text-black group-hover:border-emerald-400 transition-all duration-300 w-fit cursor-pointer">
            <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span class="text-[10px] font-bold tracking-wide">PLAY NOW</span>
          </div>
        </div>

        <!-- 3. 右侧：装备展示 -->
        <div class="relative z-10 w-[55%] h-full flex items-center justify-center">
          <div class="absolute bottom-6 w-32 h-8 bg-black/40 blur-lg rounded-[100%] transform rotate-x-60"></div>
          <div class="relative w-32 h-32 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
            <div class="absolute inset-0 bg-gradient-to-tr from-emerald-500/0 via-emerald-400/20 to-emerald-500/0 rounded-full animate-[spin_4s_linear_infinite]"></div>
            <svg class="w-24 h-24 text-white drop-shadow-[0_5px_15px_rgba(16,185,129,0.6)] filter contrast-125" viewBox="0 0 24 24" fill="none">
              <path d="M14 4L5.5 12.5L7.5 14.5L16 6L14 4Z" class="fill-slate-200 stroke-slate-900" stroke-width="0.5" />
              <path d="M4 14.5L6 12.5L8 14.5L6 16.5L4 14.5Z" class="fill-emerald-600 stroke-emerald-900" stroke-width="0.5" />
              <path d="M15.5 5L18.5 2L22 5.5L19 8.5L15.5 5Z" class="fill-emerald-500 stroke-emerald-800" stroke-width="0.5" />
              <path d="M12 7L7 12" stroke="#34d399" stroke-width="1.5" stroke-linecap="round" />
            </svg>

            <!-- 属性标签 -->
            <div class="absolute -right-4 top-4 space-y-1 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
              <div class="px-1.5 py-0.5 bg-black/60 backdrop-blur-sm border border-red-500/50 rounded text-[8px] text-red-300 font-mono font-bold">ATK +999</div>
              <div class="px-1.5 py-0.5 bg-black/60 backdrop-blur-sm border border-yellow-500/50 rounded text-[8px] text-yellow-300 font-mono font-bold">LEGENDARY</div>
            </div>
          </div>
        </div>

      </router-link>

      <!-- ==================== [Row 3 Left] 变长列车卡片 ==================== -->

      <!-- 5. 第13号列车 (Sci-Fi) -->
      <router-link to="/scenario" class="group relative col-span-1 md:col-span-2 lg:col-span-2 h-full bg-[#02040a] rounded-md overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all duration-500">

        <!-- 视窗 -->
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#0B1120] to-[#020617]"></div>
          <div class="star-bg absolute inset-0 opacity-40" style="background-image: radial-gradient(white 1px, transparent 1px); background-size: 50px 50px;"></div>
          <div class="absolute inset-0 z-0">
            <div class="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/80 to-transparent"></div>
          </div>

          <!-- 铁轨飞逝 -->
          <div class="absolute bottom-0 left-0 right-0 h-32 opacity-30 pointer-events-none perspective-track">
            <div class="track-lines absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,#3b82f6_50%)] bg-[size:100%_40px]"></div>
            <div class="absolute top-0 bottom-0 left-[20%] w-1 bg-gradient-to-b from-transparent to-blue-500"></div>
            <div class="absolute top-0 bottom-0 right-[20%] w-1 bg-gradient-to-b from-transparent to-blue-500"></div>
          </div>

          <!-- 星轨 -->
          <div class="absolute inset-0 flex flex-col justify-around opacity-20 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none">
            <div class="speed-line h-[1px] w-full bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
            <div class="speed-line h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent" style="animation-duration: 1.5s; animation-delay: 0.5s;"></div>
            <div class="speed-line h-[2px] w-full bg-gradient-to-r from-transparent via-white to-transparent" style="animation-duration: 0.8s; animation-delay: 1.2s;"></div>
            <div class="speed-line h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" style="animation-duration: 2s; animation-delay: 0.2s;"></div>
          </div>

          <div class="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-blue-900/20 mix-blend-overlay pointer-events-none"></div>
        </div>

        <!-- HUD -->
        <div class="absolute inset-0 p-8 flex flex-col justify-between z-10">
          <div class="flex justify-between items-start">
            <div class="flex gap-4">
              <div class="w-12 h-12 rounded-sm bg-blue-950/50 backdrop-blur-md border border-blue-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <svg class="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                </svg>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-2xl font-black text-white italic tracking-tighter">NO.13</span>
                  <span class="px-1.5 py-0.5 rounded-sm bg-blue-600 text-[9px] font-bold text-white tracking-widest">EXPRESS</span>
                </div>
                <div class="text-[10px] text-blue-300/60 font-mono mt-1">DESTINATION: UNKNOWN</div>
              </div>
            </div>

            <div class="flex flex-col items-end">
              <div class="flex items-center gap-1.5">
                <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span class="text-[10px] font-mono text-emerald-400 font-bold tracking-widest">RUNNING</span>
              </div>
              <div class="text-[9px] font-mono text-slate-500 mt-1">VELOCITY: ∞ km/h</div>
            </div>
          </div>

          <div class="relative">
            <div class="absolute -top-4 left-0 w-12 h-0.5 bg-blue-500/50"></div>
            <h3 class="text-xl font-bold text-white mb-2 flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300">
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-blue-400">第13号列车 · 交互小说</span>
            </h3>
            <p class="text-xs text-slate-400 font-light max-w-lg leading-relaxed group-hover:text-blue-100/70 transition-colors">
              “下一站是深渊还是星辰？” <br>
              全沉浸式剧情引擎，你的每一次选择都将改变列车的航向。
            </p>
          </div>
        </div>

        <div class="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 pointer-events-none bg-[length:100%_2px,3px_100%] opacity-20"></div>
      </router-link>

      <!-- ==================== [Row 3 Right] 收尾小卡片 ==================== -->

      <!-- 6. MCP 智能体 (重构版：全息数据枢纽) -->
      <router-link to="/mcp-agent" class="group relative col-span-1 h-full bg-[#081018] rounded-md overflow-hidden border border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] transition-all duration-500">

        <!-- 1. 背景 -->
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/40 via-[#081018] to-[#081018]"></div>
          <div class="absolute inset-0 opacity-20" style="background-image: linear-gradient(rgba(34,211,238,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.1) 1px, transparent 1px); background-size: 20px 20px;"></div>
          <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-cyan-500/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]"></div>
        </div>

        <!-- 2. 核心 -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-cyan-500/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border border-dashed border-cyan-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-cyan-900/80 backdrop-blur-md border border-cyan-400 rounded-sm flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)] group-hover:scale-110 transition-transform duration-500 z-10">
            <svg class="w-6 h-6 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>

          <!-- 卫星 1 -->
          <div class="absolute top-1/3 left-1/4 w-8 h-8 bg-slate-800/80 border border-cyan-500/30 rounded-lg flex items-center justify-center animate-bounce duration-[3000ms]">
            <svg class="w-3 h-3 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div class="absolute top-[42%] left-[32%] w-12 h-[1px] bg-cyan-500/30 rotate-12 origin-right"></div>

          <!-- 卫星 2 -->
          <div class="absolute bottom-1/3 right-1/4 w-8 h-8 bg-slate-800/80 border border-cyan-500/30 rounded-lg flex items-center justify-center animate-bounce duration-[4000ms]">
            <svg class="w-3 h-3 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div class="absolute bottom-[42%] right-[32%] w-12 h-[1px] bg-cyan-500/30 -rotate-12 origin-left"></div>
        </div>

        <!-- 3. 内容 -->
        <div class="p-6 relative z-20 h-full flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <div class="px-2 py-1 rounded-md bg-cyan-950/50 border border-cyan-500/30 backdrop-blur-md flex items-center gap-2">
              <span class="relative flex h-1.5 w-1.5"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span><span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span></span>
              <span class="text-[9px] font-mono font-bold text-cyan-400 tracking-wider">PROTOCOL_V2</span>
            </div>
            <span class="text-[9px] font-mono text-cyan-600/80 group-hover:text-cyan-400 transition-colors">LINKED: 3</span>
          </div>

          <div class="slate-900/60 backdrop-blur-sm p-3 rounded-md border border-white/5 group-hover:bg-slate-900/80 transition-colors">
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

      <!-- 7. 更多功能 -->
      <div class="group relative col-span-1 h-full rounded-md overflow-hidden border border-slate-800 bg-[#0F172A] hover:border-indigo-500/30 transition-all duration-500">
        <div class="absolute inset-0">
          <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]" style="background-size: 20px 20px;"></div>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-colors duration-500"></div>
        </div>

        <div class="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div class="relative w-12 h-12 perspective-1000 transition-all duration-500 ease-out group-hover:-translate-y-6 group-hover:scale-75">
            <div class="absolute w-full h-full border border-indigo-500/30 bg-indigo-500/5 backdrop-blur-sm animate-[spin_8s_linear_infinite] transform-style-3d"></div>
            <div class="absolute w-8 h-8 top-2 left-2 border border-white/20 bg-white/5 animate-[spin_4s_linear_infinite_reverse]"></div>
            <div class="absolute inset-0 flex items-center justify-center text-indigo-300/50">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          <div class="relative h-8 mt-4 w-full flex justify-center">
            <div class="absolute top-0 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2">
              <h3 class="text-xs font-bold text-slate-400 tracking-widest uppercase text-center">Coming Soon</h3>
              <div class="w-8 h-0.5 bg-slate-700 mx-auto mt-2 rounded-full"></div>
            </div>

            <div class="absolute top-0 flex flex-col items-center gap-2 transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
              <div class="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-indigo-500/10 border border-indigo-500/20">
                <svg class="w-3 h-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <span class="text-[10px] text-indigo-300 font-mono">Voice Cloning</span>
              </div>
              <div class="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-purple-500/10 border border-purple-500/20">
                <svg class="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span class="text-[10px] text-purple-300 font-mono">Video Gen</span>
              </div>
            </div>
          </div>
        </div>

        <div class="absolute bottom-3 right-3 text-slate-800">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M20 20L10 20L20 10L20 20Z" fill="currentColor" />
          </svg>
        </div>
      </div>

    </div>

  </section>
</template>

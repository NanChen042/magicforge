<template>
  <section class="mb-24 px-4 sm:px-6 lg:px-8">

    <!-- 标题区 (旗舰级极简排版，彻底清除碍事的胶囊圆点) -->
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8 relative z-10">

      <!-- 左侧：标题核心 -->
      <div class="max-w-2xl relative">
        <!-- 纯粹简洁的技术小标，无胶囊/无闪烁圆点 -->
        <div class="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 font-mono">
          CAPABILITIES MATRIX
        </div>

        <!-- 主标题 -->
        <h2 class="text-4xl md:text-5xl font-bold text-slate-900 mb-5 tracking-tight leading-[1.2]">
          释放 AI 的
          <span class="relative inline-block">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-blue-600">
              多元潜能
            </span>
            <!-- 科技感下划线 -->
            <svg class="absolute -bottom-2 left-0 w-full h-2 text-blue-500/30" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="4 2" />
            </svg>
          </span>
        </h2>

        <!-- 描述文案 -->
        <p class="text-base sm:text-lg text-slate-500 leading-relaxed font-light">
          精心打造的功能矩阵。从<span class="text-slate-800 font-medium">自然语言处理</span>到<span class="text-slate-800 font-medium">多模态创作</span>，为您提供一站式、企业级的智能体验。
        </p>
      </div>

      <!-- 右侧：高级交互按钮 -->
      <a href="#" class="group flex items-center justify-between gap-4 px-6 py-3 rounded-md bg-white border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 min-w-[180px]">
        <div class="flex flex-col">
          <span class="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">查看完整文档</span>
          <span class="text-[10px] text-slate-400 font-mono">文档与 API 接口</span>
        </div>

        <!-- 箭头图标容器 -->
        <div class="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-blue-600 flex items-center justify-center transition-all duration-300 group-hover:rotate-45">
          <svg class="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </a>

    </div>

    <!-- Bento Grid 布局：宽幅游戏版 (流体交错结构) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[240px]">

      <!-- 1. 核心旗舰卡片：智能对话与深度思考 (全新重构：实时全息思维链演算中枢) -->
      <router-link to="/api-demo" class="group relative col-span-1 md:col-span-2 row-span-2 bg-[#040816] rounded-md overflow-hidden shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/30 transition-all duration-500 border border-blue-500/20 hover:border-blue-400/50 flex flex-col justify-between p-6 md:p-8">

        <!-- 1. 背景层：全息深空网格与环境辉光 -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-blue-950/40 via-[#040816] to-[#040816]"></div>
          <div class="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)]" style="background-size: 24px 24px;"></div>
          <div class="absolute -top-12 -left-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
        </div>

        <!-- 2. 内部布局：左右分栏 -->
        <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 h-full">

          <!-- === 左侧：功能控制与核心优势 === -->
          <div class="flex flex-col justify-between h-full">

            <!-- 顶部：模型状态标头 (极简专业排版，清爽无冗余圆点) -->
            <div class="flex items-center justify-between border-b border-white/5 pb-3">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-white tracking-wide">DeepSeek-R1</span>
                <span class="text-[10px] text-blue-300 font-mono">深度推理模型</span>
              </div>
              <span class="text-[10px] text-slate-400 font-medium">全链路就绪</span>
            </div>

            <!-- 中部：大标题与介绍 -->
            <div class="my-auto py-4 space-y-3.5">
              <h3 class="text-3xl font-bold text-white tracking-tight leading-tight group-hover:text-blue-300 transition-colors">
                智能对话<br>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">
                  深度思维引擎
                </span>
              </h3>
              <p class="text-xs text-slate-400 font-normal leading-relaxed">
                不仅仅是日常问答。集成多阶反思与思维链推演，轻松应对复杂编程、逻辑剖析与跨模态长文本生成。
              </p>

              <!-- 能力标签矩阵 (清爽胶囊，无杂乱圆点) -->
              <div class="grid grid-cols-2 gap-2 pt-1">
                <div class="px-2.5 py-1.5 bg-blue-950/40 border border-blue-500/20 rounded-md text-[11px] text-slate-300 font-medium">
                  逻辑推理拆解
                </div>
                <div class="px-2.5 py-1.5 bg-blue-950/40 border border-blue-500/20 rounded-md text-[11px] text-slate-300 font-medium">
                  专业代码生成
                </div>
                <div class="px-2.5 py-1.5 bg-blue-950/40 border border-blue-500/20 rounded-md text-[11px] text-slate-300 font-medium">
                  多模态知识库
                </div>
                <div class="px-2.5 py-1.5 bg-blue-950/40 border border-blue-500/20 rounded-md text-[11px] text-slate-300 font-medium">
                  毫秒流式渲染
                </div>
              </div>
            </div>

            <!-- 底部：主要行动按钮 -->
            <div class="inline-flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-md text-white font-bold text-sm shadow-lg shadow-blue-900/40 transition-all cursor-pointer">
              <span>立即开始体验</span>
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

          </div>

          <!-- === 右侧：实时思维链推演可视化展示台 (Neural Reasoning Studio) === -->
          <div class="hidden md:flex flex-col justify-between gap-4 h-full pointer-events-none">

            <!-- 1. 上半部分：多层动态思维链路图 (Neural Topology Graph) -->
            <div class="flex-1 bg-slate-900/60 rounded-md border border-blue-500/20 p-4 relative overflow-hidden flex flex-col justify-between">
              
              <!-- 顶部状态栏 -->
              <div class="flex items-center justify-between text-[10px]">
                <span class="text-blue-300 font-medium">
                  思维链拓扑演算中
                </span>
                <span class="text-slate-500 font-mono text-[9px]">DEEP_THINKING</span>
              </div>

              <!-- 中部：动态拓扑连接 SVG -->
              <div class="relative my-auto h-28 flex items-center justify-center">
                <svg class="w-full h-full" viewBox="0 0 220 100" fill="none">
                  <!-- 拓扑连接线 -->
                  <path d="M 30 50 C 70 50, 75 25, 110 25" stroke="#1e3a8a" stroke-width="1.5" />
                  <path d="M 30 50 C 70 50, 75 75, 110 75" stroke="#1e3a8a" stroke-width="1.5" />
                  <path d="M 110 25 C 145 25, 150 50, 190 50" stroke="#1e3a8a" stroke-width="1.5" />
                  <path d="M 110 75 C 145 75, 150 50, 190 50" stroke="#3b82f6" stroke-width="2" />

                  <!-- 沿拓扑路径流动的数据粒子 -->
                  <circle r="3" fill="#60a5fa">
                    <animateMotion path="M 30 50 C 70 50, 75 75, 110 75 C 145 75, 150 50, 190 50" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <circle r="2" fill="#38bdf8">
                    <animateMotion path="M 30 50 C 70 50, 75 25, 110 25 C 145 25, 150 50, 190 50" dur="3s" repeatCount="indefinite" />
                  </circle>

                  <!-- 节点 1：输入端 -->
                  <g transform="translate(30, 50)">
                    <circle r="10" fill="#0f172a" stroke="#3b82f6" stroke-width="1.5" />
                    <circle r="3.5" fill="#60a5fa" />
                    <text x="0" y="20" text-anchor="middle" font-size="8" fill="#94a3b8" font-family="sans-serif">问题输入</text>
                  </g>

                  <!-- 节点 2：逻辑分解 -->
                  <g transform="translate(110, 25)">
                    <circle r="8" fill="#0f172a" stroke="#64748b" stroke-width="1.5" />
                    <circle r="2.5" fill="#94a3b8" />
                    <text x="0" y="-12" text-anchor="middle" font-size="8" fill="#64748b" font-family="sans-serif">① 逻辑拆解</text>
                  </g>

                  <!-- 节点 3：深度求证 (激活核心) -->
                  <g transform="translate(110, 75)">
                    <circle r="11" fill="#1e3a8a" stroke="#38bdf8" stroke-width="2" class="shadow-sm" />
                    <circle r="4" fill="#ffffff" />
                    <text x="0" y="20" text-anchor="middle" font-size="8" fill="#38bdf8" font-weight="bold" font-family="sans-serif">② 深度反思</text>
                  </g>

                  <!-- 节点 4：确定结论 -->
                  <g transform="translate(190, 50)">
                    <circle r="10" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
                    <circle r="3.5" fill="#34d399" />
                    <text x="0" y="20" text-anchor="middle" font-size="8" fill="#34d399" font-weight="600" font-family="sans-serif">精准输出</text>
                  </g>
                </svg>
              </div>

            </div>

            <!-- 2. 下半部分：拟真实时思考流展台 (Live Thinking Bubble) -->
            <div class="h-28 bg-slate-900/80 rounded-md border border-blue-500/20 p-3.5 flex flex-col justify-between shadow-inner">
              <div class="flex items-center justify-between text-[10px] text-slate-400 border-b border-white/5 pb-1.5">
                <span class="font-medium text-slate-300">
                  实时思考过程 (CoT)
                </span>
                <span class="text-blue-400 font-mono text-[9px]">耗时 0.8s</span>
              </div>
              <div class="text-[11px] text-slate-300 font-normal leading-relaxed space-y-1">
                <p class="text-blue-300/90">> 分析核心诉求与约束条件... 已拆解 3 个子任务</p>
                <p class="text-emerald-300/90 flex items-center gap-1">
                  <span>> 逻辑反思验证通过，正在输出结构化结果</span>
                  <span class="inline-block w-1.5 h-3 bg-blue-400 animate-pulse"></span>
                </p>
              </div>
            </div>

          </div>

        </div>
      </router-link>

      <!-- ==================== [Row 2 Left] 变短画板与提示词 ==================== -->

      <!-- 2. 图像 (全新重构版：4K 概念艺术画框与微距取景 HUD) -->
      <router-link to="/ai-image" class="group relative col-span-1 h-full min-h-[240px] bg-[#060c18] rounded-md overflow-hidden border border-blue-500/20 hover:border-blue-400/50 hover:shadow-[0_0_35px_rgba(59,130,246,0.25)] transition-all duration-500 flex flex-col justify-between p-5">

        <!-- 1. 背景层：全息星云渐变与极简光影 -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/30 via-[#060c18] to-[#060c18]"></div>
          <div class="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)]" style="background-size: 16px 16px;"></div>
          <div class="absolute -top-10 -right-10 w-36 h-36 bg-sky-500/15 rounded-full blur-2xl group-hover:bg-sky-500/30 transition-colors"></div>
        </div>

        <!-- 2. 顶部：极简科技状态栏 -->
        <div class="relative z-10 flex items-center justify-between border-b border-white/5 pb-2">
          <span class="text-xs font-semibold text-white tracking-wide">多模态图像工坊</span>
          <span class="text-[10px] text-blue-300/80 font-mono">4K 超清渲染</span>
        </div>

        <!-- 3. 中部：4K 概念艺术数字画幅 (Aesthetic Cyberpunk Concept Art Viewfinder) -->
        <div class="relative z-10 my-auto py-1 flex items-center justify-center pointer-events-none">
          <div class="relative w-full h-24 rounded-md overflow-hidden border border-blue-400/40 shadow-lg shadow-blue-950/60 group-hover:border-blue-300/60 transition-all duration-500">
            
            <!-- 艺术画作：赛博朋克概念艺术插画 -->
            <img 
              src="https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop" 
              class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 brightness-95 group-hover:brightness-110" 
              alt="4K Cyberpunk Generative Art"
            />
            
            <!-- 渐变光影遮罩 -->
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40"></div>

            <!-- 激光降噪扫描线 -->
            <div class="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-[scan-fast_2.2s_ease-in-out_infinite] shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>

            <!-- 取景器四角微距对焦线 -->
            <div class="absolute top-1 left-1 w-2 h-2 border-t border-l border-cyan-300"></div>
            <div class="absolute top-1 right-1 w-2 h-2 border-t border-r border-cyan-300"></div>
            <div class="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-cyan-300"></div>
            <div class="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-cyan-300"></div>

            <!-- 浮动标签：左上提示词 + 右下渲染状态 -->
            <div class="absolute top-1.5 left-1.5 flex items-center gap-1 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10">
              <span class="text-[8px] text-cyan-200 font-medium tracking-tight">赛博未来城 · 4K</span>
            </div>

            <div class="absolute bottom-1.5 right-1.5 flex items-center gap-1 bg-emerald-950/80 backdrop-blur-md px-1.5 py-0.5 rounded border border-emerald-500/30">
              <span class="text-[8px] font-semibold text-emerald-300">渲染就绪</span>
            </div>

          </div>
        </div>

        <!-- 4. 底部：标题与描述 (空间充裕，绝不遮挡或挤压) -->
        <div class="relative z-10 pt-2 border-t border-white/5">
          <div class="flex items-center justify-between mb-0.5">
            <h3 class="text-base font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">
              灵感画板
            </h3>
            <svg class="w-3.5 h-3.5 text-sky-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <p class="text-xs text-slate-400 font-normal leading-relaxed">
            输入创意描述，秒级生成 4K 艺术大片
          </p>
        </div>
      </router-link>

      <!-- 3. 提示词库 (全新重构版：结构化 Prompt 动态装配引擎) -->
      <router-link to="/prompt-library" class="group relative col-span-1 h-full min-h-[240px] bg-[#070d18] rounded-md overflow-hidden border border-blue-500/20 hover:border-blue-400/50 hover:shadow-[0_0_35px_rgba(59,130,246,0.2)] transition-all duration-500 flex flex-col justify-between p-5">

        <!-- 1. 背景层：极简坐标网格与环境辉光 -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/30 via-[#070d18] to-[#070d18]"></div>
          <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]" style="background-size: 20px 20px;"></div>
          <div class="absolute -top-10 -right-10 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors"></div>
        </div>

        <!-- 2. 顶部：极简状态栏 -->
        <div class="relative z-10 flex items-center justify-between border-b border-white/5 pb-2">
          <span class="text-xs font-semibold text-white tracking-wide">提示词工程库</span>
          <span class="text-[10px] text-blue-300/80 font-mono">结构化装配</span>
        </div>

        <!-- 3. 中部：结构化 Token 动态装配展台 (可视化 Prompt Tokens) -->
        <div class="relative z-10 my-auto py-1 flex flex-col gap-2 pointer-events-none">
          <!-- Token 1: 角色定义 -->
          <div class="flex items-center gap-1.5 transform transition-transform duration-300 group-hover:translate-x-1">
            <span class="px-1.5 py-0.5 rounded bg-blue-500/20 border border-blue-400/40 text-[9px] font-mono text-blue-300 font-bold">角色</span>
            <span class="text-[11px] text-slate-300 font-medium bg-slate-800/80 px-2 py-0.5 rounded border border-white/5">全栈系统架构师</span>
          </div>
          <!-- Token 2: 任务目标 -->
          <div class="flex items-center gap-1.5 transform transition-transform duration-300 group-hover:translate-x-2 delay-75">
            <span class="px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/40 text-[9px] font-mono text-emerald-300 font-bold">任务</span>
            <span class="text-[11px] text-slate-300 font-medium bg-slate-800/80 px-2 py-0.5 rounded border border-white/5">分布式高并发重构</span>
          </div>
          <!-- Token 3: 输出规格 -->
          <div class="flex items-center gap-1.5 transform transition-transform duration-300 group-hover:translate-x-3 delay-150">
            <span class="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-[9px] font-mono text-amber-300 font-bold">规格</span>
            <span class="text-[11px] text-slate-400 font-medium bg-slate-800/80 px-2 py-0.5 rounded border border-white/5 font-mono text-[10px]">JSON / Markdown</span>
          </div>
        </div>

        <!-- 4. 底部：标题与描述 -->
        <div class="relative z-10 pt-2 border-t border-white/5">
          <div class="flex items-center justify-between mb-0.5">
            <h3 class="text-base font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
              提示词宝库
            </h3>
            <svg class="w-3.5 h-3.5 text-blue-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <p class="text-xs text-slate-400 font-normal leading-relaxed">
            结构化工程模版，开箱即用提升输出质量
          </p>
        </div>
      </router-link>

      <!-- ==================== [Row 2 Right] 变长游戏卡片 ==================== -->

      <!-- 4. 游戏 (全新殿堂级重构：暗黑魔导史诗 · 永恒之刃 RPG 战役) -->
      <router-link to="/game" class="group relative col-span-1 md:col-span-2 lg:col-span-2 h-full min-h-[240px] bg-[#040e12] rounded-md overflow-hidden border border-emerald-500/20 hover:border-emerald-400/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all duration-500 flex flex-col justify-between p-6">

        <!-- 1. 背景层：暗黑幻想远古符文熔炉与环境光 -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop" 
            class="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-108 group-hover:opacity-45 transition-all duration-[2s] ease-out brightness-90" 
            alt="Epic Dark Fantasy World"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-[#040e12] via-[#040e12]/85 to-[#040e12]/50"></div>
          <div class="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)]" style="background-size: 24px 24px;"></div>
          <div class="absolute -top-16 -right-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors"></div>
        </div>

        <!-- 2. 顶部：统一科技状态栏 -->
        <div class="relative z-10 flex items-center justify-between border-b border-white/5 pb-2">
          <span class="text-xs font-semibold text-white tracking-wide">RPG 战役推演</span>
          <span class="text-[10px] text-emerald-300/80 font-mono">动态剧情沙盒</span>
        </div>

        <!-- 3. 中部：左右布局 (左侧故事线 + 右侧 3D 浮空史诗圣剑与召唤法阵) -->
        <div class="relative z-10 my-auto py-1 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <!-- 左侧：文本区 (自然双行排版，杜绝单字断行) -->
          <div class="md:col-span-6 space-y-2">
            <h3 class="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight group-hover:text-emerald-300 transition-colors">
              永恒之刃<br>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400">
                传奇战役推演
              </span>
            </h3>
            <p class="text-xs text-slate-400 font-normal leading-relaxed">
              “每一把神兵都蕴藏一段史诗。” 全沉浸式生成式战棋推演，装备词条、地下城事件随决策动态演进。
            </p>
            <div class="flex items-center gap-2 pt-0.5">
              <span class="text-[9px] text-emerald-300 font-medium bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">神话词条构筑</span>
              <span class="text-[9px] text-amber-300 font-medium bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">动态地下城</span>
            </div>
          </div>

          <!-- 右侧：3D 悬浮史诗魔导圣剑与符文魔法阵展台 (50% 视窗) -->
          <div class="md:col-span-6 relative h-28 flex items-center justify-center pointer-events-none">
            
            <!-- 远古符文魔法回响光环 (Rotating Runic Magic Circle) -->
            <div class="absolute w-24 h-24 rounded-full border border-emerald-400/20 border-dashed animate-[spin_16s_linear_infinite]"></div>
            <div class="absolute w-32 h-32 rounded-full border border-emerald-500/10 animate-pulse"></div>

            <!-- 主视觉：高定 3D 浮空倾斜魔导圣剑 -->
            <div class="relative z-10 w-28 h-28 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
              
              <!-- 圣剑光芒光晕 -->
              <div class="absolute inset-0 bg-radial from-emerald-400/20 via-emerald-500/5 to-transparent rounded-full blur-md"></div>

              <!-- 精工雕刻的史诗圣剑 SVG -->
              <svg class="w-24 h-24 drop-shadow-[0_0_16px_rgba(52,211,153,0.7)]" viewBox="0 0 100 100" fill="none">
                <!-- 剑身 (锐利双刃与中心血槽流光) -->
                <path d="M 68 20 L 78 30 L 42 66 L 34 58 Z" fill="url(#blade-gradient)" stroke="#6ee7b7" stroke-width="1.2" />
                <line x1="73" y1="25" x2="38" y2="62" stroke="#ffffff" stroke-width="1" opacity="0.9" />
                
                <!-- 剑尖极光破空点 -->
                <polygon points="78,30 83,17 68,20" fill="#ecfdf5" stroke="#34d399" stroke-width="1" />
                <circle cx="83" cy="17" r="2.5" fill="#ffffff" class="animate-ping" />

                <!-- 护手/剑格 (暗金翼展护手) -->
                <path d="M 30 52 L 48 70 L 44 74 L 26 56 Z" fill="#d97706" stroke="#fbbf24" stroke-width="1" />
                <circle cx="37" cy="63" r="3" fill="#10b981" stroke="#fbbf24" stroke-width="0.8" />

                <!-- 剑柄与配重剑首 (缠革剑柄与符文宝石) -->
                <line x1="34" y1="66" x2="20" y2="80" stroke="#78350f" stroke-width="3" stroke-linecap="round" />
                <line x1="33" y1="67" x2="21" y2="79" stroke="#fbbf24" stroke-width="1" stroke-dasharray="2 2" />
                <circle cx="18" cy="82" r="3.5" fill="#d97706" stroke="#fbbf24" stroke-width="1" />

                <!-- 渐变定义 -->
                <defs>
                  <linearGradient id="blade-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ecfdf5" />
                    <stop offset="40%" stop-color="#6ee7b7" />
                    <stop offset="100%" stop-color="#059669" />
                  </linearGradient>
                </defs>
              </svg>

              <!-- 悬浮装备属性浮层 -->
              <div class="absolute -right-2 top-2 space-y-1">
                <div class="px-1.5 py-0.5 bg-black/75 backdrop-blur-md border border-emerald-500/40 rounded text-[8px] text-emerald-300 font-mono font-bold shadow-lg">
                  ATK +999
                </div>
                <div class="px-1.5 py-0.5 bg-black/75 backdrop-blur-md border border-amber-500/40 rounded text-[8px] text-amber-300 font-mono font-bold shadow-lg">
                  LEGENDARY
                </div>
              </div>

            </div>

          </div>

        </div>

        <!-- 4. 底部：行动引导栏 -->
        <div class="relative z-10 pt-2 border-t border-white/5 flex items-center justify-between">
          <span class="text-xs text-slate-400 font-mono">战役引擎 · 随时待命</span>
          <div class="flex items-center gap-1 text-xs text-emerald-400 font-semibold group-hover:text-emerald-300 group-hover:translate-x-1 transition-all cursor-pointer">
            <span>立即进入战役</span>
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>

      </router-link>

      <!-- ==================== [Row 3 Left] 变长列车卡片 ==================== -->

      <!-- 5. 第13号列车 · 交互小说 (全新殿堂级重构：深空星轨特快) -->
      <router-link to="/scenario" class="group relative col-span-1 md:col-span-2 lg:col-span-2 h-full min-h-[240px] bg-[#02050e] rounded-md overflow-hidden border border-blue-500/20 hover:border-blue-400/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] transition-all duration-500 flex flex-col justify-between p-6">

        <!-- 1. 背景层：超空间星轨隧道与极速流星 -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute inset-0 bg-gradient-to-r from-[#02050e] via-[#08132b] to-[#02050e]"></div>
          <div class="star-bg absolute inset-0 opacity-30" style="background-image: radial-gradient(white 1.5px, transparent 1.5px); background-size: 36px 36px;"></div>
          <!-- 极速时空穿梭线 -->
          <div class="absolute inset-0 flex flex-col justify-around opacity-25 group-hover:opacity-50 transition-opacity duration-700">
            <div class="speed-line h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            <div class="speed-line h-[1px] w-full bg-gradient-to-r from-transparent via-blue-400 to-transparent" style="animation-duration: 1.8s; animation-delay: 0.4s;"></div>
          </div>
          <div class="absolute -top-16 -right-16 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
        </div>

        <!-- 2. 顶部：极简科技状态栏 -->
        <div class="relative z-10 flex items-center justify-between border-b border-white/5 pb-2">
          <span class="text-xs font-semibold text-white tracking-wide">NO.13 深空特快</span>
          <span class="text-[10px] text-cyan-300/80 font-mono">跃迁时速: 9.8c</span>
        </div>

        <!-- 3. 中部：舒展布局 (左侧剧情导引 + 右侧星轨跃迁视窗) -->
        <div class="relative z-10 my-auto py-1 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <!-- 左侧：故事线与沉浸介绍 (自然双行排版，杜绝单字断行) -->
          <div class="md:col-span-6 space-y-2">
            <h3 class="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight group-hover:text-cyan-300 transition-colors">
              第13号列车<br>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                深空交互小说
              </span>
            </h3>
            <p class="text-xs text-slate-400 font-normal leading-relaxed">
              “下一站是深渊还是星辰？” 全沉浸式生成式剧情引擎，每一个抉择都将实时坍缩出一个全新的平行世界。
            </p>
            <div class="flex items-center gap-2 pt-0.5">
              <span class="text-[9px] text-cyan-300 font-medium bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">多分支宇宙</span>
              <span class="text-[9px] text-emerald-300 font-medium bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">动态剧情推演</span>
            </div>
          </div>

          <!-- 右侧：影视级 3D 深空星轨跃迁视窗 (50% 视窗) -->
          <div class="md:col-span-6 relative h-26 rounded-lg overflow-hidden border border-cyan-500/30 shadow-lg shadow-blue-950/60 pointer-events-none group-hover:border-cyan-400/50 transition-all">
            
            <!-- 影视级深空超光速穿梭视窗背景 -->
            <img 
              src="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800&auto=format&fit=crop" 
              class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 brightness-90 group-hover:brightness-105" 
              alt="Deep Space Express Starrail"
            />
            
            <!-- 光影渐变保护层 -->
            <div class="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/40"></div>

            <!-- 航道激光扫描线 -->
            <div class="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-[scan-fast_2.5s_ease-in-out_infinite] shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>

            <!-- 中心全息星际航向导航准心 (Quantum Starrail Navigation Compass) -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="relative w-12 h-12 flex items-center justify-center">
                <!-- 外层旋转刻度环 -->
                <div class="absolute inset-0 rounded-full border border-dashed border-cyan-400/40 animate-[spin_12s_linear_infinite]"></div>
                <!-- 内层对焦环 -->
                <div class="w-8 h-8 rounded-full border border-cyan-300/60 flex items-center justify-center shadow-[0_0_12px_rgba(56,189,248,0.5)]">
                  <!-- 十字准心标 -->
                  <div class="absolute w-10 h-[1px] bg-cyan-400/40"></div>
                  <div class="absolute h-10 w-[1px] bg-cyan-400/40"></div>
                  <!-- 中心信标光子 -->
                  <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
                </div>
              </div>
            </div>

            <!-- 四角微距 HUD 刻度标 -->
            <div class="absolute top-1.5 left-1.5 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10 text-[8px] text-cyan-200 font-mono">
              <span>WARP 9.8c</span>
            </div>

            <div class="absolute bottom-1.5 right-1.5 bg-cyan-950/80 backdrop-blur-md px-1.5 py-0.5 rounded border border-cyan-500/30 text-[8px] text-cyan-300 font-medium flex items-center gap-1">
              <span>航向：未知平行宇宙</span>
            </div>

          </div>

        </div>

        <!-- 4. 底部：行动引导栏 -->
        <div class="relative z-10 pt-2 border-t border-white/5 flex items-center justify-between">
          <span class="text-xs text-slate-400 font-mono">第 13 号车厢 · 状态就绪</span>
          <div class="flex items-center gap-1 text-xs text-cyan-400 font-semibold group-hover:text-cyan-300 group-hover:translate-x-1 transition-all cursor-pointer">
            <span>开启探索</span>
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>

      </router-link>

      <!-- ==================== [Row 3 Right] 智能语音与前沿视频工坊 ==================== -->

      <!-- 6. 智能语音工坊 (全新重构版：神经声纹流体波形工作台) -->
      <router-link to="/ai-audio" class="group relative col-span-1 h-full min-h-[240px] bg-[#070e17] rounded-md overflow-hidden border border-sky-500/20 hover:border-sky-400/50 hover:shadow-[0_0_35px_rgba(14,165,233,0.25)] transition-all duration-500 flex flex-col justify-between p-5">

        <!-- 1. 背景层：极简声波网格与深空辉光 -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-sky-950/40 via-[#070e17] to-[#070e17]"></div>
          <div class="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)]" style="background-size: 16px 16px;"></div>
          <div class="absolute -top-10 -right-10 w-36 h-36 bg-sky-500/15 rounded-full blur-2xl group-hover:bg-sky-500/30 transition-colors"></div>
        </div>

        <!-- 2. 顶部：极简科技状态栏 -->
        <div class="relative z-10 flex items-center justify-between border-b border-white/5 pb-2">
          <span class="text-xs font-semibold text-white tracking-wide">智能音频工坊</span>
          <span class="text-[10px] text-sky-300/80 font-mono">实时流式合成</span>
        </div>

        <!-- 3. 中部：神经声纹流体动态波形与中心共振核 (Resonant Acoustic Waveform Matrix) -->
        <div class="relative z-10 my-auto py-1 flex items-center justify-center pointer-events-none">
          <div class="relative w-full h-24 flex items-center justify-center">

            <!-- 声波扩散环 -->
            <div class="absolute w-20 h-20 rounded-full border border-sky-500/20 audio-ripple"></div>
            <div class="absolute w-28 h-28 rounded-full border border-dashed border-sky-500/15 animate-[spin_20s_linear_infinite]"></div>

            <!-- 流动波形 SVG (2条相位差动态流光曲线) -->
            <svg class="w-full h-full absolute inset-0 overflow-visible" viewBox="0 0 200 80" fill="none">
              <!-- 波形 1 -->
              <path 
                d="M 10 40 Q 35 15, 65 40 T 120 40 T 175 40 T 195 40" 
                stroke="#0284c7" 
                stroke-width="2" 
                stroke-linecap="round" 
                opacity="0.5"
                class="audio-wave-back"
              />
              <!-- 波形 2 (发光主波) -->
              <path 
                d="M 5 40 Q 30 65, 60 40 T 115 40 T 170 40 T 195 40" 
                stroke="#38bdf8" 
                stroke-width="2.5" 
                stroke-linecap="round" 
                class="audio-wave-front"
              />
              <!-- 沿波形飞驰的实时声子 -->
              <circle r="3" fill="#38bdf8">
                <animateMotion path="M 5 40 Q 30 65, 60 40 T 115 40 T 170 40 T 195 40" dur="2.2s" repeatCount="indefinite" />
              </circle>
            </svg>

            <!-- 中心发光麦克风声纹晶核 -->
            <div class="relative z-10 w-11 h-11 rounded-full bg-gradient-to-tr from-sky-600 to-blue-500 p-0.5 shadow-[0_0_20px_rgba(56,189,248,0.5)] group-hover:scale-110 transition-transform duration-300">
              <div class="w-full h-full bg-[#070e17]/90 rounded-full flex items-center justify-center text-sky-300">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
            </div>

            <!-- 左右两侧音频均衡脉冲条 -->
            <div class="absolute left-2 flex items-center gap-1">
              <span class="w-1 bg-sky-400/80 rounded-full v-bar-1"></span>
              <span class="w-1 bg-sky-400/80 rounded-full v-bar-2"></span>
              <span class="w-1 bg-sky-400/80 rounded-full v-bar-3"></span>
            </div>
            <div class="absolute right-2 flex items-center gap-1">
              <span class="w-1 bg-sky-400/80 rounded-full v-bar-3"></span>
              <span class="w-1 bg-sky-400/80 rounded-full v-bar-1"></span>
              <span class="w-1 bg-sky-400/80 rounded-full v-bar-2"></span>
            </div>

          </div>
        </div>

        <!-- 4. 底部：标题与描述 -->
        <div class="relative z-10 pt-2 border-t border-white/5">
          <div class="flex items-center justify-between mb-0.5">
            <h3 class="text-base font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">
              智能语音
            </h3>
            <svg class="w-3.5 h-3.5 text-sky-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <p class="text-xs text-slate-400 font-normal leading-relaxed">
            声音克隆与多情感拟真语音合成
          </p>
        </div>
      </router-link>

      <!-- 7. AI 视频生成 (全新重构版：电影级全息运镜视窗与时间轴) -->
      <div class="group relative col-span-1 h-full min-h-[240px] bg-[#080d1a] rounded-md overflow-hidden border border-indigo-500/20 hover:border-indigo-400/50 hover:shadow-[0_0_35px_rgba(99,102,241,0.25)] transition-all duration-500 flex flex-col justify-between p-5">

        <!-- 1. 背景层：胶片空间坐标与深空星云微光 -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-950/40 via-[#080d1a] to-[#080d1a]"></div>
          <div class="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)]" style="background-size: 16px 16px;"></div>
          <div class="absolute -top-10 -right-10 w-36 h-36 bg-indigo-500/15 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-colors"></div>
        </div>

        <!-- 2. 顶部：极简科技状态栏 -->
        <div class="relative z-10 flex items-center justify-between border-b border-white/5 pb-2">
          <span class="text-xs font-semibold text-white tracking-wide">前沿视频实验室</span>
          <span class="text-[10px] text-indigo-300/80 font-mono">研发中 · 即将开放</span>
        </div>

        <!-- 3. 中部：电影级全息动态视窗 (Cinematic AI Video Motion Viewfinder) -->
        <div class="relative z-10 my-auto py-1 flex items-center justify-center pointer-events-none">
          <div class="relative w-full h-24 rounded-md overflow-hidden border border-indigo-400/40 shadow-lg shadow-indigo-950/60 group-hover:border-indigo-300/60 transition-all duration-500">
            
            <!-- 电影镜头高清画幅 (4K 电影运镜预览图) -->
            <img 
              src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop" 
              class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 brightness-90 group-hover:brightness-105" 
              alt="4K Cinematic Video Preview"
            />
            
            <!-- 胶片光影遮罩 -->
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40"></div>

            <!-- 激光帧渲染扫描线 -->
            <div class="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-300 to-transparent animate-[scan-fast_2.2s_ease-in-out_infinite] shadow-[0_0_8px_rgba(165,180,252,0.8)]"></div>

            <!-- 取景器四角微距对焦线 -->
            <div class="absolute top-1 left-1 w-2 h-2 border-t border-l border-indigo-300"></div>
            <div class="absolute top-1 right-1 w-2 h-2 border-t border-r border-indigo-300"></div>
            <div class="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-indigo-300"></div>
            <div class="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-indigo-300"></div>

            <!-- 中心电影级玻璃播放核心 -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-8 h-8 rounded-full bg-indigo-950/70 backdrop-blur-md border border-indigo-400/60 flex items-center justify-center text-white shadow-[0_0_15px_rgba(99,102,241,0.6)] group-hover:scale-110 transition-transform">
                <svg class="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            <!-- 浮动参数：左上时间码 + 右下运镜参数 -->
            <div class="absolute top-1.5 left-1.5 flex items-center gap-1 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10">
              <span class="w-1 h-1 rounded-full bg-red-400 animate-pulse"></span>
              <span class="text-[8px] text-indigo-200 font-mono tracking-tight">REC 00:04 · 60FPS</span>
            </div>

            <div class="absolute bottom-1.5 right-1.5 flex items-center gap-1 bg-indigo-950/80 backdrop-blur-md px-1.5 py-0.5 rounded border border-indigo-500/30">
              <span class="text-[8px] font-semibold text-indigo-300">AI 多镜头运镜</span>
            </div>

          </div>
        </div>

        <!-- 4. 底部：标题与描述 -->
        <div class="relative z-10 pt-2 border-t border-white/5">
          <div class="flex items-center justify-between mb-0.5">
            <h3 class="text-base font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
              视频生成
            </h3>
            <span class="text-[10px] text-slate-400 font-normal bg-slate-800/80 px-2 py-0.5 rounded border border-white/5">敬请期待</span>
          </div>
          <p class="text-xs text-slate-400 font-normal leading-relaxed">
            文生动态视频与多镜头运镜推演
          </p>
        </div>
      </div>

    </div>

  </section>
</template>

<style scoped>
@keyframes audioRipple {
  0% { transform: scale(0.85); opacity: 0.8; }
  50% { transform: scale(1.15); opacity: 0.2; }
  100% { transform: scale(0.85); opacity: 0.8; }
}

.audio-ripple {
  animation: audioRipple 3s ease-in-out infinite;
}

@keyframes waveShift {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -80; }
}

.audio-wave-front {
  stroke-dasharray: 20 6;
  animation: waveShift 4s linear infinite;
}

.audio-wave-back {
  stroke-dasharray: 12 8;
  animation: waveShift 6s linear infinite reverse;
}

@keyframes vBarHeight {
  0%, 100% { height: 6px; }
  50% { height: 22px; }
}

.v-bar-1 {
  animation: vBarHeight 1.1s ease-in-out infinite;
}
.v-bar-2 {
  animation: vBarHeight 1.5s ease-in-out infinite 0.2s;
}
.v-bar-3 {
  animation: vBarHeight 1.3s ease-in-out infinite 0.4s;
}

@keyframes scan-fast {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>

<template>
  <!-- 2. 核心价值 Showcase (重构版：高级光影美学) -->
  <section class="mb-24 px-4 sm:px-6 lg:px-8 relative">

    <!-- 无边界环境柔光 (100% 自然渐变融入页面，消除硬边界色块) -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(219,234,254,0.45),transparent_75%)]"></div>
    </div>

    <div class="relative z-10 py-6 md:py-12">

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
               Feature 1: 深度思考 (Deep Reasoning) - 思维链神经矩阵
               ============================================================== -->
          <div class="group relative bg-white rounded-md p-8 border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-700 overflow-hidden z-10">

            <!-- [A] 动态背景光效 -->
            <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-[60px] group-hover:bg-blue-500/20 transition-colors duration-700"></div>

            <!-- [B] 视觉主体：全链路多阶思维推演流 (Hierarchical Neural Chain Pipeline) -->
            <div class="relative h-48 mb-6 flex items-center justify-center select-none overflow-hidden">
              <!-- 背景柔和光晕与坐标点阵 -->
              <div class="absolute w-44 h-44 rounded-full bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-all duration-700"></div>

              <!-- SVG 神经链路与思考脉冲 -->
              <svg class="w-full h-full" viewBox="0 0 290 150" fill="none">
                <!-- 背景骨干轨迹 (虚线) -->
                <path d="M 50 75 C 90 75, 95 40, 145 40" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="3 3" />
                <path d="M 50 75 C 90 75, 95 75, 145 75" stroke="#93c5fd" stroke-width="2" />
                <path d="M 50 75 C 90 75, 95 110, 145 110" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="3 3" />

                <path d="M 145 40 C 195 40, 200 75, 245 75" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="3 3" />
                <path d="M 145 75 C 195 75, 200 75, 245 75" stroke="#3b82f6" stroke-width="2" />
                <path d="M 145 110 C 195 110, 200 75, 245 75" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="3 3" />

                <!-- 沿主链路流动的光能数据包 (Thinking Packets) -->
                <circle r="3.5" fill="#2563eb">
                  <animateMotion path="M 50 75 C 90 75, 95 75, 145 75 C 195 75, 200 75, 245 75" dur="2.2s" repeatCount="indefinite" />
                </circle>
                <circle r="2.5" fill="#38bdf8">
                  <animateMotion path="M 50 75 C 90 75, 95 40, 145 40 C 195 40, 200 75, 245 75" dur="2.8s" repeatCount="indefinite" />
                </circle>
                <circle r="2.5" fill="#10b981">
                  <animateMotion path="M 50 75 C 90 75, 95 110, 145 110 C 195 110, 200 75, 245 75" dur="3.2s" repeatCount="indefinite" />
                </circle>

                <!-- 阶段 1：输入提示 (Input Prompt) -->
                <g transform="translate(50, 75)" class="transition-transform duration-500 group-hover:scale-105 origin-center">
                  <circle r="16" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5" />
                  <circle r="6" fill="#2563eb" class="animate-pulse" />
                  <circle r="2" fill="#ffffff" />
                  <text x="0" y="28" text-anchor="middle" font-size="9" font-family="sans-serif" font-weight="600" fill="#64748b">问题输入</text>
                </g>

                <!-- 阶段 2：思维链多步推演核心 (CoT Thinking Matrix) -->
                <!-- 子步骤 1: 拆解 -->
                <g transform="translate(145, 40)" class="transition-transform duration-500 group-hover:scale-105 origin-center">
                  <rect x="-32" y="-12" width="64" height="24" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
                  <circle cx="-20" cy="0" r="3" fill="#94a3b8" />
                  <text x="4" y="3" text-anchor="middle" font-size="8.5" font-family="sans-serif" font-weight="500" fill="#64748b">① 逻辑拆解</text>
                </g>

                <!-- 子步骤 2: 深度反思 (主核) -->
                <g transform="translate(145, 75)" class="transition-transform duration-500 group-hover:scale-110 origin-center">
                  <rect x="-36" y="-14" width="72" height="28" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.8" class="shadow-sm" />
                  <circle cx="-22" cy="0" r="4" fill="#2563eb" class="animate-pulse" />
                  <text x="4" y="4" text-anchor="middle" font-size="9" font-family="sans-serif" font-weight="700" fill="#1d4ed8">② 深度反思</text>
                </g>

                <!-- 子步骤 3: 边界验证 -->
                <g transform="translate(145, 110)" class="transition-transform duration-500 group-hover:scale-105 origin-center">
                  <rect x="-32" y="-12" width="64" height="24" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
                  <circle cx="-20" cy="0" r="3" fill="#10b981" />
                  <text x="4" y="3" text-anchor="middle" font-size="8.5" font-family="sans-serif" font-weight="500" fill="#64748b">③ 交叉验证</text>
                </g>

                <!-- 阶段 3：严谨输出 (Final Output) -->
                <g transform="translate(245, 75)" class="transition-transform duration-500 group-hover:scale-105 origin-center">
                  <circle r="16" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1.5" />
                  <circle r="6" fill="#10b981" class="animate-pulse" />
                  <circle r="2" fill="#ffffff" />
                  <text x="0" y="28" text-anchor="middle" font-size="9" font-family="sans-serif" font-weight="600" fill="#059669">确定结论</text>
                </g>
              </svg>
            </div>

            <!-- [C] 文本内容 -->
            <div class="relative z-10">
              <h3 class="text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-blue-600 transition-colors">认知与推理</h3>
              <p class="text-sm text-slate-500 leading-relaxed mb-6 border-l-2 border-blue-100 pl-4 group-hover:border-blue-500 transition-colors">
                集成 <strong>DeepSeek-R1</strong> 核心。通过思维链 (CoT) 技术，赋予 AI 深度逻辑分析与复杂问题拆解能力。
              </p>

              <!-- 底部标签组 -->
              <div class="flex flex-wrap gap-2">
                <span class="px-2.5 py-1 rounded-md bg-blue-50 text-[10px] font-bold text-blue-600 tracking-wider border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all">深度推理</span>
                <span class="px-2.5 py-1 rounded-md bg-slate-50 text-[10px] font-bold text-slate-500 tracking-wider border border-slate-100">思维链 (CoT)</span>
              </div>
            </div>

            <!-- 装饰：角落角标 -->
            <svg class="absolute bottom-6 right-6 w-6 h-6 text-blue-100 group-hover:text-blue-500 transition-colors duration-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 22h-6v-2h4v-4h2v6z" />
            </svg>
          </div>

          <!-- Feature 2: 视觉创造 (Visual Creativity) - 4K 扩散模型全息画幅 -->
          <div class="group relative bg-white rounded-md p-8 border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-700 overflow-hidden z-10">

            <!-- [A] 环境氛围光 -->
            <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="absolute -left-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-[60px] group-hover:bg-blue-500/20 transition-colors duration-700"></div>

            <!-- [B] 视觉主体：4K 扩散模型全息画幅与光学取景矩阵 (4K Diffusion Canvas & Optical Viewfinder) -->
            <div class="relative h-48 mb-6 flex items-center justify-center select-none overflow-hidden perspective-1000">

              <!-- 外层环境光波 -->
              <div class="absolute w-44 h-44 rounded-full bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-all duration-700"></div>

              <!-- 悬浮全息画框 (Layered Art Canvas) -->
              <div class="relative w-52 h-34 rounded-xl bg-gradient-to-br from-blue-50/90 via-white to-sky-50/80 border border-blue-200/80 shadow-lg shadow-blue-500/10 flex items-center justify-center p-2.5 transition-all duration-700 group-hover:scale-105 group-hover:shadow-blue-500/20">

                <!-- 画布内部：生成式渐变光谱与网格 -->
                <div class="relative w-full h-full rounded-lg overflow-hidden bg-gradient-to-tr from-blue-600/10 via-sky-400/20 to-indigo-500/15 border border-blue-300/40 flex items-center justify-center">

                  <!-- 几何光网格 -->
                  <div class="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.08)_1px,transparent_1px)]" style="background-size: 14px 14px;"></div>

                  <!-- 动态扫描光波 (Laser Scanline) -->
                  <div class="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-[scan-fast_3s_ease-in-out_infinite]"></div>

                  <!-- 取景器九宫格准心 (Center Focus Crosshair) -->
                  <svg class="w-full h-full absolute inset-0 p-2 text-blue-400/60 pointer-events-none" viewBox="0 0 100 70" fill="none" stroke="currentColor">
                    <!-- 四角对焦线 -->
                    <path d="M 6 12 L 6 6 L 12 6" stroke-width="1.5" />
                    <path d="M 94 12 L 94 6 L 88 6" stroke-width="1.5" />
                    <path d="M 6 58 L 6 64 L 12 64" stroke-width="1.5" />
                    <path d="M 94 58 L 94 64 L 88 64" stroke-width="1.5" />
                    <!-- 中心对焦点 -->
                    <circle cx="50" cy="35" r="8" stroke="#3b82f6" stroke-width="1" stroke-dasharray="2 2" />
                    <circle cx="50" cy="35" r="2.5" fill="#2563eb" class="animate-pulse" />
                  </svg>

                  <!-- 悬浮元数据角标 (左上: 分辨率) -->
                  <div class="absolute top-1.5 left-2 px-1.5 py-0.5 rounded bg-white/80 border border-blue-200/80 backdrop-blur-xs text-[8px] font-bold text-blue-600 shadow-2xs">
                    4K 超高清画质
                  </div>

                  <!-- 悬浮元数据角标 (右下: 渲染完成率) -->
                  <div class="absolute bottom-1.5 right-2 px-1.5 py-0.5 rounded bg-white/80 border border-emerald-200/80 backdrop-blur-xs text-[8px] font-bold text-emerald-600 flex items-center gap-1 shadow-2xs">
                    <span class="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>100% 渲染完成</span>
                  </div>
                </div>

              </div>
            </div>

            <!-- [C] 文本内容 (统一标准规范) -->
            <div class="relative z-10">
              <h3 class="text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-blue-600 transition-colors">视觉与想象</h3>
              <p class="text-sm text-slate-500 leading-relaxed mb-6 border-l-2 border-blue-100 pl-4 group-hover:border-blue-500 transition-colors font-normal">
                打破语言的边界。利用多模态大模型，将抽象的文本指令转化为 4K 级的艺术图像与设计素材。
              </p>

              <div class="flex flex-wrap gap-2">
                <span class="px-2.5 py-1 rounded-md bg-blue-50 text-[10px] font-bold text-blue-600 tracking-wider border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all">生成式艺术</span>
                <span class="px-2.5 py-1 rounded-md bg-slate-50 text-[10px] font-bold text-slate-500 tracking-wider border border-slate-100">多模态渲染</span>
                <span class="px-2.5 py-1 rounded-md bg-slate-50 text-[10px] font-bold text-slate-500 tracking-wider border border-slate-100">4K 高清输出</span>
              </div>
            </div>

            <svg class="absolute bottom-6 right-6 w-6 h-6 text-blue-100 group-hover:text-blue-500 transition-colors duration-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 22h-6v-2h4v-4h2v6z" />
            </svg>
          </div>

          <!-- ==============================================================
               Feature 3: 互动娱乐 (Interactive) - 量子平行分支推演
               ============================================================== -->
          <div class="group relative bg-white rounded-md p-8 border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-700 overflow-hidden z-10">

            <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-[60px] group-hover:bg-blue-500/20 transition-colors duration-700"></div>

            <!-- [B] 视觉主体：量子平行分支树 (完全统一步调的浅色纯净风格) -->
            <div class="relative h-48 mb-6 flex items-center justify-center">

              <!-- 动态分支 SVG (与卡片1/2统一的浅色蓝灰神经网格) -->
              <svg class="w-full h-full select-none" viewBox="0 0 280 160" fill="none">
                <!-- 静态分支背景虚线 -->
                <path d="M 50 80 C 110 80, 130 35, 200 35" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.8" />
                <path d="M 50 80 C 110 80, 130 80, 200 80" stroke="#93c5fd" stroke-width="2" stroke-dasharray="3 3" opacity="0.9" />
                <path d="M 50 80 C 110 80, 130 125, 200 125" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.8" />

                <!-- 激活主线实线轨道 -->
                <path d="M 50 80 C 110 80, 130 80, 200 80" stroke="#3b82f6" stroke-width="2" />

                <!-- 沿激活分支流动的光流数据包 (与卡片1完全一致的数据流动质感) -->
                <circle r="3.5" fill="#2563eb">
                  <animateMotion path="M 50 80 C 110 80, 130 80, 200 80" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle r="2.5" fill="#0284c7">
                  <animateMotion path="M 50 80 C 110 80, 130 35, 200 35" dur="2.8s" repeatCount="indefinite" />
                </circle>
                <circle r="2.5" fill="#64748b">
                  <animateMotion path="M 50 80 C 110 80, 130 125, 200 125" dur="3.2s" repeatCount="indefinite" />
                </circle>

                <!-- 起点节点 (左侧：当前抉择点) -->
                <g class="transition-transform duration-500 group-hover:scale-110 origin-center">
                  <circle cx="50" cy="80" r="14" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5" />
                  <circle cx="50" cy="80" r="5" fill="#2563eb" class="animate-pulse" />
                  <text x="50" y="108" text-anchor="middle" font-size="9" font-family="sans-serif" font-weight="600" fill="#64748b">抉择点</text>
                </g>

                <!-- 分支 A 目标节点 (上: 秩序星环) -->
                <g class="transition-transform duration-500 group-hover:scale-105 origin-center">
                  <circle cx="200" cy="35" r="11" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
                  <circle cx="200" cy="35" r="3.5" fill="#94a3b8" />
                  <text x="218" y="38" font-size="9" font-family="sans-serif" font-weight="500" fill="#64748b">秩序星环</text>
                </g>

                <!-- 分支 B 目标节点 (中: 第13号列车 · 激活状态) -->
                <g class="transition-transform duration-500 group-hover:scale-110 origin-center">
                  <circle cx="200" cy="80" r="13" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" />
                  <circle cx="200" cy="80" r="5" fill="#2563eb" class="animate-pulse" />
                  <text x="220" y="84" font-size="9" font-family="sans-serif" font-weight="700" fill="#1d4ed8">第13号列车</text>
                </g>

                <!-- 分支 C 目标节点 (下: 永恒之刃) -->
                <g class="transition-transform duration-500 group-hover:scale-105 origin-center">
                  <circle cx="200" cy="125" r="11" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
                  <circle cx="200" cy="125" r="3.5" fill="#94a3b8" />
                  <text x="218" y="128" font-size="9" font-family="sans-serif" font-weight="500" fill="#64748b">永恒之刃</text>
                </g>
              </svg>
            </div>

            <!-- [C] 文本内容 (与卡片1/2完全统一) -->
            <div class="relative z-10">
              <h3 class="text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-blue-600 transition-colors">无限流互动</h3>
              <p class="text-sm text-slate-500 leading-relaxed mb-6 border-l-2 border-blue-100 pl-4 group-hover:border-blue-500 transition-colors font-normal">
                生成式剧情推演引擎。打造 Roguelike 战役与沉浸式互动小说，每一次选择都通向未知的平行宇宙。
              </p>

              <div class="flex flex-wrap gap-2">
                <span class="px-2.5 py-1 rounded-md bg-blue-50 text-[10px] font-bold text-blue-600 tracking-wider border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all">智能互动</span>
                <span class="px-2.5 py-1 rounded-md bg-slate-50 text-[10px] font-bold text-slate-500 tracking-wider border border-slate-100">无限分支</span>
                <span class="px-2.5 py-1 rounded-md bg-slate-50 text-[10px] font-bold text-slate-500 tracking-wider border border-slate-100">Roguelike 机制</span>
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

            <!-- Metric 1: 响应延迟 (Latency) -->
            <div class="group relative flex flex-col items-center justify-between">
              <div class="absolute right-0 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent hidden md:block lg:hidden"></div>

              <div class="text-[11px] font-bold text-slate-500 tracking-wider mb-2 flex items-center gap-1.5">
                <div class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                响应延迟
              </div>
              <div class="relative">
                <div class="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-slate-800 to-slate-600 group-hover:from-blue-600 group-hover:to-blue-400 transition-all duration-300">
                  50<span class="text-sm font-sans font-medium text-slate-400 ml-1 align-baseline">ms</span>
                </div>
              </div>
              <!-- 微型图表：动态流动光波 (Active Flowing Wave) -->
              <div class="h-6 w-24 mt-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                <svg viewBox="0 0 100 24" class="w-full h-full fill-none overflow-visible">
                  <path d="M0 12 Q 25 4 45 12 T 75 16 T 100 12" stroke="#93c5fd" stroke-width="1.5" opacity="0.4" />
                  <path d="M0 12 Q 25 4 45 12 T 75 16 T 100 12" stroke="#2563eb" stroke-width="2" stroke-linecap="round" class="animate-wave-flow" stroke-dasharray="24 16" />
                  <circle r="2.5" fill="#2563eb">
                    <animateMotion path="M0 12 Q 25 4 45 12 T 75 16 T 100 12" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
            </div>

            <!-- Metric 2: 上下文容量 (Context) -->
            <div class="group relative flex flex-col items-center justify-between">
              <div class="absolute right-0 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent hidden md:block"></div>

              <div class="text-[11px] font-bold text-slate-500 tracking-wider mb-2 flex items-center gap-1.5">
                <div class="w-1.5 h-1.5 rounded-sm bg-blue-500"></div>
                上下文容量
              </div>
              <div class="relative">
                <div class="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-slate-800 to-slate-600 group-hover:from-blue-600 group-hover:to-blue-400 transition-all duration-300">
                  128<span class="text-sm font-sans font-medium text-slate-400 ml-1 align-baseline">k</span>
                </div>
              </div>
              <!-- 微型图表：动态跳动频谱柱 (Active Audio / Capacity Spectrum) -->
              <div class="h-6 w-24 mt-3 flex items-end justify-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                <div class="w-1.5 bg-gradient-to-t from-blue-600 to-sky-400 rounded-t animate-bar-1"></div>
                <div class="w-1.5 bg-gradient-to-t from-blue-600 to-sky-400 rounded-t animate-bar-2"></div>
                <div class="w-1.5 bg-gradient-to-t from-blue-600 to-sky-400 rounded-t animate-bar-3"></div>
                <div class="w-1.5 bg-gradient-to-t from-blue-600 to-sky-400 rounded-t animate-bar-4"></div>
                <div class="w-1.5 bg-gradient-to-t from-blue-600 to-sky-400 rounded-t animate-bar-5"></div>
                <div class="w-1.5 bg-gradient-to-t from-blue-600 to-sky-400 rounded-t animate-bar-6"></div>
              </div>
            </div>

            <!-- Metric 3: 落地场景 (Scenarios) -->
            <div class="group relative flex flex-col items-center justify-between">
              <div class="absolute right-0 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent hidden md:block lg:hidden"></div>

              <div class="text-[11px] font-bold text-slate-500 tracking-wider mb-2 flex items-center gap-1.5">
                <div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                落地场景
              </div>
              <div class="relative">
                <div class="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-slate-800 to-slate-600 group-hover:from-blue-600 group-hover:to-blue-400 transition-all duration-300">
                  ∞
                </div>
              </div>
              <!-- 微型图表：无限符号动态双环回旋轨道 (Dynamic Infinity Orbit) -->
              <div class="h-6 w-24 mt-3 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-300 overflow-visible">
                <svg viewBox="0 0 70 24" class="w-20 h-full fill-none overflow-visible">
                  <!-- 静态双环轨道底线 -->
                  <path 
                    d="M 35 12 C 45 4, 62 4, 62 12 C 62 20, 45 20, 35 12 C 25 4, 8 4, 8 12 C 8 20, 25 20, 35 12 Z" 
                    stroke="#93c5fd" 
                    stroke-width="1.5" 
                    opacity="0.4" 
                  />
                  <!-- 发光动态环绕轨道 -->
                  <path 
                    d="M 35 12 C 45 4, 62 4, 62 12 C 62 20, 45 20, 35 12 C 25 4, 8 4, 8 12 C 8 20, 25 20, 35 12 Z" 
                    stroke="#0284c7" 
                    stroke-width="1.8" 
                    stroke-dasharray="24 16"
                    class="animate-wave-flow" 
                  />
                  <!-- 沿 ∞ 轨道做 8 字回旋飞行的动态光子 -->
                  <circle r="2.5" fill="#0284c7">
                    <animateMotion 
                      path="M 35 12 C 45 4, 62 4, 62 12 C 62 20, 45 20, 35 12 C 25 4, 8 4, 8 12 C 8 20, 25 20, 35 12 Z" 
                      dur="2.5s" 
                      repeatCount="indefinite" 
                    />
                  </circle>
                  <!-- 8 字交叉中心微光核 -->
                  <circle cx="35" cy="12" r="1.5" fill="#38bdf8" class="animate-pulse" />
                </svg>
              </div>
            </div>

            <!-- Metric 4: SLA 服务保障 (Uptime) -->
            <div class="group relative flex flex-col items-center justify-between">
              <div class="text-[11px] font-bold text-slate-500 tracking-wider mb-2 flex items-center gap-1.5">
                <div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                SLA 服务保障
              </div>
              <div class="relative">
                <div class="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-slate-800 to-slate-600 group-hover:from-blue-600 group-hover:to-blue-400 transition-all duration-300">
                  99.9<span class="text-sm font-sans font-medium text-slate-400 ml-1 align-baseline">%</span>
                </div>
              </div>
              <!-- 微型图表：动态心跳心电图 (Active Telemetry ECG Pulse) -->
              <div class="h-6 w-24 mt-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300 overflow-visible">
                <svg viewBox="0 0 100 24" class="w-full h-full fill-none overflow-visible">
                  <path d="M0 12 H 30 L 40 3 L 50 21 L 60 12 H 100" stroke="#93c5fd" stroke-width="1.5" opacity="0.4" />
                  <path d="M0 12 H 30 L 40 3 L 50 21 L 60 12 H 100" stroke="#2563eb" stroke-width="2" stroke-linecap="round" class="animate-ecg-sweep" stroke-dasharray="35 100" />
                  <circle r="2.5" fill="#2563eb">
                    <animateMotion path="M0 12 H 30 L 40 3 L 50 21 L 60 12 H 100" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
            </div>

          </div>
        </div>
      </div>
  </section>
</template>

<style scoped>
@keyframes waveFlow {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -40; }
}
@keyframes waveFlowRev {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: 32; }
}
@keyframes ecgSweep {
  0% { stroke-dashoffset: 135; }
  100% { stroke-dashoffset: -135; }
}
@keyframes barPulse1 {
  0%, 100% { height: 25%; }
  50% { height: 85%; }
}
@keyframes barPulse2 {
  0%, 100% { height: 60%; }
  50% { height: 30%; }
}
@keyframes barPulse3 {
  0%, 100% { height: 40%; }
  50% { height: 95%; }
}
@keyframes barPulse4 {
  0%, 100% { height: 80%; }
  50% { height: 40%; }
}
@keyframes barPulse5 {
  0%, 100% { height: 35%; }
  50% { height: 75%; }
}
@keyframes barPulse6 {
  0%, 100% { height: 50%; }
  50% { height: 20%; }
}

.animate-wave-flow {
  animation: waveFlow 2s linear infinite;
}
.animate-wave-flow-rev {
  animation: waveFlowRev 2.5s linear infinite;
}
.animate-ecg-sweep {
  animation: ecgSweep 2.2s linear infinite;
}
.animate-bar-1 { height: 25%; animation: barPulse1 1.2s ease-in-out infinite; }
.animate-bar-2 { height: 60%; animation: barPulse2 1.5s ease-in-out infinite 0.2s; }
.animate-bar-3 { height: 40%; animation: barPulse3 1.1s ease-in-out infinite 0.4s; }
.animate-bar-4 { height: 80%; animation: barPulse4 1.4s ease-in-out infinite 0.1s; }
.animate-bar-5 { height: 35%; animation: barPulse5 1.3s ease-in-out infinite 0.3s; }
.animate-bar-6 { height: 50%; animation: barPulse6 1.6s ease-in-out infinite 0.5s; }
</style>


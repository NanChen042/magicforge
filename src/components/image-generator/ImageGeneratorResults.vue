<template>
  <!-- 
    主容器：
    bg-white: 白底
    rounded-2xl: 大圆角
    shadow-xl: 深邃阴影
    min-h-[600px]: 保证最小高度
  -->
  <div class="relative w-full min-h-[600px] bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden font-sans text-slate-700 flex flex-col">

    <!-- ==========================================
         1. 空状态 (Empty State) - 引导页
         ========================================== -->
    <transition enter-active-class="transition duration-500 ease-out" enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-300 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="!generatedImages.length && !loading" class="flex-1 flex flex-col items-center justify-center p-8 md:p-12">

        <div class="max-w-4xl w-full flex flex-col items-center gap-10">

          <!-- 头部文案 -->
          <div class="text-center space-y-4">
            <div class="inline-flex items-center px-3 py-1 rounded-full bg-[#4E54C8]/10 text-[#4E54C8] text-xs font-bold tracking-wider uppercase mb-2">
              AI Creative Engine
            </div>
            <h3 class="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#4E54C8] to-[#8F94FB] tracking-tight">
              释放您的无限想象
            </h3>
            <p class="text-slate-500 text-lg md:text-xl font-light max-w-2xl mx-auto">
              从文字到杰作，只需简单几步，让 AI 为您捕捉灵感的瞬间
            </p>
          </div>

          <!-- 
  AI 灵感核心组件 
  包含：背景光晕、轨道系统、核心能量、悬浮功能卡片
-->
          <div class="relative w-full max-w-[400px] h-[360px] flex items-center justify-center select-none pointer-events-none">

            <!-- 1. 背景氛围光 (Atmosphere Glow) -->
            <div class="absolute inset-0 flex items-center justify-center">
              <!-- 主光晕 -->
              <div class="w-64 h-64 bg-[#4E54C8] rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-pulse"></div>
              <!-- 辅光晕 (偏移) -->
              <div class="absolute top-10 -right-10 w-64 h-64 bg-[#8F94FB] rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob animation-delay-2000"></div>
              <div class="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <!-- 2. 科技轨道环 (Orbit Rings) -->
            <div class="absolute inset-0 flex items-center justify-center">
              <!-- 外环虚线 -->
              <div class="w-[320px] h-[320px] border border-dashed border-slate-200 rounded-full animate-spin-slow opacity-60"></div>
              <!-- 内环实线 (反向旋转) -->
              <div class="absolute w-[240px] h-[240px] border border-slate-100 rounded-full animate-reverse-spin opacity-50"></div>
            </div>

            <!-- 3. 中央能量核心 (The Core) -->
            <div class="relative z-10 w-32 h-32 flex items-center justify-center">
              <!-- 核心光球 -->
              <div class="absolute inset-0 bg-gradient-to-tr from-[#4E54C8] to-[#8F94FB] rounded-full shadow-2xl shadow-[#4E54C8]/40 animate-float"></div>
              <!-- 内部纹理 (网格) -->
              <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 rounded-full bg-cover"></div>
              <!-- 核心图标 -->
              <div class="relative z-20 text-white text-4xl animate-pulse">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>

            <!-- 4. 悬浮功能卡片 (Floating Elements) -->
            <!-- 卡片 1: 提示词输入 (左上) -->
            <div class="absolute top-10 left-10 z-20 animate-float-delayed-1">
              <div class="flex items-center gap-3 px-4 py-2 bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl shadow-lg shadow-indigo-500/10">
                <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-[#4E54C8]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div class="flex flex-col gap-1">
                  <div class="w-12 h-2 bg-slate-300 rounded-full"></div>
                  <div class="w-8 h-2 bg-slate-200 rounded-full"></div>
                </div>
              </div>
            </div>

            <!-- 卡片 2: 图片生成 (右中) -->
            <div class="absolute top-1/2 -right-4 z-20 animate-float-delayed-2">
              <div class="p-2 bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl shadow-lg shadow-purple-500/10 transform rotate-6">
                <div class="w-16 h-12 bg-gradient-to-br from-purple-100 to-indigo-50 rounded-lg flex items-center justify-center overflow-hidden">
                  <svg class="text-indigo-300 w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            <!-- 卡片 3: 调色板/参数 (左下) -->
            <div class="absolute bottom-12 left-16 z-20 animate-float-delayed-3">
              <div class="flex items-center justify-center w-12 h-12 bg-white/60 backdrop-blur-md border border-white/50 rounded-full shadow-lg shadow-blue-500/10">
                <svg class="text-[#8F94FB] w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
                  <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
                  <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
                  <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
                  <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
                  <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
                </svg>
              </div>
            </div>

            <!-- 装饰粒子 (Particles) -->
            <div class="absolute top-20 right-20 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
            <div class="absolute bottom-20 left-10 w-2 h-2 bg-indigo-400 rounded-full animate-ping"></div>
            <div class="absolute top-10 left-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full"></div>

          </div>

          <!-- 步骤流程容器 -->
          <div class="relative z-10 w-full max-w-5xl mx-auto mt-8">

            <!-- 1. 背景连接线 (Flow Connector) - 仅在桌面端显示 -->
            <div class="hidden md:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-slate-200 -z-10 transform -translate-y-1/2"></div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

              <!-- Step 1: 输入灵感 -->
              <div class="group relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-[#4E54C8]/10 hover:border-[#4E54C8]/30 transition-all duration-500 overflow-hidden">
                <!-- 顶部高光条 -->
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#4E54C8] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <!-- 装饰：右上角 HUD 编号 -->
                <div class="absolute top-4 right-4 flex flex-col items-end opacity-30 group-hover:opacity-100 transition-opacity duration-300">
                  <span class="text-[10px] font-mono font-bold text-[#4E54C8] tracking-widest">STEP.01</span>
                  <div class="w-8 h-0.5 bg-[#4E54C8] mt-1"></div>
                </div>

                <!-- 图标容器 (玻璃拟态 + 渐变) -->
                <div class="relative w-14 h-14 mb-6">
                  <div class="absolute inset-0 bg-[#4E54C8]/5 rounded-xl rotate-3 group-hover:rotate-12 transition-transform duration-500"></div>
                  <div class="absolute inset-0 bg-white border border-slate-100 rounded-xl shadow-sm flex items-center justify-center text-[#4E54C8] group-hover:-translate-y-1 transition-transform duration-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </div>
                </div>

                <!-- 内容文本 -->
                <h4 class="text-lg font-bold text-slate-800 mb-2 group-hover:text-[#4E54C8] transition-colors">输入灵感</h4>
                <p class="text-sm text-slate-500 leading-relaxed">捕捉脑海中的瞬间。支持中英文描述，AI 将自动理解您的创意语境。</p>

                <!-- 底部微交互：进度条 -->
                <div class="absolute bottom-0 left-0 w-full h-1 bg-slate-50">
                  <div class="h-full bg-[#4E54C8] w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                </div>

                <!-- 装饰：左下角十字 -->
                <div class="absolute bottom-3 left-3 text-slate-200">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <rect x="5" width="2" height="12" />
                    <rect y="5" width="12" height="2" />
                  </svg>
                </div>
              </div>

              <!-- Step 2: 调整参数 -->
              <div class="group relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-[#8F94FB]/10 hover:border-[#8F94FB]/30 transition-all duration-500 overflow-hidden">
                <!-- 顶部高光条 -->
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8F94FB] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <!-- 装饰：右上角 HUD 编号 -->
                <div class="absolute top-4 right-4 flex flex-col items-end opacity-30 group-hover:opacity-100 transition-opacity duration-300">
                  <span class="text-[10px] font-mono font-bold text-[#8F94FB] tracking-widest">STEP.02</span>
                  <div class="w-8 h-0.5 bg-[#8F94FB] mt-1"></div>
                </div>

                <!-- 图标容器 -->
                <div class="relative w-14 h-14 mb-6">
                  <div class="absolute inset-0 bg-[#8F94FB]/5 rounded-xl rotate-3 group-hover:rotate-12 transition-transform duration-500"></div>
                  <div class="absolute inset-0 bg-white border border-slate-100 rounded-xl shadow-sm flex items-center justify-center text-[#8F94FB] group-hover:-translate-y-1 transition-transform duration-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="4" y1="21" x2="4" y2="14"></line>
                      <line x1="4" y1="10" x2="4" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12" y2="3"></line>
                      <line x1="20" y1="21" x2="20" y2="16"></line>
                      <line x1="20" y1="12" x2="20" y2="3"></line>
                      <line x1="1" y1="14" x2="7" y2="14"></line>
                      <line x1="9" y1="8" x2="15" y2="8"></line>
                      <line x1="17" y1="16" x2="23" y2="16"></line>
                    </svg>
                  </div>
                </div>

                <!-- 内容文本 -->
                <h4 class="text-lg font-bold text-slate-800 mb-2 group-hover:text-[#8F94FB] transition-colors">参数调优</h4>
                <p class="text-sm text-slate-500 leading-relaxed">通过左侧控制台，精准定义画幅比例、风格强度及生成数量。</p>

                <!-- 底部微交互：进度条 -->
                <div class="absolute bottom-0 left-0 w-full h-1 bg-slate-50">
                  <div class="h-full bg-[#8F94FB] w-0 group-hover:w-full transition-all duration-700 ease-out delay-75"></div>
                </div>

                <!-- 装饰：左下角十字 -->
                <div class="absolute bottom-3 left-3 text-slate-200">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <rect x="5" width="2" height="12" />
                    <rect y="5" width="12" height="2" />
                  </svg>
                </div>
              </div>

              <!-- Step 3: 一键生成 -->
              <div class="group relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-400/30 transition-all duration-500 overflow-hidden">
                <!-- 顶部高光条 -->
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <!-- 装饰：右上角 HUD 编号 -->
                <div class="absolute top-4 right-4 flex flex-col items-end opacity-30 group-hover:opacity-100 transition-opacity duration-300">
                  <span class="text-[10px] font-mono font-bold text-purple-500 tracking-widest">STEP.03</span>
                  <div class="w-8 h-0.5 bg-purple-500 mt-1"></div>
                </div>

                <!-- 图标容器 -->
                <div class="relative w-14 h-14 mb-6">
                  <div class="absolute inset-0 bg-purple-500/5 rounded-xl rotate-3 group-hover:rotate-12 transition-transform duration-500"></div>
                  <div class="absolute inset-0 bg-white border border-slate-100 rounded-xl shadow-sm flex items-center justify-center text-purple-500 group-hover:-translate-y-1 transition-transform duration-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  </div>
                  <!-- 粒子特效装饰 -->
                  <div class="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                </div>

                <!-- 内容文本 -->
                <h4 class="text-lg font-bold text-slate-800 mb-2 group-hover:text-purple-500 transition-colors">一键生成</h4>
                <p class="text-sm text-slate-500 leading-relaxed">点击“开始创作”，见证算法将文字转化为像素的魔法时刻。</p>

                <!-- 底部微交互：进度条 -->
                <div class="absolute bottom-0 left-0 w-full h-1 bg-slate-50">
                  <div class="h-full bg-purple-500 w-0 group-hover:w-full transition-all duration-700 ease-out delay-150"></div>
                </div>

                <!-- 装饰：左下角十字 -->
                <div class="absolute bottom-3 left-3 text-slate-200">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <rect x="5" width="2" height="12" />
                    <rect y="5" width="12" height="2" />
                  </svg>
                </div>
              </div>

            </div>
          </div>

          <!-- 操作按钮组 -->
          <div class="flex gap-4 pt-4">
            <button @click="$emit('apply-random-template')" class="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-600 font-semibold hover:border-[#4E54C8] hover:text-[#4E54C8] hover:shadow-lg hover:shadow-[#4E54C8]/10 transition-all active:scale-95">
              <el-icon>
                <Star />
              </el-icon> 试试随机灵感
            </button>
            <button @click="scrollToPrompt" class="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#4E54C8] to-[#8F94FB] text-white font-semibold shadow-lg shadow-[#4E54C8]/30 hover:shadow-[#4E54C8]/50 hover:-translate-y-0.5 transition-all active:scale-95">
              <el-icon>
                <Edit />
              </el-icon> 开始创作
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- ==========================================
     2. 加载状态 (Holographic Quantum Loader)
     ========================================== -->
    <transition enter-active-class="transition duration-500 ease-out" enter-from-class="opacity-0 backdrop-blur-none" enter-to-class="opacity-100 backdrop-blur-md" leave-active-class="transition duration-300 ease-in" leave-from-class="opacity-100 backdrop-blur-md" leave-to-class="opacity-0 backdrop-blur-none">
      <div v-if="loading" class="absolute inset-0 z-20 flex items-center justify-center overflow-hidden bg-white/80 backdrop-blur-md">

        <!-- 背景装饰：流动的网格 (Cyber Grid) -->
        <div class="absolute inset-0 opacity-30 pointer-events-none">
          <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        </div>

        <div class="relative w-full max-w-lg p-10 flex flex-col items-center">

          <!-- 核心加载动画 -->
          <div class="relative w-32 h-32 mb-10 flex items-center justify-center">
            <!-- 外层光环 (反向旋转) -->
            <div class="absolute inset-0 rounded-full border-2 border-dashed border-indigo-200 animate-[spin_10s_linear_infinite]"></div>
            <!-- 中层光环 (快速旋转) -->
            <div class="absolute inset-2 rounded-full border-t-2 border-r-2 border-[#4E54C8] animate-spin"></div>
            <!-- 内层核心 (呼吸) -->
            <div class="absolute inset-8 bg-gradient-to-tr from-[#4E54C8] to-[#8F94FB] rounded-full shadow-[0_0_40px_rgba(78,84,200,0.6)] animate-pulse flex items-center justify-center">
              <svg class="w-8 h-8 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <!-- 粒子光点 -->
            <div class="absolute -top-4 -right-4 text-xl animate-ping text-[#8F94FB]">✦</div>
            <div class="absolute -bottom-2 -left-4 text-sm animate-ping delay-300 text-indigo-400">✶</div>
          </div>

          <!-- 文字状态 -->
          <div class="text-center space-y-2 mb-8 relative z-10">
            <h3 class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#4E54C8] to-[#8F94FB] animate-pulse">
              正在构建现实...
            </h3>
            <p class="text-sm font-mono text-slate-500">AI Neural Network Processing</p>
          </div>

          <!-- 高级进度条 -->
          <div class="w-full relative">
            <div class="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              <span>Rendering</span>
              <span class="text-[#4E54C8]">{{ progress }}%</span>
            </div>
            <!-- 轨道 -->
            <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <!-- 填充条 -->
              <div class="h-full bg-gradient-to-r from-[#4E54C8] via-[#8F94FB] to-[#4E54C8] bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite] transition-all duration-300 rounded-full shadow-[0_0_10px_rgba(78,84,200,0.5)]" :style="{ width: `${progress}%` }"></div>
            </div>
            <!-- 预计时间胶囊 -->
            <div class="mt-4 flex justify-center">
              <div class="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-[10px] text-slate-500 flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                预计剩余: {{ estimatedTime }}秒
              </div>
            </div>
          </div>

        </div>
      </div>
    </transition>

    <!-- ==========================================
     3. 生成结果 (Immersive Art Gallery)
     ========================================== -->
    <transition enter-active-class="transition duration-700 cubic-bezier(0.2, 0.8, 0.2, 1)" enter-from-class="opacity-0 translate-y-8" enter-to-class="opacity-100 translate-y-0">
      <div v-if="generatedImages.length > 0" class="flex-1 flex flex-col bg-[#FDFDFE]">

        <!-- 结果页 Header (悬浮式) -->
        <div class="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4E54C8] to-[#8F94FB] flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <el-icon class="text-xl">
                <Picture />
              </el-icon>
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-800 leading-tight">创作完成</h2>
              <div class="flex items-center gap-2 text-xs text-slate-500">
                <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                成功生成 {{ generatedImages.length }} 张画作
              </div>
            </div>
          </div>

          <!-- 数据胶囊 -->
          <div class="flex gap-2">
            <div class="group flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600 transition-all hover:shadow-sm cursor-default">
              <el-icon class="text-slate-400 group-hover:text-[#4E54C8]">
                <Timer />
              </el-icon>
              {{ generationTime }}s
            </div>
            <div class="group flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600 transition-all hover:shadow-sm cursor-pointer" @click="$emit('use-seed')" title="点击复制">
              <el-icon class="text-slate-400 group-hover:text-[#4E54C8]">
                <Key />
              </el-icon>
              {{ lastSeed }}
            </div>
          </div>
        </div>

        <!-- 画廊网格 -->
        <div class="p-6 md:p-8 overflow-y-auto">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">

            <div v-for="(image, index) in generatedImages" :key="index" class="group relative flex flex-col">
              <!-- 图片卡片 -->
              <div class="relative w-full rounded-2xl overflow-hidden bg-slate-100 shadow-sm transition-all duration-500 group-hover:shadow-[0_20px_40px_-15px_rgba(78,84,200,0.3)] group-hover:-translate-y-2 ring-1 ring-slate-900/5 group-hover:ring-[#4E54C8]/30">

                <!-- 比例占位 -->
                <div :style="getAspectRatioStyle()"></div>

                <!-- 真实图片 -->
                <img :src="image.url" alt="AI Artwork" loading="lazy" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" @click="$emit('show-preview', image.url)" />

                <!-- 顶部快捷信息 (Hover显示) -->
                <div class="absolute top-0 left-0 w-full p-4 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div class="px-2 py-1 rounded-md bg-black/40 backdrop-blur-md text-[10px] text-white font-mono border border-white/10">
                    IMG_00{{index + 1}}
                  </div>
                  <button class="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white text-white hover:text-[#4E54C8] transition-all border border-white/20" @click.stop="$emit('show-preview', image.url)">
                    <el-icon>
                      <ZoomIn />
                    </el-icon>
                  </button>
                </div>

                <!-- 底部操作坞 (Floating Dock) -->
                <div class="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 cubic-bezier(0.34, 1.56, 0.64, 1) z-10 w-auto">
                  <div class="flex items-center gap-1 p-1.5 rounded-full bg-white/90 backdrop-blur-xl shadow-2xl border border-white/50 ring-1 ring-black/5">

                    <el-tooltip content="下载原图" placement="top" :hide-after="0" :offset="12">
                      <button class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 hover:text-[#4E54C8] transition-colors" @click.stop="$emit('download-image', image.url, index)">
                        <el-icon class="text-lg">
                          <Download />
                        </el-icon>
                      </button>
                    </el-tooltip>

                    <div class="w-px h-4 bg-slate-200 mx-0.5"></div>

                    <el-tooltip content="复用种子" placement="top" :hide-after="0" :offset="12">
                      <button class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 hover:text-[#4E54C8] transition-colors" @click.stop="$emit('use-seed')">
                        <el-icon class="text-lg">
                          <CopyDocument />
                        </el-icon>
                      </button>
                    </el-tooltip>

                    <el-tooltip content="重绘" placement="top" :hide-after="0" :offset="12">
                      <button class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 hover:text-[#4E54C8] transition-colors" @click.stop="$emit('regenerate')">
                        <el-icon class="text-lg">
                          <Refresh />
                        </el-icon>
                      </button>
                    </el-tooltip>

                  </div>
                </div>

                <!-- 渐变遮罩 (增强文字可读性) -->
                <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import {
  Loading,
  ZoomIn,
  Download,
  CopyDocument,
  Edit,
  Star,
  Timer,
  Key,
  Refresh,
} from "@element-plus/icons-vue";

interface Props {
  generatedImages: { url: string }[];
  loading: boolean;
  progress: number;
  estimatedTime: number;
  generationTime: number | null;
  lastSeed: number | null;
  imageSize: string;
}

const props = defineProps<Props>();

defineEmits<{
  (e: "show-preview", url: string): void;
  (e: "download-image", url: string, index: number): void;
  (e: "use-seed"): void;
  (e: "regenerate"): void;
  (e: "apply-random-template"): void;
}>();

const getAspectRatioStyle = () => {
  const sizeValue = props.imageSize;
  const dimensions = sizeValue.split("x");
  if (dimensions.length === 2) {
    const width = parseInt(dimensions[0]);
    const height = parseInt(dimensions[1]);
    const ratio = (height / width) * 100;
    return { paddingBottom: `${ratio}%`, height: "0" };
  }
  return { paddingBottom: "100%", height: "0" };
};

const scrollToPrompt = () => {
  // 假设你的表单有一个 ID 或者 class
  // 这里做一个简单的平滑滚动逻辑
  const promptElement = document.querySelector(".atomic-input textarea");
  if (promptElement) {
    promptElement.scrollIntoView({ behavior: "smooth", block: "center" });
    promptElement.focus();
  }
};
</script>

<style scoped>
/* 
  Custom Animations needed for the high-end feel 
  Tailwind doesn't have a built-in directional shimmer or float
*/

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-shimmer {
  animation: shimmer 1.5s infinite;
}

/* 1. 缓慢旋转 */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

/* 2. 反向旋转 */
@keyframes reverse-spin {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
.animate-reverse-spin {
  animation: reverse-spin 25s linear infinite;
}

/* 3. 核心浮动 (上下) */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* 4. 错峰浮动 (让卡片看起来不像是同步机械运动) */
.animate-float-delayed-1 {
  animation: float 7s ease-in-out infinite;
  animation-delay: 0s;
}
.animate-float-delayed-2 {
  animation: float 8s ease-in-out infinite;
  animation-delay: 2s;
}
.animate-float-delayed-3 {
  animation: float 6s ease-in-out infinite;
  animation-delay: 1s;
}

/* 5. 斑点变形动画 (Blob) - 用于背景光晕的流动感 */
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

/* 
  High-Performance Animation Utilities 
*/

/* 进度条流动光效 */
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* 旋转 */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 元素浮动 */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* --- 样式补丁 --- */
.animate-[shimmer_2s_linear_infinite] {
  animation: shimmer 2s linear infinite;
}
.animate-[spin_10s_linear_infinite] {
  animation: spin 10s linear infinite;
}
</style>

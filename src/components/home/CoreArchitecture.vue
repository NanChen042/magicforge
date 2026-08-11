<template>
  <!-- =========================================================================
       3. 全新板块：模块化核心面板 (Modular Core Panel)
       ========================================================================= -->
  <section class="relative pb-24">

    <!-- 背景装饰：淡雅的点阵 -->
    <div class="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      <!-- 标题区 -->
      <div class="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
        <div>
          <h2 class="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">Power Under The Hood</h2>
          <h3 class="text-3xl font-bold text-slate-900">核心架构参数</h3>
        </div>
        <!-- 装饰性编号 -->
        <div class="text-4xl font-mono font-bold text-slate-200 select-none">SYS_V2.0</div>
      </div>

      <!-- [核心面板容器] -->
      <div class="relative bg-white rounded-md shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden group">

        <!-- 顶部动态扫描线 (Scanner) -->
        <div class="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent -translate-x-full group-hover:animate-[scan-fast_2s_linear_infinite] z-20"></div>

        <!-- Grid 布局：无 Gap，用边框线分割 -->
        <div class="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">

          <!-- Module 1: Stream -->
          <div class="relative p-8 hover:bg-slate-50/50 transition-colors duration-300 flex flex-col h-full">
            <!-- 顶部标签 -->
            <div class="flex justify-between items-start mb-6">
              <div class="w-10 h-10 rounded-sm bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span class="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">MOD_01</span>
            </div>
            <!-- 内容 -->
            <h4 class="text-lg font-bold text-slate-900 mb-2">Stream I/O</h4>
            <p class="text-xs text-slate-500 leading-relaxed mb-8 flex-1">
              采用 SSE (Server-Sent Events) 协议。实现打字机般的逐字渲染体验，首字延迟低于 50ms。
            </p>
            <!-- 底部状态 -->
            <div class="pt-4 border-t border-slate-100 flex items-center gap-2">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
              <span class="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Active</span>
            </div>
          </div>

          <!-- Module 2: CoT -->
          <div class="relative p-8 hover:bg-slate-50/50 transition-colors duration-300 flex flex-col h-full">
            <div class="flex justify-between items-start mb-6">
              <div class="w-10 h-10 rounded-sm bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span class="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">MOD_02</span>
            </div>
            <h4 class="text-lg font-bold text-slate-900 mb-2">CoT Engine</h4>
            <p class="text-xs text-slate-500 leading-relaxed mb-8 flex-1">
              Deepseek 驱动的思维链引擎。将复杂逻辑拆解为可视化步骤，让推理过程透明可控。
            </p>
            <div class="pt-4 border-t border-slate-100 flex items-center gap-2">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              <span class="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Reasoning</span>
            </div>
          </div>

          <!-- Module 3: REST -->
          <div class="relative p-8 hover:bg-slate-50/50 transition-colors duration-300 flex flex-col h-full">
            <div class="flex justify-between items-start mb-6">
              <div class="w-10 h-10 rounded-sm bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span class="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">MOD_03</span>
            </div>
            <h4 class="text-lg font-bold text-slate-900 mb-2">REST API</h4>
            <p class="text-xs text-slate-500 leading-relaxed mb-8 flex-1">
              完全兼容 OpenAI 接口标准。开发者无需修改现有 SDK，改个 URL 即可无缝接入。
            </p>
            <div class="pt-4 border-t border-slate-100 flex items-center gap-2">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              <span class="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Compatible</span>
            </div>
          </div>

          <!-- Module 4: Config -->
          <div class="relative p-8 hover:bg-slate-50/50 transition-colors duration-300 flex flex-col h-full">
            <div class="flex justify-between items-start mb-6">
              <div class="w-10 h-10 rounded-sm bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <span class="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">MOD_04</span>
            </div>
            <h4 class="text-lg font-bold text-slate-900 mb-2">Full Control</h4>
            <p class="text-xs text-slate-500 leading-relaxed mb-8 flex-1">
              开放 Temperature, Top-P, Presence Penalty 等全量参数。精准控制生成结果的随机性。
            </p>
            <div class="pt-4 border-t border-slate-100 flex items-center gap-2">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              <span class="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Ready</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

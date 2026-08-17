<template>
  <!-- =========================================================================
       3. 模块化核心面板 (Core Technical & Creative Engine)
       ========================================================================= -->
  <section class="relative pb-16 sm:pb-24 font-sans select-none">

    <div class="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">

      <!-- 标题区 -->
      <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-6 sm:mb-10 gap-3 sm:gap-4">
        <div>
          <div class="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1.5 sm:mb-2 font-mono">
            CORE ARCHITECTURE
          </div>
          <h3 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">核心架构与创作能力</h3>
        </div>

        <!-- 架构状态规格 (全中文，无冗余英文) -->
        <div class="flex items-center gap-2 bg-white/90 border border-slate-200/80 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-2xs backdrop-blur-sm">
          <span class="text-xs font-medium text-slate-700">全系统就绪</span>
          <span class="text-slate-300">·</span>
          <span class="text-xs text-slate-500">多模态引擎全量连接</span>
        </div>
      </div>

      <!-- [核心面板容器] -->
      <div class="relative bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-200/80 overflow-hidden group">

        <!-- 顶部动态扫描线 (Scanner) -->
        <div class="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent -translate-x-full group-hover:animate-[scan-fast_2s_linear_infinite] z-20"></div>

        <!-- Grid 布局：移动端紧凑无缝分割，桌面端 4 列优雅排列 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">

          <!-- ==================== Module 1: 流式传输 ==================== -->
          <div class="relative p-4.5 sm:p-6 lg:p-7 hover:bg-blue-50/20 transition-all duration-300 flex flex-col justify-between h-full group/card">
            <div>
              <div class="flex justify-between items-center mb-3 sm:mb-5">
                <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-2xs group-hover/card:scale-105 transition-transform">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span class="text-[10px] font-semibold text-blue-600 bg-blue-50/80 border border-blue-200/60 px-2 py-0.5 rounded-full font-mono">模块 01</span>
              </div>

              <h4 class="text-sm sm:text-base font-bold text-slate-900 mb-1.5 sm:mb-2 group-hover/card:text-blue-600 transition-colors">毫秒级流式响应</h4>
              <p class="text-xs text-slate-500 leading-relaxed font-normal mb-3 sm:mb-5">
                基于高速流式通信机制，实现如打字机般的逐字流畅渲染，对话告别漫长等待。
              </p>
            </div>

            <div class="space-y-2.5 sm:space-y-3 pt-1">
              <div class="p-2 sm:p-2.5 rounded-lg bg-slate-50/80 border border-slate-200/60 flex items-center justify-between text-xs font-mono">
                <span class="text-slate-400 font-sans">首字响应耗时</span>
                <span class="font-bold text-blue-600">&lt; 50 毫秒</span>
              </div>

              <div class="pt-2.5 sm:pt-3 border-t border-slate-100 flex items-center justify-between">
                <div class="flex items-center gap-1.5">
                  <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span class="text-xs font-semibold text-slate-600">实时流式运行中</span>
                </div>
                <span class="text-[10px] text-slate-400 font-mono">极速响应</span>
              </div>
            </div>
          </div>

          <!-- ==================== Module 2: 思维链引擎 ==================== -->
          <div class="relative p-4.5 sm:p-6 lg:p-7 hover:bg-blue-50/20 transition-all duration-300 flex flex-col justify-between h-full group/card">
            <div>
              <div class="flex justify-between items-center mb-3 sm:mb-5">
                <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-2xs group-hover/card:scale-105 transition-transform">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span class="text-[10px] font-semibold text-blue-600 bg-blue-50/80 border border-blue-200/60 px-2 py-0.5 rounded-full font-mono">模块 02</span>
              </div>

              <h4 class="text-sm sm:text-base font-bold text-slate-900 mb-1.5 sm:mb-2 group-hover/card:text-blue-600 transition-colors">深度思维链推演</h4>
              <p class="text-xs text-slate-500 leading-relaxed font-normal mb-3 sm:mb-5">
                搭载逻辑推理核心，将复杂问题层层拆解为可视化思考步骤，推理过程清晰透明。
              </p>
            </div>

            <div class="space-y-2.5 sm:space-y-3 pt-1">
              <div class="p-2 sm:p-2.5 rounded-lg bg-slate-50/80 border border-slate-200/60 flex items-center justify-between text-xs font-mono">
                <span class="text-slate-400 font-sans">推演能力</span>
                <span class="font-bold text-blue-600 font-sans">多步骤反思求证</span>
              </div>

              <div class="pt-2.5 sm:pt-3 border-t border-slate-100 flex items-center justify-between">
                <div class="flex items-center gap-1.5">
                  <div class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                  <span class="text-xs font-semibold text-slate-600">思维链透出开启</span>
                </div>
                <span class="text-[10px] text-slate-400 font-mono">深度推理</span>
              </div>
            </div>
          </div>

          <!-- ==================== Module 3: 多模态矩阵 ==================== -->
          <div class="relative p-4.5 sm:p-6 lg:p-7 hover:bg-blue-50/20 transition-all duration-300 flex flex-col justify-between h-full group/card">
            <div>
              <div class="flex justify-between items-center mb-3 sm:mb-5">
                <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-2xs group-hover/card:scale-105 transition-transform">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span class="text-[10px] font-semibold text-blue-600 bg-blue-50/80 border border-blue-200/60 px-2 py-0.5 rounded-full font-mono">模块 03</span>
              </div>

              <h4 class="text-sm sm:text-base font-bold text-slate-900 mb-1.5 sm:mb-2 group-hover/card:text-blue-600 transition-colors">多模态创作工坊</h4>
              <p class="text-xs text-slate-500 leading-relaxed font-normal mb-3 sm:mb-5">
                涵盖智能对话、AI绘图、视频生成、声音克隆与互动小说，一站式赋能多维创作。
              </p>
            </div>

            <div class="space-y-2.5 sm:space-y-3 pt-1">
              <div class="p-2 sm:p-2.5 rounded-lg bg-slate-50/80 border border-slate-200/60 flex items-center justify-between text-xs font-mono">
                <span class="text-slate-400 font-sans">工坊生态</span>
                <span class="font-bold text-blue-600 font-sans">文 · 图 · 视频 · 语音</span>
              </div>

              <div class="pt-2.5 sm:pt-3 border-t border-slate-100 flex items-center justify-between">
                <div class="flex items-center gap-1.5">
                  <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span class="text-xs font-semibold text-slate-600">全模态互联就绪</span>
                </div>
                <span class="text-[10px] text-emerald-600 font-bold font-mono">全场景</span>
              </div>
            </div>
          </div>

          <!-- ==================== Module 4: 精细参数调控 ==================== -->
          <div class="relative p-4.5 sm:p-6 lg:p-7 hover:bg-blue-50/20 transition-all duration-300 flex flex-col justify-between h-full group/card">
            <div>
              <div class="flex justify-between items-center mb-3 sm:mb-5">
                <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-2xs group-hover/card:scale-105 transition-transform">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <span class="text-[10px] font-semibold text-blue-600 bg-blue-50/80 border border-blue-200/60 px-2 py-0.5 rounded-full font-mono">模块 04</span>
              </div>

              <h4 class="text-sm sm:text-base font-bold text-slate-900 mb-1.5 sm:mb-2 group-hover/card:text-blue-600 transition-colors">高自由度参数微调</h4>
              <p class="text-xs text-slate-500 leading-relaxed font-normal mb-3 sm:mb-5">
                支持发散度、生成长度等参数精细设定，满足从严谨分析到创意发散的多元诉求。
              </p>
            </div>

            <div class="space-y-2.5 sm:space-y-3 pt-1">
              <div class="p-2 sm:p-2.5 rounded-lg bg-slate-50/80 border border-slate-200/60 space-y-1.5 text-xs font-mono">
                <div class="flex justify-between items-center">
                  <span class="text-slate-500 font-sans">创意发散度 (温度)</span>
                  <span class="font-bold text-blue-600">60%</span>
                </div>
                <div class="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                  <div class="bg-blue-600 h-full w-[60%] rounded-full"></div>
                </div>
              </div>

              <div class="pt-2.5 sm:pt-3 border-t border-slate-100 flex items-center justify-between">
                <div class="flex items-center gap-1.5">
                  <div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span class="text-xs font-semibold text-slate-600">参数引擎已生效</span>
                </div>
                <span class="text-[10px] text-slate-400 font-mono">随心调优</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
// 模块化核心架构与创作能力面板
</script>

<style scoped>
@keyframes scan-fast {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>



<template>
  <!-- Footer: 极简纯净浅色风 (响应式移动端精炼优化) -->
  <footer class="w-full border-t border-slate-200/80 bg-white pt-12 sm:pt-16 pb-8 mt-12 sm:mt-16 text-slate-600 relative z-10 select-none">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- 上半部分：响应式分栏 (移动端精炼 2 列，桌面端经典 4 列) -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 mb-10 sm:mb-12">

        <!-- Column 1: 品牌核心 -->
        <div class="md:col-span-4 space-y-3 sm:space-y-4 text-center sm:text-left">
          <div class="flex items-center justify-center sm:justify-start gap-2">
            <span class="relative flex h-3 w-3">
              <span class="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
            </span>
            <span class="text-lg font-bold text-slate-900 tracking-tight">MagicForge</span>
            <span class="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 font-bold">Studio</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mx-auto sm:mx-0">
            构建下一代认知智能基础设施。从大语言模型推理到多模态生成，探索数字创造力的无限边界。
          </p>
          
          <!-- 社交与联系方式图标组 -->
          <div class="flex justify-center sm:justify-start gap-3 pt-1">
            <a 
              href="https://github.com/NanChen042/magicforge" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white transition-all shadow-2xs"
              title="GitHub 仓库"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            <button 
              @click="showContactModal = true"
              class="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white transition-all shadow-2xs cursor-pointer"
              title="联系我们 (邮件)"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </button>

            <button 
              @click="showJoinModal = true"
              class="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-emerald-600 hover:text-white transition-all shadow-2xs cursor-pointer"
              title="微信交流 / 加入我们"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- 移动端网格链接区域 (居中容器 + 均衡列宽与间距) -->
        <div class="md:col-span-8 w-full max-w-[320px] mx-auto sm:max-w-none sm:mx-0 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-8">
          
          <!-- Column 2: 核心产品 -->
          <div class="space-y-3">
            <h4 class="text-xs sm:text-sm font-bold text-slate-900 tracking-wide font-sans">
              核心产品
            </h4>
            <ul class="space-y-2.5 text-xs sm:text-sm">
              <li><router-link to="/api-demo" class="text-slate-500 hover:text-blue-600 transition-colors">智能对话 (Chat)</router-link></li>
              <li><router-link to="/ai-image" class="text-slate-500 hover:text-blue-600 transition-colors">灵感画板 (Image)</router-link></li>
              <li><router-link to="/ai-audio" class="text-slate-500 hover:text-blue-600 transition-colors">智能语音 (Audio)</router-link></li>
              <li><router-link to="/scenario" class="text-slate-500 hover:text-blue-600 transition-colors">第13号列车 (Story)</router-link></li>
              <li><router-link to="/game" class="text-slate-500 hover:text-blue-600 transition-colors">永恒之刃 (Game)</router-link></li>
            </ul>
          </div>

          <!-- Column 3: 开发者与工具 (仅桌面端显示多余扩展，移动端合并精炼) -->
          <div class="hidden sm:block space-y-3">
            <h4 class="text-sm font-bold text-slate-900 tracking-wide font-sans">
              开发者与工坊
            </h4>
            <ul class="space-y-2.5 text-sm">
              <li><router-link to="/docs" class="text-slate-500 hover:text-blue-600 transition-colors">开发文档中心</router-link></li>
              <li><router-link to="/prompt-library" class="text-slate-500 hover:text-blue-600 transition-colors">提示词工程库</router-link></li>
              <li><router-link to="/api-demo" class="text-slate-500 hover:text-blue-600 transition-colors">实时推理控制台</router-link></li>
              <li><a href="https://github.com/NanChen042/magicforge" target="_blank" rel="noopener noreferrer" class="text-slate-500 hover:text-blue-600 transition-colors">开源代码仓库 ↗</a></li>
            </ul>
          </div>

          <!-- Column 4: 关于与支持 -->
          <div class="space-y-3">
            <h4 class="text-xs sm:text-sm font-bold text-slate-900 tracking-wide font-sans">
              关于与支持
            </h4>
            <ul class="space-y-2.5 text-xs sm:text-sm">
              <li><router-link to="/prompt-library" class="sm:hidden text-slate-500 hover:text-blue-600 transition-colors">提示词工程库</router-link></li>
              <li><a href="https://blog.csdn.net/nanchen_J?type=blog" target="_blank" rel="noopener noreferrer" class="text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1">我的博客 ↗</a></li>
              <li><a href="#" @click.prevent="showJoinModal = true" class="text-slate-500 hover:text-blue-600 transition-colors">加入交流群</a></li>
              <li><a href="#" @click.prevent="showContactModal = true" class="text-slate-500 hover:text-blue-600 transition-colors">邮件联系我们</a></li>
            </ul>
          </div>

        </div>

      </div>

      <!-- 下半部分：版权信息 -->
      <div class="pt-6 sm:pt-8 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-center sm:text-left">
        <p class="text-xs text-slate-400 font-mono">
          © 2026 MagicForge Studio. All rights reserved.
        </p>
        <div class="text-[11px] text-slate-400 font-mono flex items-center gap-2">
          <span>多模态全栈智能工坊</span>
          <span class="text-slate-300">·</span>
          <span>Powered by SiliconFlow</span>
        </div>
      </div>
    </div>
  </footer>

  <!-- 联系方式弹窗 -->
  <Teleport to="body">
    <div v-if="showContactModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="showContactModal = false">
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <div class="relative bg-white rounded-md shadow-2xl p-8 flex flex-col items-center gap-4 w-72 z-10">
        <button @click="showContactModal = false" class="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-500">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div class="w-12 h-12 rounded-md bg-blue-50 flex items-center justify-center">
          <svg class="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <p class="text-sm font-semibold text-slate-700">联系方式</p>
        <a href="mailto:1159063863@qq.com" class="text-sm text-blue-600 hover:text-blue-800 transition-colors break-all">1159063863@qq.com</a>
        <p class="text-xs text-slate-400">欢迎通过邮件与我们联系</p>
      </div>
    </div>
  </Teleport>
  <Teleport to="body">
    <div v-if="showJoinModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="showJoinModal = false">
      <!-- 背景遮罩 -->
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <!-- 弹窗卡片 -->
      <div class="relative bg-white rounded-md shadow-2xl p-8 flex flex-col items-center gap-4 w-72 z-10">
        <!-- 关闭按钮 -->
        <button @click="showJoinModal = false" class="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-500">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <!-- 微信号 -->
        <p class="text-sm font-semibold text-slate-700 tracking-wide">微信号：SouthernWind_J</p>
        <!-- 二维码图片 -->
        <img src="@/assets/usercode.jpg" alt="微信二维码" class="w-44 object-cover border border-slate-100 shadow-md" />
        <!-- 说明文字 -->
        <p class="text-xs text-slate-400">扫码添加微信，加入我们</p>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const showJoinModal = ref(false)
const showContactModal = ref(false)
</script>

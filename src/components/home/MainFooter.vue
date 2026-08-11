<template>
  <!-- Footer: 极简纯净浅色风 (无毛玻璃，铺满屏幕，背景统一) -->
  <footer class="w-full border-t border-slate-200 bg-[#F8FAFC] pt-16 pb-8 mt-16 text-slate-600 relative z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- 上半部分：多列导航布局 -->
      <div class="grid grid-cols-2 md:grid-cols-12 gap-8 mb-12">

        <!-- Column 1: 品牌核心 (占据较宽位置) -->
        <div class="col-span-2 md:col-span-4">
          <div class="flex items-center gap-2 mb-4">
            <span class="relative flex h-3 w-3">
              <span class="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span class="text-lg font-bold text-slate-900 tracking-tight">MagicForge</span>
          </div>
          <p class="text-sm text-slate-500 leading-relaxed max-w-xs mb-6">
            构建下一代认知智能基础设施。从大语言模型推理到多模态生成，探索数字创造力的无限边界。
          </p>
          <!-- 社交图标组 -->
          <div class="flex gap-4">
            <a href="#" class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100/80 text-slate-400 hover:bg-blue-500 hover:text-white transition-all duration-300">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="#" class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100/80 text-slate-400 hover:bg-black hover:text-white transition-all duration-300">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Column 2: 产品矩阵 -->
        <div class="col-span-1 md:col-span-2 md:col-start-6">
          <h4 class="text-sm font-bold text-slate-900 mb-4 tracking-wide">产品矩阵</h4>
          <ul class="space-y-3">
            <li><router-link to="/api-demo" class="text-sm text-slate-500 hover:text-blue-600 transition-colors">智能对话 (Chat)</router-link></li>
            <li><router-link to="/ai-image" class="text-sm text-slate-500 hover:text-blue-600 transition-colors">图像生成 (Image)</router-link></li>
            <li><router-link to="/game" class="text-sm text-slate-500 hover:text-blue-600 transition-colors">互动游戏 (Game)</router-link></li>
            <li><router-link to="/mcp-agent" class="text-sm text-slate-500 hover:text-blue-600 transition-colors">API 服务</router-link></li>
          </ul>
        </div>

        <!-- Column 3: 开发者 -->
        <div class="col-span-1 md:col-span-2">
          <h4 class="text-sm font-bold text-slate-900 mb-4 tracking-wide">开发者</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-sm text-slate-500 hover:text-blue-600 transition-colors">文档中心</a></li>
            <li><a href="#" class="text-sm text-slate-500 hover:text-blue-600 transition-colors">SDK 下载</a></li>
            <li><a href="#" class="text-sm text-slate-500 hover:text-blue-600 transition-colors">Prompt 库</a></li>
            <li><a href="#" class="text-sm text-slate-500 hover:text-blue-600 transition-colors">状态监控</a></li>
          </ul>
        </div>

        <!-- Column 4: 关于 -->
        <div class="col-span-1 md:col-span-2">
          <h4 class="text-sm font-bold text-slate-900 mb-4 tracking-wide">关于</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-sm text-slate-500 hover:text-blue-600 transition-colors">关于我们</a></li>
            <li><a href="https://blog.csdn.net/nanchen_J?type=blog" target="_blank" class="text-sm text-slate-500 hover:text-blue-600 transition-colors">我的博客</a></li>
            <li><a href="#" @click.prevent="showJoinModal = true" class="text-sm text-slate-500 hover:text-blue-600 transition-colors">加入我们</a></li>
            <li><a href="#" @click.prevent="showContactModal = true" class="text-sm text-slate-500 hover:text-blue-600 transition-colors">联系方式</a></li>
          </ul>
        </div>

      </div>

      <!-- 下半部分：版权与法律条款 -->
      <div class="pt-8 border-t border-slate-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-slate-400">
          © 2026 MagicForge Platform. <span class="hidden md:inline text-slate-300 mx-2">|</span> Designed for Future.
        </p>
        <div class="flex gap-6">
          <a href="#" class="text-xs text-slate-400 hover:text-blue-600 transition-colors">隐私政策</a>
          <a href="#" class="text-xs text-slate-400 hover:text-blue-600 transition-colors">服务条款</a>
          <a href="#" class="text-xs text-slate-400 hover:text-blue-600 transition-colors">Cookies</a>
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

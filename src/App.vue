<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
    <!-- 高级导航栏 -->
    <header class="fixed w-full top-0 z-50">
      <!-- 背景层 -->
      <div class="absolute inset-0 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5"></div>

      <!-- 装饰性渐变条 -->
      <div class="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

      <div class="relative max-w-7xl mx-auto">
        <div class="flex justify-between items-center h-18 md:h-20 px-6 md:px-8">
          <!-- Logo区域 -->
          <div class="flex items-center gap-4 md:gap-5">
            <div class="relative group">
              <!-- Logo背景光晕 -->
              <div class="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative p-2.5 md:p-3 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10 rounded-2xl border border-white/30 shadow-lg shadow-purple-500/10">
                <img v-if="imageUrl" :src="imageUrl" alt="AIVista" class="h-8 w-8 md:h-10 md:w-10 rounded-lg" />
                <img v-else src="./assets/user.jpg" alt="AIVista" class="h-8 w-8 md:h-10 md:w-10 rounded-lg" />
              </div>
            </div>
            <div class="flex flex-col">
              <h1 class="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SouthernWind
              </h1>
              <span class="text-xs md:text-sm text-gray-500 font-medium tracking-wide">AIVista Platform</span>
            </div>
          </div>

          <!-- 桌面端导航 -->
          <nav class="hidden lg:flex items-center">
            <div class="flex items-center space-x-1 bg-white/60 backdrop-blur-sm p-2 rounded-2xl border border-white/40 shadow-lg shadow-black/5">
              <router-link
                v-for="(item, index) in navItems"
                :key="item.path"
                :to="item.path"
                class="relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group"
                :class="$route.path === item.path
                  ? 'text-white bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/25'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'"
              >
                <!-- 活动状态背景 -->
                <div
                  v-if="$route.path === item.path"
                  class="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg shadow-purple-500/25"
                ></div>

                <!-- 悬浮效果背景 -->
                <div
                  v-else
                  class="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                ></div>

                <span class="relative z-10 flex items-center gap-2">
                  <component :is="item.icon" class="w-4 h-4" />
                  {{ item.name }}
                </span>
              </router-link>
            </div>
          </nav>

          <!-- 中等屏幕导航 -->
          <nav class="hidden md:flex lg:hidden items-center">
            <div class="flex items-center space-x-1 bg-white/60 backdrop-blur-sm p-1.5 rounded-xl border border-white/40">
              <router-link
                v-for="item in navItems"
                :key="item.path"
                :to="item.path"
                class="relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group"
                :class="$route.path === item.path
                  ? 'text-purple-600 bg-white/80 shadow-sm'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-white/50'"
              >
                <component :is="item.icon" class="w-4 h-4" />
              </router-link>
            </div>
          </nav>

          <!-- 移动端菜单按钮 -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden relative p-2.5 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 text-gray-700 hover:text-purple-600 transition-all duration-200 group"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="relative z-10 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="relative z-10 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 移动端菜单 -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 transform -translate-y-2"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform -translate-y-2"
      >
        <div v-if="mobileMenuOpen" class="md:hidden">
          <div class="absolute inset-0 bg-white/80 backdrop-blur-xl border-t border-white/20 shadow-xl shadow-black/10"></div>
          <div class="relative px-6 py-4 space-y-2">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-200 group"
              :class="{ 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 font-medium shadow-sm': $route.path === item.path }"
              @click="mobileMenuOpen = false"
            >
              <component :is="item.icon" class="w-5 h-5" />
              <span>{{ item.name }}</span>
              <div class="ml-auto w-1.5 h-1.5 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </router-link>
          </div>
        </div>
      </Transition>
    </header>

    <main class="pt-20 md:pt-28 pb-12 md:pb-16 px-4 md:px-6">
      <div class="max-w-7xl mx-auto">
        <ApiUrlInput v-if="$route.path !== '/'" class="mb-4 md:mb-6" />
        <router-view />
      </div>
    </main>

    <footer class="bg-white border-t border-gray-100">
      <div class="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <p class="text-xs md:text-sm text-gray-500 text-center">
          © {{ new Date().getFullYear() }} SouthernWind——AIVista 网页版 | 基于 大模型 构建
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import axios from 'axios';

// 使用 Element Plus 图标
import {
  House,
  Monitor,
  Picture,
  MagicStick,
  Document,
  Setting
} from '@element-plus/icons-vue';

const ApiUrlInput = defineAsyncComponent(() =>
  import('./components/ApiUrlInput.vue')
);

const imageUrl = ref('');
const mobileMenuOpen = ref(false);

// 导航项配置
const navItems = [
  { path: '/', name: '首页', icon: House },
  { path: '/api-demo', name: 'API演示', icon: Monitor },
  { path: '/ai-image', name: 'AI图像生成', icon: Picture },
  { path: '/game', name: '游戏演示', icon: MagicStick },
  { path: '/prompt-library', name: '提示库', icon: Document },
  { path: '/mcp-agent', name: 'MCP智能体', icon: Setting }
];

// 获取头像
axios.get('https://v.api.aa1.cn/api/qqimg/index.php?qq=1159063863').then(res => {
  const match = res.data.match(/<img\s+src=([^\s>]+)/);
  imageUrl.value = match ? match[1] : null;
  console.log(imageUrl);
});
</script>

<style>
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 高级动画效果 */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.1); }
  50% { box-shadow: 0 0 30px rgba(147, 51, 234, 0.2); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-2px); }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out forwards;
}

/* 导航栏高级效果 */
header {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* Logo悬浮效果 */
.group:hover .group-hover\:animate-float {
  animation: float 2s ease-in-out infinite;
}

/* 玻璃态效果 */
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* 渐变文字效果 */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 高级阴影效果 */
.shadow-luxury {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(255, 255, 255, 0.05);
}

/* 响应式优化 */
@media (max-width: 768px) {
  .backdrop-blur-xl {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
}

/* 滚动条美化 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #5a67d8, #6b46c1);
}
</style>

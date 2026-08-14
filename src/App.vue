<template>
  <div class="h-screen w-full relative font-sans selection:bg-blue-500/20 flex flex-col overflow-hidden bg-white">

    <!-- 全局统一后台背景 (高端光影柔和画布) -->
    <div class="fixed inset-0 -z-50 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/30 via-white to-slate-50/50 pointer-events-none">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[600px] bg-gradient-to-b from-blue-100/20 via-sky-50/10 to-transparent blur-3xl"></div>
    </div>

    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16">
      <div class="absolute inset-0 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)]"></div>
      
      <div class="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div class="flex justify-between items-center h-full">
          
          <!-- 左侧：品牌 Logo (全新 MagicForge 专属灵感晶核徽标) -->
          <div class="flex items-center gap-3 cursor-pointer group" @click="$router.push('/')">
            <!-- 品牌徽标容器 -->
            <div class="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 shadow-md shadow-blue-500/25 flex items-center justify-center overflow-hidden transition-all group-hover:scale-105 group-hover:shadow-blue-500/40 duration-300 ring-1 ring-white/20">
              
              <!-- 熔炉折射光晕 -->
              <div class="absolute inset-0 bg-radial from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <!-- 专属品牌矢量：灵感晶核与星芒熔炉 (MagicForge Star Mark) -->
              <svg class="w-5 h-5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" viewBox="0 0 24 24" fill="none">
                <!-- 底部熔炉几何支撑环 -->
                <path d="M12 21L4.5 16.5V7.5L12 3L19.5 7.5V16.5L12 21Z" stroke="rgba(255,255,255,0.4)" stroke-width="1.2" stroke-linejoin="round" />
                <!-- 内部璀璨四芒星核 (AI Spark of MagicForge) -->
                <path d="M12 5C12 8.5 15.5 12 19 12C15.5 12 12 15.5 12 19C12 15.5 8.5 12 5 12C8.5 12 12 8.5 12 5Z" fill="#ffffff" />
                <!-- 中心微距高光光子 -->
                <circle cx="12" cy="12" r="1.5" fill="#38bdf8" />
              </svg>
            </div>

            <!-- 品牌文字标识 -->
            <div class="flex flex-col">
              <div class="flex items-center text-[17px] font-extrabold tracking-tight leading-none">
                <span class="text-slate-900 group-hover:text-blue-600 transition-colors">Magic</span>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">Forge</span>
              </div>
              <span class="text-[10px] font-medium text-slate-400 tracking-wider mt-1">多模态智能工坊</span>
            </div>
          </div>

          <!-- 中间：核心导航群 (现代轻量胶囊群) -->
          <nav class="hidden lg:flex items-center gap-1.5 bg-slate-100/70 p-1 rounded-xl border border-slate-200/60 shadow-xs">
            <router-link 
              v-for="item in navItems" 
              :key="item.path" 
              :to="item.path" 
              class="relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ease-out group flex items-center gap-1.5" 
              :class="$route.path === item.path ? 'text-blue-600 bg-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'"
            >
              <component 
                :is="item.icon" 
                class="w-3.5 h-3.5 transition-colors duration-200" 
                :class="$route.path === item.path ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-700'" 
              />
              <span>{{ item.name }}</span>
            </router-link>
          </nav>

          <!-- 右侧：快速行动按钮 -->
          <div class="hidden sm:flex items-center gap-3">
            <router-link 
              to="/api-demo" 
              class="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white text-xs font-semibold shadow-sm hover:shadow-md hover:shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>立即体验</span>
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </router-link>
          </div>

          <!-- 移动端汉堡菜单按钮 -->
          <div class="lg:hidden flex items-center">
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
              <div class="flex flex-col justify-center items-center gap-[4px] w-4 h-4 relative">
                <span class="w-4 h-[1.5px] bg-slate-700 rounded-full transition-all duration-300 absolute" :class="mobileMenuOpen ? 'rotate-45' : '-translate-y-[5px]'"></span>
                <span class="w-4 h-[1.5px] bg-slate-700 rounded-full transition-all duration-300 absolute" :class="mobileMenuOpen ? 'opacity-0' : 'opacity-100'"></span>
                <span class="w-4 h-[1.5px] bg-slate-700 rounded-full transition-all duration-300 absolute" :class="mobileMenuOpen ? '-rotate-45' : 'translate-y-[5px]'"></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- 移动端抽屉菜单 -->
      <div class="lg:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-500" :class="mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'">
        <div class="px-4 pb-6 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xl">
          <div class="flex flex-col gap-1 mt-2">
            <router-link 
              v-for="item in navItems" 
              :key="item.path" 
              :to="item.path" 
              @click="mobileMenuOpen = false" 
              class="flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all duration-200" 
              :class="$route.path === item.path ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'"
            >
              <component :is="item.icon" class="w-4 h-4" :class="$route.path === item.path ? 'text-blue-600' : 'text-slate-400'" />
              <span class="text-xs font-semibold tracking-wide">{{ item.name }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1 w-full pt-16 box-border relative overflow-auto flex flex-col min-h-0">
      <!-- 沉浸式应用页面（首页、聊天、画板、游戏、列车、MCP）采用 100% 视口无约束布局 -->
      <template v-if="isImmersiveRoute">
        <router-view v-slot="{ Component }">
          <component :is="Component" class="flex-1 min-h-0 w-full" />
        </router-view>
      </template>
      <!-- 标准文档/表单类页面采用居中版心布局 -->
      <div v-else class="max-w-[1600px] mx-auto w-full px-3 md:px-6 flex-1 flex flex-col min-h-0">
        <router-view v-slot="{ Component }">
          <component :is="Component" class="flex-1 min-h-0" />
        </router-view>
      </div>
    </main>

    <footer class="relative z-1 border-t border-zinc-200 bg-white" v-if="!isImmersiveRoute">
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div class="flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/60 border border-zinc-100 shadow-2xs">
          <div class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <span class="text-[11px] font-semibold text-zinc-600 tracking-wide">All systems operational</span>
        </div>
        <div class="flex items-center gap-4 text-xs text-zinc-500 font-medium">
          <span>MagicForge Engine 2.0</span>
          <span>•</span>
          <span class="font-mono">v2.4.0</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { 
  House, 
  ChatDotRound, 
  Picture, 
  Microphone, 
  MagicStick, 
  Film, 
  Document 
} from '@element-plus/icons-vue';

const route = useRoute();
const mobileMenuOpen = ref(false);

const isImmersiveRoute = computed(() => {
  const immersivePaths = ['/', '/api-demo', '/ai-image', '/ai-audio', '/game', '/scenario', '/mcp'];
  return immersivePaths.includes(route.path);
});

const navItems = [
  { path: '/', name: '首页', icon: House },
  { path: '/api-demo', name: '智能对话', icon: ChatDotRound },
  { path: '/ai-image', name: '灵感画板', icon: Picture },
  { path: '/ai-audio', name: '智能语音', icon: Microphone },
  { path: '/game', name: '永恒之刃', icon: MagicStick },
  { path: '/scenario', name: '第13号列车', icon: Film },
  { path: '/prompt-library', name: '提示词工程', icon: Document }
];
</script>

<style scoped>
</style>

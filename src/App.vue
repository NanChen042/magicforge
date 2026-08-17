<template>
  <div class="h-screen w-full relative font-sans selection:bg-blue-500/20 selection:text-blue-900 flex flex-col overflow-hidden bg-white">

    <header class="fixed top-0 left-0 right-0 z-50 h-16 border-b border-slate-200/80 bg-white/90 backdrop-blur-md" @click="closeMenus">
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div class="flex justify-between items-center h-full">
          
          <!-- 左侧：品牌 Logo (全新 MagicForge 专属灵感晶核徽标) -->
          <router-link to="/" class="flex items-center gap-3 cursor-pointer group shrink-0" aria-label="MagicForge 首页">
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
          </router-link>

          <!-- 中间：官网主导航。平板与桌面端展示一级入口与下拉菜单 -->
          <nav class="hidden md:flex items-center gap-1 ml-6 lg:ml-10 mr-auto" aria-label="主导航">
            <router-link 
              v-for="item in primaryNavItems" 
              :key="item.path" 
              :to="item.path" 
              class="relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-out group flex items-center gap-1.5" 
              :class="$route.path === item.path ? 'text-blue-600' : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'"
              :aria-current="$route.path === item.path ? 'page' : undefined"
            >
              <span>{{ item.name }}</span>
              <span
                v-if="$route.path === item.path"
                class="absolute left-3 right-3 -bottom-[1px] h-0.5 rounded-full bg-blue-600"
                aria-hidden="true"
              ></span>
            </router-link>

            <div 
              v-for="group in navGroups" 
              :key="group.key" 
              class="relative group py-1"
            >
              <button
                type="button"
                class="relative flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 cursor-pointer select-none"
                :class="isNavGroupActive(group) ? 'text-blue-600' : 'text-slate-600 group-hover:text-slate-950 group-hover:bg-slate-50'"
                :aria-haspopup="true"
              >
                <span>{{ group.name }}</span>
                <svg class="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 text-slate-400 group-hover:text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" />
                </svg>
                <span
                  v-if="isNavGroupActive(group)"
                  class="absolute left-3 right-3 -bottom-[1px] h-0.5 rounded-full bg-blue-600"
                  aria-hidden="true"
                ></span>
              </button>

              <!-- 原生 CSS 高性能悬浮浮层 (零延迟、零卡顿、无 JS 定时器介入) -->
              <div 
                class="absolute left-0 top-full pt-1.5 z-50 invisible opacity-0 -translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 ease-out pointer-events-none group-hover:pointer-events-auto"
              >
                <div class="w-56 rounded-md border border-slate-200/90 bg-white p-1 shadow-lg shadow-slate-900/8">
                  <router-link
                    v-for="item in group.items"
                    :key="item.path"
                    :to="item.path"
                    class="flex items-center gap-3 rounded px-3 py-2.5 text-sm transition-colors"
                    :class="$route.path === item.path ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'"
                  >
                    <component :is="item.icon" class="h-4 w-4 shrink-0" :class="$route.path === item.path ? 'text-blue-600' : 'text-slate-400'" />
                    <span>{{ item.name }}</span>
                  </router-link>
                </div>
              </div>
            </div>
          </nav>

          <!-- 右侧：帮助中心 (带图标) + 唯一主行动 (开始创作) -->
          <div class="hidden sm:flex items-center gap-2 lg:gap-3 ml-4 lg:ml-6 relative">
            
            <!-- 帮助中心 -->
            <router-link 
              to="/docs" 
              class="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors select-none"
              :class="$route.path === '/docs' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'"
              title="帮助中心与开发文档"
            >
              <svg class="w-4 h-4" :class="$route.path === '/docs' ? 'text-blue-600' : 'text-slate-400'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>帮助中心</span>
            </router-link>

            <!-- 开始创作 按钮 -->
            <button
              type="button"
              class="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold shadow-sm shadow-blue-600/15 transition-colors flex items-center gap-2 cursor-pointer"
              :aria-expanded="startMenuOpen"
              aria-haspopup="true"
              @click.stop="startMenuOpen = !startMenuOpen"
            >
              <span>开始创作</span>
              <svg class="w-4 h-4 transition-transform" :class="startMenuOpen ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <Transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 -translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <div v-if="startMenuOpen" class="absolute right-0 top-full mt-2 w-72 rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-slate-900/8">
                <p class="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">选择创作入口</p>
                <router-link
                  v-for="item in creationOptions"
                  :key="item.path"
                  :to="item.path"
                  class="flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors"
                  :class="$route.path === item.path ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'"
                  @click="closeMenus"
                >
                  <component :is="item.icon" class="mt-0.5 h-4 w-4 shrink-0" :class="$route.path === item.path ? 'text-blue-600' : 'text-slate-400'" />
                  <span>
                    <span class="block text-sm font-semibold">{{ item.name }}</span>
                    <span class="mt-0.5 block text-xs text-slate-400">{{ item.description }}</span>
                  </span>
                </router-link>
              </div>
            </Transition>
          </div>

          <!-- 移动端汉堡菜单按钮 (仅手机端 < 768px 展示) -->
          <div class="md:hidden flex items-center">
            <button @click="mobileMenuOpen = !mobileMenuOpen" :aria-expanded="mobileMenuOpen" aria-controls="mobile-navigation" aria-label="打开导航菜单" class="relative w-9 h-9 flex items-center justify-center rounded-md hover:bg-slate-100 transition-colors cursor-pointer">
              <div class="flex flex-col justify-center items-center gap-[4px] w-4 h-4 relative">
                <span class="w-4 h-[1.5px] bg-slate-700 rounded-full transition-all duration-300 absolute" :class="mobileMenuOpen ? 'rotate-45' : '-translate-y-[5px]'"></span>
                <span class="w-4 h-[1.5px] bg-slate-700 rounded-full transition-all duration-300 absolute" :class="mobileMenuOpen ? 'opacity-0' : 'opacity-100'"></span>
                <span class="w-4 h-[1.5px] bg-slate-700 rounded-full transition-all duration-300 absolute" :class="mobileMenuOpen ? '-rotate-45' : 'translate-y-[5px]'"></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- 移动端抽屉菜单 (仅手机端 < 768px 生效) -->
      <div id="mobile-navigation" class="md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-300" :class="mobileMenuOpen ? 'max-h-[620px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'">
        <div class="px-4 pb-6 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xl">
          <nav class="flex flex-col gap-1 mt-2" aria-label="移动端主导航">
            <router-link 
              v-for="item in navItems" 
              :key="item.path" 
              :to="item.path" 
              @click="mobileMenuOpen = false" 
              class="flex items-center gap-3 px-3.5 py-2.5 rounded-md transition-all duration-200" 
              :class="$route.path === item.path ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'"
              :aria-current="$route.path === item.path ? 'page' : undefined"
            >
              <component :is="item.icon" class="w-4 h-4" :class="$route.path === item.path ? 'text-blue-600' : 'text-slate-400'" />
              <span class="text-xs font-semibold tracking-wide">{{ item.name }}</span>
            </router-link>
            <div class="mt-3 border-t border-slate-100 pt-3">
              <p class="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">开始创作</p>
              <router-link
                v-for="item in creationOptions"
                :key="item.path"
                :to="item.path"
                @click="mobileMenuOpen = false"
                class="flex items-center gap-3 rounded-md px-3.5 py-2.5 text-sm transition-colors"
                :class="$route.path === item.path ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'"
              >
                <component :is="item.icon" class="h-4 w-4" :class="$route.path === item.path ? 'text-blue-600' : 'text-slate-400'" />
                <span>{{ item.name }}</span>
              </router-link>
            </div>
          </nav>
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
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
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
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { 
  House, 
  ChatDotRound, 
  Picture, 
  Microphone, 
  MagicStick, 
  Film, 
  Document,
  Reading 
} from '@element-plus/icons-vue';

const route = useRoute();
const mobileMenuOpen = ref(false);
const startMenuOpen = ref(false);

watch(() => route.path, () => {
  mobileMenuOpen.value = false;
  startMenuOpen.value = false;
});

const isImmersiveRoute = computed(() => {
  const immersivePaths = ['/', '/api-demo', '/ai-image', '/ai-audio', '/game', '/scenario', '/mcp', '/docs'];
  return immersivePaths.includes(route.path);
});

const navItems = [
  { path: '/', name: '首页', icon: House },
  { path: '/api-demo', name: '智能对话', icon: ChatDotRound },
  { path: '/ai-image', name: '灵感画板', icon: Picture },
  { path: '/ai-audio', name: '智能语音', icon: Microphone },
  { path: '/game', name: '永恒之刃', icon: MagicStick },
  { path: '/scenario', name: '第13号列车', icon: Film },
  { path: '/prompt-library', name: '提示词工程', icon: Document },
  { path: '/docs', name: '帮助中心', icon: Reading }
];

const primaryNavItems = [navItems[0], navItems[6]];
const navGroups = [
  {
    key: 'products',
    name: '产品',
    items: [navItems[1], navItems[2], navItems[3]]
  },
  {
    key: 'experiences',
    name: '互动体验',
    items: [navItems[4], navItems[5]]
  }
];

const isNavGroupActive = (group: typeof navGroups[number]) => {
  return group.items.some((item) => item.path === route.path);
};

const creationOptions = [
  { path: '/api-demo', name: '智能对话', description: '与模型对话，探索复杂问题', icon: ChatDotRound },
  { path: '/ai-image', name: '灵感画板', description: '用文字生成视觉作品', icon: Picture },
  { path: '/ai-audio', name: '智能语音', description: '生成语音或转写音频', icon: Microphone }
];

const closeMenus = () => {
  startMenuOpen.value = false;
};
</script>

<style scoped>
</style>

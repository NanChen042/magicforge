<template>
  <div class="min-h-screen relative font-sans text-slate-600 selection:bg-indigo-500/30">

    <!-- 全局背景 (保持不变，确保沉浸感) -->
    <div class="fixed inset-0 -z-10 bg-[#F8FAFC] overflow-hidden pointer-events-none">
       <div class="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-500/5 rounded-full blur-[80px] mix-blend-multiply animate-blob"></div>
       <div class="absolute top-[20%] right-[-5%] w-[35rem] h-[35rem] bg-violet-500/5 rounded-full blur-[80px] mix-blend-multiply animate-blob animation-delay-2000"></div>
       <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
    </div>

    <header class="fixed w-full top-0 z-50 transition-all duration-300">
      
      <!-- 磨砂玻璃背景 -->
      <div class="absolute inset-0 bg-white/70 backdrop-blur-xl border-b border-slate-200/50"></div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 md:h-20">

          <!-- 1. Logo 区域 -->
          <div class="flex items-center gap-3 cursor-pointer group" @click="$router.push('/')">
            <div class="relative w-10 h-10 rounded-xl bg-gradient-to-br from-white to-slate-100 shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_2px_4px_rgba(0,0,0,0.05)] flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 duration-300">
                <img v-if="imageUrl" :src="imageUrl" alt="Avatar" class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                <div v-else class="w-6 h-6 bg-slate-200 rounded-full"></div>
            </div>
            <div class="flex flex-col">
              <span class="text-base font-bold text-slate-800 tracking-tight leading-none group-hover:text-indigo-600 transition-colors">SouthernWind</span>
              <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-1">Platform</span>
            </div>
          </div>

          <!-- 2. 桌面端导航：胶囊分段控制器风格 (重点修改) -->
          <nav class="hidden lg:flex items-center">
            <!-- 外部容器：创建一个浅灰色的凹槽 -->
            <div class="flex items-center p-1.5 bg-slate-100/80 backdrop-blur-md rounded-full border border-slate-200/50 shadow-inner">
              
              <router-link
                v-for="item in navItems"
                :key="item.path"
                :to="item.path"
                class="relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-out group isolate"
                :class="$route.path === item.path 
                  ? 'text-slate-900' 
                  : 'text-slate-500 hover:text-slate-700'"
              >
                <!-- 选中态背景：浮起的白色卡片 -->
                <div 
                  v-if="$route.path === item.path" 
                  class="absolute inset-0 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.02)] -z-10 transition-all duration-300"
                  layoutId="navbar-pill"
                ></div>

                <!-- 内容 -->
                <span class="flex items-center gap-2.5">
                  <!-- 图标：仅在选中或悬停时有颜色，平时灰色 -->
                  <component 
                    :is="item.icon" 
                    class="w-4 h-4 transition-colors duration-300" 
                    :class="$route.path === item.path ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'" 
                  />
                  {{ item.name }}
                </span>
              </router-link>

            </div>
          </nav>

          <!-- 3. 移动端按钮 -->
          <div class="lg:hidden flex items-center">
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="relative w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm active:scale-95 transition-all"
            >
              <div class="flex flex-col gap-[5px] transition-all duration-300" :class="{ 'rotate-45': mobileMenuOpen }">
                 <span class="w-5 h-0.5 bg-slate-600 rounded-full transition-all duration-300" :class="{ 'translate-y-[7px] rotate-0': mobileMenuOpen }"></span>
                 <span class="w-5 h-0.5 bg-slate-600 rounded-full transition-all duration-300" :class="{ 'opacity-0': mobileMenuOpen }"></span>
                 <span class="w-5 h-0.5 bg-slate-600 rounded-full transition-all duration-300" :class="{ '-translate-y-[7px] rotate-0': mobileMenuOpen }"></span>
              </div>
            </button>
          </div>

        </div>
      </div>

      <!-- 4. 移动端菜单：卡片式堆叠 -->
      <div 
        class="lg:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)"
        :class="mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'"
      >
        <div class="px-4 pb-6 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-xl">
          <div class="flex flex-col gap-2 mt-2">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              @click="mobileMenuOpen = false"
              class="group relative flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 border border-transparent"
              :class="$route.path === item.path
                ? 'bg-white shadow-[0_4px_20px_-4px_rgba(99,102,241,0.15)] border-slate-100'
                : 'hover:bg-slate-50'"
            >
              <!-- 左侧指示条 (选中时出现) -->
              <div 
                class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-indigo-500 transition-all duration-300"
                :class="$route.path === item.path ? 'opacity-100' : 'opacity-0'"
              ></div>

              <div class="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300"
                   :class="$route.path === item.path ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-sm'">
                  <component :is="item.icon" class="w-5 h-5" />
              </div>
              
              <div class="flex flex-col">
                  <span class="text-sm font-bold transition-colors" :class="$route.path === item.path ? 'text-slate-800' : 'text-slate-600'">{{ item.name }}</span>
                  <span class="text-[10px] text-slate-400 font-medium tracking-wide uppercase" v-if="$route.path === item.path">Current Page</span>
              </div>

              <svg class="ml-auto w-5 h-5 text-slate-300 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- 主内容 -->
    <main class="relative pt-24 pb-16 px-4 md:px-8 box-border">
      <div class="max-w-7xl mx-auto min-h-[calc(100vh-200px)]">
         <router-view />
      </div>
    </main>
    
    <!-- Footer 省略，保持原有即可 -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  House,
  Monitor,
  Picture,
  MagicStick,
  Film,
  Document,
  Setting
} from '@element-plus/icons-vue';
// ... 其他逻辑保持不变
import axios from 'axios';

const imageUrl = ref('');
const mobileMenuOpen = ref(false);

const navItems = [
  { path: '/', name: '首页', icon: House },
  { path: '/api-demo', name: 'API演示', icon: Monitor },
  { path: '/ai-image', name: '灵感画板', icon: Picture },
  { path: '/game', name: '剑道传奇', icon: MagicStick },
    // [新增] 在这里添加新页面入口
  { path: '/scenario', name: '第13号列车', icon: Film },
  { path: '/prompt-library', name: '提示库', icon: Document },
  { path: '/mcp-agent', name: 'MCP配置', icon: Setting }
];

axios.get('https://v.api.aa1.cn/api/qqimg/index.php?qq=1159063863').then(res => {
  const match = res.data.match(/<img\s+src=([^\s>]+)/);
  imageUrl.value = match ? match[1] : null;
});
</script>

<style scoped>
/* 
  辅助动画类
*/

/* 解决 Safari 下的毛玻璃闪烁问题 */
.backdrop-blur-xl {
  -webkit-backdrop-filter: blur(24px);
  backdrop-filter: blur(24px);
}

/* 移动端菜单按钮动画 */
.rotate-45 > span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.rotate-45 > span:nth-child(2) {
  opacity: 0;
}
.rotate-45 > span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* 列表项交错淡入动画 (可选) */
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
}

</style>

<template>
  <div class="min-h-screen relative font-sans selection:bg-indigo-500/30">

    <!-- =========================================================================
         1. 全局沉浸式背景：双极力场 (Bipolar Force Field) - 增强版
         ========================================================================= -->
    <div class="fixed inset-0 -z-50 overflow-hidden bg-slate-50">

      <!-- [A] 左侧光幕墙 (Left Force Field) -->
      <!-- 修改：增强了不透明度 (from-indigo-500/30)，移除了 mix-blend，确保色彩真实可见 -->
      <div class="absolute top-0 left-0 w-[40vw] h-full bg-gradient-to-r from-indigo-200/40 via-indigo-50/20 to-transparent blur-[80px] pointer-events-none"></div>

      <!-- [A2] 左侧核心光柱 (Left Core Beam) - 增加一条细且亮的核心光柱 -->
      <div class="absolute top-0 left-0 w-[100px] h-full bg-gradient-to-r from-indigo-400/20 to-transparent blur-[40px] pointer-events-none"></div>

      <!-- [B] 右侧光幕墙 (Right Force Field) -->
      <!-- 修改：对应增强右侧，使用紫调 -->
      <div class="absolute top-0 right-0 w-[40vw] h-full bg-gradient-to-l from-violet-200/40 via-fuchsia-50/20 to-transparent blur-[80px] pointer-events-none"></div>

      <!-- [B2] 右侧核心光柱 (Right Core Beam) -->
      <div class="absolute top-0 right-0 w-[100px] h-full bg-gradient-to-l from-violet-400/20 to-transparent blur-[40px] pointer-events-none"></div>

      <!-- [C] 粒子系统 (Rising Particles) -->
      <!-- 仅在两侧生成，增加了粒子的大小和可见度 -->

      <!-- 左侧粒子 -->
      <div class="absolute inset-y-0 left-0 w-[25vw] overflow-hidden pointer-events-none">
        <div class="absolute bottom-[-50px] left-[15%] w-2 h-2 bg-indigo-500/20 rounded-full animate-float-slow blur-[1px]"></div>
        <div class="absolute bottom-[-50px] left-[35%] w-3 h-3 bg-blue-500/10 rounded-full animate-float-medium animation-delay-2000 blur-[2px]"></div>
        <div class="absolute bottom-[-50px] left-[5%] w-1.5 h-1.5 bg-indigo-400/30 rounded-full animate-float-fast animation-delay-4000"></div>
      </div>

      <!-- 右侧粒子 -->
      <div class="absolute inset-y-0 right-0 w-[25vw] overflow-hidden pointer-events-none">
        <div class="absolute bottom-[-50px] right-[15%] w-2.5 h-2.5 bg-violet-500/20 rounded-full animate-float-medium animation-delay-1000 blur-[1px]"></div>
        <div class="absolute bottom-[-50px] right-[40%] w-1.5 h-1.5 bg-fuchsia-500/30 rounded-full animate-float-slow animation-delay-3000"></div>
      </div>

      <!-- [D] 空间网格 (The Grid) -->
      <!-- 中央保留干净的网格，辅助视觉对齐 -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none"></div>

      <!-- [E] 胶片噪点 (Texture) -->
      <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
    </div>


    <!-- =========================================================================
         2. 导航栏 (Header)
         ========================================================================= -->
    <header class="fixed w-full top-0 z-50 transition-all duration-300">
      <div class="absolute inset-0 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm shadow-indigo-50/10"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 md:h-20">

          <!-- Logo -->
          <div class="flex items-center gap-3 cursor-pointer group" @click="$router.push('/')">
            <div class="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/20 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 duration-300">
              <img v-if="imageUrl" :src="imageUrl" alt="Avatar" class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
              <div v-else class="text-white font-bold text-lg">S</div>
            </div>
            <div class="flex flex-col">
              <span class="text-base font-bold text-slate-800 tracking-tight leading-none group-hover:text-indigo-600 transition-colors">SouthernWind</span>
              <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-1">Platform</span>
            </div>
          </div>

          <!-- Desktop Nav -->
          <nav class="hidden lg:flex items-center">
            <div class="flex items-center p-1.5 bg-slate-50/50 backdrop-blur-md rounded-full border border-white/60 shadow-sm ring-1 ring-slate-200/50">
              <router-link v-for="item in navItems" :key="item.path" :to="item.path" class="relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-out group isolate" :class="$route.path === item.path ? 'text-indigo-950' : 'text-slate-500 hover:text-slate-700'">
                <div v-if="$route.path === item.path" class="absolute inset-0 bg-white rounded-full shadow-sm border border-slate-100/50 -z-10 transition-all duration-300"></div>

                <span class="flex items-center gap-2">
                  <component :is="item.icon" class="w-4 h-4 transition-colors duration-300" :class="$route.path === item.path ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-500'" />
                  {{ item.name }}
                </span>
              </router-link>
            </div>
          </nav>

          <!-- Mobile Toggle -->
          <div class="lg:hidden flex items-center">
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/80 border border-slate-200 shadow-sm">
              <div class="flex flex-col gap-[5px] transition-all duration-300" :class="{ 'rotate-45': mobileMenuOpen }">
                <span class="w-5 h-0.5 bg-slate-600 rounded-full transition-all duration-300" :class="{ 'translate-y-[7px] rotate-0': mobileMenuOpen }"></span>
                <span class="w-5 h-0.5 bg-slate-600 rounded-full transition-all duration-300" :class="{ 'opacity-0': mobileMenuOpen }"></span>
                <span class="w-5 h-0.5 bg-slate-600 rounded-full transition-all duration-300" :class="{ '-translate-y-[7px] rotate-0': mobileMenuOpen }"></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div class="lg:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-500" :class="mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'">
        <div class="px-4 pb-6 bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-xl">
          <div class="flex flex-col gap-2 mt-2">
            <router-link v-for="item in navItems" :key="item.path" :to="item.path" @click="mobileMenuOpen = false" class="flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300" :class="$route.path === item.path ? 'bg-indigo-50/50 text-indigo-900' : 'text-slate-600 hover:bg-slate-50'">
              <component :is="item.icon" class="w-5 h-5" :class="$route.path === item.path ? 'text-indigo-600' : 'text-slate-400'" />
              <span class="text-sm font-bold">{{ item.name }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </header>


    <!-- =========================================================================
         3. 主内容区 (Main Content)
         ========================================================================= -->
    <main class="relative z-10 pt-28 pb-16 px-4 md:px-8 box-border">
      <div class="max-w-7xl mx-auto min-h-[calc(100vh-200px)]">
        <router-view />
      </div>
    </main>


    <!-- =========================================================================
         4. 页脚 (Footer)
         ========================================================================= -->
    <footer class="relative z-10 text-center text-slate-400 text-sm py-8 border-t border-slate-200/60 bg-white/40 backdrop-blur-sm">
      <p>© 2025 AI Vista Platform. Design for Future.</p>
    </footer>

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
import axios from 'axios';
const mobileMenuOpen = ref(false);
// 定义 QQ 号
const qq = '1159063863';
const imageUrl = ref(`https://q1.qlogo.cn/g?b=qq&nk=${qq}&s=640`);

const navItems = [
  { path: '/', name: '首页', icon: House },
  { path: '/api-demo', name: 'API演示', icon: Monitor },
  { path: '/ai-image', name: '灵感画板', icon: Picture },
  { path: '/game', name: '剑道传奇', icon: MagicStick },
  { path: '/scenario', name: '第13号列车', icon: Film },
  { path: '/prompt-library', name: '提示库', icon: Document },
  { path: '/mcp-agent', name: 'MCP配置', icon: Setting }
];

// 获取头像逻辑
axios.get('https://v.api.aa1.cn/api/qqimg/index.php?qq=1159063863').then(res => {
  const match = res.data.match(/<img\s+src=([^>\s]+)/);
  imageUrl.value = match ? match[1] : null;
});
</script>

<style scoped>
/* 
  粒子上升动画：模拟热气流/丁达尔效应
  transform: translateY(-120vh) 让粒子完全飞出屏幕上方
*/
@keyframes float-slow {
  0% {
    transform: translateY(10vh) translateX(0) scale(1);
    opacity: 0;
  }

  20% {
    opacity: 0.8;
  }

  100% {
    transform: translateY(-120vh) translateX(30px) scale(1.2);
    opacity: 0;
  }
}

@keyframes float-medium {
  0% {
    transform: translateY(10vh) translateX(0) scale(1);
    opacity: 0;
  }

  20% {
    opacity: 0.6;
  }

  100% {
    transform: translateY(-120vh) translateX(-20px) scale(0.9);
    opacity: 0;
  }
}

@keyframes float-fast {
  0% {
    transform: translateY(10vh) translateX(0) scale(1);
    opacity: 0;
  }

  20% {
    opacity: 0.5;
  }

  100% {
    transform: translateY(-120vh) translateX(15px) scale(1.1);
    opacity: 0;
  }
}

.animate-float-slow {
  animation: float-slow 18s linear infinite;
}

.animate-float-medium {
  animation: float-medium 12s linear infinite;
}

.animate-float-fast {
  animation: float-fast 9s linear infinite;
}

/* 延迟助手类 */
.animation-delay-1000 {
  animation-delay: 1.5s;
}

.animation-delay-2000 {
  animation-delay: 3s;
}

.animation-delay-3000 {
  animation-delay: 4.5s;
}

.animation-delay-4000 {
  animation-delay: 6s;
}

/* 菜单动画 */
.rotate-45>span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.rotate-45>span:nth-child(2) {
  opacity: 0;
}

.rotate-45>span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}
</style>

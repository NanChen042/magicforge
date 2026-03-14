<template>
  <div class="h-screen w-full relative font-sans selection:bg-indigo-500/30 flex flex-col overflow-hidden">

    <div class="fixed inset-0 -z-50 overflow-hidden bg-slate-50">
      <div class="absolute top-0 left-0 w-[40vw] h-full bg-gradient-to-r from-indigo-200/40 via-indigo-50/20 to-transparent blur-[80px] pointer-events-none"></div>
      <div class="absolute top-0 left-0 w-[100px] h-full bg-gradient-to-r from-indigo-400/20 to-transparent blur-[40px] pointer-events-none"></div>
      <div class="absolute top-0 right-0 w-[40vw] h-full bg-gradient-to-l from-violet-200/40 via-fuchsia-50/20 to-transparent blur-[80px] pointer-events-none"></div>
      <div class="absolute top-0 right-0 w-[100px] h-full bg-gradient-to-l from-violet-400/20 to-transparent blur-[40px] pointer-events-none"></div>

      <div class="absolute inset-y-0 left-0 w-[25vw] overflow-hidden pointer-events-none">
        <div class="absolute bottom-[-50px] left-[15%] w-2 h-2 bg-indigo-500/20 rounded-full animate-float-slow blur-[1px]"></div>
        <div class="absolute bottom-[-50px] left-[35%] w-3 h-3 bg-blue-500/10 rounded-full animate-float-medium animation-delay-2000 blur-[2px]"></div>
        <div class="absolute bottom-[-50px] left-[5%] w-1.5 h-1.5 bg-indigo-400/30 rounded-full animate-float-fast animation-delay-4000"></div>
      </div>
      <div class="absolute inset-y-0 right-0 w-[25vw] overflow-hidden pointer-events-none">
        <div class="absolute bottom-[-50px] right-[15%] w-2.5 h-2.5 bg-violet-500/20 rounded-full animate-float-medium animation-delay-1000 blur-[1px]"></div>
        <div class="absolute bottom-[-50px] right-[40%] w-1.5 h-1.5 bg-fuchsia-500/30 rounded-full animate-float-slow animation-delay-3000"></div>
      </div>

      <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none"></div>
      <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
    </div>

    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 md:h-20">
      <div class="absolute inset-0 bg-white/70 backdrop-blur-2xl border-b border-zinc-200/50 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"></div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div class="flex justify-between items-center h-full">
          
          <div class="flex items-center gap-3 cursor-pointer group" @click="$router.push('/')">
            <div class="relative w-9 h-9 rounded-xl bg-zinc-900 shadow-md shadow-zinc-900/10 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 duration-300">
              <img v-if="imageUrl" :src="imageUrl" alt="Avatar" class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
              <div v-else class="text-white font-semibold text-lg font-mono">S</div>
            </div>
            <div class="flex flex-col">
              <span class="text-base font-bold text-zinc-900 tracking-tight leading-none">SouthernWind</span>
              <span class="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Platform</span>
            </div>
          </div>

          <nav class="hidden lg:flex items-center gap-1">
            <router-link 
              v-for="item in navItems" 
              :key="item.path" 
              :to="item.path" 
              class="relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-out group flex items-center gap-2" 
              :class="$route.path === item.path ? 'text-zinc-900 bg-zinc-100/80' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'"
            >
              <component 
                :is="item.icon" 
                class="w-4 h-4 transition-colors duration-300" 
                :class="$route.path === item.path ? 'text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-600'" 
              />
              {{ item.name }}
            </router-link>
          </nav>

          <div class="lg:hidden flex items-center">
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer">
              <div class="flex flex-col justify-center items-center gap-[5px] w-5 h-5 relative">
                <span class="w-5 h-[1.5px] bg-zinc-700 rounded-full transition-all duration-300 absolute" :class="mobileMenuOpen ? 'rotate-45' : '-translate-y-[6px]'"></span>
                <span class="w-5 h-[1.5px] bg-zinc-700 rounded-full transition-all duration-300 absolute" :class="mobileMenuOpen ? 'opacity-0' : 'opacity-100'"></span>
                <span class="w-5 h-[1.5px] bg-zinc-700 rounded-full transition-all duration-300 absolute" :class="mobileMenuOpen ? '-rotate-45' : 'translate-y-[6px]'"></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div class="lg:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-500" :class="mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'">
        <div class="px-4 pb-6 bg-white/95 backdrop-blur-2xl border-b border-zinc-200/50 shadow-2xl shadow-zinc-900/5">
          <div class="flex flex-col gap-1 mt-2">
            <router-link 
              v-for="item in navItems" 
              :key="item.path" 
              :to="item.path" 
              @click="mobileMenuOpen = false" 
              class="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300" 
              :class="$route.path === item.path ? 'bg-zinc-100/80 text-zinc-900' : 'text-zinc-500 hover:bg-zinc-50'"
            >
              <component :is="item.icon" class="w-5 h-5" :class="$route.path === item.path ? 'text-zinc-900' : 'text-zinc-400'" />
              <span class="text-sm font-semibold tracking-wide">{{ item.name }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1 w-full pt-16 md:pt-20 box-border relative overflow-auto flex flex-col min-h-0">
      <div class="max-w-7xl mx-auto w-full px-4 md:px-8 flex-1 flex flex-col min-h-0">
        <router-view v-slot="{ Component }">
          <component :is="Component" class="flex-1 min-h-0" />
        </router-view>
      </div>
    </main>

<footer class="relative z-1 border-t border-zinc-200/50 bg-white/40 backdrop-blur-md">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
    <div class="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/60 border border-zinc-100 shadow-sm">
      <div class="relative flex h-2 w-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </div>
      <span class="text-[11px] font-semibold text-zinc-600 tracking-wide">All systems operational</span>
    </div>

    <p class="text-xs font-medium text-zinc-400 tracking-wide text-center">
      © 2026 AI Vista Platform. <span class="hidden md:inline text-zinc-300 mx-1.5">|</span> <span class="block md:inline mt-1 md:mt-0">Design for Future.</span>
    </p>

    <div class="flex items-center gap-4 text-zinc-400">
      <a href="#" class="hover:text-zinc-900 transition-colors duration-300 cursor-pointer">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
      </a>
      <a href="#" class="hover:text-zinc-900 transition-colors duration-300 cursor-pointer">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
      </a>
    </div>
  </div>
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

const mobileMenuOpen = ref(false);

// 直接使用QQ头像URL，避免额外API调用
const imageUrl = ref('https://q1.qlogo.cn/g?b=qq&nk=1159063863&s=640');

const navItems = [
  { path: '/', name: '首页', icon: House },
  { path: '/api-demo', name: 'API演示', icon: Monitor },
  { path: '/ai-image', name: '灵感画板', icon: Picture },
  { path: '/game', name: '剑道传奇', icon: MagicStick },
  { path: '/scenario', name: '第13号列车', icon: Film },
  { path: '/prompt-library', name: '提示库', icon: Document },
  { path: '/mcp-agent', name: 'MCP配置', icon: Setting }
];
</script>

<style scoped>
/* 粒子上升动画：模拟热气流/丁达尔效应
*/
@keyframes float-slow {
  0% { transform: translateY(10vh) translateX(0) scale(1); opacity: 0; }
  20% { opacity: 0.8; }
  100% { transform: translateY(-120vh) translateX(30px) scale(1.2); opacity: 0; }
}
@keyframes float-medium {
  0% { transform: translateY(10vh) translateX(0) scale(1); opacity: 0; }
  20% { opacity: 0.6; }
  100% { transform: translateY(-120vh) translateX(-20px) scale(0.9); opacity: 0; }
}
@keyframes float-fast {
  0% { transform: translateY(10vh) translateX(0) scale(1); opacity: 0; }
  20% { opacity: 0.5; }
  100% { transform: translateY(-120vh) translateX(15px) scale(1.1); opacity: 0; }
}

.animate-float-slow { animation: float-slow 18s linear infinite; }
.animate-float-medium { animation: float-medium 12s linear infinite; }
.animate-float-fast { animation: float-fast 9s linear infinite; }

.animation-delay-1000 { animation-delay: 1.5s; }
.animation-delay-2000 { animation-delay: 3s; }
.animation-delay-3000 { animation-delay: 4.5s; }
.animation-delay-4000 { animation-delay: 6s; }

/* 删除了原有移动端汉堡菜单的 CSS，因为现在全部通过 Tailwind 的绝对定位和旋转实现，更稳定流畅 */
</style>
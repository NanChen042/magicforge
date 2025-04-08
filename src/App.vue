<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white/80 backdrop-blur-md border-b border-gray-100 fixed w-full top-0 z-50">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-center h-16 md:h-20 px-4 sm:px-6">
          <div class="flex items-center gap-3 md:gap-4">
            <div class="p-1.5 md:p-2 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl">
              <img src="./assets/user.jpg" alt="AIVista" class="h-7 w-7 md:h-9 md:w-9" />
            </div>
            <h1 class="text-base md:text-lg font-bold bg-gradient-to-br from-purple-600 to-blue-500 bg-clip-text text-transparent whitespace-nowrap">
              SouthernWind——AIVista
            </h1>
          </div>

          <!-- 桌面端导航 -->
          <nav class="hidden md:flex items-center">
            <div class="flex space-x-2 bg-gray-100/80 backdrop-blur-sm p-1.5 rounded-xl">
              <router-link
                to="/"
                class="relative px-4 py-2 rounded-lg text-gray-700 hover:text-purple-600 transition-colors duration-200 group"
                active-class="text-purple-600 bg-white shadow-sm shadow-purple-100"
              >
                首页
                <div class="absolute inset-x-0 -bottom-[6px] h-[2px] bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
              </router-link>
              <router-link
                to="/api-demo"
                class="relative px-4 py-2 rounded-lg text-gray-700 hover:text-purple-600 transition-colors duration-200 group"
                active-class="text-purple-600 bg-white shadow-sm shadow-purple-100"
              >
                API演示
                <div class="absolute inset-x-0 -bottom-[6px] h-[2px] bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
              </router-link>

              <router-link
                to="/game"
                class="relative px-4 py-2 rounded-lg text-gray-700 hover:text-purple-600 transition-colors duration-200 group"
                active-class="text-purple-600 bg-white shadow-sm shadow-purple-100"
              >
                游戏演示
                <div class="absolute inset-x-0 -bottom-[6px] h-[2px] bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
              </router-link>
              <router-link
                to="/prompt-library"
                class="relative px-4 py-2 rounded-lg text-gray-700 hover:text-purple-600 transition-colors duration-200 group"
                active-class="text-purple-600 bg-white shadow-sm shadow-purple-100"
              >
                提示库
                <div class="absolute inset-x-0 -bottom-[6px] h-[2px] bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
              </router-link>
            </div>
          </nav>

          <!-- 移动端菜单按钮 -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
            <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 移动端菜单 -->
      <div v-if="mobileMenuOpen" class="md:hidden bg-white border-b border-gray-100 shadow-sm animate-fade-in">
        <div class="px-4 py-2 space-y-1">
          <router-link
            to="/"
            class="block px-4 py-2.5 rounded-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
            :class="{ 'bg-purple-50 text-purple-600 font-medium': $route.path === '/' }"
            @click="mobileMenuOpen = false"
          >
            首页
          </router-link>
          <router-link
            to="/api-demo"
            class="block px-4 py-2.5 rounded-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
            :class="{ 'bg-purple-50 text-purple-600 font-medium': $route.path === '/api-demo' }"
            @click="mobileMenuOpen = false"
          >
            API演示
          </router-link>
          <router-link
            to="/game"
            class="block px-4 py-2.5 rounded-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
            :class="{ 'bg-purple-50 text-purple-600 font-medium': $route.path === '/game' }"
            @click="mobileMenuOpen = false"
          >
            游戏演示
          </router-link>
          <router-link
            to="/prompt-library"
            class="block px-4 py-2.5 rounded-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
            :class="{ 'bg-purple-50 text-purple-600 font-medium': $route.path === '/prompt-library' }"
            @click="mobileMenuOpen = false"
          >
            提示库
          </router-link>
        </div>
      </div>
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

const ApiUrlInput = defineAsyncComponent(() =>
  import('./components/ApiUrlInput.vue')
);

// 移动端菜单状态
const mobileMenuOpen = ref(false);
</script>

<style>
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out forwards;
}
</style>

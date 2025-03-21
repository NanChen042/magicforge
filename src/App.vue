<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white/80 backdrop-blur-md border-b border-gray-100 fixed w-full top-0 z-50">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-center h-20 px-6">
          <div class="flex items-center gap-4">
            <div class="p-2 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl">
              <img src="./assets/user.jpg" alt="Deepseek API" class="h-9 w-9" />
            </div>
            <h1 class="text-lg font-bold bg-gradient-to-br from-purple-600 to-blue-500 bg-clip-text text-transparent">
              南辰——Deepseek API
            </h1>
          </div>

          <nav class="flex items-center">
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
        </div>
      </div>
    </header>

    <main class="pt-28 pb-16 px-6">
      <div class="max-w-7xl mx-auto">
        <ApiUrlInput v-if="$route.path !== '/'" class="mb-6" />
        <router-view />
      </div>
    </main>

    <footer class="bg-white border-t border-gray-100">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <p class="text-sm text-gray-500 text-center">
          © {{ new Date().getFullYear() }} SouthernWind——Deepseek API 网页版 | 基于 Deepseek API 构建
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const ApiUrlInput = defineAsyncComponent(() =>
  import('./components/ApiUrlInput.vue')
);
</script>

<style>
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

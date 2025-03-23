import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? "/magicforge/" : "/",
  plugins: [
    vue(),
    vueDevTools(),
  ],
  build: {
    rollupOptions: {
      output: {        
        manualChunks(id) {
          // 处理Vue导出辅助文件
          if (id.includes('plugin-vue:export-helper')) {
            return 'vue-helper';
          }
          // 其他常用模块
          if (id.includes('node_modules/vue/')) {
            return 'vue';
          }
          if (id.includes('node_modules/vue-router/')) {
            return 'vue-router';
          }
          if (id.includes('node_modules/pinia/')) {
            return 'pinia';
          }
        },
        // 简化文件命名
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (info) => {
          const fileName = info.name || '';
          if (fileName.endsWith('.css')) {
            return 'css/[name]-[hash][extname]';
          }
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(fileName)) {
            return 'img/[name]-[hash][extname]';
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(fileName)) {
            return 'fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        preserveModules: false,  // 禁用 preserveModules
        sanitizeFileName: true,  // 启用文件名清理
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})

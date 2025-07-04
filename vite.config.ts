import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? "/magicforge/" : "/",
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    proxy: {
      // 代理字节跳动联网搜索API - 火山引擎格式
      '/api/agent': {
        target: 'https://mercury.volcengineapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/agent/, ''),
        secure: true,
        headers: {
          'Origin': 'https://mercury.volcengineapi.com'
        }
      },
      // 代理字节跳动豆包API
      '/api/bytedance': {
        target: 'https://ark.cn-beijing.volces.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/bytedance/, '/api/v3'),
        secure: true,
        headers: {
          'Origin': 'https://ark.cn-beijing.volces.com'
        }
      }
    }
  },
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

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { title: '首页' }
    },
    {
      path: '/api-demo',
      name: 'api-demo',
      component: () => import('../views/ApiDemoView.vue'),
      meta: { title: 'API演示' }
    },
    {
      path: '/ai-image',
      name: 'ai-image',
      component: () => import('../views/AIImageView.vue'),
      meta: { title: 'AI图像生成' }
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('../views/GameView.vue'),
      meta: { title: '游戏演示' }
    },
    {
      path: '/prompt-library',
      name: 'prompt-library',
      component: () => import('../views/PromptLibraryView.vue'),
      meta: { title: '提示库' }
    },
    {
      path: '/mcp-agent',
      name: 'mcp-agent',
      component: () => import('../views/McpAgentView.vue'),
      meta: { title: 'MCP智能体' }
    },

    // 捕获所有未匹配路由，重定向到首页
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
})

// 设置页面标题
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'Deepseek API客户端'}`
  next()
})

export default router

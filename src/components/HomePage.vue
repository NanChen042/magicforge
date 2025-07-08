<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- 美观的标题区域 -->
      <div class="text-center mb-16 relative">
        <!-- 背景装饰 -->
        <div class="absolute inset-0 -z-10">
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
          <div class="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full blur-2xl"></div>
          <div class="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-xl"></div>
        </div>

        <div class="relative inline-block">
          <div class="absolute -inset-2 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-60"></div>
          <h1 class="relative text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 mb-4">
            AIVista 智能平台
          </h1>
          <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
        </div>
        <p class="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          探索AI的无限可能，体验智能对话与创作的未来
        </p>

        <!-- 行动按钮 -->
        <div class="flex flex-wrap gap-4 justify-center mt-8">
          <router-link
            to="/api-demo"
            class="group relative inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-1"
          >
            <span class="relative z-10">开始体验</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="relative z-10 group-hover:translate-x-1 transition-transform">
              <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
          </router-link>
          <router-link
            to="/prompt-library"
            class="group inline-flex items-center gap-2 border-2 border-indigo-200 bg-white/80 backdrop-blur-sm text-indigo-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-lg hover:-translate-y-1"
          >
            浏览提示库
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="group-hover:translate-x-1 transition-transform">
              <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
        </div>
      </div>

      <!-- 美观的API介绍区域 -->
      <div class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 p-8 mb-16 relative overflow-hidden">
        <!-- 装饰性渐变条 -->
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500"></div>

        <!-- 背景装饰 -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-100/50 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
        <div class="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-100/50 to-transparent rounded-full translate-y-24 -translate-x-24"></div>

        <div class="relative max-w-4xl mx-auto text-center">
          <div class="flex items-center justify-center gap-3 mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h2 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">多样化AI接口支持</h2>
          </div>

          <p class="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            兼容多种接口风格，满足不同开发需求，轻松集成到您的应用中
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div class="group bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 p-8 rounded-2xl border border-indigo-100 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2 relative overflow-hidden">
              <!-- 悬停时的光效 -->
              <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div class="relative">
                <div class="mb-6 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="white" stroke-width="2"/>
                    <path d="M14 2V8H20" stroke="white" stroke-width="2"/>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-3">DeepseekClient</h3>
                <p class="text-gray-600">兼容 OpenAI 格式的客户端，无缝迁移体验，支持流式输出与思维链展示</p>
              </div>
            </div>

            <div class="group bg-gradient-to-br from-white via-purple-50/30 to-violet-50/30 p-8 rounded-2xl border border-purple-100 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 relative overflow-hidden">
              <!-- 悬停时的光效 -->
              <div class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div class="relative">
                <div class="mb-6 w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 18L22 12L16 6M8 6L2 12L8 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-3">DeepseekAdapter</h3>
                <p class="text-gray-600">兼容 ai.createModel 风格的适配器接口，简化开发流程，提高开发效率</p>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap justify-center gap-4 mb-8">
            <span class="px-5 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-200 shadow-sm">✨ 流式输出</span>
            <span class="px-5 py-2 bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 rounded-full text-sm font-semibold border border-purple-200 shadow-sm">🧠 思维链展示</span>
            <span class="px-5 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-semibold border border-blue-200 shadow-sm">🔄 实时响应</span>
            <span class="px-5 py-2 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 rounded-full text-sm font-semibold border border-violet-200 shadow-sm">⚙️ 完全可配置</span>
          </div>

          <router-link
            to="/api-demo"
            class="group inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-1 relative overflow-hidden"
          >
            <span class="relative z-10">查看完整文档</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="relative z-10 group-hover:translate-x-1 transition-transform">
              <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <!-- 悬停光效 -->
            <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
          </router-link>
        </div>
      </div>

      <!-- 简洁的特性网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div class="group bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center">
          <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">⚡</div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">流式输出</h3>
          <p class="text-gray-600 text-sm">实时显示生成内容，提供更好的用户体验</p>
        </div>

        <div class="group bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center">
          <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🧠</div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">思维链展示</h3>
          <p class="text-gray-600 text-sm">查看模型的推理过程，了解模型如何思考</p>
        </div>

        <div class="group bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center">
          <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🔌</div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">简洁接口</h3>
          <p class="text-gray-600 text-sm">兼容您熟悉的接口风格，减少学习成本</p>
        </div>

        <div class="group bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center">
          <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">⚙️</div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">完全可配置</h3>
          <p class="text-gray-600 text-sm">调整温度、最大生成长度等参数</p>
        </div>
      </div>

      <!-- 美观的功能导航 -->
      <section class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">功能导航</h2>
          <p class="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            探索AIVista平台的各项AI功能，从对话到创作，满足您的多样化需求
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- AI 对话测试 -->
          <router-link to="/api-demo" class="group bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 p-8 rounded-2xl shadow-lg border border-indigo-100 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-3 relative overflow-hidden block">
            <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative">
              <div class="mb-6 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 12H.01M12 12H.01M16 12H.01M21 12C21 16.418 16.97 20 12 20C10.54 20 9.15 19.48 8 18.67L3 20L4.33 15C3.52 13.85 3 12.46 3 11C3 6.582 7.03 3 12 3S21 6.582 21 11Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">AI 对话测试</h3>
              <p class="text-gray-600 leading-relaxed">体验智能对话，支持流式输出和思维链展示</p>
            </div>
          </router-link>

          <!-- AI 图像生成 -->
          <router-link to="/ai-image" class="group bg-gradient-to-br from-white via-purple-50/30 to-violet-50/30 p-8 rounded-2xl shadow-lg border border-purple-100 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-3 relative overflow-hidden block">
            <div class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative">
              <div class="mb-6 w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="white" stroke-width="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5" stroke="white" stroke-width="2"/>
                  <path d="M21 15L16 10L5 21" stroke="white" stroke-width="2"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">AI 图像生成</h3>
              <p class="text-gray-600 leading-relaxed">使用AI创建高质量图片，支持多种风格和尺寸</p>
            </div>
          </router-link>

          <!-- 剑道传奇游戏 -->
          <router-link to="/game" class="group bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30 p-8 rounded-2xl shadow-lg border border-emerald-100 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-3 relative overflow-hidden block">
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative">
              <div class="mb-6 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.828 14.828A4 4 0 0 1 9.172 9.172M9 10H10.01M15 10H15.01M21 12A9 9 0 1 1 3 12A9 9 0 0 1 21 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">剑道传奇</h3>
              <p class="text-gray-600 leading-relaxed">AI驱动的互动游戏，体验智能剧情生成</p>
            </div>
          </router-link>

          <!-- 提示词库 -->
          <router-link to="/prompt-library" class="group bg-gradient-to-br from-white via-orange-50/30 to-red-50/30 p-8 rounded-2xl shadow-lg border border-orange-100 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-3 relative overflow-hidden block">
            <div class="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative">
              <div class="mb-6 w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 11H5M14 0A2 2 0 0 1 16 2V6A2 2 0 0 1 14 8H10A2 2 0 0 1 8 6V2A2 2 0 0 1 10 0H14ZM5 11V9A2 2 0 0 1 7 7H17A2 2 0 0 1 19 9V11M7 7H10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">提示词库</h3>
              <p class="text-gray-600 leading-relaxed">精选提示词模板，提升AI对话效果</p>
            </div>
          </router-link>

          <!-- 热点话题 -->
          <div class="group bg-gradient-to-br from-white via-gray-50/50 to-gray-100/30 p-8 rounded-2xl shadow-lg border border-gray-200 relative overflow-hidden opacity-60">
            <div class="relative">
              <div class="mb-6 w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3">热点话题</h3>
              <p class="text-gray-600 leading-relaxed mb-4">实时热点资讯，AI智能分析解读</p>
              <div class="inline-block">
                <span class="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 rounded-full text-sm font-medium">即将推出</span>
              </div>
            </div>
          </div>

          <!-- MCP 智能体 -->
          <router-link to="/mcp-agent" class="group bg-gradient-to-br from-white via-cyan-50/30 to-blue-50/30 p-8 rounded-2xl shadow-lg border border-cyan-100 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-3 relative overflow-hidden block">
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative">
              <div class="mb-6 w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3 group-hover:text-cyan-600 transition-colors">MCP 智能体</h3>
              <p class="text-gray-600 leading-relaxed">智能体配置管理，自定义AI助手功能</p>
            </div>
          </router-link>
        </div>
      </section>

      <!-- 代码示例区域 -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div class="bg-gray-50 border-b border-gray-100 p-6">
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">快速开始</h2>
          <p class="text-gray-600">选择您喜欢的方式开始使用</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
          <div class="p-6">
            <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span class="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              使用 DeepseekClient
            </h4>
            <div class="bg-gray-900 rounded-xl p-6 overflow-x-auto">
              <pre class="text-sm font-mono text-gray-300"><code>import DeepseekClient from './services/DeepseekClient';

// 创建客户端
const client = new DeepseekClient({
  apiKey: 'YOUR_API_KEY', // 请替换为您的API密钥
  baseURL: 'YOUR_API_ENDPOINT', // 请替换为您的API端点
  model: 'deepseek-r1'
});

// 创建聊天完成请求
const stream = await client.chat.completions.create({
  messages: [
    { role: 'user', content: '请介绍一下李白' }
  ],
  stream: true
});

// 处理流式响应
for await (const chunk of stream) {
  // 处理思维链内容
  const reasoning = chunk.choices?.[0]?.delta?.reasoning_content;
  if (reasoning) console.log('思考:', reasoning);

  // 处理生成内容
  const content = chunk.choices?.[0]?.delta?.content;
  if (content) console.log('回答:', content);
}</code></pre>
            </div>
          </div>

          <div class="p-6">
            <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              使用 DeepseekAdapter
            </h4>
            <div class="bg-gray-900 rounded-xl p-6 overflow-x-auto">
              <pre class="text-sm font-mono text-gray-300"><code>import ai from './services/DeepseekAdapter';

// 创建模型
const aiModel = ai.createModel("deepseek", {
  apiKey: 'YOUR_API_KEY', // 请替换为您的API密钥
  baseURL: 'YOUR_API_ENDPOINT' // 请替换为您的API端点
});

// 流式文本生成
const res = await aiModel.streamText({
  model: "deepseek-r1",
  messages: [
    { role: "user", content: "请介绍一下李白" }
  ]
});

// 处理流式响应
for await (const data of res.dataStream) {
  // 思维链内容
  const think = (data?.choices?.[0]?.delta)?.reasoning_content;
  if (think) console.log('思考:', think);

  // 生成文本内容
  const text = (data?.choices?.[0]?.delta)?.content;
  if (text) console.log('回答:', text);
}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 使用 router-link 进行导航，无需额外的脚本逻辑
</script>

<style scoped>
/* 美观的渐变设计系统 */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

.bg-gradient-to-bl {
  background-image: linear-gradient(to bottom left, var(--tw-gradient-stops));
}

.bg-gradient-to-tr {
  background-image: linear-gradient(to top right, var(--tw-gradient-stops));
}

.text-transparent {
  color: transparent;
}

.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 简化的基础样式 */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.leading-relaxed {
  line-height: 1.625;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .text-4xl {
    font-size: 2rem;
  }

  .text-3xl {
    font-size: 1.5rem;
  }
}


</style>

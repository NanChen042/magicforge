<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- 标题区域 -->
      <div class="text-center mb-16">
        <div class="relative inline-block">
          <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur-3xl"></div>
          <h1 class="relative text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-4">
            Deepseek 接口演示
          </h1>
        </div>
        <p class="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          探索AI的无限可能，体验智能对话的未来
        </p>
      </div>

      <!-- 介绍区域 -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-12">
        <div class="max-w-3xl mx-auto text-center">
          <p class="text-lg text-gray-600 mb-6">本项目提供了两种使用 Deepseek API 的方法：</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-6 bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-100">
              <h3 class="text-lg font-semibold text-purple-700 mb-2">DeepseekClient</h3>
              <p class="text-gray-600">兼容 OpenAI 格式的客户端</p>
            </div>
            <div class="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100">
              <h3 class="text-lg font-semibold text-blue-700 mb-2">DeepseekAdapter</h3>
              <p class="text-gray-600">兼容 ai.createModel 风格的适配器</p>
            </div>
          </div>
          <p class="mt-6 text-gray-600">两种方式都支持流式输出和思维链展示，让您可以看到模型的推理过程。</p>
        </div>
      </div>

      <!-- 特性网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div class="group bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-2xl text-white mb-4">
            🔄
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">流式输出</h3>
          <p class="text-gray-600">实时显示生成内容，提供更好的用户体验</p>
        </div>

        <div class="group bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-2xl text-white mb-4">
            🤔
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">思维链展示</h3>
          <p class="text-gray-600">查看模型的推理过程，了解模型如何思考</p>
        </div>

        <div class="group bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-2xl text-white mb-4">
            🔌
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">简洁接口</h3>
          <p class="text-gray-600">兼容您熟悉的接口风格，减少学习成本</p>
        </div>

        <div class="group bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-2xl text-white mb-4">
            ⚙️
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">完全可配置</h3>
          <p class="text-gray-600">调整温度、最大生成长度等参数</p>
        </div>
      </div>

      <!-- 演示卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div @click="goToDemo" class="group cursor-pointer relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out rounded-2xl"></div>
          <div class="relative bg-white p-8 rounded-2xl shadow-lg border border-gray-100 group-hover:translate-y-[-2px] group-hover:shadow-purple-100/50 group-hover:shadow-xl group-hover:border-purple-100 transition-all duration-500 ease-out">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            <h3 class="text-xl font-semibold text-gray-800 group-hover:text-purple-700 mb-4 transition-colors duration-300">API 演示</h3>
            <p class="text-gray-600 group-hover:text-gray-700 mb-6 transition-colors duration-300">体验 Deepseek API 的流式输出与思维链</p>
            <div class="flex items-center text-purple-600 group-hover:text-purple-700 transition-all duration-300">
              <span class="font-medium">立即体验</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 transform group-hover:translate-x-2 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div @click="goToGame" class="group cursor-pointer relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out rounded-2xl"></div>
          <div class="relative bg-white p-8 rounded-2xl shadow-lg border border-gray-100 group-hover:translate-y-[-2px] group-hover:shadow-blue-100/50 group-hover:shadow-xl group-hover:border-blue-100 transition-all duration-500 ease-out">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            <h3 class="text-xl font-semibold text-gray-800 group-hover:text-blue-700 mb-4 transition-colors duration-300">游戏演示</h3>
            <p class="text-gray-600 group-hover:text-gray-700 mb-6 transition-colors duration-300">体验基于大语言模型的交互式游戏</p>
            <div class="flex items-center text-blue-600 group-hover:text-blue-700 transition-all duration-300">
              <span class="font-medium">立即体验</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 transform group-hover:translate-x-2 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div @click="goToPromptLibrary" class="group cursor-pointer relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-green-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out rounded-2xl"></div>
          <div class="relative bg-white p-8 rounded-2xl shadow-lg border border-gray-100 group-hover:translate-y-[-2px] group-hover:shadow-green-100/50 group-hover:shadow-xl group-hover:border-green-100 transition-all duration-500 ease-out">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            <h3 class="text-xl font-semibold text-gray-800 group-hover:text-green-700 mb-4 transition-colors duration-300">提示库</h3>
            <p class="text-gray-600 group-hover:text-gray-700 mb-6 transition-colors duration-300">探索 DeepSeek 提示词样例，挖掘更多可能</p>
            <div class="flex items-center text-green-600 group-hover:text-green-700 transition-all duration-300">
              <span class="font-medium">立即体验</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 transform group-hover:translate-x-2 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

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
import { defineEmits } from 'vue';

const emit = defineEmits(['change-tab']);

function goToDemo() {
  emit('change-tab', 'api-demo');
}

function goToGame() {
  emit('change-tab', 'game');
}

function goToPromptLibrary() {
  emit('change-tab', 'prompt-library');
}
</script>

<style scoped>
:root {
  --primary-color: #5b48da;
  --secondary-color: #ff5a5f;
  --accent-color: #ffc107;
  --dark-color: #292639;
  --medium-color: #3d3654;
  --light-color: #ffffff;
  --text-color: #292639;
  --text-light: #6e6a86;
  --text-dark: #1c1b29;
  --gray-100: #f4f2f8;
  --gray-200: #e9e7f0;
  --gray-300: #d2cfe3;
  --shadow-sm: 0 4px 6px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 6px 16px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.15);
  --transition-fast: all 0.2s ease;
  --transition-normal: all 0.3s ease;
}

.home-page {
  padding: 40px 0;
  background: linear-gradient(to bottom, var(--gray-100), #ebf0f6);
  min-height: calc(100vh - 60px);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  color: var(--dark-color);
  margin-bottom: 30px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.intro {
  text-align: center;
  margin-bottom: 30px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.intro p {
  font-size: 1.1rem;
  color: var(--text-color);
  line-height: 1.6;
}

.intro ul {
  display: inline-block;
  text-align: left;
  margin: 15px 0;
}

.intro li {
  margin-bottom: 8px;
  font-size: 1.1rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.feature {
  background: var(--light-color);
  border-radius: 12px;
  padding: 25px;
  box-shadow: var(--shadow-md);
  text-align: center;
  transition: var(--transition-normal);
  border: 1px solid var(--gray-200);
}

.feature:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(91, 72, 218, 0.2);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.feature h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: var(--dark-color);
}

.feature p {
  color: var(--text-light);
  margin: 0;
}

.demo-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.demo-card {
  background: var(--light-color);
  border-radius: 12px;
  padding: 25px;
  box-shadow: var(--shadow-md);
  cursor: pointer;
  transition: var(--transition-normal);
  border: 1px solid var(--gray-200);
  position: relative;
  overflow: hidden;
}

.demo-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  opacity: 0;
  transition: var(--transition-normal);
}

.demo-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(91, 72, 218, 0.2);
}

.demo-card:hover::before {
  opacity: 1;
}

.demo-card h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: var(--dark-color);
}

.demo-card p {
  color: var(--text-light);
  margin-bottom: 20px;
}

.card-footer {
  text-align: center;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: var(--light-color);
  border-radius: 8px;
  transition: var(--transition-normal);
  font-weight: 500;
}

.btn:hover {
  background: linear-gradient(135deg, #6a58e6, #ff6b70);
  box-shadow: 0 4px 10px rgba(91, 72, 218, 0.2);
  transform: translateY(-2px);
}

.docs-section {
  margin-top: 30px;
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.docs-section h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--dark-color);
  font-size: 1.8rem;
  position: relative;
  padding-bottom: 10px;
}

.docs-section h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 3px;
}

.code-block {
  margin-top: 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  margin-bottom: 30px;
  position: relative;
}

.code-block h4 {
  margin: 0;
  padding: 15px;
  background-color: var(--dark-color);
  color: var(--light-color);
  font-size: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.code-block h4::after {
  content: 'JavaScript';
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: normal;
}

.code-block pre {
  margin: 0;
  padding: 20px;
  background-color: #282c34;
  color: #abb2bf;
  overflow-x: auto;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.6;
}

/* 添加语法高亮风格 */
:deep(.code-block pre .keyword) {
  color: #c678dd;
}

:deep(.code-block pre .string) {
  color: #98c379;
}

:deep(.code-block pre .comment) {
  color: #5c6370;
  font-style: italic;
}

:deep(.code-block pre .function) {
  color: #61afef;
}

:deep(.code-block pre .number) {
  color: #d19a66;
}

@media (max-width: 768px) {
  .feature-grid,
  .demo-cards {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: 2rem;
  }

  .code-block pre {
    font-size: 13px;
  }
}
</style>

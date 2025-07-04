<template>
  <div class="min-h-screen bg-slate-50 py-8 px-1  sm:px-6 lg:px-8">
    <!-- 页面标题区域 -->
    <div class="max-w-7xl mx-auto mb-6 md:mb-12 text-center px-4">
      <div class="relative inline-block">
        <div class="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur-3xl"></div>
        <h1 class="relative text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-2 md:mb-3">
          Vista AI 平台
        </h1>
      </div>
      <p class="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
        智能体AI对话与内容生成工具
      </p>
    </div>

    <!-- 主内容区域：配置面板和聊天面板 -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-8 px-4">
      <!-- 配置面板 -->
      <div class="bg-white rounded-xl shadow-md border border-gray-100 p-4 md:p-6 lg:w-full min-h-[500px] md:min-h-[650px] order-2 lg:order-1">
        <div class="flex items-center space-x-3 mb-6">
          <div class="bg-purple-100 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-800">系统配置</h2>
        </div>

        <!-- API 设置区域 -->
        <div class="space-y-5 mb-6">
          <div>
            <label for="api-key" class="block text-sm font-medium text-gray-700 mb-1">API KEY</label>
            <div class="relative">
              <input type="password" id="api-key" v-model="apiKey" placeholder="输入您的 Deepseek API Key" class="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm" />
              <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1 1-1-.257-.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd" />
                </svg>
              </span>
            </div>
          </div>

          <!-- API URL 输入 -->
          <div>
            <label for="api-url" class="block text-sm font-medium text-gray-700 mb-1">API 地址</label>
            <div class="relative">
              <input type="text" id="api-url" v-model="apiUrl" placeholder="输入 API 地址）" class="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm" />
              <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
                </svg>
              </span>
            </div>
          </div>
          <!-- 模型选择输入 -->
          <div class="pt-5 border-t border-gray-200 mt-5">
            <label for="model-name" class="block text-sm font-medium text-gray-700 mb-1">AI 模型</label>
            <div class="relative">
              <input type="text" id="model-name" v-model="modelName" placeholder="输入模型名称（例如 deepseek-chat）" class="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm" />
              <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                </svg>
              </span>
            </div>

            <div class="mt-2 flex flex-wrap gap-2">
              <button @click="setModelName('deepseek-chat')" class="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded border border-gray-200 transition-colors">
                deepseek-chat
              </button>
              <button @click="setModelName('deepseek-coder')" class="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded border border-gray-200 transition-colors">
                deepseek-coder
              </button>
              <button @click="setModelName('QwQ-32B')" class="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded border border-gray-200 transition-colors">
                QwQ-32B
              </button>
              <button @click="setModelName('deepseek-lite')" class="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded border border-gray-200 transition-colors">
                deepseek-lite
              </button>
              <button @click="setModelName('deepseek-v2')" class="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded border border-gray-200 transition-colors">
                deepseek-v2
              </button>
            </div>

            <div class="mt-3 relative">
              <button @click="updateCurrentModel" class="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                </svg>
                更新当前模型
              </button>

              <!-- 成功提示 -->
              <div v-if="showingModelSuccess" class="absolute top-0 left-0 right-0 -mt-10 bg-green-100 text-green-700 text-sm px-3 py-1 rounded-md flex items-center justify-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                模型已更新
              </div>
            </div>
          </div>
          <!-- API 风格选择 -->
          <div>
            <span class="block text-sm font-medium text-gray-700 mb-2">API 风格</span>
            <div class="grid grid-cols-2 gap-3">
              <div @click="setApiStyle('openai')" class="cursor-pointer relative p-4 rounded-lg border transition-all duration-200" :class="apiStyle === 'openai'
                  ? 'border-purple-500 bg-purple-50 shadow-sm'
                  : 'border-gray-200 hover:border-purple-300'
                ">
                <span class="absolute -top-1.5 -right-1.5" v-if="apiStyle === 'openai'">
                  <span class="flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </span>
                <div class="mb-2 inline-flex items-center justify-center rounded-lg bg-purple-100 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-700" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
                  </svg>
                </div>
                <h3 class="text-sm font-medium text-gray-900">
                  OpenAI 兼容格式
                </h3>
                <p class="mt-1 text-xs text-gray-500">
                  兼容标准OpenAI接口的客户端
                </p>
              </div>

              <div @click="setApiStyle('adapter')" class="cursor-pointer relative p-4 rounded-lg border transition-all duration-200" :class="apiStyle === 'adapter'
                  ? 'border-purple-500 bg-purple-50 shadow-sm'
                  : 'border-gray-200 hover:border-purple-300'
                ">
                <span class="absolute -top-1.5 -right-1.5" v-if="apiStyle === 'adapter'">
                  <span class="flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </span>
                <div class="mb-2 inline-flex items-center justify-center rounded-lg bg-purple-100 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-700" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clip-rule="evenodd" />
                  </svg>
                </div>
                <h3 class="text-sm font-medium text-gray-900">
                  ai.createModel
                </h3>
                <p class="mt-1 text-xs text-gray-500">简洁的适配器风格接口</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 参数控制区域 -->
        <div class="pt-5 border-t border-gray-200">
          <!-- 流式输出开关 -->
          <div class="flex items-center justify-between mb-5">
            <span class="text-sm font-medium text-gray-700">流式输出</span>
            <button type="button" @click="streaming = !streaming" :class="streaming ? 'bg-purple-600' : 'bg-gray-200'" class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              <span :class="streaming ? 'translate-x-5' : 'translate-x-0'" class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out">
                <span :class="streaming
                    ? 'opacity-0 duration-100 ease-out'
                    : 'opacity-100 duration-200 ease-in'
                  " class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity">
                  <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                    <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
                <span :class="streaming
                    ? 'opacity-100 duration-200 ease-in'
                    : 'opacity-0 duration-100 ease-out'
                  " class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity">
                  <svg class="h-3 w-3 text-purple-600" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                  </svg>
                </span>
              </span>
            </button>
          </div>

          <!-- 创意度滑块 -->
          <div class="mb-5">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">创意度</span>
              <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                {{ temperature.toFixed(1) }}
              </span>
            </div>
            <input type="range" min="0" max="1" step="0.1" v-model.number="temperature" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" />
            <div class="flex justify-between text-xs text-gray-500 mt-1">
              <span>精确</span>
              <span>创意</span>
            </div>
          </div>

          <!-- 输出长度滑块 -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">输出长度</span>
              <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                {{ maxTokens }}
              </span>
            </div>
            <input type="range" min="500" max="4000" step="500" v-model.number="maxTokens" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" />
            <div class="flex justify-between text-xs text-gray-500 mt-1">
              <span>简短</span>
              <span>详细</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 聊天面板 -->
      <div class="col-span-1 lg:col-span-2 flex flex-col bg-white rounded-xl shadow-md border border-gray-100 min-h-[500px] md:min-h-[650px] order-1 lg:order-2">
        <!-- 聊天头部 -->
        <div class="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-gray-200">
          <button @click="activeTab = 'output'" class="px-4 py-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors" :class="activeTab === 'output'
              ? 'text-purple-600 border-purple-600'
              : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
            ">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V9z" clip-rule="evenodd" />
            </svg>
            对话内容
          </button>
          <button @click="activeTab = 'thinking'" class="px-4 py-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors" :class="activeTab === 'thinking'
              ? 'text-purple-600 border-purple-600'
              : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
            ">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
            </svg>
            思维过程
          </button>

          <!-- 进度指示器 -->
          <div v-if="isProcessing" class="ml-auto flex items-center gap-2 px-4">
            <div class="w-24 bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div class="bg-gradient-to-r from-purple-500 to-blue-500 h-1.5 rounded-full" :style="{ width: streamProgress + '%' }"></div>
            </div>
            <span class="text-xs text-gray-500">{{ streamProgress }}%</span>
          </div>
        </div>

        <!-- 消息内容区域 -->
        <div class="flex-1 overflow-hidden">
          <!-- 对话内容 -->
          <div v-show="activeTab === 'output'" class="chat-container h-full max-h-[650px]" ref="chatContainer" @scroll="handleScroll">
            <!-- 思考提示 -->
            <div v-if="isThinking" class="flex items-center space-x-3 p-4 mb-4 bg-blue-50 rounded-lg border border-blue-100 animate-pulse thinking-indicator">
              <div class="relative w-8 h-8 flex-shrink-0">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-ping opacity-75"></div>
                <div class="relative bg-white rounded-full p-1.5 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-sm font-medium text-blue-700">AI正在思考中</div>
                <div class="text-xs text-blue-500">正在分析您的问题，并构建解答思路，请稍候...</div>
              </div>
            </div>

            <div v-for="(item, index) in conversationHistory" :key="index" :class="[
              'flex mb-6',
              item.role === 'user' ? 'justify-end' : 'justify-start',
            ]">
              <div :class="[
                'flex max-w-[85%] gap-3',
                item.role === 'user' ? 'flex-row-reverse' : 'flex-row',
              ]">
                <div v-if="item.role === 'user'" class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-purple-200">
                  <img src="@/assets/user.jpg" alt="User" class="w-full h-full object-cover" />
                </div>
                <div v-else class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-lg">
                  🤖
                </div>

                <div :class="[
                  'relative group rounded-2xl px-4 py-3 text-[15px] leading-6',
                  item.role === 'user'
                    ? 'bg-purple-600 text-white rounded-tr-none'
                    : 'bg-white-100 text-gray-800 rounded-tl-none border border-gray-200 border-solid'
                ]">
                  <div :class="[
                    'text-xs font-medium mb-1',
                    item.role === 'user'
                      ? 'text-purple-100'
                      : 'text-gray-500'
                  ]">
                    {{ item.role === "user" ? "您" : "模型" }}
                  </div>

                  <!-- 正在思考提示 - 显示在最后一条AI回复中 -->
                  <div v-if="isThinking && item.role === 'assistant' && index === conversationHistory.length - 1"
                       class="flex flex-col space-y-2 mb-2">
                    <div class="flex items-center space-x-2 text-sm text-blue-600 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>正在思考...</span>
                    </div>
                    <div class="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-700 leading-relaxed">
                      <div class="flex items-center space-x-1.5 mb-2">
                        <div class="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                        <div class="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style="animation-delay: 300ms"></div>
                        <div class="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style="animation-delay: 600ms"></div>
                      </div>
                      <p class="text-xs">AI正在分析您的问题，并构建解答思路，请稍候...</p>
                    </div>
                  </div>

                  <!-- 手动停止提示 - 显示在最后一条AI回复中且isLastMessageStopped为true -->
                  <div v-if="isLastMessageStopped && item.role === 'assistant' && index === conversationHistory.length - 1"
                       class="flex items-center space-x-2 p-2 mb-3 bg-amber-50 rounded-lg border border-amber-100 text-amber-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-xs font-medium">回答已被手动停止</span>
                  </div>

                  <div :class="[
                    'prose prose-sm max-w-none',
                    item.role === 'user' ? 'prose-invert' : 'prose-gray',
                    '[&>:first-child]:mt-0',
                    '[&>:last-child]:mb-0',
                    '[&>p]:my-3',
                    '[&>ul]:my-3 [&>ul>li]:my-1',
                    '[&>ol]:my-3 [&>ol>li]:my-1',
                    '[&>blockquote]:my-3 [&>blockquote]:border-l-4 [&>blockquote]:pl-3 [&>blockquote]:italic',
                    '[&>pre]:my-3 [&>pre]:bg-gray-800/5 [&>pre]:p-3 [&>pre]:rounded-lg',
                    '[&>h1]:text-lg [&>h1]:font-semibold [&>h1]:my-4',
                    '[&>h2]:text-base [&>h2]:font-semibold [&>h2]:my-3',
                    '[&>h3]:text-sm [&>h3]:font-semibold [&>h3]:my-2',
                    '[&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm',
                    item.role === 'user'
                      ? '[&>code]:bg-purple-500/30 [&>blockquote]:border-purple-400/50'
                      : '[&>code]:bg-gray-200 [&>blockquote]:border-gray-300'
                  ]" v-html="formatText(item.content)"></div>

                  <button
                    @click="copyMessage(item.content)"
                    class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 rounded-lg hover:bg-black/5 text-gray-500 hover:text-gray-700"
                    :title="copySuccess ? '复制成功！' : '复制内容'"
                  >
                    <svg v-if="!copySuccess" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- 打字动画指示器 -->
          <!--   <div v-if="isProcessing && !isThinking && conversationHistory.length > 0" class="flex mb-6 justify-start">
              <div class="flex max-w-[85%] gap-3 flex-row">
                <div class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-lg">
                  🤖
                </div>
                <div class="relative rounded-2xl px-4 py-3 bg-gray-100 text-gray-800 rounded-tl-none">
                  <div class="text-xs font-medium mb-2 text-gray-500">
                    模型
                  </div>
                  <div class="flex space-x-1.5">
                    <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                    <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                    <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                  </div>
                </div>
              </div>
            </div> -->

            <!-- 空状态 -->
            <div v-if="conversationHistory.length === 0" class="flex flex-col items-center justify-center min-h-full p-8 text-center">
              <div class="w-20 h-20 rounded-full bg-indigo-50/30 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-indigo-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
                </svg>
              </div>
              <p class="text-xl font-semibold text-indigo-600 mb-2">
                开始提问，探索AI的能力
              </p>
              <p class="text-gray-600 mb-8 max-w-md">
                输入您的问题，体验AI的智能对话能力
              </p>

              <!-- 示例问题部分 -->
              <div class="space-y-6 w-full max-w-2xl">
                <!-- 热门话题区域 -->
                <div>
                  <div class="flex items-center gap-2 mb-3">
                    <div class="bg-red-100 p-1.5 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <h3 class="text-sm font-medium text-gray-700">热门话题</h3>
                    <button @click="refreshHotTopics" class="ml-auto text-xs text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                      </svg>
                      <span>刷新</span>
                    </button>
                  </div>
                  <div v-if="isLoadingHotTopics" class="flex justify-center py-4">
                    <div class="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                  </div>
                  <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <button
                      v-for="(topic, index) in hotTopics"
                      :key="index"
                      @click="setExampleQuestion(topic)"
                      class="w-full px-3 py-2 text-left bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-lg hover:shadow-sm transition-all overflow-hidden text-xs text-gray-700 hover:from-red-100 hover:to-orange-100"
                    >
                      <div class="flex items-center gap-1.5">
                        <span class="flex-shrink-0 w-4 h-4 rounded-full bg-red-500/10 text-red-500 text-[10px] font-bold flex items-center justify-center">
                          {{index + 1}}
                        </span>
                        <span class="truncate">{{topic}}</span>
                      </div>
                    </button>
                  </div>
                </div>

                <!-- 预设问题区域 -->
                <div>
                  <div class="flex items-center gap-2 mb-3">
                    <div class="bg-indigo-100 p-1.5 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <h3 class="text-sm font-medium text-gray-700">预设问题</h3>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <button
                      @click="setExampleQuestion('介绍一下唐代诗人李白')"
                      class="w-full px-4 py-3 text-left bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 transition-colors overflow-hidden text-sm text-gray-700"
                    >
                      <span class="block truncate">介绍一下唐代诗人李白</span>
                    </button>
                    <button
                      @click="setExampleQuestion('如何使用React创建一个TodoList组件？')"
                      class="w-full px-4 py-3 text-left bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 transition-colors overflow-hidden text-sm text-gray-700"
                    >
                      <span class="block truncate">如何使用React创建TodoList</span>
                    </button>
                    <button
                      @click="setExampleQuestion('解释量子计算的基本原理')"
                      class="w-full px-4 py-3 text-left bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 transition-colors overflow-hidden text-sm text-gray-700"
                    >
                      <span class="block truncate">量子计算的基本原理</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 思维过程 -->
          <div v-show="activeTab === 'thinking'" class="thinking-process h-full overflow-y-auto p-6 max-h-[650px]" ref="thinkingContainer" @scroll="handleScroll">
            <!-- 有思维内容时显示 -->
            <div v-if="reasoningContent" class="relative">
              <div class="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl"></div>
              <div class="relative p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
                <!-- 思维图标和标题 -->
                <div class="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">思维链路</h3>
                    <p class="text-sm text-gray-500">AI的分析和推理过程</p>
                  </div>
                </div>
                <!-- 思维内容 -->
                <div class="prose prose-sm max-w-none text-gray-600">
                  <div class="space-y-4" v-html="formatText(reasoningContent)"></div>
                </div>
              </div>
            </div>

            <!-- 正在加载思维过程 -->
            <div v-else-if="isThinking" class="relative">
              <div class="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl"></div>
              <div class="relative p-8 bg-white border border-gray-100 rounded-xl shadow-sm">
                <div class="flex flex-col items-center justify-center">
                  <!-- 思考动画 -->
                  <div class="relative w-16 h-16 mb-6">
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                    <div class="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <h3 class="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
                    AI正在思考
                  </h3>
                  <p class="text-gray-500 text-center max-w-md">
                    正在分析您的问题，构建逻辑链路，生成最佳答案...
                  </p>
                </div>
              </div>
            </div>

            <!-- 空状态 -->
            <div v-else class="relative">
              <div class="absolute -inset-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl blur-xl"></div>
              <div class="relative p-8 bg-white border border-gray-100 rounded-xl shadow-sm">
                <div class="flex flex-col items-center justify-center text-center">
                  <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-3">
                    探索AI的思维过程
                  </h3>
                  <p class="text-gray-500 max-w-md">
                    在这里，您可以看到AI是如何分析问题、构建逻辑链路，并最终得出答案的。发送一个问题，开始探索AI的思维世界吧！
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 错误提示 -->
        <div v-if="error" class="mx-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <p class="text-sm text-red-700">{{ error }}</p>
        </div>

        <!-- 输入区域 -->
        <div class="p-3 md:p-4 border-t border-gray-200 mt-auto bg-gray-50">
          <div class="flex flex-col">
            <div class="relative mb-2">
              <textarea
                id="message-input"
                v-model="userInput"
                class="block w-full resize-none border border-gray-300 rounded-xl px-3 md:px-4 py-2 md:py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm min-h-[80px] md:min-h-[100px] pr-12 transition-shadow shadow-sm hover:shadow"
                placeholder="请输入您的问题或需求..."
                :disabled="isProcessing"
                @keyup.ctrl.enter="sendMessage"
              ></textarea>
              <div class="absolute bottom-3 right-3 hidden md:flex items-center gap-2 text-xs text-gray-400">
                <kbd class="px-2 py-1 bg-white rounded border border-gray-300 shadow-sm">Ctrl</kbd>
                <span>+</span>
                <kbd class="px-2 py-1 bg-white rounded border border-gray-300 shadow-sm">Enter</kbd>
                <span>发送</span>
              </div>
            </div>

            <div class="flex flex-wrap md:flex-nowrap justify-between items-center gap-2">
              <div class="w-full md:w-auto order-2 md:order-1">
                <button class="w-full md:w-auto inline-flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" title="清空对话" @click="clearConversation">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  <span>清空对话</span>
                </button>
              </div>

              <div class="w-full md:w-auto order-1 md:order-2 flex flex-wrap gap-2 items-center">
                <!-- 联网搜索开关 -->
                <div class="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-200">
                  <input
                    id="web-search-toggle"
                    v-model="enableWebSearch"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label for="web-search-toggle" class="text-sm font-medium text-blue-700 cursor-pointer flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                    </svg>
                    联网搜索
                  </label>
                </div>

                <!-- 关键词转换按钮 -->
                <button
                  v-if="!isProcessing"
                  @click="showTransformModal = true"
                  :disabled="!userInput.trim() || isTransforming"
                  class="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm hover:shadow-md"
                  title="优化提示词"
                >
                  <svg v-if="!isTransforming" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>{{ isTransforming ? '转换中' : '优化提示词' }}</span>
                </button>

                <!-- 发送消息按钮 -->
                <button v-if="!isProcessing" @click="sendMessage" :disabled="!userInput.trim() || isSearching" class="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-all disabled:bg-gradient-to-r disabled:from-purple-300 disabled:to-purple-400 disabled:opacity-70 disabled:text-purple-100 disabled:shadow-none disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-sm hover:shadow-md">
                  <span class="flex items-center gap-2">
                    <span v-if="isSearching">搜索中...</span>
                    <span v-else>发送</span>
                    <svg v-if="isSearching" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </span>
                </button>

                <!-- 终止生成按钮 -->
                <button v-else @click="stopGeneration" class="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-all bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm hover:shadow-md">
                  <span class="flex items-center gap-2">
                    <span>停止生成</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索过程展示 -->
    <div v-if="showSearchProcess" class="fixed top-[300px] right-4 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 max-w-md z-40">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          联网搜索进行中
        </h3>
        <button @click="showSearchProcess = false" class="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <div class="space-y-3">
        <div v-for="step in searchSteps" :key="step.step" class="flex items-start gap-3">
          <!-- 状态图标 -->
          <div class="flex-shrink-0 mt-1">
            <div v-if="step.status === 'processing'" class="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <div v-else-if="step.status === 'completed'" class="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <div v-else class="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>

          <!-- 步骤内容 -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-gray-900">{{ step.action }}</span>
              <span class="text-xs text-gray-500">{{ step.timestamp }}</span>
            </div>
            <p class="text-sm text-gray-600 mt-1">{{ step.details }}</p>
          </div>
        </div>
      </div>
    </div>



    <!-- 关键词转换模态框 -->
    <div v-if="showTransformModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <!-- 模态框头部 -->
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947z" clip-rule="evenodd" />
              </svg>
              提示词优化
            </h3>
            <button @click="showTransformModal = false" class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <!-- 转换模式选择 -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">选择优化模式</label>
            <div class="grid grid-cols-2 gap-3">
              <button
                v-for="mode in transformModes"
                :key="mode.value"
                @click="selectedTransformMode = mode.value"
                :class="[
                  'p-4 rounded-lg border-2 transition-all text-left',
                  selectedTransformMode === mode.value
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                ]"
              >
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-lg">{{ mode.icon }}</span>
                  <span class="font-medium text-gray-900">{{ mode.label }}</span>
                </div>
                <p class="text-sm text-gray-600">{{ mode.description }}</p>
              </button>
            </div>
          </div>

          <!-- 原始文本显示 -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">原始输入</label>
            <div class="p-3 bg-gray-50 rounded-lg border text-sm text-gray-700">
              {{ userInput }}
            </div>
          </div>

          <!-- 转换结果 -->
          <div v-if="transformResult" class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">优化后的提示词</label>
            <div class="p-4 bg-green-50 rounded-lg border border-green-200">
              <p class="text-gray-800 mb-3">{{ transformResult.transformedText }}</p>
              <div v-if="transformResult.suggestions.length > 0" class="border-t border-green-200 pt-3">
                <p class="text-sm font-medium text-gray-700 mb-2">相关建议：</p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="suggestion in transformResult.suggestions"
                    :key="suggestion"
                    class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
                  >
                    {{ suggestion }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="flex justify-end gap-3">
            <button
              @click="showTransformModal = false"
              class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              取消
            </button>
            <button
              @click="performTransform"
              :disabled="isTransforming"
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg v-if="isTransforming" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {{ isTransforming ? '转换中...' : '开始转换' }}
            </button>
            <button
              v-if="transformResult"
              @click="applyTransform"
              class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              应用优化
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 代码示例区域 -->
    <div class="max-w-7xl mx-auto bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-8">
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div class="flex items-center space-x-3">
          <div class="bg-purple-100 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-800">代码示例</h3>
        </div>
        <div class="flex items-center space-x-2 text-gray-500 text-sm">
          <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">{{
            apiStyle === "openai" ? "OpenAI兼容格式" : "ai.createModel样式"
          }}</span>
        </div>
      </div>
      <div class="bg-gray-900 p-4 overflow-x-auto text-gray-300 text-sm font-mono whitespace-pre">
        {{ currentCode }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from "vue";
import { ElMessageBox, ElMessage } from 'element-plus';
import { useDeepseekApi } from "../hooks/useDeepseekApi";
import { usePromptStore } from "../stores/prompt";
// @ts-ignore
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
// 引入axios用于发送HTTP请求
import axios from 'axios';
// 引入新的服务
import keywordTransformService, { type TransformResult } from '../services/keywordTransformService';
import webSearchService, { type SearchResult } from '../services/webSearchService';

// 创建 markdown-it 实例
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: function (str: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs language-' + lang + '"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>';
      } catch (__) {
        // 捕获错误但不处理
      }
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

// 定义属性
const props = defineProps({
  apiBaseUrl: {
    type: String,
    default: "",
  },
  initialPrompt: {
    type: String,
    default: ''
  }
});

// 基本设置
const userInput = ref(""); // 移除默认的用户输入文本
const streaming = ref(true);
const temperature = ref(0.7);
const maxTokens = ref(2000);
const activeTab = ref("output");
const apiStyle = ref("openai"); // 默认使用OpenAI兼容格式
const modelName = ref(localStorage.getItem('modelName') || "deepseek-ai/DeepSeek-R1-Distill-Qwen-7B"); // 添加模型名称状态
const isSending = ref(false); // 添加发送状态标志，防止重复发送
const hotTopics = ref<string[]>([]); // 添加热搜话题数组
const isLoadingHotTopics = ref(false); // 添加热搜加载状态
const showingModelSuccess = ref(false); // 添加模型更新成功提示标志



// 新增功能相关状态
const showTransformModal = ref(false); // 显示转换模态框
const isTransforming = ref(false); // 转换状态
const isSearching = ref(false); // 搜索状态
const enableWebSearch = ref(false); // 启用联网搜索开关
const transformResult = ref<TransformResult | null>(null); // 转换结果
const searchResult = ref<SearchResult | null>(null); // 搜索结果
const searchSteps = ref<any[]>([]); // 搜索步骤
const showSearchProcess = ref(false); // 显示搜索过程
const selectedTransformMode = ref<'dialogue' | 'professional' | 'creative' | 'analytical'>('dialogue'); // 选择的转换模式

// 转换模式配置
const transformModes = ref([
  {
    value: 'dialogue' as const,
    label: '对话优化',
    icon: '💬',
    description: '优化为更适合AI对话的表达'
  },
  {
    value: 'professional' as const,
    label: '专业表达',
    icon: '🎯',
    description: '转换为更专业、准确的术语'
  },
  {
    value: 'creative' as const,
    label: '创意增强',
    icon: '✨',
    description: '增加创意元素和想象空间'
  },
  {
    value: 'analytical' as const,
    label: '深度分析',
    icon: '🔍',
    description: '引导进行深入分析和思考'
  }
]);

// 添加滚动相关变量
const shouldAutoScroll = ref(true); // 是否应该自动滚动
const isUserScrolling = ref(false); // 用户是否正在滚动
const chatContainer = ref<HTMLElement | null>(null); // 聊天容器引用
const thinkingContainer = ref<HTMLElement | null>(null); // 思考容器引用
let scrollTimer: number | null = null; // 滚动计时器

// 获取提示词store
const promptStore = usePromptStore();

// 使用API Hooks
const {
  apiKey,
  apiUrl,
  isProcessing,
  error,
  streamProgress,
  conversationHistory,
  reasoningContent,
  isThinking,
  isLastMessageStopped, // 添加引用是否手动停止的状态
  sendChatMessage,
  streamChatMessage,
  stopGeneration // 添加引用终止生成方法
} = useDeepseekApi();

// 确保API Key从localStorage中加载
if (!apiKey.value) {
  const savedApiKey = localStorage.getItem('apiKey');
  if (savedApiKey) {
    apiKey.value = savedApiKey;
    console.log('从localStorage加载API Key成功');
  }
}

// 在组件挂载时初始化数据
onMounted(() => {
  // 设置API URL
  if (props.apiBaseUrl) {
    apiUrl.value = props.apiBaseUrl;
  }

  // 确保初始状态下滚动到底部
  nextTick(() => {
    scrollToBottom(true);
  });

  // 在组件挂载时获取热搜话题
  fetchHotTopics();

  // 只有当prompt库中有提示词时才设置输入内容
  if (promptStore.promptText) {
    userInput.value = promptStore.promptText;
    // 清除store中的提示词，避免重复使用
    promptStore.clearPromptText();
  } else if (props.initialPrompt) {
    // 如果有初始提示词，则使用它
    userInput.value = props.initialPrompt;
  }
});

// 设置示例问题的函数
function setExampleQuestion(question: string) {
  userInput.value = question;
  // 将焦点设置到输入框
  nextTick(() => {
    const inputElement = document.getElementById('message-input');
    if (inputElement) {
      inputElement.focus();
    }
  });
}

// 监听apiBaseUrl变化
watch(
  () => props.apiBaseUrl,
  (newUrl) => {
    if (newUrl) {
      apiUrl.value = newUrl;
    }
  },
  { immediate: true }
);

// 计算当前代码示例
const currentCode = computed(() => {
  if (apiStyle.value === "openai") {
    return `import DeepseekClient from './services/DeepseekClient';

// 创建客户端
const client = new DeepseekClient({
  apiKey: 'YOUR_API_KEY',
  baseURL: 'YOUR_API_ENDPOINT',
  model: 'deepseek-r1'
});

// 创建聊天完成请求
const stream = await client.chat.completions.create({
  messages: [
    { role: 'user', content: '${userInput.value}' }
  ],
  stream: ${streaming.value},
  temperature: ${temperature.value},
  max_tokens: ${maxTokens.value}
});

// 处理流式响应
for await (const chunk of stream) {
  // 处理思维链内容
  const reasoning = chunk.choices?.[0]?.delta?.reasoning_content;
  if (reasoning) console.log('思考:', reasoning);

  // 处理生成内容
  const content = chunk.choices?.[0]?.delta?.content;
  if (content) console.log('回答:', content);
}`;
  } else {
    return `import ai from './services/DeepseekAdapter';

// 创建模型
const aiModel = ai.createModel("deepseek", {
  apiKey: 'YOUR_API_KEY',
  baseURL: 'YOUR_API_ENDPOINT'
});

// ${streaming.value ? "流式" : ""}文本生成
${streaming.value
        ? `const res = await aiModel.streamText({
  model: "deepseek-r1",
  messages: [
    { role: "user", content: "${userInput.value}" }
  ],
  temperature: ${temperature.value},
  max_tokens: ${maxTokens.value}
});

// 处理流式响应
for await (const data of res.dataStream) {
  // 思维链内容
  const think = (data?.choices?.[0]?.delta)?.reasoning_content;
  if (think) console.log('思考:', think);

  // 生成文本内容
  const text = (data?.choices?.[0]?.delta)?.content;
  if (text) console.log('回答:', text);
}`
        : `const res = await aiModel.generateText({
  model: "deepseek-r1",
  messages: [
    { role: "user", content: "${userInput.value}" }
  ],
  temperature: ${temperature.value},
  max_tokens: ${maxTokens.value}
});

console.log('回答:', res.text);
console.log('思考:', res.reasoning);`
      }`;
  }
});

// 设置API风格
function setApiStyle(style: "openai" | "adapter") {
  apiStyle.value = style;
}

// 设置模型名称
function setModelName(name: string) {
  modelName.value = name;
}

// 更新当前使用的模型
function updateCurrentModel() {
  if (modelName.value) {
    // 保存模型名称到localStorage
    localStorage.setItem('modelName', modelName.value);

    // 显示成功提示
    showingModelSuccess.value = true;
    setTimeout(() => {
      showingModelSuccess.value = false;
    }, 2000);
  }
}

// 添加防抖函数工具
function debounce(fn: Function, delay = 300) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function(this: any, ...args: any[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

// 改进滚动监听处理函数
function handleScroll(event: Event) {
  const container = event.target as HTMLElement;
  const scrollOffset = container.scrollHeight - container.scrollTop - container.clientHeight;

  // 更精确地检测是否在底部（使用更小的阈值）
  const isAtBottom = scrollOffset < 50;

  // 只有当用户手动滚动且不在底部时，才禁用自动滚动
  if (!isThinking.value && !isProcessing.value) {
    shouldAutoScroll.value = isAtBottom;
  }

  // 标记用户正在滚动
  isUserScrolling.value = true;
  if (scrollTimer) clearTimeout(scrollTimer);

  // 设置滚动超时，记录滚动停止状态
  scrollTimer = setTimeout(() => {
    isUserScrolling.value = false;
  }, 1000) as unknown as number;
}

// 防抖处理的滚动到底部函数
const debouncedScrollToBottom = debounce((forceScroll = false) => {
  const container = activeTab.value === 'output' ? chatContainer.value : thinkingContainer.value;
  if (!container) return;

  // 判断是否应该滚动到底部:
  // 1. 强制滚动
  // 2. 应该自动滚动且没有用户手动滚动操作
  // 3. 正在思考或处理消息时
  const shouldScroll = forceScroll ||
                      (shouldAutoScroll.value && !isUserScrolling.value) ||
                      isThinking.value ||
                      isProcessing.value;

  if (shouldScroll) {
    // 添加平滑滚动效果
    container.style.scrollBehavior = 'smooth';

    // 计算是否已经接近底部
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;

    // 如果不在底部附近，先跳转到接近底部的位置，再平滑滚动到底部
    if (!isNearBottom) {
      container.style.scrollBehavior = 'auto';
      container.scrollTop = container.scrollHeight - container.clientHeight - 100;

      // 短暂延迟后平滑滚动到底部
      setTimeout(() => {
        container.style.scrollBehavior = 'smooth';
        container.scrollTop = container.scrollHeight;
      }, 10);
    } else {
      // 已经在底部附近，直接平滑滚动
      container.scrollTop = container.scrollHeight;
    }

    // 滚动后恢复默认滚动行为
    setTimeout(() => {
      if (container) {
        container.style.scrollBehavior = 'auto';
      }
    }, 500);
  }
}, 50); // 减少延迟时间，使滚动更加及时

// 替换原来的scrollToBottom函数
function scrollToBottom(forceScroll = false) {
  debouncedScrollToBottom(forceScroll);
}

// 清空对话确认
const clearConversation = () => {
  // 如果没有对话历史，直接返回
  if (conversationHistory.length === 0) {
    ElMessage({
      type: 'info',
      message: '当前没有对话记录'
    });
    return;
  }

  // 使用Element Plus MessageBox
  ElMessageBox.confirm(
    '此操作将删除所有对话历史、思维过程和输入内容，且不可撤销。',
    '清空所有对话',
    {
      confirmButtonText: '确定清空',
      cancelButtonText: '取消',
      type: 'warning',
      dangerouslyUseHTMLString: false
    }
  )
    .then(() => {
      // 确认清空
      conversationHistory.length = 0;
      reasoningContent.value = '';

      // 重置相关状态
      isThinking.value = false;
      isSearching.value = false;
      showSearchProcess.value = false;
      showTransformModal.value = false;
      isProcessing.value = false;
      isSending.value = false;

      // 重置用户输入
      userInput.value = '';

      // 显示成功消息
      ElMessage({
        type: 'success',
        message: '对话已清空'
      });

      console.log('对话已清空');
    })
    .catch(() => {
      // 取消清空
      ElMessage({
        type: 'info',
        message: '已取消清空操作'
      });
    });
};

// 优化监听对话历史和思维内容变化的逻辑
watch([conversationHistory, reasoningContent], async () => {
  await nextTick();

  // 如果是初始状态或内容更新且未被用户手动滚动过，强制滚动到底部
  if (conversationHistory.length <= 1 || !isUserScrolling.value) {
    debouncedScrollToBottom(true);
    return;
  }

  // 思维过程区域需要更智能的滚动
  if (activeTab.value === 'thinking' && reasoningContent.value) {
    // 对于思维过程，我们优化滚动逻辑，解决卡在底部的问题
    const container = thinkingContainer.value;
    if (container) {
      // 如果正在处理消息或思考中，强制滚动到底部
      if (isProcessing.value || isThinking.value) {
        debouncedScrollToBottom(true);
      } else {
        // 判断是否已经在底部附近
        const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;

        // 如果在底部附近或者应该自动滚动，则执行滚动
        if (isNearBottom || shouldAutoScroll.value) {
          debouncedScrollToBottom(true);
        }
      }
    }
  } else if (shouldAutoScroll.value || isProcessing.value || isThinking.value) {
    // 对于聊天内容，如果应该自动滚动或正在处理消息，则滚动到底部
    debouncedScrollToBottom(true);
  }
}, { deep: true });

// 监听标签切换，智能滚动
watch(activeTab, async () => {
  await nextTick();
  // 切换标签时总是滚动到底部
  debouncedScrollToBottom(true);
});

// 注意：原来的独立联网搜索功能已集成到sendMessage中

// 执行关键词转换
async function performTransform() {
  if (!userInput.value.trim() || isTransforming.value) return;

  // 检查必要的配置
  if (!apiKey.value || !apiUrl.value) {
    console.error('转换失败: API Key 或 API URL 未配置');
    alert('请先配置 API Key 和 API URL');
    return;
  }

  isTransforming.value = true;
  try {
    console.log('开始关键词转换:', {
      query: userInput.value,
      mode: selectedTransformMode.value,
      apiUrl: apiUrl.value,
      model: modelName.value
    });

    const result = await keywordTransformService.transformKeywords(userInput.value, {
      mode: selectedTransformMode.value,
      apiKey: apiKey.value,
      apiUrl: apiUrl.value,
      model: modelName.value
    });

    transformResult.value = result;
    console.log('关键词转换完成:', result);
  } catch (error: any) {
    console.error('转换失败:', error);

    // 提供更详细的错误信息
    let errorMessage = '关键词转换失败: ';
    if (error.message) {
      errorMessage += error.message;
    } else if (error.response?.data?.error?.message) {
      errorMessage += error.response.data.error.message;
    } else {
      errorMessage += '未知错误';
    }

    alert(errorMessage);
  } finally {
    isTransforming.value = false;
  }
}

// 应用转换结果
function applyTransform() {
  if (transformResult.value) {
    userInput.value = transformResult.value.transformedText;
    showTransformModal.value = false;
    transformResult.value = null;

    // 将焦点设置到输入框
    nextTick(() => {
      const inputElement = document.getElementById('message-input');
      if (inputElement) {
        inputElement.focus();
      }
    });
  }
}

// 发送消息
async function sendMessage() {
  // 如果已经在发送中，直接返回
  if (isSending.value || isSearching.value) {
    console.log("已经在发送或搜索过程中，忽略此次点击");
    return;
  }

  // 设置发送状态为true
  isSending.value = true;

  try {
    // 确保输入不为空
    if (!userInput.value.trim()) {
      return;
    }

    // 如果没有API Key，临时设置一个默认值
    if (!apiKey.value) {
      apiKey.value = "temp_key_for_testing";
      console.log("使用临时API Key");
    }

    // 保存用户输入
    let input = userInput.value;

    // 如果启用了联网搜索，先进行搜索增强
    if (enableWebSearch.value && apiKey.value && apiUrl.value) {
      console.log('🔍 启用联网搜索，开始真实网络搜索...');
      isSearching.value = true;
      showSearchProcess.value = true;
      searchSteps.value = [];

      try {
        const result = await webSearchService.searchAndEnhance(input, {
          apiKey: apiKey.value,
          apiUrl: apiUrl.value,
          model: modelName.value,
          maxResults: 5
        }, (steps) => {
          // 实时更新搜索步骤
          searchSteps.value = [...steps];
        });

        searchResult.value = result;

        // 使用增强后的查询
        if (result.enhancedQuery && result.enhancedQuery.length > input.length) {
          console.log('✅ 联网搜索增强完成，使用增强查询');
          input = result.enhancedQuery;

          // 在对话历史中添加详细的搜索说明
          const searchInfo = `🔍 **联网搜索增强完成**

**原始查询：** ${userInput.value}

**搜索结果：** 找到 ${result.searchResults.length} 个相关结果
${result.searchResults.map((item, index) =>
  `${index + 1}. [${item.title}](${item.url}) - ${item.source}`
).join('\n')}

**搜索摘要：** ${result.searchSummary}

**增强查询：** ${result.enhancedQuery}

**相关建议：** ${result.suggestions.join('、')}`;

          conversationHistory.push({
            role: 'system',
            content: searchInfo
          });
        }
      } catch (searchError: any) {
        console.error('联网搜索失败，停止发送:', searchError.message);

        // 添加搜索失败说明
        conversationHistory.push({
          role: 'system',
          content: `❌ 联网搜索失败：${searchError.message}\n\n请检查网络连接或稍后重试。`
        });

        // 搜索失败时直接返回，不继续发送消息
        return;
      } finally {
        isSearching.value = false;
        // 保持搜索过程显示3秒后自动隐藏
        setTimeout(() => {
          showSearchProcess.value = false;
        }, 3000);
      }
    }

    // 设置活动标签为输出
    activeTab.value = "output";

    // 清除旧的思维内容
    reasoningContent.value = "";

    // 清空输入框
    userInput.value = "";

    // 自动滚动到最新内容
    await nextTick();
    scrollToBottom();

    // 根据是否流式处理选择不同的发送方法
    if (streaming.value) {
      isThinking.value = true;
      await streamChatMessage(input, {
        onContent: (_: string) => {
          // 内容更新后滚动到底部
          nextTick(() => {
            scrollToBottom();
          });
        },
        onReasoning: (content: string) => {
          // 判断是否有思维内容，如果有则设置活动标签
          if (content && !reasoningContent.value) {
            // 不再自动切换到thinking标签
            // activeTab.value = "thinking";
          }
        },
        onError: (error: any) => {
          console.error("流式请求出错:", error);
        },
        onComplete: () => {
          isThinking.value = false;
        }
      }, {
        temperature: temperature.value,
        maxTokens: maxTokens.value,
        model: modelName.value
      });
    } else {
      await sendChatMessage(input, {
        temperature: temperature.value,
        maxTokens: maxTokens.value,
        model: modelName.value
      });
    }

    // 自动滚动到最新内容
    await nextTick();
    scrollToBottom();
  } catch (err) {
    console.error("发送消息时出错:", err);
  } finally {
    // 完成后重置发送状态
    isSending.value = false;
  }
}

// 格式化文本（使用 markdown-it 处理 Markdown）
function formatText(text: string) {
  if (!text) return '';

  // 为确保代码块正确渲染，先处理特殊字符
  let processedText = text
    // 确保代码块中的反引号被正确处理
    .replace(/```([a-z]*)\n([\s\S]*?)```/g, (_, lang, code) => {
      // 替换代码中可能导致HTML解析问题的字符
      const safeCode = code
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      return `\`\`\`${lang}\n${safeCode}\`\`\``;
    });

  // 渲染markdown
  const rendered = md.render(processedText);

  // 确保代码块具有正确的样式和类名
  return rendered
    // 改进代码块的CSS类
    .replace(/<pre class="hljs/g, '<pre class="hljs code-block')
    // 添加行号和复制按钮等增强功能
    .replace(/<pre class="hljs code-block([^>]*)><code>/g,
      '<pre class="hljs code-block$1"><div class="code-header"><span class="language-badge">$1</span></div><code>');
}

// 在script setup部分添加复制相关的代码
const copySuccess = ref(false);

// 复制消息内容
async function copyMessage(text: string) {
  try {
    // 移除HTML标签，只复制纯文本
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = formatText(text);
    const plainText = tempDiv.textContent || tempDiv.innerText || '';

    await navigator.clipboard.writeText(plainText);
    copySuccess.value = true;

    // 3秒后重置复制状态
    setTimeout(() => {
      copySuccess.value = false;
    }, 3000);
  } catch (err) {
    console.error('复制失败:', err);
  }
}

// 获取热搜话题
async function fetchHotTopics() {
  try {
    isLoadingHotTopics.value = true;
    // 使用公开的第三方API，此API仅供示例，实际使用时可能需要替换
    const response = await axios.get('https://api.vvhan.com/api/hotlist/all');
    if (response.data && response.data.data) {
      // 查找热门平台数据，例如微博或知乎
      const platforms = ['微博', '知乎热榜', '百度热点'];
      let hotPlatform = null;

      // 寻找第一个匹配的平台
      for (const platform of platforms) {
        hotPlatform = response.data.data.find((item: any) => item.name === platform);
        if (hotPlatform && hotPlatform.data && Array.isArray(hotPlatform.data)) {
          break;
        }
      }

      if (hotPlatform && hotPlatform.data && Array.isArray(hotPlatform.data)) {
        // 从平台数据中提取前6个热点话题
        hotTopics.value = hotPlatform.data.slice(0, 6).map((item: any) => {
          // 根据实际数据结构提取标题 - 可能是title, content或其他字段
          return item.title || item.content || item.desc || item.text || '热门话题';
        });
      } else {
        // 如果找不到任何平台数据，使用默认话题
        useDefaultTopics();
      }
    } else {
      // API返回格式不符合预期，使用默认话题
      useDefaultTopics();
    }
  } catch (error) {
    console.error('获取热搜话题失败:', error);
    // 提供一些默认话题
    useDefaultTopics();
  } finally {
    isLoadingHotTopics.value = false;
  }
}

// 辅助函数：使用默认热门话题
function useDefaultTopics() {
  hotTopics.value = [
    "人工智能最新应用",
    "如何提高工作效率",
    "可再生能源的发展",
    "健康生活方式建议",
    "深度学习算法解析",
    "元宇宙未来展望"
  ];
}

// 随机化热门话题数组顺序
function randomizeHotTopics() {
  // 使用Fisher-Yates洗牌算法随机排序数组
  const array = [...hotTopics.value];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  hotTopics.value = array;
}

// 刷新热门话题：可以获取新话题或随机排序当前话题
async function refreshHotTopics() {
  if (Math.random() > 0.5) {
    // 50%概率重新获取话题
    await fetchHotTopics();
  } else {
    // 50%概率随机排序当前话题
    randomizeHotTopics();
  }
}


</script>

<style scoped>
/* Markdown 优化样式 - 高级简约风格 */
:deep(.markdown-body) {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.7;
  word-wrap: break-word;
  color: #24292e;
  max-width: 100%;
}

:deep(.markdown-body h1),
:deep(.markdown-body h2),
:deep(.markdown-body h3),
:deep(.markdown-body h4),
:deep(.markdown-body h5),
:deep(.markdown-body h6) {
  margin-top: 28px;
  margin-bottom: 18px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: #1a202c;
}

:deep(.markdown-body h1) {
  font-size: 1.9em;
  padding-bottom: 0.3em;
  border-bottom: 1px solid #edf2f7;
}

:deep(.markdown-body h2) {
  font-size: 1.5em;
  padding-bottom: 0.3em;
  border-bottom: 1px solid #edf2f7;
}

:deep(.markdown-body h3) {
  font-size: 1.25em;
}

:deep(.markdown-body h4) {
  font-size: 1em;
}

:deep(.markdown-body h5) {
  font-size: 0.875em;
}

:deep(.markdown-body h6) {
  font-size: 0.85em;
  color: #4a5568;
}

:deep(.markdown-body p) {
  margin-top: 0;
  margin-bottom: 18px;
}

:deep(.markdown-body ul),
:deep(.markdown-body ol) {
  padding-left: 2em;
  margin-top: 0;
  margin-bottom: 18px;
}

:deep(.markdown-body ul) {
  list-style-type: disc;
}

:deep(.markdown-body ol) {
  list-style-type: decimal;
}

:deep(.markdown-body li) {
  margin-top: 0.35em;
  margin-bottom: 0.35em;
}

:deep(.markdown-body blockquote) {
  padding: 0.75em 1em;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 18px;
  color: #4a5568;
  background-color: #f8fafc;
  border-left: 4px solid #e2e8f0;
  border-radius: 0 4px 4px 0;
}

:deep(.markdown-body pre) {
  margin-top: 0;
  margin-bottom: 18px;
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.5;
  background-color: #f8fafc;
  border-radius: 6px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

:deep(.markdown-body code) {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(226, 232, 240, 0.5);
  border-radius: 4px;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
}

:deep(.markdown-body pre code) {
  padding: 0;
  margin: 0;
  font-size: 100%;
  word-break: normal;
  white-space: pre;
  background: transparent;
  border: 0;
}

:deep(.markdown-body table) {
  border-spacing: 0;
  border-collapse: collapse;
  margin-top: 0;
  margin-bottom: 18px;
  width: 100%;
  overflow: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
}

:deep(.markdown-body table th) {
  font-weight: 600;
  padding: 8px 14px;
  border: 1px solid #e2e8f0;
  background-color: #f8fafc;
}

:deep(.markdown-body table td) {
  padding: 8px 14px;
  border: 1px solid #e2e8f0;
}

:deep(.markdown-body table tr) {
  background-color: #fff;
  border-top: 1px solid #e2e8f0;
  transition: background-color 0.2s ease;
}

:deep(.markdown-body table tr:nth-child(2n)) {
  background-color: #f8fafc;
}

:deep(.markdown-body table tr:hover) {
  background-color: #f1f5f9;
}

:deep(.markdown-body img) {
  max-width: 100%;
  box-sizing: content-box;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

:deep(.markdown-body a) {
  color: #4299e1;
  text-decoration: none;
  transition: color 0.2s ease;
}

:deep(.markdown-body a:hover) {
  color: #3182ce;
  text-decoration: underline;
}

:deep(.markdown-body hr) {
  height: 1px;
  padding: 0;
  margin: 24px 0;
  background-color: #e2e8f0;
  border: 0;
}

:deep(.hljs) {
  background: #f8fafc !important;
  color: #2d3748 !important;
  border-radius: 6px;
}

/* 聊天界面样式 - 现代高级风格 */
.chat-container {
  padding: 1.75rem;
  overflow-y: auto;
  height: 100%;
  scrollbar-width: thin;
  scrollbar-color: rgba(203, 213, 225, 0.5) transparent;
}

.chat-container::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.chat-container::-webkit-scrollbar-track {
  background: transparent;
}

.chat-container::-webkit-scrollbar-thumb {
  background-color: rgba(203, 213, 225, 0.5);
  border-radius: 6px;
}

/* 用户消息气泡样式 */
div[v-for="(item, index) in conversationHistory"] div:nth-child(1) div:nth-child(2).rounded-2xl.shadow-sm {
  background: linear-gradient(135deg, #9333ea, #7e22ce) !important;
  color: white !important;
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.15) !important;
  border-top-right-radius: 4px !important;
}

/* 用户消息文本颜色 */
div[v-for="(item, index) in conversationHistory"] div:nth-child(1) div:nth-child(2) div.text-gray-800 {
  color: rgba(255, 255, 255, 0.95) !important;
}

/* 用户角色文本 */
div[v-for="(item, index) in conversationHistory"] div:nth-child(1) div:nth-child(2) div.text-purple-700 {
  color: rgba(255, 255, 255, 0.85) !important;
}

/* AI消息气泡样式 */
div[v-for="(item, index) in conversationHistory"] div:nth-child(1) div:nth-child(2).rounded-2xl.shadow-sm:not([class*="from-purple"]) {
  background: white !important;
  border: 1px solid #e5e7eb !important;
  box-shadow: 0 4px 12px rgba(148, 163, 184, 0.1) !important;
  border-top-left-radius: 4px !important;
}

/* 用户头像背景 */
div.w-10.h-10.rounded-full.flex.items-center.justify-center.flex-shrink-0.text-xl.bg-gradient-to-r.from-purple-400.to-purple-600 {
  background: linear-gradient(135deg, #9333ea, #7e22ce) !important;
  box-shadow: 0 3px 8px rgba(124, 58, 237, 0.25) !important;
}

/* AI头像背景 */
div.w-10.h-10.rounded-full.flex.items-center.justify-center.flex-shrink-0.text-xl.bg-gradient-to-r.from-blue-400.to-blue-600 {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
  box-shadow: 0 3px 8px rgba(37, 99, 235, 0.25) !important;
}

/* 思维过程样式优化 */
.thinking-process {
  background: linear-gradient(to bottom right, rgb(248 250 252), rgb(255 255 255));
}

.thinking-process :deep(.prose) {
  line-height: 1.625;
}

.thinking-process :deep(.prose p) {
  color: rgb(75 85 99);
  margin-bottom: 1rem;
}

.thinking-process :deep(.prose ul),
.thinking-process :deep(.prose ol) {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.thinking-process :deep(.prose li) {
  color: rgb(75 85 99);
}

.thinking-process :deep(.prose strong) {
  color: rgb(17 24 39);
  font-weight: 600;
}

.thinking-process :deep(.prose blockquote) {
  border-left: 4px solid rgb(196 181 253);
  background-color: rgb(245 243 255 / 0.5);
  color: rgb(55 65 81);
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  border-radius: 0 0.5rem 0.5rem 0;
}

.thinking-process :deep(.prose code) {
  background-color: rgb(243 244 246);
  color: rgb(31 41 55);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.thinking-process :deep(.prose pre) {
  background-color: rgb(17 24 39);
  color: rgb(243 244 246);
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  margin: 1rem 0;
}

.thinking-process :deep(.prose h3) {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(17 24 39);
  margin-bottom: 0.75rem;
  margin-top: 1.5rem;
}

.thinking-process :deep(.prose h4) {
  font-size: 1rem;
  font-weight: 600;
  color: rgb(31 41 55);
  margin-bottom: 0.5rem;
  margin-top: 1rem;
}

/* 动画效果 */
@keyframes thinking {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.animate-thinking {
  animation: thinking 2s ease-in-out infinite;
}

/* 代码块增强样式 */
:deep(.code-block) {
  margin: 1.25rem 0;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

:deep(.code-header) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #0d1117;
  color: #c9d1d9;
  font-family: monospace;
  font-size: 0.8rem;
  border-bottom: 1px solid #30363d;
}

:deep(.language-badge) {
  display: inline-block;
  padding: 0.1rem 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  color: #e6edf3;
  text-transform: lowercase;
}

:deep(.hljs) {
  background: #0d1117 !important;
  color: #c9d1d9 !important;
  padding: 1rem !important;
  border-radius: 0 !important;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace !important;
  font-size: 0.9rem !important;
  line-height: 1.5 !important;
  tab-size: 2;
}

:deep(.hljs-keyword),
:deep(.hljs-built_in),
:deep(.hljs-type) {
  color: #ff7b72 !important;
}

:deep(.hljs-string),
:deep(.hljs-regexp) {
  color: #a5d6ff !important;
}

:deep(.hljs-title),
:deep(.hljs-attr),
:deep(.hljs-selector-id),
:deep(.hljs-selector-class) {
  color: #d2a8ff !important;
}

:deep(.hljs-comment),
:deep(.hljs-quote) {
  color: #8b949e !important;
  font-style: italic;
}

:deep(.hljs-doctag),
:deep(.hljs-meta),
:deep(.hljs-meta-keyword) {
  color: #ff7b72 !important;
}

:deep(.hljs-variable),
:deep(.hljs-template-variable) {
  color: #ffa657 !important;
}

/* 修复代码块内行高和边距 */
:deep(.markdown-body pre code) {
  white-space: pre;
  tab-size: 2;
  font-size: 0.9rem;
  line-height: 1.6;
}

/* 聊天消息中的代码块调整 */
.prose :deep(.code-block) {
  margin: 0.75rem 0;
}

/* 思考状态提示框动画 */
@keyframes pulse-soft {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.animate-pulse {
  animation: pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* 打字指示器球体动画优化 */
@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

.animate-bounce {
  animation: bounce-subtle 1.2s infinite;
}

/* 消息转场动画 */
.chat-container > div {
  transition: all 0.3s ease;
}

/* 点击反馈效果 */
button,
.cursor-pointer {
  transition: transform 0.1s ease;
}

button:active,
.cursor-pointer:active {
  transform: scale(0.98);
}

/* 思考状态指示器的闪烁效果 */
@keyframes glow {
  0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
  50% { box-shadow: 0 0 15px rgba(59, 130, 246, 0.8); }
}

.thinking-indicator {
  animation: glow 1.5s ease-in-out infinite;
}


</style>



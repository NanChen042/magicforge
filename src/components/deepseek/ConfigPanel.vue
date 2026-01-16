<template>
  <div class="bg-white rounded-xl shadow-md border border-gray-100 p-4 md:p-6 lg:w-full order-2 lg:order-1 overflow-y-auto h-full">
    <!-- 头部 -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-3">
        <div class="bg-zinc-100 p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h2 class="text-lg font-semibold text-gray-800">系统配置</h2>
      </div>
      
      <!-- API 设置按钮 -->
      <button
        @click="showSettingsDialog = true"
        class="p-2 rounded-lg bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 transition-all duration-200 cursor-pointer"
        title="API 设置"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      </button>
    </div>

    <!-- 当前模型信息卡片 - 高级黑渐变 -->
    <div class="mb-6 p-4 bg-linear-to-br from-zinc-900 to-zinc-700 rounded-xl shadow-lg shadow-zinc-900/25 ring-1 ring-zinc-700/50">
      <div class="flex items-center gap-3">
        <span class="text-2xl">{{ getModelIcon(currentModelConfig?.type || 'chat') }}</span>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-semibold text-white truncate">{{ currentModelConfig?.name || modelName }}</span>
            <span 
              class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full"
              :class="getModelTypeBadgeClass(currentModelConfig?.type || 'chat')"
            >
              {{ getModelTypeLabel(currentModelConfig?.type || 'chat') }}
            </span>
            <span v-if="currentModelConfig?.free" class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-emerald-500/20 text-emerald-300">
              免费
            </span>
          </div>
          <p class="text-xs text-zinc-400 mt-1 truncate">{{ currentModelConfig?.description || '自定义模型' }}</p>
        </div>
      </div>
    </div>

    <!-- 模型选择区域 -->
    <div class="mb-6">
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">选择模型</span>
        <button 
          @click="showCustomModel = !showCustomModel"
          class="text-xs text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
        >
          {{ showCustomModel ? '收起' : '自定义' }}
        </button>
      </div>

      <!-- 自定义模型输入 -->
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="showCustomModel" class="mb-4">
          <div class="relative">
            <input
              type="text"
              :value="modelName"
              @input="$emit('update:modelName', ($event.target as HTMLInputElement).value)"
              placeholder="输入模型 ID，如: vendor/model-name"
              class="peer w-full pl-4 pr-10 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-mono text-zinc-900 placeholder:text-zinc-300 focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 focus:outline-none transition-all duration-200 hover:bg-white hover:border-zinc-300 shadow-sm"
            />
            <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 peer-focus:text-zinc-900 transition-colors duration-200 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </span>
          </div>
        </div>
      </Transition>

      <!-- 模型卡片列表 - 高级黑选中效果 -->
      <div class="space-y-2">
        <div
          v-for="model in modelConfigs"
          :key="model.id"
          @click="selectModel(model.id)"
          class="group relative p-3 rounded-xl border cursor-pointer transition-all duration-200"
          :class="modelName === model.id
            ? 'bg-gradient-to-r from-zinc-900 to-zinc-700 border-zinc-700 shadow-lg shadow-zinc-900/20 ring-1 ring-zinc-600/50'
            : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-sm'"
        >
          <div class="flex items-center gap-3">
            <span class="text-xl">{{ getModelIcon(model.type) }}</span>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span 
                  class="text-sm font-medium truncate flex-1"
                  :class="modelName === model.id ? 'text-white' : 'text-zinc-900'"
                >{{ model.name }}</span>
                <span 
                  class="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded"
                  :class="modelName === model.id 
                    ? getModelTypeBadgeClassSelected(model.type)
                    : getModelTypeBadgeClassNormal(model.type)"
                >{{ getModelTypeShortLabel(model.type) }}</span>
              </div>
              <p 
                class="text-xs truncate mt-0.5"
                :class="modelName === model.id ? 'text-zinc-400' : 'text-zinc-500'"
              >{{ model.description }}</p>
            </div>
            <div 
              class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200"
              :class="modelName === model.id ? 'border-white bg-white' : 'border-zinc-300 group-hover:border-zinc-400'"
            >
              <svg v-if="modelName === model.id" class="w-3 h-3 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 参数控制区域 -->
    <div class="pt-6 border-t border-zinc-100">
      <span class="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 pl-1">参数设置</span>
      
      <div class="space-y-5">
        <!-- 流式输出 - 高级黑开关样式 -->
        <div class="flex items-center justify-between">
          <div>
            <span class="text-sm font-medium text-zinc-700">流式输出</span>
            <p class="text-xs text-zinc-400">打字机效果逐字输出</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              :checked="streaming"
              @change="$emit('update:streaming', ($event.target as HTMLInputElement).checked)"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zinc-900"></div>
          </label>
        </div>

        <!-- 创意度 -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-zinc-700">创意度</span>
            <span class="text-xs font-mono text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">{{ temperature.toFixed(1) }}</span>
          </div>
          <input
            type="range"
            :value="temperature"
            @input="$emit('update:temperature', parseFloat(($event.target as HTMLInputElement).value))"
            min="0"
            max="1"
            step="0.1"
            class="w-full h-2 bg-zinc-200 rounded-full appearance-none cursor-pointer slider-thumb"
          />
          <div class="flex justify-between text-xs text-zinc-400 mt-1">
            <span>精确</span>
            <span>创意</span>
          </div>
        </div>

        <!-- 最大长度 -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-zinc-700">最大长度</span>
            <span class="text-xs font-mono text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">{{ maxTokens }}</span>
          </div>
          <input
            type="range"
            :value="maxTokens"
            @input="$emit('update:maxTokens', parseInt(($event.target as HTMLInputElement).value))"
            min="500"
            max="4000"
            step="500"
            class="w-full h-2 bg-zinc-200 rounded-full appearance-none cursor-pointer slider-thumb"
          />
          <div class="flex justify-between text-xs text-zinc-400 mt-1">
            <span>简短</span>
            <span>详细</span>
          </div>
        </div>

        <!-- 高级参数折叠区 -->
        <el-collapse v-model="showAdvancedParams" class="advanced-params-collapse">
          <el-collapse-item name="advanced">
            <template #title>
              <div class="flex items-center gap-2 text-sm font-medium text-zinc-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                高级参数
              </div>
            </template>
            
            <div class="space-y-5 pt-2">
              <!-- Top-P (核采样) -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-1">
                    <span class="text-sm font-medium text-zinc-700">Top-P</span>
                    <el-tooltip content="核采样：只从累积概率达到P的词中采样" placement="top">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-zinc-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </el-tooltip>
                  </div>
                  <span class="text-xs font-mono text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">{{ topP.toFixed(2) }}</span>
                </div>
                <input
                  type="range"
                  :value="topP"
                  @input="$emit('update:topP', parseFloat(($event.target as HTMLInputElement).value))"
                  min="0"
                  max="1"
                  step="0.05"
                  class="w-full h-2 bg-zinc-200 rounded-full appearance-none cursor-pointer slider-thumb"
                />
                <div class="flex justify-between text-xs text-zinc-400 mt-1">
                  <span>精确</span>
                  <span>多样</span>
                </div>
              </div>

              <!-- Top-K -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-1">
                    <span class="text-sm font-medium text-zinc-700">Top-K</span>
                    <el-tooltip content="从概率最高的K个词中采样，0表示不限制" placement="top">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-zinc-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </el-tooltip>
                  </div>
                  <span class="text-xs font-mono text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">{{ topK }}</span>
                </div>
                <input
                  type="range"
                  :value="topK"
                  @input="$emit('update:topK', parseInt(($event.target as HTMLInputElement).value))"
                  min="0"
                  max="100"
                  step="5"
                  class="w-full h-2 bg-zinc-200 rounded-full appearance-none cursor-pointer slider-thumb"
                />
                <div class="flex justify-between text-xs text-zinc-400 mt-1">
                  <span>不限</span>
                  <span>限制</span>
                </div>
              </div>

              <!-- 频率惩罚 -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-1">
                    <span class="text-sm font-medium text-zinc-700">频率惩罚</span>
                    <el-tooltip content="降低重复词的出现概率，正值减少重复" placement="top">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-zinc-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </el-tooltip>
                  </div>
                  <span class="text-xs font-mono text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">{{ frequencyPenalty.toFixed(1) }}</span>
                </div>
                <input
                  type="range"
                  :value="frequencyPenalty"
                  @input="$emit('update:frequencyPenalty', parseFloat(($event.target as HTMLInputElement).value))"
                  min="-2"
                  max="2"
                  step="0.1"
                  class="w-full h-2 bg-zinc-200 rounded-full appearance-none cursor-pointer slider-thumb"
                />
                <div class="flex justify-between text-xs text-zinc-400 mt-1">
                  <span>允许重复</span>
                  <span>避免重复</span>
                </div>
              </div>

              <!-- 存在惩罚 -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-1">
                    <span class="text-sm font-medium text-zinc-700">存在惩罚</span>
                    <el-tooltip content="鼓励模型讨论新话题，正值增加多样性" placement="top">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-zinc-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </el-tooltip>
                  </div>
                  <span class="text-xs font-mono text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">{{ presencePenalty.toFixed(1) }}</span>
                </div>
                <input
                  type="range"
                  :value="presencePenalty"
                  @input="$emit('update:presencePenalty', parseFloat(($event.target as HTMLInputElement).value))"
                  min="-2"
                  max="2"
                  step="0.1"
                  class="w-full h-2 bg-zinc-200 rounded-full appearance-none cursor-pointer slider-thumb"
                />
                <div class="flex justify-between text-xs text-zinc-400 mt-1">
                  <span>聚焦话题</span>
                  <span>探索新话题</span>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>

    <!-- API 设置弹窗 -->
    <el-dialog
      v-model="showSettingsDialog"
      title="API 设置"
      width="480px"
      :close-on-click-modal="true"
      destroy-on-close
      class="api-settings-dialog"
    >
      <div class="space-y-6">
        <!-- API 密钥 -->
        <div class="group">
          <label class="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 pl-1">
            API Secret Key
          </label>
          <div class="relative">
            <input
              type="password"
              :value="apiKey"
              @input="$emit('update:apiKey', ($event.target as HTMLInputElement).value)"
              placeholder="sk-..."
              class="peer w-full pl-4 pr-10 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-mono text-zinc-900 placeholder:text-zinc-300 focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 focus:outline-none transition-all duration-200 hover:bg-white hover:border-zinc-300 shadow-sm"
            />
            <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 peer-focus:text-zinc-900 transition-colors duration-200 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </span>
          </div>
          <p class="text-xs text-zinc-400 mt-2 pl-1">
            前往 <a href="https://cloud.siliconflow.cn/account/ak" target="_blank" class="text-zinc-600 hover:text-zinc-900 underline cursor-pointer">SiliconFlow</a> 获取 API 密钥
          </p>
        </div>

        <!-- 接口地址 -->
        <div class="group">
          <label class="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 pl-1">
            Endpoint URL
          </label>
          <div class="relative">
            <input
              type="text"
              :value="apiUrl"
              @input="$emit('update:apiUrl', ($event.target as HTMLInputElement).value)"
              placeholder="https://api.siliconflow.cn/v1"
              class="peer w-full pl-4 pr-10 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-mono text-zinc-900 placeholder:text-zinc-300 focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 focus:outline-none transition-all duration-200 hover:bg-white hover:border-zinc-300 shadow-sm"
            />
            <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 peer-focus:text-zinc-900 transition-colors duration-200 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </span>
          </div>
        </div>

        <!-- 接口风格 -->
        <div>
          <span class="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 pl-1">
            Interface Style
          </span>
          <div class="grid grid-cols-2 gap-3">
            <div
              @click="$emit('update:apiStyle', 'openai')"
              class="group relative p-4 rounded-xl border cursor-pointer transition-all duration-200"
              :class="apiStyle === 'openai'
                ? 'bg-gradient-to-r from-zinc-900 to-zinc-700 border-zinc-700 shadow-lg ring-1 ring-zinc-600/50'
                : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'"
            >
              <div class="flex items-center gap-3">
                <div
                  class="p-2 rounded-lg transition-colors duration-200"
                  :class="apiStyle === 'openai' ? 'bg-white/10 text-white' : 'bg-zinc-100 text-zinc-500'"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 
                    class="text-sm font-bold font-mono"
                    :class="apiStyle === 'openai' ? 'text-white' : 'text-zinc-900'"
                  >OpenAI</h3>
                  <p 
                    class="text-[10px]"
                    :class="apiStyle === 'openai' ? 'text-zinc-400' : 'text-zinc-500'"
                  >标准接口</p>
                </div>
              </div>
            </div>

            <div
              @click="$emit('update:apiStyle', 'adapter')"
              class="group relative p-4 rounded-xl border cursor-pointer transition-all duration-200"
              :class="apiStyle === 'adapter'
                ? 'bg-gradient-to-r from-zinc-900 to-zinc-700 border-zinc-700 shadow-lg ring-1 ring-zinc-600/50'
                : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'"
            >
              <div class="flex items-center gap-3">
                <div
                  class="p-2 rounded-lg transition-colors duration-200"
                  :class="apiStyle === 'adapter' ? 'bg-white/10 text-white' : 'bg-zinc-100 text-zinc-500'"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h3 
                    class="text-sm font-bold font-mono"
                    :class="apiStyle === 'adapter' ? 'text-white' : 'text-zinc-900'"
                  >Adapter</h3>
                  <p 
                    class="text-[10px]"
                    :class="apiStyle === 'adapter' ? 'text-zinc-400' : 'text-zinc-500'"
                  >适配器模式</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <button
            @click="showSettingsDialog = false"
            class="px-4 py-2 text-sm font-medium text-zinc-600 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            取消
          </button>
          <button
            @click="showSettingsDialog = false"
            class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-br from-zinc-900 to-zinc-700 rounded-lg hover:from-zinc-800 hover:to-zinc-600 transition-all shadow-lg shadow-zinc-900/25 ring-1 ring-zinc-700/50 cursor-pointer"
          >
            确定
          </button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
  MODEL_CONFIGS, 
  getModelConfig, 
  type ModelType 
} from '@/constants/modelConfig';

const props = defineProps<{
  apiKey: string;
  apiUrl: string;
  modelName: string;
  apiStyle: 'openai' | 'adapter';
  streaming: boolean;
  temperature: number;
  maxTokens: number;
  topP: number;
  topK: number;
  frequencyPenalty: number;
  presencePenalty: number;
}>();

const emit = defineEmits<{
  'update:apiKey': [value: string];
  'update:apiUrl': [value: string];
  'update:modelName': [value: string];
  'update:apiStyle': [value: 'openai' | 'adapter'];
  'update:streaming': [value: boolean];
  'update:temperature': [value: number];
  'update:maxTokens': [value: number];
  'update:topP': [value: number];
  'update:topK': [value: number];
  'update:frequencyPenalty': [value: number];
  'update:presencePenalty': [value: number];
}>();

const showSettingsDialog = ref(false);
const showCustomModel = ref(false);
const showAdvancedParams = ref<string[]>([]);
const modelConfigs = MODEL_CONFIGS;

// 当前模型配置
const currentModelConfig = computed(() => getModelConfig(props.modelName));

// 选择模型
const selectModel = (modelId: string) => {
  emit('update:modelName', modelId);
};

// 获取模型图标
const getModelIcon = (type: ModelType): string => {
  const icons: Record<ModelType, string> = {
    chat: '💬',
    reasoning: '🧠',
    multimodal: '👁️',
    ocr: '📄',
    translate: '🌐',
    coder: '💻'
  };
  return icons[type];
};

// 获取模型类型标签
const getModelTypeLabel = (type: ModelType): string => {
  const labels: Record<ModelType, string> = {
    chat: '对话',
    reasoning: '思考',
    multimodal: '多模态',
    ocr: 'OCR',
    translate: '翻译',
    coder: '代码'
  };
  return labels[type];
};

// 获取模型类型短标签
const getModelTypeShortLabel = (type: ModelType): string => {
  const labels: Record<ModelType, string> = {
    chat: '对话',
    reasoning: '思考',
    multimodal: '视觉',
    ocr: 'OCR',
    translate: '翻译',
    coder: '代码'
  };
  return labels[type];
};

// 当前模型信息卡片的徽章样式
const getModelTypeBadgeClass = (type: ModelType): string => {
  const classes: Record<ModelType, string> = {
    chat: 'bg-blue-400/20 text-blue-300',
    reasoning: 'bg-amber-400/20 text-amber-300',
    multimodal: 'bg-violet-400/20 text-violet-300',
    ocr: 'bg-orange-400/20 text-orange-300',
    translate: 'bg-cyan-400/20 text-cyan-300',
    coder: 'bg-pink-400/20 text-pink-300'
  };
  return classes[type];
};

// 选中状态的徽章样式
const getModelTypeBadgeClassSelected = (type: ModelType): string => {
  const classes: Record<ModelType, string> = {
    chat: 'bg-blue-400/30 text-blue-200',
    reasoning: 'bg-amber-400/30 text-amber-200',
    multimodal: 'bg-violet-400/30 text-violet-200',
    ocr: 'bg-orange-400/30 text-orange-200',
    translate: 'bg-cyan-400/30 text-cyan-200',
    coder: 'bg-pink-400/30 text-pink-200'
  };
  return classes[type];
};

// 普通状态的徽章样式
const getModelTypeBadgeClassNormal = (type: ModelType): string => {
  const classes: Record<ModelType, string> = {
    chat: 'bg-blue-50 text-blue-600',
    reasoning: 'bg-amber-50 text-amber-600',
    multimodal: 'bg-violet-50 text-violet-600',
    ocr: 'bg-orange-50 text-orange-600',
    translate: 'bg-cyan-50 text-cyan-600',
    coder: 'bg-pink-50 text-pink-600'
  };
  return classes[type];
};
</script>

<style scoped>
/* 自定义滑块样式 - 高级黑 */
.slider-thumb::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(135deg, #18181b, #3f3f46);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.slider-thumb::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
}

.slider-thumb::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(135deg, #18181b, #3f3f46);
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
}

/* 确保所有可点击元素有手型光标 */
button, 
[role="button"],
.cursor-pointer {
  cursor: pointer;
}

/* 高级参数折叠区样式 */
.advanced-params-collapse {
  border: none;
  --el-collapse-header-bg-color: transparent;
  --el-collapse-content-bg-color: transparent;
}

.advanced-params-collapse :deep(.el-collapse-item__header) {
  height: auto;
  padding: 12px 0;
  border: none;
  background: transparent;
}

.advanced-params-collapse :deep(.el-collapse-item__wrap) {
  border: none;
  background: transparent;
}

.advanced-params-collapse :deep(.el-collapse-item__content) {
  padding: 0;
}

.advanced-params-collapse :deep(.el-collapse-item__arrow) {
  color: #71717a;
}
</style>

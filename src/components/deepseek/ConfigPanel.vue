<template>
  <div class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100/80 p-5 md:p-7 lg:w-full order-2 lg:order-1 overflow-y-auto h-full">    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center space-x-3">
        <div class="bg-zinc-900 p-2.5 rounded-xl shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-zinc-900 tracking-tight">系统配置</h2>
      </div>
      
      <button
        @click="showSettingsDialog = true"
        class="p-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-500 hover:border-zinc-900 hover:text-zinc-900 hover:shadow-md transition-all duration-300 cursor-pointer group"
        title="API 设置"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:rotate-45 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      </button>
    </div>

    <div class="mb-8 p-5 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl shadow-xl shadow-zinc-900/10 ring-1 ring-white/10 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
      
      <div class="flex items-center gap-4 relative z-10">
        <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/10 backdrop-blur-sm">
          <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" :d="getModelIconPath(currentModelConfig?.type || 'chat')" />
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2.5 flex-wrap">
            <span class="text-base font-semibold text-white tracking-wide truncate">{{ currentModelConfig?.name || modelName }}</span>
            <span class="px-2.5 py-0.5 text-[10px] font-medium tracking-widest rounded-md bg-white/15 text-zinc-200 border border-white/10">
              {{ getModelTypeLabel(currentModelConfig?.type || 'chat') }}
            </span>
            <span v-if="currentModelConfig?.free" class="px-2 py-0.5 text-[10px] font-medium tracking-widest rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              FREE
            </span>
          </div>
          <p class="text-sm text-zinc-400 mt-1.5 truncate font-light">{{ currentModelConfig?.description || '自定义接入模型' }}</p>
        </div>
      </div>
    </div>

    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <span class="text-xs font-semibold text-zinc-400 uppercase tracking-widest">选择模型</span>
        <button 
          @click="showCustomModel = !showCustomModel"
          class="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer flex items-center gap-1"
        >
          <span>{{ showCustomModel ? '收起配置' : '自定义配置' }}</span>
        </button>
      </div>

      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="showCustomModel" class="mb-5">
          <div class="relative group">
            <input
              type="text"
              :value="modelName"
              @input="$emit('update:modelName', ($event.target as HTMLInputElement).value)"
              placeholder="输入模型 ID，如: vendor/model-name"
              class="peer w-full pl-4 pr-10 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-mono text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 focus:outline-none transition-all duration-300 shadow-sm"
            />
            <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-400 peer-focus:text-zinc-900 transition-colors duration-300 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </span>
          </div>
        </div>
      </Transition>

      <div class="space-y-2.5">
        <div
          v-for="model in modelConfigs"
          :key="model.id"
          @click="selectModel(model.id)"
          class="group relative p-3.5 rounded-xl border cursor-pointer transition-all duration-300"
          :class="modelName === model.id
            ? 'bg-zinc-900 border-zinc-900 shadow-lg shadow-zinc-900/10'
            : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-md hover:shadow-black/5'"
        >
          <div class="flex items-center gap-3.5">
            <div 
              class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300"
              :class="modelName === model.id ? 'bg-white/10 text-white' : 'bg-zinc-100 text-zinc-500 group-hover:bg-white group-hover:text-zinc-900 group-hover:shadow-sm'"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" :d="getModelIconPath(model.type)" />
              </svg>
            </div>
            
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span 
                  class="text-sm font-semibold truncate flex-1 tracking-wide"
                  :class="modelName === model.id ? 'text-white' : 'text-zinc-900'"
                >{{ model.name }}</span>
                <span 
                  class="px-2 py-0.5 text-[10px] font-medium tracking-widest rounded transition-colors duration-300"
                  :class="modelName === model.id ? 'bg-white/15 text-zinc-200' : 'bg-zinc-100 text-zinc-500'"
                >{{ getModelTypeShortLabel(model.type) }}</span>
              </div>
              <p 
                class="text-xs truncate mt-1 font-light"
                :class="modelName === model.id ? 'text-zinc-400' : 'text-zinc-500'"
              >{{ model.description }}</p>
            </div>
            
            <div 
              class="w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ml-2"
              :class="modelName === model.id ? 'border-white bg-white' : 'border-zinc-300 bg-transparent group-hover:border-zinc-400'"
            >
              <svg v-if="modelName === model.id" class="w-3 h-3 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-8 border-t border-zinc-100/80">
      <span class="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-6">参数设置</span>
      
      <div class="space-y-7">
        <div class="flex items-center justify-between group">
          <div>
            <span class="text-sm font-semibold text-zinc-800 tracking-wide">流式输出</span>
            <p class="text-xs text-zinc-400 mt-0.5 font-light">打字机效果逐字输出</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              :checked="streaming"
              @change="$emit('update:streaming', ($event.target as HTMLInputElement).checked)"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:shadow-sm peer-checked:bg-zinc-900 transition-colors duration-300"></div>
          </label>
        </div>

        <div class="group">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-semibold text-zinc-800 tracking-wide">创意度 <span class="text-zinc-400 font-normal ml-1">Temperature</span></span>
            <span class="text-xs font-mono text-zinc-600 bg-zinc-100 px-2 py-1 rounded-md">{{ temperature.toFixed(1) }}</span>
          </div>
          <input
            type="range"
            :value="temperature"
            @input="$emit('update:temperature', parseFloat(($event.target as HTMLInputElement).value))"
            min="0"
            max="1"
            step="0.1"
            class="w-full h-1.5 bg-zinc-100 rounded-full appearance-none cursor-pointer slider-thumb"
          />
          <div class="flex justify-between text-xs text-zinc-400 mt-2 font-light">
            <span>克制精确</span>
            <span>发散创新</span>
          </div>
        </div>

        <div class="group">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-semibold text-zinc-800 tracking-wide">最大长度 <span class="text-zinc-400 font-normal ml-1">Max Tokens</span></span>
            <span class="text-xs font-mono text-zinc-600 bg-zinc-100 px-2 py-1 rounded-md">{{ maxTokens }}</span>
          </div>
          <input
            type="range"
            :value="maxTokens"
            @input="$emit('update:maxTokens', parseInt(($event.target as HTMLInputElement).value))"
            min="500"
            max="4000"
            step="500"
            class="w-full h-1.5 bg-zinc-100 rounded-full appearance-none cursor-pointer slider-thumb"
          />
          <div class="flex justify-between text-xs text-zinc-400 mt-2 font-light">
            <span>简明扼要</span>
            <span>详尽全面</span>
          </div>
        </div>

        <el-collapse v-model="showAdvancedParams" class="advanced-params-collapse">
          <el-collapse-item name="advanced">
            <template #title>
              <div class="flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors tracking-wide">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                展开高级参数
              </div>
            </template>
            
            <div class="space-y-7 pt-4 pb-2">
              <div class="group">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-1.5">
                    <span class="text-sm font-semibold text-zinc-800 tracking-wide">Top-P</span>
                    <el-tooltip content="核采样：只从累积概率达到P的词中采样" placement="top">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-zinc-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </el-tooltip>
                  </div>
                  <span class="text-xs font-mono text-zinc-600 bg-zinc-100 px-2 py-1 rounded-md">{{ topP.toFixed(2) }}</span>
                </div>
                <input
                  type="range"
                  :value="topP"
                  @input="$emit('update:topP', parseFloat(($event.target as HTMLInputElement).value))"
                  min="0"
                  max="1"
                  step="0.05"
                  class="w-full h-1.5 bg-zinc-100 rounded-full appearance-none cursor-pointer slider-thumb"
                />
              </div>

              <div class="group">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-1.5">
                    <span class="text-sm font-semibold text-zinc-800 tracking-wide">Top-K</span>
                    <el-tooltip content="从概率最高的K个词中采样，0表示不限制" placement="top">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-zinc-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </el-tooltip>
                  </div>
                  <span class="text-xs font-mono text-zinc-600 bg-zinc-100 px-2 py-1 rounded-md">{{ topK }}</span>
                </div>
                <input
                  type="range"
                  :value="topK"
                  @input="$emit('update:topK', parseInt(($event.target as HTMLInputElement).value))"
                  min="0"
                  max="100"
                  step="5"
                  class="w-full h-1.5 bg-zinc-100 rounded-full appearance-none cursor-pointer slider-thumb"
                />
              </div>

              <div class="group">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-1.5">
                    <span class="text-sm font-semibold text-zinc-800 tracking-wide">频率惩罚</span>
                  </div>
                  <span class="text-xs font-mono text-zinc-600 bg-zinc-100 px-2 py-1 rounded-md">{{ frequencyPenalty.toFixed(1) }}</span>
                </div>
                <input
                  type="range"
                  :value="frequencyPenalty"
                  @input="$emit('update:frequencyPenalty', parseFloat(($event.target as HTMLInputElement).value))"
                  min="-2"
                  max="2"
                  step="0.1"
                  class="w-full h-1.5 bg-zinc-100 rounded-full appearance-none cursor-pointer slider-thumb"
                />
              </div>

              <div class="group">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-1.5">
                    <span class="text-sm font-semibold text-zinc-800 tracking-wide">存在惩罚</span>
                  </div>
                  <span class="text-xs font-mono text-zinc-600 bg-zinc-100 px-2 py-1 rounded-md">{{ presencePenalty.toFixed(1) }}</span>
                </div>
                <input
                  type="range"
                  :value="presencePenalty"
                  @input="$emit('update:presencePenalty', parseFloat(($event.target as HTMLInputElement).value))"
                  min="-2"
                  max="2"
                  step="0.1"
                  class="w-full h-1.5 bg-zinc-100 rounded-full appearance-none cursor-pointer slider-thumb"
                />
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>

    <el-dialog
      v-model="showSettingsDialog"
      title="API 核心配置"
      width="480px"
      :close-on-click-modal="true"
      append-to-body
      destroy-on-close
      class="premium-dialog"
      :show-close="true"
    >
      <div class="space-y-6 pt-2">
        <div>
          <label class="block text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2.5">
            API Secret Key
          </label>
          <div class="relative">
            <input
              type="password"
              :value="apiKey"
              @input="$emit('update:apiKey', ($event.target as HTMLInputElement).value)"
              placeholder="sk-..."
              class="peer w-full pl-4 pr-10 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-mono text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 focus:outline-none transition-all duration-300 shadow-sm"
            />
            <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-400 peer-focus:text-zinc-900 transition-colors duration-300 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </span>
          </div>
          <p class="text-xs text-zinc-400 mt-2 font-light flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            请前往 <a href="https://cloud.siliconflow.cn/account/ak" target="_blank" class="text-zinc-800 font-medium hover:underline">SiliconFlow</a> 获取专属密钥
          </p>
        </div>

        <div>
          <label class="block text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2.5">
            Endpoint URL
          </label>
          <div class="relative">
            <input
              type="text"
              :value="apiUrl"
              @input="$emit('update:apiUrl', ($event.target as HTMLInputElement).value)"
              placeholder="https://api.siliconflow.cn/v1"
              class="peer w-full pl-4 pr-10 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-mono text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 focus:outline-none transition-all duration-300 shadow-sm"
            />
            <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-400 peer-focus:text-zinc-900 transition-colors duration-300 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2.5">
            Interface Pattern
          </label>
          <div class="grid grid-cols-2 gap-3">
            <div
              @click="$emit('update:apiStyle', 'openai')"
              class="group relative p-4 rounded-xl border cursor-pointer transition-all duration-300"
              :class="apiStyle === 'openai'
                ? 'bg-zinc-900 border-zinc-900 shadow-lg shadow-zinc-900/10'
                : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'"
            >
              <div class="flex items-center gap-3">
                <div
                  class="p-2 rounded-lg transition-colors duration-300"
                  :class="apiStyle === 'openai' ? 'bg-white/10 text-white' : 'bg-zinc-100 text-zinc-500 group-hover:bg-white'"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 
                    class="text-sm font-semibold tracking-wide"
                    :class="apiStyle === 'openai' ? 'text-white' : 'text-zinc-900'"
                  >OpenAI</h3>
                  <p 
                    class="text-[10px] font-medium tracking-widest uppercase mt-0.5"
                    :class="apiStyle === 'openai' ? 'text-zinc-400' : 'text-zinc-400'"
                  >标准协议</p>
                </div>
              </div>
            </div>

            <div
              @click="$emit('update:apiStyle', 'adapter')"
              class="group relative p-4 rounded-xl border cursor-pointer transition-all duration-300"
              :class="apiStyle === 'adapter'
                ? 'bg-zinc-900 border-zinc-900 shadow-lg shadow-zinc-900/10'
                : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'"
            >
              <div class="flex items-center gap-3">
                <div
                  class="p-2 rounded-lg transition-colors duration-300"
                  :class="apiStyle === 'adapter' ? 'bg-white/10 text-white' : 'bg-zinc-100 text-zinc-500 group-hover:bg-white'"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h3 
                    class="text-sm font-semibold tracking-wide"
                    :class="apiStyle === 'adapter' ? 'text-white' : 'text-zinc-900'"
                  >Adapter</h3>
                  <p 
                    class="text-[10px] font-medium tracking-widest uppercase mt-0.5"
                    :class="apiStyle === 'adapter' ? 'text-zinc-400' : 'text-zinc-400'"
                  >适配模式</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3 border-t border-zinc-100 pt-5 mt-2">
          <button
            @click="showSettingsDialog = false"
            class="px-5 py-2.5 text-sm font-semibold text-zinc-600 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 hover:text-zinc-900 transition-all cursor-pointer"
          >
            取消
          </button>
          <button
            @click="showSettingsDialog = false"
            class="px-5 py-2.5 text-sm font-semibold text-white bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-all shadow-md shadow-zinc-900/20 cursor-pointer"
          >
            保存配置
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

// 获取模型对应的 SVG Path (取代以前的 Emoji)
const getModelIconPath = (type: ModelType): string => {
  const paths: Record<ModelType, string> = {
    chat: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    reasoning: 'M13 10V3L4 14h7v7l9-11h-7z', // 闪电符号代表逻辑/思考速度
    multimodal: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', // 眼睛代表视觉多模态
    ocr: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', // 文档代表OCR
    translate: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129', // 地球/语言代表翻译
    coder: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' // 代码符号
  };
  return paths[type] || paths.chat;
};

// 获取模型类型标签 (纯大写英文更具高级感，或保留干练中文)
const getModelTypeLabel = (type: ModelType): string => {
  const labels: Record<ModelType, string> = {
    chat: 'CONVERSATIONAL',
    reasoning: 'REASONING',
    multimodal: 'MULTIMODAL',
    ocr: 'VISION OCR',
    translate: 'TRANSLATION',
    coder: 'CODE GEN'
  };
  return labels[type];
};

// 获取模型类型短标签
const getModelTypeShortLabel = (type: ModelType): string => {
  const labels: Record<ModelType, string> = {
    chat: 'CHAT',
    reasoning: 'THINK',
    multimodal: 'VISION',
    ocr: 'OCR',
    translate: 'I18N',
    coder: 'CODE'
  };
  return labels[type];
};
</script>

<style scoped>
/* 高级定制滑块样式 - 极致纤细与深邃 */
.slider-thumb::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #18181b;
  border: 2px solid #ffffff;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease;
}

.slider-thumb::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.slider-thumb::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #18181b;
  border: 2px solid #ffffff;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* 确保所有可点击元素有手型光标 */
button, 
[role="button"],
.cursor-pointer {
  cursor: pointer;
}

/* 高级参数折叠区样式覆写 */
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
  color: #a1a1aa; /* zinc-400 */
}

/* Element Plus 对话框高级样式覆写 */
:deep(.premium-dialog) {
  border-radius: 20px !important;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
}

:deep(.premium-dialog .el-dialog__header) {
  padding: 24px 24px 0 !important;
  margin-right: 0 !important;
  border-bottom: none !important;
}

:deep(.premium-dialog .el-dialog__title) {
  font-weight: 700 !important;
  font-size: 1.125rem !important;
  color: #18181b !important;
  letter-spacing: -0.025em;
}

:deep(.premium-dialog .el-dialog__headerbtn) {
  top: 18px !important;
  right: 20px !important;
  width: 30px !important;
  height: 30px !important;
  background: #f4f4f5 !important;
  border-radius: 50% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: background 0.2s !important;
}

:deep(.premium-dialog .el-dialog__headerbtn:hover) {
  background: #e4e4e7 !important;
}

:deep(.premium-dialog .el-dialog__headerbtn .el-dialog__close) {
  color: #71717a !important;
  font-size: 13px !important;
}

:deep(.premium-dialog .el-dialog__body) {
  padding: 20px 24px !important;
}

:deep(.premium-dialog .el-dialog__footer) {
  padding: 0 24px 24px !important;
}
</style>
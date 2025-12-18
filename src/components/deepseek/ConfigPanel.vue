<template>
  <div class="bg-white rounded-xl shadow-md border border-gray-100 p-4 md:p-6 lg:w-full min-h-[500px] md:min-h-[650px] order-2 lg:order-1">
    <div class="flex items-center space-x-3 mb-6">
      <div class="bg-purple-100 p-2 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <h2 class="text-xl font-semibold text-gray-800">系统配置</h2>
    </div>

    <!-- API Settings -->
    <div class="space-y-6 mb-8">
      <!-- API KEY -->
      <div class="group">
        <label for="api-key" class="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 pl-1">
          API Secret Key
        </label>
        <div class="relative transition-all duration-300 ease-out">
          <input
            type="password"
            id="api-key"
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
      </div>

      <!-- API URL -->
      <div class="group">
        <label for="api-url" class="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 pl-1">
          Endpoint URL
        </label>
        <div class="relative transition-all duration-300 ease-out">
          <input
            type="text"
            id="api-url"
            :value="apiUrl"
            @input="$emit('update:apiUrl', ($event.target as HTMLInputElement).value)"
            placeholder="https://api.deepseek.com"
            class="peer w-full pl-4 pr-10 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-mono text-zinc-900 placeholder:text-zinc-300 focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 focus:outline-none transition-all duration-200 hover:bg-white hover:border-zinc-300 shadow-sm"
          />
          <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 peer-focus:text-zinc-900 transition-colors duration-200 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </span>
        </div>
      </div>
    </div>

    <!-- Model Selector -->
    <div class="pt-8 border-t border-zinc-100 mt-2">
      <div class="group relative mb-4">
        <label for="model-name" class="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 pl-1">
          模型名称 / Model ID
        </label>

        <div class="relative transition-all duration-300 ease-out">
          <input
            type="text"
            id="model-name"
            :value="modelName"
            @input="$emit('update:modelName', ($event.target as HTMLInputElement).value)"
            placeholder="例如: deepseek-chat"
            class="peer w-full pl-4 pr-10 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-mono text-zinc-900 placeholder:text-zinc-300 focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 focus:outline-none transition-all duration-200 hover:bg-white hover:border-zinc-300 shadow-sm"
          />
          <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 peer-focus:text-zinc-900 transition-colors duration-200 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </span>
        </div>
      </div>

      <!-- Quick Select Tags -->
      <div class="mb-8">
        <span class="block text-[10px] font-medium text-zinc-400 mb-2 pl-1">快速选择推荐模型：</span>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="model in modelOptions"
            :key="model"
            @click="$emit('update:modelName', model)"
            class="px-3 py-1.5 text-xs font-mono rounded-lg border transition-all duration-200 active:scale-95"
            :class="modelName === model
              ? 'bg-zinc-900 text-white border-zinc-900 shadow-md shadow-zinc-900/10'
              : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50'"
          >
            {{ model }}
          </button>
        </div>
      </div>

      <!-- Action Button Area -->
      <div class="relative">
        <button
          @click="handleModelUpdate"
          class="w-full group relative overflow-hidden px-4 py-3 bg-zinc-900 text-white rounded-xl shadow-lg shadow-zinc-900/20 hover:bg-zinc-800 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span class="text-sm font-semibold tracking-wide flex items-center gap-2 relative z-10">
            <svg class="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            更新模型配置
          </span>

          <div class="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0"></div>
        </button>

        <!-- Toast Notification -->
        <Transition
          enter-active-class="transition ease-out duration-300"
          enter-from-class="transform opacity-0 translate-y-2"
          enter-to-class="transform opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="transform opacity-100 translate-y-0"
          leave-to-class="transform opacity-0 translate-y-2"
        >
          <div
            v-if="showingModelSuccess"
            class="absolute -top-14 left-0 right-0 flex justify-center pointer-events-none"
          >
            <div class="bg-zinc-800 text-white text-xs font-medium px-4 py-2 rounded-full shadow-xl flex items-center gap-2 ring-1 ring-white/10 backdrop-blur-sm">
              <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              配置已更新
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- API Style Selector -->
    <div class="mb-8">
      <span class="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 pl-1">
        Interface Style
      </span>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Option 1: OpenAI -->
        <div
          @click="$emit('update:apiStyle', 'openai')"
          class="group relative p-4 rounded-xl border cursor-pointer transition-all duration-200"
          :class="apiStyle === 'openai'
            ? 'bg-zinc-50/50 border-zinc-900 ring-1 ring-zinc-900 shadow-sm'
            : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-sm'
          "
        >
          <div class="flex items-start justify-between mb-3">
            <div
              class="p-2 rounded-lg transition-colors duration-200"
              :class="apiStyle === 'openai' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200 group-hover:text-zinc-700'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            <div class="relative flex items-center justify-center w-5 h-5">
              <div
                class="w-4 h-4 rounded-full border transition-all duration-200 flex items-center justify-center"
                :class="apiStyle === 'openai' ? 'border-zinc-900 bg-zinc-900' : 'border-zinc-300 bg-transparent'"
              >
                <svg v-if="apiStyle === 'openai'" class="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-sm font-bold text-zinc-900 font-mono mb-1">Standard OpenAI</h3>
            <p class="text-xs text-zinc-500 leading-relaxed">
              Standard client compatibility. Direct endpoint access.
            </p>
          </div>
        </div>

        <!-- Option 2: Adapter -->
        <div
          @click="$emit('update:apiStyle', 'adapter')"
          class="group relative p-4 rounded-xl border cursor-pointer transition-all duration-200"
          :class="apiStyle === 'adapter'
            ? 'bg-zinc-50/50 border-zinc-900 ring-1 ring-zinc-900 shadow-sm'
            : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-sm'
          "
        >
          <div class="flex items-start justify-between mb-3">
            <div
              class="p-2 rounded-lg transition-colors duration-200"
              :class="apiStyle === 'adapter' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200 group-hover:text-zinc-700'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>

            <div class="relative flex items-center justify-center w-5 h-5">
              <div
                class="w-4 h-4 rounded-full border transition-all duration-200 flex items-center justify-center"
                :class="apiStyle === 'adapter' ? 'border-zinc-900 bg-zinc-900' : 'border-zinc-300 bg-transparent'"
              >
                <svg v-if="apiStyle === 'adapter'" class="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-sm font-bold text-zinc-900 font-mono mb-1">ai.createModel</h3>
            <p class="text-xs text-zinc-500 leading-relaxed">
              Vercel AI SDK adapter style. Streamlined integration.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Parameter Controls -->
    <div class="pt-6 border-t border-zinc-100 space-y-8">
      <!-- 1. 流式输出开关 -->
      <div class="flex items-center justify-between group">
        <div class="flex flex-col">
          <span class="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Stream Response</span>
          <span class="text-[10px] text-zinc-400">打字机效果逐字输出</span>
        </div>

        <button
          type="button"
          @click="$emit('update:streaming', !streaming)"
          :class="streaming ? 'bg-zinc-900' : 'bg-zinc-200'"
          class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
        >
          <span
            :class="streaming ? 'translate-x-5 bg-white' : 'translate-x-0 bg-white'"
            class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full shadow ring-0 transition duration-200 ease-in-out"
          >
            <span
              :class="streaming ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in'"
              class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
            >
              <svg class="h-3 w-3 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
            <span
              :class="streaming ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out'"
              class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
            >
              <svg class="h-3 w-3 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </span>
        </button>
      </div>

      <!-- 2. 创意度滑块 -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <label class="text-xs font-bold text-zinc-500 uppercase tracking-widest">Temperature</label>
          <span class="inline-flex items-center justify-center min-w-[3rem] px-2 py-1 rounded bg-zinc-50 border border-zinc-200 text-xs font-mono font-medium text-zinc-900 tabular-nums">
            {{ temperature.toFixed(1) }}
          </span>
        </div>

        <div class="relative w-full h-6 flex items-center">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            :value="temperature"
            @input="$emit('update:temperature', parseFloat(($event.target as HTMLInputElement).value))"
            class="w-full h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-zinc-900 hover:accent-zinc-700 focus:outline-none focus:ring-0"
          />
        </div>

        <div class="flex justify-between text-[10px] font-medium text-zinc-400 uppercase tracking-wide mt-1">
          <span>Precise (0.0)</span>
          <span>Creative (1.0)</span>
        </div>
      </div>

      <!-- 3. 输出长度滑块 -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <label class="text-xs font-bold text-zinc-500 uppercase tracking-widest">Max Tokens</label>
          <span class="inline-flex items-center justify-center min-w-[3rem] px-2 py-1 rounded bg-zinc-50 border border-zinc-200 text-xs font-mono font-medium text-zinc-900 tabular-nums">
            {{ maxTokens }}
          </span>
        </div>

        <div class="relative w-full h-6 flex items-center">
          <input
            type="range"
            min="500"
            max="4000"
            step="500"
            :value="maxTokens"
            @input="$emit('update:maxTokens', parseInt(($event.target as HTMLInputElement).value))"
            class="w-full h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-zinc-900 hover:accent-zinc-700 focus:outline-none focus:ring-0"
          />
        </div>

        <div class="flex justify-between text-[10px] font-medium text-zinc-400 uppercase tracking-wide mt-1">
          <span>Short (500)</span>
          <span>Long (4000)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const modelOptions = [
  'deepseek-chat',
  'deepseek-coder',
  'QwQ-32B',
  'deepseek-lite',
  'deepseek-v2'
];

defineProps<{
  apiKey: string;
  apiUrl: string;
  modelName: string;
  apiStyle: 'openai' | 'adapter';
  streaming: boolean;
  temperature: number;
  maxTokens: number;
}>();

const emit = defineEmits<{
  'update:apiKey': [value: string];
  'update:apiUrl': [value: string];
  'update:modelName': [value: string];
  'update:apiStyle': [value: 'openai' | 'adapter'];
  'update:streaming': [value: boolean];
  'update:temperature': [value: number];
  'update:maxTokens': [value: number];
}>();

const showingModelSuccess = ref(false);

const handleModelUpdate = () => {
  showingModelSuccess.value = true;
  setTimeout(() => {
    showingModelSuccess.value = false;
  }, 2000);
};
</script>

<style scoped>
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

/* 针对 Webkit 浏览器的 Slider 样式微调，使其更平滑 */
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #18181b; /* zinc-900 */
  margin-top: -6px; /* 垂直居中 */
  box-shadow: 0 0 0 2px #ffffff, 0 2px 4px rgba(0,0,0,0.1); /* 添加白边和阴影 */
  cursor: pointer;
  transition: transform 0.1s;
}

input[type=range]::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  cursor: pointer;
  background: #f4f4f5; /* zinc-100 */
  border-radius: 2px;
}
</style>

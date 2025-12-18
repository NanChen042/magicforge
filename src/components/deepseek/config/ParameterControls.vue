<template>
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
          <!-- 图标：极简线条风格 -->
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
        <!-- 数值显示：精密仪表风格 -->
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
</template>

<script setup lang="ts">
defineProps<{
  streaming: boolean;
  temperature: number;
  maxTokens: number;
}>();

defineEmits<{
  'update:streaming': [value: boolean];
  'update:temperature': [value: number];
  'update:maxTokens': [value: number];
}>();
</script>

<style scoped>
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

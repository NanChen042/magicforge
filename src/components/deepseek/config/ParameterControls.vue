<template>
  <div class="pt-5 border-t border-gray-200">
    <!-- 流式输出开关 -->
    <div class="flex items-center justify-between mb-5">
      <span class="text-sm font-medium text-gray-700">流式输出</span>
      <button
        type="button"
        @click="$emit('update:streaming', !streaming)"
        :class="streaming ? 'bg-purple-600' : 'bg-gray-200'"
        class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        <span
          :class="streaming ? 'translate-x-5' : 'translate-x-0'"
          class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        >
          <span
            :class="streaming ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in'"
            class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
          >
            <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
              <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span
            :class="streaming ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out'"
            class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
          >
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
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        :value="temperature"
        @input="$emit('update:temperature', parseFloat(($event.target as HTMLInputElement).value))"
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
      />
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
      <input
        type="range"
        min="500"
        max="4000"
        step="500"
        :value="maxTokens"
        @input="$emit('update:maxTokens', parseInt(($event.target as HTMLInputElement).value))"
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
      />
      <div class="flex justify-between text-xs text-gray-500 mt-1">
        <span>简短</span>
        <span>详细</span>
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

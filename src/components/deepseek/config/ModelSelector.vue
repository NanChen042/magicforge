<template>
  <div class="pt-5 border-t border-gray-200 mt-5">
    <label for="model-name" class="block text-sm font-medium text-gray-700 mb-1">AI 模型</label>
    <div class="relative">
      <input
        type="text"
        id="model-name"
        :value="modelName"
        @input="$emit('update:modelName', ($event.target as HTMLInputElement).value)"
        placeholder="输入模型名称（例如 deepseek-chat）"
        class="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
      />
      <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
        </svg>
      </span>
    </div>

    <div class="mt-2 flex flex-wrap gap-2">
      <button
        v-for="model in modelOptions"
        :key="model"
        @click="$emit('update:modelName', model)"
        class="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded border border-gray-200 transition-colors"
      >
        {{ model }}
      </button>
    </div>

    <div class="mt-3 relative">
      <button
        @click="$emit('update')"
        class="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
        </svg>
        更新当前模型
      </button>

      <!-- 成功提示 -->
      <div
        v-if="showSuccess"
        class="absolute top-0 left-0 right-0 -mt-10 bg-green-100 text-green-700 text-sm px-3 py-1 rounded-md flex items-center justify-center gap-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        模型已更新
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const modelOptions = [
  'deepseek-chat',
  'deepseek-coder',
  'QwQ-32B',
  'deepseek-lite',
  'deepseek-v2'
];

defineProps<{
  modelName: string;
  showSuccess: boolean;
}>();

defineEmits<{
  'update:modelName': [value: string];
  'update': [];
}>();
</script>

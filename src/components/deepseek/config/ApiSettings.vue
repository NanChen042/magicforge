<template>
  <div class="space-y-5 mb-6">
    <div>
      <label for="api-key" class="block text-sm font-medium text-gray-700 mb-1">API KEY</label>
      <div class="relative">
        <input
          type="password"
          id="api-key"
          :value="apiKey"
          @input="$emit('update:apiKey', ($event.target as HTMLInputElement).value)"
          placeholder="输入您的 Deepseek API Key"
          class="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
        />
        <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1 1-1-.257-.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd" />
          </svg>
        </span>
      </div>
    </div>

    <div>
      <label for="api-url" class="block text-sm font-medium text-gray-700 mb-1">API 地址</label>
      <div class="relative">
        <input
          type="text"
          id="api-url"
          :value="apiUrl"
          @input="$emit('update:apiUrl', ($event.target as HTMLInputElement).value)"
          placeholder="输入 API 地址"
          class="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
        />
        <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  apiKey: string;
  apiUrl: string;
}>();

defineEmits<{
  'update:apiKey': [value: string];
  'update:apiUrl': [value: string];
}>();
</script>

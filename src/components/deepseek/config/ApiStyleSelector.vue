<template>
  <div>
    <span class="block text-sm font-medium text-gray-700 mb-2">API 风格</span>
    <div class="grid grid-cols-2 gap-3">
      <div
        @click="$emit('update:apiStyle', 'openai')"
        class="cursor-pointer relative p-4 rounded-lg border transition-all duration-200"
        :class="apiStyle === 'openai'
          ? 'border-purple-500 bg-purple-50 shadow-sm'
          : 'border-gray-200 hover:border-purple-300'
        "
      >
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

      <div
        @click="$emit('update:apiStyle', 'adapter')"
        class="cursor-pointer relative p-4 rounded-lg border transition-all duration-200"
        :class="apiStyle === 'adapter'
          ? 'border-purple-500 bg-purple-50 shadow-sm'
          : 'border-gray-200 hover:border-purple-300'
        "
      >
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
</template>

<script setup lang="ts">
defineProps<{
  apiStyle: 'openai' | 'adapter';
}>();

defineEmits<{
  'update:apiStyle': [value: 'openai' | 'adapter'];
}>();
</script>

<template>
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
        <!-- 图标：默认灰色，输入框聚焦时变黑 -->
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

<template>
  <div class="pt-8 border-t border-zinc-100 mt-2">
    
    <!-- Input Section -->
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
        @click="$emit('update')"
        class="w-full group relative overflow-hidden px-4 py-3 bg-zinc-900 text-white rounded-xl shadow-lg shadow-zinc-900/20 hover:bg-zinc-800 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2"
      >
        <!-- Button Text -->
        <span class="text-sm font-semibold tracking-wide flex items-center gap-2 relative z-10">
          <svg class="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          更新模型配置
        </span>
        
        <!-- Subtle sheen effect -->
        <div class="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0"></div>
      </button>

      <!-- Toast Notification (Absolute positioned relative to this container) -->
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="transform opacity-0 translate-y-2"
        enter-to-class="transform opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="transform opacity-100 translate-y-0"
        leave-to-class="transform opacity-0 translate-y-2"
      >
        <div
          v-if="showSuccess"
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

<style scoped>
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>

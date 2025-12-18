<template>
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
          <!-- Icon -->
          <div 
            class="p-2 rounded-lg transition-colors duration-200"
            :class="apiStyle === 'openai' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200 group-hover:text-zinc-700'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          <!-- Radio Indicator -->
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
          <!-- Icon -->
          <div 
            class="p-2 rounded-lg transition-colors duration-200"
            :class="apiStyle === 'adapter' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200 group-hover:text-zinc-700'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>

          <!-- Radio Indicator -->
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
</template>

<script setup lang="ts">
defineProps<{
  apiStyle: 'openai' | 'adapter';
}>();

defineEmits<{
  'update:apiStyle': [value: 'openai' | 'adapter'];
}>();
</script>

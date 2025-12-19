<template>
  <div 
    class="h-full overflow-y-auto bg-white border-l border-zinc-100 custom-scrollbar flex flex-col" 
    ref="containerRef" 
    @scroll="$emit('scroll', $event)"
  >
    
    <!-- 头部：固定不动的 Status Bar 风格 -->
    <div class="sticky top-0 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-6 py-4 z-10 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <!-- 图标：极简的流程图符号 -->
        <div class="flex items-center justify-center w-6 h-6 rounded border border-zinc-200 bg-zinc-50">
          <svg class="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <div>
          <h3 class="text-xs font-bold text-zinc-800 uppercase tracking-widest">Reasoning Trace</h3>
        </div>
      </div>

      <!-- 状态标签 -->
      <div class="flex items-center gap-2">
        <span v-if="isThinking" class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-zinc-900"></span>
        </span>
        <span class="text-[10px] font-mono font-medium text-zinc-400 uppercase">
          {{ isThinking ? 'Processing' : (reasoningContent ? 'Complete' : 'Idle') }}
        </span>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="flex-1 p-6 relative">
      
      <!-- 场景1: 有思维内容 (日志模式) -->
      <div v-if="reasoningContent" class="animate-in fade-in duration-500">
        <!-- 装饰线：模拟时间轴 -->
        <div class="absolute left-9 top-6 bottom-6 w-px bg-zinc-100"></div>
        
        <div class="relative pl-8">
          <div class="prose prose-sm prose-zinc max-w-none font-mono text-xs leading-relaxed text-zinc-600">
            <div class="space-y-4" v-html="formattedContent"></div>
          </div>
          <!-- 结束符 -->
          <div class="mt-4 flex items-center gap-2 text-zinc-300 select-none">
            <span class="w-2 h-2 bg-zinc-200 rounded-sm"></span>
            <span class="h-px w-12 bg-zinc-100"></span>
            <span class="text-[10px] uppercase tracking-widest">End of trace</span>
          </div>
        </div>
      </div>

      <!-- 场景2: 正在思考 (极简加载) -->
      <div v-else-if="isThinking" class="h-full flex flex-col items-center justify-center min-h-[300px] opacity-80">
        <div class="space-y-4 w-full max-w-xs">
          <!-- 骨架屏效果：模拟正在打印的行 -->
          <div class="h-2 bg-zinc-100 rounded w-3/4 animate-pulse"></div>
          <div class="h-2 bg-zinc-100 rounded w-full animate-pulse delay-75"></div>
          <div class="h-2 bg-zinc-100 rounded w-5/6 animate-pulse delay-150"></div>
          
          <div class="pt-8 flex items-center justify-center gap-2">
             <svg class="animate-spin h-4 w-4 text-zinc-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-xs font-mono text-zinc-500">Analyzing logic chain...</span>
          </div>
        </div>
      </div>

      <!-- 场景3: 空状态 (待机终端) -->
      <div v-else class="h-full flex flex-col items-center justify-center min-h-[300px]">
        <div class="p-8 border border-dashed border-zinc-200 rounded-lg bg-zinc-50/50 flex flex-col items-center text-center max-w-sm">
          <div class="w-12 h-12 mb-4 rounded-full bg-white border border-zinc-100 flex items-center justify-center shadow-sm">
            <svg class="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 class="text-sm font-bold text-zinc-900 mb-1">System Standby</h4>
          <p class="text-xs text-zinc-500 leading-relaxed font-mono">
            Waiting for input to initialize reasoning sequence.
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { formatMarkdown } from '@/utils/markdown';

const props = defineProps<{
  reasoningContent: string;
  isThinking: boolean;
}>();

defineEmits<{
  scroll: [event: Event];
}>();

const containerRef = ref<HTMLElement | null>(null);

const formattedContent = computed(() => formatMarkdown(props.reasoningContent));

defineExpose({
  containerRef
});
</script>

<style scoped>
/* 极简滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #f4f4f5; /* zinc-100 */
  border-radius: 20px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #e4e4e7; /* zinc-200 */
}
</style>

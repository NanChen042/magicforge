<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
    <!-- 背景遮罩：使用模糊加深色背景，营造沉浸感 -->
    <div 
      class="absolute inset-0 bg-zinc-900/30 backdrop-blur-sm transition-opacity"
      @click="$emit('close')"
    ></div>

    <!-- 主卡片：采用 Zinc 色系，圆角更平滑，阴影更深邃 -->
    <div class="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 flex flex-col max-h-[90vh] overflow-hidden transition-all transform">
      
      <!-- 头部：极简主义，去掉了原本复杂的绿色图标 -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-zinc-100 bg-white/50 backdrop-blur-xl z-10 sticky top-0">
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 text-white shadow-lg shadow-zinc-900/20">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 class="text-base font-bold text-zinc-900 tracking-tight">提示词优化</h3>
            <p class="text-xs text-zinc-500 font-medium">AI 智能增强助手</p>
          </div>
        </div>
        
        <button 
          @click="$emit('close')" 
          class="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <!-- 内容滚动区 -->
      <div class="p-6 overflow-y-auto custom-scrollbar space-y-8 bg-white">

        <!-- 模式选择 -->
        <section>
          <label class="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 pl-1">优化模式</label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              v-for="mode in transformModes"
              :key="mode.value"
              @click="$emit('update:selectedMode', mode.value)"
              :class="[
                'group relative p-4 rounded-xl text-left border transition-all duration-300',
                selectedMode === mode.value
                  ? 'bg-zinc-900 border-zinc-900 shadow-lg'
                  : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
              ]"
            >
              <div class="flex justify-between items-start mb-2">
                <span class="text-xl filter grayscale group-hover:grayscale-0 transition-all duration-300">{{ mode.icon }}</span>
                <!-- 选中状态的小圆点 -->
                <span v-if="selectedMode === mode.value" class="w-2 h-2 rounded-full bg-white"></span>
              </div>
              <span :class="['block text-sm font-semibold mb-1', selectedMode === mode.value ? 'text-white' : 'text-zinc-900']">
                {{ mode.label }}
              </span>
              <p :class="['text-xs leading-relaxed', selectedMode === mode.value ? 'text-zinc-400' : 'text-zinc-500']">
                {{ mode.description }}
              </p>
            </button>
          </div>
        </section>

        <!-- 原始输入 -->
        <section>
          <div class="flex justify-between items-center mb-2 pl-1">
            <label class="block text-xs font-bold text-zinc-400 uppercase tracking-wider">原始输入</label>
          </div>
          <div class="p-4 bg-zinc-50 rounded-xl border border-zinc-100 text-sm text-zinc-600 leading-relaxed font-mono">
            {{ userInput }}
          </div>
        </section>

        <!-- 优化结果 -->
        <section v-if="transformResult" class="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div class="flex items-center gap-2 mb-2 pl-1">
            <label class="block text-xs font-bold text-indigo-600 uppercase tracking-wider">优化结果</label>
            <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">AI GEN</span>
          </div>
          
          <div class="rounded-xl border border-indigo-100 bg-gradient-to-b from-white to-indigo-50/30 shadow-sm overflow-hidden">
            <div class="p-5">
              <p class="text-zinc-800 text-sm leading-relaxed font-medium whitespace-pre-wrap">{{ transformResult.transformedText }}</p>
            </div>
            
            <!-- 建议标签 -->
            <div v-if="transformResult.suggestions.length > 0" class="px-5 py-3 bg-white/50 border-t border-indigo-100/50 backdrop-blur-sm">
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="suggestion in transformResult.suggestions"
                  :key="suggestion"
                  class="px-2.5 py-1 bg-white border border-indigo-100 text-indigo-600 rounded-md text-xs font-medium shadow-sm hover:shadow-md transition-shadow cursor-default"
                >
                  {{ suggestion }}
                </span>
              </div>
            </div>
          </div>
        </section>

      </div>

      <!-- 底部操作栏 -->
      <div class="px-6 py-5 bg-white border-t border-zinc-100 flex justify-end items-center gap-3">
        <button
          @click="$emit('close')"
          class="px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 rounded-lg transition-colors"
        >
          取消
        </button>

        <button
          @click="$emit('transform')"
          :disabled="isTransforming"
          class="px-5 py-2 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-800 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg shadow-zinc-900/10"
        >
          <svg v-if="isTransforming" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span v-else class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            {{ transformResult ? '重新优化' : '开始优化' }}
          </span>
        </button>

        <button
          v-if="transformResult"
          @click="$emit('apply')"
          class="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-600/20"
        >
          应用结果
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { TransformResult } from '@/services/keywordTransformService';

const transformModes = [
  {
    value: 'dialogue' as const,
    label: '对话优化',
    icon: '💬',
    description: '优化为更适合AI对话的表达'
  },
  {
    value: 'professional' as const,
    label: '专业表达',
    icon: '🎯',
    description: '转换为更专业、准确的术语'
  },
  {
    value: 'creative' as const,
    label: '创意增强',
    icon: '✨',
    description: '增加创意元素和想象空间'
  },
  {
    value: 'analytical' as const,
    label: '深度分析',
    icon: '🔍',
    description: '引导进行深入分析和思考'
  }
];

defineProps<{
  userInput: string;
  selectedMode: 'dialogue' | 'professional' | 'creative' | 'analytical';
  transformResult: TransformResult | null;
  isTransforming: boolean;
}>();

defineEmits<{
  close: [];
  transform: [];
  apply: [];
  'update:selectedMode': [value: 'dialogue' | 'professional' | 'creative' | 'analytical'];
}>();
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e4e4e7;
  border-radius: 20px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #d4d4d8;
}
</style>

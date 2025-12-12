<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <!-- 模态框头部 -->
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947z" clip-rule="evenodd" />
            </svg>
            提示词优化
          </h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <!-- 转换模式选择 -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">选择优化模式</label>
          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="mode in transformModes"
              :key="mode.value"
              @click="$emit('update:selectedMode', mode.value)"
              :class="[
                'p-4 rounded-lg border-2 transition-all text-left',
                selectedMode === mode.value
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              ]"
            >
              <div class="flex items-center gap-2 mb-2">
                <span class="text-lg">{{ mode.icon }}</span>
                <span class="font-medium text-gray-900">{{ mode.label }}</span>
              </div>
              <p class="text-sm text-gray-600">{{ mode.description }}</p>
            </button>
          </div>
        </div>

        <!-- 原始文本显示 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">原始输入</label>
          <div class="p-3 bg-gray-50 rounded-lg border text-sm text-gray-700">
            {{ userInput }}
          </div>
        </div>

        <!-- 转换结果 -->
        <div v-if="transformResult" class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">优化后的提示词</label>
          <div class="p-4 bg-green-50 rounded-lg border border-green-200">
            <p class="text-gray-800 mb-3">{{ transformResult.transformedText }}</p>
            <div v-if="transformResult.suggestions.length > 0" class="border-t border-green-200 pt-3">
              <p class="text-sm font-medium text-gray-700 mb-2">相关建议：</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="suggestion in transformResult.suggestions"
                  :key="suggestion"
                  class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
                >
                  {{ suggestion }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex justify-end gap-3">
          <button
            @click="$emit('close')"
            class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            取消
          </button>
          <button
            @click="$emit('transform')"
            :disabled="isTransforming"
            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <svg v-if="isTransforming" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {{ isTransforming ? '转换中...' : '开始转换' }}
          </button>
          <button
            v-if="transformResult"
            @click="$emit('apply')"
            class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            应用优化
          </button>
        </div>
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

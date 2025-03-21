<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
    <!-- 背景遮罩 -->
    <div class="fixed inset-0 bg-black transition-opacity"
         :class="{ 'opacity-50': isOpen }"
         @click="close"></div>

    <!-- 弹窗内容 -->
    <div class="relative w-full max-w-3xl mx-auto my-6 bg-white rounded-xl shadow-2xl transform transition-all"
         :class="{ 'opacity-100 translate-y-0': isOpen, 'opacity-0 translate-y-4': !isOpen }">
      <!-- 弹窗头部 -->
      <div class="flex items-start justify-between p-6 border-b border-gray-200 rounded-t-xl bg-gray-50">
        <h3 class="text-xl font-semibold text-gray-900">{{ title }}</h3>
        <button class="p-1 ml-auto text-gray-500 hover:text-gray-800 transition-colors rounded-full hover:bg-gray-200" @click="close">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- 弹窗内容 -->
      <div class="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
        <!-- 描述 -->
        <div class="mb-6">
          <p class="text-gray-600 text-lg">{{ description }}</p>
        </div>

        <!-- 提示词 -->
        <div class="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-200 transition-colors">
          <h4 class="font-medium text-gray-700 mb-3 flex items-center">
            <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
            </svg>
            提示词
          </h4>
          <div class="flex mb-2 bg-white p-4 rounded-lg border border-gray-100">
            <span class="font-bold text-blue-600 mr-3">USER</span>
            <p class="text-gray-800 whitespace-pre-wrap">{{ userPrompt }}</p>
          </div>
        </div>

        <!-- 样例输出 -->
        <div class="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-200 transition-colors">
          <h4 class="font-medium text-gray-700 mb-3 flex items-center">
            <svg class="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            样例输出
          </h4>
          <div class="prose prose-sm max-w-none bg-white p-4 rounded-lg border border-gray-100">
            <p class="text-gray-800 whitespace-pre-wrap">{{ sampleOutput }}</p>
          </div>
        </div>

        <!-- 赏析 -->
        <div v-if="analysis" class="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-purple-200 transition-colors">
          <h4 class="font-medium text-gray-700 mb-3 flex items-center">
            <svg class="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
            赏析
          </h4>
          <p class="text-gray-800 bg-white p-4 rounded-lg border border-gray-100">{{ analysis }}</p>
        </div>
      </div>

      <!-- 弹窗底部 -->
      <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
        <button
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
          @click="close"
        >
          关闭
        </button>
        <button
          class="px-5 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
          @click="useThisPrompt"
        >
          前往测试
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  userPrompt: {
    type: String,
    default: ''
  },
  sampleOutput: {
    type: String,
    default: ''
  },
  analysis: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['close', 'use-prompt']);

const close = () => {
  emit('close');
};

const useThisPrompt = () => {
  emit('use-prompt', props.userPrompt);
  close();
};
</script>

<script lang="ts">
export default {
  name: 'PromptExampleModal'
};
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #CBD5E1 transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #CBD5E1;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #94A3B8;
}

/* 动画效果 */
.transform {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.opacity-0 {
  opacity: 0;
}

.opacity-100 {
  opacity: 1;
}

.translate-y-0 {
  transform: translateY(0);
}

.translate-y-4 {
  transform: translateY(1rem);
}
</style>

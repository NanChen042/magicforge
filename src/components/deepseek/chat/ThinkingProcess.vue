<template>
  <div class="thinking-process h-full overflow-y-auto p-6 max-h-[650px]" ref="containerRef" @scroll="$emit('scroll', $event)">
    <!-- 有思维内容时显示 -->
    <div v-if="reasoningContent" class="relative">
      <div class="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl"></div>
      <div class="relative p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
        <!-- 思维图标和标题 -->
        <div class="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947z" clip-rule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">思维链路</h3>
            <p class="text-sm text-gray-500">AI的分析和推理过程</p>
          </div>
        </div>
        <!-- 思维内容 -->
        <div class="prose prose-sm max-w-none text-gray-600">
          <div class="space-y-4" v-html="formattedContent"></div>
        </div>
      </div>
    </div>

    <!-- 正在加载思维过程 -->
    <div v-else-if="isThinking" class="relative">
      <div class="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl"></div>
      <div class="relative p-8 bg-white border border-gray-100 rounded-xl shadow-sm">
        <div class="flex flex-col items-center justify-center">
          <!-- 思考动画 -->
          <div class="relative w-16 h-16 mb-6">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <div class="absolute inset-1 bg-white rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <h3 class="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
            AI正在思考
          </h3>
          <p class="text-gray-500 text-center max-w-md">
            正在分析您的问题，构建逻辑链路，生成最佳答案...
          </p>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="relative">
      <div class="absolute -inset-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl blur-xl"></div>
      <div class="relative p-8 bg-white border border-gray-100 rounded-xl shadow-sm">
        <div class="flex flex-col items-center justify-center text-center">
          <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">
            探索AI的思维过程
          </h3>
          <p class="text-gray-500 max-w-md">
            在这里，您可以看到AI是如何分析问题、构建逻辑链路，并最终得出答案的。发送一个问题，开始探索AI的思维世界吧！
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
.thinking-process {
  background: linear-gradient(to bottom right, rgb(248 250 252), rgb(255 255 255));
}
</style>

<template>
  <div class="chat-container h-full max-h-[650px]" ref="containerRef" @scroll="handleScroll">
    <!-- 思考提示 -->
    <div v-if="isThinking" class="flex items-center space-x-3 p-4 mb-4 bg-blue-50 rounded-lg border border-blue-100 animate-pulse thinking-indicator">
      <div class="relative w-8 h-8 flex-shrink-0">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-ping opacity-75"></div>
        <div class="relative bg-white rounded-full p-1.5 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
      <div>
        <div class="text-sm font-medium text-blue-700">AI正在思考中</div>
        <div class="text-xs text-blue-500">正在分析您的问题，并构建解答思路，请稍候...</div>
      </div>
    </div>

    <!-- 消息列表 -->
    <MessageItem
      v-for="(item, index) in conversationHistory"
      :key="index"
      :message="item"
      :index="index"
      :isLast="index === conversationHistory.length - 1"
      :isThinking="isThinking"
      :isStopped="isLastMessageStopped"
    />

    <!-- 空状态 -->
    <EmptyState
      v-if="conversationHistory.length === 0"
      :hotTopics="hotTopics"
      :isLoadingTopics="isLoadingTopics"
      @select-question="$emit('select-question', $event)"
      @refresh-topics="$emit('refresh-topics')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MessageItem from './MessageItem.vue';
import EmptyState from './EmptyState.vue';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

defineProps<{
  conversationHistory: Message[];
  isThinking: boolean;
  isLastMessageStopped: boolean;
  hotTopics: string[];
  isLoadingTopics: boolean;
}>();

const emit = defineEmits<{
  'select-question': [question: string];
  'refresh-topics': [];
  scroll: [event: Event];
}>();

const containerRef = ref<HTMLElement | null>(null);

const handleScroll = (event: Event) => {
  emit('scroll', event);
};

defineExpose({
  containerRef
});
</script>

<style scoped>
.chat-container {
  padding: 1.75rem;
  overflow-y: auto;
  height: 100%;
  scrollbar-width: thin;
  scrollbar-color: rgba(203, 213, 225, 0.5) transparent;
}

.chat-container::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.chat-container::-webkit-scrollbar-track {
  background: transparent;
}

.chat-container::-webkit-scrollbar-thumb {
  background-color: rgba(203, 213, 225, 0.5);
  border-radius: 6px;
}
</style>

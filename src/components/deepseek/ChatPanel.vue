<template>
  <div class="col-span-1 lg:col-span-2 flex flex-col bg-white rounded-xl shadow-md border border-gray-100 min-h-[500px] md:min-h-[650px] order-1 lg:order-2">
    <!-- 聊天头部 -->
    <div class="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-gray-200">
      <button
        @click="activeTab = 'output'"
        class="px-4 py-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors"
        :class="activeTab === 'output'
          ? 'text-purple-600 border-purple-600'
          : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
        "
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V9z" clip-rule="evenodd" />
        </svg>
        对话内容
      </button>
      <button
        @click="activeTab = 'thinking'"
        class="px-4 py-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors"
        :class="activeTab === 'thinking'
          ? 'text-purple-600 border-purple-600'
          : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
        "
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
        </svg>
        思维过程
      </button>

      <!-- 进度指示器 -->
      <div v-if="isProcessing" class="ml-auto flex items-center gap-2 px-4">
        <div class="w-24 bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div class="bg-gradient-to-r from-purple-500 to-blue-500 h-1.5 rounded-full" :style="{ width: streamProgress + '%' }"></div>
        </div>
        <span class="text-xs text-gray-500">{{ streamProgress }}%</span>
      </div>
    </div>

    <!-- 消息内容区域 -->
    <div class="flex-1 overflow-hidden">
      <!-- 对话内容 -->
      <div v-show="activeTab === 'output'">
        <ChatContainer
          ref="chatContainerRef"
          :conversationHistory="conversationHistory"
          :isThinking="isThinking"
          :isLastMessageStopped="isLastMessageStopped"
          :hotTopics="hotTopics"
          :isLoadingTopics="isLoadingTopics"
          @select-question="$emit('select-question', $event)"
          @refresh-topics="$emit('refresh-topics')"
          @scroll="handleScroll"
        />
      </div>

      <!-- 思维过程 -->
      <ThinkingProcess
        v-show="activeTab === 'thinking'"
        ref="thinkingContainerRef"
        :reasoningContent="reasoningContent"
        :isThinking="isThinking"
        @scroll="handleScroll"
      />
    </div>

    <!-- 错误提示 -->
    <div v-if="error" class="mx-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
      <p class="text-sm text-red-700">{{ error }}</p>
    </div>

    <!-- 输入区域 -->
    <ChatInput
      :modelValue="userInput"
      :canSend="!!userInput.trim()"
      :isProcessing="isProcessing"
      :isSearching="isSearching"
      :isTransforming="isTransforming"
      :enableWebSearch="enableWebSearch"
      @update:modelValue="$emit('update:userInput', $event)"
      @update:enableWebSearch="$emit('update:enableWebSearch', $event)"
      @send="$emit('send')"
      @clear="$emit('clear')"
      @optimize="$emit('optimize')"
      @stop="$emit('stop')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChatContainer from './chat/ChatContainer.vue';
import ThinkingProcess from './chat/ThinkingProcess.vue';
import ChatInput from './ChatInput.vue';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

defineProps<{
  conversationHistory: Message[];
  reasoningContent: string;
  isProcessing: boolean;
  isThinking: boolean;
  isLastMessageStopped: boolean;
  error: string | null;
  streamProgress: number;
  userInput: string;
  isSearching: boolean;
  isTransforming: boolean;
  enableWebSearch: boolean;
  hotTopics: string[];
  isLoadingTopics: boolean;
}>();

const emit = defineEmits<{
  'update:userInput': [value: string];
  'update:enableWebSearch': [value: boolean];
  send: [];
  clear: [];
  optimize: [];
  stop: [];
  'select-question': [question: string];
  'refresh-topics': [];
  scroll: [event: Event];
}>();

const activeTab = ref<'output' | 'thinking'>('output');
const chatContainerRef = ref<InstanceType<typeof ChatContainer> | null>(null);
const thinkingContainerRef = ref<InstanceType<typeof ThinkingProcess> | null>(null);

const handleScroll = (event: Event) => {
  emit('scroll', event);
};

defineExpose({
  activeTab,
  chatContainerRef,
  thinkingContainerRef
});
</script>

<template>
  <div class="col-span-1 lg:col-span-2 flex flex-col bg-white rounded-2xl shadow-2xl shadow-zinc-200/50 min-h-[500px] md:min-h-[650px] order-1 lg:order-2 overflow-hidden ring-1 ring-zinc-100">

    <!-- 1. 头部区域：集成视图切换和状态指示 -->
    <div class="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-b border-zinc-100 bg-white/80 backdrop-blur-sm sticky top-0 z-30">
      
      <!-- Segmented Control (分段控制器) -->
      <div class="flex p-1 bg-zinc-100/80 rounded-lg w-full sm:w-auto mb-3 sm:mb-0">
        <button
          @click="activeTab = 'output'"
          class="flex-1 sm:flex-none px-4 py-1.5 text-xs font-bold rounded-md transition-all duration-200 flex items-center justify-center gap-2"
          :class="activeTab === 'output'
            ? 'bg-white text-zinc-900 shadow-sm ring-1 ring-black/5'
            : 'text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200/50'
          "
        >
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
          Chat Output
        </button>

        <button
          @click="activeTab = 'thinking'"
          class="flex-1 sm:flex-none px-4 py-1.5 text-xs font-bold rounded-md transition-all duration-200 flex items-center justify-center gap-2"
          :class="activeTab === 'thinking'
            ? 'bg-white text-zinc-900 shadow-sm ring-1 ring-black/5'
            : 'text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200/50'
          "
        >
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          Debug Log
        </button>
      </div>

      <!-- 进度指示器 (Progress) -->
      <div v-if="isProcessing" class="flex items-center gap-3 w-full sm:w-auto justify-end">
        <span class="text-[10px] font-mono font-medium text-zinc-400 uppercase tracking-widest animate-pulse">
          Generating... {{ streamProgress }}%
        </span>
        <div class="w-24 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
          <div 
            class="h-full bg-zinc-900 rounded-full transition-all duration-300 ease-out" 
            :style="{ width: streamProgress + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <!-- 2. 主内容区域 -->
    <div class="flex-1 overflow-hidden relative bg-zinc-50/30">
      
      <!-- Chat Container -->
      <div v-show="activeTab === 'output'" class="h-full">
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

      <!-- Thinking Process -->
      <div v-show="activeTab === 'thinking'" class="h-full">
        <ThinkingProcess
          ref="thinkingContainerRef"
          :reasoningContent="reasoningContent"
          :isThinking="isThinking"
          @scroll="handleScroll"
        />
      </div>

      <!-- 错误提示 Toast -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
      >
        <div v-if="error" class="absolute bottom-4 left-4 right-4 z-20 mx-auto max-w-lg">
          <div class="flex items-start gap-3 p-4 bg-white border border-red-100 rounded-xl shadow-xl shadow-red-500/5 ring-1 ring-red-500/10">
            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-bold text-zinc-900 mb-0.5">System Error</h4>
              <p class="text-xs text-zinc-500 leading-relaxed">{{ error }}</p>
            </div>
          </div>
        </div>
      </Transition>

    </div>

    <!-- 3. 底部输入区域 -->
    <div class="p-4 bg-white border-t border-zinc-100/50 z-20">
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

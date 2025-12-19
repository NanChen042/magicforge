<template>
  <div class="col-span-1 lg:col-span-2 flex flex-col bg-white rounded-2xl shadow-2xl shadow-zinc-200/50 order-1 lg:order-2 overflow-hidden ring-1 ring-zinc-100 h-full">

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
    <div class="p-3 md:p-4 border-t border-gray-200 bg-gray-50 z-20">
      <div class="flex flex-col">
        <!-- Textarea Input -->
        <div class="relative group w-full">
          <textarea
            id="message-input"
            :value="userInput"
            @input="$emit('update:userInput', ($event.target as HTMLTextAreaElement).value)"
            class="block w-full resize-none bg-white rounded-xl border-0 ring-1 ring-zinc-200 shadow-sm
                   text-sm text-zinc-800 placeholder:text-zinc-400 leading-relaxed
                   focus:ring-2 focus:ring-zinc-900 focus:outline-none focus:shadow-md
                   hover:ring-zinc-300
                   disabled:bg-zinc-50 disabled:text-zinc-400 disabled:cursor-not-allowed
                   min-h-[100px] py-4 pl-4 pr-4 md:pr-36 transition-all duration-200 ease-out
                   custom-scrollbar caret-zinc-900"
            placeholder="Ask me anything..."
            :disabled="isProcessing"
            @keydown.ctrl.enter.prevent="$emit('send')"
            @keydown.meta.enter.prevent="$emit('send')"
          ></textarea>

          <!-- 快捷键提示 -->
          <div class="absolute bottom-3 right-3 hidden md:flex items-center gap-1.5 pointer-events-none select-none transition-opacity duration-200"
               :class="isProcessing ? 'opacity-0' : 'opacity-40 group-focus-within:opacity-100'">
            <kbd class="flex items-center justify-center min-w-[24px] h-6 px-1.5 bg-zinc-100 border-b-2 border-zinc-300 rounded text-[10px] font-mono font-bold text-zinc-500 tracking-tight shadow-sm">
              Ctrl
            </kbd>
            <span class="text-[10px] text-zinc-300 font-bold">+</span>
            <kbd class="flex items-center justify-center min-w-[24px] h-6 px-1.5 bg-zinc-100 border-b-2 border-zinc-300 rounded text-[10px] font-mono font-bold text-zinc-500 tracking-tight shadow-sm">
              Enter
            </kbd>
            <span class="ml-1 text-[10px] text-zinc-400 font-medium tracking-wide uppercase">to Send</span>
          </div>
        </div>

        <!-- Action Buttons Row -->
        <div class="flex flex-wrap md:flex-nowrap justify-between items-center gap-2 mt-3">
          <!-- Clear Button -->
          <div class="w-full md:w-auto order-2 md:order-1">
            <button
              class="w-full md:w-auto inline-flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              title="清空对话"
              @click="$emit('clear')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              <span>清空对话</span>
            </button>
          </div>

          <!-- Right Action Buttons -->
          <div class="w-full md:w-auto order-1 md:order-2 flex flex-wrap gap-3 items-center justify-end">
            <!-- 辅助功能组 -->
            <div class="flex items-center gap-2 mr-1">
              <!-- 联网搜索开关 -->
              <label
                class="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 select-none group"
                :class="enableWebSearch
                  ? 'bg-zinc-900 border-zinc-900 text-white shadow-md shadow-zinc-900/10'
                  : 'bg-white border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50'"
              >
                <input
                  type="checkbox"
                  class="hidden"
                  :checked="enableWebSearch"
                  @change="$emit('update:enableWebSearch', ($event.target as HTMLInputElement).checked)"
                />
                <svg v-if="enableWebSearch" class="h-4 w-4 text-emerald-400 animate-in zoom-in duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <svg v-else class="h-4 w-4 transition-colors duration-200 group-hover:text-zinc-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span class="text-xs font-bold uppercase tracking-wide">Web Search</span>
              </label>

              <!-- 关键词优化按钮 -->
              <button
                v-if="!isProcessing"
                @click="$emit('optimize')"
                :disabled="!userInput.trim() || isTransforming"
                class="flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-200 text-zinc-600 bg-white hover:bg-zinc-50 hover:border-zinc-300 hover:text-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                title="AI Optimize Prompt"
              >
                <svg v-if="isTransforming" class="h-4 w-4 animate-spin text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <svg v-else class="h-4 w-4 group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span class="hidden sm:inline text-xs font-medium">Refine</span>
              </button>
            </div>

            <!-- 主操作按钮 (发送/停止) -->
            <div class="flex items-center">
              <!-- 正在生成 (停止按钮) -->
              <button
                v-if="isProcessing"
                @click="$emit('stop')"
                class="group relative flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:shadow-sm transition-all active:scale-95"
              >
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span class="text-sm font-bold tracking-wide">Stop Generating</span>
              </button>

              <!-- 准备发送 (发送按钮) -->
              <button
                v-else
                @click="$emit('send')"
                :disabled="!userInput.trim() || isSearching"
                class="group relative flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-900 text-white shadow-lg shadow-zinc-900/20 hover:bg-zinc-800 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:bg-zinc-900 disabled:hover:translate-y-0"
              >
                <!-- Loading Spinner (搜索中) -->
                <svg v-if="isSearching" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>

                <!-- Send Icon -->
                <svg v-else class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>

                <span class="text-sm font-bold tracking-wide">
                  {{ isSearching ? 'Searching...' : 'Send' }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChatContainer from './chat/ChatContainer.vue';
import ThinkingProcess from './chat/ThinkingProcess.vue';

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

<style scoped>
/* 隐藏输入框右下角的拖拽图标 */
textarea::-webkit-resizer {
  display: none;
}

/* 自定义滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e4e4e7; /* zinc-200 */
  border-radius: 20px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #d4d4d8; /* zinc-300 */
}
</style>

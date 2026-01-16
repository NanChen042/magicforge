<template>
  <div class="col-span-1 lg:col-span-2 flex flex-col bg-white rounded-2xl shadow-2xl shadow-zinc-200/50 order-1 lg:order-2 overflow-hidden ring-1 ring-zinc-100 h-full">

    <!-- 1. 头部：视图切换和状态 -->
    <div class="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-b border-zinc-100 bg-white/80 backdrop-blur-sm sticky top-0 z-30">
      <div class="flex items-center gap-3 w-full sm:w-auto mb-3 sm:mb-0">
        <!-- 模型类型标签 -->
        <span 
          class="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md"
          :class="getModelTypeBadgeClass()"
        >
          {{ getModelTypeLabel() }}
        </span>
        
        <!-- 模型功能提示 -->
        <span class="hidden lg:inline-flex text-[10px] text-zinc-400 font-medium px-2 py-1 bg-zinc-50 rounded-md">
          {{ getModelFeatureHint() }}
        </span>
      </div>

      <div v-if="isProcessing" class="flex items-center gap-3 w-full sm:w-auto justify-end">
        <span class="text-[10px] font-mono font-medium text-zinc-400 uppercase tracking-widest animate-pulse">
          生成中... {{ streamProgress }}%
        </span>
        <div class="w-24 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
          <div class="h-full bg-zinc-900 rounded-full transition-all duration-300 ease-out" :style="{ width: streamProgress + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- 2. 主内容区域 -->
    <div class="flex-1 overflow-hidden relative bg-zinc-50/30">
      
      <!-- 对话内容 -->
      <div class="chat-container h-full max-h-[650px] relative bg-white" ref="chatContainerRef" @scroll="handleScroll">
        <!-- 背景装饰 -->
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNmNGY0ZjUiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none"></div>
        
        <div class="relative z-10 min-h-full flex flex-col p-6 sm:p-8">
          <!-- 思考状态提示 -->
          <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
            <div v-if="isThinking" class="sticky top-0 z-20 mb-8 mx-auto max-w-fit">
              <div class="relative overflow-hidden flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-zinc-200 shadow-sm ring-1 ring-zinc-900/5">
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-100/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                <div class="relative flex items-center gap-2.5">
                  <div class="flex h-2.5 w-2.5">
                    <span class="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-zinc-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-zinc-900"></span>
                  </div>
                  <span class="text-[10px] font-bold text-zinc-900 uppercase tracking-widest leading-none">AI Processing</span>
                </div>
              </div>
            </div>
          </transition>

          <!-- 消息列表 -->
          <div class="flex-1 space-y-2">
            <MessageItem 
              v-for="(item, index) in conversationHistory" 
              :key="index" 
              :message="item" 
              :index="index" 
              :isLast="index === conversationHistory.length - 1" 
              :isThinking="isThinking" 
              :isStopped="isLastMessageStopped"
              :reasoning="index === conversationHistory.length - 1 && item.role === 'assistant' ? reasoningContent : undefined"
              :isReasoningModel="showReasoningTab"
            />
            
            <!-- 后续问题推荐 -->
            <FollowUpSuggestions
              :suggestions="followUpSuggestions || []"
              :isLoading="isLoadingFollowUp || false"
              :show="showFollowUp || false"
              @select="$emit('select-follow-up', $event)"
              @refresh="$emit('refresh-follow-up')"
            />
          </div>

          <!-- 空状态 -->
          <div v-if="conversationHistory.length === 0" class="flex-1 flex flex-col justify-center">
            <EmptyState 
              :hotTopics="hotTopics" 
              :isLoadingTopics="isLoadingTopics" 
              @select-question="$emit('select-question', $event)" 
              @refresh-topics="$emit('refresh-topics')" 
            />
          </div>
        </div>
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
            <div class="shrink-0 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-bold text-zinc-900 mb-0.5">系统错误</h4>
              <p class="text-xs text-zinc-500 leading-relaxed">{{ error }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- 3. 底部输入区域 -->
    <div class="p-3 md:p-4 border-t border-gray-200 bg-gray-50 z-20">
      <div class="flex flex-col">
        <!-- 图片预览区域 -->
        <div v-if="uploadedImages && uploadedImages.length > 0" class="mb-3 flex flex-wrap gap-2">
          <div 
            v-for="(img, index) in uploadedImages" 
            :key="index"
            class="relative group"
          >
            <img 
              :src="img.preview" 
              :alt="`上传图片 ${index + 1}`"
              class="w-20 h-20 object-cover rounded-lg border border-zinc-200 shadow-sm"
            />
            <button
              @click="$emit('remove-image', index)"
              class="absolute -top-2 -right-2 w-5 h-5 bg-zinc-900 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-500"
              title="移除图片"
            >
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

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
            :placeholder="supportsVision ? '输入你的问题，可上传图片进行视觉分析...' : '输入你的问题...'"
            :disabled="isProcessing"
            @keydown.ctrl.enter.prevent="$emit('send')"
            @keydown.meta.enter.prevent="$emit('send')"
          ></textarea>

          <!-- 快捷键提示 -->
          <div class="absolute bottom-3 right-3 hidden md:flex items-center gap-1.5 pointer-events-none select-none transition-opacity duration-200"
               :class="isProcessing ? 'opacity-0' : 'opacity-40 group-focus-within:opacity-100'">
            <kbd class="flex items-center justify-center min-w-[24px] h-6 px-1.5 bg-zinc-100 border-b-2 border-zinc-300 rounded text-[10px] font-mono font-bold text-zinc-500 tracking-tight shadow-sm">Ctrl</kbd>
            <span class="text-[10px] text-zinc-300 font-bold">+</span>
            <kbd class="flex items-center justify-center min-w-[24px] h-6 px-1.5 bg-zinc-100 border-b-2 border-zinc-300 rounded text-[10px] font-mono font-bold text-zinc-500 tracking-tight shadow-sm">Enter</kbd>
            <span class="ml-1 text-[10px] text-zinc-400 font-medium tracking-wide">发送</span>
          </div>
        </div>

        <!-- Action Buttons Row -->
        <div class="flex flex-wrap md:flex-nowrap justify-between items-center gap-2 mt-3">
          <!-- Left Buttons -->
          <div class="w-full md:w-auto order-2 md:order-1 flex items-center gap-2">
            <!-- Clear Button -->
            <button
              class="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              title="清空对话"
              @click="$emit('clear')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              <span class="hidden sm:inline">清空</span>
            </button>

            <!-- 图片上传按钮 (仅多模态模型显示) -->
            <label
              v-if="supportsVision"
              class="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-violet-300 hover:text-violet-600 transition-colors cursor-pointer"
              :class="{ 'border-violet-400 bg-violet-50 text-violet-600': uploadedImages && uploadedImages.length > 0 }"
              title="上传图片"
            >
              <input
                ref="imageInputRef"
                type="file"
                accept="image/*"
                multiple
                class="hidden"
                @change="handleImageSelect"
                :disabled="isProcessing"
              />
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="hidden sm:inline">{{ uploadedImages && uploadedImages.length > 0 ? `已选 ${uploadedImages.length} 张` : '图片' }}</span>
            </label>
          </div>

          <!-- Right Action Buttons -->
          <div class="w-full md:w-auto order-1 md:order-2 flex flex-wrap gap-3 items-center justify-end">
            <!-- 辅助功能组 -->
            <div class="flex items-center gap-2 mr-1">
              <!-- 关键词优化按钮 -->
              <button
                v-if="!isProcessing"
                @click="$emit('optimize')"
                :disabled="!userInput.trim() || isTransforming"
                class="flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-200 text-zinc-600 bg-white hover:bg-zinc-50 hover:border-zinc-300 hover:text-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                title="AI 优化提示词"
              >
                <svg v-if="isTransforming" class="h-4 w-4 animate-spin text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <svg v-else class="h-4 w-4 group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span class="hidden sm:inline text-xs font-medium">优化</span>
              </button>
            </div>

            <!-- 主操作按钮 (发送/停止) -->
            <div class="flex items-center">
              <button
                v-if="isProcessing"
                @click="$emit('stop')"
                class="group relative flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:shadow-sm transition-all active:scale-95"
              >
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span class="text-sm font-bold tracking-wide">停止生成</span>
              </button>

              <button
                v-else
                @click="$emit('send')"
                :disabled="!userInput.trim()"
                class="group relative flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-900 text-white shadow-lg shadow-zinc-900/20 hover:bg-zinc-800 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:bg-zinc-900 disabled:hover:translate-y-0"
              >
                <svg class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <span class="text-sm font-bold tracking-wide">发送</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import MessageItem from './chat/MessageItem.vue';
import EmptyState from './chat/EmptyState.vue';
import FollowUpSuggestions from './chat/FollowUpSuggestions.vue';

interface Message {
  role: string;
  content: string;
}

interface UploadedImage {
  file: File;
  preview: string;
  base64?: string;
}

const props = defineProps<{
  conversationHistory: Message[];
  reasoningContent: string;
  isProcessing: boolean;
  isThinking: boolean;
  isLastMessageStopped: boolean;
  error: string | null;
  streamProgress: number;
  userInput: string;
  isTransforming: boolean;
  hotTopics: string[];
  isLoadingTopics: boolean;
  showReasoningTab: boolean;
  modelType?: 'chat' | 'reasoning' | 'multimodal' | 'ocr' | 'translate' | 'coder';
  followUpSuggestions?: string[];
  isLoadingFollowUp?: boolean;
  showFollowUp?: boolean;
  supportsVision?: boolean;
  uploadedImages?: UploadedImage[];
}>();

// 是否支持视觉输入
const supportsVision = computed(() => props.supportsVision || props.modelType === 'multimodal');

// 图片输入引用
const imageInputRef = ref<HTMLInputElement | null>(null);

// 处理图片选择
const handleImageSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    emit('upload-images', Array.from(input.files));
    // 清空 input 以便可以重复选择同一文件
    input.value = '';
  }
};

// 根据模型类型获取功能提示
const getModelFeatureHint = () => {
  switch (props.modelType) {
    case 'reasoning':
      return '思考模型：支持深度推理，可查看思维过程';
    case 'multimodal':
      return '视觉模型：支持图像理解，可上传图片分析';
    case 'ocr':
      return 'OCR模型：支持文档识别转Markdown';
    case 'translate':
      return '翻译模型：支持多语种互译';
    case 'coder':
      return '代码模型：专注代码生成与修复';
    default:
      return '对话模型：通用智能对话';
  }
};

// 获取模型类型标签文字
const getModelTypeLabel = () => {
  switch (props.modelType) {
    case 'reasoning':
      return '思考';
    case 'multimodal':
      return '视觉';
    case 'ocr':
      return 'OCR';
    case 'translate':
      return '翻译';
    case 'coder':
      return '代码';
    default:
      return '对话';
  }
};

// 获取模型类型标签样式
const getModelTypeBadgeClass = () => {
  switch (props.modelType) {
    case 'reasoning':
      return 'bg-amber-100 text-amber-700';
    case 'multimodal':
      return 'bg-emerald-100 text-emerald-700';
    case 'ocr':
      return 'bg-orange-100 text-orange-700';
    case 'translate':
      return 'bg-cyan-100 text-cyan-700';
    case 'coder':
      return 'bg-pink-100 text-pink-700';
    default:
      return 'bg-blue-100 text-blue-700';
  }
};

const emit = defineEmits<{
  'update:userInput': [value: string];
  send: [];
  clear: [];
  optimize: [];
  stop: [];
  'select-question': [question: string];
  'refresh-topics': [];
  scroll: [event: Event];
  'select-follow-up': [question: string];
  'refresh-follow-up': [];
  'upload-images': [files: File[]];
  'remove-image': [index: number];
}>();

const chatContainerRef = ref<HTMLElement | null>(null);

const handleScroll = (event: Event) => {
  emit('scroll', event);
};

defineExpose({
  chatContainerRef
});
</script>

<style scoped>
/* 容器滚动 */
.chat-container {
  overflow-y: auto;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: #e4e4e7 transparent;
}

.chat-container::-webkit-scrollbar {
  width: 5px;
}

.chat-container::-webkit-scrollbar-track {
  background: transparent;
  margin: 4px;
}

.chat-container::-webkit-scrollbar-thumb {
  background-color: #e4e4e7;
  border-radius: 20px;
  transition: background-color 0.3s;
}

.chat-container::-webkit-scrollbar-thumb:hover {
  background-color: #d4d4d8;
}

/* 自定义滚动条 */
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

/* 隐藏 textarea 拖拽图标 */
textarea::-webkit-resizer {
  display: none;
}

/* Shimmer 动画 */
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>

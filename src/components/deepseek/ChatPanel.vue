<template>
  <div class="w-full h-full flex flex-col bg-white overflow-hidden min-h-0">

    <!-- 1. 头部：系统配置抽屉唤起按钮 + 模型选择器 + 导出功能 -->
    <div class="flex flex-col sm:flex-row items-center justify-between px-4 py-2.5 border-b border-zinc-200 bg-white sticky top-0 z-30 shrink-0 gap-2">
      <div class="flex items-center gap-1.5 w-full sm:w-auto">
        <!-- 历史边栏视图切换按钮 -->
        <button
          @click="$emit('toggle-sidebar')"
          class="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer shadow-2xs border"
          :class="isSidebarVisible ? 'bg-blue-50/80 text-blue-700 border-blue-200 hover:bg-blue-100/70' : 'bg-white text-zinc-700 border-slate-200 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200'"
          :title="isSidebarVisible ? '收起历史对话' : '展开历史对话'"
        >
          <!-- 侧边栏分栏视图图标 (Sidebar Layout View Icon) -->
          <svg class="h-3.5 w-3.5 shrink-0" :class="isSidebarVisible ? 'text-blue-600' : 'text-zinc-500'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <line x1="9" y1="3" x2="9" y2="21"/>
          </svg>
          <span class="hidden sm:inline">历史对话</span>
        </button>

        <!-- 模型配置面板视图切换按钮 -->
        <button
          @click="$emit('open-settings')"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer shadow-2xs border"
          :class="isDesktopConfigVisible ? 'bg-blue-50/80 text-blue-700 border-blue-200 hover:bg-blue-100/70' : 'bg-white text-zinc-700 border-slate-200 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200'"
          :title="isDesktopConfigVisible ? '收起模型配置' : '展开模型配置'"
        >
          <!-- 面板参数视图图标 (Control Panel View Icon) -->
          <svg class="h-3.5 w-3.5 shrink-0" :class="isDesktopConfigVisible ? 'text-blue-600' : 'text-zinc-500'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <line x1="15" y1="3" x2="15" y2="21"/>
          </svg>
          <span class="hidden sm:inline">模型配置</span>
        </button>

        <div class="h-4 w-[1px] bg-zinc-200 mx-1"></div>

        <!-- 现代化模型选择器组件 (Categorized, Searchable, Rich Metadata) -->
        <ModelSelector
          :model-value="modelName || ''"
          :available-models="availableModels || []"
          :loading="modelsLoading"
          :error="modelLoadError"
          @update:model-value="$emit('update:modelName', $event)"
          @refresh-models="$emit('refresh-models')"
        />
      </div>

      <!-- 右侧操作区：导出与生成状态 -->
      <div class="flex items-center gap-2">
        <!-- 导出对话记录 -->
        <el-dropdown v-if="conversationHistory.length > 0" trigger="click" @command="handleExport">
          <button 
            class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-zinc-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-md transition-colors cursor-pointer shadow-2xs"
            title="导出对话记录"
          >
            <svg class="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span class="hidden sm:inline">导出对话</span>
          </button>
          <template #dropdown>
            <el-dropdown-menu class="p-1 min-w-[150px]">
              <el-dropdown-item command="markdown" class="text-xs">
                <span>导出为 Markdown (.md)</span>
              </el-dropdown-item>
              <el-dropdown-item command="json" class="text-xs">
                <span>导出为 JSON (.json)</span>
              </el-dropdown-item>
              <el-dropdown-item command="text" class="text-xs">
                <span>复制纯文本内容</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <div v-if="isProcessing" class="flex items-center gap-3 w-full sm:w-auto justify-end">
          <span class="text-[10px] font-mono font-medium text-zinc-400 uppercase tracking-widest animate-pulse">
            生成中... {{ streamProgress }}%
          </span>
          <div class="w-24 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
            <div class="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out" :style="{ width: streamProgress + '%' }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. 主内容区域 -->
    <div class="flex-1 overflow-hidden relative">
      <!-- 对话内容 -->
      <div class="chat-container h-full relative bg-white" ref="chatContainerRef" @scroll="handleScroll">
        
        <div class="relative z-10 min-h-full flex flex-col p-4 sm:p-6">
          <!-- 思考状态提示 -->
          <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
            <div v-if="isThinking" class="sticky top-0 z-20 mb-8 mx-auto max-w-fit">
              <div class="relative overflow-hidden flex items-center gap-3 px-4 py-2 bg-white rounded-sm border border-zinc-200 shadow-sm ring-1 ring-zinc-900/5">
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-100/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                <div class="relative flex items-center gap-2.5">
                  <div class="flex h-2.5 w-2.5">
                    <span class="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-blue-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
                  </div>
                  <span class="text-[10px] font-bold text-blue-700 tracking-wide leading-none">AI 正在处理</span>
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
              :isProcessing="isProcessing"
              :isStopped="isLastMessageStopped"
              :reasoning="index === conversationHistory.length - 1 && item.role === 'assistant' ? (reasoningContent || item.reasoning) : item.reasoning"
              :isReasoningModel="showReasoningTab"
              @regenerate="$emit('regenerate')"
              @open-settings="$emit('open-settings')"
              @switch-free-model="$emit('switch-free-model')"
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

      <!-- 回到底部悬浮按钮 -->
      <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-2">
        <button
          v-if="showScrollToBottom"
          @click="scrollToBottom"
          class="absolute bottom-6 right-6 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-600 shadow-md border border-zinc-200/80 hover:text-blue-600 hover:border-blue-200 transition-all cursor-pointer group"
          title="回到底部"
        >
          <svg class="h-4 w-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </transition>
    </div>

    <!-- 3. 底部输入区域 -->
    <div class="p-4 sm:p-6 bg-white/80 backdrop-blur-md border-t border-zinc-100 shrink-0 z-20">
      <div class="max-w-4xl mx-auto">
        
        <!-- 上传的图片预览栏 -->
        <div v-if="uploadedImages && uploadedImages.length > 0" class="mb-3 flex flex-wrap gap-2 p-2 bg-zinc-50 rounded-lg border border-zinc-200">
          <div 
            v-for="(img, idx) in uploadedImages" 
            :key="idx"
            class="relative group w-16 h-16 rounded-md overflow-hidden border border-zinc-300 bg-white shadow-2xs"
          >
            <img :src="img.preview" :alt="img.file.name" class="w-full h-full object-cover" />
            <button
              type="button"
              @click="$emit('remove-image', idx)"
              class="absolute top-0.5 right-0.5 w-4 h-4 bg-zinc-900/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-600"
              title="删除图片"
            >
              <svg class="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <span class="self-center text-xs text-zinc-400 ml-1">{{ uploadedImages.length }}/4 张图片</span>
        </div>

        <div class="relative rounded-2xl border border-zinc-200/90 bg-white shadow-xs transition-all duration-200 focus-within:border-blue-500 focus-within:shadow-sm focus-within:ring-1 focus-within:ring-blue-500/15">
          
          <!-- 隐藏的文件上传 input -->
          <input 
            type="file" 
            ref="fileInputRef" 
            accept="image/*" 
            multiple 
            class="hidden" 
            @change="handleFileInputChange"
          />

          <!-- 文本输入框 -->
          <textarea
            id="message-input"
            ref="inputRef"
            :value="userInput"
            @input="handleInput"
            @keydown.enter.exact.prevent="handleEnter"
            @keydown.enter.shift.exact="handleShiftEnter"
            rows="3"
            placeholder="输入消息，Enter 发送，Shift + Enter 换行..."
            class="w-full resize-none border-0 bg-transparent px-4 pt-3.5 pb-14 text-sm leading-relaxed text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:ring-0 font-sans"
          ></textarea>

          <!-- 底部工具栏 -->
          <div class="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
            <div class="flex items-center gap-1.5 pointer-events-auto">
              <!-- 深度思考 (R1) 快捷开关 (DeepSeek 官方风格) -->
              <button
                type="button"
                @click="toggleReasoningMode"
                class="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer select-none"
                :class="showReasoningTab
                  ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-2xs font-semibold'
                  : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-600 border border-zinc-200/80'"
                :title="showReasoningTab ? '深度思考 (R1) 已开启：将展现完整思维链' : '点击开启深度思考 (R1) 推理模式'"
              >
                <svg class="w-3.5 h-3.5" :class="showReasoningTab ? 'text-blue-600' : 'text-zinc-500'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span>深度思考 (R1)</span>
              </button>

              <!-- 图片上传/识图按钮 -->
              <button
                type="button"
                @click="triggerImageUpload"
                class="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
                title="上传图片（支持多模态视觉模型）"
              >
                <svg class="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="hidden sm:inline">识图</span>
              </button>

              <!-- 优化提示词 -->
              <button
                type="button"
                @click="$emit('optimize')"
                :disabled="isTransforming || !userInput.trim()"
                class="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="优化/扩展当前提示词"
              >
                <svg v-if="!isTransforming" class="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div v-else class="w-3 h-3 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin"></div>
                <span class="hidden sm:inline">优化</span>
              </button>

              <!-- 清空历史 -->
              <button
                v-if="conversationHistory.length > 0"
                type="button"
                @click="$emit('clear')"
                class="flex items-center gap-1 px-2.5 py-1 text-xs text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                title="清空当前对话"
              >
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span class="hidden sm:inline">清空</span>
              </button>
            </div>

            <!-- 发送/停止按钮 -->
            <div class="pointer-events-auto">
              <button
                v-if="isProcessing"
                @click="$emit('stop')"
                class="flex items-center justify-center w-8 h-8 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 transition-all cursor-pointer shadow-sm active:scale-95"
                title="停止生成"
              >
                <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="6" width="12" height="12" rx="2" ry="2"></rect>
                </svg>
              </button>
              <button
                v-else
                @click="$emit('send')"
                :disabled="!userInput.trim()"
                class="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-sm"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <p class="text-center mt-3 text-[10px] text-zinc-400 tracking-wide font-light">内容由人工智能生成，可能不完全准确，仅供参考。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { ElMessage, ElNotification } from 'element-plus';
import MessageItem from './chat/MessageItem.vue';
import EmptyState from './chat/EmptyState.vue';
import FollowUpSuggestions from './chat/FollowUpSuggestions.vue';
import ModelSelector from './ModelSelector.vue';
import { getModelConfig } from '@/constants/modelConfig';

interface Message {
  role: string;
  content: string;
  reasoning?: string;
  images?: string[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    cache_hit_tokens?: number;
  };
}

interface UploadedImage {
  file: File;
  preview: string;
  base64?: string;
}

interface SiliconFlowModel {
  id: string;
  name?: string;
  type?: 'chat' | 'reasoning' | 'multimodal' | 'ocr' | 'translate' | 'coder';
}

const props = defineProps<{
  modelName?: string;
  conversationHistory: Message[];
  reasoningContent: string;
  isProcessing: boolean;
  isThinking: boolean;
  isLastMessageStopped: boolean;
  error: string | null;
  streamProgress: number;
  isDesktopConfigVisible?: boolean;
  isSidebarVisible?: boolean;
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
  availableModels?: SiliconFlowModel[];
  modelsLoading?: boolean;
  modelLoadError?: string;
}>();

const emit = defineEmits<{
  'open-settings': [];
  'toggle-sidebar': [];
  'update:userInput': [value: string];
  'update:modelName': [value: string];
  'send': [];
  'regenerate': [];
  'clear': [];
  'optimize': [];
  'stop': [];
  'select-question': [question: string];
  'refresh-topics': [];
  'scroll': [event: Event];
  'select-follow-up': [question: string];
  'refresh-follow-up': [];
  'upload-images': [files: File[]];
  'remove-image': [index: number];
  'refresh-models': [];
  'switch-free-model': [];
}>();

const currentModelConfig = computed(() => {
  return props.modelName ? getModelConfig(props.modelName) : undefined;
});

const toggleReasoningMode = () => {
  if (props.showReasoningTab) {
    // 切换回快速对话模型
    const fallbackModel = 'Qwen/Qwen2.5-7B-Instruct';
    emit('update:modelName', fallbackModel);
    ElMessage({
      type: 'info',
      message: '已切换为「快速模式」'
    });
  } else {
    // 切换到深度思考模型
    const reasoningModel = 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B';
    emit('update:modelName', reasoningModel);
    ElMessage({
      type: 'success',
      message: '已开启「深度思考 (R1)」推理模式'
    });
  }
};

const inputRef = ref<HTMLTextAreaElement | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);
const showScrollToBottom = ref(false);
const chatContainerRef = ref<HTMLElement | null>(null);

const handleInput = (e: Event) => {
  const target = e.target as HTMLTextAreaElement;
  emit('update:userInput', target.value);
};

const handleEnter = () => {
  if (!props.isProcessing && props.userInput.trim()) {
    emit('send');
  }
};

const handleShiftEnter = () => {
  // Allow default behavior to insert a newline
};

const triggerImageUpload = () => {
  fileInputRef.value?.click();
};

const handleFileInputChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    emit('upload-images', Array.from(target.files));
    target.value = '';
  }
};

const handleScroll = (event: Event) => {
  const container = event.target as HTMLElement;
  const scrollOffset = container.scrollHeight - container.scrollTop - container.clientHeight;
  showScrollToBottom.value = scrollOffset > 120;
  emit('scroll', event);
};

const scrollToBottom = () => {
  if (chatContainerRef.value) {
    chatContainerRef.value.scrollTo({
      top: chatContainerRef.value.scrollHeight,
      behavior: 'smooth'
    });
  }
};

/**
 * 导出对话记录
 */
const handleExport = async (format: 'markdown' | 'json' | 'text') => {
  if (props.conversationHistory.length === 0) return;

  if (format === 'markdown') {
    let mdContent = `# 对话记录 - ${new Date().toLocaleString()}\n\n`;
    props.conversationHistory.forEach((msg) => {
      const roleName = msg.role === 'user' ? '🧑 用户' : '🤖 AI 助手';
      mdContent += `### ${roleName}\n\n`;
      if (msg.reasoning) {
        mdContent += `> **思考过程**:\n> ${msg.reasoning.replace(/\n/g, '\n> ')}\n\n`;
      }
      mdContent += `${msg.content}\n\n---\n\n`;
    });
    downloadFile(mdContent, `chat-export-${Date.now()}.md`, 'text/markdown');
    ElMessage.success('已导出 Markdown 文件');
  } else if (format === 'json') {
    const jsonStr = JSON.stringify(props.conversationHistory, null, 2);
    downloadFile(jsonStr, `chat-export-${Date.now()}.json`, 'application/json');
    ElMessage.success('已导出 JSON 文件');
  } else if (format === 'text') {
    let textContent = '';
    props.conversationHistory.forEach((msg) => {
      textContent += `${msg.role === 'user' ? '用户' : 'AI'}: ${msg.content}\n\n`;
    });
    await navigator.clipboard.writeText(textContent);
    ElMessage.success('已复制对话文本至剪贴板');
  }
};

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const formatErrorTitle = (err: string) => {
  const lower = err.toLowerCase();
  if (lower.includes('insufficient') || lower.includes('balance') || lower.includes('30001')) {
    return '账户额度不足 (Balance Insufficient)';
  }
  if (lower.includes('401') || lower.includes('invalid_api_key')) {
    return 'API 密钥无效或未授权';
  }
  if (lower.includes('timeout') || lower.includes('network')) {
    return '网络连接超时';
  }
  return 'API 接口请求异常';
};

const formatErrorDesc = (err: string) => {
  const lower = err.toLowerCase();
  if (lower.includes('insufficient') || lower.includes('balance') || lower.includes('30001')) {
    return '您的 SiliconFlow (硅基流动) 账户余额不足，请前往平台充值或在配置面板中更换有效的 API Key。';
  }
  if (lower.includes('401') || lower.includes('invalid_api_key')) {
    return '当前填写的 API Key 无法通过平台鉴权，请检查密钥是否正确或已过期。';
  }
  // Try extracting clean message from JSON
  if (err.includes('{')) {
    try {
      const obj = JSON.parse(err.substring(err.indexOf('{')));
      if (obj.message) return obj.message;
    } catch {}
  }
  return err;
};

watch(() => props.error, (newErr) => {
  if (newErr) {
    ElNotification({
      title: formatErrorTitle(newErr),
      message: formatErrorDesc(newErr),
      type: 'error',
      duration: 5000,
      position: 'top-right'
    });
  }
});

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

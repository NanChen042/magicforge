<template>
  <div 
    :class="[
      'flex mb-6 transition-all duration-500 ease-out group w-full',
      message.role === 'user' ? 'justify-end' : 'justify-start'
    ]"
  >
    <div 
      :class="[
        'flex w-full max-w-4xl mx-auto gap-4',
        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
      ]"
    >
      <!-- 头像：仅 AI 显示头像 -->
      <div v-if="message.role !== 'user'" class="shrink-0 mt-0.5 relative">
        <div class="w-8 h-8 rounded-sm overflow-hidden flex items-center justify-center shadow-2xs border border-zinc-200/80 bg-white">
          <img src="@/assets/ai.png" alt="AI Avatar" class="w-full h-full object-cover" />
        </div>
      </div>

      <!-- 消息气泡容器 -->
      <div :class="wrapperClasses">
        
        <!-- 用户消息的图片 -->
        <div v-if="message.role === 'user' && message.images && message.images.length > 0" class="mb-3 flex flex-wrap gap-2">
          <img 
            v-for="(img, idx) in message.images" 
            :key="idx"
            :src="img" 
            :alt="`图片 ${idx + 1}`"
            class="max-w-[200px] max-h-[200px] object-cover rounded-sm border border-white/20 shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
            @click="openImagePreview(img)"
          />
        </div>
        
        <!-- 可折叠的思考过程区域 (ChatGPT / DeepSeek 风格) -->
        <div v-if="hasReasoning || showThinking" class="mb-3">
          <!-- 折叠按钮 -->
          <button 
            @click="toggleReasoning"
            class="w-full flex items-center gap-2 px-3 py-2 rounded-sm transition-all duration-200"
            :class="showThinking 
              ? 'bg-zinc-100 text-zinc-600' 
              : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-700'"
          >
            <!-- 思考中动画 -->
            <div v-if="showThinking" class="flex items-center gap-2">
              <div class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-zinc-600"></span>
              </div>
              <span class="text-xs font-medium">思考中...</span>
            </div>
            
            <!-- 已完成思考 -->
            <div v-else class="flex items-center gap-2">
              <svg class="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span class="text-xs font-medium">已深度思考</span>
              <span class="text-[10px] text-zinc-400">({{ reasoningWordCount }} 字)</span>
            </div>
            
            <!-- 展开/收起图标 -->
            <svg 
              class="w-4 h-4 ml-auto transition-transform duration-200" 
              :class="isReasoningExpanded ? 'rotate-180' : ''"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <!-- 思考内容（可折叠） -->
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-[500px] opacity-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="max-h-[500px] opacity-100"
            leave-to-class="max-h-0 opacity-0"
          >
            <div v-show="isReasoningExpanded" class="overflow-hidden">
              <div class="mt-2 p-3 bg-zinc-50 rounded-sm border border-zinc-100">
                <!-- 思考中骨架屏 -->
                <div v-if="showThinking && !reasoning" class="space-y-2">
                  <div class="h-2 bg-zinc-200 rounded w-3/4 animate-pulse"></div>
                  <div class="h-2 bg-zinc-200 rounded w-full animate-pulse delay-75"></div>
                  <div class="h-2 bg-zinc-200 rounded w-5/6 animate-pulse delay-150"></div>
                </div>
                
                <!-- 思考内容 -->
                <div 
                  v-else 
                  ref="reasoningContainerRef"
                  class="reasoning-content text-xs text-zinc-600 leading-relaxed max-h-[300px] overflow-y-auto custom-scrollbar"
                  v-html="formattedReasoning"
                  @scroll="handleReasoningScroll"
                ></div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- 内容区域 -->
        <div ref="contentContainerRef" v-if="formattedContent" class="message-content" v-html="formattedContent"></div>
        <div v-else-if="message.role === 'assistant' && isProcessing && isLast" class="flex items-center gap-2 text-xs text-zinc-400 py-0.5 font-mono">
          <div class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></div>
          <span class="text-blue-600">生成响应中...</span>
        </div>
        <div v-else-if="message.role === 'assistant' && !isProcessing" class="text-zinc-400 italic text-[13px] py-1">
          [响应内容为空]
        </div>

        <!-- 底部工具栏 (悬停显示) -->
        <div v-if="message.role !== 'user'" class="mt-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200 select-none">
          <div class="flex items-center gap-2">
            <!-- 复制按钮 -->
            <button 
              @click="handleCopy" 
              class="flex items-center gap-1 text-[11px] font-medium transition-colors px-2 py-0.5 rounded hover:bg-slate-100 cursor-pointer"
              :class="copySuccess ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-700'"
              title="复制回答"
            >
              <svg v-if="!copySuccess" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <svg v-else class="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
              <span>{{ copySuccess ? '已复制' : '复制' }}</span>
            </button>

            <!-- 重新生成按钮 (仅最后一条 AI 回答显示) -->
            <button 
              v-if="isLast && !isProcessing"
              @click="$emit('regenerate')" 
              class="flex items-center gap-1 text-[11px] font-medium text-zinc-400 hover:text-blue-600 transition-colors px-2 py-0.5 rounded hover:bg-blue-50 cursor-pointer"
              title="重新生成本次回答"
            >
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>重新生成</span>
            </button>
          </div>
        </div>

        <!-- Token 消耗与缓存命中统计标签 -->
        <div 
          v-if="message.role === 'assistant' && message.usage && (message.usage.total_tokens > 0)" 
          class="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-[11px] text-zinc-400 font-mono select-none"
        >
          <span class="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded border border-slate-100" title="提示词 Token 消耗">
            <span class="text-zinc-500 font-medium">Input:</span> {{ message.usage.prompt_tokens }}
          </span>
          <span class="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded border border-slate-100" title="生成的回答 Token 消耗">
            <span class="text-zinc-500 font-medium">Output:</span> {{ message.usage.completion_tokens }}
          </span>
          <span class="flex items-center gap-1 bg-blue-50/80 text-blue-600 px-2 py-0.5 rounded border border-blue-100" title="本次对话总 Token">
            <span class="font-medium">Total:</span> {{ message.usage.total_tokens }}
          </span>
          <span 
            v-if="message.usage.cache_hit_tokens !== undefined && message.usage.cache_hit_tokens > 0" 
            class="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded border border-emerald-100"
            title="上下文缓存命中 Token 数量"
          >
            <span class="font-medium">Cache Hit:</span> {{ message.usage.cache_hit_tokens }} ({{ Math.round((message.usage.cache_hit_tokens / (message.usage.prompt_tokens || 1)) * 100) }}%)
          </span>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted } from 'vue';
import { formatMarkdown, renderMermaidCharts } from '@/utils/markdown';
import { copyToClipboard, extractPlainText } from '@/utils/clipboard';

interface Message {
  role: string;
  content: string;
  images?: string[]; // 图片预览 URL 列表
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    cache_hit_tokens?: number;
  };
}

const props = defineProps<{
  message: Message;
  index: number;
  isLast: boolean;
  isThinking?: boolean;
  isProcessing?: boolean;
  isStopped?: boolean;
  reasoning?: string;
  isReasoningModel?: boolean; // 是否是支持思考的模型
}>();

defineEmits<{
  'regenerate': [];
}>();

const copySuccess = ref(false);
const isReasoningExpanded = ref(false);
const reasoningContainerRef = ref<HTMLElement | null>(null);
const contentContainerRef = ref<HTMLElement | null>(null);
const shouldAutoScrollReasoning = ref(true);

// 只有支持思考的模型才显示思考状态
const showThinking = computed(() =>
  props.isReasoningModel && props.isThinking && props.message.role === 'assistant' && props.isLast
);

// 是否有思考内容（只有支持思考的模型才显示）
const hasReasoning = computed(() => 
  props.isReasoningModel && props.reasoning && props.reasoning.trim().length > 0
);

// 当正在思考时，自动展开思考区域（仅限支持思考的模型）
watch(() => props.isThinking, (thinking) => {
  if (props.isReasoningModel && props.message.role === 'assistant') {
    if (thinking && props.isLast) {
      isReasoningExpanded.value = true;
      shouldAutoScrollReasoning.value = true;
    } else if (!thinking) {
      // 思考结束后自动收起
      isReasoningExpanded.value = false;
    }
  }
}, { immediate: true });

// 监听 reasoning 内容变化，自动滚动到底部
watch(() => props.reasoning, () => {
  if (shouldAutoScrollReasoning.value && reasoningContainerRef.value) {
    nextTick(() => {
      if (reasoningContainerRef.value) {
        reasoningContainerRef.value.scrollTop = reasoningContainerRef.value.scrollHeight;
      }
    });
  }
});

// 处理思考内容区域的滚动
const handleReasoningScroll = (event: Event) => {
  const container = event.target as HTMLElement;
  const scrollOffset = container.scrollHeight - container.scrollTop - container.clientHeight;
  shouldAutoScrollReasoning.value = scrollOffset < 30;
};

// 思考内容字数
const reasoningWordCount = computed(() => 
  props.reasoning ? props.reasoning.length : 0
);

// 格式化思考内容
const formattedReasoning = computed(() => 
  props.reasoning ? formatMarkdown(props.reasoning) : ''
);

// 切换思考内容展开/收起
const toggleReasoning = () => {
  isReasoningExpanded.value = !isReasoningExpanded.value;
};

const handleCopy = async () => {
  if (copySuccess.value) return;
  const plainText = extractPlainText(formatMarkdown(props.message.content));
  const success = await copyToClipboard(plainText);
  if (success) {
    copySuccess.value = true;
    setTimeout(() => { copySuccess.value = false; }, 2000);
  }
};

// 打开图片预览（新窗口）
const openImagePreview = (imgUrl: string) => {
  window.open(imgUrl, '_blank');
};

const wrapperClasses = computed(() => [
  'relative transition-all duration-200 min-w-0',
  props.message.role === 'user'
    // User: 现代灰底气泡，右对齐展示，无头像
    ? 'bg-zinc-100/80 text-zinc-900 px-5 py-3 rounded-lg rounded-tr-sm max-w-[85%] md:max-w-[75%] ml-auto text-[15px] w-fit'
    // AI: 无边框，纯净正文排版，左对齐
    : 'text-zinc-800 px-1 py-1 text-[15px] leading-relaxed flex-1'
]);

const formattedContent = computed(() => formatMarkdown(props.message.content));

// 监听 Markdown 内容渲染，自动驱动 Mermaid 矢量图解析
watch(formattedContent, () => {
  nextTick(() => {
    if (contentContainerRef.value) {
      renderMermaidCharts(contentContainerRef.value);
    }
  });
}, { immediate: true });

onMounted(() => {
  nextTick(() => {
    if (contentContainerRef.value) {
      renderMermaidCharts(contentContainerRef.value);
    }
  });
});
</script>

<style scoped>
.message-content {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: #18181b;
  font-size: 15px;
  line-height: 1.75;
}

:deep(.katex-block-wrapper) {
  display: block;
  overflow-x: auto;
  padding: 0.5rem 0;
  margin: 0.75rem 0;
}

:deep(.mermaid-diagram-wrapper) {
  width: 100%;
  margin: 1rem 0;
}

:deep(.mermaid-diagram-container) {
  transition: all 0.2s ease;
}
</style>

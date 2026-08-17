<template>
  <div 
    :class="[
      'flex mb-6 transition-all duration-500 ease-out group w-full',
      message.role === 'user' ? 'justify-end' : 'justify-start'
    ]"
  >
    <div 
      :class="[
        'flex w-full max-w-4xl mx-auto gap-3.5',
        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
      ]"
    >
      <!-- 头像：仅 AI 显示头像 -->
      <div v-if="message.role !== 'user'" class="shrink-0 mt-1 relative">
        <div class="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shadow-sm border border-zinc-200/80 bg-white">
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
            class="max-w-[200px] max-h-[200px] object-cover rounded-xs border border-white/20 shadow-xs cursor-pointer hover:opacity-90 transition-opacity"
            @click="openImagePreview(img)"
          />
        </div>
        
        <!-- 可折叠的思考过程区域 (ChatGPT / DeepSeek 风格) -->
        <div v-if="hasReasoning || showThinking" class="mb-3">
          <!-- 折叠按钮 -->
          <button 
            @click="toggleReasoning"
            class="w-full flex items-center gap-2 px-3 py-1.5 rounded-xs transition-all duration-150 font-mono text-xs"
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
              <span class="font-medium">思考中...</span>
            </div>
            
            <!-- 已完成思考 -->
            <div v-else class="flex items-center gap-2">
              <svg class="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span class="font-medium">已深度思考</span>
              <span class="text-[10px] text-zinc-400">({{ reasoningWordCount }} 字)</span>
            </div>
            
            <!-- 展开/收起图标 -->
            <svg 
              class="w-3.5 h-3.5 ml-auto transition-transform duration-200" 
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
              <div class="mt-2 p-3 bg-zinc-50 rounded-xs border border-zinc-100 font-mono">
                <!-- 思考中骨架屏 -->
                <div v-if="showThinking && !reasoning" class="space-y-2">
                  <div class="h-2 bg-zinc-200 rounded-xs w-3/4 animate-pulse"></div>
                  <div class="h-2 bg-zinc-200 rounded-xs w-full animate-pulse delay-75"></div>
                  <div class="h-2 bg-zinc-200 rounded-xs w-5/6 animate-pulse delay-150"></div>
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

        <!-- 1. 错误卡片 (友好错误提示与一键恢复) -->
        <ApiErrorBanner
          v-if="message.isError"
          :code="message.errorCode"
          :message="message.error"
          :show-settings="true"
          :show-retry="true"
          :show-switch-free="message.errorCode === '402'"
          @settings="$emit('open-settings')"
          @retry="$emit('regenerate')"
          @switch-free="$emit('switch-free-model')"
        />

        <!-- 2. 正常内容区域 -->
        <div
          v-else-if="formattedContent"
          ref="contentContainerRef"
          class="message-content"
          :class="{ 'user-message-content': message.role === 'user' }"
          v-html="formattedContent"
        ></div>
        
        <!-- 3. 生成中动画 -->
        <div v-else-if="message.role === 'assistant' && isProcessing && isLast" class="flex items-center gap-2 text-xs text-zinc-400 py-0.5 font-mono">
          <div class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></div>
          <span class="text-blue-600">生成响应中...</span>
        </div>
        
        <!-- 4. 空响应兜底提示 (仅当既没有正文内容，也没有任何思考过程时才显示) -->
        <div v-else-if="message.role === 'assistant' && !isProcessing && !effectiveReasoning" class="text-zinc-400 italic text-xs py-1 flex items-center gap-2">
          <span>[无响应文本]</span>
          <button 
            @click="$emit('regenerate')" 
            class="text-blue-600 not-italic hover:underline cursor-pointer font-medium"
          >
            重新生成
          </button>
        </div>

        <!-- 底部工具栏 -->
        <div v-if="message.role !== 'user' && !message.isError" class="mt-3 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 transition-opacity duration-200 select-none">
          <div class="flex items-center gap-1">
            <!-- 复制按钮 -->
            <button 
              @click="handleCopy" 
              class="flex items-center gap-1 text-xs font-medium transition-colors px-2 py-0.5 rounded hover:bg-slate-100 cursor-pointer"
              :class="copySuccess ? 'text-emerald-700 font-semibold' : 'text-zinc-500 hover:text-zinc-800'"
              title="复制回答"
            >
              <svg v-if="!copySuccess" class="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <svg v-else class="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
              <span>{{ copySuccess ? '已复制' : '复制' }}</span>
            </button>

            <!-- 重新生成按钮 (仅最后一条 AI 回答显示) -->
            <button 
              v-if="isLast && !isProcessing"
              @click="$emit('regenerate')" 
              class="flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-blue-600 hover:bg-blue-50 transition-colors px-2 py-0.5 rounded cursor-pointer"
              title="重新生成本次回答"
            >
              <svg class="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>重新生成</span>
            </button>
          </div>
          <!-- Token 消耗与缓存命中统计：与回答操作保持同一工具栏 -->
          <div
            v-if="message.usage"
            class="ml-auto flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-zinc-400 select-none"
          >
            <span title="提示词 Token 消耗"><span class="text-zinc-500 font-medium">输入</span> {{ message.usage.prompt_tokens }}</span>
            <span class="text-zinc-300" aria-hidden="true">·</span>
            <span title="生成的回答 Token 消耗"><span class="text-zinc-500 font-medium">输出</span> {{ message.usage.completion_tokens }}</span>
            <span class="text-zinc-300" aria-hidden="true">·</span>
            <span class="text-blue-600" title="本次对话总 Token"><span class="font-medium">合计</span> {{ message.usage.total_tokens }}</span>
            <span
              v-if="message.usage.cache_hit_tokens !== undefined && message.usage.cache_hit_tokens > 0"
              class="text-emerald-600"
              title="上下文缓存命中 Token 数量"
            >
              <span class="text-zinc-300" aria-hidden="true">·</span>
              <span class="font-medium">缓存</span> {{ message.usage.cache_hit_tokens }} ({{ Math.round((message.usage.cache_hit_tokens / (message.usage.prompt_tokens || 1)) * 100) }}%)
            </span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted } from 'vue';
import { formatMarkdown, renderMermaidCharts } from '@/utils/markdown';
import { copyToClipboard, extractPlainText } from '@/utils/clipboard';
import ApiErrorBanner from '../../common/ApiErrorBanner.vue';

interface Message {
  role: string;
  content: string;
  reasoning?: string;
  images?: string[];
  isError?: boolean;
  errorCode?: string;
  error?: string;
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
  isReasoningModel?: boolean;
}>();

defineEmits<{
  'regenerate': [];
  'open-settings': [];
  'switch-free-model': [];
}>();

const copySuccess = ref(false);
const isReasoningExpanded = ref(false);
const reasoningContainerRef = ref<HTMLElement | null>(null);
const contentContainerRef = ref<HTMLElement | null>(null);
const shouldAutoScrollReasoning = ref(true);

// 获取生效的推理内容（优先取 props.reasoning，兜底取 message.reasoning）
const effectiveReasoning = computed(() => {
  if (props.reasoning && props.reasoning.trim().length > 0) {
    return props.reasoning;
  }
  return props.message.reasoning || '';
});

// 思考中状态
const showThinking = computed(() =>
  props.isThinking && props.message.role === 'assistant' && props.isLast
);

// 是否包含思考内容（只要 effectiveReasoning 不为空，或者支持思考且正在思考）
const hasReasoning = computed(() => 
  effectiveReasoning.value.trim().length > 0 || (props.isReasoningModel && showThinking.value)
);

watch(() => props.isThinking, (thinking) => {
  if (props.message.role === 'assistant') {
    if (thinking && props.isLast) {
      isReasoningExpanded.value = true;
      shouldAutoScrollReasoning.value = true;
    } else if (!thinking) {
      isReasoningExpanded.value = false;
    }
  }
}, { immediate: true });

watch(effectiveReasoning, () => {
  if (shouldAutoScrollReasoning.value && reasoningContainerRef.value) {
    nextTick(() => {
      if (reasoningContainerRef.value) {
        reasoningContainerRef.value.scrollTop = reasoningContainerRef.value.scrollHeight;
      }
    });
  }
});

const handleReasoningScroll = (event: Event) => {
  const container = event.target as HTMLElement;
  const scrollOffset = container.scrollHeight - container.scrollTop - container.clientHeight;
  shouldAutoScrollReasoning.value = scrollOffset < 20;
};

const toggleReasoning = () => {
  isReasoningExpanded.value = !isReasoningExpanded.value;
  if (isReasoningExpanded.value) {
    shouldAutoScrollReasoning.value = true;
  }
};

const reasoningWordCount = computed(() => {
  return effectiveReasoning.value.trim().length;
});

const formattedReasoning = computed(() => {
  if (!effectiveReasoning.value) return '';
  return formatMarkdown(effectiveReasoning.value);
});

const formattedContent = computed(() => {
  if (!props.message.content) return '';
  return formatMarkdown(props.message.content, {
    streaming: Boolean(props.isProcessing && props.isLast && props.message.role === 'assistant')
  });
});

const renderCharts = () => {
  nextTick(() => {
    if (contentContainerRef.value) {
      renderMermaidCharts(contentContainerRef.value);
    }
  });
};

watch(() => props.message.content, () => {
  renderCharts();
});

onMounted(() => {
  renderCharts();
});

const wrapperClasses = computed(() => {
  const isUser = props.message.role === 'user';
  return [
    'relative text-sm transition-all duration-200',
    isUser
      ? 'inline-flex w-fit max-w-[80%] sm:max-w-[42rem] rounded-lg rounded-tr-sm bg-blue-600 px-3 py-2 !text-white shadow-sm font-medium leading-6'
      : 'px-2 py-2 sm:px-3 sm:py-3 text-zinc-900 leading-relaxed font-sans w-full min-w-0'
  ];
});

const openImagePreview = (imgUrl: string) => {
  window.open(imgUrl, '_blank');
};

const handleCopy = async () => {
  try {
    const textToCopy = extractPlainText(props.message.content);
    await copyToClipboard(textToCopy);
    copySuccess.value = true;
    setTimeout(() => {
      copySuccess.value = false;
    }, 2000);
  } catch (err) {
    console.error('复制失败:', err);
  }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

:deep(.message-content) {
  font-size: 0.9375rem;
  line-height: 1.8;
  color: #1e293b;
  overflow-wrap: anywhere;
}

:deep(.message-content.user-message-content),
:deep(.message-content.user-message-content *) {
  color: #ffffff !important;
}

:deep(.message-content p) {
  margin-bottom: 0.75rem;
}

:deep(.message-content p:last-child) {
  margin-bottom: 0;
}

:deep(.message-content h1),
:deep(.message-content h2),
:deep(.message-content h3),
:deep(.message-content h4) {
  font-weight: 700;
  color: #0f172a;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

:deep(.message-content h1) { font-size: 1.25rem; }
:deep(.message-content h2) { font-size: 1.125rem; }
:deep(.message-content h3) { font-size: 1rem; }

:deep(.message-content h1:first-child),
:deep(.message-content h2:first-child),
:deep(.message-content h3:first-child) {
  margin-top: 0;
}

:deep(.message-content ul),
:deep(.message-content ol) {
  margin-left: 1.25rem;
  margin-bottom: 0.75rem;
}

:deep(.message-content ul) {
  list-style-type: disc;
}

:deep(.message-content ol) {
  list-style-type: decimal;
}

:deep(.message-content li) {
  margin-bottom: 0.25rem;
}

:deep(.message-content .markdown-table-wrap) {
  width: 100%;
  overflow-x: auto;
  margin: 1.25rem 0 1.5rem;
}

:deep(.message-content .markdown-table) {
  width: 100%;
  min-width: 34rem;
  border-collapse: collapse;
  font-size: 0.875rem;
  line-height: 1.6;
  text-align: left;
  border: 1px solid #dbe3ee;
}

:deep(.message-content .markdown-table th) {
  padding: 0.65rem 0.75rem;
  background: #f8fafc;
  color: #334155;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  white-space: nowrap;
  border-bottom: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
}

:deep(.message-content .markdown-table td) {
  padding: 0.65rem 0.75rem;
  color: #475569;
  vertical-align: top;
  border-bottom: 1px solid #f1f5f9;
  border-right: 1px solid #f1f5f9;
}

:deep(.message-content .markdown-table th:last-child),
:deep(.message-content .markdown-table td:last-child) {
  border-right: 0;
}

:deep(.message-content .markdown-table tbody tr:last-child td) {
  border-bottom: 0;
}

:deep(.message-content .markdown-table tbody tr:nth-child(even)) {
  background: #fbfcfe;
}

:deep(.message-content .markdown-table tbody tr) {
  transition: background-color 150ms ease;
}

:deep(.message-content .markdown-table tbody tr:hover) {
  background: #f1f5f9;
}

:deep(.message-content .markdown-table td:first-child) {
  color: #1e293b;
  font-weight: 600;
}

:deep(.message-content .markdown-table p) {
  margin: 0;
}

:deep(.message-content hr) {
  height: 1px;
  margin: 1.5rem 0;
  border: 0;
  background: #e5e7eb;
}

:deep(.message-content code) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.8125rem;
  background-color: #f1f5f9;
  color: #0f172a;
  padding: 0.15rem 0.35rem;
  border-radius: 0.25rem;
  border: 1px solid #e2e8f0;
}

:deep(.message-content pre) {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  border-radius: 0.5rem;
  overflow-x: auto;
}

:deep(.message-content pre code) {
  background-color: transparent;
  padding: 0;
  border: none;
}

:deep(.message-content blockquote) {
  border-left: 3px solid #cbd5e1;
  padding-left: 0.75rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  color: #64748b;
  font-style: italic;
}
</style>

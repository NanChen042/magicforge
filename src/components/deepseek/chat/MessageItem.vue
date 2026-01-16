<template>
  <div
    :class="[
      'flex mb-6 transition-all duration-500 ease-out group',
      message.role === 'user' ? 'justify-end' : 'justify-start'
    ]"
  >
    <div
      :class="[
        'flex max-w-[90%] md:max-w-[80%] gap-4',
        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
      ]"
    >
      <!-- 头像：复用 Welcome 页面的圆润方块风格 -->
      <div class="shrink-0 mt-0.5 relative">
        <!-- 装饰背景光 (仅 AI) -->
        <div v-if="message.role !== 'user'" class="absolute -inset-2 bg-zinc-200/50 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div 
          :class="[
            'w-9 h-9 rounded-xl flex items-center justify-center shadow-md ring-1 transition-transform duration-300',
            message.role === 'user' 
              ? 'bg-white ring-black/5' 
              : 'bg-linear-to-br from-zinc-900 to-zinc-700 ring-black/5 text-white shadow-zinc-900/20'
          ]"
        >
          <img v-if="message.role === 'user'" src="@/assets/user.jpg" alt="User" class="w-full h-full object-cover rounded-xl opacity-90" />
          
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>

      <!-- 消息气泡 -->
      <div :class="wrapperClasses">
        
        <!-- 用户消息的图片 -->
        <div v-if="message.role === 'user' && message.images && message.images.length > 0" class="mb-3 flex flex-wrap gap-2">
          <img 
            v-for="(img, idx) in message.images" 
            :key="idx"
            :src="img" 
            :alt="`图片 ${idx + 1}`"
            class="max-w-[200px] max-h-[200px] object-cover rounded-lg border border-white/20 shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
            @click="openImagePreview(img)"
          />
        </div>
        
        <!-- 可折叠的思考过程区域 (ChatGPT 风格) -->
        <div v-if="hasReasoning || showThinking" class="mb-3">
          <!-- 折叠按钮 -->
          <button 
            @click="toggleReasoning"
            class="w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200"
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
              <div class="mt-2 p-3 bg-zinc-50 rounded-lg border border-zinc-100">
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
        <div class="message-content" v-html="formattedContent"></div>

        <!-- 底部工具栏 (悬停显示) -->
        <div v-if="message.role !== 'user'" class="mt-2 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 select-none">
          <button 
            @click="handleCopy" 
            class="flex items-center gap-1.5 text-[11px] font-medium transition-colors"
            :class="copySuccess ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-700'"
          >
            <svg v-if="!copySuccess" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <svg v-else class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
            <span>{{ copySuccess ? '已复制' : '复制' }}</span>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue';
import { formatMarkdown } from '@/utils/markdown';
import { copyToClipboard, extractPlainText } from '@/utils/clipboard';

interface Message {
  role: string;
  content: string;
  images?: string[]; // 图片预览 URL 列表
}

const props = defineProps<{
  message: Message;
  index: number;
  isLast: boolean;
  isThinking?: boolean;
  isStopped?: boolean;
  reasoning?: string;
  isReasoningModel?: boolean; // 是否是支持思考的模型
}>();

const copySuccess = ref(false);
const isReasoningExpanded = ref(false);
const reasoningContainerRef = ref<HTMLElement | null>(null);
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
  if (props.isReasoningModel && thinking && props.isLast && props.message.role === 'assistant') {
    isReasoningExpanded.value = true;
    shouldAutoScrollReasoning.value = true;
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
  // 如果用户手动滚动离开底部，禁用自动滚动
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
  'relative px-5 py-3.5 text-sm leading-7 transition-all duration-200 shadow-sm',
  props.message.role === 'user'
    // User: 深色渐变背景，白色文字，完全复用 Hero Logo 的质感
    ? 'bg-gradient-to-br from-zinc-900 to-zinc-700 text-white rounded-2xl rounded-tr-md shadow-zinc-900/10 ring-1 ring-black/5'
    
    // AI: 白色卡片背景，深灰文字，复用 Suggestions 的质感
    // ring-zinc-900/5 是关键，它提供了那个“高级感”的极细边框
    : 'bg-white text-zinc-800 rounded-2xl rounded-tl-md ring-1 ring-zinc-900/5'
]);

const formattedContent = computed(() => formatMarkdown(props.message.content));
</script>

<style scoped>
/* 
  Style System: Zinc (Vercel-like)
  Target: Clean, High Contrast, Fine Details
*/

.message-content {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px; /* 14px 紧凑 */
  line-height: 1.65;
}

/* 标题 - 使用 Zinc-900 加粗 */
.message-content :deep(h1),
.message-content :deep(h2),
.message-content :deep(h3) {
  font-weight: 700;
  color: #18181b; /* Zinc-900 */
  margin: 1.5em 0 0.75em 0;
  letter-spacing: -0.025em; /* Tight tracking */
}
.message-content :deep(h1) { font-size: 1.4em; }
.message-content :deep(h2) { font-size: 1.25em; }

/* 链接 - 黑色加下划线，经典极简 */
.message-content :deep(a) {
  color: #18181b;
  font-weight: 500;
  text-decoration: underline;
  text-decoration-color: #d4d4d8; /* Zinc-300 */
  text-underline-offset: 3px;
  transition: all 0.2s;
}
.message-content :deep(a:hover) {
  text-decoration-color: #18181b;
  background: #f4f4f5;
}

/* 列表 */
.message-content :deep(ul),
.message-content :deep(ol) {
  margin: 0.75em 0;
  padding-left: 1.5em;
  list-style-position: outside;
}
.message-content :deep(ul) {
  list-style-type: disc;
}
.message-content :deep(ol) {
  list-style-type: decimal;
}
.message-content :deep(li) {
  margin: 0.25em 0;
  padding-left: 0.25em;
}
.message-content :deep(li::marker) { 
  color: #71717a; /* Zinc-500 */
}

/* 引用块 - 左侧细灰线 */
.message-content :deep(blockquote) {
  border-left: 3px solid #e4e4e7; /* Zinc-200 */
  margin: 1em 0;
  padding-left: 1em;
  font-style: italic;
  color: #52525b; /* Zinc-600 */
}

/* 行内代码 - 浅灰背景，深色文字 */
.message-content :deep(code:not(pre code)) {
  background: #f4f4f5; /* Zinc-100 */
  color: #18181b; /* Zinc-900 */
  padding: 0.2em 0.4em;
  border-radius: 6px;
  font-size: 0.85em;
  font-family: 'JetBrains Mono', monospace;
  border: 1px solid #e4e4e7; /* Zinc-200 */
}

/* 
  代码块 - 模拟 Mac 窗口风格 (轻量版)
  背景不要太黑，使用 Zinc-900
*/
.message-content :deep(.code-block-wrapper) {
  margin: 1.25em 0;
  background: #18181b; /* Zinc-900 */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #000;
}

.message-content :deep(.code-block-header) {
  padding: 8px 16px;
  background: #27272a; /* Zinc-800 */
  border-bottom: 1px solid #3f3f46;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.message-content :deep(.code-lang-label) {
  color: #a1a1aa;
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
}

.message-content :deep(.code-block) {
  padding: 16px;
  color: #e4e4e7; /* Zinc-200 */
  font-size: 13px;
  background: #18181b;
  overflow-x: auto;
}

.message-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
  font-size: 0.95em;
}
.message-content :deep(th) {
  border-bottom: 2px solid #e4e4e7;
  padding: 8px;
  text-align: left;
  color: #18181b;
  font-weight: 600;
}
.message-content :deep(td) {
  border-bottom: 1px solid #f4f4f5;
  padding: 8px;
  color: #52525b;
}

/* User 模式下的特殊样式覆盖 (因为背景是黑色的) */
.group:has(.justify-end) .message-content {
  color: #ffffff;
}
.group:has(.justify-end) .message-content :deep(h1),
.group:has(.justify-end) .message-content :deep(h2),
.group:has(.justify-end) .message-content :deep(a) {
  color: #ffffff;
}
.group:has(.justify-end) .message-content :deep(code:not(pre code)) {
  background: rgba(255,255,255,0.2);
  border-color: rgba(255,255,255,0.3);
  color: #fff;
}

/* 思考内容区域样式 */
.reasoning-content {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.reasoning-content :deep(p) {
  margin: 0.5em 0;
}

.reasoning-content :deep(ul),
.reasoning-content :deep(ol) {
  margin: 0.5em 0;
  padding-left: 1.25em;
}

/* 自定义滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #d4d4d8;
  border-radius: 20px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #a1a1aa;
}
</style>

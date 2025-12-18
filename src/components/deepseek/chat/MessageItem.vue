<template>
  <div
    :class="[
      'flex mb-8 transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-2',
      message.role === 'user' ? 'justify-end' : 'justify-start'
    ]"
  >
    <div
      :class="[
        'flex max-w-[90%] md:max-w-[85%] gap-4',
        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
      ]"
    >
      <!-- 头像 -->
      <div class="flex-shrink-0 mt-1">
        <div v-if="message.role === 'user'" class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-purple-200">
          <img src="@/assets/user.jpg" alt="User" class="w-full h-full object-cover" />
        </div>
        <div v-else class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-lg">
          🤖
        </div>
      </div>

      <div :class="wrapperClasses">
        <!-- 角色标签：仅在 AI 回复时显示 -->
        <div v-if="message.role !== 'user'" :class="roleLabelClasses">
          <span class="w-1.5 h-1.5 rounded-full bg-zinc-300 mr-2"></span>
          AI Assistant
        </div>

        <ThinkingIndicator v-if="showThinking" />
        <StoppedIndicator v-if="showStopped" />

        <!-- 内容区域 -->
        <div :class="contentClasses" v-html="formattedContent"></div>

        <!-- 底部工具栏：复制按钮 -->
        <div class="mt-3 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            @click="handleCopy"
            :class="[
              'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 border',
              copySuccess
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                : 'bg-transparent text-zinc-400 border-transparent hover:bg-zinc-100 hover:text-zinc-900 active:scale-95'
            ]"
            :title="copySuccess ? '复制成功' : '复制内容'"
          >
            <Transition
              mode="out-in"
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 scale-50"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-50"
            >
              <svg v-if="!copySuccess" class="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>

              <svg v-else class="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </Transition>

            <span v-if="copySuccess" class="animate-in fade-in duration-200">
              Copied
            </span>
            <span v-else class="hidden sm:inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100">
              Copy
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ThinkingIndicator from './ThinkingIndicator.vue';
import StoppedIndicator from './StoppedIndicator.vue';
import { formatMarkdown } from '@/utils/markdown';
import { copyToClipboard, extractPlainText } from '@/utils/clipboard';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const props = defineProps<{
  message: Message;
  index: number;
  isLast: boolean;
  isThinking?: boolean;
  isStopped?: boolean;
}>();

const copySuccess = ref(false);

const showThinking = computed(() =>
  props.isThinking && props.message.role === 'assistant' && props.isLast
);

const showStopped = computed(() =>
  props.isStopped && props.message.role === 'assistant' && props.isLast
);

const handleCopy = async () => {
  if (copySuccess.value) return;

  const plainText = extractPlainText(formatMarkdown(props.message.content));
  const success = await copyToClipboard(plainText);

  if (success) {
    copySuccess.value = true;
    setTimeout(() => {
      copySuccess.value = false;
    }, 2000);
  }
};

// 外层容器样式
const wrapperClasses = computed(() => [
  'relative group px-5 py-4 text-[15px] leading-relaxed transition-shadow duration-300',
  props.message.role === 'user'
    ? 'bg-zinc-900 text-zinc-50 rounded-2xl rounded-tr-sm shadow-xl shadow-zinc-900/10' // 用户：深黑，右上角直角
    : 'bg-white text-zinc-800 rounded-2xl rounded-tl-sm ring-1 ring-zinc-100 shadow-sm' // 模型：纯白，左上角直角
]);

// 角色标签样式
const roleLabelClasses = computed(() => 'flex items-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3 select-none');

// 内容排版样式 (核心)
const contentClasses = computed(() => [
  'prose max-w-none break-words', // 基础
  
  // 针对不同角色的颜色微调
  props.message.role === 'user' 
    ? 'prose-invert text-zinc-100' // 用户：反色模式
    : 'prose-zinc text-zinc-700',  // 模型：锌灰色系

  // 通用排版优化
  '[&>p]:leading-7 [&>p]:my-3', // 增加行高，提升阅读舒适度
  '[&>:first-child]:mt-0',
  '[&>:last-child]:mb-0',
  
  // 列表
  '[&>ul]:my-3 [&>ul]:list-disc [&>ul]:pl-4',
  '[&>ol]:my-3 [&>ol]:list-decimal [&>ol]:pl-4',
  '[&>li]:my-1.5 [&>li]:pl-1',

  // 引用块 (Blockquote) - 模仿 Notion 风格
  props.message.role === 'user'
    ? '[&>blockquote]:border-l-2 [&>blockquote]:border-zinc-500 [&>blockquote]:pl-4 [&>blockquote]:text-zinc-300 [&>blockquote]:italic'
    : '[&>blockquote]:border-l-2 [&>blockquote]:border-zinc-900 [&>blockquote]:pl-4 [&>blockquote]:text-zinc-500 [&>blockquote]:italic',

  // 代码块 (Pre) - 统一使用深色背景，增强专业感
  '[&>pre]:my-4 [&>pre]:bg-[#1e1e20] [&>pre]:text-zinc-300 [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:shadow-inner [&>pre]:border [&>pre]:border-white/5',
  
  // 标题
  '[&>h1]:text-lg [&>h1]:font-bold [&>h1]:my-6 [&>h1]:leading-tight',
  '[&>h2]:text-base [&>h2]:font-bold [&>h2]:my-5 [&>h2]:leading-snug',
  '[&>h3]:text-sm [&>h3]:font-bold [&>h3]:my-4',

  // 内联代码 (Code)
  '[&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded-md [&>code]:text-[13px] [&>code]:font-mono',
  props.message.role === 'user'
    ? '[&>code]:bg-zinc-800 [&>code]:text-zinc-200' // 用户气泡内的代码背景
    : '[&>code]:bg-zinc-100 [&>code]:text-zinc-900 [&>code]:font-medium border border-zinc-200/50', // 模型气泡内的代码背景

  // 链接
  props.message.role === 'user'
    ? '[&>a]:text-blue-300 [&>a]:underline [&>a]:underline-offset-2'
    : '[&>a]:text-indigo-600 [&>a]:font-medium [&>a]:underline [&>a]:underline-offset-2 hover:[&>a]:text-indigo-500'
]);

const formattedContent = computed(() => formatMarkdown(props.message.content));
</script>

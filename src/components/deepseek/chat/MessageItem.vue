<template>
  <div :class="['flex mb-6', message.role === 'user' ? 'justify-end' : 'justify-start']">
    <div :class="['flex max-w-[85%] gap-3', message.role === 'user' ? 'flex-row-reverse' : 'flex-row']">
      <MessageAvatar :role="message.role" />

      <div :class="messageClasses">
        <div :class="roleLabelClasses">
          {{ message.role === 'user' ? '您' : '模型' }}
        </div>

        <ThinkingIndicator v-if="showThinking" />
        <StoppedIndicator v-if="showStopped" />

        <div :class="contentClasses" v-html="formattedContent"></div>

        <CopyButton :content="message.content" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import MessageAvatar from './MessageAvatar.vue';
import ThinkingIndicator from './ThinkingIndicator.vue';
import StoppedIndicator from './StoppedIndicator.vue';
import CopyButton from './CopyButton.vue';
import { formatMarkdown } from '@/utils/markdown';

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

const showThinking = computed(() =>
  props.isThinking && props.message.role === 'assistant' && props.isLast
);

const showStopped = computed(() =>
  props.isStopped && props.message.role === 'assistant' && props.isLast
);

const messageClasses = computed(() => [
  'relative group rounded-2xl px-4 py-3 text-[15px] leading-6',
  props.message.role === 'user'
    ? 'bg-purple-600 text-white rounded-tr-none'
    : 'bg-white-100 text-gray-800 rounded-tl-none border border-gray-200 border-solid'
]);

const roleLabelClasses = computed(() => [
  'text-xs font-medium mb-1',
  props.message.role === 'user' ? 'text-purple-100' : 'text-gray-500'
]);

const contentClasses = computed(() => [
  'prose prose-sm max-w-none',
  props.message.role === 'user' ? 'prose-invert' : 'prose-gray',
  '[&>:first-child]:mt-0',
  '[&>:last-child]:mb-0',
  '[&>p]:my-3',
  '[&>ul]:my-3 [&>ul>li]:my-1',
  '[&>ol]:my-3 [&>ol>li]:my-1',
  '[&>blockquote]:my-3 [&>blockquote]:border-l-4 [&>blockquote]:pl-3 [&>blockquote]:italic',
  '[&>pre]:my-3 [&>pre]:bg-gray-800/5 [&>pre]:p-3 [&>pre]:rounded-lg',
  '[&>h1]:text-lg [&>h1]:font-semibold [&>h1]:my-4',
  '[&>h2]:text-base [&>h2]:font-semibold [&>h2]:my-3',
  '[&>h3]:text-sm [&>h3]:font-semibold [&>h3]:my-2',
  '[&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm',
  props.message.role === 'user'
    ? '[&>code]:bg-purple-500/30 [&>blockquote]:border-purple-400/50'
    : '[&>code]:bg-gray-200 [&>blockquote]:border-gray-300'
]);

const formattedContent = computed(() => formatMarkdown(props.message.content));
</script>

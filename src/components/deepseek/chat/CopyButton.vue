<template>
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
    <!-- 使用 Transition 实现图标丝滑切换 -->
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

    <!-- 复制成功时显示文字标签，增加反馈清晰度 -->
    <span v-if="copySuccess" class="animate-in fade-in duration-200">
      Copied
    </span>
    <span v-else class="hidden sm:inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100">
      Copy
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { copyToClipboard, extractPlainText } from '@/utils/clipboard';
import { formatMarkdown } from '@/utils/markdown';

const props = defineProps<{
  content: string;
}>();

const copySuccess = ref(false);

const handleCopy = async () => {
  // 防止重复点击
  if (copySuccess.value) return;

  const plainText = extractPlainText(formatMarkdown(props.content));
  const success = await copyToClipboard(plainText);
  
  if (success) {
    copySuccess.value = true;
    setTimeout(() => {
      copySuccess.value = false;
    }, 2000); // 2秒后恢复，比3秒更利落
  }
};
</script>

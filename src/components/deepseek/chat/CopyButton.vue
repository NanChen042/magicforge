<template>
  <button
    @click="handleCopy"
    class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 rounded-lg hover:bg-black/5 text-gray-500 hover:text-gray-700"
    :title="copySuccess ? '复制成功！' : '复制内容'"
  >
    <svg v-if="!copySuccess" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
    </svg>
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
  const plainText = extractPlainText(formatMarkdown(props.content));
  const success = await copyToClipboard(plainText);

  if (success) {
    copySuccess.value = true;
    setTimeout(() => {
      copySuccess.value = false;
    }, 3000);
  }
};
</script>

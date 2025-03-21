import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePromptStore = defineStore('prompt', () => {
  // 状态
  const promptText = ref('');

  // 操作
  function setPromptText(text: string) {
    promptText.value = text;
  }

  function clearPromptText() {
    promptText.value = '';
  }

  return {
    promptText,
    setPromptText,
    clearPromptText
  };
});

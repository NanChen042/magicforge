<template>
  <div class="relative mb-2">
    <textarea
      id="message-input"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      class="block w-full resize-none border border-gray-300 rounded-xl px-3 md:px-4 py-2 md:py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm min-h-[80px] md:min-h-[100px] pr-12 transition-shadow shadow-sm hover:shadow"
      placeholder="请输入您的问题或需求..."
      :disabled="disabled"
      @keyup.ctrl.enter="$emit('send')"
    ></textarea>
    <div class="absolute bottom-3 right-3 hidden md:flex items-center gap-2 text-xs text-gray-400">
      <kbd class="px-2 py-1 bg-white rounded border border-gray-300 shadow-sm">Ctrl</kbd>
      <span>+</span>
      <kbd class="px-2 py-1 bg-white rounded border border-gray-300 shadow-sm">Enter</kbd>
      <span>发送</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  disabled: boolean;
}>();

defineEmits<{
  'update:modelValue': [value: string];
  send: [];
}>();
</script>

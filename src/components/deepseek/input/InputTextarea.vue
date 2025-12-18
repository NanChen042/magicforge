<template>
  <div class="relative group w-full">
    
    <textarea
      id="message-input"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      class="block w-full resize-none bg-white rounded-xl border-0 ring-1 ring-zinc-200 shadow-sm 
             text-sm text-zinc-800 placeholder:text-zinc-400 leading-relaxed
             focus:ring-2 focus:ring-zinc-900 focus:outline-none focus:shadow-md
             hover:ring-zinc-300
             disabled:bg-zinc-50 disabled:text-zinc-400 disabled:cursor-not-allowed
             min-h-[100px] py-4 pl-4 pr-4 md:pr-36 transition-all duration-200 ease-out
             custom-scrollbar caret-zinc-900"
      placeholder="Ask me anything..."
      :disabled="disabled"
      @keydown.ctrl.enter.prevent="$emit('send')"
      @keydown.meta.enter.prevent="$emit('send')"
    ></textarea>

    <!-- 快捷键提示：模拟键盘键帽风格 -->
    <div class="absolute bottom-3 right-3 hidden md:flex items-center gap-1.5 pointer-events-none select-none transition-opacity duration-200"
         :class="disabled ? 'opacity-0' : 'opacity-40 group-focus-within:opacity-100'">
      
      <kbd class="flex items-center justify-center min-w-[24px] h-6 px-1.5 bg-zinc-100 border-b-2 border-zinc-300 rounded text-[10px] font-mono font-bold text-zinc-500 tracking-tight shadow-sm">
        Ctrl
      </kbd>
      <span class="text-[10px] text-zinc-300 font-bold">+</span>
      <kbd class="flex items-center justify-center min-w-[24px] h-6 px-1.5 bg-zinc-100 border-b-2 border-zinc-300 rounded text-[10px] font-mono font-bold text-zinc-500 tracking-tight shadow-sm">
        Enter
      </kbd>
      
      <span class="ml-1 text-[10px] text-zinc-400 font-medium tracking-wide uppercase">to Send</span>
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

<style scoped>
/* 隐藏输入框右下角的拖拽图标（如果是 webkit） */
textarea::-webkit-resizer {
  display: none;
}

/* 自定义滚动条，融入黑白风格 */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e4e4e7; /* zinc-200 */
  border-radius: 20px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #d4d4d8; /* zinc-300 */
}
</style>

<template>
  <div class="chat-container h-full max-h-[650px] relative bg-white" ref="containerRef" @scroll="handleScroll">

    <!-- 背景装饰：极其微弱的网格背景，增加质感 -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNmNGY0ZjUiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none"></div>

    <div class="relative z-10 min-h-full flex flex-col p-6 sm:p-8">

      <!-- 思考提示：重构为系统状态栏风格 -->
      <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
        <div v-if="isThinking" class="sticky top-0 z-20 mb-8 mx-auto max-w-fit">
          <div class="relative overflow-hidden flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-zinc-200 shadow-sm ring-1 ring-zinc-900/5">
            <!-- 流光动画背景 -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-100/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>

            <div class="relative flex items-center gap-2.5">
              <div class="flex h-2.5 w-2.5">
                <span class="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-zinc-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-zinc-900"></span>
              </div>
              <div class="flex flex-col">
                <span class="text-[10px] font-bold text-zinc-900 uppercase tracking-widest leading-none">AI Processing</span>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- 消息列表 -->
      <div class="flex-1 space-y-2">
        <MessageItem v-for="(item, index) in conversationHistory" :key="index" :message="item" :index="index" :isLast="index === conversationHistory.length - 1" :isThinking="isThinking" :isStopped="isLastMessageStopped" />
      </div>

      <!-- 空状态 -->
      <div v-if="conversationHistory.length === 0" class="flex-1 flex flex-col justify-center">
        <EmptyState :hotTopics="hotTopics" :isLoadingTopics="isLoadingTopics" @select-question="$emit('select-question', $event)" @refresh-topics="$emit('refresh-topics')" />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MessageItem from "./MessageItem.vue";
import EmptyState from "./EmptyState.vue";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

defineProps<{
  conversationHistory: Message[];
  isThinking: boolean;
  isLastMessageStopped: boolean;
  hotTopics: string[];
  isLoadingTopics: boolean;
}>();

const emit = defineEmits<{
  "select-question": [question: string];
  "refresh-topics": [];
  scroll: [event: Event];
}>();

const containerRef = ref<HTMLElement | null>(null);

const handleScroll = (event: Event) => {
  emit("scroll", event);
};

defineExpose({
  containerRef,
});
</script>

<style scoped>
/* 容器基础滚动行为 */
.chat-container {
  overflow-y: auto;
  scroll-behavior: smooth;
  /* 隐藏 Firefox 滚动条，使用自定义样式 */
  scrollbar-width: thin;
  scrollbar-color: #e4e4e7 transparent;
}

/* Webkit (Chrome, Safari, Edge) 自定义滚动条 */
.chat-container::-webkit-scrollbar {
  width: 5px;
}

.chat-container::-webkit-scrollbar-track {
  background: transparent;
  margin: 4px;
}

.chat-container::-webkit-scrollbar-thumb {
  background-color: #e4e4e7; /* zinc-200 */
  border-radius: 20px;
  transition: background-color 0.3s;
}

.chat-container::-webkit-scrollbar-thumb:hover {
  background-color: #d4d4d8; /* zinc-300 */
}

/* Shimmer 动画定义 */
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>

<template>
  <div class="flex flex-col items-center justify-center min-h-full p-8 text-center">
    <div class="w-20 h-20 rounded-full bg-indigo-50/30 flex items-center justify-center mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-indigo-300" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
      </svg>
    </div>
    <p class="text-xl font-semibold text-indigo-600 mb-2">
      开始提问，探索AI的能力
    </p>
    <p class="text-gray-600 mb-8 max-w-md">
      输入您的问题，体验AI的智能对话能力
    </p>

    <!-- 示例问题部分 -->
    <div class="space-y-6 w-full max-w-2xl">
      <!-- 热门话题区域 -->
      <div>
        <div class="flex items-center gap-2 mb-3">
          <div class="bg-red-100 p-1.5 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-sm font-medium text-gray-700">热门话题</h3>
          <button @click="$emit('refresh-topics')" class="ml-auto text-xs text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
            </svg>
            <span>刷新</span>
          </button>
        </div>
        <div v-if="isLoadingTopics" class="flex justify-center py-4">
          <div class="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button
            v-for="(topic, index) in hotTopics"
            :key="index"
            @click="$emit('select-question', topic)"
            class="w-full px-3 py-2 text-left bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-lg hover:shadow-sm transition-all overflow-hidden text-xs text-gray-700 hover:from-red-100 hover:to-orange-100"
          >
            <div class="flex items-center gap-1.5">
              <span class="flex-shrink-0 w-4 h-4 rounded-full bg-red-500/10 text-red-500 text-[10px] font-bold flex items-center justify-center">
                {{ index + 1 }}
              </span>
              <span class="truncate">{{ topic }}</span>
            </div>
          </button>
        </div>
      </div>

      <!-- 预设问题区域 -->
      <div>
        <div class="flex items-center gap-2 mb-3">
          <div class="bg-indigo-100 p-1.5 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-sm font-medium text-gray-700">预设问题</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            v-for="question in presetQuestions"
            :key="question.full"
            @click="$emit('select-question', question.full)"
            class="w-full px-4 py-3 text-left bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 transition-colors overflow-hidden text-sm text-gray-700"
          >
            <span class="block truncate">{{ question.short }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const presetQuestions = [
  { full: '介绍一下唐代诗人李白', short: '介绍一下唐代诗人李白' },
  { full: '如何使用React创建一个TodoList组件？', short: '如何使用React创建TodoList' },
  { full: '解释量子计算的基本原理', short: '量子计算的基本原理' }
];

defineProps<{
  hotTopics: string[];
  isLoadingTopics: boolean;
}>();

defineEmits<{
  'select-question': [question: string];
  'refresh-topics': [];
}>();
</script>

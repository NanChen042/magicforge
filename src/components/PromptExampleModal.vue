<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  isOpen: boolean
  title: string
  description: string
  userPrompt: string
  sampleOutput: string
  analysis?: string
}>()

const emit = defineEmits<{
  close: []
  'use-prompt': [prompt: string]
}>()

const isCopied = ref(false)

const copyPrompt = async () => {
  if (!props.userPrompt) return
  try {
    await navigator.clipboard.writeText(props.userPrompt)
    isCopied.value = true
    setTimeout(() => { isCopied.value = false }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}

const handleUsePrompt = () => {
  emit('use-prompt', props.userPrompt)
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-sans"
        @click.self="emit('close')"
      >
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="isOpen"
            class="relative w-full max-w-2xl bg-white rounded-md border border-zinc-200 shadow-xl overflow-hidden flex flex-col max-h-[85vh]"
          >
            <!-- 头部 -->
            <div class="px-6 py-4 border-b border-zinc-200 bg-zinc-50/70 flex items-center justify-between">
              <div>
                <h3 class="text-base font-bold text-zinc-900 tracking-tight">{{ title }}</h3>
                <p class="text-xs text-zinc-500 mt-0.5">{{ description }}</p>
              </div>
              <button
                @click="emit('close')"
                class="p-1 rounded-sm text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors cursor-pointer"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- 内容体 -->
            <div class="p-6 overflow-y-auto space-y-5 text-left custom-scrollbar">
              
              <!-- 提示词块 -->
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-zinc-700 flex items-center gap-1.5 uppercase tracking-wide">
                    <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    Prompt 模板代码
                  </span>
                  <button
                    @click="copyPrompt"
                    class="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>{{ isCopied ? '已复制！' : '复制提示词' }}</span>
                  </button>
                </div>

                <div class="bg-zinc-900 text-zinc-200 p-4 rounded-sm font-mono text-xs leading-relaxed overflow-x-auto border border-zinc-800 whitespace-pre-wrap">
                  {{ userPrompt }}
                </div>
              </div>

              <!-- 示例输出 -->
              <div class="space-y-2">
                <span class="text-xs font-bold text-zinc-700 flex items-center gap-1.5 uppercase tracking-wide">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  期待效果 / 样例输出 (Sample Output)
                </span>
                <div class="bg-zinc-50 text-zinc-800 p-4 rounded-sm border border-zinc-200 text-xs leading-relaxed whitespace-pre-wrap">
                  {{ sampleOutput }}
                </div>
              </div>

              <!-- 分析赏析 -->
              <div v-if="analysis" class="p-3.5 bg-blue-50/50 border border-blue-200/70 rounded-sm text-xs space-y-1">
                <span class="font-bold text-blue-700 block">提示词专家解析：</span>
                <p class="text-zinc-700 leading-relaxed">{{ analysis }}</p>
              </div>

            </div>

            <!-- 底部按钮 -->
            <div class="px-6 py-3.5 border-t border-zinc-200 bg-zinc-50/70 flex items-center justify-end gap-2.5">
              <button
                @click="emit('close')"
                class="px-4 py-2 text-xs font-semibold text-zinc-700 bg-white border border-zinc-200 rounded-sm hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                关闭
              </button>
              <button
                @click="handleUsePrompt"
                class="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-sm shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>前往智能对话测试</span>
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e4e4e7;
  border-radius: 4px;
}
</style>

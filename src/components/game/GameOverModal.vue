<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  show: boolean
  title: string
  message: string
  type: string
}>()

const emit = defineEmits<{
  close: []
}>()

const isSuccess = computed(() => props.type === 'success')
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
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
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
            v-if="show"
            class="relative w-full max-w-md overflow-hidden rounded-xs border border-zinc-200 bg-white shadow-xl p-6 text-center space-y-3.5"
          >
            <!-- Header Icon -->
            <div 
              class="w-12 h-12 mx-auto rounded-xs flex items-center justify-center border shadow-2xs"
              :class="isSuccess ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-blue-50 text-blue-600 border-blue-200'"
            >
              <svg v-if="isSuccess" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>

            <div class="space-y-1">
              <h2 class="text-lg font-bold text-zinc-900 tracking-tight">{{ title }}</h2>
              <div class="h-0.5 w-8 bg-blue-600 rounded-full mx-auto"></div>
            </div>

            <p class="text-zinc-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line text-justify max-h-52 overflow-y-auto px-1 font-normal">
              {{ message }}
            </p>

            <div class="pt-2">
              <button
                @click="emit('close')"
                class="w-full py-2.5 rounded-xs font-bold text-xs text-white transition-all cursor-pointer shadow-2xs font-mono tracking-wider"
                :class="isSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'"
              >
                返回剧本工坊 · 体验更多世界线
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

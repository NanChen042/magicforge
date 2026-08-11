<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  startGame: [playerName: string]
}>()

const playerName = ref('小明')

const handleStartGame = () => {
  if (!playerName.value.trim()) return
  emit('startGame', playerName.value.trim())
}
</script>

<template>
  <div class="relative min-h-[80vh] w-full flex items-center justify-center py-12 px-4">
    <div class="w-full max-w-md bg-white rounded-md border border-zinc-200 shadow-sm p-8 text-center animate-in fade-in zoom-in-95 duration-300">
      
      <!-- Brand Logo -->
      <div class="w-14 h-14 mx-auto mb-5 rounded-md bg-blue-600 text-white flex items-center justify-center shadow-xs overflow-hidden">
        <img src="@/assets/ai.png" alt="AI Logo" class="w-full h-full object-cover" />
      </div>

      <!-- Title & Subtitle -->
      <h1 class="text-2xl font-bold text-zinc-900 tracking-tight mb-2">
        高三抉择 · 人生模拟器
      </h1>
      <p class="text-xs text-zinc-500 mb-8 leading-relaxed">
        高考倒计时 30 天，在高考、打游戏与社交之间，你将做出怎样的抉择？
      </p>

      <!-- Form Inputs -->
      <div class="space-y-5 text-left">
        <div>
          <label class="block text-xs font-semibold text-zinc-600 mb-2">
            角色姓名
          </label>
          <input
            v-model="playerName"
            type="text"
            class="w-full bg-zinc-50 text-zinc-900 text-sm py-2.5 px-3.5 rounded-sm border border-zinc-200 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
            placeholder="输入角色名字（例如：小明）"
            @keyup.enter="handleStartGame"
          />
        </div>

        <button
          @click="handleStartGame"
          :disabled="!playerName.trim()"
          class="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-semibold rounded-sm transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>开始故事</span>
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      <!-- Footer Info -->
      <div class="mt-8 pt-5 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
        <span class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          AI Powered Life Simulation
        </span>
        <span>MagicForge Game</span>
      </div>

    </div>
  </div>
</template>
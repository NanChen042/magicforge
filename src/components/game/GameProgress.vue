<script setup lang="ts">
const props = defineProps<{
  gameProgress: {
    gaming: number
    study: number
    social: number
    other: number
  }
}>()

const items = [
  { key: 'gaming', label: '游戏战绩', color: 'bg-blue-600', text: 'text-blue-600', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' },
  { key: 'study', label: '高考复习', color: 'bg-emerald-600', text: 'text-emerald-600', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { key: 'social', label: '人际社交', color: 'bg-indigo-600', text: 'text-indigo-600', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  { key: 'other', label: '状态机缘', color: 'bg-amber-500', text: 'text-amber-600', icon: 'M13 10V3L4 14h7v7l9-11h-7z' }
]
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 font-sans">
    <div
      v-for="item in items"
      :key="item.key"
      class="bg-white rounded-md p-3.5 border border-zinc-200 shadow-2xs flex flex-col justify-between"
    >
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-semibold text-zinc-600 flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5" :class="item.text" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
          </svg>
          {{ item.label }}
        </span>
        <span class="text-xs font-mono font-bold" :class="item.text">
          {{ (gameProgress as any)[item.key] }}%
        </span>
      </div>

      <div class="w-full h-1.5 bg-zinc-100 rounded-sm overflow-hidden border border-zinc-200/50 mt-1">
        <div 
          class="h-full transition-all duration-500 ease-out" 
          :class="item.color"
          :style="`width: ${Math.min((gameProgress as any)[item.key], 100)}%`"
        ></div>
      </div>
    </div>
  </div>
</template>

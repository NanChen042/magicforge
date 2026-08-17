<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '../../stores/game'

defineProps<{
  gameProgress: {
    gaming: number
    study: number
    social: number
    other: number
  }
}>()

const gameStore = useGameStore()

const attrConfig = computed(() => {
  return gameStore.activeScript?.attributeNames || {
    gaming: { label: '行动执行', icon: '⚔️', color: 'blue' },
    study: { label: '真相解析', icon: '🔍', color: 'cyan' },
    social: { label: '关系影响', icon: '🎭', color: 'amber' },
    other: { label: '神秘感知', icon: '🌌', color: 'purple' }
  }
})

const items = computed(() => [
  {
    key: 'gaming' as const,
    label: attrConfig.value.gaming?.label || '行动执行',
    icon: attrConfig.value.gaming?.icon || '⚔️',
    barClass: 'bg-blue-600',
    textClass: 'text-blue-600'
  },
  {
    key: 'study' as const,
    label: attrConfig.value.study?.label || '真相解析',
    icon: attrConfig.value.study?.icon || '🔍',
    barClass: 'bg-cyan-600',
    textClass: 'text-cyan-600'
  },
  {
    key: 'social' as const,
    label: attrConfig.value.social?.label || '关系影响',
    icon: attrConfig.value.social?.icon || '🎭',
    barClass: 'bg-amber-500',
    textClass: 'text-amber-600'
  },
  {
    key: 'other' as const,
    label: attrConfig.value.other?.label || '神秘感知',
    icon: attrConfig.value.other?.icon || '🌌',
    barClass: 'bg-purple-600',
    textClass: 'text-purple-600'
  }
])
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-sans">
    <div
      v-for="item in items"
      :key="item.key"
      class="bg-white hover:border-zinc-300 rounded-xs p-3 border border-zinc-200/90 shadow-2xs transition-all duration-150 flex flex-col justify-between"
    >
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2 min-w-0">
          <span class="w-1.5 h-1.5 rounded-full shrink-0 shadow-2xs" :class="item.barClass"></span>
          <span class="text-xs font-bold text-zinc-900 tracking-tight truncate">
            {{ item.label }}
          </span>
        </div>
        
        <span class="text-xs font-mono font-bold shrink-0 ml-1" :class="item.textClass">
          {{ Math.round(gameProgress[item.key] || 0) }}%
        </span>
      </div>

      <div>
        <div class="w-full h-1.5 bg-zinc-100 rounded-xs overflow-hidden">
          <div 
            class="h-full transition-all duration-300 ease-out rounded-xs" 
            :class="item.barClass"
            :style="`width: ${Math.min(gameProgress[item.key] || 0, 100)}%`"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

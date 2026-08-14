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
    gaming: { label: '剑道感悟', icon: '⚔️', color: 'blue' },
    study: { label: '备考学识', icon: '📚', color: 'emerald' },
    social: { label: '同窗羁绊', icon: '🤝', color: 'amber' },
    other: { label: '宿命顿悟', icon: '✨', color: 'purple' }
  }
})

const items = computed(() => [
  {
    key: 'gaming' as const,
    label: attrConfig.value.gaming.label,
    icon: attrConfig.value.gaming.icon,
    barClass: 'bg-blue-600',
    textClass: 'text-blue-600'
  },
  {
    key: 'study' as const,
    label: attrConfig.value.study.label,
    icon: attrConfig.value.study.icon,
    barClass: 'bg-emerald-600',
    textClass: 'text-emerald-600'
  },
  {
    key: 'social' as const,
    label: attrConfig.value.social.label,
    icon: attrConfig.value.social.icon,
    barClass: 'bg-amber-600',
    textClass: 'text-amber-600'
  },
  {
    key: 'other' as const,
    label: attrConfig.value.other.label,
    icon: attrConfig.value.other.icon,
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
      class="bg-white rounded-xs p-3 border border-zinc-200 shadow-2xs transition-all duration-150 hover:border-zinc-300 flex flex-col justify-between"
    >
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-1.5 min-w-0">
          <span class="text-sm shrink-0">{{ item.icon }}</span>
          <span class="text-xs font-bold text-zinc-800 tracking-tight truncate">
            {{ item.label }}
          </span>
        </div>
        
        <span class="text-xs font-mono font-bold shrink-0 ml-1" :class="item.textClass">
          {{ gameProgress[item.key] }}%
        </span>
      </div>

      <div>
        <div class="w-full h-1.5 bg-zinc-100 rounded-xs overflow-hidden border border-zinc-200/60">
          <div 
            class="h-full transition-all duration-500 ease-out rounded-xs" 
            :class="item.barClass"
            :style="`width: ${Math.min(gameProgress[item.key], 100)}%`"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

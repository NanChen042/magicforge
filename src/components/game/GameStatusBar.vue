<script setup lang="ts">
import { useGameStore } from '../../stores/game'
import ModelSelector from '@/components/deepseek/ModelSelector.vue'

defineProps<{
  playerName: string
  sceneId: number | undefined
  modelName: string
  isGenerating: boolean
}>()

const emit = defineEmits<{
  'update:modelName': [model: string]
  toggleModelInfo: []
  backToHomepage: []
  showHelp: []
  retryCurrentScene: []
}>()

const gameStore = useGameStore()
</script>

<template>
  <div class="bg-white/90 backdrop-blur-md rounded-xs border border-zinc-200 shadow-2xs p-3 sm:p-4 transition-all duration-200 relative z-30">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      
      <!-- 玩家与剧本身份信息 (Left Deck) -->
      <div class="flex items-center gap-3 min-w-0">
        <!-- 身份图标/标识 -->
        <div class="relative shrink-0">
          <div class="w-8 h-8 rounded-xs bg-blue-50 text-blue-700 border border-blue-200/80 flex items-center justify-center font-mono font-bold text-xs shadow-2xs">
            07
          </div>
          <div 
            class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-white"
            :class="isGenerating ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'"
            :title="isGenerating ? 'AI 推理生成中...' : '推演系统就绪'"
          ></div>
        </div>

        <!-- 名字与世界线徽章 -->
        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <span class="font-bold text-zinc-900 text-sm tracking-tight truncate">
              {{ playerName }}
            </span>
            <span class="text-xs font-medium px-1.5 py-0.5 rounded-xs bg-zinc-100 text-zinc-700 border border-zinc-200/80 shrink-0 tabular-nums">
              第 {{ sceneId || 1 }} 幕
            </span>
          </div>

          <div class="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
            <span class="text-blue-600 font-semibold truncate">{{ gameStore.activeScript?.title?.split('·')[0] }}</span>
            <span class="text-zinc-300">/</span>
            <span class="text-xs text-zinc-400 truncate font-normal">{{ gameStore.activeScript?.badge }}</span>
          </div>
        </div>
      </div>

      <!-- 右侧控制群 (Right Action HUD) -->
      <div class="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100 text-xs">
        
        <!-- 现代化模型选择器 (与智能对话 100% 一致) -->
        <ModelSelector
          :model-value="modelName"
          placement="right"
          @update:model-value="emit('update:modelName', $event)"
        />

        <div class="flex items-center gap-1.5">
          <!-- 重新推演 -->
          <button
            @click="emit('retryCurrentScene')"
            :disabled="isGenerating"
            class="px-2.5 py-1 rounded-xs text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 border border-zinc-200 transition-colors disabled:opacity-40 cursor-pointer"
            title="重新推演当前幕"
          >
            重试
          </button>

          <!-- 切换世界线 / 返回 -->
          <button
            @click="emit('backToHomepage')"
            class="px-2.5 py-1 rounded-xs text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 border border-zinc-200 transition-colors cursor-pointer"
            title="返回剧本选择页面"
          >
            切换剧本
          </button>

          <!-- 查看手册 -->
          <button
            @click="emit('showHelp')"
            class="px-2.5 py-1 rounded-xs bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors font-bold cursor-pointer"
            title="打开推演图鉴与手册"
          >
            手册
          </button>
        </div>

      </div>

    </div>
  </div>
</template>

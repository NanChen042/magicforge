<script setup lang="ts">
import type { GameScene } from '../../stores/game'

defineProps<{
  currentScene: GameScene | undefined
  isGenerating: boolean
  aiErrorMessage: string
  activeTab: string
  modelName: string
  isThinking: boolean
  reasoningContent: string
  currentDialogStream: string
  apiError: {
    show: boolean
    code: string
    message: string
    details: { title: string; reason: string; solution: string } | null
  }
}>()

const emit = defineEmits<{
  switchTab: [tab: string]
  clearApiError: []
  retryCurrentScene: []
}>()
</script>

<template>
  <div class="space-y-5 font-sans text-zinc-800">
    
    <!-- 场景描述卡片 -->
    <div class="relative overflow-hidden bg-gradient-to-br from-blue-50/40 via-white to-zinc-50/30 rounded-md p-5 border border-zinc-200 shadow-2xs border-l-4 border-l-blue-600">
       <div class="flex items-start gap-4">
          <div class="flex-shrink-0">
             <div class="w-10 h-10 bg-blue-600 text-white rounded-sm flex items-center justify-center shadow-xs">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
             </div>
          </div>
          
          <div class="flex-1 space-y-1.5">
             <div class="flex items-center justify-between">
                <div class="text-blue-600 font-bold text-xs tracking-wide flex items-center gap-1.5 uppercase">
                   <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                   当前场景概览
                </div>
                <span class="text-[10px] font-mono text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-sm">SCENE ENVIRONMENT</span>
             </div>
             
             <!-- 场景文本 -->
             <div v-if="currentScene?.description" class="text-zinc-800 leading-relaxed text-sm font-medium animate-fade-in text-justify">
                {{ currentScene.description }}
             </div>
             
             <!-- Loading -->
             <div v-else-if="isGenerating" class="flex items-center gap-2 text-zinc-400 italic text-sm py-2">
                <div class="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span>正在根据剧情构建场景文本...</span>
             </div>

             <!-- Error Retry -->
             <div v-else-if="aiErrorMessage" class="flex items-center gap-3 mt-2">
                <span class="text-red-500 text-xs flex items-center gap-1 font-semibold">
                   <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                   生成失败
                </span>
                <button @click="emit('retryCurrentScene')" class="px-3 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-sm text-xs transition-colors font-semibold">
                   重新尝试
                </button>
             </div>
          </div>
       </div>
    </div>

    <!-- 交互区域容器 (Tabs + Content) -->
    <div class="space-y-3">
      
      <!-- Tab 切换 -->
      <div class="bg-zinc-200/60 p-1 rounded-md flex gap-1 border border-zinc-200/80">
        <!-- Tab 1: 对话内容 -->
        <button
          @click="emit('switchTab', 'dialog')"
          class="flex-1 py-2 rounded-sm text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          :class="activeTab === 'dialog' 
            ? 'bg-white text-blue-600 shadow-2xs border border-zinc-200/60' 
            : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/60'"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span>剧情对话</span>
        </button>

        <!-- Tab 2: 思维过程 -->
        <button
          v-if="modelName !== 'deepseek-chat'"
          @click="emit('switchTab', 'reasoning')"
          class="flex-1 py-2 rounded-sm text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 relative cursor-pointer"
          :class="activeTab === 'reasoning'
            ? 'bg-white text-blue-600 shadow-2xs border border-zinc-200/60'
            : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/60'"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span>思维链轨迹</span>
          
          <span v-if="isThinking && !reasoningContent" class="absolute top-1 right-2 flex h-2 w-2">
             <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
             <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
        </button>

        <!-- Tab 3: 错误警告 -->
        <button
          v-if="apiError.show"
          @click="emit('switchTab', 'error')"
          class="flex-1 py-2 rounded-sm text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
          :class="activeTab === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'text-red-500 hover:bg-red-50'"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>异常警报</span>
        </button>
      </div>

      <!-- Tab 内容区域 -->
      <div class="relative min-h-[160px]">
        
        <!-- Content A: 对话 (Dialog) -->
        <transition name="fade" mode="out-in">
          <div v-if="activeTab === 'dialog'" key="dialog" class="bg-white rounded-md p-5 border border-zinc-200 shadow-2xs">
             <div class="flex gap-4 items-start">
                <div class="w-9 h-9 rounded-sm bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>

                <div class="flex-1 pt-0.5 min-w-0">
                   <div v-if="isGenerating && !currentDialogStream" class="min-h-[120px] flex flex-col items-center justify-center gap-2 bg-zinc-50/80 rounded-sm border border-zinc-200 border-dashed">
                      <div class="flex gap-1.5">
                        <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                        <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100"></div>
                        <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200"></div>
                      </div>
                      <span class="text-xs text-zinc-500 font-medium">AI 正在实时推演并生成对话...</span>
                   </div>

                   <div v-else-if="currentDialogStream || currentScene?.dialog" class="min-h-[80px] text-zinc-800 leading-relaxed text-sm whitespace-pre-line font-normal animate-fade-in">
                      {{ currentDialogStream || currentScene?.dialog }}
                   </div>

                   <div v-else-if="aiErrorMessage" class="min-h-[100px] flex items-center justify-center p-4 rounded-sm bg-red-50 border border-red-200 text-red-600 text-xs">
                      <div class="flex flex-col items-center gap-1.5">
                         <span class="font-semibold">{{ aiErrorMessage }}</span>
                      </div>
                   </div>

                   <div v-else class="min-h-[100px] flex items-center justify-center text-zinc-400 italic text-xs">
                      等待剧情更新...
                   </div>
                </div>
             </div>
          </div>
        </transition>

        <!-- Content B: 思维链 (Reasoning) -->
        <transition name="fade" mode="out-in">
          <div v-if="activeTab === 'reasoning'" key="reasoning" class="bg-white rounded-md p-5 border border-zinc-200 shadow-2xs">
             <div class="flex gap-4 items-start">
                <div class="w-9 h-9 rounded-sm bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>

                <div class="flex-1 pt-0.5 min-w-0">
                   <div v-if="isGenerating && !reasoningContent" class="h-[240px] flex flex-col items-center justify-center gap-3 bg-zinc-50 rounded-sm border border-zinc-200 border-dashed">
                      <div class="w-7 h-7 rounded-full border-2 border-blue-200 border-t-blue-600 animate-spin"></div>
                      <span class="text-xs text-zinc-500 font-medium">深度思考模型 (DeepSeek-R1 / Qwen) 正在推演...</span>
                   </div>
                   
                   <div v-else class="h-[240px] overflow-y-auto custom-scrollbar font-mono text-xs text-zinc-700 leading-relaxed bg-zinc-900 rounded-sm p-4 text-zinc-200 shadow-inner">
                      <div v-if="reasoningContent" class="whitespace-pre-wrap">{{ reasoningContent }}</div>
                      <div v-else class="h-full flex flex-col items-center justify-center text-zinc-400 gap-2">
                        <svg class="w-8 h-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <span class="text-xs font-sans">选择任意选项后，R1 模型推理演算轨迹将在此实时输出</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </transition>

        <!-- Content C: 错误警告 (Error) -->
        <transition name="fade" mode="out-in">
          <div v-if="activeTab === 'error'" key="error" class="bg-red-50 rounded-md p-5 border border-red-200 shadow-2xs">
             <div class="flex gap-3">
                <svg class="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div class="flex-1 space-y-2">
                   <h3 class="text-sm font-bold text-red-700">系统异常: {{ apiError.code }}</h3>
                   <p class="text-red-600 text-xs border-l-2 border-red-200 pl-2.5">{{ apiError.message }}</p>
                   
                   <div v-if="apiError.details" class="bg-white rounded-sm p-3 text-xs space-y-1.5 border border-red-200">
                      <div class="flex gap-2">
                         <span class="text-red-600 font-bold shrink-0">原因:</span>
                         <span class="text-zinc-600">{{ apiError.details.reason }}</span>
                      </div>
                      <div class="flex gap-2">
                         <span class="text-emerald-600 font-bold shrink-0">建议:</span>
                         <span class="text-zinc-600">{{ apiError.details.solution }}</span>
                      </div>
                   </div>

                   <button @click="emit('clearApiError')" class="mt-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs rounded-sm transition-colors font-semibold shadow-2xs">
                      关闭提告
                   </button>
                </div>
             </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- 特殊事件卡片 -->
    <transition name="slide-up">
      <div v-if="currentScene?.specialEvent" class="relative overflow-hidden bg-blue-50/60 rounded-sm p-3.5 border border-blue-200 shadow-2xs mt-4">
         <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <div>
               <h3 class="text-blue-700 font-bold text-xs tracking-wide">触发特殊隐藏剧情</h3>
               <p class="text-blue-900 text-xs font-medium mt-0.5">{{ currentScene.specialEvent }}</p>
            </div>
         </div>
      </div>
    </transition>

  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

.slide-up-enter-active {
  transition: all 0.3s ease-out;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

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

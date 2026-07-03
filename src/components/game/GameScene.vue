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
  <div class="space-y-6 font-sans text-slate-800">
    
    <!-- ==================== 1. 场景描述卡片 (Scene Description) - 顶部背景铺垫 ==================== -->
    <div class="relative overflow-hidden bg-white rounded-md p-6 border border-slate-200 shadow-sm group hover:shadow-md transition-all duration-300">
       <!-- 顶部装饰条 -->
       <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-400"></div>
       
       <div class="flex items-start gap-5 pt-2">
          <div class="flex-shrink-0">
             <div class="w-12 h-12 bg-amber-50 rounded-sm flex items-center justify-center text-2xl text-amber-600 border border-amber-100">
                📜
             </div>
          </div>
          
          <div class="flex-1 space-y-2">
             <h3 class="text-amber-700 font-bold text-xs tracking-widest uppercase mb-1 flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                Current Scene
             </h3>
             
             <!-- 场景文本 -->
             <div v-if="currentScene?.description" class="text-slate-700 leading-relaxed text-sm sm:text-base animate-fade-in text-justify font-medium">
                {{ currentScene.description }}
             </div>
             
             <!-- Loading -->
             <div v-else-if="isGenerating" class="flex items-center gap-2 text-slate-400 italic text-sm">
                <span class="animate-pulse">正在渲染场景环境...</span>
             </div>

             <!-- Error Retry -->
             <div v-else-if="aiErrorMessage" class="flex items-center gap-4 mt-2">
                <span class="text-red-500 text-sm flex items-center gap-1 font-medium">
                   <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                   生成失败
                </span>
                <button @click="emit('retryCurrentScene')" class="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-xs transition-colors font-medium">
                   重试
                </button>
             </div>
          </div>
       </div>
    </div>

    <!-- ==================== 2. 交互区域容器 (Tabs + Content) ==================== -->
    <div class="space-y-4">
      
      <!-- Tab 切换 (iOS 分段风格) -->
      <div class="bg-slate-100 p-1 rounded-sm flex gap-1 shadow-inner">
        <!-- Tab 1: 对话内容 -->
        <button
          @click="emit('switchTab', 'dialog')"
          class="flex-1 py-2.5 rounded-sm text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2"
          :class="activeTab === 'dialog' 
            ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-black/5' 
            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'"
        >
          <span class="text-base">💭</span>
          <span>剧情对话</span>
        </button>

        <!-- Tab 2: 思维过程 -->
        <button
          v-if="modelName !== 'deepseek-chat'"
          @click="emit('switchTab', 'reasoning')"
          class="flex-1 py-2.5 rounded-sm text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 relative"
          :class="activeTab === 'reasoning'
            ? 'bg-white text-purple-600 shadow-sm ring-1 ring-black/5'
            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'"
        >
          <span class="text-base">🧠</span>
          <span>思维链</span>
          
          <!-- 思考中状态 Tag -->
          <span v-if="isThinking && !reasoningContent" class="absolute top-1 right-1 flex h-2 w-2">
             <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
             <span class="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
        </button>

        <!-- Tab 3: 错误警告 -->
        <button
          v-if="apiError.show"
          @click="emit('switchTab', 'error')"
          class="flex-1 py-2.5 rounded-sm text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 animate-pulse"
          :class="activeTab === 'error' ? 'bg-red-50 text-red-600 ring-1 ring-red-200' : 'text-red-400 hover:bg-red-50'"
        >
          <span class="text-base">⚠️</span>
          <span>异常警报</span>
        </button>
      </div>

      <!-- Tab 内容区域 -->
      <div class="relative min-h-[120px]">
        
      <!-- Content A: 对话 (Dialog) -->
        <transition name="fade" mode="out-in">
          <div v-if="activeTab === 'dialog'" key="dialog" class="bg-white rounded-md p-6 border border-slate-200 shadow-sm transition-all duration-300">
             <!-- 使用 items-stretch 确保左侧线条跟随高度 -->
             <div class="flex gap-5 h-full items-stretch">
                
                <!-- 左侧图标列 -->
                <div class="flex-shrink-0 flex flex-col items-center gap-2">
                   <!-- 图标 -->
                   <div class="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl border border-indigo-100 shrink-0">
                      💭
                   </div>
                   <!-- 装饰线：使用 flex-1 自动填满 -->
                   <div class="w-0.5 flex-1 bg-slate-100 rounded-full my-1 min-h-[20px]"></div>
                </div>

                <!-- 右侧内容 -->
                <div class="flex-1 pt-1 min-w-0">
                   
                   <!-- Loading 状态：高度适中 -->
                   <div v-if="isGenerating && !currentDialogStream" class="min-h-[120px] flex flex-col items-center justify-center gap-3 bg-slate-50/50 rounded-sm border border-slate-100 border-dashed">
                      <div class="flex gap-1.5">
                        <div class="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                        <div class="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
                        <div class="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                      <span class="text-sm font-medium text-slate-400 animate-pulse">AI 正在构思剧情...</span>
                   </div>

                   <!-- 内容显示：移除强制大高度，改为 min-h-[80px] -->
                   <div v-else-if="currentDialogStream || currentScene?.dialog" class="min-h-[80px] prose prose-slate prose-p:text-slate-700 prose-p:leading-relaxed max-w-none animate-fade-in">
                      <p class="whitespace-pre-line">{{ currentDialogStream || currentScene?.dialog }}</p>
                   </div>

                   <!-- 错误状态 -->
                   <div v-else-if="aiErrorMessage" class="min-h-[120px] flex items-center justify-center p-4 rounded-sm bg-red-50 border border-red-100 text-red-600 text-sm">
                      <div class="flex flex-col items-center gap-2">
                         <span class="text-xl">🚫</span>
                         <span class="font-medium">{{ aiErrorMessage }}</span>
                         <button v-if="aiErrorMessage.includes('修复')" class="text-xs underline hover:text-red-800">查看详情</button>
                      </div>
                   </div>

                   <!-- 空状态 -->
                   <div v-else class="min-h-[120px] flex items-center justify-center text-slate-400 italic text-sm">
                      等待对话生成...
                   </div>
                </div>
             </div>
          </div>
        </transition>


          <!-- Content B: 思维链 (Reasoning) -->
        <transition name="fade" mode="out-in">
          <div v-if="activeTab === 'reasoning'" key="reasoning" class="bg-white rounded-md p-6 border border-slate-200 shadow-sm">
             <!-- 使用 items-stretch 确保左右高度一致 -->
             <div class="flex gap-5 h-full items-stretch">
                
                <!-- 左侧图标列 -->
                <div class="flex-shrink-0 flex flex-col items-center gap-2">
                   <!-- 图标 -->
                   <div class="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-xl border border-purple-100 shrink-0">
                      🧠
                   </div>
                   <!-- 装饰线：使用 flex-1 自动填满剩余高度 -->
                   <div class="w-0.5 flex-1 bg-slate-100 rounded-full my-1"></div>
                </div>

                <!-- 右侧内容 -->
                <div class="flex-1 pt-1 min-w-0"> <!-- min-w-0 防止 flex 子元素溢出 -->
                   
                   <!-- 状态：思考中 -->
                   <div v-if="isGenerating && !reasoningContent" class="h-[400px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded-sm border border-slate-100 border-dashed">
                      <div class="relative">
                        <div class="w-12 h-12 rounded-full border-4 border-purple-100 border-t-purple-500 animate-spin"></div>
                        <div class="absolute inset-0 flex items-center justify-center text-xs font-bold text-purple-500">AI</div>
                      </div>
                      <span class="text-sm font-medium text-slate-500 animate-pulse">深度推理模型正在解析逻辑...</span>
                   </div>
                   
                   <!-- 状态：显示内容 (固定高度窗口) -->
                   <!-- 改动：h-[400px] 固定高度，overflow-y-auto 内部滚动 -->
                   <div v-else class="h-[400px] overflow-y-auto custom-scrollbar font-mono text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-sm p-5 border border-slate-200 shadow-inner">
                      <div v-if="reasoningContent" class="whitespace-pre-wrap">{{ reasoningContent }}</div>
                      <div v-else class="h-full flex items-center justify-center text-slate-400 italic">
                        暂无思维链数据...
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </transition>


        <!-- Content C: 错误详情 (Error) -->
        <transition name="fade" mode="out-in">
          <div v-if="activeTab === 'error'" key="error" class="bg-red-50 rounded-md p-6 border border-red-100 shadow-sm">
             <div class="flex gap-4">
                <div class="text-3xl text-red-500">⚠️</div>
                <div class="flex-1 space-y-3">
                   <h3 class="text-lg font-bold text-red-700">系统异常: {{ apiError.code }}</h3>
                   <p class="text-red-600 text-sm border-l-2 border-red-200 pl-3">{{ apiError.message }}</p>
                   
                   <div v-if="apiError.details" class="bg-white rounded p-3 text-xs space-y-2 mt-2 border border-red-100">
                      <div class="flex gap-2">
                         <span class="text-red-600 font-bold shrink-0">Reason:</span>
                         <span class="text-slate-600">{{ apiError.details.reason }}</span>
                      </div>
                      <div class="flex gap-2">
                         <span class="text-emerald-600 font-bold shrink-0">Fix:</span>
                         <span class="text-slate-600">{{ apiError.details.solution }}</span>
                      </div>
                   </div>

                   <button @click="emit('clearApiError')" class="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs rounded-sm transition-colors shadow-sm font-medium">
                      确认并关闭
                   </button>
                </div>
             </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- ==================== 3. 特殊事件卡片 (Special Event) ==================== -->
    <transition name="slide-up">
      <div v-if="currentScene?.specialEvent" class="relative overflow-hidden bg-emerald-50 rounded-sm p-4 border border-emerald-200 shadow-sm mt-6">
         <div class="flex items-center gap-4 relative z-10">
            <div class="text-2xl animate-bounce">⚡</div>
            <div>
               <h3 class="text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1">Special Event Triggered</h3>
               <p class="text-emerald-800 text-sm font-medium">{{ currentScene.specialEvent }}</p>
            </div>
         </div>
         <!-- 扫描光效 -->
         <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shine"></div>
      </div>
    </transition>

  </div>
</template>

<style scoped>
/* 1. 基础淡入淡出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 2. 上滑进入 */
.slide-up-enter-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

/* 3. 扫描光效 */
@keyframes shine {
  100% { transform: translateX(100%); }
}
.animate-shine {
  animation: shine 3s infinite;
}

/* 4. 自定义滚动条 (浅色版) */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}
</style>

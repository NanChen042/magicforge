<template>
  <el-dialog
    :model-value="true"
    title=""
    width="640px"
    draggable
    :close-on-click-modal="true"
    :show-close="false"
    destroy-on-close
    class="transform-modal"
    @close="$emit('close')"
  >
    <!-- 自定义头部 -->
    <template #header>
      <div class="flex items-center justify-between w-full cursor-move select-none">
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center w-9 h-9 rounded-sm bg-blue-600 text-white shadow-xs">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 class="text-base font-bold text-zinc-900">AI 提示词优化</h3>
            <p class="text-xs text-zinc-500">让 AI 帮你写出更好的提示词</p>
          </div>
        </div>
        
        <button 
          @click="$emit('close')" 
          class="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-sm transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </template>

    <!-- 内容区域 -->
    <div class="space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar pr-1">
      <!-- 模式选择 -->
      <section>
        <label class="block text-xs font-bold text-zinc-500 tracking-wider mb-2">选择优化模式</label>
        <div class="grid grid-cols-2 gap-2.5">
          <button
            v-for="mode in transformModes"
            :key="mode.value"
            @click="$emit('update:selectedMode', mode.value)"
            :class="[
              'group relative p-3 rounded-sm text-left border transition-all duration-200',
              selectedMode === mode.value
                ? 'bg-blue-50/60 border-blue-500 shadow-2xs'
                : 'bg-white border-zinc-200 hover:border-blue-200 hover:bg-blue-50/20'
            ]"
          >
            <div class="flex items-start gap-3">
              <div 
                :class="[
                  'w-7 h-7 rounded-sm flex items-center justify-center shrink-0 transition-colors',
                  selectedMode === mode.value ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-500 group-hover:bg-blue-50 group-hover:text-blue-600'
                ]"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="mode.icon" />
                </svg>
              </div>
              <div class="flex-1">
                <span :class="['block text-sm font-bold mb-0.5', selectedMode === mode.value ? 'text-blue-700' : 'text-zinc-900']">
                  {{ mode.label }}
                </span>
                <p :class="['text-xs leading-relaxed', selectedMode === mode.value ? 'text-blue-600/80' : 'text-zinc-500']">
                  {{ mode.description }}
                </p>
              </div>
              <!-- 选中指示器 -->
              <div 
                v-if="selectedMode === mode.value"
                class="w-4 h-4 rounded-sm bg-blue-600 flex items-center justify-center shrink-0 mt-0.5"
              >
                <svg class="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </section>

      <!-- 原始输入 -->
      <section>
        <label class="block text-xs font-bold text-zinc-500 tracking-wider mb-2">原始输入</label>
        <div class="p-3 bg-zinc-50 rounded-sm border border-zinc-200 text-sm text-zinc-700 leading-relaxed max-h-24 overflow-y-auto custom-scrollbar">
          {{ userInput || '暂无输入内容' }}
        </div>
      </section>

      <!-- 优化结果 -->
      <section v-if="transformResult" class="animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div class="flex items-center gap-2 mb-2">
          <label class="block text-xs font-bold text-blue-600 tracking-wider">优化结果</label>
        </div>
        
        <div class="rounded-sm border border-blue-200 bg-blue-50/20 overflow-hidden">
          <div class="p-4">
            <p class="text-zinc-800 text-sm leading-relaxed whitespace-pre-wrap">{{ transformResult.transformedText }}</p>
          </div>
          
          <!-- 建议标签 -->
          <div v-if="transformResult.suggestions.length > 0" class="px-4 py-3 bg-blue-50/50 border-t border-blue-100">
            <p class="text-[10px] font-bold text-blue-600 tracking-wider mb-2">点击追加到结果</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(suggestion, index) in transformResult.suggestions"
                :key="index"
                @click="appendSuggestion(suggestion)"
                :class="[
                  'px-2.5 py-1 rounded-sm text-xs font-medium shadow-2xs cursor-pointer transition-all',
                  appliedSuggestions.has(suggestion)
                    ? 'bg-blue-600 text-white border border-blue-600'
                    : 'bg-white border border-blue-200 text-blue-700 hover:bg-blue-50'
                ]"
                :title="appliedSuggestions.has(suggestion) ? '已追加' : '点击追加到优化结果'"
              >
                <span class="flex items-center gap-1">
                  <svg v-if="appliedSuggestions.has(suggestion)" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ suggestion }}
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 底部操作栏 -->
    <template #footer>
      <div class="flex justify-end items-center gap-2.5">
        <button
          @click="$emit('close')"
          class="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-sm transition-colors"
        >
          取消
        </button>

        <button
          @click="$emit('transform')"
          :disabled="isTransforming || !userInput"
          class="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-sm hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-2xs"
        >
          <svg v-if="isTransforming" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          {{ isTransforming ? '优化中...' : (transformResult ? '重新优化' : '开始优化') }}
        </button>

        <button
          v-if="transformResult"
          @click="$emit('apply')"
          class="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-sm hover:bg-blue-700 active:scale-[0.98] transition-all shadow-2xs flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          应用结果
        </button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import type { TransformResult } from '@/services/keywordTransformService';

const transformModes = [
  {
    value: 'dialogue' as const,
    label: '对话优化',
    icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
    description: '优化为更适合AI对话的表达'
  },
  {
    value: 'professional' as const,
    label: '专业表达',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    description: '转换为更专业、准确的术语'
  },
  {
    value: 'creative' as const,
    label: '创意增强',
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    description: '增加创意元素和想象空间'
  },
  {
    value: 'analytical' as const,
    label: '深度分析',
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    description: '引导进行深入分析和思考'
  }
];

const props = defineProps<{
  userInput: string;
  selectedMode: 'dialogue' | 'professional' | 'creative' | 'analytical';
  transformResult: TransformResult | null;
  isTransforming: boolean;
}>();

const emit = defineEmits<{
  close: [];
  transform: [];
  apply: [];
  'update:selectedMode': [value: 'dialogue' | 'professional' | 'creative' | 'analytical'];
  'update:transformResult': [value: TransformResult];
}>();

// 已追加的建议
const appliedSuggestions = ref<Set<string>>(new Set());

// 追加建议到优化结果
const appendSuggestion = (suggestion: string) => {
  if (!props.transformResult) return;
  
  if (appliedSuggestions.value.has(suggestion)) {
    // 已经追加过，提示用户
    ElMessage({
      message: '该建议已追加',
      type: 'info',
      duration: 1500
    });
    return;
  }
  
  // 追加到优化结果
  const newText = props.transformResult.transformedText + '\n' + suggestion;
  const newResult: TransformResult = {
    ...props.transformResult,
    transformedText: newText
  };
  
  emit('update:transformResult', newResult);
  appliedSuggestions.value.add(suggestion);
  
  ElMessage({
    message: '已追加到优化结果',
    type: 'success',
    duration: 1500
  });
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e4e4e7;
  border-radius: 20px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #d4d4d8;
}
</style>

<style>
/* Element Plus Dialog 样式覆盖 */
.transform-modal.el-dialog,
.transform-modal {
  padding: 0 !important;
  --el-dialog-padding-primary: 0px !important;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 85vh;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.transform-modal .el-dialog__header {
  padding: 16px 20px 12px;
  margin: 0;
  border-bottom: 1px solid #f4f4f5;
  background: #ffffff;
  flex-shrink: 0;
}

.transform-modal .el-dialog__body {
  padding: 16px 20px;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  background: #ffffff;
}

.transform-modal .el-dialog__footer {
  padding: 12px 20px 16px;
  background: #ffffff;
  border-top: 1px solid #f4f4f5;
  flex-shrink: 0;
}

/* 自定义滚动条样式 */
.transform-modal .el-dialog__body::-webkit-scrollbar {
  width: 6px;
}

.transform-modal .el-dialog__body::-webkit-scrollbar-track {
  background: transparent;
}

.transform-modal .el-dialog__body::-webkit-scrollbar-thumb {
  background-color: #e4e4e7;
  border-radius: 20px;
}

.transform-modal .el-dialog__body::-webkit-scrollbar-thumb:hover {
  background-color: #d4d4d8;
}
</style>

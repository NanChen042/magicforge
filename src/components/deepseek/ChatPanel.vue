<template>
  <div class="w-full h-full flex flex-col bg-white overflow-hidden min-h-0">

    <!-- 1. 头部：系统配置抽屉唤起按钮 + Element Plus 高级模型下拉选择器 -->
    <div class="flex flex-col sm:flex-row items-center justify-between px-4 py-2.5 border-b border-zinc-200 bg-white sticky top-0 z-30 shrink-0 gap-2">
      <div class="flex items-center gap-2 w-full sm:w-auto">
        <!-- 唤起历史边栏按钮 (仅桌面端收起时显示) -->
        <button
          @click="$emit('toggle-sidebar')"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-zinc-700 bg-white hover:bg-blue-50 hover:text-blue-600 rounded-sm transition-all cursor-pointer shadow-2xs border border-slate-200 hover:border-blue-200"
          :class="{ 'hidden': isSidebarVisible }"
          title="展开历史对话边栏"
        >
          <svg class="h-3.5 w-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
          <span class="hidden sm:inline">历史对话</span>
        </button>

        <!-- 唤起模型配置按钮 (仅移动端显示，或桌面端收起时显示) -->
        <button
          @click="$emit('open-settings')"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-zinc-700 bg-white hover:bg-blue-50 hover:text-blue-600 rounded-sm transition-all cursor-pointer shadow-2xs border border-slate-200 hover:border-blue-200"
          :class="{ 'lg:hidden': isDesktopConfigVisible }"
          title="展开模型配置"
        >
          <svg class="h-3.5 w-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
          <span class="hidden sm:inline">模型配置</span>
        </button>

        <div class="h-4 w-[1px] bg-zinc-200 mx-0.5"></div>

        <!-- 模型下拉选择组件 -->
        <el-dropdown trigger="click" @command="(modelId: string) => $emit('update:modelName', modelId)">
          <button class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-blue-50 border border-zinc-200 hover:border-blue-300 rounded-md text-xs font-bold text-zinc-900 hover:text-blue-700 shadow-2xs transition-all cursor-pointer">
            <span>{{ currentModelConfig?.name || modelName || '选择模型' }}</span>
            <svg class="w-3 h-3 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <template #dropdown>
            <el-dropdown-menu class="p-1.5 min-w-[220px] max-h-[380px] overflow-y-auto custom-scrollbar shadow-xl border-zinc-100">
              <div v-if="modelsLoading" class="px-3 py-3 text-xs text-zinc-500">正在获取可用模型...</div>
              <div v-else-if="modelLoadError" class="w-[280px] px-3 py-2">
                <p class="text-xs leading-5 text-red-600">{{ modelLoadError }}</p>
                <button type="button" class="mt-2 text-xs font-medium text-blue-700 hover:text-blue-800" @click="$emit('refresh-models')">重新获取</button>
              </div>
              <div v-else-if="Object.keys(groupedModels).length === 0" class="px-3 py-3 text-xs text-zinc-500">当前 Key 未返回可用模型。</div>
              <div v-for="(group, index) in groupedModels" :key="group.label" class="mb-1">
                <!-- 分类标题 -->
                <div class="px-2 flex items-center gap-2" :class="index === 0 ? 'mb-1.5' : 'mt-3 mb-1.5'">
                  <span class="h-1.5 w-1.5 rounded-full" :class="group.accentClass"></span>
                  <span class="text-[11px] font-semibold text-zinc-600">{{ group.label }}</span>
                  <span class="font-mono text-[10px] text-zinc-400">{{ group.models.length }}</span>
                  <div class="h-[1px] flex-1 bg-zinc-100"></div>
                </div>
                
                <el-dropdown-item 
                  v-for="model in group.models" 
                  :key="model.id"
                  :command="model.id"
                  :class="{'!bg-blue-50/50 !text-blue-700': model.id === modelName}"
                  class="rounded-sm mb-0.5 transition-colors duration-200"
                >
                  <div class="flex w-full items-center gap-2.5 py-1.5">
                    <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border" :class="model.id === modelName ? 'border-blue-200 bg-blue-100 text-blue-700' : 'border-zinc-200 bg-zinc-50 text-zinc-400'">
                      <svg v-if="model.id === modelName" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m5 12 4 4L19 6" /></svg>
                      <span v-else class="h-1.5 w-1.5 rounded-full bg-current opacity-50"></span>
                    </span>
                    <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between gap-3">
                      <span class="text-[13px] font-medium" :class="model.id === modelName ? 'text-blue-700 font-semibold' : 'text-zinc-700'">{{ model.name }}</span>
                    </div>
                    <span class="mt-0.5 block truncate font-mono text-[10px]" :class="model.id === modelName ? 'text-blue-600/80' : 'text-zinc-400'">{{ model.id }}</span>
                    </div>
                  </div>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <div v-if="isProcessing" class="flex items-center gap-3 w-full sm:w-auto justify-end">
        <span class="text-[10px] font-mono font-medium text-zinc-400 uppercase tracking-widest animate-pulse">
          生成中... {{ streamProgress }}%
        </span>
        <div class="w-24 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
          <div class="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out" :style="{ width: streamProgress + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- 2. 主内容区域 -->
    <div class="flex-1 overflow-hidden relative">
      
      <!-- 对话内容 -->
      <div class="chat-container h-full relative" ref="chatContainerRef" @scroll="handleScroll">
        <!-- 背景装饰 (网格) -->
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNjYmQ1ZTEiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-40 pointer-events-none"></div>
        
        <div class="relative z-10 min-h-full flex flex-col p-4 sm:p-6">
          <!-- 思考状态提示 -->
          <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
            <div v-if="isThinking" class="sticky top-0 z-20 mb-8 mx-auto max-w-fit">
              <div class="relative overflow-hidden flex items-center gap-3 px-4 py-2 bg-white rounded-sm border border-zinc-200 shadow-sm ring-1 ring-zinc-900/5">
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-100/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                <div class="relative flex items-center gap-2.5">
                  <div class="flex h-2.5 w-2.5">
                    <span class="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-blue-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
                  </div>
                  <span class="text-[10px] font-bold text-blue-700 uppercase tracking-widest leading-none">AI Processing</span>
                </div>
              </div>
            </div>
          </transition>

          <!-- 消息列表 -->
          <div class="flex-1 space-y-2">
            <MessageItem 
              v-for="(item, index) in conversationHistory" 
              :key="index" 
              :message="item" 
              :index="index" 
              :isLast="index === conversationHistory.length - 1" 
              :isThinking="isThinking" 
              :isStopped="isLastMessageStopped"
              :reasoning="index === conversationHistory.length - 1 && item.role === 'assistant' ? reasoningContent : undefined"
              :isReasoningModel="showReasoningTab"
            />
            
            <!-- 后续问题推荐 -->
            <FollowUpSuggestions
              :suggestions="followUpSuggestions || []"
              :isLoading="isLoadingFollowUp || false"
              :show="showFollowUp || false"
              @select="$emit('select-follow-up', $event)"
              @refresh="$emit('refresh-follow-up')"
            />
          </div>

          <!-- 空状态 -->
          <div v-if="conversationHistory.length === 0" class="flex-1 flex flex-col justify-center">
            <EmptyState 
              :hotTopics="hotTopics" 
              :isLoadingTopics="isLoadingTopics" 
              @select-question="$emit('select-question', $event)" 
              @refresh-topics="$emit('refresh-topics')" 
            />
          </div>
        </div>
      </div>

      <!-- 错误提示 Toast -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="error" class="absolute top-16 left-4 right-4 z-40 mx-auto max-w-lg">
          <div class="flex items-start gap-3 p-4 bg-white border border-red-100 rounded-sm shadow-xl shadow-red-500/5 ring-1 ring-red-500/10">
            <div class="shrink-0 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-bold text-zinc-900 mb-0.5">系统错误</h4>
              <p class="text-xs text-zinc-500 leading-relaxed">{{ error }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- 3. 底部输入区域 -->
    <div class="px-3 pb-4 md:px-6 md:pb-6 relative z-20 shrink-0">
      <div class="max-w-4xl mx-auto flex flex-col relative">
        
        <!-- 图片预览区域 -->
        <div v-if="uploadedImages && uploadedImages.length > 0" class="mb-3 flex flex-wrap gap-2">
          <div
            v-for="(img, index) in uploadedImages"
            :key="index"
            class="relative w-16 h-16 rounded-md overflow-hidden border border-zinc-200 shadow-sm group"
          >
            <img :src="img.preview" class="w-full h-full object-cover" />
            <button
              @click="$emit('remove-image', index)"
              class="absolute -top-1 -right-1 w-5 h-5 bg-zinc-900 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-500"
              title="移除图片"
            >
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- 悬浮的药丸提示词 (仅当会话为空时显示) -->
        <div v-if="conversationHistory.length === 0 && hotTopics.length > 0" class="flex items-center flex-wrap gap-2 mb-3">
          <button
            v-for="(topic, index) in hotTopics.slice(0, 4)"
            :key="index"
            @click="$emit('select-question', topic)"
            class="px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-zinc-200/80 rounded-full text-[11px] font-medium text-zinc-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 transition-all shadow-sm cursor-pointer whitespace-nowrap"
          >
            {{ topic }}
          </button>
          
          <button 
            @click="$emit('clear')" 
            class="ml-auto inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/80 border border-zinc-200/80 text-zinc-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm cursor-pointer"
            title="清空对话"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div v-else class="flex justify-end mb-2">
           <button 
            @click="$emit('clear')" 
            class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/80 border border-zinc-200/80 text-zinc-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm cursor-pointer"
            title="清空对话"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <!-- 悬浮卡片式输入框 -->
        <div class="relative flex flex-col rounded-md border border-zinc-300 bg-white p-2 shadow-sm transition-colors focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-600/10">
          <textarea
            ref="textareaRef"
            id="message-input"
            :value="userInput"
            @input="handleInput"
            class="w-full resize-none bg-transparent border-0 ring-0 text-sm text-zinc-800 placeholder:text-zinc-400 leading-relaxed focus:ring-0 focus:outline-none custom-scrollbar min-h-[72px] max-h-[240px] px-2 py-2"
            :placeholder="supportsVision ? '输入你的提示词，可上传图片进行视觉分析...' : '请输入提示词...'"
            :disabled="isProcessing"
            @keydown.enter.exact.prevent="$emit('send')"
          ></textarea>
          
          <!-- 底部工具条 -->
          <div class="flex items-center justify-between mt-1 px-1 pb-1">
            <div class="flex items-center gap-2">
              <!-- 图片上传按钮 -->
              <label
                v-if="supportsVision"
                class="inline-flex items-center justify-center p-1.5 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors"
                title="上传图片"
              >
                <input
                  ref="imageInputRef"
                  type="file"
                  accept="image/*"
                  multiple
                  class="hidden"
                  @change="handleImageSelect"
                  :disabled="isProcessing"
                />
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </label>

              <!-- 优化提示词 -->
              <button
                v-if="!isProcessing"
                @click="$emit('optimize')"
                :disabled="!userInput.trim() || isTransforming"
                class="inline-flex items-center justify-center p-1.5 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="AI 优化提示词"
              >
                <svg v-if="isTransforming" class="h-5 w-5 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </button>
            </div>

            <!-- 发送/停止按钮 -->
            <button
              v-if="isProcessing"
              @click="$emit('stop')"
              class="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors cursor-pointer"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <rect x="6" y="6" width="12" height="12" rx="2" ry="2"></rect>
              </svg>
            </button>
            <button
              v-else
              @click="$emit('send')"
              :disabled="!userInput.trim()"
              class="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <p class="text-center mt-3 text-[10px] text-zinc-400 tracking-wide font-light">内容由人工智能生成，可能不完全准确，仅供参考。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import MessageItem from './chat/MessageItem.vue';
import EmptyState from './chat/EmptyState.vue';
import FollowUpSuggestions from './chat/FollowUpSuggestions.vue';

interface Message {
  role: string;
  content: string;
}

interface UploadedImage {
  file: File;
  preview: string;
  base64?: string;
}

const props = defineProps<{
  modelName?: string;
  conversationHistory: Message[];
  reasoningContent: string;
  isProcessing: boolean;
  isThinking: boolean;
  isLastMessageStopped: boolean;
  error: string | null;
  streamProgress: number;
  isDesktopConfigVisible?: boolean;
  isSidebarVisible?: boolean;
  userInput: string;
  isTransforming: boolean;
  hotTopics: string[];
  isLoadingTopics: boolean;
  showReasoningTab: boolean;
  modelType?: 'chat' | 'reasoning' | 'multimodal' | 'ocr' | 'translate' | 'coder';
  followUpSuggestions?: string[];
  isLoadingFollowUp?: boolean;
  showFollowUp?: boolean;
  supportsVision?: boolean;
  uploadedImages?: UploadedImage[];
  availableModels?: SiliconFlowModel[];
  modelsLoading?: boolean;
  modelLoadError?: string;
}>();

const emit = defineEmits<{
  'open-settings': [];
  'toggle-sidebar': [];
  'update:userInput': [value: string];
  'update:modelName': [value: string];
  'send': [];
  'clear': [];
  'optimize': [];
  'stop': [];
  'select-question': [question: string];
  'refresh-topics': [];
  'scroll': [event: Event];
  'select-follow-up': [question: string];
  'refresh-follow-up': [];
  'upload-images': [files: File[]];
  'remove-image': [index: number];
  'refresh-models': [];
}>();

import { getModelConfig } from '@/constants/modelConfig';
import type { SiliconFlowModel } from '@/services/siliconFlowClient';

const textareaRef = ref<HTMLTextAreaElement | null>(null);

const adjustTextareaHeight = () => {
  const el = textareaRef.value;
  if (!el) return;
  el.style.height = 'auto';
  const newHeight = Math.min(Math.max(el.scrollHeight, 64), 240);
  el.style.height = `${newHeight}px`;
};

const handleInput = (event: Event) => {
  const value = (event.target as HTMLTextAreaElement).value;
  emit('update:userInput', value);
  adjustTextareaHeight();
};

watch(() => props.userInput, () => {
  nextTick(adjustTextareaHeight);
});

const MODEL_GROUPS = [
  { key: 'reasoning', label: '推理', accentClass: 'bg-violet-500' },
  { key: 'vision', label: '视觉', accentClass: 'bg-emerald-500' },
  { key: 'image', label: '图像生成', accentClass: 'bg-pink-500' },
  { key: 'audio', label: '语音', accentClass: 'bg-amber-500' },
  { key: 'code', label: '代码', accentClass: 'bg-cyan-500' },
  { key: 'chat', label: '对话', accentClass: 'bg-blue-500' },
  { key: 'other', label: '其他', accentClass: 'bg-zinc-400' }
] as const;

type ModelGroupKey = (typeof MODEL_GROUPS)[number]['key'];

const getModelGroup = (modelId: string): ModelGroupKey => {
  const id = modelId.toLowerCase();
  if (/(r1|reasoner|think|qwq)/.test(id)) return 'reasoning';
  if (/(vl|vision|ocr|internvl|qwen2-vl)/.test(id)) return 'vision';
  if (/(image|kolors|flux|stable-diffusion|wanx)/.test(id)) return 'image';
  if (/(audio|speech|voice|asr|whisper|cosyvoice|fish-speech)/.test(id)) return 'audio';
  if (/(coder|code|starcoder|deepseek-coder)/.test(id)) return 'code';
  if (/(chat|instruct|deepseek|qwen|glm|llama|mistral|gemma)/.test(id)) return 'chat';
  return 'other';
};

const getDisplayName = (modelId: string) => {
  const [provider, name] = modelId.split('/');
  return name ? `${provider} ${name}` : modelId;
};

const groupedModels = computed(() => {
  const models = (props.availableModels || []).map((model) => ({
    id: model.id,
    name: getDisplayName(model.id),
    group: getModelGroup(model.id)
  }));

  return MODEL_GROUPS.map((group) => ({
    ...group,
    models: models.filter((model) => model.group === group.key)
  })).filter((group) => group.models.length > 0);
});

const currentModelConfig = computed(() => {
  const configured = getModelConfig(props.modelName || '');
  return configured || (props.modelName ? { name: props.modelName } : undefined);
});

// 是否支持视觉输入
const supportsVision = computed(() => props.supportsVision || props.modelType === 'multimodal');

// 图片输入引用
const imageInputRef = ref<HTMLInputElement | null>(null);

// 处理图片选择
const handleImageSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    emit('upload-images', Array.from(input.files));
    // 清空 input 以便可以重复选择同一文件
    input.value = '';
  }
};

// 根据模型类型获取功能提示
const getModelFeatureHint = () => {
  switch (props.modelType) {
    case 'reasoning':
      return '思考模型：支持深度推理，可查看思维过程';
    case 'multimodal':
      return '视觉模型：支持图像理解，可上传图片分析';
    case 'ocr':
      return 'OCR模型：支持文档识别转Markdown';
    case 'translate':
      return '翻译模型：支持多语种互译';
    case 'coder':
      return '代码模型：专注代码生成与修复';
    default:
      return '对话模型：通用智能对话';
  }
};

// 获取模型类型标签文字
const getModelTypeLabel = () => {
  switch (props.modelType) {
    case 'reasoning':
      return '思考';
    case 'multimodal':
      return '视觉';
    case 'ocr':
      return 'OCR';
    case 'translate':
      return '翻译';
    case 'coder':
      return '代码';
    default:
      return '对话';
  }
};

// 获取模型类型标签样式
const getModelTypeBadgeClass = () => {
  switch (props.modelType) {
    case 'reasoning':
      return 'bg-amber-100 text-amber-700';
    case 'multimodal':
      return 'bg-emerald-100 text-emerald-700';
    case 'ocr':
      return 'bg-orange-100 text-orange-700';
    case 'translate':
      return 'bg-cyan-100 text-cyan-700';
    case 'coder':
      return 'bg-pink-100 text-pink-700';
    default:
      return 'bg-blue-100 text-blue-700';
  }
};



const chatContainerRef = ref<HTMLElement | null>(null);

const handleScroll = (event: Event) => {
  emit('scroll', event);
};

defineExpose({
  chatContainerRef
});
</script>

<style scoped>
/* 容器滚动 */
.chat-container {
  overflow-y: auto;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: #e4e4e7 transparent;
}

.chat-container::-webkit-scrollbar {
  width: 5px;
}

.chat-container::-webkit-scrollbar-track {
  background: transparent;
  margin: 4px;
}

.chat-container::-webkit-scrollbar-thumb {
  background-color: #e4e4e7;
  border-radius: 20px;
  transition: background-color 0.3s;
}

.chat-container::-webkit-scrollbar-thumb:hover {
  background-color: #d4d4d8;
}

/* 自定义滚动条 */
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

/* 隐藏 textarea 拖拽图标 */
textarea::-webkit-resizer {
  display: none;
}

/* Shimmer 动画 */
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>

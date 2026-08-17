<template>
  <div class="relative inline-block text-left" ref="selectorRef" :class="{ 'z-50': isOpen }">
    <!-- Trigger Button -->
    <button
      @click="isOpen = !isOpen"
      type="button"
      class="group inline-flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-slate-50 border rounded-lg text-xs font-semibold shadow-2xs transition-all cursor-pointer select-none"
      :class="isOpen ? 'border-blue-400 ring-2 ring-blue-500/10 text-blue-700 bg-blue-50/40' : 'border-slate-200 hover:border-blue-300 text-zinc-800'"
      title="切换 AI 模型"
    >
      <!-- Model Type Icon -->
      <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[11px]" :class="activeTypeBadgeClass">
        <svg v-if="activeType === 'reasoning'" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2a6 6 0 0 0-6 6c0 2.5 1.5 4.5 3.5 5.5V17a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3.5C16.5 12.5 18 10.5 18 8a6 6 0 0 0-6-6z"/>
          <path d="M9 21h6"/>
        </svg>
        <svg v-else-if="activeType === 'multimodal'" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        <svg v-else-if="activeType === 'coder'" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
        <svg v-else class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/>
        </svg>
      </span>

      <!-- Model Name -->
      <span class="max-w-[140px] sm:max-w-[200px] truncate font-medium">
        {{ currentDisplayName }}
      </span>

      <!-- Free / Feature Badge -->
      <span v-if="activeConfig?.free" class="hidden sm:inline-flex items-center px-1.5 py-0.2 text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded">
        免费
      </span>
      <span v-else-if="activeType === 'reasoning'" class="hidden sm:inline-flex items-center px-1.5 py-0.2 text-[10px] font-medium bg-purple-50 text-purple-700 border border-purple-200/80 rounded">
        思考
      </span>

      <!-- Chevron Icon -->
      <svg
        class="w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 group-hover:text-zinc-600"
        :class="{ 'rotate-180 text-blue-600': isOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown Modal Overlay / Popover -->
    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute mt-2 w-[340px] sm:w-[460px] bg-white rounded-xl shadow-2xl border border-slate-200/90 z-50 overflow-hidden flex flex-col text-slate-800"
        :class="placement === 'right' ? 'right-0' : 'left-0'"
        style="max-height: 520px;"
      >
        <!-- Header: Search & Refresh -->
        <div class="p-3 border-b border-slate-100 bg-slate-50/50 space-y-2.5">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <span class="font-bold text-xs text-zinc-900">选择语言模型</span>
              <span class="text-[10px] text-zinc-400 font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">
                {{ filteredModels.length }} 可用
              </span>
            </div>
            <button
              type="button"
              @click="$emit('refresh-models')"
              class="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
              :disabled="loading"
            >
              <svg class="w-3 h-3" :class="{ 'animate-spin': loading }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>{{ loading ? '刷新中...' : '刷新模型' }}</span>
            </button>
          </div>

          <!-- Search Input -->
          <div class="relative">
            <svg class="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索模型名称、ID 或厂商 (如 Qwen, R1, V3...)"
              class="w-full pl-8 pr-7 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 placeholder-zinc-400 transition-all font-sans"
            />
            <button
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 text-xs"
            >
              ✕
            </button>
          </div>

          <!-- Filter Category Pills -->
          <div class="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pt-0.5 no-scrollbar">
            <button
              v-for="tab in filterTabs"
              :key="tab.id"
              type="button"
              @click="activeTab = tab.id"
              class="px-2.5 py-1 text-[11px] rounded-md font-medium whitespace-nowrap transition-colors cursor-pointer"
              :class="activeTab === tab.id ? 'bg-blue-600 text-white shadow-2xs' : 'bg-white hover:bg-slate-100 text-zinc-600 border border-slate-200/80'"
            >
              {{ tab.name }}
            </button>
          </div>
        </div>

        <!-- Model List -->
        <div class="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar min-h-[220px]">
          <!-- Loading State -->
          <div v-if="loading" class="py-12 text-center text-xs text-zinc-400 space-y-2">
            <div class="inline-block w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <div>正在加载最新可用模型...</div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="p-4 text-center">
            <div class="text-xs text-red-600 leading-relaxed">{{ error }}</div>
            <button
              type="button"
              @click="$emit('refresh-models')"
              class="mt-2 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
            >
              重新获取
            </button>
          </div>

          <!-- Empty Search State -->
          <div v-else-if="filteredModels.length === 0" class="py-12 text-center text-xs text-zinc-400 space-y-2">
            <p>未找到与 "{{ searchQuery }}" 匹配的模型</p>
            <button
              v-if="searchQuery || activeTab !== 'all'"
              type="button"
              @click="resetFilter"
              class="text-blue-600 font-medium hover:underline text-xs"
            >
              清除筛选条件
            </button>
          </div>

          <!-- Model Items -->
          <div
            v-else
            v-for="item in filteredModels"
            :key="item.id"
            @click="selectModel(item.id)"
            class="group w-full flex items-start gap-3 p-2.5 rounded-lg border transition-all cursor-pointer select-none text-left"
            :class="item.id === modelValue 
              ? 'bg-blue-50/80 border-blue-200 text-blue-900 shadow-2xs' 
              : 'bg-white hover:bg-slate-50/80 border-transparent hover:border-slate-200/90 text-zinc-700'"
          >
            <!-- Smart Vendor Brand & Capability Avatar Badge -->
            <div
              class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-colors mt-0.5 text-xs font-mono font-bold"
              :class="item.id === modelValue ? 'bg-blue-600 border-blue-600 text-white shadow-2xs' : getModelBadgeStyle(item)"
            >
              <template v-if="item.type === 'reasoning'">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2a6 6 0 0 0-6 6c0 2.5 1.5 4.5 3.5 5.5V17a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3.5C16.5 12.5 18 10.5 18 8a6 6 0 0 0-6-6z"/>
                  <path d="M9 21h6"/>
                </svg>
              </template>
              <template v-else-if="item.type === 'multimodal'">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </template>
              <template v-else-if="item.type === 'coder'">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="16 18 22 12 16 6"/>
                  <polyline points="8 6 2 12 8 18"/>
                </svg>
              </template>
              <template v-else>
                <span :class="item.id === modelValue ? '' : 'text-[11px] font-black'">{{ getModelBrandText(item.id) }}</span>
              </template>
            </div>

            <!-- Model Info -->
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="text-xs font-semibold leading-none" :class="item.id === modelValue ? 'text-blue-900 font-bold' : 'text-zinc-800'">
                  {{ item.displayName }}
                </span>

                <!-- Feature Badges -->
                <span v-if="item.free" class="px-1.5 py-0.2 text-[9px] font-bold bg-emerald-100 text-emerald-800 rounded">
                  免费
                </span>
                <span v-if="item.type === 'reasoning'" class="px-1.5 py-0.2 text-[9px] font-medium bg-purple-100 text-purple-800 rounded">
                  深度思考
                </span>
                <span v-else-if="item.type === 'multimodal'" class="px-1.5 py-0.2 text-[9px] font-medium bg-teal-100 text-teal-800 rounded">
                  视觉多模态
                </span>
                <span v-else-if="item.type === 'coder'" class="px-1.5 py-0.2 text-[9px] font-medium bg-pink-100 text-pink-800 rounded">
                  代码专精
                </span>
                <span v-if="item.isCurated" class="px-1.5 py-0.2 text-[9px] font-medium bg-blue-100 text-blue-800 rounded">
                  精选
                </span>
              </div>

              <!-- Description / Subtitle -->
              <p class="text-[11px] text-zinc-500 line-clamp-1 mt-1 leading-normal font-sans">
                {{ item.description || item.id }}
              </p>

              <!-- Model ID Tag -->
              <div class="text-[10px] font-mono text-zinc-400 truncate mt-0.5">
                {{ item.id }}
              </div>
            </div>

            <!-- Selection Indicator -->
            <div v-if="item.id === modelValue" class="shrink-0 text-blue-600 mt-1">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-3.5 py-2 border-t border-slate-100 bg-slate-50 text-[11px] text-zinc-500 flex items-center justify-between">
          <span class="truncate">支持 SiliconFlow 任意兼容模型</span>
          <a
            href="https://cloud.siliconflow.cn/models"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 hover:underline font-medium shrink-0 flex items-center gap-0.5"
          >
            <span>模型广场</span>
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { SiliconFlowModel } from '@/services/siliconFlowClient';
import { 
  MODEL_CONFIGS, 
  getModelConfig, 
  isChatOrLLMModel, 
  getModelDisplayName,
  type ModelType 
} from '@/constants/modelConfig';

const props = withDefaults(defineProps<{
  modelValue: string;
  availableModels?: SiliconFlowModel[];
  loading?: boolean;
  error?: string;
  placement?: 'left' | 'right';
}>(), {
  availableModels: () => [],
  loading: false,
  error: '',
  placement: 'left'
});

const emit = defineEmits<{
  'update:modelValue': [modelId: string];
  'refresh-models': [];
}>();

const isOpen = ref(false);
const searchQuery = ref('');
const activeTab = ref<'all' | 'featured' | 'reasoning' | 'chat' | 'vision' | 'free'>('all');
const selectorRef = ref<HTMLElement | null>(null);

const filterTabs = [
  { id: 'all', name: '全部' },
  { id: 'featured', name: '推荐' },
  { id: 'reasoning', name: '思考' },
  { id: 'chat', name: '对话' },
  { id: 'vision', name: '视觉' },
  { id: 'free', name: '免费' }
] as const;

// 点击外部关闭下拉框
const handleClickOutside = (e: MouseEvent) => {
  if (selectorRef.value && !selectorRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const activeConfig = computed(() => getModelConfig(props.modelValue));

const currentDisplayName = computed(() => {
  return activeConfig.value?.name || getModelDisplayName(props.modelValue) || '选择模型';
});

const activeType = computed<ModelType>(() => {
  return activeConfig.value?.type || 'chat';
});

const activeTypeBadgeClass = computed(() => {
  switch (activeType.value) {
    case 'reasoning':
      return 'bg-purple-100 text-purple-700';
    case 'multimodal':
      return 'bg-emerald-100 text-emerald-700';
    case 'coder':
      return 'bg-pink-100 text-pink-700';
    default:
      return 'bg-blue-100 text-blue-700';
  }
});

interface EnhancedModelItem {
  id: string;
  displayName: string;
  type: ModelType;
  description: string;
  free: boolean;
  provider: string;
  isCurated: boolean;
}

// 聚合官方精选模型和从 API 获取的所有兼容聊天模型
const allProcessedModels = computed<EnhancedModelItem[]>(() => {
  const modelMap = new Map<string, EnhancedModelItem>();

  // 1. 先加入官方精选配置模型
  MODEL_CONFIGS.forEach(cfg => {
    modelMap.set(cfg.id, {
      id: cfg.id,
      displayName: cfg.name,
      type: cfg.type,
      description: cfg.description,
      free: cfg.free,
      provider: cfg.provider,
      isCurated: true
    });
  });

  // 2. 结合 SiliconFlow API 动态返回的模型（自动过滤非聊天/非大语言模型）
  if (props.availableModels && props.availableModels.length > 0) {
    props.availableModels.forEach(m => {
      // 排除 Embedding、Rerank、Flux/Image 等非对话模型
      if (!isChatOrLLMModel(m.id)) return;

      if (!modelMap.has(m.id)) {
        const config = getModelConfig(m.id);
        const isFree = m.id.toLowerCase().includes('7b') || m.id.toLowerCase().includes('1.5b') || m.id.toLowerCase().includes('free');
        const isReasoning = m.id.toLowerCase().includes('r1') || m.id.toLowerCase().includes('reasoning') || m.id.toLowerCase().includes('qwq');
        const isVision = m.id.toLowerCase().includes('vl') || m.id.toLowerCase().includes('internvl');

        let type: ModelType = 'chat';
        if (isReasoning) type = 'reasoning';
        else if (isVision) type = 'multimodal';
        else if (config?.type) type = config.type;

        modelMap.set(m.id, {
          id: m.id,
          displayName: config?.name || getModelDisplayName(m.id),
          type,
          description: config?.description || `SiliconFlow 托管的 ${type} 语言模型`,
          free: config?.free ?? isFree,
          provider: config?.provider || m.id.split('/')[0] || 'AI',
          isCurated: Boolean(config)
        });
      }
    });
  }

  return Array.from(modelMap.values());
});

// 根据分类标签与搜索关键词过滤
const filteredModels = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  const tab = activeTab.value;

  return allProcessedModels.value.filter(item => {
    // 1. 标签过滤
    if (tab === 'featured' && !item.isCurated) return false;
    if (tab === 'reasoning' && item.type !== 'reasoning') return false;
    if (tab === 'chat' && item.type !== 'chat') return false;
    if (tab === 'vision' && item.type !== 'multimodal') return false;
    if (tab === 'free' && !item.free) return false;

    // 2. 搜索词匹配
    if (query) {
      const matchName = item.displayName.toLowerCase().includes(query);
      const matchId = item.id.toLowerCase().includes(query);
      const matchDesc = item.description.toLowerCase().includes(query);
      const matchProvider = item.provider.toLowerCase().includes(query);
      return matchName || matchId || matchDesc || matchProvider;
    }

    return true;
  });
});

const getModelBrandText = (id: string): string => {
  const lower = id.toLowerCase();
  if (lower.includes('deepseek')) return 'DS';
  if (lower.includes('qwen')) return '通义';
  if (lower.includes('glm') || lower.includes('zhipu') || lower.includes('chatglm')) return '智谱';
  if (lower.includes('llama') || lower.includes('meta')) return 'Meta';
  if (lower.includes('yi') || lower.includes('01-ai')) return '零一';
  if (lower.includes('kimi') || lower.includes('moonshot')) return 'Kimi';
  if (lower.includes('hunyuan')) return '混元';
  if (lower.includes('baichuan')) return '百川';
  if (lower.includes('internlm')) return '书生';
  return id.substring(0, 2).toUpperCase();
};

const getModelBadgeStyle = (item: EnhancedModelItem): string => {
  const lower = item.id.toLowerCase();
  if (item.type === 'reasoning') return 'bg-purple-50 text-purple-700 border-purple-200';
  if (item.type === 'multimodal') return 'bg-teal-50 text-teal-700 border-teal-200';
  if (item.type === 'coder') return 'bg-pink-50 text-pink-700 border-pink-200';
  if (lower.includes('deepseek')) return 'bg-blue-50 text-blue-700 border-blue-200';
  if (lower.includes('qwen')) return 'bg-violet-50 text-violet-700 border-violet-200';
  if (lower.includes('glm') || lower.includes('zhipu')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (lower.includes('llama') || lower.includes('meta')) return 'bg-indigo-50 text-indigo-700 border-indigo-200';
  if (lower.includes('yi')) return 'bg-amber-50 text-amber-700 border-amber-200';
  return 'bg-slate-50 text-slate-700 border-slate-200';
};

const selectModel = (modelId: string) => {
  emit('update:modelValue', modelId);
  isOpen.value = false;
};

const resetFilter = () => {
  searchQuery.value = '';
  activeTab.value = 'all';
};
</script>

<style scoped>
/* 隐藏水平滚动条但保留滚动功能 */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

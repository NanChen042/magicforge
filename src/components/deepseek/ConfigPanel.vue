<template>
  <aside class="flex h-full w-full flex-col bg-white text-zinc-900 select-none font-sans">
    <!-- Header -->
    <header class="flex h-[53px] shrink-0 items-center justify-between border-b border-zinc-100 px-4">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/60">
          <svg class="h-3.5 w-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.12 2.12-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.04 1.56v.08h-3v-.08A1.7 1.7 0 0 0 10.66 18.7a1.7 1.7 0 0 0-1.88.34l-.06.06-2.12-2.12.06-.06A1.7 1.7 0 0 0 7 15.04a1.7 1.7 0 0 0-1.56-1.04h-.08v-3h.08A1.7 1.7 0 0 0 7 9.96 1.7 1.7 0 0 0 6.66 8.08l-.06-.06L8.72 5.9l.06.06a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 11.7 4.74v-.08h3v.08a1.7 1.7 0 0 0 1.04 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.12 2.12-.06.06A1.7 1.7 0 0 0 19.4 10a1.7 1.7 0 0 0 1.56 1.04h.08v3h-.08A1.7 1.7 0 0 0 19.4 15Z" />
          </svg>
        </div>
        <span class="text-xs font-bold text-zinc-900 tracking-tight">模型与推理参数</span>
      </div>

      <div class="flex items-center gap-1">
        <button
          type="button"
          class="hidden rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 xl:inline-flex cursor-pointer"
          title="收起配置面板"
          aria-label="收起配置面板"
          @click="$emit('close')"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <line x1="15" y1="3" x2="15" y2="21"/>
            <path d="M9 9l-3 3 3 3"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- Scroll Content -->
    <div class="custom-scrollbar flex-1 space-y-5 overflow-y-auto p-4">
      
      <!-- Section 1: API Key & Connection -->
      <section class="space-y-3.5">
        <div class="flex items-center justify-between">
          <h2 class="text-[11px] font-bold text-zinc-500 tracking-wider">
            API 凭证配置
          </h2>
        </div>

        <div>
          <label class="mb-1.5 block text-xs font-semibold text-zinc-700" for="api-key">
            SiliconFlow API Key
          </label>
          <div class="relative">
            <input
              id="api-key"
              type="password"
              :value="apiKey"
              autocomplete="off"
              placeholder="sk-..."
              class="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs font-mono text-zinc-800 placeholder-zinc-400 shadow-2xs outline-none transition-all hover:border-zinc-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10"
              @input="$emit('update:apiKey', ($event.target as HTMLInputElement).value)"
            />
          </div>
          <div class="mt-1.5 flex items-center justify-between text-[11px] text-zinc-400">
            <span>密钥仅保存在当前浏览器本地</span>
            <a
              class="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              href="https://cloud.siliconflow.cn/account/ak"
              target="_blank"
              rel="noopener noreferrer"
            >
              获取 API Key ↗
            </a>
          </div>
        </div>
      </section>

      <div class="h-px bg-zinc-100"></div>

      <!-- Section 2: System Prompt -->
      <section class="space-y-3">
        <div class="flex items-center justify-between">
          <label class="text-xs font-semibold text-zinc-700 flex items-center gap-1.5" for="system-prompt">
            <span>系统提示词 (System Prompt)</span>
          </label>
          <span
            v-if="systemPrompt"
            class="px-1.5 py-0.2 text-[10px] rounded font-medium bg-blue-50 text-blue-700 border border-blue-200/60"
          >
            已生效
          </span>
        </div>

        <div class="relative">
          <textarea
            id="system-prompt"
            :value="systemPrompt"
            rows="4"
            placeholder="为大模型设定角色设定、回答风格或格式要求（留空则使用默认通用助手）..."
            class="w-full resize-none rounded-md border border-zinc-200 bg-white p-3 text-xs leading-relaxed text-zinc-800 placeholder-zinc-400 shadow-2xs outline-none transition-all hover:border-zinc-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10 custom-scrollbar"
            @input="$emit('update:systemPrompt', ($event.target as HTMLTextAreaElement).value)"
          />
        </div>

        <!-- Presets -->
        <div class="flex flex-wrap items-center gap-1.5">
          <button
            v-for="preset in systemPresets"
            :key="preset.name"
            type="button"
            class="rounded-md border border-zinc-200/80 bg-zinc-50/70 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 px-2.5 py-1 text-[11px] text-zinc-600 font-medium transition-all cursor-pointer"
            @click="$emit('update:systemPrompt', preset.prompt)"
          >
            {{ preset.name }}
          </button>
          
          <button
            v-if="systemPrompt"
            type="button"
            class="rounded-md border border-transparent px-2.5 py-1 text-[11px] text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer ml-auto"
            @click="$emit('update:systemPrompt', '')"
          >
            清空提示词
          </button>
        </div>
      </section>

      <div class="h-px bg-zinc-100"></div>

      <!-- Section 3: Generation Parameters -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-[11px] font-bold text-zinc-500 tracking-wider">
            基础推理参数
          </h2>
        </div>

        <!-- Streaming Switch -->
        <div class="flex items-center justify-between gap-4 p-2.5 rounded-md bg-zinc-50/80 border border-zinc-100">
          <div>
            <p class="text-xs font-semibold text-zinc-800">流式打字机输出</p>
            <p class="text-[11px] text-zinc-400 mt-0.5">逐字流式返回 AI 思考与文本回答</p>
          </div>
          <el-switch :model-value="streaming" @change="$emit('update:streaming', $event)" />
        </div>

        <!-- Temperature Slider -->
        <div v-if="currentCapabilities.temperature" class="space-y-1.5">
          <div class="flex items-center justify-between">
            <div>
              <label class="text-xs font-semibold text-zinc-700" for="temperature">
                Temperature (随机性/创造力)
              </label>
              <p class="text-[10px] text-zinc-400">值越高回答越发散创意，越低越严谨稳定</p>
            </div>
            <output class="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100/60">
              {{ temperature.toFixed(1) }}
            </output>
          </div>
          <input
            id="temperature"
            class="modern-slider w-full cursor-pointer"
            type="range"
            :value="temperature"
            min="0"
            max="2"
            step="0.1"
            @input="$emit('update:temperature', Number(($event.target as HTMLInputElement).value))"
          />
        </div>

        <!-- Max Tokens Slider -->
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <div>
              <label class="text-xs font-semibold text-zinc-700" for="max-tokens">
                最大输出长度 (Max Tokens)
              </label>
              <p class="text-[10px] text-zinc-400">单次回答允许生成的最大 Token 数量</p>
            </div>
            <output class="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100/60">
              {{ maxTokens }}
            </output>
          </div>
          <input
            id="max-tokens"
            class="modern-slider w-full cursor-pointer"
            type="range"
            :value="maxTokens"
            min="500"
            max="8000"
            step="500"
            @input="$emit('update:maxTokens', Number(($event.target as HTMLInputElement).value))"
          />
        </div>
      </section>

      <!-- Section 4: Advanced Sampling Params -->
      <section v-if="hasAdvancedControls" class="border-t border-zinc-100 pt-3">
        <button
          class="flex w-full items-center justify-between py-1.5 text-xs font-semibold text-zinc-700 hover:text-blue-600 transition-colors cursor-pointer"
          type="button"
          :aria-expanded="showAdvancedParams"
          @click="showAdvancedParams = !showAdvancedParams"
        >
          <span class="flex items-center gap-1.5">
            <span>高级采样参数 (Top P / Top K / Penalty)</span>
          </span>
          <svg
            class="h-4 w-4 transition-transform text-zinc-400"
            :class="showAdvancedParams ? 'rotate-180 text-blue-600' : ''"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <div v-if="showAdvancedParams" class="mt-3 space-y-3.5 bg-zinc-50/60 p-3 rounded-md border border-zinc-100">
          <p v-if="currentCapabilities.temperature && currentCapabilities.topP" class="text-[11px] leading-relaxed text-zinc-500">
            💡 建议优先调节 Temperature 或 Top P 其中一项，避免采样叠加产生不可控偏差。
          </p>

          <!-- Top P -->
          <div v-if="currentCapabilities.topP" class="space-y-1">
            <div class="flex items-center justify-between">
              <label class="text-xs text-zinc-700 font-medium" for="top-p">Top P (核采样)</label>
              <output class="font-mono text-xs font-semibold text-zinc-600">{{ topP.toFixed(2) }}</output>
            </div>
            <input
              id="top-p"
              class="modern-slider w-full cursor-pointer"
              type="range"
              :value="topP"
              min="0"
              max="1"
              step="0.05"
              @input="$emit('update:topP', Number(($event.target as HTMLInputElement).value))"
            />
          </div>

          <!-- Top K -->
          <div v-if="currentCapabilities.topK" class="space-y-1">
            <div class="flex items-center justify-between">
              <label class="text-xs text-zinc-700 font-medium" for="top-k">Top K</label>
              <output class="font-mono text-xs font-semibold text-zinc-600">{{ topK === -1 ? '关闭' : topK }}</output>
            </div>
            <input
              id="top-k"
              class="modern-slider w-full cursor-pointer"
              type="range"
              :value="topK"
              min="-1"
              max="100"
              step="1"
              @input="$emit('update:topK', Number(($event.target as HTMLInputElement).value))"
            />
            <p class="text-[10px] text-zinc-400">-1 表示关闭；可用范围为 1 至 100。</p>
          </div>

          <!-- Frequency Penalty -->
          <div v-if="currentCapabilities.frequencyPenalty" class="space-y-1">
            <div class="flex items-center justify-between">
              <label class="text-xs text-zinc-700 font-medium" for="frequency-penalty">Frequency Penalty (重复词惩罚)</label>
              <output class="font-mono text-xs font-semibold text-zinc-600">{{ frequencyPenalty.toFixed(1) }}</output>
            </div>
            <input
              id="frequency-penalty"
              class="modern-slider w-full cursor-pointer"
              type="range"
              :value="frequencyPenalty"
              min="-2"
              max="2"
              step="0.1"
              @input="$emit('update:frequencyPenalty', Number(($event.target as HTMLInputElement).value))"
            />
          </div>

          <!-- Presence Penalty -->
          <div v-if="currentCapabilities.presencePenalty" class="space-y-1">
            <div class="flex items-center justify-between">
              <label class="text-xs text-zinc-700 font-medium" for="presence-penalty">Presence Penalty (主题新颖度)</label>
              <output class="font-mono text-xs font-semibold text-zinc-600">{{ presencePenalty.toFixed(1) }}</output>
            </div>
            <input
              id="presence-penalty"
              class="modern-slider w-full cursor-pointer"
              type="range"
              :value="presencePenalty"
              min="-2"
              max="2"
              step="0.1"
              @input="$emit('update:presencePenalty', Number(($event.target as HTMLInputElement).value))"
            />
          </div>

        </div>
      </section>

    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { getModelCapabilities } from '@/constants/modelConfig';

const props = defineProps<{
  apiKey: string;
  modelName: string;
  systemPrompt?: string;
  streaming: boolean;
  temperature: number;
  maxTokens: number;
  topP: number;
  topK: number;
  frequencyPenalty: number;
  presencePenalty: number;
}>();

defineEmits<{
  'update:apiKey': [value: string];
  'update:modelName': [value: string];
  'update:systemPrompt': [value: string];
  'update:streaming': [value: boolean];
  'update:temperature': [value: number];
  'update:maxTokens': [value: number];
  'update:topP': [value: number];
  'update:topK': [value: number];
  'update:frequencyPenalty': [value: number];
  'update:presencePenalty': [value: number];
  close: [];
}>();

const showAdvancedParams = ref(false);
const currentCapabilities = computed(() => getModelCapabilities(props.modelName));
const hasAdvancedControls = computed(() => {
  const caps = currentCapabilities.value;
  return caps.topP || caps.topK || caps.frequencyPenalty || caps.presencePenalty;
});

const systemPresets = [
  { name: '通用助手', prompt: '你是一个知识渊博、亲切且专业的 AI 助手，请条理清晰地回答用户的问题。' },
  { name: '代码专家', prompt: '你是一位资深全栈工程师与架构师。请以最高标准编写清晰、安全、健壮的代码，并附带必要的解释。' },
  { name: '中英翻译', prompt: '你是一位专业的中英双语翻译。翻译时请保持地道自然、语义准确，并保留原文的所有排版格式。' }
];
</script>

<style scoped>
/* Modern Range Slider Styling */
.modern-slider {
  -webkit-appearance: none;
  appearance: none;
  height: 5px;
  border-radius: 9999px;
  background: #e4e4e7;
  outline: none;
  transition: background 0.15s ease;
}

.modern-slider:hover {
  background: #d4d4d8;
}

.modern-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #2563eb;
  border: 2.5px solid #ffffff;
  box-shadow: 0 1px 3px rgba(37, 99, 235, 0.35);
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.modern-slider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
}

.modern-slider::-moz-range-thumb {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #2563eb;
  border: 2.5px solid #ffffff;
  box-shadow: 0 1px 3px rgba(37, 99, 235, 0.35);
  cursor: pointer;
}
</style>

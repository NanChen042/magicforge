<template>
  <aside class="flex h-full w-full flex-col bg-white text-zinc-900">
    <header class="flex h-[53px] shrink-0 items-center justify-between border-b border-zinc-200 px-4">
      <div class="flex items-center gap-2">
        <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.12 2.12-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.04 1.56v.08h-3v-.08A1.7 1.7 0 0 0 10.66 18.7a1.7 1.7 0 0 0-1.88.34l-.06.06-2.12-2.12.06-.06A1.7 1.7 0 0 0 7 15.04a1.7 1.7 0 0 0-1.56-1.04h-.08v-3h.08A1.7 1.7 0 0 0 7 9.96 1.7 1.7 0 0 0 6.66 8.08l-.06-.06L8.72 5.9l.06.06a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 11.7 4.74v-.08h3v.08a1.7 1.7 0 0 0 1.04 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.12 2.12-.06.06A1.7 1.7 0 0 0 19.4 10a1.7 1.7 0 0 0 1.56 1.04h.08v3h-.08A1.7 1.7 0 0 0 19.4 15Z" />
        </svg>
        <span class="text-sm font-semibold">模型配置</span>
      </div>
      <button class="hidden rounded-sm p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-800 lg:inline-flex" type="button" title="收起配置面板" aria-label="收起配置面板" @click="$emit('close')">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m13 5-7 7 7 7m5-14-7 7 7 7" /></svg>
      </button>
    </header>

    <div class="custom-scrollbar flex-1 space-y-6 overflow-y-auto p-4">
      <section class="space-y-4 border-b border-zinc-100 pb-5">
        <h2 class="text-[11px] font-semibold text-zinc-500">连接</h2>
        <div>
          <label class="mb-1.5 block text-xs font-medium text-zinc-800" for="api-key">SiliconFlow API Key</label>
          <input id="api-key" type="password" :value="apiKey" autocomplete="off" placeholder="sk-..." class="w-full rounded-sm border border-zinc-300 bg-zinc-50 px-3 py-2 text-xs font-mono outline-none transition-colors focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/10" @input="$emit('update:apiKey', ($event.target as HTMLInputElement).value)" />
          <p class="mt-1.5 text-[11px] leading-relaxed text-zinc-500">密钥仅保存在当前浏览器。<a class="text-blue-700 hover:underline" href="https://cloud.siliconflow.cn/account/ak" target="_blank" rel="noopener noreferrer">管理密钥</a></p>
        </div>
        <div>
          <div class="mb-1.5 flex items-center justify-between gap-2">
            <label class="text-xs font-medium text-zinc-800" for="system-prompt">系统提示词</label>
            <span v-if="systemPrompt" class="text-[10px] text-blue-700">已启用</span>
          </div>
          <textarea id="system-prompt" :value="systemPrompt" rows="4" placeholder="定义助手的角色、语气或输出要求" class="w-full resize-none rounded-sm border border-zinc-300 bg-zinc-50 p-2.5 text-xs leading-relaxed outline-none transition-colors focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/10" @input="$emit('update:systemPrompt', ($event.target as HTMLTextAreaElement).value)" />
          <div class="mt-2 flex flex-wrap gap-1.5">
            <button v-for="preset in systemPresets" :key="preset.name" type="button" class="rounded-sm border border-zinc-200 bg-white px-2 py-1 text-[11px] text-zinc-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700" @click="$emit('update:systemPrompt', preset.prompt)">{{ preset.name }}</button>
            <button v-if="systemPrompt" type="button" class="rounded-sm px-2 py-1 text-[11px] text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800" @click="$emit('update:systemPrompt', '')">清除</button>
          </div>
        </div>
      </section>

      <section class="space-y-5 border-b border-zinc-100 pb-5">
        <h2 class="text-[11px] font-semibold text-zinc-500">生成参数</h2>
        <div class="flex items-center justify-between gap-4">
          <div><p class="text-xs font-medium text-zinc-800">流式输出</p><p class="mt-0.5 text-[11px] text-zinc-500">逐步显示模型回复</p></div>
          <el-switch :model-value="streaming" @change="$emit('update:streaming', $event)" />
        </div>
        <div v-if="currentCapabilities.temperature">
          <div class="mb-1.5 flex items-center justify-between"><label class="text-xs font-medium text-zinc-800" for="temperature">Temperature</label><output class="font-mono text-xs text-zinc-600">{{ temperature.toFixed(1) }}</output></div>
          <input id="temperature" class="w-full accent-blue-600" type="range" :value="temperature" min="0" max="2" step="0.1" @input="$emit('update:temperature', Number(($event.target as HTMLInputElement).value))" />
        </div>
        <div>
          <div class="mb-1.5 flex items-center justify-between"><label class="text-xs font-medium text-zinc-800" for="max-tokens">最大输出长度</label><output class="font-mono text-xs text-zinc-600">{{ maxTokens }}</output></div>
          <input id="max-tokens" class="w-full accent-blue-600" type="range" :value="maxTokens" min="500" max="8000" step="500" @input="$emit('update:maxTokens', Number(($event.target as HTMLInputElement).value))" />
        </div>
      </section>

      <section v-if="hasAdvancedControls">
        <button class="flex w-full items-center justify-between py-1 text-xs font-medium text-zinc-700" type="button" :aria-expanded="showAdvancedParams" @click="showAdvancedParams = !showAdvancedParams">
          高级采样参数
          <svg class="h-4 w-4 transition-transform" :class="showAdvancedParams ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" /></svg>
        </button>
        <div v-if="showAdvancedParams" class="mt-4 space-y-4">
          <p v-if="currentCapabilities.temperature && currentCapabilities.topP" class="text-[11px] leading-relaxed text-zinc-500">建议优先调节 Temperature 或 Top P 其中一项，避免采样结果难以预期。</p>
          <div v-if="currentCapabilities.topP"><div class="mb-1 flex items-center justify-between"><label class="text-xs text-zinc-700" for="top-p">Top P</label><output class="font-mono text-xs text-zinc-600">{{ topP.toFixed(2) }}</output></div><input id="top-p" class="w-full accent-blue-600" type="range" :value="topP" min="0" max="1" step="0.05" @input="$emit('update:topP', Number(($event.target as HTMLInputElement).value))" /></div>
          <div v-if="currentCapabilities.topK"><div class="mb-1 flex items-center justify-between"><label class="text-xs text-zinc-700" for="top-k">Top K</label><output class="font-mono text-xs text-zinc-600">{{ topK === -1 ? '关闭' : topK }}</output></div><input id="top-k" class="w-full accent-blue-600" type="range" :value="topK" min="-1" max="100" step="1" @input="$emit('update:topK', Number(($event.target as HTMLInputElement).value))" /><p class="mt-1 text-[11px] text-zinc-500">-1 表示关闭；可用范围为 1 至 100。</p></div>
          <div v-if="currentCapabilities.frequencyPenalty"><div class="mb-1 flex items-center justify-between"><label class="text-xs text-zinc-700" for="frequency-penalty">Frequency penalty</label><output class="font-mono text-xs text-zinc-600">{{ frequencyPenalty.toFixed(1) }}</output></div><input id="frequency-penalty" class="w-full accent-blue-600" type="range" :value="frequencyPenalty" min="-2" max="2" step="0.1" @input="$emit('update:frequencyPenalty', Number(($event.target as HTMLInputElement).value))" /></div>
          <div v-if="currentCapabilities.presencePenalty"><div class="mb-1 flex items-center justify-between"><label class="text-xs text-zinc-700" for="presence-penalty">Presence penalty</label><output class="font-mono text-xs text-zinc-600">{{ presencePenalty.toFixed(1) }}</output></div><input id="presence-penalty" class="w-full accent-blue-600" type="range" :value="presencePenalty" min="-2" max="2" step="0.1" @input="$emit('update:presencePenalty', Number(($event.target as HTMLInputElement).value))" /></div>
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
  { name: '代码审查', prompt: '你是一位严谨的代码审查专家。请说明问题的影响、修复建议和边界风险。' },
  { name: '中英翻译', prompt: '你是一位中英翻译专家。翻译要准确、自然，并保留原文格式。' }
];
</script>

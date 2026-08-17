<template>
  <!-- Form Deck: MagicForge High-End Generative Studio Control Panel -->
  <div class="flex flex-col w-full h-full bg-white font-sans text-zinc-800 relative">

    <!-- 1. Form Header -->
    <div class="shrink-0 h-14 flex items-center justify-between px-5 border-b border-zinc-100 bg-white">
      <div class="flex items-center gap-2.5">
        <div class="w-7 h-7 rounded-xs bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>
        <div>
          <h2 class="text-xs font-bold text-zinc-900 tracking-wider">
            生成参数配置
          </h2>
          <p class="text-[10px] text-zinc-400">
            控制引擎与渲染属性
          </p>
        </div>
      </div>

      <!-- Quick Randomize Seed Button -->
      <button 
        type="button"
        class="px-2 py-1 rounded-xs border border-zinc-200 text-zinc-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50 text-[11px] transition-all cursor-pointer shadow-2xs flex items-center gap-1"
        title="随机生成 Seed 种子"
        @click="$emit('randomizeSeed')"
      >
        <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="23 4 23 10 17 10"></polyline>
          <polyline points="1 20 1 14 7 14"></polyline>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
        <span>随机种子</span>
      </button>
    </div>

    <!-- 2. Scrollable Parameters Body -->
    <div class="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-4 w-full">
      
      <!-- A. Model Engine Selection -->
      <section class="space-y-1.5">
        <div class="flex items-center justify-between">
          <label class="text-xs font-bold text-zinc-700 tracking-wider">
            图像生成引擎
          </label>
          <span v-if="imageModels.length" class="text-[10px] text-zinc-400">
            {{ imageModels.length }} 个在线
          </span>
        </div>
        <el-select 
          v-model="formData.model" 
          class="w-full custom-select" 
          placeholder="选择渲染模型" 
          :disabled="!imageModels.length"
        >
          <el-option v-for="model in imageModels" :key="model.id" :label="model.id" :value="model.id" />
        </el-select>
        <p v-if="modelLoadError" class="text-[11px] leading-relaxed text-amber-700 bg-amber-50 p-2 rounded-xs border border-amber-200/80">
          {{ modelLoadError }}
        </p>
      </section>

      <!-- B. Prompt Input Area -->
      <section class="space-y-2">
        <div class="flex justify-between items-center">
          <label class="text-xs font-bold text-zinc-700 tracking-wider flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span>正向提示词 (Prompt)</span>
          </label>

          <!-- Prompt Template Dropdown -->
          <el-dropdown trigger="click" @command="applyTemplate">
          <span class="text-[11px] text-blue-600 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded-xs border border-blue-200/60 cursor-pointer transition-colors flex items-center gap-1">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>灵感词库</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="t in promptTemplates" :key="t.label" :command="t">
                  {{ t.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <div class="relative">
          <textarea
            v-model="formData.prompt"
            rows="3"
            placeholder="描述您想生成的画面细节，例如：未来东方赛博朋克都市的高空浮空车流，4k超清，电影级光影..."
            class="w-full resize-none rounded-xs border border-zinc-200 bg-zinc-50/50 p-3 text-xs leading-relaxed text-zinc-800 placeholder-zinc-400 shadow-2xs outline-none transition-all hover:border-zinc-300 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/15 custom-scrollbar"
            @keydown.ctrl.enter="$emit('generate')"
          ></textarea>
        </div>

        <!-- Quick Style Preset Tags -->
        <div class="flex flex-wrap items-center gap-1.5 pt-0.5">
          <button
            v-for="tag in quickStyleTags"
            :key="tag.label"
            type="button"
            @click="appendTag(tag.suffix)"
            class="px-2 py-0.5 rounded-2xs text-[10px] bg-zinc-100 hover:bg-blue-50 text-zinc-600 hover:text-blue-600 border border-zinc-200/80 transition-colors cursor-pointer"
          >
            + {{ tag.label }}
          </button>
        </div>

        <!-- Negative Prompt (Collapsible) -->
        <div class="border border-zinc-200/80 rounded-xs bg-zinc-50/60 p-2">
          <div 
            class="flex items-center justify-between text-xs font-medium text-zinc-600 cursor-pointer select-none"
            @click="showNegative = !showNegative"
          >
            <div class="flex items-center gap-1.5">
              <svg class="w-3 h-3 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              <span>排除元素 (反向提示词)</span>
            </div>
            <span class="text-[10px] text-zinc-400">{{ showNegative ? '▲ 收起' : '▼ 展开' }}</span>
          </div>

          <div v-show="showNegative" class="pt-2">
            <textarea
              v-model="formData.negative_prompt"
              rows="2"
              placeholder="不需要出现的元素，如：模糊、低分辨率、畸变、多余肢体..."
              class="w-full resize-none rounded-xs border border-zinc-200 bg-white p-2 text-xs text-zinc-800 placeholder-zinc-400 shadow-2xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/15"
            ></textarea>
          </div>
        </div>
      </section>

      <!-- C. Aspect Ratio Grid (2x3 Compact Grid) -->
      <section class="space-y-2 border-t border-zinc-100 pt-3">
        <div class="flex items-center justify-between">
          <label class="text-xs font-bold text-zinc-700 tracking-wider">
            画幅比例
          </label>
          <span class="text-[10px] text-blue-600 font-bold tabular-nums">{{ formData.image_size }}</span>
        </div>

        <div class="grid grid-cols-3 gap-2">
          <button 
            v-for="(value, key) in imageSizeOptions" 
            :key="key" 
            type="button"
            @click="formData.image_size = value.value" 
            class="p-2 rounded-xs border transition-all cursor-pointer flex flex-col items-center justify-center gap-1 text-center"
            :class="[
              formData.image_size === value.value
                ? 'bg-blue-50/80 border-blue-600 text-blue-900 shadow-2xs ring-1 ring-blue-600/20'
                : 'bg-zinc-50/60 border-zinc-200 hover:border-zinc-300 text-zinc-700 hover:bg-white'
            ]"
          >
            <!-- Visual Ratio Silhouette Box -->
            <div class="w-6 h-6 flex items-center justify-center">
              <div 
                class="border transition-all"
                :class="formData.image_size === value.value ? 'bg-blue-600 border-blue-600' : 'bg-zinc-200 border-zinc-300'"
                :style="getRatioPreviewStyle(value.ratio)"
              ></div>
            </div>

            <span class="text-[11px] font-bold leading-tight">{{ value.label }}</span>
            <span class="text-[9px] text-zinc-400 leading-none truncate max-w-full">{{ value.desc }}</span>
          </button>
        </div>
      </section>

      <!-- D. Batch Count Selection (1 ~ 4 张) -->
      <section class="space-y-2 border-t border-zinc-100 pt-3">
        <div class="flex items-center justify-between">
          <label class="text-xs font-bold text-zinc-700 tracking-wider">
            单次生成张数
          </label>
          <span class="text-[11px] text-blue-600 font-bold">并行生成 {{ formData.batch_size || 1 }} 张</span>
        </div>

        <div class="grid grid-cols-4 gap-2">
          <button 
            v-for="num in [1, 2, 3, 4]" 
            :key="num"
            type="button"
            @click="formData.batch_size = num"
            class="py-2 px-3 rounded-xs border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
            :class="[
              (formData.batch_size || 1) === num 
                ? 'bg-blue-600 border-blue-600 text-white shadow-2xs' 
                : 'bg-zinc-50/80 border-zinc-200 hover:border-zinc-300 text-zinc-700 hover:bg-white'
            ]"
          >
            <span>{{ num }} 张</span>
          </button>
        </div>
      </section>

      <!-- E. Advanced Parameters Accordion -->
      <section class="space-y-2 border-t border-zinc-100 pt-3">
        <div 
          class="flex items-center justify-between text-xs font-semibold text-zinc-700 cursor-pointer select-none"
          @click="showAdvanced = !showAdvanced"
        >
          <span class="font-bold tracking-wider">
            高级微调参数
          </span>
          <span class="text-[10px] text-zinc-400">{{ showAdvanced ? '▲ 收起' : '▼ 展开' }}</span>
        </div>

        <div v-show="showAdvanced" class="space-y-3 pt-1">
          <!-- Guidance Scale (CFG) -->
          <div class="space-y-1">
            <div class="flex items-center justify-between text-xs">
              <span class="text-zinc-600 font-medium">提示词契合度 (CFG Scale)</span>
              <span class="font-mono text-blue-600 font-bold bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100 text-[11px]">
                {{ formData.guidance_scale }}
              </span>
            </div>
            <input 
              type="range" 
              v-model.number="formData.guidance_scale" 
              min="1" 
              max="20" 
              step="0.5" 
              class="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <!-- Inference Steps -->
          <div class="space-y-1">
            <div class="flex items-center justify-between text-xs">
              <span class="text-zinc-600 font-medium">推理采样步数 (Steps)</span>
              <span class="font-mono text-blue-600 font-bold bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100 text-[11px]">
                {{ formData.num_inference_steps }} 步
              </span>
            </div>
            <input 
              type="range" 
              v-model.number="formData.num_inference_steps" 
              min="10" 
              max="50" 
              step="1" 
              class="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <!-- Random Seed Input -->
          <div class="space-y-1">
            <div class="flex items-center justify-between text-xs">
              <span class="text-zinc-600 font-medium">随机种子 (Seed)</span>
              <span class="font-mono text-[10px] text-zinc-400">留空为完全随机</span>
            </div>
            <input 
              type="number"
              v-model.number="formData.seed"
              placeholder="例如 12345678"
              class="w-full rounded-xs border border-zinc-200 bg-white px-3 py-1.5 text-xs font-mono text-zinc-800 placeholder-zinc-400 shadow-2xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/15"
            />
          </div>
        </div>
      </section>

    </div>

    <!-- 3. Bottom Action Bar -->
    <div class="shrink-0 p-4 border-t border-zinc-100 bg-white shadow-2xs">
      <button
        type="button"
        @click="$emit('generate')"
        :disabled="loading || !formData.prompt.trim()"
        class="w-full py-3 px-6 rounded-xs bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm tracking-wide shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="loading" class="flex items-center gap-2">
          <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>正在渲染生成画作...</span>
        </span>
        <span v-else class="flex items-center gap-2">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span>开始生成图像</span>
        </span>
      </button>
      <div class="text-[10px] text-zinc-400 text-center mt-1.5">
        提示：输入提示词后可按 [Ctrl + Enter] 快速生图
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { imageSizeOptions, promptTemplates } from "@/constants/imageGeneratorConfig";
import type { FormData } from "@/composables/useImageGenerator";
import type { SiliconFlowModel } from "@/services/siliconFlowClient";

const props = defineProps<{
  formData: FormData;
  loading: boolean;
  imageModels: SiliconFlowModel[];
  modelLoadError?: string;
}>();

defineEmits<{
  generate: [];
  randomizeSeed: [];
}>();

const showNegative = ref(false);
const showAdvanced = ref(false);

const quickStyleTags = [
  { label: '赛博朋克', suffix: 'cyberpunk style, neon glow, highly detailed, 8k resolution' },
  { label: '新海诚风', suffix: 'Makoto Shinkai anime style, cinematic lighting, beautiful sky' },
  { label: '写意水墨', suffix: 'traditional Chinese ink wash painting, artistic, poetic atmosphere' },
  { label: '胶片摄影', suffix: 'cinematic film photography, 35mm lens, natural depth of field' },
  { label: '3D盲盒', suffix: 'cute 3D isometric blindbox figurine, octane render, soft clay texture' }
];

const appendTag = (suffix: string) => {
  if (!props.formData.prompt) {
    props.formData.prompt = suffix;
  } else if (!props.formData.prompt.includes(suffix)) {
    props.formData.prompt += `, ${suffix}`;
  }
};

const applyTemplate = (template: typeof promptTemplates[0]) => {
  props.formData.prompt = template.prompt;
  props.formData.negative_prompt = template.negative_prompt || "";
  if (template.parameters) {
    if (template.parameters.guidance_scale) {
      props.formData.guidance_scale = template.parameters.guidance_scale;
    }
    if (template.parameters.num_inference_steps) {
      props.formData.num_inference_steps = template.parameters.num_inference_steps;
    }
  }
};

const getRatioPreviewStyle = (ratio: string) => {
  const [w, h] = ratio.split(":").map(Number);
  const max = 18;
  if (w > h) {
    return {
      width: `${max}px`,
      height: `${Math.round((max * h) / w)}px`,
      borderRadius: '2px'
    };
  } else {
    return {
      height: `${max}px`,
      width: `${Math.round((max * w) / h)}px`,
      borderRadius: '2px'
    };
  }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
</style>

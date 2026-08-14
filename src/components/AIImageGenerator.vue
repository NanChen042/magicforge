<template>
  <!-- Main Studio Layout: MagicForge Clean Light Theme -->
  <div class="relative flex flex-col h-[calc(100vh-60px)] min-h-[700px] overflow-hidden bg-[#f8fafc] text-zinc-800 font-sans select-none">
    
    <!-- Background Subtle Matrix Atmosphere -->
    <div class="absolute inset-0 pointer-events-none select-none overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] max-w-4xl h-[300px] bg-gradient-to-b from-blue-100/30 via-sky-50/15 to-transparent rounded-full blur-3xl opacity-60"></div>
      <div class="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>
    </div>

    <!-- 1. Unified Studio Header -->
    <header class="relative z-10 shrink-0 pt-5 pb-4 px-4 md:px-8 max-w-[1920px] mx-auto w-full">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/80 pb-4">
        
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2 py-0.5 rounded-xs bg-blue-50 text-blue-700 border border-blue-200/80 font-mono text-[11px] font-bold">
              视觉工坊
            </span>
            <span class="text-xs text-zinc-400 font-mono">文生图高精度渲染</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
            视觉创作工坊
          </h1>
          <p class="text-xs sm:text-sm text-zinc-500 mt-0.5">
            基于 Kolors、Flux 与 Stable Diffusion，支持 4K 高画质文生图与跨风格多模态渲染。
          </p>
        </div>

        <!-- Connection Status Pill -->
        <div class="flex items-center gap-2 self-start sm:self-center">
          <div
            class="px-3 py-1.5 rounded-xs border text-xs font-mono flex items-center gap-2 shadow-2xs"
            :class="apiStore.apiKey ? 'bg-white border-emerald-200 text-emerald-700' : 'bg-amber-50 border-amber-200 text-amber-800'"
          >
            <span class="w-2 h-2 rounded-full" :class="apiStore.apiKey ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'"></span>
            <span>{{ apiStore.apiKey ? 'API 密钥已连接' : '未配置 API 密钥' }}</span>
          </div>
        </div>

      </div>
    </header>

    <!-- 2. Main Studio Content Area -->
    <main class="relative z-10 flex-1 min-h-0 w-full max-w-[1920px] mx-auto p-4 md:p-8 pt-0">
      
      <!-- Studio Grid: Left Form (420px), Right Preview Deck (1fr) -->
      <div class="h-full grid grid-cols-1 lg:grid-cols-[400px_1fr] xl:grid-cols-[440px_1fr] gap-6 items-start">
        
        <!-- Left: Studio Config Form Deck -->
        <div class="h-full overflow-y-auto custom-scrollbar rounded-xs bg-white border border-zinc-200 shadow-2xs">
          <ImageGeneratorForm
            :form-data="formData"
            :loading="loading"
            :image-models="imageModels"
            :model-load-error="modelLoadError"
            @generate="generateImage"
            @randomize-seed="randomizeSeed"
          />
        </div>

        <!-- Right: Studio Results & Gallery Deck -->
        <div class="h-full min-h-0 flex flex-col rounded-xs bg-white border border-zinc-200 shadow-2xs overflow-hidden">
          <ImageGeneratorResults
            :generated-images="generatedImages"
            :loading="loading"
            :progress="progress"
            :estimated-time="estimatedTime"
            :generation-time="generationTime"
            :last-seed="lastSeed"
            :image-size="formData.image_size"
            @show-preview="(url) => showPreview(url, lastSeed)"
            @download-image="(url, index) => downloadImage(url, lastSeed, index)"
            @use-seed="() => useSeed(lastSeed, formData)"
            @regenerate="() => regenerateWithSeed(lastSeed)"
            @apply-inspiration="(prompt, negative, cfg, steps) => { 
              formData.prompt = prompt; 
              formData.negative_prompt = negative || ''; 
              if (cfg) formData.guidance_scale = cfg; 
              if (steps) formData.num_inference_steps = steps; 
            }"
          />
        </div>

      </div>
    </main>

    <!-- 3. Lightbox Preview Modal (Modern Light Studio Dialog) -->
    <el-dialog 
      v-model="previewVisible" 
      :append-to-body="true"
      width="780px"
      class="custom-preview-dialog !rounded-md !bg-white !p-0 !border !border-zinc-200 !shadow-2xl overflow-hidden"
      :show-close="false"
    >
      <!-- Custom Header -->
      <template #header>
        <div class="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-white">
          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-xs bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
            <div>
              <h3 class="text-sm font-bold text-zinc-900 tracking-tight">画作高清大图预览</h3>
              <p v-if="lastSeed !== null" class="text-[11px] font-mono text-zinc-400">渲染种子 Seed: {{ lastSeed }}</p>
            </div>
          </div>
          
          <button 
            @click="previewVisible = false"
            class="w-7 h-7 rounded-xs flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
            title="关闭窗口"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </template>

      <!-- Image Showcase Body -->
      <div class="p-6 bg-zinc-950 flex items-center justify-center min-h-[380px] max-h-[70vh] overflow-hidden">
        <img 
          :src="previewImage" 
          class="max-h-[62vh] w-auto max-w-full object-contain rounded-xs shadow-2xl transition-transform" 
          alt="预览图片" 
        />
      </div>

      <!-- Action Footer -->
      <template #footer>
        <div class="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-zinc-100 bg-white">
          <div class="text-xs text-zinc-400 font-mono hidden sm:block">
            提示：支持一键复用种子进行多轮画面微调
          </div>

          <div class="flex items-center gap-2.5 ml-auto">
            <template v-if="lastSeed !== null">
              <button 
                @click="copySeedToClipboard(lastSeed)" 
                class="px-3.5 py-2 rounded-xs border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-mono font-semibold text-zinc-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <svg class="w-3.5 h-3.5 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>复制种子</span>
              </button>
              
              <button 
                @click="useCurrentSeedAndClose(lastSeed, formData)" 
                class="px-3.5 py-2 rounded-xs bg-emerald-600 hover:bg-emerald-700 text-xs font-mono font-bold text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>使用此种子重绘</span>
              </button>
            </template>

            <button 
              @click="downloadCurrentPreview(lastSeed)" 
              class="px-4 py-2 rounded-xs bg-blue-600 hover:bg-blue-700 active:scale-95 text-xs font-mono font-bold text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>下载原图</span>
            </button>
          </div>
        </div>
      </template>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">
import ImageGeneratorForm from "./image-generator/ImageGeneratorForm.vue";
import ImageGeneratorResults from "./image-generator/ImageGeneratorResults.vue";
import { useImageGenerator } from "../composables/useImageGenerator";
import { useImageActions } from "../composables/useImageActions";
import { promptTemplates } from "../constants/imageGeneratorConfig";
import { useApiStore } from "@/stores/api";

const apiStore = useApiStore();

const {
  formData,
  loading,
  generatedImages,
  lastSeed,
  generationTime,
  progress,
  estimatedTime,
  imageModels,
  modelLoadError,
  generateImage,
  randomizeSeed,
  regenerateWithSeed,
  cleanup,
} = useImageGenerator();

const {
  previewVisible,
  previewImage,
  previewTitle,
  showPreview,
  downloadImage,
  downloadCurrentPreview,
  copySeedToClipboard,
  useSeed,
  useCurrentSeedAndClose,
} = useImageActions();

const applyRandomTemplate = () => {
  const randomIndex = Math.floor(Math.random() * promptTemplates.length);
  const template = promptTemplates[randomIndex];
  formData.prompt = template.prompt;
  formData.negative_prompt = template.negative_prompt || "";
  if (template.parameters) {
    if (template.parameters.guidance_scale) {
      formData.guidance_scale = template.parameters.guidance_scale;
    }
    if (template.parameters.num_inference_steps) {
      formData.num_inference_steps = template.parameters.num_inference_steps;
    }
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

<style>
.custom-preview-dialog {
  border-radius: 8px !important;
  overflow: hidden !important;
  padding: 0 !important;
  background: #ffffff !important;
  border: 1px solid #e2e8f0 !important;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
}
.custom-preview-dialog .el-dialog__header {
  padding: 0 !important;
  margin: 0 !important;
}
.custom-preview-dialog .el-dialog__body {
  padding: 0 !important;
}
.custom-preview-dialog .el-dialog__footer {
  padding: 0 !important;
}
</style>

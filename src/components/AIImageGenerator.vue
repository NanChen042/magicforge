<template>
  <!-- 主容器：全屏，禁止整体滚动，柔和背景 -->
  <div class="relative flex flex-col h-screen overflow-hidden bg-slate-50 text-slate-800 font-sans selection:bg-indigo-500/30">
    
    <!-- 装饰背景：顶部左侧光晕 -->
    <div class="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"></div>
    <!-- 装饰背景：底部右侧光晕 -->
    <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"></div>
    <!-- 装饰背景：点阵纹理 -->
    <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

<!-- 替换 <header> -->
<!-- 增加 px-4 md:px-6 确保和下方内容对齐 -->
<header class="relative z-10 shrink-0 pt-10 pb-6 px-4 md:px-6 max-w-[1920px] mx-auto w-full">
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/60 pb-4">
    
    <!-- 左侧：巨型排版 -->
    <div class="relative">
      <!-- 装饰性的小上标 -->
      <span class="absolute -top-4 left-0 text-[10px] font-mono text-indigo-500 font-bold tracking-widest uppercase">
        // AI Workspace
      </span>
      <h1 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
        Image<span class="text-slate-300">Gen</span>.
      </h1>
    </div>

    <!-- 右侧：功能性副标题 (沉底对齐) -->
    <div class="flex items-center gap-3 text-sm text-slate-500 font-medium">
      <span class="hidden md:inline-block h-px w-8 bg-slate-300"></span>
      <p>Transform text into visual masterpieces.</p>
    </div>

  </div>
</header>


    <!-- 2. 内容区域：自适应高度，内部 Grid 布局 -->
    <main class="relative z-10 flex-1 min-h-0 w-full max-w-[1920px] mx-auto p-4 md:p-6 pt-0">
      
      <!-- Grid 容器：移动端单列，大屏双列 (左侧固定宽，右侧自适应) -->
      <div class="h-full grid grid-cols-1 lg:grid-cols-[400px_1fr] xl:grid-cols-[440px_1fr] gap-6 items-start">
        
        <!-- 左侧：表单区 (自带滚动) -->
        <div class="h-full overflow-y-auto hidden-scrollbar rounded-2xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl shadow-indigo-500/5 ring-1 ring-slate-900/5">
          <ImageGeneratorForm
            :form-data="formData"
            :loading="loading"
            @generate="generateImage"
            @randomize-seed="randomizeSeed"
          />
        </div>

        <!-- 右侧：结果展示区 (自带滚动) -->
        <div class="h-full min-h-0 flex flex-col rounded-2xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl shadow-indigo-500/5 ring-1 ring-slate-900/5 overflow-hidden">
          <ImageGeneratorResults
            :generated-images="generatedImages"
            :loading="loading"
            :progress="progress"
            :estimated-time="estimatedTime"
            :generation-time="generationTime"
            :last-seed="lastSeed"
            :image-size="formData.image_size"
            @show-preview="(url) => showPreview(url, lastSeed)"
            @download-image="downloadImage"
            @use-seed="() => useSeed(lastSeed, formData)"
            @regenerate="() => regenerateWithSeed(lastSeed)"
            @apply-random-template="applyRandomTemplate"
          />
        </div>

      </div>
    </main>

    <!-- 3. 图片预览对话框 -->
    <!-- 注意：modal-class 用于自定义覆盖 Element Plus 样式 -->
    <el-dialog 
      v-model="previewVisible" 
      :title="previewTitle" 
      :append-to-body="true"
      width="90%"
      class="!rounded-2xl !bg-slate-900/95 !backdrop-blur-md !border !border-white/10 !shadow-2xl overflow-hidden glass-dialog"
    >
      <!-- 预览内容 -->
      <div class="flex items-center justify-center bg-black/50 rounded-xl p-4 min-h-[400px]">
        <img :src="previewImage" class="max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl" alt="预览图片" />
      </div>

      <!-- 底部操作栏 -->
      <template #footer>
        <div class="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-white/10">
          <el-button @click="previewVisible = false" class="!bg-transparent !border-white/20 !text-slate-300 hover:!text-white hover:!border-white">
            关闭
          </el-button>
          
          <el-button type="primary" @click="downloadCurrentPreview(lastSeed)" class="!bg-indigo-600 !border-indigo-600">
            <el-icon class="mr-1"><Download /></el-icon>
            下载图片
          </el-button>
          
          <template v-if="lastSeed !== null">
            <el-button type="info" @click="copySeedToClipboard(lastSeed)" class="!bg-slate-700 !border-slate-600">
              <el-icon class="mr-1"><CopyDocument /></el-icon>
              复制种子
            </el-button>
            
            <el-button type="success" @click="useCurrentSeedAndClose(lastSeed, formData)" class="!bg-teal-600 !border-teal-600">
              <el-icon class="mr-1"><Edit /></el-icon>
              使用此种子重绘
            </el-button>
          </template>
        </div>
      </template>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from "vue";
import { ElMessage } from "element-plus";
import { Download, CopyDocument, Edit } from "@element-plus/icons-vue";
import ImageGeneratorForm from "./image-generator/ImageGeneratorForm.vue";
import ImageGeneratorResults from "./image-generator/ImageGeneratorResults.vue";
import { useImageGenerator } from "../composables/useImageGenerator";
import { useImageActions } from "../composables/useImageActions";
import { promptTemplates } from "../constants/imageGeneratorConfig";

// 保持原本的逻辑代码完全不变
const {
  formData,
  loading,
  generatedImages,
  lastSeed,
  generationTime,
  progress,
  estimatedTime,
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
  formData.negative_prompt = template.negative_prompt;
  if (template.parameters) {
    formData.guidance_scale = template.parameters.guidance_scale;
    formData.num_inference_steps = template.parameters.num_inference_steps;
  }
  ElMessage.success("已应用灵感模板");
};

onUnmounted(() => {
  cleanup();
});
</script>

<style scoped>
/* 
  仅保留极少量无法通过 Tailwind utility 完美覆盖的样式 
  主要是为了隐藏滚动条但保留滚动功能
*/
.hidden-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}
.hidden-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

/* 
  Element Plus Dialog 的深度覆盖 
  因为 el-dialog 渲染在 body 下，且内部结构较深，
  虽然用了 class 传递 Tailwind 类，部分内部元素（如 header 标题颜色）仍需强制覆盖
*/
:deep(.glass-dialog .el-dialog__header) {
  margin-right: 0;
  padding: 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
:deep(.glass-dialog .el-dialog__title) {
  color: #e2e8f0; /* slate-200 */
  font-weight: 600;
}
:deep(.glass-dialog .el-dialog__headerbtn .el-dialog__close) {
  color: #94a3b8;
}
:deep(.glass-dialog .el-dialog__headerbtn:hover .el-dialog__close) {
  color: #fff;
}
</style>

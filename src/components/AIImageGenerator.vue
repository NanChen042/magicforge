<template>
  <div class="image-gen-view">
    <div class="page-header">
      <h1>AIVista Image Studio</h1>
      <p class="subtitle">使用人工智能创建高质量图片 - AI Image Generation</p>
    </div>

    <div class="content-container">
      <!-- 左侧表单 -->
      <ImageGeneratorForm
        :form-data="formData"
        :loading="loading"
        @generate="generateImage"
        @randomize-seed="randomizeSeed"
      />

      <!-- 右侧结果 -->
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

    <!-- 图片预览对话框 -->
    <el-dialog v-model="previewVisible" :title="previewTitle" class="preview-dialog" :append-to-body="true">
      <div class="flex">
        <img :src="previewImage" class="preview-image" alt="预览图片" />
      </div>

      <template #footer>
        <div class="preview-actions">
          <el-button @click="previewVisible = false">关闭</el-button>
          <el-button type="primary" @click="downloadCurrentPreview(lastSeed)">
            <el-icon><Download /></el-icon>
            下载图片
          </el-button>
          <el-button type="primary" @click="copySeedToClipboard(lastSeed)" v-if="lastSeed !== null">
            <el-icon><CopyDocument /></el-icon>
            复制种子 ({{ lastSeed }})
          </el-button>
          <el-button type="primary" @click="useCurrentSeedAndClose(lastSeed, formData)" v-if="lastSeed !== null">
            <el-icon><Edit /></el-icon>
            使用此种子重新生成
          </el-button>
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

// 使用 composables
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

// 随机应用一个模板
const applyRandomTemplate = () => {
  const randomIndex = Math.floor(Math.random() * promptTemplates.length);
  const template = promptTemplates[randomIndex];
  formData.prompt = template.prompt;
  formData.negative_prompt = template.negative_prompt;
  if (template.parameters) {
    formData.guidance_scale = template.parameters.guidance_scale;
    formData.num_inference_steps = template.parameters.num_inference_steps;
  }
  ElMessage.success("已应用模板");
};

// 组件卸载时清理
onUnmounted(() => {
  cleanup();
});
</script>

<style scoped>
/* 现代化高级配色方案 */
.image-gen-view {
  /* 主色调 - 优雅的紫蓝渐变 */
  --primary-color: #6366f1;
  --primary-light: #a5b4fc;
  --primary-dark: #4338ca;
  --primary-gradient: linear-gradient(135deg, #6366f1, #8b5cf6);

  /* 辅助色 - 温暖的渐变 */
  --secondary-color: #f59e0b;
  --accent-color: #06b6d4;
  --accent-light: #67e8f9;

  /* 现代中性色调 */
  --neutral-50: #fafafa;
  --neutral-100: #f5f5f5;
  --neutral-200: #e5e5e5;
  --neutral-300: #d4d4d4;
  --neutral-400: #a3a3a3;
  --neutral-500: #737373;
  --neutral-600: #525252;
  --neutral-700: #404040;
  --neutral-800: #262626;
  --neutral-900: #171717;

  /* 功能色彩 */
  --success-color: #22c55e;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  --info-color: #3b82f6;

  /* 现代化阴影系统 */
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  /* 彩色阴影 */
  --shadow-primary: 0 10px 25px -5px rgba(99, 102, 241, 0.2);
  --shadow-accent: 0 10px 25px -5px rgba(6, 182, 212, 0.2);

  /* 现代圆角系统 */
  --border-radius-sm: 0.375rem;
  --border-radius-md: 0.5rem;
  --border-radius-lg: 0.75rem;
  --border-radius-xl: 1rem;
  --border-radius-2xl: 1.5rem;
  --border-radius-full: 9999px;

  /* 间距变量 */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-10: 2.5rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;

  /* 现代化基础样式 */
  padding: var(--spacing-6);
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 50%, #f0f0f0 100%);
  min-height: calc(100vh - 64px);
  box-sizing: border-box;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--neutral-800);
  position: relative;
  overflow-x: hidden;
}

/* 添加微妙的背景纹理 */
.image-gen-view::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
                    radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.05) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-10);
  position: relative;
  z-index: 1;
}

.page-header h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: var(--spacing-3);
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  line-height: 1.1;
  position: relative;
}

.page-header h1::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: var(--primary-gradient);
  border-radius: var(--border-radius-full);
}

.subtitle {
  font-size: 1.125rem;
  color: var(--neutral-600);
  margin: 0;
  font-weight: 500;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.content-container {
  display: grid;
  grid-template-columns: minmax(360px, 420px) 1fr;
  gap: var(--spacing-8);
  max-width: 1800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* 预览对话框样式 */
.preview-dialog :deep(.el-dialog) {
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.preview-dialog :deep(.el-dialog__header) {
  padding: var(--spacing-4) var(--spacing-6);
  margin: 0;
  border-bottom: 1px solid var(--neutral-200);
  background: var(--neutral-50);
}

.preview-dialog :deep(.el-dialog__body) {
  padding: var(--spacing-6);
  text-align: center;
  background: var(--neutral-900);
}

.preview-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-xl);
}

.preview-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-2);
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .content-container {
    grid-template-columns: minmax(300px, 360px) 1fr;
    gap: var(--spacing-5);
  }
  .page-header h1 {
    font-size: 2rem;
  }
  .subtitle {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .image-gen-view {
    padding: var(--spacing-4);
  }

  .page-header {
    margin-bottom: var(--spacing-6);
  }

  .content-container {
    grid-template-columns: 1fr;
    gap: var(--spacing-5);
    max-width: 100%;
  }

  .page-header h1 {
    font-size: 1.8rem;
  }
  .subtitle {
    font-size: 0.9rem;
  }

  .preview-dialog :deep(.el-dialog) {
    width: 90%;
    max-width: 500px;
  }
  .preview-actions {
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .image-gen-view {
    padding: var(--spacing-3);
  }
  .page-header h1 {
    font-size: 1.5rem;
  }
  .subtitle {
    font-size: 0.85rem;
  }
}
</style>

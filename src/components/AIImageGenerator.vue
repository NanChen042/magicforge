<template>
  <div class="image-gen-view">
    <div class="page-header">
      <h1>AIVista Image Studio</h1>
      <p class="subtitle">使用人工智能创建高质量图片 - AI Image Generation</p>
    </div>

    <div class="content-container">
      <!-- 左侧参数表单 -->
      <div class="form-container">
        <el-form :model="formData" label-position="top" class="generation-form">
          <!-- 卡片1: 提示词输入区 -->
          <div class="form-card">
          <!-- 提示词模板选择 -->
          <div class="templates-section">
            <h3>快速模板</h3>
            <div class="template-grid">
              <el-button v-for="template in promptTemplates" :key="template.label" size="small" @click="applyTemplate(template)">
                {{ template.label }}
              </el-button>
            </div>
          </div>

          <!-- 提示词输入 -->
          <el-form-item label="提示词 (Prompt)">
            <el-input v-model="formData.prompt" type="textarea" :rows="4" placeholder="描述你想要生成的图片内容..." />
          </el-form-item>

          <!-- 负面提示词输入 -->
          <el-form-item label="负面提示词 (Negative Prompt)">
            <el-input v-model="formData.negative_prompt" type="textarea" :rows="2" placeholder="描述你不希望出现在图片中的内容..." />
          </el-form-item>
          </div>

          <!-- 卡片2: 参数设置区 -->
          <div class="form-card">
            <div class="card-header">
              <h3>图片参数</h3>
              <!-- 参数预设选择 - 更改为 el-radio-group -->
              <div class="presets-section">
                <span class="preset-title">快速预设:</span>
                <el-radio-group
                  v-model="selectedPresetLabel"
                  @change="handlePresetChange"
                  size="small"
                  class="preset-radio-group"
                >
                  <el-radio-button
                    v-for="preset in parameterPresets"
                    :key="preset.label"
                    :value="preset.label"
                  >
                    {{ preset.label }}
                  </el-radio-button>
                </el-radio-group>
              </div>
            </div>

          <!-- 图片尺寸选择 -->
          <el-form-item label="图片尺寸">
              <el-radio-group v-model="formData.image_size" class="size-selector">
                <el-radio-button
                v-for="(value, key) in imageSizeOptions"
                :key="key"
                  :value="value.value"
                  class="size-radio-button"
                >
                  <div class="size-option-content">
                    <svg class="size-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect
                        :x="getSvgRect(value.ratio).x"
                        :y="getSvgRect(value.ratio).y"
                        :width="getSvgRect(value.ratio).width"
                        :height="getSvgRect(value.ratio).height"
                        rx="1"
                        class="svg-rect"
                      />
                    </svg>
                    <span class="size-label">{{ value.ratioLabel || value.label }}</span>
                </div>
                </el-radio-button>
              </el-radio-group>
          </el-form-item>

            <div class="parameter-grid">
          <!-- 批量生成数量 -->
          <el-form-item label="生成数量">
            <el-slider v-model="formData.batch_size" :min="1" :max="4" :step="1" :marks="{1: '1', 2: '2', 3: '3', 4: '4'}" show-stops />
          </el-form-item>

          <!-- 引导系数 -->
          <el-form-item label="创造性 (引导系数)">
            <el-tooltip content="较低的值会产生更有创意但不太准确的结果，较高的值会使生成更忠于提示词但创意性较低" placement="top">
              <el-slider v-model="formData.guidance_scale" :min="1" :max="20" :step="0.5" :marks="{1: '高创造性', 10: '平衡', 20: '高精确性'}" />
            </el-tooltip>
          </el-form-item>

          <!-- 推理步骤 -->
          <el-form-item label="细节程度 (推理步骤)">
            <el-tooltip content="更高的值会产生更细致的图像，但需要更长时间生成。最大值为50。" placement="top">
              <el-slider v-model="formData.num_inference_steps" :min="1" :max="50" :step="1" :marks="{1: '低', 20: '中', 50: '高'}" />
            </el-tooltip>
          </el-form-item>
            </div>

          <!-- 随机种子 -->
          <el-form-item label="随机种子 (可选)">
            <el-tooltip content="使用相同种子可以在其他参数相同时获得相似结果" placement="top">
              <div class="seed-input-group">
                <el-input v-model.number="formData.seed" type="number" placeholder="输入种子或留空随机生成" />
                <el-button @click="randomizeSeed">随机</el-button>
              </div>
            </el-tooltip>
          </el-form-item>
          </div>

          <!-- 卡片3: 参考图片上传 -->
          <div class="form-card">
            <h3>参考图片</h3>
            <el-form-item>
            <el-upload
              class="image-uploader"
              :show-file-list="false"
              :before-upload="beforeImageUpload"
              :auto-upload="true"
              :http-request="handleCustomUpload"
              action="#">
              <div v-if="imageUrl" class="image-preview">
                <img :src="imageUrl" class="uploaded-image" />
                <div class="remove-image" @click.stop="removeImage">
                  <el-icon>
                    <Delete />
                  </el-icon>
                </div>
              </div>
              <div v-else class="upload-placeholder">
                <el-icon class="upload-icon">
                  <Plus />
                </el-icon>
                <div class="upload-text">点击上传参考图片</div>
              </div>
            </el-upload>
            <div class="upload-tip">上传图片后，AI将生成与参考图片风格相似的图像</div>
          </el-form-item>
          </div>

          <!-- 生成按钮 -->
          <div class="generate-button-container">
            <el-button type="primary" class="generate-button" @click="generateImage" :loading="loading" :disabled="!formData.prompt || loading">
              {{ loading ? '生成中...' : '生成图片' }}
            </el-button>
          </div>
        </el-form>
      </div>

      <!-- 右侧结果展示 -->
      <div class="results-container">
        <div v-if="!generatedImages.length && !loading" class="empty-state">
          <div class="empty-state-content">
            <div class="empty-header">
              <div class="empty-title-container">
                <span class="empty-badge">AI 驱动</span>
                <h3 class="empty-title">开始创建您的专属AI艺术</h3>
                <p class="empty-subtitle">只需简单几步，轻松生成高品质图像</p>
              </div>

              <div class="decoration-container">
                <svg width="180" height="180" viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="240" cy="240" r="220" fill="url(#paint0_radial)" fill-opacity="0.15"/>
                  <path d="M175 170C175 162.268 181.268 156 189 156H291C298.732 156 305 162.268 305 170V310C305 317.732 298.732 324 291 324H189C181.268 324 175 317.732 175 310V170Z" fill="white" stroke="#4E54C8" stroke-width="3"/>
                  <path d="M200 190H280" stroke="#4E54C8" stroke-width="3" stroke-linecap="round"/>
                  <path d="M200 210H260" stroke="#4E54C8" stroke-width="3" stroke-linecap="round"/>
                  <path d="M200 230H240" stroke="#4E54C8" stroke-width="3" stroke-linecap="round"/>
                  <circle cx="230" cy="270" r="30" fill="#8F94FB" fill-opacity="0.5"/>
                  <path d="M240 140V100" stroke="#4E54C8" stroke-width="3" stroke-linecap="round"/>
                  <path d="M290 150L320 120" stroke="#4E54C8" stroke-width="3" stroke-linecap="round"/>
                  <path d="M190 150L160 120" stroke="#4E54C8" stroke-width="3" stroke-linecap="round"/>
                  <path d="M340 240H380" stroke="#4E54C8" stroke-width="3" stroke-linecap="round"/>
                  <path d="M100 240H140" stroke="#4E54C8" stroke-width="3" stroke-linecap="round"/>
                  <circle cx="360" cy="180" r="25" fill="#8F94FB" fill-opacity="0.4"/>
                  <circle cx="120" cy="300" r="30" fill="#8F94FB" fill-opacity="0.3"/>
                  <circle cx="320" cy="340" r="20" fill="#8F94FB" fill-opacity="0.5"/>
                  <defs>
                    <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(240 240) rotate(90) scale(220)">
                      <stop stop-color="#4E54C8"/>
                      <stop offset="1" stop-color="#8F94FB" stop-opacity="0"/>
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </div>

            <div class="steps-container">
              <div class="step-card">
                <div class="step-header">
                <div class="step-number">1</div>
                  <h4>填写提示词</h4>
                </div>
                <div class="step-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.5 18.5L4 18L14 8L16 10L6 20L5.5 20.5H3.5V18.5Z" fill="#e6e9ff"/>
                    <path d="M14 8L14.75 7.25L16.75 9.25L16 10L14 8Z" fill="#c6c9f8"/>
                    <path d="M14.75 7.25L15.5 6.5L17.5 8.5L16.75 9.25L14.75 7.25Z" fill="#a6a9e8"/>
                    <path d="M15.5 6.5L16.25 5.75L18.25 7.75L17.5 8.5L15.5 6.5Z" fill="#8689d8"/>
                    <path d="M16.25 5.75L17 5L19 7L18.25 7.75L16.25 5.75Z" fill="#6669c8"/>
                    <path d="M3.5 18.5V20.5H5.5L16 10L14 8L3.5 18.5ZM17 5L19 7L10 16L6 20H3V17L13 7L17 5Z" stroke="#4E54C8" stroke-width="1.5" stroke-linejoin="round"/>
                  </svg>
              </div>
                <p class="step-description">描述您想要创建的图像内容，或使用内置模板快速开始创作</p>
              </div>

              <div class="step-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#a6a9e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>

              <div class="step-card">
                <div class="step-header">
                <div class="step-number">2</div>
                  <h4>选择参数</h4>
                </div>
                <div class="step-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="5" width="18" height="14" rx="2" fill="#e6e9ff" stroke="#4E54C8" stroke-width="1.5"/>
                    <path d="M7 10L10 13L7 16" stroke="#4E54C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M13 16H17" stroke="#4E54C8" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M13 12H17" stroke="#4E54C8" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M13 8H17" stroke="#4E54C8" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
              </div>
                <p class="step-description">调整尺寸、细节程度和创造性等参数以获得理想效果</p>
              </div>

              <div class="step-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#a6a9e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>

              <div class="step-card">
                <div class="step-header">
                <div class="step-number">3</div>
                  <h4>生成图像</h4>
                </div>
                <div class="step-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" fill="#e6e9ff" stroke="#4E54C8" stroke-width="1.5"/>
                    <circle cx="16" cy="8" r="2" fill="#8F94FB"/>
                    <path d="M3 14L7 10L11 14L16 9L21 14V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V14Z" fill="#c6c9f8" stroke="#4E54C8" stroke-width="1.5"/>
                  </svg>
              </div>
                <p class="step-description">点击"生成图片"按钮，AI将为您创建完全个性化的艺术作品</p>
            </div>
            </div>

            <div class="empty-actions">
              <el-button type="primary" class="action-button" @click="applyRandomTemplate">
                <el-icon><Star /></el-icon>
                <span>使用随机模板</span>
              </el-button>
              <el-button class="action-button secondary-button" @click="scrollToPrompt">
                <el-icon><Edit /></el-icon>
                <span>开始创作</span>
              </el-button>
            </div>
          </div>
        </div>

        <div v-if="loading" class="loading-state">
          <div class="loading-content">
          <el-icon class="loading-icon">
            <Loading />
          </el-icon>

          <!-- 添加进度条显示 -->
          <div class="progress-container">
            <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
          </div>

          <p>AI 正在绘制你的图片，预计还需 {{ estimatedTime }}秒</p>
          <p class="progress-percentage">{{ progress }}%</p>
          </div>
        </div>

        <div v-if="generatedImages.length > 0" class="generated-images">
          <div class="results-header">
            <h2>生成结果</h2>
            <div class="generation-info">
              <p v-if="generationTime">生成时间: {{ generationTime }}秒</p>
              <p v-if="lastSeed !== null">种子: {{ lastSeed }}</p>
            </div>
          </div>

          <div class="image-grid">
            <div v-for="(image, index) in generatedImages" :key="index" class="image-item">
              <div class="image-wrapper" :style="getAspectRatioStyle()">
                <img :src="image.url" alt="生成的图片" loading="lazy" @click="showPreview(image.url)" />
                <div class="image-overlay">
                  <div class="image-actions">
                    <div class="action-buttons">
                      <el-tooltip content="预览大图" placement="top">
                        <el-button size="small" type="primary" plain @click="handleImageAction('preview', image.url, index)">
                          <el-icon><ZoomIn /></el-icon>
                        </el-button>
                      </el-tooltip>
                      <el-tooltip content="下载图片" placement="top">
                        <el-button size="small" type="primary" plain @click="handleImageAction('download', image.url, index)">
                          <el-icon><Download /></el-icon>
                        </el-button>
                      </el-tooltip>
                      <el-tooltip content="复制图片种子值" placement="top">
                        <el-button size="small" type="primary" plain @click="handleImageAction('use-seed', image.url, index)">
                          <el-icon><CopyDocument /></el-icon>
                        </el-button>
                      </el-tooltip>
                      <el-tooltip content="使用该种子重新生成" placement="top">
                        <el-button size="small" type="primary" plain @click="handleImageAction('regenerate', image.url, index)">
                          <el-icon><Edit /></el-icon>
                        </el-button>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 图片预览对话框 -->
    <el-dialog v-model="previewVisible" :title="previewTitle" class="preview-dialog" :append-to-body="true">
      <div class="flex" >
        <img :src="previewImage" class="preview-image" alt="预览图片" />
      </div>

      <template #footer>
        <div class="preview-actions">
          <el-button @click="previewVisible = false">关闭</el-button>
          <el-button type="primary" @click="downloadCurrentPreview">
            <el-icon><Download /></el-icon>
            下载图片
          </el-button>
          <el-button type="primary" @click="copySeedToClipboard" v-if="lastSeed !== null">
            <el-icon><CopyDocument /></el-icon>
            复制种子 ({{ lastSeed }})
          </el-button>
          <el-button type="primary" @click="useCurrentSeedAndClose" v-if="lastSeed !== null">
            <el-icon><Edit /></el-icon>
            使用此种子重新生成
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, watch, onMounted } from "vue";
import { ElMessage } from "element-plus";
import {
  Delete,
  Plus,
  Picture,
  Download,
  CopyDocument,
  Loading,
  ZoomIn,
  Edit,
  Star,
} from "@element-plus/icons-vue";
import {
  imageService,
  ImageSize,
  type ImageGenerationResponse,
} from "../services/imageService";

// 类型定义
type ImageAction = "preview" | "download" | "use-seed" | "regenerate";

// 更新图片尺寸选项，添加比例标识
const imageSizeOptions = {
  Square: {
    value: ImageSize.Square,
    label: "1:1 方形",
    ratio: "1:1",
    ratioLabel: "1:1"
  },
  Portrait: {
    value: ImageSize.Portrait,
    label: "3:4 竖向",
    ratio: "3:4",
    ratioLabel: "3:4"
  },
  Small: {
    value: ImageSize.Small,
    label: "3:4 小尺寸",
    ratio: "3:4",
    ratioLabel: "3:4"
  },
  Tall: {
    value: ImageSize.Tall,
    label: "1:2 高竖版",
    ratio: "1:2",
    ratioLabel: "1:2"
  },
  Medium: {
    value: ImageSize.Medium,
    label: "9:16 中等",
    ratio: "9:16",
    ratioLabel: "9:16"
  },
  Wide: {
    value: ImageSize.Wide,
    label: "3:2 宽幅",
    ratio: "3:2",
    ratioLabel: "3:2"
  },
  Widescreen: {
    value: ImageSize.Widescreen,
    label: "16:9 宽屏",
    ratio: "16:9",
    ratioLabel: "16:9"
  },
};

// 提示词模板
const promptTemplates = [
  {
    label: "风景摄影",
    prompt:
      "一个美丽的自然风景，阳光透过云层，远处有连绵的山脉，前景是一片野花盛开的草地",
    negative_prompt: "模糊，过度曝光，人工痕迹",
    parameters: {
      guidance_scale: 8.5,
      num_inference_steps: 30,
    },
  },
  {
    label: "人物肖像",
    prompt: "一张专业的人物肖像照片，自然光线，浅景深，柔和的背景虚化",
    negative_prompt: "变形，扭曲，不自然的姿势",
    parameters: {
      guidance_scale: 7.0,
      num_inference_steps: 25,
    },
  },
  {
    label: "抽象艺术",
    prompt: "现代抽象艺术作品，充满活力的色彩，流动的形状，富有表现力的笔触",
    negative_prompt: "具象物体，照片级真实感",
    parameters: {
      guidance_scale: 5.5,
      num_inference_steps: 40,
    },
  },
  {
    label: "城市夜景",
    prompt: "繁华都市的夜景，霓虹灯闪烁，高楼大厦，街道上的车流形成光线轨迹",
    negative_prompt: "模糊，过度曝光，不自然的光源",
    parameters: {
      guidance_scale: 7.0,
      num_inference_steps: 30,
    },
  },
  {
    label: "美食摄影",
    prompt: "精致美食特写，完美的摆盘，柔和的自然光线，清晰的质感和细节",
    negative_prompt: "模糊，不自然的颜色，低质量",
    parameters: {
      guidance_scale: 7.5,
      num_inference_steps: 35,
    },
  },
  {
    label: "科幻场景",
    prompt: "未来主义科幻场景，先进的技术，飞行器，全息投影，科技感的建筑",
    negative_prompt: "老旧，乡村，自然，原始",
    parameters: {
      guidance_scale: 8.0,
      num_inference_steps: 40,
    },
  },
  {
    label: "水下世界",
    prompt: "梦幻的水下场景，五彩缤纷的珊瑚礁，热带鱼群，柔和的水下光线穿透水面",
    negative_prompt: "模糊，污染，黑暗",
    parameters: {
      guidance_scale: 7.5,
      num_inference_steps: 30,
    },
  },
  {
    label: "卡通风格",
    prompt: "卡通风格的插图，明亮饱和的色彩，简洁的线条，可爱的角色设计",
    negative_prompt: "现实主义，照片级真实感，恐怖，暗黑",
    parameters: {
      guidance_scale: 6.0,
      num_inference_steps: 25,
    },
  },
];

// 参数预设数据
const parameterPresets = [
  { label: "快速生成", value: { num_inference_steps: 20, guidance_scale: 7.0 } },
  { label: "标准质量", value: { num_inference_steps: 30, guidance_scale: 7.5 } },
  { label: "高质量", value: { num_inference_steps: 50, guidance_scale: 8.0 } },
];

// 表单数据
const formData = reactive({
  prompt: "",
  negative_prompt: "",
  image_size: ImageSize.Square as ImageSize | string,
  batch_size: 1,
  num_inference_steps: 20,
  guidance_scale: 7.5,
  seed: undefined as number | undefined,
  image: undefined as string | undefined,
});

// 状态变量
const loading = ref(false);
const imageUrl = ref("");
const generatedImages = ref<{ url: string }[]>([]);
const lastSeed = ref<number | null>(null);
const generationTime = ref<number | null>(null);
const progress = ref(0);
const estimatedTime = ref(20);
let progressTimer: number | null = null;
const previewVisible = ref<boolean>(false);
const previewImage = ref<string>("");
const previewTitle = ref<string>("");

// 新增：用于绑定预设 radio group 的 model
const selectedPresetLabel = ref<string | null>(null);

// 错误消息映射
const errorMessageMap: Record<string, string> = {
  "network error": "网络连接错误，请检查您的网络连接",
  "timeout": "请求超时，服务器可能繁忙，请稍后再试",
  "server error": "服务器错误，请联系管理员",
  "invalid_api_key": "API密钥无效，请检查您的设置",
  "invalid_prompt": "提示词格式错误，请修改后重试",
  "content_policy_violation": "提示词内容不符合使用政策，请修改后重试",
  "20015": "推理步骤必须小于或等于50",
};

// 随机化种子
const randomizeSeed = () => {
  formData.seed = Math.floor(Math.random() * 1000000000);
};

// 自定义上传处理
const handleCustomUpload = async (options: any) => {
  const { file } = options;
  try {
    // 转换为base64
    const base64 = await imageService.fileToBase64(file);
    formData.image = base64;
    imageUrl.value = base64;
    ElMessage.success('参考图片上传成功');
  } catch (error) {
    ElMessage.error("图片处理失败");
    console.error("图片处理错误:", error);
  }
};

// 图片上传前预处理
const beforeImageUpload = (file: File) => {
  const isImage = file.type.startsWith("image/");
  const isLt5M = file.size / 1024 / 1024 < 5;

  if (!isImage) {
    ElMessage.error("只能上传图片文件!");
    return false;
  }

  if (!isLt5M) {
    ElMessage.error("图片大小不能超过 5MB!");
    return false;
  }

  return true; // 允许上传
};

// 图片上传成功处理 (不会执行，因为我们禁用了自动上传)
const handleImageSuccess = () => {};

// 移除上传的图片
const removeImage = () => {
  imageUrl.value = "";
  formData.image = undefined;
};

// 生成图片
const generateImage = async () => {
  // 添加日志，检查 formData 值
  console.log('Generating image with data:', JSON.stringify(formData, null, 2));

  if (!formData.prompt) {
    ElMessage.warning("请输入提示词");
    return;
  }

  // 确保推理步骤不超过50
  if (formData.num_inference_steps > 50) {
    formData.num_inference_steps = 50;
    ElMessage.warning("推理步骤已自动调整为最大值50");
  }

  loading.value = true;
  generationTime.value = null;

  // 启动进度模拟
  startProgressTimer();

  try {
    const startTime = Date.now();
    const result = await imageService.generateImage({
      prompt: formData.prompt,
      negative_prompt: formData.negative_prompt || undefined,
      image_size: formData.image_size,
      batch_size: formData.batch_size,
      num_inference_steps: formData.num_inference_steps,
      guidance_scale: formData.guidance_scale,
      seed: formData.seed,
      image: formData.image,
    });

    const endTime = Date.now();
    generationTime.value = parseFloat(
      ((endTime - startTime) / 1000).toFixed(1)
    );

    // 更新生成的图片和种子
    generatedImages.value = result.images;
    lastSeed.value = result.seed;

    // 完成进度
    progress.value = 100;

    ElMessage.success("图片生成成功");
  } catch (error: any) {
    progress.value = 0;

    // 根据错误类型显示更友好的错误消息
    let errorMessage = error.message || "未知错误";
    let errorCode = "";

    // 尝试解析错误对象
    try {
      if (typeof errorMessage === 'string' && errorMessage.includes('{')) {
        const errorObj = JSON.parse(errorMessage.substring(errorMessage.indexOf('{')));
        errorCode = errorObj.code?.toString() || "";
        errorMessage = errorObj.message || errorMessage;
      }
    } catch (e) {
      console.error("Error parsing error message:", e);
    }

    // 检查错误代码映射
    if (errorCode && errorMessageMap[errorCode]) {
      ElMessage.error(errorMessageMap[errorCode]);
    } else {
      // 检查错误消息映射
      const knownError = Object.keys(errorMessageMap).find(key =>
        errorMessage.toLowerCase().includes(key.toLowerCase())
      );

      if (knownError) {
        ElMessage.error(errorMessageMap[knownError]);
      } else {
        ElMessage.error(`图片生成失败: ${errorMessage}`);
      }
    }

    console.error("图片生成失败:", error);
  } finally {
    // 清除进度定时器
    if (progressTimer !== null) {
      clearInterval(progressTimer);
      progressTimer = null;
    }

    // 延迟关闭loading状态，让用户看到100%的进度
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
};

// 模拟进度更新
const startProgressTimer = () => {
  progress.value = 0;
  estimatedTime.value = 20;

  progressTimer = window.setInterval(() => {
    if (progress.value < 99) {
      // 增加1-5的随机值
      const increment = Math.floor(Math.random() * 5) + 1;
      progress.value = Math.min(99, progress.value + increment);

      // 更新估计时间
      const remainingProgress = 100 - progress.value;
      estimatedTime.value = Math.max(1, Math.round(remainingProgress / 5));
    }
  }, 800);
};

// 在组件卸载时清除定时器
onUnmounted(() => {
  if (progressTimer !== null) {
    clearInterval(progressTimer);
  }
});

// 下载图片
const downloadImage = (url: string, index: number) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = `generated-image-${lastSeed.value || Date.now()}-${index}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

// 使用当前图片的种子
const useImageSeed = (seed: number | null) => {
  if (seed !== null) {
    formData.seed = seed;
    ElMessage.success(`已设置种子: ${seed}`);
  }
};

// 应用提示词模板 - 修改：应用模板后检查预设匹配
const applyTemplate = (template: any) => {
  formData.prompt = template.prompt;
  formData.negative_prompt = template.negative_prompt;
  if (template.parameters) {
    formData.guidance_scale = template.parameters.guidance_scale;
    formData.num_inference_steps = template.parameters.num_inference_steps;
  }
  checkAndUpdatePresetSelection(); // 应用模板后检查是否匹配预设
  ElMessage.success("已应用模板");
};

// 应用参数预设 - 修改：应用后更新 selectedPresetLabel
const applyPreset = (preset: (typeof parameterPresets)[0]) => {
  formData.num_inference_steps = preset.value.num_inference_steps;
  formData.guidance_scale = preset.value.guidance_scale;
  selectedPresetLabel.value = preset.label; // 更新选中的标签
  ElMessage.success("已应用参数预设");
};

// 新增：处理预设 Radio Group 变化的函数
const handlePresetChange = (label: string | number | boolean) => {
  if (typeof label === 'string') {
    const preset = parameterPresets.find(p => p.label === label);
    if (preset) {
      applyPreset(preset); // 调用 applyPreset 来应用并更新UI
    }
  }
};

// 新增：检查当前 formData 值是否匹配某个预设，并更新 selectedPresetLabel
const checkAndUpdatePresetSelection = () => {
  const currentSteps = formData.num_inference_steps;
  const currentScale = formData.guidance_scale;
  const matchedPreset = parameterPresets.find(
    p => p.value.num_inference_steps === currentSteps && p.value.guidance_scale === currentScale
  );
  selectedPresetLabel.value = matchedPreset ? matchedPreset.label : null;
};

// 显示图片预览
const showPreview = (image: string): void => {
  previewImage.value = image;
  previewVisible.value = true;
  previewTitle.value = `生成图片 (种子: ${lastSeed.value || "随机"})`;
};

// 图片操作菜单
const handleImageAction = (
  action: ImageAction,
  image: string,
  index: number
): void => {
  switch (action) {
    case "preview":
      showPreview(image);
      break;
    case "download":
      downloadImage(image, index);
      break;
    case "use-seed":
      useImageSeed(lastSeed.value);
      break;
    case "regenerate":
      regenerateWithSeed(lastSeed.value);
      break;
  }
};

// 使用相同参数和种子重新生成
const regenerateWithSeed = async (seed: number | null): Promise<void> => {
  if (seed === null) return;
  formData.seed = seed;
  await generateImage();
};

// 下载当前预览的图片
const downloadCurrentPreview = () => {
  if (!previewImage.value) return;
  const a = document.createElement("a");
  a.href = previewImage.value;
  a.download = `generated-image-${lastSeed.value || Date.now()}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  ElMessage.success("图片下载已开始");
};

// 复制种子到剪贴板
const copySeedToClipboard = async () => {
  if (lastSeed.value === null) return;

  try {
    await navigator.clipboard.writeText(lastSeed.value.toString());
    ElMessage.success(`已复制种子(${lastSeed.value})到剪贴板`);
  } catch (err) {
    // 降级方案
    const textArea = document.createElement("textarea");
    textArea.value = lastSeed.value.toString();
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    ElMessage.success(`已复制种子(${lastSeed.value})到剪贴板`);
  }
};

// 使用当前种子并关闭预览
const useCurrentSeedAndClose = () => {
  if (lastSeed.value !== null) {
    formData.seed = lastSeed.value;
    ElMessage.success(`已设置种子: ${lastSeed.value}`);
    previewVisible.value = false;
  }
};

// 根据选择的图片尺寸获取对应的长宽比样式
const getAspectRatioStyle = () => {
  const sizeValue = formData.image_size;
  const dimensions = sizeValue.split('x');
  if (dimensions.length === 2) {
    const width = parseInt(dimensions[0]);
    const height = parseInt(dimensions[1]);
    const ratio = (height / width) * 100;
    return {
      paddingBottom: `${ratio}%`,
      height: '0',
    };
  }
  // 默认1:1比例
  return {
    paddingBottom: '100%',
    height: '0',
  };
};

// 随机应用一个模板
const applyRandomTemplate = () => {
  const randomIndex = Math.floor(Math.random() * promptTemplates.length);
  applyTemplate(promptTemplates[randomIndex]);
};

// 滚动到提示词输入区域
const scrollToPrompt = () => {
  const promptElement = document.querySelector('.generation-form');
  if (promptElement) {
    promptElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// 新增：根据比例计算SVG矩形参数
const getSvgRect = (ratio: string): { x: number; y: number; width: number; height: number } => {
  const maxDim = 18; // SVG viewBox 内矩形的最大尺寸
  const viewBoxSize = 24;
  let width = maxDim;
  let height = maxDim;

  try {
    const [wRatio, hRatio] = ratio.split(':').map(Number);
    if (wRatio && hRatio) {
      if (wRatio > hRatio) {
        width = maxDim;
        height = (maxDim * hRatio) / wRatio;
      } else {
        height = maxDim;
        width = (maxDim * wRatio) / hRatio;
      }
    }
  } catch (e) {
    console.error("Error parsing ratio:", ratio, e);
    // 保留默认 1:1
  }

  // 计算居中位置
  const x = (viewBoxSize - width) / 2;
  const y = (viewBoxSize - height) / 2;

  return { x, y, width, height };
};

// 组件挂载时检查初始值是否匹配预设
onMounted(() => {
  checkAndUpdatePresetSelection();
});

// 监听 formData 中相关值的变化，以取消预设选中状态
watch([() => formData.num_inference_steps, () => formData.guidance_scale], () => {
  checkAndUpdatePresetSelection();
});
</script>

<style scoped>
/* CSS变量定义 - 移至组件作用域而非:root */
.image-gen-view {
  /* 颜色变量 */
  --primary-color: #4e54c8;
  --primary-light: #8f94fb;
  --primary-dark: #3a3f9f;
  --secondary-color: #ff7eb3;

  --neutral-50: #f9fafb;
  --neutral-100: #f3f4f6;
  --neutral-200: #e5e7eb;
  --neutral-300: #d1d5db;
  --neutral-400: #9ca3af;
  --neutral-500: #6b7280;
  --neutral-600: #4b5563;
  --neutral-700: #374151;
  --neutral-800: #1f2937;
  --neutral-900: #111827;

  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  --info-color: #3b82f6;

  /* 阴影变量 */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

  /* 圆角变量 */
  --border-radius-sm: 0.25rem;
  --border-radius-md: 0.5rem;
  --border-radius-lg: 0.75rem;
  --border-radius-xl: 1rem;
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

  /* 基础样式 */
  padding: var(--spacing-5);
  background: linear-gradient(135deg, var(--neutral-50), var(--neutral-100));
  min-height: calc(100vh - 64px);
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--neutral-800);
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-8);
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: var(--spacing-2);
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.025em;
}

.subtitle {
  font-size: 1.1rem;
  color: var(--neutral-600);
  margin: 0;
  font-weight: 400;
}

.content-container {
  display: grid;
  grid-template-columns: minmax(320px, 400px) 1fr;
  gap: var(--spacing-6);
  max-width: 1600px;
  margin: 0 auto;
  position: relative;
}

/* 表单区域 */
.form-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  height: calc(100vh - 140px);
  overflow-y: auto;
  padding-right: var(--spacing-2);
  scrollbar-width: thin;
}

/* 滚动条样式 */
.form-container::-webkit-scrollbar {
  width: 6px;
}

.form-container::-webkit-scrollbar-track {
  background: var(--neutral-100);
  border-radius: var(--border-radius-full);
}

.form-container::-webkit-scrollbar-thumb {
  background: var(--neutral-300);
  border-radius: var(--border-radius-full);
}

.form-container::-webkit-scrollbar-thumb:hover {
  background: var(--neutral-400);
}

.form-card {
  background: white;
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-5);
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--neutral-200);
}

.form-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-4);
}

.card-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--neutral-800);
}

.generation-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.parameter-grid {
  display: grid;
  gap: var(--spacing-4);
}

/* 结果容器 */
.results-container {
  background: white;
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.3s ease;
  border: 1px solid var(--neutral-200);
  height: calc(100vh - 140px);
  overflow-y: auto;
  scrollbar-width: thin;
}

.results-container::-webkit-scrollbar {
  width: 6px;
}

.results-container::-webkit-scrollbar-track {
  background: var(--neutral-100);
  border-radius: var(--border-radius-full);
}

.results-container::-webkit-scrollbar-thumb {
  background: var(--neutral-300);
  border-radius: var(--border-radius-full);
}

.results-container::-webkit-scrollbar-thumb:hover {
  background: var(--neutral-400);
}

/* 输入控件样式 */
.seed-input-group {
  display: flex;
  gap: var(--spacing-2);
}

.generate-button-container {
  margin-top: var(--spacing-4);
  margin-bottom: var(--spacing-2);
}

/* Image uploader */
.image-uploader {
  border: 2px dashed var(--neutral-300);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  width: 100%;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--neutral-50);
}

.image-uploader:hover {
  border-color: var(--primary-light);
  background: rgba(78, 84, 200, 0.03);
}

.upload-icon {
  font-size: 28px;
  color: var(--neutral-500);
  transition: color 0.3s ease;
}

.upload-placeholder:hover .upload-icon {
  color: var(--primary-color);
}

.upload-tip {
  font-size: 0.75rem;
  color: var(--neutral-500);
  margin-top: var(--spacing-2);
}

.image-preview {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--neutral-100);
}

.uploaded-image {
  max-width: 100%;
  max-height: 150px;
  object-fit: contain;
  border-radius: var(--border-radius-sm);
}

.remove-image {
  position: absolute;
  top: var(--spacing-2);
  right: var(--spacing-2);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  width: 30px;
  height: 30px;
  border-radius: var(--border-radius-full);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
}

.image-preview:hover .remove-image {
  opacity: 1;
}

.remove-image:hover {
  background: var(--error-color);
  transform: scale(1.1);
}

/* 生成按钮样式 */
.generate-button {
  width: 100%;
  height: 48px;
  font-size: 1rem;
  font-weight: 600;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  border: none;
  transition: all 0.3s ease;
  border-radius: var(--border-radius-md);
  box-shadow: 0 4px 10px rgba(78, 84, 200, 0.2);
}

.generate-button:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--primary-dark), var(--primary-color));
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(78, 84, 200, 0.3);
}

.generate-button:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 5px rgba(78, 84, 200, 0.3);
}

/* 空状态样式 */
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: var(--spacing-5);
}

.empty-state-content {
  max-width: 720px;
  background: white;
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-8) var(--spacing-6);
  text-align: center;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--neutral-200);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.empty-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-8);
  padding: 0 var(--spacing-4);
}

.empty-title-container {
  text-align: left;
  max-width: 60%;
}

.empty-badge {
  display: inline-block;
  background: rgba(78, 84, 200, 0.1);
  color: var(--primary-color);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius-full);
  margin-bottom: var(--spacing-2);
}

.empty-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--neutral-800);
  margin-bottom: var(--spacing-2);
  background-image: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.empty-subtitle {
  font-size: 1rem;
  color: var(--neutral-600);
  margin: 0;
}

.decoration-container {
  width: 180px;
  height: 180px;
}

.steps-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-8);
  padding: 0 var(--spacing-2);
}

.step-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-4);
  background-color: var(--neutral-50);
  border-radius: var(--border-radius-lg);
  transition: all 0.3s ease;
  border: 1px solid var(--neutral-200);

  position: relative;
}

.step-card:hover {
  background-color: rgba(78, 84, 200, 0.05);
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: rgba(78, 84, 200, 0.2);
}

.step-header {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-3);
}

.step-number {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: var(--border-radius-full);
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: white;
  font-weight: 600;
  flex-shrink: 0;
  margin-right: var(--spacing-2);
  box-shadow: 0 2px 10px rgba(78, 84, 200, 0.3);
}

.step-header h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--neutral-800);
  margin: 0;
}

.step-icon {
  margin: var(--spacing-3) 0;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-description {
  font-size: 0.875rem;
  color: var(--neutral-600);
  margin: var(--spacing-3) 0 0 0;
  line-height: 1.5;
  text-align: center;
}

.step-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2);
  position: relative;
  top: 80px;
}

.empty-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-4);
}

.action-button {
  min-width: 160px;
  height: 44px;
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: var(--border-radius-md);
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.secondary-button {
  background-color: var(--neutral-50);
  border-color: var(--neutral-300);
  color: var(--neutral-700);
}

.secondary-button:hover {
  background-color: white;
  border-color: var(--primary-color);
  color: var(--primary-color);
}

/* Element Plus 图标在按钮中的样式 */
.action-button :deep(.el-icon) {
  margin-right: var(--spacing-2);
}

/* 加载状态 */
.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-8);
  max-width: 400px;
}

.loading-icon {
  font-size: 48px;
  margin-bottom: var(--spacing-4);
  animation: spin 2s linear infinite;
  color: var(--primary-color);
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 进度条样式 */
.progress-container {
  width: 100%;
  height: 8px;
  background: var(--neutral-200);
  border-radius: var(--border-radius-full);
  margin: var(--spacing-4) 0;
  overflow: hidden;
  position: relative;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  transition: width 0.5s ease;
  border-radius: var(--border-radius-full);
  position: relative;
}

.progress-percentage {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-top: var(--spacing-2);
}

/* 生成结果样式 */
.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-5);
  padding-bottom: var(--spacing-4);
  border-bottom: 1px solid var(--neutral-200);
}

.results-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.generation-info {
  font-size: 0.875rem;
  color: var(--neutral-600);
}

.generation-info p {
  margin: 0 0 4px 0;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--spacing-5);
  width: 100%;
}

.image-item {
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  background: var(--neutral-50);
  border: 1px solid var(--neutral-200);
}

.image-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
  z-index: 1;
}

.image-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  background-color: var(--neutral-100);
}

.image-wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.image-wrapper:hover img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-wrapper:hover .image-overlay {
  opacity: 1;
}

.image-actions {
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.image-wrapper:hover .image-actions {
  transform: translateY(0);
}

/* 图片操作按钮样式 */
.action-buttons {
  display: flex;
  gap: var(--spacing-2);
}

.image-actions :deep(.el-button) {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--primary-color);
  height: 36px;
  width: 36px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.image-actions :deep(.el-button:hover) {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  color: var(--primary-dark);
  border-color: white;
}

.image-actions :deep(.el-button .el-icon) {
  margin: 0;
  font-size: 1rem;
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

.upload-placeholder {
  display: flex;
    flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: var(--neutral-500);
  transition: all 0.3s ease;
}

.upload-text {
  font-size: 0.875rem;
  margin-top: var(--spacing-2);
}

/* 提示词和预设区域样式 */
.templates-section,
.presets-section {
  margin-bottom: var(--spacing-4);
  padding: var(--spacing-4);
  background: var(--neutral-50);
  border-radius: var(--border-radius-md);
  transition: all 0.3s ease;
  border: 1px solid var(--neutral-200);
}

.templates-section:hover,
.presets-section:hover {
  background: rgba(78, 84, 200, 0.05);
  border-color: rgba(78, 84, 200, 0.2);
}

.presets-section {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-4);
  margin-bottom: 0;
}

.preset-label {
  font-size: 0.875rem;
  color: var(--neutral-600);
  white-space: nowrap;
  font-weight: 500;
}

.templates-section h3 {
  font-size: 0.875rem;
  color: var(--neutral-700);
  margin: 0 0 var(--spacing-3) 0;
  font-weight: 600;
}

.template-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--spacing-2);
  width: 100%;
}

.template-buttons,
.preset-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
}

/* Element Plus 组件样式定制 */
.template-buttons :deep(.el-button),
.preset-buttons :deep(.el-button) {
  background: white;
  border: 1px solid var(--neutral-300);
  color: var(--neutral-700);
  transition: all 0.3s ease;
  font-size: 0.75rem;
}

.template-buttons :deep(.el-button:hover),
.preset-buttons :deep(.el-button:hover) {
  background: rgba(78, 84, 200, 0.05);
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(78, 84, 200, 0.1);
}

/* 图片尺寸选择器样式 - 恢复网格布局并优化 */
.size-selector {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); /* 调整最小宽度和自适应 */
  gap: var(--spacing-3); /* 调整间距 */
  width: 100%;
  /* 移除 flex, overflow-x, padding-bottom, scrollbar 相关样式 */
}

/* 重置 el-radio-button 默认样式 */
.size-radio-button :deep(.el-radio-button__inner) {
  padding: 0;
  border: none;
  border-radius: var(--border-radius-lg); /* 统一圆角 */
  box-shadow: none;
  background-color: transparent;
  height: auto; /* 高度由内容决定 */
  display: block;
}

/* 自定义内容容器 - 优化样式 */
.size-option-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 64px; /* 调整高度 */
  cursor: pointer;
  border: 1px solid var(--neutral-200); /* 更柔和的边框 */
  border-radius: var(--border-radius-lg);
  background-color: white;
  transition: all 0.25s ease-out;
  position: relative;
  padding: var(--spacing-1) 0; /* 增加垂直内边距 */
}

/* SVG 图标样式 - 优化 */
.size-icon {
  width: 28px; /* 稍微增大图标 */
  height: 28px;
  margin-bottom: var(--spacing-1);
  /* 移除绝对定位 */
}

.svg-rect {
  fill: var(--neutral-300); /* 默认颜色变浅 */
  transition: fill 0.25s ease-out;
}

/* 文字标签样式 - 优化 */
.size-label {
  font-size: 0.75rem;
  color: var(--neutral-600);
  text-align: center;
  line-height: 1.2;
  /* 移除绝对定位 */
  margin-top: auto; /* 将文字推到底部 */
  padding-bottom: var(--spacing-1);
}

/* 悬停状态 - 更精致 */
.size-radio-button:hover .size-option-content {
  border-color: var(--neutral-300);
  background-color: var(--neutral-50);
  box-shadow: var(--shadow-sm);
}

.size-radio-button:hover .svg-rect {
  fill: var(--neutral-500);
}

/* 激活/选中状态 - 更高级 */
.size-radio-button.is-active .size-option-content {
  border-color: var(--primary-color);
  background-color: white;
  box-shadow: 0 0 0 2px var(--primary-color), var(--shadow-sm); /* 边框高亮 + 细微阴影 */
}

.size-radio-button.is-active .svg-rect {
  fill: var(--primary-color);
}

.size-radio-button.is-active .size-label {
  color: var(--primary-color);
  font-weight: 600;
}

/* 移除旧的或冲突的样式 - 确保清理 */
/* .size-option, .size-preview, .size-rectangle, .ratio-* 等相关旧规则应删除 */
.size-selector::-webkit-scrollbar,
.size-selector::-webkit-scrollbar-track,
.size-selector::-webkit-scrollbar-thumb {
  display: none; /* 隐藏滚动条样式 */
}

/* 其他样式保持不变 */
/* ... */

/* 定位到第二个 form-card 并添加特定样式 */
.form-card:nth-of-type(2) {
  background: linear-gradient(135deg, var(--neutral-50), white);
  /* 可以添加一个微妙的顶部边框强调 */
  /* border-top: 2px solid var(--primary-light); */
}

/* 卡片头部优化 - 调整间距 */
.form-card:nth-of-type(2) .card-header {
  border-bottom: 1px solid var(--neutral-200);
  padding-bottom: var(--spacing-4);
  margin-bottom: var(--spacing-6); /* 增加与下方内容的间距 */
}

.form-card:nth-of-type(2) .card-header h3 {
  color: var(--primary-dark);
  font-weight: 700;
}

/* 快速预设区域优化 - 新样式 */
.form-card:nth-of-type(2) .presets-section {
  background-color: transparent;
  border: none;
  padding: 0;
  margin-top: var(--spacing-3);
  display: flex;
  /* align-items: center; */ /* 尝试移除或改为 baseline */
  align-items: baseline; /* 基线对齐可能更好 */
  gap: var(--spacing-2); /* 稍微减小gap */
}

.preset-title {
  font-size: 0.875rem;
  color: var(--neutral-600);
  white-space: nowrap;
  font-weight: 500;
  line-height: 30px; /* 尝试让标题行高接近按钮高度 */
}

/* 移除空规则 */
/* .preset-radio-group {} */

/* 定制预设的 el-radio-button */
.form-card:nth-of-type(2) .preset-radio-group :deep(.el-radio-button__inner) {
  /* 尝试移除 !important */
  border-radius: var(--border-radius-md);
  border: 1px solid var(--neutral-300);
  background-color: white;
  color: var(--neutral-700);
  padding: 5px 10px; /* 稍微调整内边距 */
  font-size: 0.75rem; /* 稍微调整字体 */
  font-weight: 500;
  box-shadow: none;
  transition: all 0.2s ease-out; /* 缩短过渡时间 */
  line-height: 1.5; /* 确保文字垂直居中 */
  height: 30px; /* 明确按钮高度 */
}

/* 预设按钮悬停 */
.form-card:nth-of-type(2) .preset-radio-group :deep(.el-radio-button:hover .el-radio-button__inner) {
  border-color: var(--primary-light);
  color: var(--primary-color);
  z-index: 1;
}

/* 预设按钮选中 */
.form-card:nth-of-type(2) .preset-radio-group :deep(.el-radio-button.is-active .el-radio-button__inner) {
  background-color: rgba(78, 84, 200, 0.08);
  border-color: var(--primary-color);
  color: var(--primary-color);
  box-shadow: none;
  z-index: 2;
}

/* 移除相邻按钮间的左边框，制造连接效果 - 确认样式 */
.form-card:nth-of-type(2) .preset-radio-group :deep(.el-radio-button:not(:first-child) .el-radio-button__inner) {
  border-left: none;
  margin-left: -1px;
}

/* 第一个按钮左圆角 */
.form-card:nth-of-type(2) .preset-radio-group :deep(.el-radio-button:first-child .el-radio-button__inner) {
  border-top-left-radius: var(--border-radius-md);
  border-bottom-left-radius: var(--border-radius-md);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

/* 最后一个按钮右圆角 */
.form-card:nth-of-type(2) .preset-radio-group :deep(.el-radio-button:last-child .el-radio-button__inner) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: var(--border-radius-md);
  border-bottom-right-radius: var(--border-radius-md);
}

/* 中间按钮无圆角 */
.form-card:nth-of-type(2) .preset-radio-group :deep(.el-radio-button:not(:first-child):not(:last-child) .el-radio-button__inner) {
  border-radius: 0;
}

/* 其他样式 */
/* ... */

/* 定位到第一个 form-card 并添加特定样式 */
.form-card:nth-of-type(1) {
  /* background: var(--neutral-50); */ /* 可选：略微不同的背景 */
  border-left: 3px solid var(--primary-color); /* 左侧强调线 */
  padding-left: calc(var(--spacing-5) - 3px); /* 调整内边距以补偿边框 */
}

/* 模板区域优化 */
.form-card:nth-of-type(1) .templates-section {
  background-color: var(--neutral-50); /* 给模板区一个浅背景 */
  padding: var(--spacing-3) var(--spacing-4); /* 调整内边距 */
  margin-bottom: var(--spacing-5); /* 增加与下方提示词间距 */
}

.form-card:nth-of-type(1) .templates-section h3 {
  color: var(--neutral-700);
  font-weight: 600;
  margin-bottom: var(--spacing-3);
}

.form-card:nth-of-type(1) .template-grid {
  gap: var(--spacing-2);
}

/* 模板按钮样式重构 */
.form-card:nth-of-type(1) .template-grid :deep(.el-button) {
  background-color: white;
  border: 1px solid var(--neutral-300);
  color: var(--neutral-600);
  font-weight: 400;
  font-size: 0.8rem;
  padding: 5px 10px;
  border-radius: var(--border-radius-md);
  transition: all 0.25s ease-out;
  box-shadow: none;
  margin: 0; /* 显式重置 margin */
}

.form-card:nth-of-type(1) .template-grid :deep(.el-button:hover) {
  background-color: var(--primary-light);
  border-color: var(--primary-light);
  color: white;
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

/* 输入框 Textarea 美化 */
.form-card:nth-of-type(1) :deep(.el-textarea__inner) {
  background-color: var(--neutral-50);
  border-color: var(--neutral-200);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-2) var(--spacing-3);
  line-height: 1.6;
  min-height: 80px; /* 保证最小高度 */
  transition: border-color 0.25s ease-out, box-shadow 0.25s ease-out;
}

.form-card:nth-of-type(1) :deep(.el-textarea__inner:focus) {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(78, 84, 200, 0.15);
  background-color: white;
}

/* 移除空规则集 */
/* .preset-radio-group {} */ /* 已移除 */

/* 确保其他规则不受影响 */
/* ... */

/* 移除旧的预设按钮样式（如果上次未完全移除） */
.preset-buttons {
  display: none !important;
}

/* --- 响应式设计 --- */
@media (max-width: 1024px) {
  .content-container {
    grid-template-columns: minmax(300px, 360px) 1fr; /* 稍窄的侧边栏 */
    gap: var(--spacing-5);
  }
  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--spacing-4);
  }
  .results-header h2 {
    font-size: 1.3rem;
  }
  .form-card {
    padding: var(--spacing-4);
  }
  .results-container {
    padding: var(--spacing-5);
  }
  .page-header h1 {
    font-size: 2rem;
  }
  .subtitle {
    font-size: 1rem;
  }
  .empty-state-content {
     padding: var(--spacing-6) var(--spacing-4);
  }
  .steps-container {
     gap: var(--spacing-1);
  }
  .step-card {
     padding: var(--spacing-3);
  }
  .step-header h4 {
     font-size: 0.9rem;
  }
  .step-description {
      font-size: 0.8rem;
  }
  .empty-title {
     font-size: 1.5rem;
  }
  .empty-subtitle {
     font-size: 0.9rem;
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
    grid-template-columns: 1fr; /* 垂直堆叠 */
    gap: var(--spacing-5);
    max-width: 100%;
  }

  .form-container,
  .results-container {
    height: auto; /* 高度自适应 */
    overflow-y: visible; /* 移除内部滚动 */
    padding-right: 0;
    max-height: none; /* 取消最大高度限制 */
  }

  .results-container {
    min-height: 300px; /* 给结果区一个最小高度 */
    padding: var(--spacing-4);
  }

  .form-card {
    padding: var(--spacing-4);
  }

  .parameter-grid {
    grid-template-columns: 1fr; /* 参数项单列 */
  }

  .template-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: var(--spacing-1);
  }

  .size-selector {
    grid-template-columns: repeat(auto-fill, minmax(85px, 1fr)); /* 尺寸选择器调整 */
    gap: var(--spacing-2);
  }
  .size-option-content {
    height: 56px; /* 减小尺寸按钮高度 */
  }
  .size-icon {
    width: 24px;
    height: 24px;
  }
  .size-label {
    font-size: 0.7rem;
  }

  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); /* 图片结果两列或更多 */
    gap: var(--spacing-3);
  }

  /* 空状态调整 */
  .empty-header {
  flex-direction: column;
  align-items: center;
    text-align: center;
    gap: var(--spacing-4);
    padding: 0;
  }
  .empty-title-container {
    max-width: 100%;
    text-align: center;
  }
  .decoration-container {
    width: 140px;
    height: 140px;
    margin-top: var(--spacing-4);
  }
  .steps-container {
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-4);
  }
  .step-arrow {
    transform: rotate(90deg); /* 箭头旋转 */
    top: 0;
    padding: var(--spacing-1) 0;
  }
  .empty-state-content {
     padding: var(--spacing-5) var(--spacing-4);
  }
   .empty-actions {
    flex-direction: column;
    gap: var(--spacing-3);
    align-items: stretch; /* 让按钮宽度撑满 */
  }
  .action-button {
    min-width: unset; /* 取消最小宽度 */
  }

  /* 预览对话框 */
  .preview-dialog :deep(.el-dialog) {
    width: 90%;
    max-width: 500px;
  }
  .preview-actions {
    flex-wrap: wrap; /* 按钮允许换行 */
    justify-content: center;
  }

  /* 调整字体 */
  .page-header h1 {
    font-size: 1.8rem;
  }
  .subtitle {
    font-size: 0.9rem;
  }
  .results-header h2 {
    font-size: 1.2rem;
  }
  .card-header h3 {
    font-size: 1rem;
  }
  .form-card :deep(.el-form-item__label) {
     font-size: 0.875rem; /* 调整表单标签字体 */
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
  .form-card {
    padding: var(--spacing-3);
  }
  .results-container {
    padding: var(--spacing-3);
  }
  .template-grid {
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  }
  .size-selector {
    grid-template-columns: repeat(2, 1fr); /* 尺寸选择强制两列 */
  }
   .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); /* 图片结果更小 */
    gap: var(--spacing-2);
  }
   .results-header {
     flex-direction: column;
     align-items: flex-start;
     gap: var(--spacing-2);
     padding-bottom: var(--spacing-3);
     margin-bottom: var(--spacing-4);
   }
   .generation-info {
     font-size: 0.8rem;
   }
    .empty-state-content {
     padding: var(--spacing-4) var(--spacing-3);
    }
    .step-card {
     padding: var(--spacing-2);
    }
     .step-header {
       margin-bottom: var(--spacing-2);
     }
     .step-number {
       width: 24px;
       height: 24px;
       font-size: 0.8rem;
     }
     .step-header h4 {
       font-size: 0.85rem;
     }
     .step-icon {
       margin: var(--spacing-2) 0;
     }
     .step-description {
       font-size: 0.75rem;
     }
}
</style>

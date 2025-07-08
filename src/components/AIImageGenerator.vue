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
          <div class="modern-parameter-card">
            <div class="space-y-6">
              <!-- 头部 -->
              <div class="flex items-center gap-2 mb-4">
                <div class="parameter-icon-modern">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16 13H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16 17H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 9H9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-foreground">提示词设置</h3>
              </div>

              <!-- 快速模板 -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-foreground">快速模板</label>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    v-for="template in promptTemplates"
                    :key="template.label"
                    @click="applyTemplate(template)"
                    class="flex items-center justify-center text-xs px-3 py-2 rounded-lg font-medium transition-all duration-200 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                  >
                    {{ template.label }}
                  </button>
                </div>
              </div>

              <!-- 提示词输入 -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-foreground">提示词 (Prompt)</label>
                <el-input
                  v-model="formData.prompt"
                  type="textarea"
                  :rows="4"
                  placeholder="描述你想要生成的图片内容..."
                  class="modern-textarea"
                />
              </div>

              <!-- 负面提示词输入 -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-foreground">负面提示词 (Negative Prompt)</label>
                <el-input
                  v-model="formData.negative_prompt"
                  type="textarea"
                  :rows="2"
                  placeholder="描述你不希望出现在图片中的内容..."
                  class="modern-textarea"
                />
              </div>
            </div>
          </div>

          <!-- 卡片2: 参数设置区 -->
          <div class="modern-parameter-card">
            <div class="space-y-6">
              <!-- 头部 -->
              <div class="flex items-center gap-2 mb-4">
                <div class="parameter-icon-modern">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2"/>
                    <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-foreground">AI 参数设置</h3>
              </div>

              <!-- 图片尺寸选择 -->
              <div class="space-y-3">
                <label class="text-sm font-medium text-foreground">图片尺寸</label>
                <div class="size-preview-grid">
                  <button
                    v-for="(value, key) in imageSizeOptions"
                    :key="key"
                    @click="formData.image_size = value.value"
                    :class="[
                      'size-preview-card',
                      formData.image_size === value.value ? 'size-preview-active' : 'size-preview-inactive'
                    ]"
                  >
                    <!-- 比例预览框 -->
                    <div class="size-preview-container">
                      <div
                        class="size-preview-box"
                        :style="getSizePreviewStyle(value.ratio)"
                      >
                        <div class="size-preview-inner">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="2"/>
                            <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <!-- 尺寸信息 -->
                    <div class="size-preview-info">
                      <div class="size-preview-label">{{ value.ratioLabel || value.label }}</div>
                      <div class="size-preview-ratio">{{ value.ratio }}</div>
                    </div>
                  </button>
                </div>
              </div>

              <!-- 预设按钮 -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-foreground">快速预设</label>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    v-for="preset in parameterPresets"
                    :key="preset.label"
                    @click="applyPreset(preset)"
                    :class="[
                      'flex items-center gap-2 text-xs px-3 py-2 rounded-lg font-medium transition-all duration-200',
                      selectedPresetLabel === preset.label
                        ? 'bg-primary text-white shadow-md'
                        : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                    ]"
                  >
                    <span class="text-sm">{{ getPresetIcon(preset.label) }}</span>
                    {{ preset.label }}
                  </button>
                </div>
              </div>

              <!-- 生成数量滑块 -->
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <label class="text-sm font-medium text-foreground">生成数量</label>
                  <span class="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{{ formData.batch_size }}</span>
                </div>
                <el-slider
                  v-model="formData.batch_size"
                  :min="1"
                  :max="4"
                  :step="1"
                  :marks="{1: '1', 2: '2', 3: '3', 4: '4'}"
                  show-stops
                  class="modern-slider-custom"
                />
              </div>

              <!-- 创造性滑块 -->
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <label class="text-sm font-medium text-foreground">创造性</label>
                  <span class="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{{ formData.guidance_scale }}</span>
                </div>
                <el-tooltip content="较低的值会产生更有创意但不太准确的结果，较高的值会使生成更忠于提示词但创意性较低" placement="top">
                  <el-slider
                    v-model="formData.guidance_scale"
                    :min="1"
                    :max="20"
                    :step="0.5"
                    :marks="{1: '高创造性', 10: '平衡', 20: '高精确性'}"
                    class="modern-slider-custom"
                  />
                </el-tooltip>
              </div>

              <!-- 细节程度滑块 -->
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <label class="text-sm font-medium text-foreground">细节程度</label>
                  <span class="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{{ formData.num_inference_steps }}</span>
                </div>
                <el-tooltip content="更高的值会产生更细致的图像，但需要更长时间生成。最大值为50。" placement="top">
                  <el-slider
                    v-model="formData.num_inference_steps"
                    :min="1"
                    :max="50"
                    :step="1"
                    :marks="{1: '低', 20: '中', 50: '高'}"
                    class="modern-slider-custom"
                  />
                </el-tooltip>
              </div>

              <!-- 随机种子 -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-foreground">随机种子</label>
                <div class="flex gap-2">
                  <el-input
                    v-model.number="formData.seed"
                    type="number"
                    placeholder="输入种子或留空随机生成"
                    class="flex-1 modern-input"
                  />
                  <el-button @click="randomizeSeed" class="modern-button-secondary">
                    🎲
                  </el-button>
                </div>
              </div>
            </div>
          </div>

          <!-- 卡片3: 参考图片上传 -->
          <div class="modern-parameter-card">
            <div class="space-y-6">
              <!-- 头部 -->
              <div class="flex items-center gap-2 mb-4">
                <div class="parameter-icon-modern">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="2"/>
                    <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2"/>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-foreground">参考图片</h3>
              </div>

              <!-- 图片上传区域 -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-foreground">上传参考图片</label>
                <el-upload
                  class="modern-image-uploader"
                  :show-file-list="false"
                  :before-upload="beforeImageUpload"
                  :auto-upload="true"
                  :http-request="handleCustomUpload"
                  action="#">
                  <div v-if="imageUrl" class="modern-image-preview">
                    <img :src="imageUrl" class="uploaded-image-modern" />
                    <div class="remove-image-modern" @click.stop="removeImage">
                      <el-icon>
                        <Delete />
                      </el-icon>
                    </div>
                  </div>
                  <div v-else class="modern-upload-placeholder">
                    <el-icon class="upload-icon-modern">
                      <Plus />
                    </el-icon>
                    <div class="upload-text-modern">点击上传参考图片</div>
                    <div class="upload-hint-modern">支持 JPG、PNG 格式</div>
                  </div>
                </el-upload>
                <div class="upload-tip-modern">上传图片后，AI将生成与参考图片风格相似的图像</div>
              </div>
            </div>
          </div>

          <!-- 生成按钮 -->
          <div class="modern-parameter-card modern-parameter-card-last">
            <button
              @click="generateImage"
              :disabled="!formData.prompt || loading"
              class="w-full h-12 flex items-center justify-center gap-2 bg-primary text-white rounded-lg font-medium transition-all duration-200 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="loading" class="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25"/>
                <path fill="currentColor" class="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ loading ? '生成中...' : '生成图片' }}
            </button>
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

// 获取预设图标
const getPresetIcon = (presetLabel: string): string => {
  const iconMap: Record<string, string> = {
    '快速生成': '⚡',
    '标准质量': '⚖️',
    '高质量': '💎'
  };
  return iconMap[presetLabel] || '🎨';
};

// 获取尺寸预览样式
const getSizePreviewStyle = (ratio: string) => {
  const containerSize = 36; // 容器大小，减小了
  let width = containerSize;
  let height = containerSize;

  try {
    const [wRatio, hRatio] = ratio.split(':').map(Number);
    if (wRatio && hRatio) {
      const aspectRatio = wRatio / hRatio;

      if (aspectRatio > 1) {
        // 横向图片
        width = containerSize;
        height = containerSize / aspectRatio;
      } else {
        // 纵向图片
        height = containerSize;
        width = containerSize * aspectRatio;
      }
    }
  } catch (e) {
    console.error("Error parsing ratio:", ratio, e);
  }

  return {
    width: `${width}px`,
    height: `${height}px`,
  };
};
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
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-lg);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  animation: slideInUp 0.6s ease-out;
}

.form-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--primary-gradient);
}

.form-card:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
  border-color: rgba(99, 102, 241, 0.2);
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
  gap: 0; /* 移除gap，使用卡片自身的margin-bottom */
}

.parameter-grid {
  display: grid;
  gap: var(--spacing-4);
}

/* 现代化结果容器 */
.results-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-8);
  box-shadow: var(--shadow-xl);
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  height: calc(100vh - 140px);
  overflow-y: auto;
  scrollbar-width: thin;
  position: relative;
  animation: slideInUp 0.8s ease-out 0.2s both;
}

.results-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--primary-gradient);
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

/* 现代化图片上传器 */
.image-uploader {
  border: 2px dashed var(--neutral-300);
  border-radius: var(--border-radius-xl);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, var(--neutral-50), rgba(255, 255, 255, 0.8));
  backdrop-filter: blur(5px);
}

.image-uploader:hover {
  border-color: var(--primary-color);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05));
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.upload-icon {
  font-size: 32px;
  color: var(--neutral-400);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: var(--spacing-2);
}

.upload-placeholder:hover .upload-icon {
  color: var(--primary-color);
  transform: scale(1.1);
}

.upload-tip {
  font-size: 0.875rem;
  color: var(--neutral-500);
  margin-top: var(--spacing-2);
  font-weight: 500;
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

/* 现代化生成按钮 */
.generate-button {
  width: 100%;
  height: 56px;
  font-size: 1.125rem;
  font-weight: 600;
  background: var(--primary-gradient);
  border: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-primary);
  position: relative;
  overflow: hidden;
  color: white;
}

.generate-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.generate-button:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--primary-dark), var(--primary-color));
  transform: translateY(-3px);
  box-shadow: var(--shadow-2xl);
}

.generate-button:hover:not(:disabled)::before {
  left: 100%;
}

.generate-button:active:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-primary);
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

/* 现代化动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
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
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-6);
  width: 100%;
}

.image-item {
  border-radius: var(--border-radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
}

.image-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--primary-gradient);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-item:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: var(--shadow-2xl);
  z-index: 10;
}

.image-item:hover::before {
  opacity: 1;
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

/* 现代化提示词和预设区域 */
.templates-section,
.presets-section {
  margin-bottom: var(--spacing-4);
  padding: var(--spacing-5);
  background: linear-gradient(135deg, var(--neutral-50), rgba(255, 255, 255, 0.8));
  backdrop-filter: blur(5px);
  border-radius: var(--border-radius-xl);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--neutral-200);
  box-shadow: var(--shadow-sm);
}

.templates-section:hover,
.presets-section:hover {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05));
  border-color: rgba(99, 102, 241, 0.3);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
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

/* 现代化按钮样式 */
.template-buttons :deep(.el-button),
.preset-buttons :deep(.el-button) {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  border: 1px solid var(--neutral-200);
  color: var(--neutral-700);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
}

.template-buttons :deep(.el-button:hover),
.preset-buttons :deep(.el-button:hover) {
  background: var(--primary-gradient);
  border-color: var(--primary-color);
  color: white;
  transform: translateY(-3px);
  box-shadow: var(--shadow-primary);
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

/* 现代化尺寸选择容器 */
.size-option-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 72px;
  cursor: pointer;
  border: 2px solid var(--neutral-200);
  border-radius: var(--border-radius-xl);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  padding: var(--spacing-2) 0;
  box-shadow: var(--shadow-sm);
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

/* 现代化悬停状态 */
.size-radio-button:hover .size-option-content {
  border-color: var(--primary-light);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05));
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.size-radio-button:hover .svg-rect {
  fill: var(--primary-light);
}

/* 现代化激活/选中状态 */
.size-radio-button.is-active .size-option-content {
  border-color: var(--primary-color);
  background: var(--primary-gradient);
  box-shadow: var(--shadow-primary);
  transform: translateY(-1px);
}

.size-radio-button.is-active .svg-rect {
  fill: white;
}

.size-radio-button.is-active .size-label {
  color: white;
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

/* 现代化参数卡片样式 */
.modern-parameter-card {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
  background: white;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideInUp 0.6s ease-out;
  margin-bottom: 1.5rem;
}

.modern-parameter-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* 最后一个卡片移除底边距 */
.modern-parameter-card-last {
  margin-bottom: 0;
}

.parameter-icon-modern {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--primary-color);
}

/* 现代化样式变量 */
.modern-parameter-card {
  --primary: #6366f1;
  --primary-foreground: #ffffff;
  --muted: #f1f5f9;
  --muted-foreground: #64748b;
  --accent: #f8fafc;
  --accent-foreground: #0f172a;
  --border: #e2e8f0;
  --input: #e2e8f0;
  --background: #ffffff;
  --foreground: #0f172a;
}

/* Element Plus 组件现代化定制 */
.modern-select :deep(.el-select__wrapper) {
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  background: var(--background);
  transition: all 0.2s;
}

.modern-select :deep(.el-select__wrapper:hover) {
  border-color: var(--primary);
}

.modern-select :deep(.el-select__wrapper.is-focused) {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

.modern-slider-custom :deep(.el-slider__runway) {
  background-color: #e2e8f0;
  border-radius: 9999px;
  height: 6px;
}

.modern-slider-custom :deep(.el-slider__bar) {
  background: var(--primary);
  border-radius: 9999px;
}

.modern-slider-custom :deep(.el-slider__button) {
  width: 18px;
  height: 18px;
  background: white;
  border: 3px solid var(--primary);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modern-slider-custom :deep(.el-slider__button:hover) {
  transform: scale(1.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.modern-slider-custom :deep(.el-slider__marks-text) {
  font-size: 0.75rem;
  color: var(--muted-foreground);
  font-weight: 500;
}

.modern-input :deep(.el-input__wrapper) {
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  background: var(--background);
  transition: all 0.2s;
}

.modern-input :deep(.el-input__wrapper:hover) {
  border-color: var(--primary);
}

.modern-input :deep(.el-input__wrapper.is-focus) {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

.modern-button-secondary {
  border: 1px solid var(--border);
  background: var(--background);
  color: var(--foreground);
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.modern-button-secondary:hover {
  background: var(--accent);
  border-color: var(--primary);
}

/* 文本样式 */
.text-foreground {
  color: var(--foreground);
}

.text-muted-foreground {
  color: var(--muted-foreground);
}

.bg-muted {
  background-color: var(--muted);
}

.bg-primary {
  background-color: var(--primary);
}

.text-white {
  color: white;
}

.bg-background {
  background-color: var(--background);
}

.bg-accent {
  background-color: var(--accent);
}

.text-accent-foreground {
  color: var(--accent-foreground);
}

.border-input {
  border-color: var(--input);
}

/* 间距工具类 */
.space-y-2 > * + * {
  margin-top: 0.5rem;
}

.space-y-3 > * + * {
  margin-top: 0.75rem;
}

.space-y-6 > * + * {
  margin-top: 1.5rem;
}

.gap-2 {
  gap: 0.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

/* 布局工具类 */
.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.grid {
  display: grid;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.w-full {
  width: 100%;
}

.flex-1 {
  flex: 1 1 0%;
}

/* 文字样式 */
.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}

.font-semibold {
  font-weight: 600;
}

.font-medium {
  font-weight: 500;
}

/* 圆角 */
.rounded {
  border-radius: 0.25rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

/* 内边距 */
.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

/* 阴影 */
.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* 过渡 */
.transition-all {
  transition-property: all;
}

.duration-200 {
  transition-duration: 200ms;
}

/* 现代化文本域样式 */
.modern-textarea :deep(.el-textarea__inner) {
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  background: var(--background);
  transition: all 0.2s;
  font-family: inherit;
  resize: vertical;
}

.modern-textarea :deep(.el-textarea__inner:hover) {
  border-color: var(--primary);
}

.modern-textarea :deep(.el-textarea__inner:focus) {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  outline: none;
}

/* 现代化图片上传器 */
.modern-image-uploader {
  width: 100%;
}

.modern-image-uploader :deep(.el-upload) {
  width: 100%;
  border: 2px dashed var(--border);
  border-radius: 0.75rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--background);
}

.modern-image-uploader :deep(.el-upload:hover) {
  border-color: var(--primary);
  background: rgba(99, 102, 241, 0.05);
}

.modern-upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 160px;
}

.upload-icon-modern {
  font-size: 2rem;
  color: var(--muted-foreground);
  margin-bottom: 0.5rem;
  transition: all 0.3s;
}

.modern-image-uploader :deep(.el-upload:hover) .upload-icon-modern {
  color: var(--primary);
  transform: scale(1.1);
}

.upload-text-modern {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--foreground);
  margin-bottom: 0.25rem;
}

.upload-hint-modern {
  font-size: 0.75rem;
  color: var(--muted-foreground);
}

.upload-tip-modern {
  font-size: 0.75rem;
  color: var(--muted-foreground);
  text-align: center;
  margin-top: 0.5rem;
  line-height: 1.4;
}

/* 现代化图片预览 */
.modern-image-preview {
  position: relative;
  width: 100%;
  height: 160px;
  border-radius: 0.75rem;
  overflow: hidden;
}

.uploaded-image-modern {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image-modern {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.remove-image-modern:hover {
  background: rgba(239, 68, 68, 0.8);
  transform: scale(1.1);
}

/* 动画类 */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 高度类 */
.h-12 {
  height: 3rem;
}

/* 尺寸预览样式 */
.size-preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  gap: 0.5rem;
}

.size-preview-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 2px solid var(--border);
  background: var(--background);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  min-height: 85px;
}

.size-preview-inactive {
  border-color: var(--border);
  color: var(--muted-foreground);
}

.size-preview-inactive:hover {
  border-color: var(--primary);
  background: rgba(99, 102, 241, 0.05);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
}

.size-preview-active {
  border-color: var(--primary);
  background: var(--primary);
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
}

.size-preview-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
}

.size-preview-box {
  border: 1.5px solid currentColor;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
}

.size-preview-active .size-preview-box {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.8);
}

.size-preview-inner {
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.size-preview-active .size-preview-inner {
  opacity: 0.9;
}

.size-preview-info {
  text-align: center;
  min-height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.size-preview-label {
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 0.0625rem;
}

.size-preview-ratio {
  font-size: 0.5625rem;
  opacity: 0.7;
  font-weight: 500;
}

.size-preview-active .size-preview-ratio {
  opacity: 0.9;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .size-preview-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .size-preview-card {
    padding: 0.75rem;
    min-height: 100px;
  }

  .size-preview-container {
    width: 50px;
    height: 50px;
  }
}
</style>

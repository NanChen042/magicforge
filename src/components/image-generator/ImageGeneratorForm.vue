<template>
  <!-- 
    修复点：
    1. 添加 shrink-0：防止在父级 Flex 布局中被右侧内容挤压导致宽度变窄
    2. 维持 w-full h-full：占满父组件分配的容器空间
  -->
  <div class="sidebar-root flex flex-col w-full h-full shrink-0 bg-[var(--bg-color)] border-r border-[var(--border-color)] text-[var(--text-main)] font-sans box-border">
    
    <!-- 1. 顶部固定区 -->
    <div class="shrink-0 flex justify-between items-center px-5 py-4 border-b border-[var(--surface-color)] bg-white/80 backdrop-blur-sm z-10">
      <div class="flex items-center gap-2 text-sm font-bold text-[var(--text-main)] tracking-wide">
        <div class="w-6 h-6 rounded-md bg-[#4E54C8]/10 flex items-center justify-center text-[var(--primary-color)]">
          <el-icon><Operation /></el-icon>
        </div>
        <span>配置参数</span>
      </div>
      
      <el-tooltip content="重置随机种子" placement="bottom">
        <button class="p-1 rounded bg-transparent text-[var(--text-secondary)] border-none cursor-pointer transition-colors duration-200 hover:bg-[var(--surface-color)] hover:text-[var(--primary-color)]" @click="$emit('randomize-seed')">
          <el-icon><Refresh /></el-icon>
        </button>
      </el-tooltip>
    </div>

    <!-- 2. 中间滚动区 -->
    <div class="flex-1 overflow-y-auto p-5 flex flex-col gap-6 custom-scrollbar w-full">
      
      <!-- 提示词 Prompt -->
      <section class="w-full">
        <div class="flex justify-between items-center mb-2">
          <label class="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-[0.5px]">提示词 (PROMPT)</label>
          <el-dropdown trigger="click" @command="applyTemplate">
            <span class="flex items-center gap-0.5 text-xs font-medium text-[var(--primary-color)] cursor-pointer">
              快速模板 <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="t in promptTemplates" :key="t.label" :command="t">{{ t.label }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        
        <div class="w-full">
          <el-input
            v-model="formData.prompt"
            type="textarea"
            :rows="5"
            resize="none"
            placeholder="描述您脑海中的画面..."
            class="sidebar-textarea w-full"
          />
        </div>

        <!-- 负面提示词 (折叠) -->
        <div class="mt-2 w-full">
          <el-collapse class="sidebar-collapse w-full" v-model="activeNames">
            <el-collapse-item name="negative">
              <template #title>
                <div class="flex items-center gap-1 text-[11px] text-[var(--text-secondary)]">
                  <el-icon><SemiSelect /></el-icon> 排除元素 (Negative)
                </div>
              </template>
              <el-input
                v-model="formData.negative_prompt"
                type="textarea"
                :rows="2"
                resize="none"
                placeholder="不需要出现的元素，如：模糊、低质量..."
                class="sidebar-textarea sm-textarea w-full"
              />
            </el-collapse-item>
          </el-collapse>
        </div>
      </section>

      <div class="h-px w-full bg-[var(--surface-color)]"></div>

   <!-- 画幅比例选择器 (Visual Aspect Ratio Selector) -->
<section class="space-y-3 w-full">
  
  <!-- 标题栏 -->
  <div class="flex items-center justify-between px-1">
    <label class="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
      画幅比例
      <!-- 这是一个小的提示 Tooltip -->
      <el-tooltip content="决定生成图片的形状" placement="top">
        <div class="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center text-[8px] text-slate-400 cursor-help">?</div>
      </el-tooltip>
    </label>
    <!-- 显示当前选中的值 -->
    <span class="text-[10px] font-mono font-medium text-[#4E54C8] bg-[#4E54C8]/5 px-1.5 py-0.5 rounded">
      {{ formData.image_size || '1:1' }}
    </span>
  </div>

  <!-- 比例网格 -->
  <div class="grid grid-cols-3 gap-2.5">
    <button
      v-for="(value, key) in imageSizeOptions"
      :key="key"
      @click="formData.image_size = value.value"
      class="group relative flex flex-col items-center justify-center gap-2 py-3 px-1 rounded-xl border transition-all duration-300"
      :class="[
        formData.image_size === value.value 
          ? 'bg-white border-[#4E54C8] shadow-md shadow-[#4E54C8]/10 ring-1 ring-[#4E54C8]/20' 
          : 'bg-[#f8f9fc] border-transparent hover:bg-white hover:border-slate-200 hover:shadow-sm hover:-translate-y-0.5'
      ]"
    >
      <!-- 动态图形容器 (固定 24x24 区域) -->
      <div class="w-8 h-8 flex items-center justify-center">
        <!-- 核心图形：根据比例动态计算宽高 -->
        <div 
          class="border-2 rounded-[2px] transition-all duration-300"
          :class="[
            formData.image_size === value.value 
              ? 'border-[#4E54C8] bg-[#4E54C8]/10' 
              : 'border-slate-300 bg-white group-hover:border-[#8F94FB]'
          ]"
          :style="getRatioPreviewStyle(value.ratio)"
        ></div>
      </div>

      <!-- 文字标签 -->
      <span 
        class="text-[10px] font-medium transition-colors"
        :class="formData.image_size === value.value ? 'text-[#4E54C8] font-bold' : 'text-slate-500 group-hover:text-slate-700'"
      >
        {{ value.ratio }}
      </span>

      <!-- 选中时的右上角角标 (可选装饰) -->
      <div v-if="formData.image_size === value.value" class="absolute top-1 right-1 w-1.5 h-1.5 bg-[#4E54C8] rounded-full"></div>
    </button>
  </div>

</section>


      <!-- 参数滑块组 -->
      <section class="w-full">
        <!-- 数量 -->
        <div class="flex flex-col gap-1.5 mb-4 w-full">
          <div class="flex justify-between text-xs text-[var(--text-secondary)]">
            <label>生成数量</label>
            <span class="font-mono bg-white/80 px-1.5 py-0.5 rounded">{{ formData.batch_size }}</span>
          </div>
          <el-slider v-model="formData.batch_size" :min="1" :max="4" :step="1" size="small" :show-tooltip="false" class="custom-slider w-full" />
        </div>

        <div class="bg-[var(--surface-color)] rounded-xl p-4 flex flex-col gap-4 w-full box-border">
          <!-- 创造性 -->
          <div class="flex flex-col gap-1.5">
            <div class="flex justify-between text-xs text-[var(--text-secondary)]">
              <label>创造性 (CFG)</label>
              <span class="font-mono bg-white/80 px-1.5 py-0.5 rounded font-semibold text-[var(--primary-color)]">{{ formData.guidance_scale }}</span>
            </div>
            <el-slider v-model="formData.guidance_scale" :min="1" :max="20" :step="0.5" size="small" class="custom-slider w-full" />
          </div>

          <!-- 步数 -->
          <div class="flex flex-col gap-1.5">
            <div class="flex justify-between text-xs text-[var(--text-secondary)]">
              <label>细节步数 (Steps)</label>
              <span class="font-mono bg-white/80 px-1.5 py-0.5 rounded font-semibold text-[var(--primary-color)]">{{ formData.num_inference_steps }}</span>
            </div>
            <el-slider v-model="formData.num_inference_steps" :min="10" :max="50" :step="1" size="small" class="custom-slider w-full" />
          </div>
        </div>
      </section>

      <!-- 参考图 -->
      <section class="w-full">
        <label class="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-[0.5px]">参考底图</label>
        <el-upload
          class="sidebar-uploader mt-2 w-full block"
          :show-file-list="false"
          :before-upload="beforeImageUpload"
          :http-request="handleCustomUpload"
          action="#"
        >
          <div v-if="imageUrl" class="group relative w-full h-[100px] rounded-lg overflow-hidden border border-[var(--border-color)] box-border">
            <img :src="imageUrl" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer text-white" @click.stop="removeImage">
              <el-icon><Delete /></el-icon>
            </div>
          </div>
          <div v-else class="w-full h-10 border border-dashed border-slate-300 rounded-lg flex items-center justify-center gap-2 text-xs text-[var(--text-secondary)] cursor-pointer transition-all duration-200 bg-[var(--surface-color)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] hover:bg-[#4E54C8]/[0.02] box-border">
            <el-icon><Plus /></el-icon>
            <span>上传图片</span>
          </div>
        </el-upload>
      </section>

    </div>

    <!-- 3. 底部固定区 -->
    <div class="shrink-0 p-5 border-t border-[var(--border-color)] bg-white w-full box-border">
      <button
        @click="$emit('generate')"
        :disabled="!formData.prompt || loading"
        class="relative w-full h-12 border-none rounded-3xl bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] text-white text-[15px] font-semibold cursor-pointer overflow-hidden transition-all duration-300 shadow-[0_4px_15px_rgba(78,84,200,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(78,84,200,0.4)] hover:brightness-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:grayscale-[0.5]"
        :class="{ 'is-loading': loading }"
      >
        <div class="relative z-[2] flex items-center justify-center gap-2">
          <el-icon v-if="loading" class="animate-spin"><Loading /></el-icon>
          <el-icon v-else><MagicStick /></el-icon>
          <span>{{ loading ? '正在绘制...' : '立即生成' }}</span>
        </div>
        <div class="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-[20deg] animate-[glow-anim_3s_infinite]" :class="{ hidden: loading }"></div>
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { 
  Operation, Refresh, MagicStick, Loading, ArrowDown, SemiSelect, Delete, Plus 
} from "@element-plus/icons-vue";
import { imageService } from "../../services/imageService";
import { imageSizeOptions, promptTemplates } from "../../constants/imageGeneratorConfig";
import type { FormData } from "../../composables/useImageGenerator";

// Props, Emits 和 Logic 保持不变
interface Props {
  formData: FormData;
  loading: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'generate'): void;
  (e: 'randomize-seed'): void;
}>();

const imageUrl = ref("");
const activeNames = ref([]);

const getRatioPercent = (ratioStr: string) => {
  const [w, h] = ratioStr.split(':').map(Number);
  if (!w || !h) return '50%';
  return `${(w / (w + h)) * 100}%`;
};

const applyTemplate = (template: any) => {
  props.formData.prompt = template.prompt;
  props.formData.negative_prompt = template.negative_prompt;
  if (template.parameters) {
    props.formData.guidance_scale = template.parameters.guidance_scale;
    props.formData.num_inference_steps = template.parameters.num_inference_steps;
  }
  ElMessage.success("已应用模板");
};

const handleCustomUpload = async (options: any) => {
  const { file } = options;
  try {
    const base64 = await imageService.fileToBase64(file);
    props.formData.image = base64;
    imageUrl.value = base64;
    ElMessage.success('参考图已加载');
  } catch (error) {
    ElMessage.error("图片处理失败");
  }
};

const beforeImageUpload = (file: File) => {
  return file.type.startsWith("image/") && file.size / 1024 / 1024 < 5;
};

const removeImage = () => {
  imageUrl.value = "";
  props.formData.image = undefined;
};

// 计算缩略图的 CSS 宽高，模拟真实比例
const getRatioPreviewStyle = (ratioStr: string) => {
  // 定义最大边界 (px)
  const MAX_SIZE = 24; 
  
  try {
    const [w, h] = ratioStr.split(':').map(Number);
    if (!w || !h) return { width: '20px', height: '20px' };
    
    // 算法：保持长边为 MAX_SIZE，短边按比例缩放
    let width, height;
    
    if (w > h) {
      // 宽图 (如 16:9)
      width = MAX_SIZE;
      height = Math.round((h / w) * MAX_SIZE);
    } else if (h > w) {
      // 长图 (如 9:16)
      height = MAX_SIZE;
      width = Math.round((w / h) * MAX_SIZE);
    } else {
      // 方图 (1:1) - 稍微做小一点点，视觉上更平衡
      width = 20;
      height = 20;
    }
    
    return {
      width: `${width}px`,
      height: `${height}px`
    };
  } catch (e) {
    return { width: '20px', height: '20px' };
  }
};

</script>
<style scoped>
/* 定义 CSS 变量供 Atomic CSS 引用 */
.sidebar-root {
  --primary-color: #4E54C8;
  --secondary-color: #8F94FB;
  --bg-color: #ffffff;
  --surface-color: #f8f9fc;
  --text-main: #2c3e50;
  --text-secondary: #64748b;
  --border-color: #edf2f7;
}

/* 
  ---------------------------
  Element Plus 深度样式覆盖
  ---------------------------
*/

/* Textarea 样式重写 */
:deep(.sidebar-textarea .el-textarea__inner) {
  background: var(--surface-color);
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 12px;
  font-size: 13px;
  color: var(--text-main);
  transition: all 0.3s ease;
  box-shadow: none !important;
  width: 100%; /* 确保输入框撑满 */
}

:deep(.sidebar-textarea .el-textarea__inner:hover) {
  background: #fff;
  box-shadow: 0 4px 12px rgba(78, 84, 200, 0.08) !important;
}

:deep(.sidebar-textarea .el-textarea__inner:focus) {
  background: #fff;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(78, 84, 200, 0.1) !important;
}

:deep(.sm-textarea .el-textarea__inner) {
  font-size: 12px;
  padding: 8px 12px;
}

/* Collapse 去除默认边框 */
:deep(.sidebar-collapse) {
  border: none;
  --el-collapse-header-bg-color: transparent;
  --el-collapse-content-bg-color: transparent;
}
:deep(.sidebar-collapse .el-collapse-item__header) {
  height: 32px;
  border: none;
  background: transparent;
}
:deep(.sidebar-collapse .el-collapse-item__wrap) {
  border: none;
  background: transparent;
}
:deep(.sidebar-collapse .el-collapse-item__content) {
  padding-bottom: 0;
}

/* Slider 定制 */
:deep(.custom-slider) {
  --el-slider-main-bg-color: var(--primary-color);
  --el-slider-runway-bg-color: #e0e0e0;
  --el-slider-button-size: 14px;
}

/* Upload 宽度修复 */
:deep(.sidebar-uploader .el-upload) {
  width: 100%;
  display: block;
}

/* 动画 & 滚动条 */
@keyframes glow-anim {
  0% { left: -100%; }
  20% { left: 200%; }
  100% { left: 200%; }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 4px;
}
</style>
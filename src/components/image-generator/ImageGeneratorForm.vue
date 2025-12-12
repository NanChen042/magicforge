<template>
  <!--
    主容器：
    h-full: 占满父级容器高度
    border-r: 右侧分割线
    bg-white: 基底
  -->
  <div class="flex flex-col w-full h-full bg-white border-r border-slate-200 font-sans text-slate-700 relative shrink-0">

<div class="shrink-0 h-[72px] flex items-center justify-between px-6 border-b border-slate-100 bg-gradient-to-r from-white via-slate-50/50 to-white z-20">
  
  <div class="flex items-center gap-4">
    <!-- 自定义元素：半透明的巨大编号 -->
    <div class="relative h-full flex items-center">
      <span class="text-3xl font-black text-slate-200/80 font-mono italic select-none -ml-1">JIA</span>
    </div>
    
    <div class="relative pl-4 border-l border-slate-200">
      <h2 class="text-[13px] font-bold text-slate-800 uppercase tracking-widest">
        Config
      </h2>
      <p class="text-[10px] text-slate-400 leading-tight mt-0.5">
        Image Synthesis
      </p>
    </div>
  </div>

  <!-- 右侧：圆形按钮 -->
  <button 
    class="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-indigo-500 hover:text-indigo-600 hover:shadow-md hover:shadow-indigo-500/10 transition-all duration-300 bg-white"
    @click="$emit('randomize-seed')"
  >
    <el-icon><Refresh /></el-icon>
  </button>

</div>


    <!-- ==========================================
         2. 滚动内容区 (Scrollable)
         ========================================== -->
    <div class="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6 w-full ">

      <!-- A. 提示词 (Prompt) -->
      <section class="space-y-3 group">
        <div class="flex justify-between items-end">
          <label class="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <span class="w-1 h-3 bg-[#4E54C8] rounded-full"></span>
            提示词
          </label>
          <el-dropdown trigger="click" @command="applyTemplate">
            <span class="text-[10px] font-medium text-[#4E54C8] bg-[#4E54C8]/5 px-2 py-1 rounded-full cursor-pointer hover:bg-[#4E54C8]/10 transition-colors flex items-center gap-1">
              <el-icon>
                <MagicStick />
              </el-icon> 灵感模板
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="t in promptTemplates" :key="t.label" :command="t">{{ t.label }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <div class="relative">
          <el-input v-model="formData.prompt" type="textarea" :rows="5" resize="none" placeholder="描述您脑海中的画面，例如：赛博朋克风格的街道，霓虹灯光，雨夜..." class="atomic-textarea transition-all duration-300" />
          <!-- 聚焦光晕装饰 -->
          <div class="absolute inset-0 rounded-xl border-2 border-[#4E54C8]/0 pointer-events-none transition-all duration-300 group-focus-within:border-[#4E54C8]/10 group-focus-within:shadow-[0_0_20px_rgba(78,84,200,0.1)]"></div>
        </div>

        <!-- 负面提示词 (折叠) -->
        <el-collapse v-model="activeNames" class="!border-none">
          <el-collapse-item name="negative" class="group/neg">
            <template #title>
              <div class="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 group-hover/neg:text-slate-600 transition-colors">
                <el-icon>
                  <CircleClose />
                </el-icon> 排除元素 (Negative Prompt)
              </div>
            </template>
            <el-input v-model="formData.negative_prompt" type="textarea" :rows="2" resize="none" placeholder="不需要出现的元素，如：模糊、低质量..." class="atomic-textarea-sm mt-1" />
          </el-collapse-item>
        </el-collapse>
      </section>

      <div class="w-full h-px bg-slate-100"></div>

      <!-- 外层容器：模拟设计工作台面板 -->
      <section class="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 p-5">

        <!-- 装饰：背景点阵纹理 (CSS 绘制) -->
        <div class="absolute inset-0 opacity-[0.4]" style="background-image: radial-gradient(#cbd5e1 1px, transparent 1px); background-size: 20px 20px;">
        </div>

        <!-- 头部：极简工业风 -->
        <div class="relative flex items-center justify-between mb-4 z-10">
          <div class="flex items-center gap-2">
            <div class="p-1.5 bg-white rounded-md shadow-sm border border-slate-100 text-indigo-500">
              <!-- 图标：画幅/裁剪 -->
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <label class="text-xs font-bold text-slate-700 uppercase tracking-widest">
              画幅比例
            </label>
          </div>
          <!-- 装饰性的小标签 -->
          <span class="text-[10px] text-slate-400 font-mono bg-slate-200/50 px-1.5 py-0.5 rounded">FIT</span>
        </div>

        <!-- 选项网格 -->
        <div class="relative z-10 grid grid-cols-3 gap-2">
          <button v-for="(value, key) in imageSizeOptions" :key="key" @click="formData.image_size = value.value" class="group relative flex flex-col items-center justify-center py-4 rounded-xl border transition-all duration-300" :class="[
            formData.image_size === value.value
              ? 'bg-white border-indigo-500/30 shadow-lg shadow-indigo-500/10 scale-[1.02]'
              : 'bg-slate-100/80 border-transparent hover:bg-white hover:border-slate-200 hover:shadow-sm'
          ]">
            <!-- 选中态的高级装饰：边框流光效果 (伪元素) -->
            <div v-if="formData.image_size === value.value" class="absolute inset-0 rounded-xl border-2 border-indigo-500/10 pointer-events-none"></div>

            <!-- 取景框四角装饰 (仅在 Hover 或 选中时出现) -->
            <div class="absolute inset-1.5 pointer-events-none transition-opacity duration-300" :class="formData.image_size === value.value || 'group-hover:opacity-100' ? 'opacity-100' : 'opacity-0'">
              <span class="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-slate-300 transition-colors" :class="formData.image_size === value.value ? 'border-indigo-400' : ''"></span>
              <span class="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-slate-300 transition-colors" :class="formData.image_size === value.value ? 'border-indigo-400' : ''"></span>
              <span class="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-slate-300 transition-colors" :class="formData.image_size === value.value ? 'border-indigo-400' : ''"></span>
              <span class="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-slate-300 transition-colors" :class="formData.image_size === value.value ? 'border-indigo-400' : ''"></span>
            </div>

            <!-- 核心预览图形 -->
            <div class="w-10 h-10 flex items-center justify-center mb-2">
              <div class="transition-all duration-500 ease-out border shadow-sm relative overflow-hidden" :class="[
                formData.image_size === value.value
                  ? 'bg-indigo-50 border-indigo-500'
                  : 'bg-white border-slate-300 group-hover:border-slate-400'
              ]" :style="getRatioPreviewStyle(value.ratio)">
                <!-- 选中时内部增加一道扫光 -->
                <div v-if="formData.image_size === value.value" class="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent"></div>
              </div>
            </div>

            <!-- 文字：使用等宽字体增加数据感 -->
            <span class="text-[11px] font-mono font-medium tracking-tight transition-colors" :class="formData.image_size === value.value ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'">
              {{ value.ratio }}
            </span>

          </button>
        </div>
      </section>

      <!-- C. 高级参数 (Control Panel) -->
      <section class="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-5">
        <!-- 数量 -->
        <div class="space-y-2">
          <div class="flex justify-between items-center text-[11px] font-medium text-slate-500">
            <span>生成数量</span>
            <span class="bg-white px-2 py-0.5 rounded text-[#4E54C8] font-bold shadow-sm">{{ formData.batch_size }}</span>
          </div>
          <el-slider v-model="formData.batch_size" :min="1" :max="4" :step="1" size="small" :show-tooltip="false" class="atomic-slider" />
        </div>

        <!-- 创造性 -->
        <div class="space-y-2">
          <div class="flex justify-between items-center text-[11px] font-medium text-slate-500">
            <span>创造性 (CFG Scale)</span>
            <span class="bg-white px-2 py-0.5 rounded text-[#4E54C8] font-bold shadow-sm">{{ formData.guidance_scale }}</span>
          </div>
          <el-slider v-model="formData.guidance_scale" :min="1" :max="20" :step="0.5" size="small" class="atomic-slider" />
        </div>

        <!-- 步数 -->
        <div class="space-y-2">
          <div class="flex justify-between items-center text-[11px] font-medium text-slate-500">
            <span>细节步数 (Steps)</span>
            <span class="bg-white px-2 py-0.5 rounded text-[#4E54C8] font-bold shadow-sm">{{ formData.num_inference_steps }}</span>
          </div>
          <el-slider v-model="formData.num_inference_steps" :min="10" :max="50" :step="1" size="small" class="atomic-slider" />
        </div>
      </section>

      <!-- D. 参考底图 (Image Upload) -->
      <section class="space-y-3 pb-4">
        <label class="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
          <span class="w-1 h-3 bg-slate-300 rounded-full"></span>
          参考底图
        </label>

        <el-upload class="w-full group" :show-file-list="false" :before-upload="beforeImageUpload" :http-request="handleCustomUpload" action="#" drag>
          <!-- 状态：已上传 -->
          <div v-if="imageUrl" class="relative w-full h-32 rounded-xl overflow-hidden border border-slate-200 group-hover:border-[#4E54C8]/50 transition-all">
            <img :src="imageUrl" class="w-full h-full object-cover" />
            <!-- 遮罩操作层 -->
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-[2px]" @click.stop>
              <span class="text-white text-xs font-medium">Image Loaded</span>
              <button class="px-3 py-1 bg-white/20 hover:bg-red-500/80 text-white rounded-full text-[10px] backdrop-blur-md transition-colors flex items-center gap-1" @click.stop="removeImage">
                <el-icon>
                  <Delete />
                </el-icon> 移除
              </button>
            </div>
          </div>

          <!-- 状态：未上传 -->
          <div v-else class="w-full h-24 border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center gap-2 bg-slate-50/50 hover:bg-[#4E54C8]/5 hover:border-[#4E54C8] transition-all duration-300">
            <div class="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-[#4E54C8] group-hover:scale-110 transition-all">
              <el-icon class="text-lg">
                <Plus />
              </el-icon>
            </div>
            <span class="text-xs text-slate-400 group-hover:text-[#4E54C8] font-medium">点击或拖拽上传</span>
          </div>
        </el-upload>
      </section>

    </div>

    <!-- ==========================================
         3. 底部操作区 (Fixed Footer)
         ========================================== -->
    <div class="shrink-0 p-5 bg-white border-t border-slate-100 z-20 w-full">
      <button @click="$emit('generate')" :disabled="!formData.prompt || loading" class="group relative w-full h-12 rounded-full overflow-hidden transition-all duration-300 shadow-lg shadow-[#4E54C8]/30 hover:shadow-[#4E54C8]/50 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none">
        <!-- 渐变背景 -->
        <div class="absolute inset-0 bg-gradient-to-r from-[#4E54C8] to-[#8F94FB]"></div>

        <!-- 动态流光 -->
        <div v-if="!loading" class="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-20deg] -translate-x-[150%] group-hover:animate-shine"></div>

        <!-- 按钮内容 -->
        <div class="relative flex items-center justify-center gap-2 text-white font-bold tracking-wide text-sm">
          <el-icon v-if="loading" class="animate-spin text-lg">
            <Loading />
          </el-icon>
          <el-icon v-else class="text-lg group-hover:rotate-12 transition-transform">
            <MagicStick />
          </el-icon>
          <span>{{ loading ? '正在绘制中...' : '立即生成' }}</span>
        </div>
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import {
  Operation, Refresh, MagicStick, Loading, ArrowDown,
  CircleClose, Delete, Plus
} from "@element-plus/icons-vue";
import { imageService } from "../../services/imageService";
import { imageSizeOptions, promptTemplates } from "../../constants/imageGeneratorConfig";
import type { FormData } from "../../composables/useImageGenerator";

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

const applyTemplate = (template: any) => {
  props.formData.prompt = template.prompt;
  props.formData.negative_prompt = template.negative_prompt;
  if (template.parameters) {
    props.formData.guidance_scale = template.parameters.guidance_scale;
    props.formData.num_inference_steps = template.parameters.num_inference_steps;
  }
  ElMessage.success("已应用模板");
};

// ... 其他上传逻辑保持不变 ...
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

const getRatioPreviewStyle = (ratioStr) => {
  const [w, h] = ratioStr.split(':').map(Number);
  const maxDim = 24;
  // 这里的逻辑保持不变，确保图形比例正确
  if (w > h) {
    return { width: `${maxDim}px`, height: `${maxDim * (h / w)}px`, borderRadius: '2px' };
  } else {
    return { width: `${maxDim * (w / h)}px`, height: `${maxDim}px`, borderRadius: '2px' };
  }
};

</script>

<style scoped>
/* 
  ---------------------------
  Atomic Style Overrides 
  ---------------------------
*/

/* 1. 深度定制 Textarea */
:deep(.atomic-textarea .el-textarea__inner) {
  background-color: #f8f9fc;
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 14px;
  font-size: 13px;
  color: #334155;
  transition: all 0.3s ease;
  box-shadow: none !important;
}

:deep(.atomic-textarea .el-textarea__inner:hover) {
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
}

:deep(.atomic-textarea .el-textarea__inner:focus) {
  background-color: #fff;
  border-color: #4E54C8;
}

/* 2. 负面提示词小号输入框 */
:deep(.atomic-textarea-sm .el-textarea__inner) {
  background-color: #fff;
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 12px;
  transition: all 0.3s;
}

:deep(.atomic-textarea-sm .el-textarea__inner:focus) {
  border-color: #94a3b8;
  border-style: solid;
}

/* 3. 折叠面板去边框 */
:deep(.el-collapse),
:deep(.el-collapse-item__header),
:deep(.el-collapse-item__wrap) {
  border: none;
  background: transparent;
}

:deep(.el-collapse-item__header) {
  height: 28px;
}

:deep(.el-collapse-item__content) {
  padding-bottom: 0;
}

/* 4. 滑块定制 */
:deep(.atomic-slider) {
  --el-slider-main-bg-color: #4E54C8;
  --el-slider-runway-bg-color: #e2e8f0;
  --el-slider-button-size: 14px;
}

:deep(.el-slider__button) {
  border: 2px solid #4E54C8;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 5. 上传控件宽度修复 */
:deep(.el-upload),
:deep(.el-upload-dragger) {
  width: 100%;
  border: none;
  /* 移除 dragger 默认边框，使用外层 div 控制 */
  background: transparent;
  padding: 0;
  height: auto;
}

/* 6. 滚动条 */
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

/* 7. 按钮流光动画 */
@keyframes shine {
  100% {
    left: 125%;
  }
}

.animate-shine {
  animation: shine 2s infinite;
}
</style>

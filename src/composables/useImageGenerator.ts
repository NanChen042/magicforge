import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { imageService, ImageSize, type ImageGenerationResponse } from "../services/imageService";
import { errorMessageMap } from "../constants/imageGeneratorConfig";

export interface FormData {
  prompt: string;
  negative_prompt: string;
  image_size: ImageSize | string;
  batch_size: number;
  num_inference_steps: number;
  guidance_scale: number;
  seed: number | undefined;
  image: string | undefined;
}

export function useImageGenerator() {
  // 表单数据
  const formData = reactive<FormData>({
    prompt: "",
    negative_prompt: "",
    image_size: ImageSize.Square,
    batch_size: 1,
    num_inference_steps: 20,
    guidance_scale: 7.5,
    seed: undefined,
    image: undefined,
  });

  // 状态
  const loading = ref(false);
  const generatedImages = ref<{ url: string }[]>([]);
  const lastSeed = ref<number | null>(null);
  const generationTime = ref<number | null>(null);
  const progress = ref(0);
  const estimatedTime = ref(20);
  let progressTimer: number | null = null;

  // 启动进度模拟
  const startProgressTimer = () => {
    progress.value = 0;
    estimatedTime.value = 20;

    progressTimer = window.setInterval(() => {
      if (progress.value < 99) {
        const increment = Math.floor(Math.random() * 5) + 1;
        progress.value = Math.min(99, progress.value + increment);
        const remainingProgress = 100 - progress.value;
        estimatedTime.value = Math.max(1, Math.round(remainingProgress / 5));
      }
    }, 800);
  };

  // 停止进度定时器
  const stopProgressTimer = () => {
    if (progressTimer !== null) {
      clearInterval(progressTimer);
      progressTimer = null;
    }
  };

  // 生成图片
  const generateImage = async () => {
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
      generationTime.value = parseFloat(((endTime - startTime) / 1000).toFixed(1));

      generatedImages.value = result.images;
      lastSeed.value = result.seed;
      progress.value = 100;

      ElMessage.success("图片生成成功");
    } catch (error: any) {
      progress.value = 0;

      let errorMessage = error.message || "未知错误";
      let errorCode = "";

      try {
        if (typeof errorMessage === 'string' && errorMessage.includes('{')) {
          const errorObj = JSON.parse(errorMessage.substring(errorMessage.indexOf('{')));
          errorCode = errorObj.code?.toString() || "";
          errorMessage = errorObj.message || errorMessage;
        }
      } catch (e) {
        console.error("Error parsing error message:", e);
      }

      if (errorCode && errorMessageMap[errorCode]) {
        ElMessage.error(errorMessageMap[errorCode]);
      } else {
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
      stopProgressTimer();
      setTimeout(() => {
        loading.value = false;
      }, 500);
    }
  };

  // 随机化种子
  const randomizeSeed = () => {
    formData.seed = Math.floor(Math.random() * 1000000000);
  };

  // 使用相同参数和种子重新生成
  const regenerateWithSeed = async (seed: number | null): Promise<void> => {
    if (seed === null) return;
    formData.seed = seed;
    await generateImage();
  };

  // 清理函数
  const cleanup = () => {
    stopProgressTimer();
  };

  return {
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
  };
}

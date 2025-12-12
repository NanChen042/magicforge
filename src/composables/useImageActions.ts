import { ref } from "vue";
import { ElMessage } from "element-plus";

export function useImageActions() {
  const previewVisible = ref<boolean>(false);
  const previewImage = ref<string>("");
  const previewTitle = ref<string>("");

  // 显示图片预览
  const showPreview = (image: string, seed: number | null): void => {
    previewImage.value = image;
    previewVisible.value = true;
    previewTitle.value = `生成图片 (种子: ${seed || "随机"})`;
  };

  // 下载图片
  const downloadImage = (url: string, seed: number | null, index: number) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `generated-image-${seed || Date.now()}-${index}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // 下载当前预览的图片
  const downloadCurrentPreview = (seed: number | null) => {
    if (!previewImage.value) return;
    const a = document.createElement("a");
    a.href = previewImage.value;
    a.download = `generated-image-${seed || Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    ElMessage.success("图片下载已开始");
  };

  // 复制种子到剪贴板
  const copySeedToClipboard = async (seed: number | null) => {
    if (seed === null) return;

    try {
      await navigator.clipboard.writeText(seed.toString());
      ElMessage.success(`已复制种子(${seed})到剪贴板`);
    } catch (err) {
      // 降级方案
      const textArea = document.createElement("textarea");
      textArea.value = seed.toString();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      ElMessage.success(`已复制种子(${seed})到剪贴板`);
    }
  };

  // 使用当前种子
  const useSeed = (seed: number | null, formData: any) => {
    if (seed !== null) {
      formData.seed = seed;
      ElMessage.success(`已设置种子: ${seed}`);
    }
  };

  // 使用当前种子并关闭预览
  const useCurrentSeedAndClose = (seed: number | null, formData: any) => {
    if (seed !== null) {
      formData.seed = seed;
      ElMessage.success(`已设置种子: ${seed}`);
      previewVisible.value = false;
    }
  };

  return {
    previewVisible,
    previewImage,
    previewTitle,
    showPreview,
    downloadImage,
    downloadCurrentPreview,
    copySeedToClipboard,
    useSeed,
    useCurrentSeedAndClose,
  };
}

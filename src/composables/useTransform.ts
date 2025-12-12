import { ref } from 'vue';
import keywordTransformService, { type TransformResult } from '@/services/keywordTransformService';

/**
 * 关键词转换管理
 */
export function useTransform() {
  const showTransformModal = ref(false);
  const isTransforming = ref(false);
  const transformResult = ref<TransformResult | null>(null);
  const selectedTransformMode = ref<'dialogue' | 'professional' | 'creative' | 'analytical'>('dialogue');

  /**
   * 执行关键词转换
   */
  const performTransform = async (
    userInput: string,
    apiKey: string,
    apiUrl: string,
    modelName: string
  ) => {
    if (!userInput.trim() || isTransforming.value) return;

    if (!apiKey || !apiUrl) {
      console.error('转换失败: API Key 或 API URL 未配置');
      alert('请先配置 API Key 和 API URL');
      return;
    }

    isTransforming.value = true;
    try {
      console.log('开始关键词转换:', {
        query: userInput,
        mode: selectedTransformMode.value,
        apiUrl,
        model: modelName
      });

      const result = await keywordTransformService.transformKeywords(userInput, {
        mode: selectedTransformMode.value,
        apiKey,
        apiUrl,
        model: modelName
      });

      transformResult.value = result;
      console.log('关键词转换完成:', result);
    } catch (error: any) {
      console.error('转换失败:', error);

      let errorMessage = '关键词转换失败: ';
      if (error.message) {
        errorMessage += error.message;
      } else if (error.response?.data?.error?.message) {
        errorMessage += error.response.data.error.message;
      } else {
        errorMessage += '未知错误';
      }

      alert(errorMessage);
    } finally {
      isTransforming.value = false;
    }
  };

  /**
   * 应用转换结果
   */
  const applyTransform = () => {
    if (transformResult.value) {
      const text = transformResult.value.transformedText;
      showTransformModal.value = false;
      transformResult.value = null;
      return text;
    }
    return null;
  };

  /**
   * 打开转换模态框
   */
  const openTransformModal = () => {
    showTransformModal.value = true;
  };

  /**
   * 关闭转换模态框
   */
  const closeTransformModal = () => {
    showTransformModal.value = false;
    transformResult.value = null;
  };

  return {
    showTransformModal,
    isTransforming,
    transformResult,
    selectedTransformMode,
    performTransform,
    applyTransform,
    openTransformModal,
    closeTransformModal
  };
}

/**
 * 模型类型定义
 */
export type ModelType = 'chat' | 'reasoning' | 'multimodal' | 'ocr' | 'translate' | 'coder';

/**
 * 模型配置接口
 */
export interface ModelConfig {
  id: string;           // 模型 ID，用于 API 调用
  name: string;         // 显示名称
  type: ModelType;      // 模型类型
  description: string;  // 简短描述
  free: boolean;        // 是否免费
  provider: string;     // 提供商
}

/**
 * SiliconFlow 免费模型配置列表 (2026年1月更新)
 */
export const MODEL_CONFIGS: ModelConfig[] = [
  // ========== 对话型模型 ==========
  {
    id: 'Qwen/Qwen2.5-7B-Instruct',
    name: 'Qwen2.5 7B',
    type: 'chat',
    description: '通用对话，响应快速',
    free: true,
    provider: 'Qwen'
  },
  {
    id: 'Qwen/Qwen2-7B-Instruct',
    name: 'Qwen2 7B',
    type: 'chat',
    description: '稳定可靠的对话模型',
    free: true,
    provider: 'Qwen'
  },
  {
    id: 'THUDM/glm-4-9b-chat',
    name: 'GLM-4 9B Chat',
    type: 'chat',
    description: '智谱 AI 对话模型，128K上下文',
    free: true,
    provider: 'GLM'
  },
  {
    id: 'THUDM/GLM-4-9B-0414',
    name: 'GLM-4 9B 0414',
    type: 'chat',
    description: '智谱最新版，支持工具调用',
    free: true,
    provider: 'GLM'
  },
  {
    id: 'internlm/internlm2_5-7b-chat',
    name: 'InternLM2.5 7B',
    type: 'chat',
    description: '书生·浦语，中英双语',
    free: true,
    provider: 'InternLM'
  },

  // ========== 思考型模型 ==========
  {
    id: 'Qwen/Qwen3-8B',
    name: 'Qwen3 8B',
    type: 'reasoning',
    description: '支持深度思考推理',
    free: true,
    provider: 'Qwen'
  },
  {
    id: 'deepseek-ai/DeepSeek-R1-0528-Qwen3-8B',
    name: 'DeepSeek-R1 Qwen3 8B',
    type: 'reasoning',
    description: 'R1蒸馏版，SOTA推理性能',
    free: true,
    provider: 'DeepSeek'
  },
  {
    id: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
    name: 'DeepSeek-R1 Distill 7B',
    type: 'reasoning',
    description: 'R1蒸馏版，数学编程强',
    free: true,
    provider: 'DeepSeek'
  },
  {
    id: 'THUDM/GLM-Z1-9B-0414',
    name: 'GLM-Z1 9B',
    type: 'reasoning',
    description: '智谱推理模型，数学能力强',
    free: true,
    provider: 'GLM'
  },

  // ========== 多模态模型 ==========
  {
    id: 'THUDM/GLM-4.1V-9B-Thinking',
    name: 'GLM-4.1V 9B Thinking',
    type: 'multimodal',
    description: '视觉推理，支持4K图像',
    free: true,
    provider: 'GLM'
  },

  // ========== 代码模型 ==========
  {
    id: 'Qwen/Qwen2.5-Coder-7B-Instruct',
    name: 'Qwen2.5 Coder 7B',
    type: 'coder',
    description: '代码生成与修复',
    free: true,
    provider: 'Qwen'
  },

  // ========== OCR 模型 ==========
  {
    id: 'deepseek-ai/DeepSeek-OCR',
    name: 'DeepSeek OCR',
    type: 'ocr',
    description: '文档识别转 Markdown（限免）',
    free: true,
    provider: 'DeepSeek'
  },

  // ========== 翻译模型 ==========
  {
    id: 'tencent/Hunyuan-MT-7B',
    name: '混元翻译 7B',
    type: 'translate',
    description: '33语种互译，WMT25冠军（限免）',
    free: true,
    provider: 'Tencent'
  }
];

/**
 * 默认模型 ID
 */
export const DEFAULT_MODEL_ID = 'Qwen/Qwen2.5-7B-Instruct';

/**
 * 默认 API 地址
 */
export const DEFAULT_API_URL = 'https://api.siliconflow.cn/v1';

/**
 * 根据模型 ID 获取模型配置
 */
export function getModelConfig(modelId: string): ModelConfig | undefined {
  return MODEL_CONFIGS.find(m => m.id === modelId);
}

/**
 * 判断模型是否支持思考过程
 */
export function isReasoningModel(modelId: string): boolean {
  const config = getModelConfig(modelId);
  return config?.type === 'reasoning';
}

/**
 * 判断模型是否支持多模态
 */
export function isMultimodalModel(modelId: string): boolean {
  const config = getModelConfig(modelId);
  return config?.type === 'multimodal';
}

/**
 * 判断模型是否支持视觉输入（图片）
 */
export function supportsVision(modelId: string): boolean {
  const config = getModelConfig(modelId);
  // multimodal 类型的模型支持视觉输入
  return config?.type === 'multimodal';
}

/**
 * 获取模型类型标签
 */
export function getModelTypeLabel(type: ModelType): string {
  const labels: Record<ModelType, string> = {
    chat: '对话',
    reasoning: '思考',
    multimodal: '多模态',
    ocr: 'OCR',
    translate: '翻译',
    coder: '代码'
  };
  return labels[type];
}

/**
 * 获取模型类型颜色
 */
export function getModelTypeColor(type: ModelType): string {
  const colors: Record<ModelType, string> = {
    chat: 'bg-blue-100 text-blue-700',
    reasoning: 'bg-purple-100 text-purple-700',
    multimodal: 'bg-emerald-100 text-emerald-700',
    ocr: 'bg-orange-100 text-orange-700',
    translate: 'bg-cyan-100 text-cyan-700',
    coder: 'bg-pink-100 text-pink-700'
  };
  return colors[type];
}

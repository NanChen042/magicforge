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
  capabilities?: {      // 模型支持的参数能力
    temperature?: boolean;
    topP?: boolean;
    topK?: boolean;
    frequencyPenalty?: boolean;
    presencePenalty?: boolean;
  };
}

/**
 * SiliconFlow 免费模型配置列表 (2026年1月更新)
 */
export const MODEL_CONFIGS: ModelConfig[] = [
  // ========== 对话型模型 ==========
  {
    id: 'deepseek-ai/DeepSeek-V3',
    name: 'DeepSeek V3',
    type: 'chat',
    description: 'DeepSeek 满血版旗舰对话模型 (671B)',
    free: false,
    provider: 'DeepSeek',
    capabilities: { temperature: true, topP: true, topK: false, frequencyPenalty: true, presencePenalty: true }
  },
  {
    id: 'Qwen/Qwen2.5-7B-Instruct',
    name: 'Qwen2.5 7B',
    type: 'chat',
    description: '通义千问 2.5 7B，通用对话全免费',
    free: true,
    provider: 'Qwen'
  },
  {
    id: 'THUDM/glm-4-9b-chat',
    name: 'GLM-4 9B Chat',
    type: 'chat',
    description: '智谱 GLM-4 9B 对话模型，128K 上下文',
    free: true,
    provider: 'GLM'
  },
  {
    id: 'internlm/internlm2_5-7b-chat',
    name: 'InternLM2.5 7B',
    type: 'chat',
    description: '书生·浦语 2.5 7B 中英双语免费模型',
    free: true,
    provider: 'InternLM'
  },

  // ========== 思考型推理模型 ==========
  {
    id: 'deepseek-ai/DeepSeek-R1',
    name: 'DeepSeek R1',
    type: 'reasoning',
    description: 'DeepSeek 满血版 R1 深度逻辑推理模型',
    free: false,
    provider: 'DeepSeek',
    capabilities: { temperature: true, topP: true, topK: false, frequencyPenalty: true, presencePenalty: true }
  },
  {
    id: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
    name: 'DeepSeek R1 Distill 7B',
    type: 'reasoning',
    description: 'R1 蒸馏 Qwen 7B，极速免费逻辑推理',
    free: true,
    provider: 'DeepSeek'
  },
  {
    id: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B',
    name: 'DeepSeek R1 Distill 1.5B',
    type: 'reasoning',
    description: 'R1 蒸馏轻量模型，超高吞吐低延迟',
    free: true,
    provider: 'DeepSeek'
  },

  // ========== 代码与专精模型 ==========
  {
    id: 'Qwen/Qwen2.5-Coder-7B-Instruct',
    name: 'Qwen2.5 Coder 7B',
    type: 'coder',
    description: '通义千问代码生成与 Bug 修复模型',
    free: true,
    provider: 'Qwen'
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
 * 获取模型配置参数支持能力（默认全部支持）
 */
export function getModelCapabilities(modelId: string) {
  const config = getModelConfig(modelId);
  const defaultCaps = {
    temperature: true,
    topP: false,
    topK: false,
    frequencyPenalty: false,
    presencePenalty: false
  };
  return config?.capabilities ? { ...defaultCaps, ...config.capabilities } : defaultCaps;
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

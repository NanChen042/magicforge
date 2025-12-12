import { ImageSize } from "../services/imageService";

// 图片尺寸选项
export const imageSizeOptions = {
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
export const promptTemplates = [
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

// 参数预设
export const parameterPresets = [
  { label: "快速生成", value: { num_inference_steps: 20, guidance_scale: 7.0 } },
  { label: "标准质量", value: { num_inference_steps: 30, guidance_scale: 7.5 } },
  { label: "高质量", value: { num_inference_steps: 50, guidance_scale: 8.0 } },
];

// 预设图标映射
export const presetIconMap: Record<string, string> = {
  '快速生成': '⚡',
  '标准质量': '⚖️',
  '高质量': '💎'
};

// 错误消息映射
export const errorMessageMap: Record<string, string> = {
  "network error": "网络连接错误，请检查您的网络连接",
  "timeout": "请求超时，服务器可能繁忙，请稍后再试",
  "server error": "服务器错误，请联系管理员",
  "invalid_api_key": "API密钥无效，请检查您的设置",
  "invalid_prompt": "提示词格式错误，请修改后重试",
  "content_policy_violation": "提示词内容不符合使用政策，请修改后重试",
  "20015": "推理步骤必须小于或等于50",
};

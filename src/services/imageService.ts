import axios from 'axios'
import { ElMessage } from 'element-plus'

// API 配置
const API_CONFIG = {
  baseURL: 'https://api.siliconflow.cn/v1',
  apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY || 'sk-etybbrewlaafxjjqtlgfeqaaskzrmryfndjtjjecyixbsznw'
}

// 添加调试信息
console.log('Image API Key configured:', !!API_CONFIG.apiKey)
console.log('Image API Base URL:', API_CONFIG.baseURL)

// Image service for handling image generation operations

// 图片尺寸枚举
export enum ImageSize {
  Square = '1024x1024',
  Portrait = '960x1280',
  Small = '768x1024',
  Tall = '720x1440',
  Medium = '720x1280',
  Wide = '1536x1024',
  Widescreen = '2048x1152'
}

export interface ImageGenerationParams {
  prompt: string;
  negative_prompt?: string;
  image_size: ImageSize | string;
  batch_size: number;
  num_inference_steps: number;
  guidance_scale: number;
  seed?: number;
  image?: string;
}

export interface ImageGenerationResponse {
  images: Array<{ url: string }>;
  seed: number;
  timings?: {
    total_time: number;
  }
}

// 图片生成请求接口
export interface ImageGenerationRequest {
  model: string
  prompt: string
  image_size: string
  batch_size: number
  num_inference_steps: number
  guidance_scale: number
  negative_prompt?: string
  seed?: number
  image?: string // Base64格式的图片
}

// 默认请求配置
const DEFAULT_IMAGE_CONFIG: ImageGenerationRequest = {
  model: 'Kwai-Kolors/Kolors',
  prompt: 'an island near sea, with seagulls, moon shining over the sea, light house, boats int he background, fish flying over the sea',
  image_size: ImageSize.Square as string,
  batch_size: 1,
  num_inference_steps: 20,
  guidance_scale: 7.5
}

/**
 * 图片生成服务类
 */
class ImageGenerationService {
  /**
   * 生成图片
   * @param params 图片生成参数
   * @returns
   */
  async generateImage(params: ImageGenerationParams): Promise<ImageGenerationResponse> {
    try {
      const requestBody: ImageGenerationRequest = {
        model: 'Kwai-Kolors/Kolors',
        prompt: params.prompt,
        image_size: params.image_size,
        batch_size: params.batch_size,
        num_inference_steps: params.num_inference_steps,
        guidance_scale: params.guidance_scale
      }

      if (params.negative_prompt) {
        requestBody.negative_prompt = params.negative_prompt;
      }

      if (params.seed !== undefined) {
        requestBody.seed = params.seed;
      }

      if (params.image) {
        requestBody.image = params.image;
      }

      console.log('Sending image generation request:', {
        ...requestBody,
        image: requestBody.image ? '[BASE64_DATA]' : undefined // 不在日志中显示完整base64
      })

      // 检查API密钥
      if (!API_CONFIG.apiKey) {
        console.error('API Key not configured')
        throw new Error('API密钥未配置，请检查环境变量')
      }

      const response = await axios.post<ImageGenerationResponse>(
        `${API_CONFIG.baseURL}/images/generations`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_CONFIG.apiKey}`
          }
        }
      )

      console.log('Image generation response:', response.data)
      return response.data
    } catch (error: any) {
      console.error('Image generation error:', error.response?.data || error.message || error)
      throw new Error(error.response?.data?.error?.message || '图片生成服务出错了')
    }
  }

  /**
   * 将本地图片转换为Base64格式
   * @param file 图片文件
   * @returns Base64字符串
   */
  async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }
}

// 导出服务实例
export const imageService = new ImageGenerationService()

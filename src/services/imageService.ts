import { useApiStore } from '@/stores/api'
import { SiliconFlowClient } from './siliconFlowClient'

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
  model: string;
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
  timings?: { total_time: number };
}

export interface ImageGenerationRequest {
  model: string;
  prompt: string;
  image_size: string;
  batch_size: number;
  num_inference_steps: number;
  guidance_scale: number;
  negative_prompt?: string;
  seed?: number;
  image?: string;
}

class ImageGenerationService {
  async generateImage(params: ImageGenerationParams): Promise<ImageGenerationResponse> {
    const requestBody: ImageGenerationRequest = {
      model: params.model,
      prompt: params.prompt,
      image_size: params.image_size,
      batch_size: params.batch_size,
      num_inference_steps: params.num_inference_steps,
      guidance_scale: params.guidance_scale,
      ...(params.negative_prompt ? { negative_prompt: params.negative_prompt } : {}),
      ...(params.seed !== undefined ? { seed: params.seed } : {}),
      ...(params.image ? { image: params.image } : {})
    };

    const apiStore = useApiStore();
    const client = new SiliconFlowClient({ apiUrl: apiStore.apiUrl, apiKey: apiStore.apiKey });
    return client.generateImage<ImageGenerationResponse>(requestBody);
  }

  async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
    });
  }
}

export const imageService = new ImageGenerationService();

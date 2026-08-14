export interface SiliconFlowModel {
  id: string;
  object?: string;
  owned_by?: string;
}

export function isImageModel(modelId: string) {
  return /(image|kolors|flux|stable-diffusion|wanx|z-image|playground)/i.test(modelId);
}

export function isAudioModel(modelId: string) {
  return /(audio|cosyvoice|fish-speech|speech|sensevoice|telespeech|whisper)/i.test(modelId);
}

export interface SiliconFlowConnection {
  apiUrl: string;
  apiKey: string;
}

export interface SpeechRequest {
  model: string;
  input: string;
  voice: string;
  response_format?: 'mp3' | 'wav' | 'pcm' | 'opus' | string;
  sample_rate?: number;
  speed?: number;
  gain?: number;
}

function normalizeBaseUrl(url: string) {
  const cleanUrl = url.trim().replace(/\/$/, '');
  if (!cleanUrl) return 'https://api.siliconflow.cn/v1';

  // Older screens allowed a full endpoint; resource paths must be built from the API root.
  return cleanUrl.replace(/\/(chat\/completions|images\/generations|audio\/(speech|transcriptions)|models)$/i, '');
}

async function readError(response: Response) {
  const text = await response.text();
  if (!text) return `API 请求失败: ${response.status} ${response.statusText}`;

  try {
    const data = JSON.parse(text) as any;
    if (data.error?.message) return data.error.message;
    if (data.message) return data.message;
    if (data.detail) return typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail);
    return `API 错误 (${response.status}): ${JSON.stringify(data)}`;
  } catch {
    return `API 错误 (${response.status}): ${text}`;
  }
}

/**
 * 确保根据 SiliconFlow 规则组装正确的 voice 标识
 * 例如 FunAudioLLM/CosyVoice2-0.5B 需要 "FunAudioLLM/CosyVoice2-0.5B:alex"
 */
export function formatSiliconFlowVoice(model: string, voice: string): string {
  if (!voice) return 'FunAudioLLM/CosyVoice2-0.5B:alex';
  // 如果已经包含冒号前缀，则保持
  if (voice.includes(':')) return voice;

  // 如果是 CosyVoice 或 fish-speech 系列，自动补全前缀
  if (model.includes('CosyVoice') || model.includes('fish-speech')) {
    return `${model}:${voice}`;
  }

  return voice;
}

export class SiliconFlowClient {
  constructor(private readonly connection: SiliconFlowConnection) {}

  private async request(path: string, init: RequestInit = {}) {
    if (!this.connection.apiKey.trim()) {
      throw new Error('请先在配置或聊天设置中填入有效的 SiliconFlow API Key');
    }

    const headers = new Headers(init.headers);
    headers.set('Authorization', `Bearer ${this.connection.apiKey.trim()}`);

    const targetUrl = `${normalizeBaseUrl(this.connection.apiUrl)}${path}`;
    const response = await fetch(targetUrl, {
      ...init,
      headers
    });

    if (!response.ok) throw new Error(await readError(response));
    return response;
  }

  async listModels(): Promise<SiliconFlowModel[]> {
    const response = await this.request('/models');
    const payload = await response.json() as { data?: SiliconFlowModel[] };
    return Array.isArray(payload.data) ? payload.data : [];
  }

  async generateImage<T>(body: unknown): Promise<T> {
    const response = await this.request('/images/generations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return response.json() as Promise<T>;
  }

  async createSpeech(body: SpeechRequest): Promise<Blob> {
    const payload: SpeechRequest = {
      model: body.model,
      input: body.input,
      voice: formatSiliconFlowVoice(body.model, body.voice),
      response_format: body.response_format || 'mp3',
      speed: typeof body.speed === 'number' ? body.speed : 1,
      sample_rate: body.sample_rate || 32000
    };

    const response = await this.request('/audio/speech', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return response.blob();
  }

  async transcribeAudio(file: File, model: string): Promise<{ text: string }> {
    const body = new FormData();
    body.append('file', file);
    body.append('model', model);
    const response = await this.request('/audio/transcriptions', { method: 'POST', body });
    return response.json() as Promise<{ text: string }>;
  }
}

export interface SiliconFlowModel {
  id: string;
  object?: string;
  owned_by?: string;
}

export function isImageModel(modelId: string) {
  return /(image|kolors|flux|stable-diffusion|wanx|z-image|playground)/i.test(modelId);
}

export interface SiliconFlowConnection {
  apiUrl: string;
  apiKey: string;
}

export interface SpeechRequest {
  model: string;
  input: string;
  voice: string;
  response_format?: string;
  speed?: number;
}

function normalizeBaseUrl(url: string) {
  const cleanUrl = url.trim().replace(/\/$/, '');
  if (!cleanUrl) return 'https://api.siliconflow.cn/v1';

  // Older screens allowed a full endpoint; resource paths must be built from the API root.
  return cleanUrl.replace(/\/(chat\/completions|images\/generations|audio\/(speech|transcriptions)|models)$/i, '');
}

async function readError(response: Response) {
  const text = await response.text();
  if (!text) return `API request failed: ${response.status} ${response.statusText}`;

  try {
    const data = JSON.parse(text) as { message?: string; error?: { message?: string } };
    return data.error?.message || data.message || `API request failed: ${response.status} ${text}`;
  } catch {
    return `API request failed: ${response.status} ${text}`;
  }
}

export class SiliconFlowClient {
  constructor(private readonly connection: SiliconFlowConnection) {}

  private async request(path: string, init: RequestInit = {}) {
    if (!this.connection.apiKey.trim()) {
      throw new Error('Please configure a SiliconFlow API Key in the chat settings first.');
    }

    const headers = new Headers(init.headers);
    headers.set('Authorization', `Bearer ${this.connection.apiKey.trim()}`);

    const response = await fetch(`${normalizeBaseUrl(this.connection.apiUrl)}${path}`, {
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
    const response = await this.request('/audio/speech', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
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

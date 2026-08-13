import { defineStore } from 'pinia'
import { DEFAULT_MODEL_ID, DEFAULT_API_URL } from '@/constants/modelConfig'
import { updateApiConfig } from '@/services/deepseekService'

export const useApiStore = defineStore('api', {
  state: () => ({
    apiUrl: localStorage.getItem('apiUrl') || import.meta.env.VITE_DEEPSEEK_BASE_URL || DEFAULT_API_URL,
    // Load the build-time environment value, but never persist user-entered keys in localStorage.
    apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY || '',
    modelName: localStorage.getItem('modelName') || import.meta.env.VITE_DEEPSEEK_MODEL || DEFAULT_MODEL_ID,
  }),

  actions: {
    setApiUrl(url: string) {
      const normalized = url.trim().replace(/\/$/, '').replace(/\/(chat\/completions|images\/generations|audio\/(speech|transcriptions)|models)$/i, '')
      this.apiUrl = normalized || DEFAULT_API_URL
      localStorage.setItem('apiUrl', this.apiUrl)
      updateApiConfig({ baseUrl: this.apiUrl })
    },

    setApiKey(key: string) {
      this.apiKey = key.trim()
      updateApiConfig({ apiKey: this.apiKey })
    },

    setModelName(name: string) {
      this.modelName = name
      localStorage.setItem('modelName', name)
      updateApiConfig({ model: name })
    }
  }
});

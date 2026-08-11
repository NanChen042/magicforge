import { defineStore } from 'pinia'
import { DEFAULT_MODEL_ID, DEFAULT_API_URL } from '@/constants/modelConfig'

export const useApiStore = defineStore('api', {
  state: () => ({
    apiUrl: localStorage.getItem('apiUrl') || import.meta.env.VITE_DEEPSEEK_BASE_URL || DEFAULT_API_URL,
    apiKey: localStorage.getItem('apiKey') || import.meta.env.VITE_DEEPSEEK_API_KEY || '',
    modelName: localStorage.getItem('modelName') || import.meta.env.VITE_DEEPSEEK_MODEL || DEFAULT_MODEL_ID,
  }),

  actions: {
    setApiUrl(url: string) {
      const normalized = url.trim().replace(/\/$/, '')
      this.apiUrl = normalized || DEFAULT_API_URL;
      localStorage.setItem('apiUrl', this.apiUrl);
    },

    setApiKey(key: string) {
      this.apiKey = key;
      localStorage.setItem('apiKey', key);
    },

    setModelName(name: string) {
      this.modelName = name;
      localStorage.setItem('modelName', name);
    }
  }
});

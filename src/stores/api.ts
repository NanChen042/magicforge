import { defineStore } from 'pinia'
import { DEFAULT_MODEL_ID, DEFAULT_API_URL } from '@/constants/modelConfig'

export const useApiStore = defineStore('api', {
  state: () => ({
    apiUrl: localStorage.getItem('apiUrl') || DEFAULT_API_URL,
    apiKey: localStorage.getItem('apiKey') || '',
    modelName: localStorage.getItem('modelName') || DEFAULT_MODEL_ID,
  }),

  actions: {
    setApiUrl(url: string) {
      this.apiUrl = url;
      localStorage.setItem('apiUrl', url);
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

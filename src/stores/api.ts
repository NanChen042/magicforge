import { defineStore } from 'pinia'

export const useApiStore = defineStore('api', {
  state: () => ({
    apiUrl: localStorage.getItem('apiUrl') || '',
    apiKey: localStorage.getItem('apiKey') || '',
    modelName: localStorage.getItem('modelName') || 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
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

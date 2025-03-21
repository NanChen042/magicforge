import { defineStore } from 'pinia'

export const useApiStore = defineStore('api', {
  state: () => ({
    apiUrl: 'http://106.14.176.242:9998/v1/chat/completions',
  }),

  actions: {
    setApiUrl(url: string) {
      this.apiUrl = url
      localStorage.setItem('apiUrl', url)
    },

    getApiUrl() {
      return this.apiUrl
    }
  }
})

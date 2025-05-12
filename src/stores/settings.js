import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    theme: 'light',
    language: 'en',
    notifications: true,
    loading: false,
    error: null
  }),

  actions: {
    async updateSettings(settings) {
      this.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        Object.assign(this, settings)
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
})
import { defineStore } from 'pinia'

export const useReportsStore = defineStore('reports', {
  state: () => ({
    monthlyStats: [],
    doctorPerformance: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchMonthlyStats() {
      this.loading = true
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.monthlyStats = [
          { month: 'January', appointments: 45, completed: 40, cancelled: 5 },
          { month: 'February', appointments: 52, completed: 48, cancelled: 4 },
          { month: 'March', appointments: 38, completed: 35, cancelled: 3 }
          // Add more months as needed
        ]
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async fetchDoctorPerformance() {
      this.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.doctorPerformance = [
          { doctorName: 'Dr. Sarah Johnson', appointments: 120, rating: 4.8 },
          { doctorName: 'Dr. Alex Lee', appointments: 95, rating: 4.6 },
          { doctorName: 'Dr. Emma Brown', appointments: 150, rating: 4.9 }
          // Add more doctors as needed
        ]
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
})
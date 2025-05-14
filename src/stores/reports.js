import { defineStore } from 'pinia'

// Static data for reports (used as fallback and initial data)
const STATIC_MONTHLY_STATS = [
  { month: 'January', appointments: 45, completed: 40, cancelled: 5 },
  { month: 'February', appointments: 52, completed: 48, cancelled: 4 },
  { month: 'March', appointments: 38, completed: 35, cancelled: 3 },
  { month: 'April', appointments: 60, completed: 55, cancelled: 5 },
  { month: 'May', appointments: 75, completed: 68, cancelled: 7 },
  { month: 'June', appointments: 48, completed: 45, cancelled: 3 }
]

const STATIC_DOCTOR_PERFORMANCE = [
  { doctorName: 'Dr. Sarah Johnson', appointments: 120, rating: 4.8 },
  { doctorName: 'Dr. Alex Lee', appointments: 95, rating: 4.6 },
  { doctorName: 'Dr. Emma Brown', appointments: 150, rating: 4.9 },
  { doctorName: 'Dr. John Smith', appointments: 110, rating: 4.7 },
  { doctorName: 'Dr. Maria Garcia', appointments: 130, rating: 4.5 }
]

const STATIC_APPOINTMENT_STATUS = {
  confirmed: 180,
  pending: 45,
  cancelled: 25
}

export const useReportsStore = defineStore('reports', {
  state: () => ({
    // Initialize with static data to ensure charts render immediately
    monthlyStats: [...STATIC_MONTHLY_STATS],
    doctorPerformance: [...STATIC_DOCTOR_PERFORMANCE],
    appointmentStatus: { ...STATIC_APPOINTMENT_STATUS },
    loading: false,
    error: null
  }),

  actions: {
    async fetchMonthlyStats() {
      this.loading = true
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // In a real app, this would be an API call
        // For now, we'll use our static data with some random variations
        this.monthlyStats = STATIC_MONTHLY_STATS.map(stat => ({
          ...stat,
          appointments: stat.appointments + Math.floor(Math.random() * 10),
          completed: stat.completed + Math.floor(Math.random() * 8),
          cancelled: stat.cancelled + Math.floor(Math.random() * 3)
        }))
      } catch (error) {
        this.error = error.message
        // Fallback to static data
        this.monthlyStats = [...STATIC_MONTHLY_STATS]
      } finally {
        this.loading = false
      }
    },

    async fetchDoctorPerformance() {
      this.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // In a real app, this would be an API call
        // For now, we'll use our static data with some random variations
        this.doctorPerformance = STATIC_DOCTOR_PERFORMANCE.map(doc => ({
          ...doc,
          appointments: doc.appointments + Math.floor(Math.random() * 20),
          rating: Math.min(5, doc.rating + (Math.random() * 0.2 - 0.1))
        }))
      } catch (error) {
        this.error = error.message
        // Fallback to static data
        this.doctorPerformance = [...STATIC_DOCTOR_PERFORMANCE]
      } finally {
        this.loading = false
      }
    },

    async fetchAppointmentStatus() {
      this.loading = true
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // In a real app, this would be an API call
        // For now, we'll use our static data with some random variations
        this.appointmentStatus = {
          confirmed: STATIC_APPOINTMENT_STATUS.confirmed + Math.floor(Math.random() * 20),
          pending: STATIC_APPOINTMENT_STATUS.pending + Math.floor(Math.random() * 10),
          cancelled: STATIC_APPOINTMENT_STATUS.cancelled + Math.floor(Math.random() * 5)
        }
      } catch (error) {
        this.error = error.message
        // Fallback to static data
        this.appointmentStatus = { ...STATIC_APPOINTMENT_STATUS }
      } finally {
        this.loading = false
      }
    }
  }
})
import { defineStore } from 'pinia'

export const useAppointmentStore = defineStore('appointment', {
  state: () => ({
    appointments: [],
    loading: false,
    error: null,
    filters: {
      doctorName: '',
      patientName: '',
      date: '',
      status: ''
    }
  }),

  getters: {
    filteredAppointments: (state) => {
      return state.appointments.filter(appointment => {
        const matchDoctor = appointment.doctorName.toLowerCase().includes(state.filters.doctorName.toLowerCase())
        const matchPatient = appointment.patientName.toLowerCase().includes(state.filters.patientName.toLowerCase())
        const matchStatus = !state.filters.status || appointment.status === state.filters.status
        const matchDate = !state.filters.date || appointment.date.includes(state.filters.date)
        
        return matchDoctor && matchPatient && matchStatus && matchDate
      })
    }
  },

  actions: {
    setFilter(filterType, value) {
      this.filters[filterType] = value
    },

    async fetchAppointments() {
      this.loading = true
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        // Sample data
        // Sample data
    this.appointments = [
        {
          id: 1,
          patientName: 'John Doe',
          doctorName: 'Dr. Sarah Johnson',
          date: '2024-01-20',
          time: '10:00 AM',
          status: 'confirmed'
        },
        {
          id: 2,
          patientName: 'Jane Smith',
          doctorName: 'Dr. Alex Lee',
          date: '2024-01-21',
          time: '11:30 AM',
          status: 'pending'
        },
        {
          id: 3,
          patientName: 'Bob Martin',
          doctorName: 'Dr. Emma Brown',
          date: '2024-01-22',
          time: '01:00 PM',
          status: 'cancelled'
        },
        {
          id: 4,
          patientName: 'Alice Green',
          doctorName: 'Dr. Sarah Johnson',
          date: '2024-01-23',
          time: '09:30 AM',
          status: 'confirmed'
        },
        {
          id: 5,
          patientName: 'Tom Hardy',
          doctorName: 'Dr. Alex Lee',
          date: '2024-01-24',
          time: '02:00 PM',
          status: 'confirmed'
        },
        {
          id: 6,
          patientName: 'Emma Watson',
          doctorName: 'Dr. Emma Brown',
          date: '2024-01-25',
          time: '12:00 PM',
          status: 'pending'
        },
        {
          id: 7,
          patientName: 'Chris Evans',
          doctorName: 'Dr. John Smith',
          date: '2024-01-26',
          time: '03:00 PM',
          status: 'confirmed'
        },
        {
          id: 8,
          patientName: 'Natalie Portman',
          doctorName: 'Dr. Sarah Johnson',
          date: '2024-01-27',
          time: '10:30 AM',
          status: 'cancelled'
        },
        {
          id: 9,
          patientName: 'Daniel Craig',
          doctorName: 'Dr. Emma Brown',
          date: '2024-01-28',
          time: '01:30 PM',
          status: 'confirmed'
        },
        {
          id: 10,
          patientName: 'Scarlett Johansson',
          doctorName: 'Dr. John Smith',
          date: '2024-01-29',
          time: '11:00 AM',
          status: 'pending'
        },
        {
          id: 11,
          patientName: 'Mark Ruffalo',
          doctorName: 'Dr. Alex Lee',
          date: '2024-01-30',
          time: '10:00 AM',
          status: 'confirmed'
        },
        {
          id: 12,
          patientName: 'Brie Larson',
          doctorName: 'Dr. Emma Brown',
          date: '2024-01-31',
          time: '03:30 PM',
          status: 'confirmed'
        },
        {
          id: 13,
          patientName: 'Tom Holland',
          doctorName: 'Dr. Sarah Johnson',
          date: '2024-02-01',
          time: '09:00 AM',
          status: 'pending'
        },
        {
          id: 14,
          patientName: 'Zendaya Coleman',
          doctorName: 'Dr. John Smith',
          date: '2024-02-02',
          time: '02:30 PM',
          status: 'confirmed'
        },
        {
          id: 15,
          patientName: 'Chris Hemsworth',
          doctorName: 'Dr. Alex Lee',
          date: '2024-02-03',
          time: '11:15 AM',
          status: 'cancelled'
        },
        {
          id: 16,
          patientName: 'Paul Rudd',
          doctorName: 'Dr. Emma Brown',
          date: '2024-02-04',
          time: '01:45 PM',
          status: 'confirmed'
        },
        {
          id: 17,
          patientName: 'Elizabeth Olsen',
          doctorName: 'Dr. Sarah Johnson',
          date: '2024-02-05',
          time: '12:30 PM',
          status: 'pending'
        },
        {
          id: 18,
          patientName: 'Jeremy Renner',
          doctorName: 'Dr. John Smith',
          date: '2024-02-06',
          time: '04:00 PM',
          status: 'confirmed'
        },
        {
          id: 19,
          patientName: 'Anthony Mackie',
          doctorName: 'Dr. Alex Lee',
          date: '2024-02-07',
          time: '10:30 AM',
          status: 'confirmed'
        },
        {
          id: 20,
          patientName: 'Sebastian Stan',
          doctorName: 'Dr. Emma Brown',
          date: '2024-02-08',
          time: '11:45 AM',
          status: 'cancelled'
        },
        {
          id: 21,
          patientName: 'Benedict Cumberbatch',
          doctorName: 'Dr. Sarah Johnson',
          date: '2024-02-09',
          time: '01:00 PM',
          status: 'confirmed'
        }
      ]
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async createAppointment(appointmentData) {
      this.loading = true
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        const newAppointment = {
          id: Date.now(),
          ...appointmentData
        }
        // यहाँ हम नए appointment को array में push करने से पहले appointments array को initialize करते हैं
        if (!this.appointments) {
          this.appointments = []
        }
        this.appointments.push(newAppointment)
        return newAppointment
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateAppointmentStatus(id, status) {
      this.loading = true
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        const appointment = this.appointments.find(a => a.id === id)
        if (appointment) {
          appointment.status = status
        }
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
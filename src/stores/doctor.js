import { defineStore } from 'pinia'

export const useDoctorStore = defineStore('doctor', {
  state: () => ({
    doctors: [
      {
        id: 1,
        name: 'Dr. John Smith',
        specialization: 'Cardiologist',
        experience: '15 years',
        email: 'john.smith@example.com',
        phone: '+1 (555) 123-4567',
        avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
        bio: 'Dr. John Smith is a board-certified cardiologist with over 15 years of experience in treating heart conditions. He specializes in interventional cardiology and has performed over 1,000 cardiac procedures.',
        education: [
          'MD, Harvard Medical School',
          'Residency in Internal Medicine, Massachusetts General Hospital',
          'Fellowship in Cardiology, Cleveland Clinic'
        ],
        availability: {
          Monday: '9:00 AM - 5:00 PM',
          Tuesday: '9:00 AM - 5:00 PM',
          Wednesday: '9:00 AM - 5:00 PM',
          Thursday: '9:00 AM - 5:00 PM',
          Friday: '9:00 AM - 3:00 PM'
        },
        languages: ['English', 'Spanish'],
        rating: 4.8
      },
      {
        id: 2,
        name: 'Dr. Sarah Johnson',
        specialization: 'Neurologist',
        experience: '12 years',
        email: 'sarah.johnson@example.com',
        phone: '+1 (555) 234-5678',
        avatar: 'https://cdn.quasar.dev/img/avatar2.jpg'
      },
      {
        id: 3,
        name: 'Dr. Michael Chen',
        specialization: 'Pediatrician',
        experience: '10 years',
        email: 'michael.chen@example.com',
        phone: '+1 (555) 345-6789',
        avatar: 'https://cdn.quasar.dev/img/avatar3.jpg'
      },
      {
        id: 4,
        name: 'Dr. Emily Brown',
        specialization: 'Dermatologist',
        experience: '8 years',
        email: 'emily.brown@example.com',
        phone: '+1 (555) 456-7890',
        avatar: 'https://cdn.quasar.dev/img/avatar4.jpg'
      },
      {
        id: 5,
        name: 'Dr. David Wilson',
        specialization: 'Orthopedic Surgeon',
        experience: '20 years',
        email: 'david.wilson@example.com',
        phone: '+1 (555) 567-8901',
        avatar: 'https://cdn.quasar.dev/img/avatar5.jpg'
      },
      {
        id: 6,
        name: 'Dr. Lisa Anderson',
        specialization: 'Psychiatrist',
        experience: '14 years',
        email: 'lisa.anderson@example.com',
        phone: '+1 (555) 678-9012',
        avatar: 'https://cdn.quasar.dev/img/avatar6.jpg'
      },
      {
        id: 7,
        name: 'Dr. Robert Taylor',
        specialization: 'Ophthalmologist',
        experience: '16 years',
        email: 'robert.taylor@example.com',
        phone: '+1 (555) 789-0123',
        avatar: 'https://cdn.quasar.dev/img/avatar1.jpg'
      },
      {
        id: 8,
        name: 'Dr. Maria Garcia',
        specialization: 'Endocrinologist',
        experience: '11 years',
        email: 'maria.garcia@example.com',
        phone: '+1 (555) 890-1234',
        avatar: 'https://cdn.quasar.dev/img/avatar2.jpg'
      },
      {
        id: 9,
        name: 'Dr. James Lee',
        specialization: 'Gastroenterologist',
        experience: '13 years',
        email: 'james.lee@example.com',
        phone: '+1 (555) 901-2345',
        avatar: 'https://cdn.quasar.dev/img/avatar3.jpg'
      },
      {
        id: 10,
        name: 'Dr. Patricia Moore',
        specialization: 'Oncologist',
        experience: '18 years',
        email: 'patricia.moore@example.com',
        phone: '+1 (555) 012-3456',
        avatar: 'https://cdn.quasar.dev/img/avatar4.jpg'
      },
      {
        id: 11,
        name: 'Dr. Thomas Wright',
        specialization: 'Urologist',
        experience: '9 years',
        email: 'thomas.wright@example.com',
        phone: '+1 (555) 123-4567',
        avatar: 'https://cdn.quasar.dev/img/avatar5.jpg'
      },
      {
        id: 12,
        name: 'Dr. Jennifer Martinez',
        specialization: 'Rheumatologist',
        experience: '7 years',
        email: 'jennifer.martinez@example.com',
        phone: '+1 (555) 234-5678',
        avatar: 'https://cdn.quasar.dev/img/avatar6.jpg'
      },
      {
        id: 13,
        name: 'Dr. William Turner',
        specialization: 'Pulmonologist',
        experience: '15 years',
        email: 'william.turner@example.com',
        phone: '+1 (555) 345-6789',
        avatar: 'https://cdn.quasar.dev/img/avatar1.jpg'
      },
      {
        id: 14,
        name: 'Dr. Elizabeth White',
        specialization: 'Allergist',
        experience: '12 years',
        email: 'elizabeth.white@example.com',
        phone: '+1 (555) 456-7890',
        avatar: 'https://cdn.quasar.dev/img/avatar2.jpg'
      },
      {
        id: 15,
        name: 'Dr. Richard Harris',
        specialization: 'Nephrologist',
        experience: '17 years',
        email: 'richard.harris@example.com',
        phone: '+1 (555) 567-8901',
        avatar: 'https://cdn.quasar.dev/img/avatar3.jpg'
      },
      {
        id: 16,
        name: 'Dr. Susan Clark',
        specialization: 'Hematologist',
        experience: '14 years',
        email: 'susan.clark@example.com',
        phone: '+1 (555) 678-9012',
        avatar: 'https://cdn.quasar.dev/img/avatar4.jpg'
      },
      {
        id: 17,
        name: 'Dr. Joseph Rodriguez',
        specialization: 'Plastic Surgeon',
        experience: '19 years',
        email: 'joseph.rodriguez@example.com',
        phone: '+1 (555) 789-0123',
        avatar: 'https://cdn.quasar.dev/img/avatar5.jpg'
      },
      {
        id: 18,
        name: 'Dr. Margaret Lewis',
        specialization: 'Family Medicine',
        experience: '8 years',
        email: 'margaret.lewis@example.com',
        phone: '+1 (555) 890-1234',
        avatar: 'https://cdn.quasar.dev/img/avatar6.jpg'
      },
      {
        id: 19,
        name: 'Dr. Christopher King',
        specialization: 'Emergency Medicine',
        experience: '11 years',
        email: 'christopher.king@example.com',
        phone: '+1 (555) 901-2345',
        avatar: 'https://cdn.quasar.dev/img/avatar1.jpg'
      },
      {
        id: 20,
        name: 'Dr. Nancy Scott',
        specialization: 'Internal Medicine',
        experience: '16 years',
        email: 'nancy.scott@example.com',
        phone: '+1 (555) 012-3456',
        avatar: 'https://cdn.quasar.dev/img/avatar2.jpg'
      }
    ],
    loading: false,
    error: null
  }),

  actions: {
    async fetchDoctors() {
      // Simulating API call
      this.loading = true
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.loading = false
      return this.doctors
    },
    
    async fetchDoctorSchedule(doctorId) {
      this.loading = true
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Default schedule template
        const defaultSchedule = [
          { id: 1, day: 'Monday', startTime: '09:00', endTime: '17:00', availability: true },
          { id: 2, day: 'Tuesday', startTime: '09:00', endTime: '17:00', availability: true },
          { id: 3, day: 'Wednesday', startTime: '09:00', endTime: '17:00', availability: true },
          { id: 4, day: 'Thursday', startTime: '09:00', endTime: '17:00', availability: true },
          { id: 5, day: 'Friday', startTime: '09:00', endTime: '17:00', availability: true }
        ]
        
        // Find the doctor
        const doctor = this.doctors.find(doc => doc.id === doctorId)
        
        // If doctor has availability property, convert it to schedule format
        if (doctor && doctor.availability) {
          const schedule = []
          let id = 1
          
          for (const [day, hours] of Object.entries(doctor.availability)) {
            const [startTime, endTime] = hours.split(' - ')
            schedule.push({
              id: id++,
              day: day,
              startTime: startTime.replace(' AM', '').replace(' PM', ''),
              endTime: endTime.replace(' AM', '').replace(' PM', ''),
              availability: true
            })
          }
          
          return schedule
        }
        
        // If no availability property, return a generated schedule based on doctor ID
        return defaultSchedule.map(item => ({
          ...item,
          // Vary availability based on doctor ID to make it look realistic
          availability: (doctorId % 2 === 0) ? 
            (item.day !== 'Wednesday') : 
            (item.day !== 'Friday')
        }))
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async getDoctorById(id) {
      this.loading = true
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 500))
        const doctor = this.doctors.find(doc => doc.id === id)
        if (!doctor) {
          throw new Error('Doctor not found')
        }
        return doctor
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async createDoctor(doctorData) {
      this.loading = true
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.doctors.push(doctorData)
        return doctorData
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async deleteDoctor(id) {
      this.loading = true
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.doctors = this.doctors.filter(doc => doc.id !== id)
        return true
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateDoctor(id, updatedData) {
      this.loading = true
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const index = this.doctors.findIndex(doc => doc.id === id)
        if (index === -1) {
          throw new Error('Doctor not found')
        }
        
        // Update doctor data while preserving the id
        this.doctors[index] = { 
          ...this.doctors[index], 
          ...updatedData,
          id // Ensure ID doesn't change
        }
        
        return this.doctors[index]
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
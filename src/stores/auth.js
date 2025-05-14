// stores/auth.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  function login(userData) {
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
    return true
  }

  function logout() {
    user.value = null
    localStorage.removeItem('user')
  }

  function initialize() {
    const stored = localStorage.getItem('user')
    if (stored) user.value = JSON.parse(stored)
  }

  // Add register function
  async function register(userData) {
    
    try {
     
      // Create a new object without the confirmPassword field
      const userToStore = { ...userData }
      delete userToStore.confirmPassword
      

      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Store user data
      user.value = userToStore
      localStorage.setItem('user', JSON.stringify(userToStore))
      
      return true
    } catch (error) {
      console.error('Registration error:', error)
      return false
    }
  }

  return { user, login, logout, initialize, register }
})
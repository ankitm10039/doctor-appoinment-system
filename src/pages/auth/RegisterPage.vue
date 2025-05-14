<template>
    <q-page class="flex flex-center bg-grey-2">
      <div class="auth-container" :class="{ 'slide-up': isSignUp }">
        <!-- Register Panel -->
        <div class="form-container sign-up">
          <form @submit.prevent="handleRegister">
            <!-- <h6>Sign Up</h6> -->
            <q-input
              v-model="registerForm.username"
              label="Username"
              outlined
              class="q-mb-md"
              :rules="[val => !!val || 'Username is required']"
            />
            <q-input
              v-model="registerForm.email"
              type="email"
              label="Email"
              outlined
              class="q-mb-md"
              :rules="[val => !!val || 'Email is required']"
            />
            <q-input
  v-model="registerForm.password"
  :type="showPassword ? 'text' : 'password'"
  label="Password"
  outlined
  class="q-mb-md"
  :rules="[val => !!val || 'Password is required']"
>
  <template v-slot:append>
    <q-icon
      :name="showPassword ? 'visibility_off' : 'visibility'"
      class="cursor-pointer"
      @click="showPassword = !showPassword"
    />
  </template>
</q-input>

<q-input
  v-model="registerForm.confirmPassword"
  :type="showConfirmPassword ? 'text' : 'password'"
  label="Confirm Password"
  outlined
  class="q-mb-md"
  :rules="[
    val => !!val || 'Confirmation is required',
    val => val === registerForm.password || 'Passwords do not match'
  ]"
>
  <template v-slot:append>
    <q-icon
      :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
      class="cursor-pointer"
      @click="showConfirmPassword = !showConfirmPassword"
    />
  </template>
</q-input>
            <q-btn
              type="submit"
              color="primary"
              label="Sign Up"
              class="full-width"
              :loading="loading"
            />
          </form>
        </div>
  
        <!-- Overlay Container -->
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-right">
              <h4>Welcome!</h4>
              <p>Already have an account? Log in</p>
              <q-btn
                flat
                color="white"
                label="Login"
                to="/login"
              />
            </div>
          </div>
        </div>
      </div>
    </q-page>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from 'stores/auth'
  import { useQuasar } from 'quasar'
  
  const router = useRouter()
  const authStore = useAuthStore()
  const $q = useQuasar()
  const loading = ref(false)
  const showPassword = ref(false)
const showConfirmPassword = ref(false)
  const registerForm = ref({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  const handleRegister = async () => {
    if (registerForm.value.password !== registerForm.value.confirmPassword) {
      $q.notify({
        type: 'negative',
        message: 'Passwords do not match'
      })
      return
    }
  
    loading.value = true
    try {
      const success = await authStore.register(registerForm.value)
      if (success) {
        $q.notify({
          type: 'positive',
          message: 'Registration successful'
        })
        router.push('/')
      }
    } catch  {
      $q.notify({
        type: 'negative',
        message: 'Registration failed'
      })
    } finally {
      loading.value = false
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .auth-container {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
  }
  
  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
    padding: 50px;
    width: 50%;
  
    form {
      display: flex;
      flex-direction: column;
      padding: 0 50px;
      height: 100%;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  
    h2 {
      margin-bottom: 2rem;
    }
  }
  
  .sign-up {
    left: 50%;
    width: 50%;
    z-index: 2;
  }
  
  .overlay-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    overflow: hidden;
    z-index: 100;
  }
  
  .overlay {
    background: #2196F3;
    background: linear-gradient(to right, #1976D2, #2196F3);
    color: white;
    position: relative;
    height: 100%;
    width: 100%;
  }
  
  .overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 100%;
  }
  </style>
  
<template>
  <q-page class="flex flex-center bg-grey-2">
    <div class="auth-container" :class="{ 'slide-up': isSignUp }">
      <!-- Login Panel -->
      <div class="form-container sign-in">
        <form @submit.prevent="handleLogin">
          <h2>Sign In</h2>
          <q-input
            v-model="loginForm.email"
            type="email"
            label="Email"
            outlined
            class="q-mb-md"
            :rules="[val => !!val || 'Email is required']"
          />
          <q-input
            v-model="loginForm.password"
            type="password"
            label="Password"
            outlined
            class="q-mb-md"
            :rules="[val => !!val || 'Password is required']"
          />
          <q-btn
            type="submit"
            color="primary"
            label="Sign In"
            class="full-width"
            :loading="loading"
          />
        </form>
      </div>

      <!-- Sign Up Panel -->
    

      <!-- Overlay Container -->
      <div class="overlay-container">
        <div class="overlay" :class="{ 'slide-up': isSignUp }">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>Already have an account? Sign in to continue your journey</p>
            <q-btn
              flat
              color="white"
              label="Sign In"
              @click="isSignUp = false"
            />
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your details and start your journey with us</p>
            <q-btn
  flat
  color="white"
  label="Sign Up"
  to="/register"
/>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'stores/auth'
import { useQuasar } from 'quasar'

const router = useRouter()
const authStore = useAuthStore()
const $q = useQuasar()
const loading = ref(false)
const isSignUp = ref(false)

const loginForm = ref({
  email: '',
  password: ''
})



const handleLogin = async () => {
  loading.value = true
  try {
    const success = await authStore.login(loginForm.value)
    if (success) {
      // Store user data in localStorage
      const userData = authStore.user
      localStorage.setItem('user', JSON.stringify(userData))
      
      $q.notify({
        type: 'positive',
        message: 'Login Successfull',
        position: 'top'
      })
      router.push('/')  // मुख्य पेज पर रीडायरेक्ट करें
    }
  } catch  {
    $q.notify({
      type: 'negative',
      message: 'Login Error',
      position: 'top'
    })
  } finally {
    loading.value = false
  }
}


// लॉगिन चेक करें
onMounted(() => {
  const user = localStorage.getItem('user')
  if (user) {
    router.push('/')
  }
})
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
  transition: transform 0.6s ease-in-out;
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

  h1 {
    margin-bottom: 2rem;
  }
}

.sign-in {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-up {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.overlay {
  background: #2196F3;
  background: linear-gradient(to right, #1976D2, #2196F3);
  color: white;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
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
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

// Slide animation classes
.auth-container.slide-up {
  .sign-in {
    transform: translateX(100%);
  }
  
  .sign-up {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  }
  
  .overlay-container {
    transform: translateX(-100%);
  }
  
  .overlay {
    transform: translateX(50%);
  }
  
  .overlay-left {
    transform: translateX(0);
  }
  
  .overlay-right {
    transform: translateX(20%);
  }
}
</style>
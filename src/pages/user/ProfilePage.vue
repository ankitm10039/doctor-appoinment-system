<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <div class="text-h4">User Profile</div>
      </div>

      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <div class="text-center">
              <q-avatar size="150px">
                <img src="https://cdn.quasar.dev/img/avatar.png">
              </q-avatar>
              <div class="text-h6 q-mt-md">{{ username }}</div>
              <div class="text-subtitle2">{{ user?.email }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-8">
        <q-card>
          <q-card-section>
            <div class="text-h6">Personal Information</div>
            <q-form @submit="onSubmit" class="q-gutter-md q-mt-md">
              <q-input
                v-model="formData.username"
                label="Username"
                :rules="[val => !!val || 'Username is required']"
              />
              <q-input
                v-model="formData.email"
                label="Email"
                type="email"
                :rules="[val => !!val || 'Email is required']"
              />
              <div>
                <q-btn
                  label="Save Changes"
                  type="submit"
                  color="primary"
                  :loading="loading"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from 'stores/auth'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'

const authStore = useAuthStore()
const { user, loading, username } = storeToRefs(authStore)
const $q = useQuasar()

const formData = ref({
  username: '',
  email: ''
})

onMounted(() => {
  if (user.value) {
    formData.value = {
      username: user.value.username,
      email: user.value.email
    }
  }
})

const onSubmit = async () => {
  try {
    // यहाँ प्रोफाइल अपडेट लॉजिक आएगा
    $q.notify({
      type: 'positive',
      message: 'Profile updated successfully'
    })
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Failed to update profile'
    })
  }
}
</script>
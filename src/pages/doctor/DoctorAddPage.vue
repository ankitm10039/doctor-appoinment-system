<template>
    <q-page padding>
      <div class="q-pa-md q-mx-auto" style="max-width: 900px">
        <div class="row q-mb-md">
          <div class="col-12">
            <div class="text-h4 text-blue-600 font-bold">Add New Doctor</div>
          </div>
        </div>
  
        <q-form @submit="onSubmit" class="q-gutter-md">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData.name"
                label="Full Name"
                :rules="[val => !!val || 'Name is required']"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData.specialization"
                label="Specialization"
                :rules="[val => !!val || 'Specialization is required']"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData.experience"
                label="Experience"
                :rules="[val => !!val || 'Experience is required']"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData.email"
                label="Email"
                type="email"
                :rules="[
                  val => !!val || 'Email is required',
                  val => /^[^@]+@[^@]+\.[^@]+$/.test(val) || 'Invalid email format'
                ]"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData.phone"
                label="Phone Number"
                :rules="[val => !!val || 'Phone number is required']"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData.avatar"
                label="Avatar URL"
                :rules="[val => !!val || 'Avatar URL is required']"
              />
            </div>
          </div>
  
          <div class="row q-mt-md">
            <q-btn
              label="Cancel"
              color="negative"
              outline rounded
              class="q-mr-sm text-capitalize"
              :to="{ name: 'doctor-list' }"
            />
            <q-btn
              label="Save"
              type="submit"
              color="primary"
              rounded
              class="text-capitalize"
            />
          </div>
        </q-form>
      </div>
    </q-page>
  </template>
  

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDoctorStore } from 'stores/doctor'
import { useQuasar } from 'quasar'

const router = useRouter()
const doctorStore = useDoctorStore()
const $q = useQuasar()

const formData = ref({
  name: '',
  specialization: '',
  experience: '',
  email: '',
  phone: '',
  avatar: 'https://cdn.quasar.dev/img/avatar1.jpg' // Default avatar
})

const onSubmit = async () => {
  try {
    // Add new doctor with auto-generated ID
    const newDoctor = {
      ...formData.value,
      id: Date.now() // Simple way to generate unique ID
    }
    
    await doctorStore.createDoctor(newDoctor)
    
    $q.notify({
      type: 'positive',
      message: 'Doctor added successfully'
    })
    
    router.push({ name: 'doctor-list' })
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Failed to add doctor'
    })
  }
}
</script>
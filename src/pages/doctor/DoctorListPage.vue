<template>
    <q-page padding>
      <div class="row q-mb-md">
      
        <div class="col-12 col-md-6">
          
          <q-btn
            color="primary"
            icon="add"
            label="Add New Doctor"
            :to="{ name: 'doctor-add' }"
            class="q-mt-sm text-capitalize"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            v-model="searchQuery"
            label="Search doctors"
            color="primary"
            debounce="300"  
            outlined
            class="q-mb-md"
          />
        </div>
      </div>
  
      <!-- Search input field -->
      <div class="row q-mb-md">
       
      </div>
  
      <!-- Doctors Table -->
      <q-table
        :rows="filteredDoctors"
        :columns="columns"
        row-key="id"
        :loading="loading"
      >
        <template v-slot:body-cell-avatar="props">
          <q-td :props="props">
            <q-avatar>
              <img :src="props.row.avatar">
            </q-avatar>
          </q-td>
        </template>
  
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn-group flat>
              <q-btn
                flat
                round
                color="primary"
                icon="visibility"
                :to="{ name: 'doctor-profile', params: { id: props.row.id }}"
              />
              <q-btn
                flat
                round
                color="warning"
                icon="edit"
                :to="{ name: 'doctor-edit', params: { id: props.row.id }}"
              />
              <q-btn
                flat
                round
                color="negative"
                icon="delete"
                @click="confirmDelete(props.row)"
              />
            </q-btn-group>
          </q-td>
        </template>
      </q-table>
  
      <q-dialog v-model="confirmDeleteDialog">
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="warning" color="negative" text-color="white" />
            <span class="q-ml-sm">Are you sure you want to delete this doctor?</span>
          </q-card-section>
  
          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Delete" color="negative" @click="deleteSelectedDoctor" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useDoctorStore } from 'stores/doctor'
  
  const doctorStore = useDoctorStore()
  const confirmDeleteDialog = ref(false)
  const selectedDoctor = ref(null)
  const searchQuery = ref('')  // Search query
  
  const columns = [
    { name: 'avatar', label: 'Avatar', field: 'avatar', align: 'center' },
    { name: 'name', label: 'Name', field: 'name', sortable: true },
    { name: 'specialization', label: 'Specialization', field: 'specialization', sortable: true },
    { name: 'experience', label: 'Experience', field: 'experience', sortable: true },
    { name: 'email', label: 'Email', field: 'email', sortable: true },
    { name: 'phone', label: 'Phone', field: 'phone', sortable: true },
    { name: 'actions', label: 'Actions', field: 'actions' }
  ]
  
  const { doctors, loading } = storeToRefs(doctorStore)
  
  onMounted(async () => {
    await doctorStore.fetchDoctors()
  })
  
  const filteredDoctors = computed(() => {
    return doctors.value.filter(doctor => {
      const searchText = searchQuery.value.toLowerCase()
      return (
        doctor.name.toLowerCase().includes(searchText) ||
        doctor.specialization.toLowerCase().includes(searchText) ||
        doctor.email.toLowerCase().includes(searchText) ||
        doctor.phone.includes(searchText)
      )
    })
  })
  
  const confirmDelete = (doctor) => {
    selectedDoctor.value = doctor
    confirmDeleteDialog.value = true
  }
  
  const deleteSelectedDoctor = async () => {
    if (selectedDoctor.value) {
      await doctorStore.deleteDoctor(selectedDoctor.value.id)
      selectedDoctor.value = null
    }
  }
  </script>
  
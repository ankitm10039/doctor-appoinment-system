<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <div class="text-h4">Appointment History</div>
      </div>

      <!-- Filters -->
      <div class="col-12">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-3">
            <q-input
              v-model="filters.dateFrom"
              type="date"
              label="From Date"
              @update:model-value="updateFilter('dateFrom', $event)"
            />
          </div>
          <div class="col-12 col-md-3">
            <q-input
              v-model="filters.dateTo"
              type="date"
              label="To Date"
              @update:model-value="updateFilter('dateTo', $event)"
            />
          </div>
          <div class="col-12 col-md-3">
            <q-select
              v-model="filters.doctorName"
              :options="doctorOptions"
              label="Doctor"
              @update:model-value="updateFilter('doctorName', $event)"
            />
          </div>
          <div class="col-12 col-md-3">
            <q-input
              v-model="filters.patientName"
              label="Patient Name"
              @update:model-value="updateFilter('patientName', $event)"
            />
          </div>
        </div>
      </div>

      <!-- Appointments Table -->
      <div class="col-12">
        <q-table
          :rows="filteredAppointments"
          :columns="columns"
          row-key="id"
          :loading="loading"
        >
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-chip :color="getStatusColor(props.value)" text-color="white">
                {{ props.value }}
              </q-chip>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppointmentStore } from 'stores/appointment'
import { useDoctorStore } from 'stores/doctor'

const appointmentStore = useAppointmentStore()
const doctorStore = useDoctorStore()
const { filteredAppointments, loading } = storeToRefs(appointmentStore)

const columns = [
  { name: 'patientName', label: 'Patient Name', field: 'patientName', sortable: true },
  { name: 'doctorName', label: 'Doctor Name', field: 'doctorName', sortable: true },
  { name: 'date', label: 'Date', field: 'date', sortable: true },
  { name: 'time', label: 'Time', field: 'time', sortable: true },
  { name: 'status', label: 'Status', field: 'status', sortable: true }
]

const filters = ref({
  dateFrom: '',
  dateTo: '',
  doctorName: '',
  patientName: ''
})

const doctorOptions = computed(() => {
  return doctorStore.doctors.map(doctor => doctor.name)
})

const getStatusColor = (status) => {
  const colors = {
    confirmed: 'positive',
    pending: 'warning',
    cancelled: 'negative'
  }
  return colors[status] || 'grey'
}

const updateFilter = (filterType, value) => {
  appointmentStore.setFilter(filterType, value)
}
</script>
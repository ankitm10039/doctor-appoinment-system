<template>
  <q-page padding>
    <div class="row q-mb-md">
      <div class="col-12">
        <div class="text-h4">Appointments</div>
        <q-btn
          color="primary"
          icon="add"
          label="Create Appointment"
          :to="{ name: 'appointment-create' }"
          class="q-mt-sm text-capitalize"
        />
      </div>
    </div>

    <!-- Search Filters -->
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-md-3">
        <q-input
          v-model="filters.doctorName"
          label="Doctor Name"
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
      <div class="col-12 col-md-3">
        <q-input
          v-model="filters.date"
          label="Date"
          type="date"
          @update:model-value="updateFilter('date', $event)"
        />
      </div>
      <div class="col-12 col-md-3">
        <q-select
          v-model="filters.status"
          :options="['confirmed', 'pending', 'cancelled']"
          label="Status"
          @update:model-value="updateFilter('status', $event)"
        />
      </div>
    </div>

    <!-- Appointments Table -->
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

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn-dropdown flat color="primary" label="Change Status">
            <q-list>
              <q-item clickable v-close-popup @click="updateStatus(props.row.id, 'confirmed')">
                <q-item-section>Confirm</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="updateStatus(props.row.id, 'cancelled')">
                <q-item-section>Cancel</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, onMounted,  } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppointmentStore } from 'stores/appointment'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const appointmentStore = useAppointmentStore()
const { filteredAppointments, loading } = storeToRefs(appointmentStore)

const columns = [
  { name: 'patientName', label: 'Patient Name', field: 'patientName', sortable: true },
  { name: 'doctorName', label: 'Doctor Name', field: 'doctorName', sortable: true },
  { name: 'date', label: 'Date', field: 'date', sortable: true },
  { name: 'time', label: 'Time', field: 'time', sortable: true },
  { name: 'status', label: 'Status', field: 'status', sortable: true },
  { name: 'actions', label: 'Actions', field: 'actions' }
]

const filters = ref({
  doctorName: '',
  patientName: '',
  date: '',
  status: ''
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

const updateStatus = async (id, status) => {
  try {
    await appointmentStore.updateAppointmentStatus(id, status)
  } catch {
    // $q.notify({
    //   type: 'negative',
    //   message: 'Failed to update appointment status'
    // })

    $q.notify({
      type: 'negative',
      message: 'Failed to update appointment status'
    })
  }
}

onMounted(async () => {
  await appointmentStore.fetchAppointments()
})
</script>
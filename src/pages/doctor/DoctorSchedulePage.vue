<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <div class="text-h4">Doctor Schedule</div>
      </div>

      <!-- Doctor Selection -->
      <div class="col-12 col-md-4">
        <q-select
          v-model="selectedDoctor"
          :options="doctors"
          option-label="name"
          label="Select Doctor"
          @update:model-value="fetchSchedule"
        />
      </div>

      <!-- Schedule Table -->
      <div class="col-12">
        <q-table
          :rows="schedule"
          :columns="columns"
          row-key="id"
          :loading="loading"
        >
          <template v-slot:body-cell-availability="props">
            <q-td :props="props">
              <q-chip
                :color="props.value ? 'positive' : 'negative'"
                text-color="white"
              >
                {{ props.value ? 'Available' : 'Not Available' }}
              </q-chip>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useDoctorStore } from 'stores/doctor'

const doctorStore = useDoctorStore()
const { doctors, loading } = storeToRefs(doctorStore)

const selectedDoctor = ref(null)
const schedule = ref([])

const columns = [
  { name: 'day', label: 'Day', field: 'day', sortable: true },
  { name: 'startTime', label: 'Start Time', field: 'startTime', sortable: true },
  { name: 'endTime', label: 'End Time', field: 'endTime', sortable: true },
  { name: 'availability', label: 'Availability', field: 'availability', sortable: true }
]

const fetchSchedule = async () => {
  if (selectedDoctor.value) {
    // Simulated schedule data
    schedule.value = [
      { id: 1, day: 'Monday', startTime: '09:00', endTime: '17:00', availability: true },
      { id: 2, day: 'Tuesday', startTime: '09:00', endTime: '17:00', availability: true },
      { id: 3, day: 'Wednesday', startTime: '09:00', endTime: '17:00', availability: true },
      { id: 4, day: 'Thursday', startTime: '09:00', endTime: '17:00', availability: true },
      { id: 5, day: 'Friday', startTime: '09:00', endTime: '17:00', availability: true }
    ]
  }
}
</script>
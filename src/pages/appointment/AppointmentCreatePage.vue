<template>
  <q-page padding>
    <div class="q-pa-md q-mx-auto" style="max-width: 900px">
      <div class="text-h4 q-mb-md">Create Appointment</div>

      <q-form @submit="onSubmit" class="q-gutter-md">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-input
              v-model="formData.patientName"
              label="Patient Name"
              :rules="[val => !!val || 'Patient name is required']"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-select
              v-model="formData.doctorName"
              :options="doctorOptions"
              label="Select Doctor"
              :rules="[val => !!val || 'Doctor is required']"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="formData.date"
              label="Date"
              type="date"
              :rules="[val => !!val || 'Date is required']"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="formData.time"
              label="Time"
              type="time"
              :rules="[val => !!val || 'Time is required']"
            />
          </div>
        </div>

        <div class="row q-mt-md">
          <q-btn
            label="Cancel"
            color="negative"
            flat
            class="q-mr-sm"
            :to="{ name: 'appointment-list' }"
          />
          <q-btn
            label="Create"
            type="submit"
            color="primary"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref , computed} from 'vue'
import { useRouter } from 'vue-router'
import { useAppointmentStore } from 'stores/appointment'
import { useDoctorStore } from 'stores/doctor'
import { useQuasar } from 'quasar'

const router = useRouter()
const appointmentStore = useAppointmentStore()
const doctorStore = useDoctorStore()
const $q = useQuasar()

const formData = ref({
  patientName: '',
  doctorName: '',
  date: '',
  time: '',
  status: 'pending'
})

const doctorOptions = computed(() => {
  return doctorStore.doctors.map(doctor => doctor.name)
})

const onSubmit = async () => {
  try {
    await appointmentStore.createAppointment(formData.value)
    // Refresh the appointments list after creation
    await appointmentStore.fetchAppointments()
    $q.notify({
      type: 'positive',
      message: 'Appointment created successfully'
    })
    router.push({ name: 'appointment-list' })
  } catch  {
    $q.notify({
      type: 'negative',
      message: 'Failed to create appointment'
    })
  }
}
</script>
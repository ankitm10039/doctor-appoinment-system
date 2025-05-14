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
          use-input
          input-debounce="300"
          :filter="filterDoctors"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results found
              </q-item-section>
            </q-item>
          </template>
          
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-avatar>
                  <img :src="scope.opt.avatar">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.name }}</q-item-label>
                <q-item-label caption>{{ scope.opt.specialization }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>

      <!-- Doctor Info Card (when selected) -->
      <div v-if="selectedDoctor" class="col-12 col-md-8">
        <q-card flat bordered>
          <q-card-section class="row items-center no-wrap">
            <q-avatar size="72px">
              <img :src="selectedDoctor.avatar">
            </q-avatar>
            <div class="q-ml-md">
              <div class="text-h6">{{ selectedDoctor.name }}</div>
              <div class="text-subtitle2">{{ selectedDoctor.specialization }}</div>
              <div class="text-caption">Experience: {{ selectedDoctor.experience }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Schedule Table -->
      <div class="col-12 q-mt-md">
        <q-card v-if="schedule.length > 0" flat bordered>
          <q-card-section>
            <div class="text-h6">Weekly Schedule</div>
          </q-card-section>
          
          <q-separator />
          
          <q-card-section>
            <q-table
              :rows="schedule"
              :columns="columns"
              row-key="id"
              :loading="loading"
              :pagination="{ rowsPerPage: 10 }"
              :filter="filter"
              binary-state-sort
            >
              <template v-slot:top-right>
                <q-input dense debounce="300" v-model="filter" placeholder="Search">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>
              
              <template v-slot:body-cell-availability="props">
                <q-td :props="props">
                  <q-chip
                    :color="props.value ? 'positive' : 'negative'"
                    text-color="white"
                    size="sm"
                  >
                    {{ props.value ? 'Available' : 'Not Available' }}
                  </q-chip>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
        
        <q-card v-else-if="selectedDoctor && !loading" flat bordered>
          <q-card-section class="text-center">
            <q-icon name="event_busy" size="50px" color="grey-7" />
            <div class="text-h6 q-mt-sm">No Schedule Available</div>
            <div class="text-caption">Please select a different doctor or check back later.</div>
          </q-card-section>
        </q-card>
        
        <q-card v-else-if="!selectedDoctor" flat bordered>
          <q-card-section class="text-center">
            <q-icon name="person_search" size="50px" color="primary" />
            <div class="text-h6 q-mt-sm">Select a Doctor</div>
            <div class="text-caption">Please select a doctor to view their schedule.</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useDoctorStore } from 'stores/doctor'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const doctorStore = useDoctorStore()
const { doctors, loading } = storeToRefs(doctorStore)

const selectedDoctor = ref(null)
const schedule = ref([])

const filter = ref('')

const columns = [
  { name: 'day', label: 'Day', field: 'day', sortable: true, align: 'left' },
  { name: 'startTime', label: 'Start Time', field: 'startTime', sortable: true, align: 'center' },
  { name: 'endTime', label: 'End Time', field: 'endTime', sortable: true, align: 'center' },
  { name: 'availability', label: 'Availability', field: 'availability', sortable: true, align: 'center' }
]

// Filter function for doctor search
const filterDoctors = (val, update) => {
  if (val === '') {
    update(() => {
      return doctors.value
    })
    return
  }

  const needle = val.toLowerCase()
  update(() => {
    return doctors.value.filter(doctor =>
      doctor.name.toLowerCase().includes(needle) ||
      doctor.specialization.toLowerCase().includes(needle)
    )
  })
}

// Doctor schedule database
const doctorSchedules = {
  1: [ // Dr. John Smith (Cardiologist)
    { id: 1, day: 'Monday', startTime: '09:00', endTime: '17:00', availability: true },
    { id: 2, day: 'Tuesday', startTime: '09:00', endTime: '17:00', availability: true },
    { id: 3, day: 'Wednesday', startTime: '09:00', endTime: '17:00', availability: true },
    { id: 4, day: 'Thursday', startTime: '09:00', endTime: '17:00', availability: true },
    { id: 5, day: 'Friday', startTime: '09:00', endTime: '15:00', availability: true }
  ],
  2: [ // Dr. Sarah Johnson (Neurologist)
    { id: 6, day: 'Monday', startTime: '08:00', endTime: '16:00', availability: true },
    { id: 7, day: 'Tuesday', startTime: '08:00', endTime: '16:00', availability: true },
    { id: 8, day: 'Wednesday', startTime: '08:00', endTime: '16:00', availability: false },
    { id: 9, day: 'Thursday', startTime: '08:00', endTime: '16:00', availability: true },
    { id: 10, day: 'Friday', startTime: '08:00', endTime: '14:00', availability: true }
  ],
  3: [ // Dr. Michael Chen (Pediatrician)
    { id: 11, day: 'Monday', startTime: '10:00', endTime: '18:00', availability: true },
    { id: 12, day: 'Tuesday', startTime: '10:00', endTime: '18:00', availability: true },
    { id: 13, day: 'Wednesday', startTime: '10:00', endTime: '18:00', availability: true },
    { id: 14, day: 'Thursday', startTime: '10:00', endTime: '18:00', availability: false },
    { id: 15, day: 'Saturday', startTime: '09:00', endTime: '14:00', availability: true }
  ],
  4: [ // Dr. Emily Brown (Dermatologist)
    { id: 16, day: 'Monday', startTime: '09:30', endTime: '17:30', availability: true },
    { id: 17, day: 'Wednesday', startTime: '09:30', endTime: '17:30', availability: true },
    { id: 18, day: 'Friday', startTime: '09:30', endTime: '17:30', availability: true }
  ],
  5: [ // Dr. David Wilson (Orthopedic Surgeon)
    { id: 19, day: 'Monday', startTime: '07:00', endTime: '15:00', availability: true },
    { id: 20, day: 'Tuesday', startTime: '07:00', endTime: '15:00', availability: true },
    { id: 21, day: 'Wednesday', startTime: '07:00', endTime: '15:00', availability: true },
    { id: 22, day: 'Thursday', startTime: '07:00', endTime: '15:00', availability: true },
    { id: 23, day: 'Friday', startTime: '07:00', endTime: '12:00', availability: true }
  ],
  6: [ // Dr. Lisa Anderson (Psychiatrist)
    { id: 24, day: 'Monday', startTime: '11:00', endTime: '19:00', availability: true },
    { id: 25, day: 'Tuesday', startTime: '11:00', endTime: '19:00', availability: false },
    { id: 26, day: 'Thursday', startTime: '11:00', endTime: '19:00', availability: true },
    { id: 27, day: 'Friday', startTime: '11:00', endTime: '19:00', availability: true }
  ],
  7: [ // Dr. Robert Taylor (Ophthalmologist)
    { id: 28, day: 'Monday', startTime: '08:30', endTime: '16:30', availability: true },
    { id: 29, day: 'Tuesday', startTime: '08:30', endTime: '16:30', availability: true },
    { id: 30, day: 'Wednesday', startTime: '08:30', endTime: '16:30', availability: true },
    { id: 31, day: 'Thursday', startTime: '08:30', endTime: '16:30', availability: true }
  ],
  8: [ // Dr. Maria Garcia (Endocrinologist)
    { id: 32, day: 'Tuesday', startTime: '09:00', endTime: '17:00', availability: true },
    { id: 33, day: 'Wednesday', startTime: '09:00', endTime: '17:00', availability: true },
    { id: 34, day: 'Thursday', startTime: '09:00', endTime: '17:00', availability: true },
    { id: 35, day: 'Friday', startTime: '09:00', endTime: '17:00', availability: true }
  ],
  9: [ // Dr. James Lee (Gastroenterologist)
    { id: 36, day: 'Monday', startTime: '08:00', endTime: '16:00', availability: true },
    { id: 37, day: 'Wednesday', startTime: '08:00', endTime: '16:00', availability: true },
    { id: 38, day: 'Friday', startTime: '08:00', endTime: '16:00', availability: true },
    { id: 39, day: 'Saturday', startTime: '10:00', endTime: '14:00', availability: true }
  ],
  10: [ // Dr. Patricia Moore (Oncologist)
    { id: 40, day: 'Monday', startTime: '07:30', endTime: '15:30', availability: true },
    { id: 41, day: 'Tuesday', startTime: '07:30', endTime: '15:30', availability: true },
    { id: 42, day: 'Wednesday', startTime: '07:30', endTime: '15:30', availability: false },
    { id: 43, day: 'Thursday', startTime: '07:30', endTime: '15:30', availability: true },
    { id: 44, day: 'Friday', startTime: '07:30', endTime: '15:30', availability: true }
  ],
  11: [ // Dr. Thomas Wright (Urologist)
    { id: 45, day: 'Monday', startTime: '09:00', endTime: '17:00', availability: true },
    { id: 46, day: 'Tuesday', startTime: '09:00', endTime: '17:00', availability: true },
    { id: 47, day: 'Thursday', startTime: '09:00', endTime: '17:00', availability: true },
    { id: 48, day: 'Friday', startTime: '09:00', endTime: '13:00', availability: true }
  ],
  12: [ // Dr. Jennifer Martinez (Rheumatologist)
    { id: 49, day: 'Monday', startTime: '10:00', endTime: '18:00', availability: true },
    { id: 50, day: 'Wednesday', startTime: '10:00', endTime: '18:00', availability: true },
    { id: 51, day: 'Friday', startTime: '10:00', endTime: '18:00', availability: true }
  ],
  13: [ // Dr. William Turner (Pulmonologist)
    { id: 52, day: 'Tuesday', startTime: '08:00', endTime: '16:00', availability: true },
    { id: 53, day: 'Wednesday', startTime: '08:00', endTime: '16:00', availability: true },
    { id: 54, day: 'Thursday', startTime: '08:00', endTime: '16:00', availability: true },
    { id: 55, day: 'Friday', startTime: '08:00', endTime: '16:00', availability: true }
  ],
  14: [ // Dr. Elizabeth White (Allergist)
    { id: 56, day: 'Monday', startTime: '09:00', endTime: '17:00', availability: true },
    { id: 57, day: 'Tuesday', startTime: '09:00', endTime: '17:00', availability: false },
    { id: 58, day: 'Wednesday', startTime: '09:00', endTime: '17:00', availability: true },
    { id: 59, day: 'Thursday', startTime: '09:00', endTime: '17:00', availability: true }
  ],
  15: [ // Dr. Richard Harris (Nephrologist)
    { id: 60, day: 'Monday', startTime: '08:30', endTime: '16:30', availability: true },
    { id: 61, day: 'Tuesday', startTime: '08:30', endTime: '16:30', availability: true },
    { id: 62, day: 'Wednesday', startTime: '08:30', endTime: '16:30', availability: true },
    { id: 63, day: 'Thursday', startTime: '08:30', endTime: '16:30', availability: true },
    { id: 64, day: 'Friday', startTime: '08:30', endTime: '12:30', availability: true }
  ],
  16: [ // Dr. Susan Clark (Hematologist)
    { id: 65, day: 'Monday', startTime: '10:30', endTime: '18:30', availability: true },
    { id: 66, day: 'Tuesday', startTime: '10:30', endTime: '18:30', availability: true },
    { id: 67, day: 'Thursday', startTime: '10:30', endTime: '18:30', availability: true },
    { id: 68, day: 'Friday', startTime: '10:30', endTime: '18:30', availability: true }
  ],
  17: [ // Dr. Joseph Rodriguez (Plastic Surgeon)
    { id: 69, day: 'Monday', startTime: '07:00', endTime: '15:00', availability: true },
    { id: 70, day: 'Wednesday', startTime: '07:00', endTime: '15:00', availability: true },
    { id: 71, day: 'Friday', startTime: '07:00', endTime: '15:00', availability: true }
  ],
  18: [ // Dr. Margaret Lewis (Family Medicine)
    { id: 72, day: 'Monday', startTime: '09:00', endTime: '17:00', availability: true },
    { id: 73, day: 'Tuesday', startTime: '09:00', endTime: '17:00', availability: true },
    { id: 74, day: 'Wednesday', startTime: '09:00', endTime: '17:00', availability: true },
    { id: 75, day: 'Thursday', startTime: '09:00', endTime: '17:00', availability: true },
    { id: 76, day: 'Friday', startTime: '09:00', endTime: '17:00', availability: true },
    { id: 77, day: 'Saturday', startTime: '09:00', endTime: '13:00', availability: true }
  ],
  19: [ // Dr. Christopher King (Emergency Medicine)
    { id: 78, day: 'Monday', startTime: '07:00', endTime: '19:00', availability: true },
    { id: 79, day: 'Wednesday', startTime: '07:00', endTime: '19:00', availability: true },
    { id: 80, day: 'Friday', startTime: '07:00', endTime: '19:00', availability: true },
    { id: 81, day: 'Sunday', startTime: '07:00', endTime: '19:00', availability: true }
  ],
  20: [ // Dr. Nancy Scott (Internal Medicine)
    { id: 82, day: 'Monday', startTime: '08:00', endTime: '16:00', availability: true },
    { id: 83, day: 'Tuesday', startTime: '08:00', endTime: '16:00', availability: true },
    { id: 84, day: 'Wednesday', startTime: '08:00', endTime: '16:00', availability: true },
    { id: 85, day: 'Thursday', startTime: '08:00', endTime: '16:00', availability: true },
    { id: 86, day: 'Friday', startTime: '08:00', endTime: '16:00', availability: true }
  ]
};

const fetchSchedule = async () => {
  if (selectedDoctor.value) {
    try {
      // Show loading
      $q.loading.show({
        message: 'Loading doctor schedule...'
      })
      
      // Clear current schedule
      schedule.value = [];
      
      // Get doctor ID
      const doctorId = selectedDoctor.value.id;
      console.log('Selected doctor ID:', doctorId);
      
      // Fetch schedule from store
      schedule.value = await doctorStore.fetchDoctorSchedule(doctorId);
      console.log('Loaded schedule:', schedule.value);
      
      // Show notification
      $q.notify({
        color: 'positive',
        position: 'top',
        message: `Loaded schedule for ${selectedDoctor.value.name}`,
        icon: 'event_available'
      })
    } catch (error) {
      console.error('Error loading schedule:', error);
      
      // Fallback to static schedule if store method fails
      if (doctorSchedules[selectedDoctor.value.id]) {
        schedule.value = [...doctorSchedules[selectedDoctor.value.id]];
        console.log('Using fallback schedule from static data');
      } else {
        // Default schedule if not found
        schedule.value = [
          { id: 1, day: 'Monday', startTime: '09:00', endTime: '17:00', availability: true },
          { id: 2, day: 'Tuesday', startTime: '09:00', endTime: '17:00', availability: true },
          { id: 3, day: 'Wednesday', startTime: '09:00', endTime: '17:00', availability: true },
          { id: 4, day: 'Thursday', startTime: '09:00', endTime: '17:00', availability: true },
          { id: 5, day: 'Friday', startTime: '09:00', endTime: '17:00', availability: true }
        ];
        console.log('Using default schedule');
      }
      
      $q.notify({
        color: 'warning',
        position: 'top',
        message: 'Using backup schedule data',
        icon: 'warning'
      })
    } finally {
      // Hide loading
      $q.loading.hide()
    }
  }
}

// Initialize data on component mount
onMounted(async () => {
  try {
    // Fetch doctors if not already loaded
    if (doctors.value.length === 0) {
      await doctorStore.fetchDoctors()
    }
    
    // Set a default doctor (first in the list) if none is selected
    if (!selectedDoctor.value && doctors.value.length > 0) {
      selectedDoctor.value = doctors.value[0]
      // Fetch schedule for the default doctor
      await fetchSchedule()
    }
  } catch (error) {
    console.error('Error initializing doctor schedule page:', error)
  }
})
</script>

<style scoped>
.q-table__card {
  border-radius: 10px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}

.doctor-card {
  transition: all 0.3s ease;
}

.doctor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.text-h4 {
  color: #1976d2;
  font-weight: 500;
  margin-bottom: 1rem;
}

.text-h6 {
  color: #1976d2;
  font-weight: 500;
}

.q-table {
  border-radius: 10px;
  overflow: hidden;
}

.q-table th {
  font-weight: 600;
  background-color: #f5f5f5;
}

.q-table tr:hover {
  background-color: #f0f8ff !important;
}
</style>
<template>
  <q-page padding>
    <!-- Doctor Profile Overview -->
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-4">
        <q-card class="doctor-profile">
          <q-card-section>
            <div class="text-center">
              <q-avatar size="100px">
                <img src="https://cdn.quasar.dev/img/avatar.png">
              </q-avatar>
              <h5 class="q-mt-md q-mb-xs">Dr. John Doe</h5>
              <div class="text-subtitle2">Cardiologist</div>
            </div>
            <q-list dense>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Qualification</q-item-label>
                  <q-item-label>MBBS, MD (Cardiology)</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Experience</q-item-label>
                  <q-item-label>15 Years</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Availability</q-item-label>
                  <q-item-label>Mon-Fri, 9:00 AM - 5:00 PM</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <!-- Analytics Section -->
      <div class="col-12 col-md-8">
        <q-card>
          <q-card-section>
            <div class="text-h6">Analytics Overview</div>
            <canvas id="analyticsChart"></canvas>
          </q-card-section>
        </q-card>
      </div>

      <!-- Today's Appointments -->
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Today's Appointments</div>
            <q-list separator>
              <q-item v-for="appointment in todayAppointments" :key="appointment.id">
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="appointment.patientAvatar">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ appointment.patientName }}</q-item-label>
                  <q-item-label caption>{{ appointment.time }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn-group flat>
                    <q-btn flat round color="primary" icon="visibility" />
                    <q-btn flat round color="green" icon="check" />
                    <q-btn flat round color="red" icon="close" />
                  </q-btn-group>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <!-- Pending Appointments -->
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Pending Requests</div>
            <q-list separator>
              <q-item v-for="request in pendingRequests" :key="request.id">
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="request.patientAvatar">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ request.patientName }}</q-item-label>
                  <q-item-label caption>{{ request.requestedDate }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn-group flat>
                    <q-btn flat round color="green" icon="check" />
                    <q-btn flat round color="red" icon="close" />
                  </q-btn-group>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Quick Action Buttons -->
    <div class="fixed-bottom-right q-pa-md">
      <q-fab
        color="primary"
        icon="more_vert"
        direction="up"
      >
        <q-fab-action color="primary" icon="schedule" label="Manage Schedule" />
        <q-fab-action color="secondary" icon="history" label="Patient History" />
        <q-fab-action color="accent" icon="edit" label="Write Prescription" />
      </q-fab>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'

const todayAppointments = ref([
  {
    id: 1,
    patientName: 'Alice Johnson',
    time: '10:00 AM',
    patientAvatar: 'https://cdn.quasar.dev/img/avatar2.jpg'
  },
  {
    id: 2,
    patientName: 'Bob Smith',
    time: '11:30 AM',
    patientAvatar: 'https://cdn.quasar.dev/img/avatar3.jpg'
  },
  {
    id: 3,
    patientName: 'Carol White',
    time: '2:00 PM',
    patientAvatar: 'https://cdn.quasar.dev/img/avatar4.jpg'
  }
])

const pendingRequests = ref([
  {
    id: 1,
    patientName: 'David Brown',
    requestedDate: 'Tomorrow, 10:00 AM',
    patientAvatar: 'https://cdn.quasar.dev/img/avatar5.jpg'
  },
  {
    id: 2,
    patientName: 'Eva Green',
    requestedDate: 'Next Monday, 2:30 PM',
    patientAvatar: 'https://cdn.quasar.dev/img/avatar6.jpg'
  }
])

onMounted(() => {
  const ctx = document.getElementById('analyticsChart')
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [
        {
          label: 'Patients Seen',
          data: [12, 19, 15, 17, 14],
          backgroundColor: '#1976D2'
        },
        {
          label: 'Average Rating',
          data: [4.5, 4.8, 4.6, 4.7, 4.9],
          backgroundColor: '#26A69A'
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
})
</script>

<style scoped>
.fixed-bottom-right {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>

<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <div class="text-h4">Reports & Analytics</div>
      </div>

      <!-- Monthly Stats Chart (Bar) -->
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Monthly Appointments (Bar)</div>
            <canvas ref="monthlyStatsRef"></canvas>
          </q-card-section>
        </q-card>
      </div>

      <!-- Doctor Performance (Bar) -->
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Doctor Performance (Bar)</div>
            <canvas ref="doctorPerformanceRef"></canvas>
          </q-card-section>
        </q-card>
      </div>

      <!-- Appointment Trend Line Chart -->
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Appointment Trend (Line)</div>
            <canvas ref="appointmentTrendRef"></canvas>
          </q-card-section>
        </q-card>
      </div>

      <!-- Appointment Status Pie Chart -->
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Appointment Status Distribution</div>
            <canvas ref="appointmentStatusRef"></canvas>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useReportsStore } from 'stores/reports'
import Chart from 'chart.js/auto'

// Store setup
const reportsStore = useReportsStore()
const { monthlyStats, doctorPerformance, appointmentStatus } = storeToRefs(reportsStore)

// Refs for canvas elements
const monthlyStatsRef = ref(null)
const doctorPerformanceRef = ref(null)
const appointmentTrendRef = ref(null)
const appointmentStatusRef = ref(null)

// Chart rendering on mount
onMounted(async () => {
  await reportsStore.fetchMonthlyStats()
  await reportsStore.fetchDoctorPerformance()
  await reportsStore.fetchAppointmentStatus()

  // Monthly Stats - Bar Chart
  new Chart(monthlyStatsRef.value, {
    type: 'bar',
    data: {
      labels: monthlyStats.value.map(stat => stat.month),
      datasets: [
        {
          label: 'Total Appointments',
          data: monthlyStats.value.map(stat => stat.appointments),
          backgroundColor: '#42A5F5',
          borderColor: '#1976D2',
          borderWidth: 1
        },
        {
          label: 'Completed',
          data: monthlyStats.value.map(stat => stat.completed),
          backgroundColor: '#66BB6A',
          borderColor: '#388E3C',
          borderWidth: 1
        },
        {
          label: 'Cancelled',
          data: monthlyStats.value.map(stat => stat.cancelled),
          backgroundColor: '#EF5350',
          borderColor: '#D32F2F',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Monthly Appointment Statistics' }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Number of Appointments' }
        }
      }
    }
  })

  // Doctor Performance - Bar + Line Chart
  new Chart(doctorPerformanceRef.value, {
    type: 'bar',
    data: {
      labels: doctorPerformance.value.map(doc => doc.doctorName),
      datasets: [
        {
          label: 'Appointments',
          data: doctorPerformance.value.map(doc => doc.appointments),
          backgroundColor: '#66BB6A',
          borderColor: '#388E3C',
          borderWidth: 1,
          yAxisID: 'y'
        },
        {
          label: 'Rating',
          data: doctorPerformance.value.map(doc => doc.rating),
          backgroundColor: '#FFB74D',
          borderColor: '#F57C00',
          borderWidth: 1,
          type: 'line',
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Doctor Performance Overview' }
      },
      scales: {
        y: {
          beginAtZero: true,
          position: 'left',
          title: { display: true, text: 'Number of Appointments' }
        },
        y1: {
          beginAtZero: true,
          position: 'right',
          title: { display: true, text: 'Rating' },
          min: 0,
          max: 5,
          grid: { drawOnChartArea: false }
        }
      }
    }
  })

  // Appointment Trend - Line Chart
  new Chart(appointmentTrendRef.value, {
    type: 'line',
    data: {
      labels: monthlyStats.value.map(stat => stat.month),
      datasets: [{
        label: 'Appointments Over Time',
        data: monthlyStats.value.map(stat => stat.appointments),
        borderColor: '#FF7043',
        backgroundColor: 'rgba(255, 112, 67, 0.1)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Appointment Trend Analysis' }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Number of Appointments' }
        }
      }
    }
  })

  // Appointment Status - Pie Chart
  new Chart(appointmentStatusRef.value, {
    type: 'pie',
    data: {
      labels: ['Confirmed', 'Pending', 'Cancelled'],
      datasets: [{
        data: [
          appointmentStatus.value.confirmed,
          appointmentStatus.value.pending,
          appointmentStatus.value.cancelled
        ],
        backgroundColor: ['#4CAF50', '#FFC107', '#EF5350'],
        borderColor: ['#388E3C', '#FFA000', '#D32F2F'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Appointment Status Distribution' }
      }
    }
  })
})
</script>

  
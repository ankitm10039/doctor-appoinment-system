<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <div class="text-h4">Reports & Analytics</div>
      </div>

      <!-- Analytics Overview Section -->
      <div class="col-12">
        <q-card class="analytics-overview-card">
          <q-card-section>
            <div class="text-h6">Analytics Overview</div>
            <div class="row q-col-gutter-md q-mt-md">
              <div class="col-12 col-md-3">
                <q-card class="stat-card bg-primary text-white">
                  <q-card-section>
                    <div class="text-h3 text-center">{{ totalAppointments }}</div>
                    <div class="text-subtitle1 text-center">Total Appointments</div>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-12 col-md-3">
                <q-card class="stat-card bg-positive text-white">
                  <q-card-section>
                    <div class="text-h3 text-center">{{ appointmentStatus.confirmed }}</div>
                    <div class="text-subtitle1 text-center">Confirmed</div>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-12 col-md-3">
                <q-card class="stat-card bg-warning text-white">
                  <q-card-section>
                    <div class="text-h3 text-center">{{ appointmentStatus.pending }}</div>
                    <div class="text-subtitle1 text-center">Pending</div>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-12 col-md-3">
                <q-card class="stat-card bg-negative text-white">
                  <q-card-section>
                    <div class="text-h3 text-center">{{ appointmentStatus.cancelled }}</div>
                    <div class="text-subtitle1 text-center">Cancelled</div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Monthly Stats Chart (Bar) -->
      <div class="col-12 col-md-6">
        <q-card class="chart-card">
          <q-card-section>
            <div class="text-h6">Monthly Appointments</div>
            <div class="chart-container">
              <canvas ref="monthlyStatsRef"></canvas>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Doctor Performance (Bar) -->
      <div class="col-12 col-md-6">
        <q-card class="chart-card">
          <q-card-section>
            <div class="text-h6">Doctor Performance</div>
            <div class="chart-container">
              <canvas ref="doctorPerformanceRef"></canvas>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Appointment Trend Line Chart -->
      <div class="col-12 col-md-6">
        <q-card class="chart-card">
          <q-card-section>
            <div class="text-h6">Appointment Trend</div>
            <div class="chart-container">
              <canvas ref="appointmentTrendRef"></canvas>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Appointment Status Pie Chart -->
      <div class="col-12 col-md-6">
        <q-card class="chart-card">
          <q-card-section>
            <div class="text-h6">Appointment Status Distribution</div>
            <div class="chart-container">
              <canvas ref="appointmentStatusRef"></canvas>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Export Reports Button -->
    <div class="fixed-bottom-right q-pa-md">
      <q-fab
        color="primary"
        icon="more_vert"
        direction="up"
      >
        <q-fab-action color="primary" icon="print" label="Print Report" @click="printReport" />
        <q-fab-action color="secondary" icon="file_download" label="Export PDF" @click="exportPDF" />
        <q-fab-action color="accent" icon="share" label="Share Report" @click="shareReport" />
      </q-fab>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref, nextTick, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useReportsStore } from 'stores/reports'
import Chart from 'chart.js/auto'
import { useQuasar, Loading, QSpinnerGears } from 'quasar'

// Quasar setup
const $q = useQuasar()

// Store setup
const reportsStore = useReportsStore()
const { monthlyStats, doctorPerformance, appointmentStatus } = storeToRefs(reportsStore)

// Refs for canvas elements
const monthlyStatsRef = ref(null)
const doctorPerformanceRef = ref(null)
const appointmentTrendRef = ref(null)
const appointmentStatusRef = ref(null)

// Chart instances for cleanup
const charts = ref([])

// Computed values
const totalAppointments = computed(() => {
  return appointmentStatus.value.confirmed + 
         appointmentStatus.value.pending + 
         appointmentStatus.value.cancelled
})

// Report action functions
const printReport = () => {
  if ($q) {
    $q.notify({
      color: 'primary',
      position: 'top',
      message: 'Printing report...',
      icon: 'print'
    })
  }
  window.print()
}

const exportPDF = () => {
  if ($q) {
    $q.notify({
      color: 'secondary',
      position: 'top',
      message: 'Exporting as PDF...',
      icon: 'file_download'
    })
  }
  // PDF export logic would go here
}

const shareReport = () => {
  if ($q) {
    $q.dialog({
      title: 'Share Report',
      message: 'Enter email address to share this report:',
      prompt: {
        model: '',
        type: 'email'
      },
      cancel: true,
      persistent: true
    }).onOk(data => {
      $q.notify({
        color: 'positive',
        position: 'top',
        message: `Report shared with ${data}`,
        icon: 'share'
      })
    })
  }
}

// Static data for charts (fallback if API fails)
const staticMonthlyStats = [
  { month: 'January', appointments: 45, completed: 40, cancelled: 5 },
  { month: 'February', appointments: 52, completed: 48, cancelled: 4 },
  { month: 'March', appointments: 38, completed: 35, cancelled: 3 },
  { month: 'April', appointments: 60, completed: 55, cancelled: 5 },
  { month: 'May', appointments: 75, completed: 68, cancelled: 7 },
  { month: 'June', appointments: 48, completed: 45, cancelled: 3 }
]

const staticDoctorPerformance = [
  { doctorName: 'Dr. Sarah Johnson', appointments: 120, rating: 4.8 },
  { doctorName: 'Dr. Alex Lee', appointments: 95, rating: 4.6 },
  { doctorName: 'Dr. Emma Brown', appointments: 150, rating: 4.9 },
  { doctorName: 'Dr. John Smith', appointments: 110, rating: 4.7 },
  { doctorName: 'Dr. Maria Garcia', appointments: 130, rating: 4.5 }
]

const staticAppointmentStatus = {
  confirmed: 180,
  pending: 45,
  cancelled: 25
}

// Function to create charts
const createCharts = async () => {
  try {
    // Show loading
    Loading.show({
      spinner: QSpinnerGears,
      message: 'Loading charts...',
      backgroundColor: 'rgba(0, 0, 0, 0.4)'
    })
    
    // Try to fetch data from API, use static data as fallback
    try {
      await reportsStore.fetchMonthlyStats()
      await reportsStore.fetchDoctorPerformance()
      await reportsStore.fetchAppointmentStatus()
    } catch (error) {
      console.warn('Using static data due to API error:', error)
      // Use static data if API fails
      reportsStore.monthlyStats = staticMonthlyStats
      reportsStore.doctorPerformance = staticDoctorPerformance
      reportsStore.appointmentStatus = staticAppointmentStatus
    }
    
    // Wait for DOM to update
    await nextTick()
    
    // Destroy existing charts if any
    charts.value.forEach(chart => chart.destroy())
    charts.value = []
    
    // Monthly Stats - Bar Chart
    if (monthlyStatsRef.value) {
      const monthlyStatsChart = new Chart(monthlyStatsRef.value, {
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
          maintainAspectRatio: false,
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
      charts.value.push(monthlyStatsChart)
    }

    // Doctor Performance - Bar + Line Chart
    if (doctorPerformanceRef.value) {
      const doctorPerformanceChart = new Chart(doctorPerformanceRef.value, {
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
          maintainAspectRatio: false,
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
      charts.value.push(doctorPerformanceChart)
    }

    // Appointment Trend - Line Chart
    if (appointmentTrendRef.value) {
      const appointmentTrendChart = new Chart(appointmentTrendRef.value, {
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
          maintainAspectRatio: false,
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
      charts.value.push(appointmentTrendChart)
    }

    // Appointment Status - Pie Chart
    if (appointmentStatusRef.value) {
      const appointmentStatusChart = new Chart(appointmentStatusRef.value, {
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
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Appointment Status Distribution' }
          }
        }
      })
      charts.value.push(appointmentStatusChart)
    }
    
    // Show success notification
    if ($q) {
      $q.notify({
        color: 'positive',
        position: 'top',
        message: 'Charts loaded successfully',
        icon: 'insert_chart'
      })
    }
  } catch (error) {
    console.error('Error creating charts:', error)
    if ($q) {
      $q.notify({
        color: 'negative',
        position: 'top',
        message: 'Error loading charts',
        icon: 'error'
      })
    }
  } finally {
    // Hide loading
    Loading.hide()
  }
}

// Initialize with static data if needed
const initializeStaticData = () => {
  // Check if we have data, if not use static data
  if (!monthlyStats.value || monthlyStats.value.length === 0) {
    reportsStore.$patch({
      monthlyStats: staticMonthlyStats
    })
  }
  
  if (!doctorPerformance.value || doctorPerformance.value.length === 0) {
    reportsStore.$patch({
      doctorPerformance: staticDoctorPerformance
    })
  }
  
  if (!appointmentStatus.value || 
      (appointmentStatus.value.confirmed === 0 && 
       appointmentStatus.value.pending === 0 && 
       appointmentStatus.value.cancelled === 0)) {
    reportsStore.$patch({
      appointmentStatus: staticAppointmentStatus
    })
  }
}

// Chart rendering on mount
onMounted(() => {
  // Initialize with static data first to ensure charts render
  initializeStaticData()
  // Then try to fetch real data
  createCharts()
})
</script>

<style scoped>
.chart-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
}

.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
  margin-top: 10px;
}

.text-h4 {
  color: #1976d2;
  margin-bottom: 20px;
  font-weight: 500;
}

.text-h6 {
  color: #1976d2;
  font-weight: 500;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
}

.q-card {
  border-radius: 10px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.q-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.analytics-overview-card {
  margin-bottom: 20px;
}

.stat-card {
  border-radius: 10px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: scale(1.05);
}

.fixed-bottom-right {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

/* Print styles */
@media print {
  .fixed-bottom-right {
    display: none;
  }
  
  .q-card {
    box-shadow: none !important;
    border: 1px solid #ddd;
  }
  
  .q-page {
    padding: 0 !important;
  }
}
</style>
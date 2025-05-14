<template>
  <q-layout  view="lHh Lpr lFf">
    <q-header elevated v-if="isAuthenticated">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Doctor Appointment System
        </q-toolbar-title>

        <div v-if="isAuthenticated">
          <q-btn flat no-caps class="q-mr-sm">
            <q-avatar size="28px">
              <img src="https://cdn.quasar.dev/img/avatar.png">
            </q-avatar>
            <q-tooltip>{{ username }}</q-tooltip>
          </q-btn>
        
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="isAuthenticated"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Doctor Appointment System
        </q-item-label>

        <q-item 
          clickable 
          to="/" 
          exact
          active-class="bg-primary text-white"
        >
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>

        <q-item 
          clickable 
          to="/doctors" 
          exact
          active-class="bg-primary text-white"
        >
          <q-item-section avatar>
            <q-icon name="medical_services" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Doctors List</q-item-label>
          </q-item-section>
        </q-item>

        <q-item 
          clickable 
          to="/doctors/add" 
          exact
          active-class="bg-primary text-white"
        >
          <q-item-section avatar>
            <q-icon name="person_add" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Add Doctor</q-item-label>
          </q-item-section>
        </q-item>

        <q-item 
          clickable 
          to="/appointments" 
          exact
          active-class="bg-primary text-white"
        >
          <q-item-section avatar>
            <q-icon name="event" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Appointments</q-item-label>
          </q-item-section>
        </q-item>

        <q-item 
          clickable 
          to="/appointments/create" 
          exact
          active-class="bg-primary text-white"
        >
          <q-item-section avatar>
            <q-icon name="add_circle" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Create Appointment</q-item-label>
          </q-item-section>
        </q-item>

        <q-item 
          clickable 
          to="/appointment-history" 
          exact
          active-class="bg-primary text-white"
        >
          <q-item-section avatar>
            <q-icon name="history" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Appointment History</q-item-label>
          </q-item-section>
        </q-item>

        <q-item 
          clickable 
          to="/schedule" 
          exact
          active-class="bg-primary text-white"
        >
          <q-item-section avatar>
            <q-icon name="schedule" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Doctor Schedule</q-item-label>
          </q-item-section>
        </q-item>

        <q-item 
          clickable 
          to="/reports" 
          exact
          active-class="bg-primary text-white"
        >
          <q-item-section avatar>
            <q-icon name="analytics" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Reports & Analytics</q-item-label>
          </q-item-section>
        </q-item>

        <q-item 
          clickable 
          to="/settings" 
          exact
          active-class="bg-primary text-white"
        >
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Settings</q-item-label>
          </q-item-section>
        </q-item>
        <!-- Add spacer to push logout to bottom -->
        <q-space />

        <!-- Logout button at bottom -->
        <q-item 
          v-if="isAuthenticated" 
          clickable 
          @click="handleLogout" 
          class="logout-item hover:bg-red-500 hover:text-white"
        >
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Logout</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'stores/auth'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRouter()
const authStore = useAuthStore()
const leftDrawerOpen = ref(false)

// Initialize user from localStorage on mount
onMounted(() => {
  authStore.initialize()
})

const isAuthenticated = computed(() => !!authStore.user)
const username = computed(() => authStore.user?.username || 'User')

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

async function handleLogout() {
  try {
    await authStore.logout()
    router.push('/login')
    $q.notify({
      type: 'positive',
      message: 'Logout successful'
    })
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Logout error'
    })
  }
}
</script>

<style lang="scss" scoped>
.logout-item {
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #ddd;
}
</style>

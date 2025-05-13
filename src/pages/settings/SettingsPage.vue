<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <div class="text-h4">Settings</div>
      </div>

      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">App Preferences</div>
            <q-form @submit="saveSettings" class="q-gutter-md">
              <q-select
                v-model="settings.theme"
                :options="['light', 'dark']"
                label="Theme"
              />
              <q-select
                v-model="settings.language"
                :options="['en', 'hi']"
                label="Language"
              />
              <q-toggle
                v-model="settings.notifications"
                label="Enable Notifications"
              />
              <q-btn
                type="submit"
                rounded
                color="primary"
                class="text-capitalize"
                label="Save Settings"
              />
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useSettingsStore } from 'stores/settings'
import { useQuasar } from 'quasar'

const settingsStore = useSettingsStore()
const $q = useQuasar()

const settings = ref({
  theme: settingsStore.theme,
  language: settingsStore.language,
  notifications: settingsStore.notifications
})

const saveSettings = async () => {
  try {
    await settingsStore.updateSettings(settings.value)
    $q.notify({
      type: 'positive',
      message: 'Settings saved successfully'
    })
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Failed to save settings'
    })
  }
}
</script>
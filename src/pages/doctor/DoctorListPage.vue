<template>
    <q-page padding>
      <div class="row q-mb-md">
      
        <div class="col-12 col-md-6">
          
          <q-btn
            color="primary"
            icon="add"
            rounded
            label="Add New Doctor"
            :to="{ name: 'doctor-add' }"
            class="q-mt-sm text-capitalize"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            v-model="searchQuery"
            label="Search doctors"
            color="primary"
            debounce="300"  
            outlined
            class="q-mb-md"
          />
        </div>
      </div>
  
      <!-- Doctors Table -->
      <q-table
        :rows="filteredDoctors"
        :columns="columns"
        row-key="id"
        :loading="loading"
      >
        <template v-slot:body-cell-avatar="props">
          <q-td :props="props">
            <q-avatar>
              <img :src="props.row.avatar">
            </q-avatar>
          </q-td>
        </template>
  
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn-group flat>
              <q-btn
                flat
                round
                color="primary"
                icon="visibility"
                @click="showDoctorDetails(props.row)"
              />
              <q-btn
                flat
                round
                color="warning"
                icon="edit"
                @click="showEditModal(props.row)"
              />
              <q-btn
                flat
                round
                color="negative"
                icon="delete"
                @click="confirmDelete(props.row)"
              />
            </q-btn-group>
          </q-td>
        </template>
      </q-table>
  
      <!-- Delete Confirmation Dialog -->
      <q-dialog v-model="confirmDeleteDialog">
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="warning" color="negative" text-color="white" />
            <span class="q-ml-sm">Are you sure you want to delete this doctor?</span>
          </q-card-section>
  
          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Delete" color="negative" @click="deleteSelectedDoctor" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Doctor Details Modal -->
      <q-dialog v-model="doctorDetailsDialog" persistent>
        <q-card class="doctor-details-card shadow-lg">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6 font-bold">Doctor Details</div>
            <q-btn icon="close" flat round dense v-close-popup class="absolute-right" />
          </q-card-section>

          <q-card-section v-if="selectedDoctor" class="q-pt-none">
            <div class="row q-col-gutter-md q-mt-md">
              <!-- Doctor Avatar and Basic Info -->
              <div class="col-12 col-md-4 flex flex-center column items-center">
                <q-avatar size="150px" class="q-mb-md shadow-lg rounded-full border-4 border-primary">
                  <img :src="selectedDoctor.avatar">
                </q-avatar>
                <div class="text-h5 text-weight-bold text-center text-primary">{{ selectedDoctor.name }}</div>
                <div class="text-subtitle1 text-gray-700 text-center font-medium">{{ selectedDoctor.specialization }}</div>
                <q-badge color="secondary" class="q-mt-sm text-subtitle1 py-1 px-2">
                  {{ selectedDoctor.experience }} Experience
                </q-badge>
              </div>

              <!-- Doctor Contact and Additional Info -->
              <div class="col-12 col-md-8">
                <q-list bordered separator class="rounded-lg shadow-sm">
                  <q-item class="hover:bg-blue-50">
                    <q-item-section avatar>
                      <q-icon name="email" color="primary" size="md" class="bg-blue-100 p-1 rounded-full" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-gray-500">Email</q-item-label>
                      <q-item-label class="text-primary font-medium">{{ selectedDoctor.email }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="hover:bg-blue-50">
                    <q-item-section avatar>
                      <q-icon name="phone" color="green" size="md" class="bg-green-100 p-1 rounded-full" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-gray-500">Phone</q-item-label>
                      <q-item-label class="text-green-600 font-medium">{{ selectedDoctor.phone }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="hover:bg-blue-50">
                    <q-item-section avatar>
                      <q-icon name="work" color="amber" size="md" class="bg-amber-100 p-1 rounded-full" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-gray-500">Experience</q-item-label>
                      <q-item-label class="text-amber-700 font-medium">{{ selectedDoctor.experience }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="hover:bg-blue-50">
                    <q-item-section avatar>
                      <q-icon name="medical_services" color="purple" size="md" class="bg-purple-100 p-1 rounded-full" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-gray-500">Specialization</q-item-label>
                      <q-item-label class="text-purple-600 font-medium">{{ selectedDoctor.specialization }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>

            <!-- Additional Information Section -->
            <div class="q-mt-md">
              <div class="text-h6 q-mb-sm">About Doctor</div>
              <p class="text-body1">
                {{ selectedDoctor.bio || `${selectedDoctor.name} is a highly skilled ${selectedDoctor.specialization} with ${selectedDoctor.experience} 
                of experience in the field. They are dedicated to providing exceptional patient care and 
                staying up-to-date with the latest medical advancements.` }}
              </p>
            </div>

            <!-- Education Section (if available) -->
            <div v-if="selectedDoctor.education" class="q-mt-md">
              <div class="text-h6 q-mb-sm">Education & Training</div>
              <q-list dense>
                <q-item v-for="(edu, index) in selectedDoctor.education" :key="index">
                  <q-item-section avatar>
                    <q-icon name="school" color="primary" />
                  </q-item-section>
                  <q-item-section>{{ edu }}</q-item-section>
                </q-item>
              </q-list>
            </div>

            <!-- Languages Section (if available) -->
            <div v-if="selectedDoctor.languages" class="q-mt-md">
              <div class="text-h6 q-mb-sm">Languages</div>
              <div class="row q-col-gutter-sm">
                <div v-for="(lang, index) in selectedDoctor.languages" :key="index" class="col-auto">
                  <q-chip outline color="primary">{{ lang }}</q-chip>
                </div>
              </div>
            </div>

            <!-- Rating Section (if available) -->
            <div v-if="selectedDoctor.rating" class="q-mt-md">
              <div class="text-h6 q-mb-sm">Patient Rating</div>
              <div class="row items-center">
                <q-rating
                  v-model="selectedDoctor.rating"
                  size="2em"
                  color="amber"
                  readonly
                  :max="5"
                />
                <span class="q-ml-sm text-body1">{{ selectedDoctor.rating }} / 5</span>
              </div>
            </div>

            <!-- Availability Section -->
            <div class="q-mt-md">
              <div class="text-h6 q-mb-sm">Availability</div>
              <div class="row q-col-gutter-sm">
                <template v-if="selectedDoctor.availability">
                  <div v-for="(time, day) in selectedDoctor.availability" :key="day" class="col-12 col-sm-6 col-md-4">
                    <q-chip color="primary" text-color="white">
                      {{ day }}: {{ time }}
                    </q-chip>
                  </div>
                </template>
                <template v-else>
                  <div v-for="day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']" :key="day" class="col-12 col-sm-6 col-md-4">
                    <q-chip color="primary" text-color="white">
                      {{ day }}: 9:00 AM - 5:00 PM
                    </q-chip>
                  </div>
                </template>
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="bg-grey-1">
            <q-btn flat label="Close" color="primary" v-close-popup />
            <q-btn 
              label="View Schedule" 
              color="secondary" 
              icon="event"
              :to="{ name: 'schedule', params: { doctorId: selectedDoctor?.id } }" 
              v-close-popup
            />
            <q-btn 
              label="Book Appointment" 
              color="primary" 
              icon="add_circle"
              :to="{ name: 'appointment-create', params: { doctorId: selectedDoctor?.id } }" 
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Doctor Edit Modal -->
      <q-dialog v-model="doctorEditDialog" persistent>
        <q-card class="doctor-edit-card shadow-lg">
          <q-card-section class="bg-warning text-white">
            <div class="text-h6 font-bold">Edit Doctor Profile</div>
            <q-btn icon="close" flat round dense v-close-popup class="absolute-right" />
          </q-card-section>

          <q-card-section v-if="editingDoctor">
            <q-form @submit="updateDoctorProfile" class="q-gutter-md">
              <div class="row q-col-gutter-md">
                <!-- Left Column -->
                <div class="col-12 col-md-4 flex flex-center column items-center">
                  <q-avatar size="150px" class="q-mb-md shadow-lg rounded-full border-4 border-warning">
                    <img :src="editingDoctor.avatar">
                  </q-avatar>
                  
                  <q-input
                    v-model="editingDoctor.avatar"
                    label="Avatar URL"
                    outlined
                    dense
                    class="q-mt-md full-width"
                  />
                </div>

                <!-- Right Column -->
                <div class="col-12 col-md-8">
                  <q-input
                    v-model="editingDoctor.name"
                    label="Full Name"
                    outlined
                    :rules="[val => !!val || 'Name is required']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" color="primary" />
                    </template>
                  </q-input>

                  <q-input
                    v-model="editingDoctor.specialization"
                    label="Specialization"
                    outlined
                    :rules="[val => !!val || 'Specialization is required']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="medical_services" color="primary" />
                    </template>
                  </q-input>

                  <q-input
                    v-model="editingDoctor.experience"
                    label="Experience"
                    outlined
                    :rules="[val => !!val || 'Experience is required']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="work" color="primary" />
                    </template>
                  </q-input>

                  <q-input
                    v-model="editingDoctor.email"
                    label="Email"
                    type="email"
                    outlined
                    :rules="[
                      val => !!val || 'Email is required',
                      val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Invalid email format'
                    ]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="email" color="primary" />
                    </template>
                  </q-input>

                  <q-input
                    v-model="editingDoctor.phone"
                    label="Phone"
                    outlined
                    :rules="[val => !!val || 'Phone is required']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="phone" color="primary" />
                    </template>
                  </q-input>
                </div>
              </div>

              <!-- Bio Section -->
              <q-input
                v-model="editingDoctor.bio"
                label="Biography"
                type="textarea"
                outlined
                autogrow
              />

              <!-- Education Section -->
              <div class="q-mb-md">
                <div class="text-h6 q-mb-sm">Education & Training</div>
                <div v-for="(edu, index) in editingDoctor.education || []" :key="index" class="row q-mb-sm">
                  <div class="col">
                    <q-input
                      v-model="editingDoctor.education[index]"
                      outlined
                      dense
                      label="Education"
                    />
                  </div>
                  <div class="col-auto">
                    <q-btn
                      round
                      flat
                      color="negative"
                      icon="delete"
                      @click="removeEducation(index)"
                    />
                  </div>
                </div>
                <q-btn
                  color="primary"
                  label="Add Education"
                  icon="add"
                  @click="addEducation"
                  class="q-mt-sm"
                />
              </div>

              <!-- Languages Section -->
              <div class="q-mb-md">
                <div class="text-h6 q-mb-sm">Languages</div>
                <div v-for="(lang, index) in editingDoctor.languages || []" :key="index" class="row q-mb-sm">
                  <div class="col">
                    <q-input
                      v-model="editingDoctor.languages[index]"
                      outlined
                      dense
                      label="Language"
                    />
                  </div>
                  <div class="col-auto">
                    <q-btn
                      round
                      flat
                      color="negative"
                      icon="delete"
                      @click="removeLanguage(index)"
                    />
                  </div>
                </div>
                <q-btn
                  color="primary"
                  label="Add Language"
                  icon="add"
                  @click="addLanguage"
                  class="q-mt-sm"
                />
              </div>

              <!-- Rating Section -->
              <div class="q-mb-md">
                <div class="text-h6 q-mb-sm">Patient Rating</div>
                <q-rating
                  v-model="editingDoctor.rating"
                  size="2em"
                  color="amber"
                  :max="5"
                />
              </div>

              <!-- Availability Section -->
              <div class="q-mb-md">
                <div class="text-h6 q-mb-sm">Availability</div>
                <div v-for="day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']" :key="day" class="row q-mb-sm">
                  <div class="col-4">
                    <q-input
                      :label="day"
                      outlined
                      dense
                      readonly
                    />
                  </div>
                  <div class="col-8">
                    <q-input
                      v-model="editingDoctor.availability[day]"
                      outlined
                      dense
                      label="Hours"
                    />
                  </div>
                </div>
              </div>

              <div class="row justify-end q-mt-md">
                <q-btn label="Cancel" color="grey" flat v-close-popup class="q-mr-sm" />
                <q-btn label="Save Changes" type="submit" color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-page>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useDoctorStore } from 'stores/doctor'
  import { useQuasar } from 'quasar'
  
  const $q = useQuasar()
  const doctorStore = useDoctorStore()
  const confirmDeleteDialog = ref(false)
  const doctorDetailsDialog = ref(false)
  const doctorEditDialog = ref(false)
  const selectedDoctor = ref(null)
  const editingDoctor = ref(null)
  const searchQuery = ref('')  // Search query
  
  const columns = [
    { name: 'avatar', label: 'Avatar', field: 'avatar', align: 'center' },
    { name: 'name', label: 'Name', field: 'name', sortable: true },
    { name: 'specialization', label: 'Specialization', field: 'specialization', sortable: true },
    { name: 'experience', label: 'Experience', field: 'experience', sortable: true },
    { name: 'email', label: 'Email', field: 'email', sortable: true },
    { name: 'phone', label: 'Phone', field: 'phone', sortable: true },
    { name: 'actions', label: 'Actions', field: 'actions' }
  ]
  
  const { doctors, loading } = storeToRefs(doctorStore)
  
  onMounted(async () => {
    await doctorStore.fetchDoctors()
  })
  
  const filteredDoctors = computed(() => {
    return doctors.value.filter(doctor => {
      const searchText = searchQuery.value.toLowerCase()
      return (
        doctor.name.toLowerCase().includes(searchText) ||
        doctor.specialization.toLowerCase().includes(searchText) ||
        doctor.email.toLowerCase().includes(searchText) ||
        doctor.phone.includes(searchText)
      )
    })
  })
  
  const confirmDelete = (doctor) => {
    selectedDoctor.value = doctor
    confirmDeleteDialog.value = true
  }
  
  const deleteSelectedDoctor = async () => {
    if (selectedDoctor.value) {
      try {
        await doctorStore.deleteDoctor(selectedDoctor.value.id)
        $q.notify({
          type: 'positive',
          message: `${selectedDoctor.value.name} has been deleted successfully`
        })
        selectedDoctor.value = null
      } catch  {
        $q.notify({
          type: 'negative',
          message: 'Failed to delete doctor'
        })
      }
    }
  }

  const showDoctorDetails = async (doctor) => {
    try {
      // First set the basic doctor info we already have
      selectedDoctor.value = doctor
      doctorDetailsDialog.value = true
      
      // Then fetch the complete doctor details
      const detailedDoctor = await doctorStore.getDoctorById(doctor.id)
      
      // Update with complete details
      selectedDoctor.value = detailedDoctor
    } catch {
      $q.notify({
        type: 'negative',
        message: 'Failed to load doctor details'
      })
    }
  }

  const showEditModal = async (doctor) => {
    try {
      // Fetch complete doctor details
      const detailedDoctor = await doctorStore.getDoctorById(doctor.id)
      
      // Create a deep copy to avoid modifying the original data
      editingDoctor.value = JSON.parse(JSON.stringify(detailedDoctor))
      
      // Always ensure availability object is properly initialized
      editingDoctor.value.availability = {
        Monday: editingDoctor.value.availability?.Monday || '9:00 AM - 5:00 PM',
        Tuesday: editingDoctor.value.availability?.Tuesday || '9:00 AM - 5:00 PM',
        Wednesday: editingDoctor.value.availability?.Wednesday || '9:00 AM - 5:00 PM',
        Thursday: editingDoctor.value.availability?.Thursday || '9:00 AM - 5:00 PM',
        Friday: editingDoctor.value.availability?.Friday || '9:00 AM - 5:00 PM'
      }
      
      // Initialize education array if it doesn't exist
      if (!editingDoctor.value.education) {
        editingDoctor.value.education = []
      }
      
      // Initialize languages array if it doesn't exist
      if (!editingDoctor.value.languages) {
        editingDoctor.value.languages = []
      }
      
      // Open the edit dialog
      doctorEditDialog.value = true
    } catch {
      $q.notify({
        type: 'negative',
        message: 'Failed to load doctor details for editing'
      })
    }
  }

  const addEducation = () => {
    if (!editingDoctor.value.education) {
      editingDoctor.value.education = []
    }
    editingDoctor.value.education.push('')
  }

  const removeEducation = (index) => {
    editingDoctor.value.education.splice(index, 1)
  }

  const addLanguage = () => {
    if (!editingDoctor.value.languages) {
      editingDoctor.value.languages = []
    }
    editingDoctor.value.languages.push('')
  }

  const removeLanguage = (index) => {
    editingDoctor.value.languages.splice(index, 1)
  }

  const updateDoctorProfile = async () => {
    try {
      // Clean up empty values in arrays
      if (editingDoctor.value.education) {
        editingDoctor.value.education = editingDoctor.value.education.filter(edu => edu.trim() !== '')
      }
      
      if (editingDoctor.value.languages) {
        editingDoctor.value.languages = editingDoctor.value.languages.filter(lang => lang.trim() !== '')
      }
      
      // Update doctor in the store
      await doctorStore.updateDoctor(editingDoctor.value.id, editingDoctor.value)
      
      // Show success notification
      $q.notify({
        type: 'positive',
        message: `${editingDoctor.value.name}'s profile has been updated successfully`
      })
      
      // Close the edit dialog
      doctorEditDialog.value = false
      
      // If the details dialog is open, update the selected doctor
      if (doctorDetailsDialog.value && selectedDoctor.value && selectedDoctor.value.id === editingDoctor.value.id) {
        selectedDoctor.value = { ...editingDoctor.value }
      }
    } catch  {
      $q.notify({
        type: 'negative',
        message: 'Failed to update doctor profile'
      })
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .doctor-details-card,
  .doctor-edit-card {
    width: 700px;
    max-width: 90vw;
    border-radius: 12px;
  }

  @media (max-width: 600px) {
    .doctor-details-card,
    .doctor-edit-card {
      width: 95vw;
    }
  }

  /* Tailwind-inspired custom styles */
  :deep(.q-card) {
    @apply rounded-lg;
  }

  :deep(.q-item) {
    @apply transition-colors duration-200;
  }

  :deep(.q-chip) {
    @apply transition-all duration-200 hover:shadow-md;
  }

  :deep(.q-btn) {
    @apply transition-all duration-200;
  }

  :deep(.q-avatar) {
    @apply transition-all duration-300;
    
    &:hover {
      @apply transform scale-105;
    }
  }
  </style>
  
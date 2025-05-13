<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="text-h4 text-primary q-mb-md">Tailwind CSS Button Examples</div>
      <div class="text-subtitle1 q-mb-lg">
        This page demonstrates how to use Tailwind CSS classes to create various button styles.
      </div>
      
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h5 q-mb-md">Inline Tailwind Classes</div>
          <TailwindButtons />
        </q-card-section>
      </q-card>
      
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h5 q-mb-md">Custom Tailwind Components</div>
          <TailwindButtonsCustom />
        </q-card-section>
      </q-card>
      
      <q-card>
        <q-card-section>
          <div class="text-h5 q-mb-md">Custom Tailwind Buttons with Quasar Integration</div>
          
          <div class="flex flex-wrap gap-4 q-mb-md">
            <!-- Primary Button with Quasar Ripple -->
            <q-btn 
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold" 
              label="Quasar + Tailwind" 
            />
            
            <!-- Custom Tailwind Button with Quasar Features -->
            <button class="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl transition-all duration-200">
              Tailwind Button with Effects
            </button>
            
            <!-- Gradient Button -->
            <button class="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded">
              Gradient Button
            </button>
          </div>
          
          <div class="text-body1 q-mt-lg">
            You can combine Tailwind utility classes with Quasar components for the best of both worlds.
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import TailwindButtons from 'src/components/TailwindButtons.vue'
import TailwindButtonsCustom from 'src/components/TailwindButtonsCustom.vue'

export default {
  name: 'TailwindButtonsPage',
  components: {
    TailwindButtons,
    TailwindButtonsCustom
  }
}
</script>
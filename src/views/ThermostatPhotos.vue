<template>
  <div class="min-h-screen bg-background pb-20">
    <AppHeader 
      headline="Current Thermostat" 
      configuration="small"
    />
    
    <div class="pt-16 px-4">
      <div class="space-y-6">
        <div>
          <h2 class="font-roboto text-headline-small text-on-surface mb-4">Thermostat Faceplate</h2>
          <PhotoUpload
            v-model="faceplatePhoto"
            label="Upload faceplate photo"
            description="Take a clear photo of the thermostat display"
          />
        </div>

        <div>
          <h2 class="font-roboto text-headline-small text-on-surface mb-4">Wiring Setup</h2>
          <PhotoUpload
            v-model="wiringPhoto"
            label="Upload wiring photo"
            description="Remove the faceplate and take a clear photo of the wiring"
          />
        </div>
      </div>

      <div class="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-outline-variant">
        <AppButton
          @click="handleNext"
          :disabled="!isValid"
        >
          Continue
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AppHeader from '@/components/base/AppHeader.vue'
import AppButton from '@/components/base/AppButton.vue'
import PhotoUpload from '@/components/photos/PhotoUpload.vue'

export default {
  name: 'ThermostatPhotos',
  components: {
    AppHeader,
    AppButton,
    PhotoUpload
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    
    const faceplatePhoto = ref('')
    const wiringPhoto = ref('')

    const isValid = computed(() => {
      return faceplatePhoto.value && wiringPhoto.value
    })

    const handleNext = () => {
      if (!isValid.value) return

      store.commit('updateThermostat', {
        index: parseInt(router.currentRoute.value.params.thermostatIndex),
        data: {
          photos: {
            faceplate: faceplatePhoto.value,
            wiring: wiringPhoto.value
          }
        }
      })
      
      router.push(`/installer/${router.currentRoute.value.params.slug}/wiring-check/${router.currentRoute.value.params.thermostatIndex}`)
    }

    return {
      faceplatePhoto,
      wiringPhoto,
      isValid,
      handleNext
    }
  }
}
</script>

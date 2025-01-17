<template>
  <div class="min-h-screen bg-background pb-20">
    <AppHeader title="Current Thermostat" />
    
    <div class="pt-16 px-4">
      <div class="space-y-6">
        <div>
          <h2 class="font-roboto text-headline-small text-on-surface mb-4">Thermostat Faceplate</h2>
          <div class="border-2 border-dashed border-outline rounded-lg p-4 text-center">
            <div v-if="!faceplatePhoto" class="space-y-4">
              <svg class="w-12 h-12 mx-auto text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <div>
                <p class="font-roboto text-body-large text-on-surface">Upload faceplate photo</p>
                <p class="font-roboto text-body-medium text-on-surface-variant mt-1">
                  Take a clear photo of the thermostat display
                </p>
              </div>
              <button
                @click="triggerFaceplateUpload"
                class="px-4 py-2 bg-primary text-on-primary rounded-full font-roboto text-label-large"
              >
                Upload Photo
              </button>
              <input
                ref="faceplateInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleFaceplateUpload"
              >
            </div>
            <div v-else class="relative">
              <img :src="faceplatePhoto" alt="Thermostat faceplate" class="w-full max-h-[250px] object-contain rounded-lg">
              <button
                @click="removeFaceplatePhoto"
                class="absolute top-2 right-2 p-2 bg-surface-container-high rounded-full"
              >
                <svg class="w-5 h-5 text-on-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div>
          <h2 class="font-roboto text-headline-small text-on-surface mb-4">Wiring Setup</h2>
          <div class="border-2 border-dashed border-outline rounded-lg p-4 text-center">
            <div v-if="!wiringPhoto" class="space-y-4">
              <svg class="w-12 h-12 mx-auto text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <div>
                <p class="font-roboto text-body-large text-on-surface">Upload wiring photo</p>
                <p class="font-roboto text-body-medium text-on-surface-variant mt-1">
                  Remove the faceplate and take a clear photo of the wiring
                </p>
              </div>
              <button
                @click="triggerWiringUpload"
                class="px-4 py-2 bg-primary text-on-primary rounded-full font-roboto text-label-large"
              >
                Upload Photo
              </button>
              <input
                ref="wiringInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleWiringUpload"
              >
            </div>
            <div v-else class="relative">
              <img :src="wiringPhoto" alt="Thermostat wiring" class="w-full max-h-[250px] object-contain rounded-lg">
              <button
                @click="removeWiringPhoto"
                class="absolute top-2 right-2 p-2 bg-surface-container-high rounded-full"
              >
                <svg class="w-5 h-5 text-on-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
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
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/base/AppHeader.vue'
import AppButton from '@/components/base/AppButton.vue'

export default {
  name: 'ThermostatPhotos',
  components: {
    AppHeader,
    AppButton
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const faceplateInput = ref(null)
    const wiringInput = ref(null)
    const faceplatePhoto = ref('')
    const wiringPhoto = ref('')

    const isValid = computed(() => 
      faceplatePhoto.value && wiringPhoto.value
    )

    const triggerFaceplateUpload = () => {
      faceplateInput.value.click()
    }

    const triggerWiringUpload = () => {
      wiringInput.value.click()
    }

    const handleFaceplateUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          faceplatePhoto.value = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }

    const handleWiringUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          wiringPhoto.value = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }

    const removeFaceplatePhoto = () => {
      faceplatePhoto.value = ''
      faceplateInput.value.value = ''
    }

    const removeWiringPhoto = () => {
      wiringPhoto.value = ''
      wiringInput.value.value = ''
    }

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
      faceplateInput,
      wiringInput,
      faceplatePhoto,
      wiringPhoto,
      isValid,
      triggerFaceplateUpload,
      triggerWiringUpload,
      handleFaceplateUpload,
      handleWiringUpload,
      removeFaceplatePhoto,
      removeWiringPhoto,
      handleNext
    }
  }
}
</script>

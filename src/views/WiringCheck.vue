<template>
  <div class="min-h-screen bg-background pb-20">
    <AppHeader title="Wiring Check" />
    
    <div class="pt-16 px-4">
      <h2 class="font-roboto text-headline-small text-on-surface mb-6">Common Wire Check</h2>
      
      <div class="space-y-6">
        <div class="bg-surface-container-low rounded-lg p-4">
          <p class="font-roboto text-body-large text-on-surface mb-6">
            Does the existing thermostat have a common (C) wire?
          </p>
          
          <div class="grid grid-cols-2 gap-4">
            <button
              @click="setCommonWire(true)"
              :class="[
                'w-full py-4 rounded-lg font-roboto text-body-large transition-colors',
                hasCommonWire === true 
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-on-surface-variant border border-outline'
              ]"
            >
              Yes
            </button>
            <button
              @click="setCommonWire(false)"
              :class="[
                'w-full py-4 rounded-lg font-roboto text-body-large transition-colors',
                hasCommonWire === false
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-on-surface-variant border border-outline'
              ]"
            >
              No
            </button>
          </div>
        </div>

        <div class="bg-surface-container-low rounded-lg p-4">
          <p class="font-roboto text-body-large text-on-surface mb-6">
            Are there any jumper wires installed?
          </p>
          
          <div class="grid grid-cols-2 gap-4">
            <button
              @click="setHasJumpers(true)"
              :class="[
                'w-full py-4 rounded-lg font-roboto text-body-large transition-colors',
                hasJumpers === true 
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-on-surface-variant border border-outline'
              ]"
            >
              Yes
            </button>
            <button
              @click="setHasJumpers(false)"
              :class="[
                'w-full py-4 rounded-lg font-roboto text-body-large transition-colors',
                hasJumpers === false
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-on-surface-variant border border-outline'
              ]"
            >
              No
            </button>
          </div>
        </div>

        <div v-if="hasJumpers" class="bg-surface-container-low rounded-lg p-4">
          <label class="block">
            <span class="font-roboto text-body-large text-on-surface block mb-2">
              Describe jumper wire locations
            </span>
            <textarea
              v-model="jumperNotes"
              rows="3"
              class="w-full bg-transparent border-2 border-outline rounded-lg p-3 font-roboto text-body-large text-on-surface focus:border-primary focus:outline-none"
              placeholder="Example: Jumper between Rc and Rh"
            ></textarea>
          </label>
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
  name: 'WiringCheck',
  components: {
    AppHeader,
    AppButton
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const hasCommonWire = ref(null)
    const hasJumpers = ref(null)
    const jumperNotes = ref('')

    const isValid = computed(() => 
      hasCommonWire.value !== null && 
      hasJumpers.value !== null && 
      (!hasJumpers.value || (hasJumpers.value && jumperNotes.value.trim() !== ''))
    )

    const setCommonWire = (value) => {
      hasCommonWire.value = value
    }

    const setHasJumpers = (value) => {
      hasJumpers.value = value
      if (!value) {
        jumperNotes.value = ''
      }
    }

    const handleNext = () => {
      if (!isValid.value) return

      store.commit('updateThermostat', {
        index: parseInt(router.currentRoute.value.params.thermostatIndex),
        data: {
          wiringDetails: {
            hasCommonWire: hasCommonWire.value,
            hasJumpers: hasJumpers.value,
            jumperNotes: jumperNotes.value
          }
        }
      })
      
      router.push(`/installer/${router.currentRoute.value.params.slug}/install-thermostat/${router.currentRoute.value.params.thermostatIndex}`)
    }

    return {
      hasCommonWire,
      hasJumpers,
      jumperNotes,
      isValid,
      setCommonWire,
      setHasJumpers,
      handleNext
    }
  }
}
</script>

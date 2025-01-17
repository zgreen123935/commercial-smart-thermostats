<template>
  <div class="min-h-screen bg-background pb-20">
    <AppHeader 
      headline="Wiring Check" 
      configuration="small"
    />
    
    <div class="pt-16 px-4">
      <div class="space-y-8">
        <div class="bg-surface-container-low rounded-xl p-4">
          <h2 class="text-headline-small text-on-surface mb-4">Common Wire Check</h2>
          <p class="text-body-large text-on-surface mb-6">
            There is a C wire connected
          </p>
          <div class="flex gap-2">
            <FilterChip
              v-model="hasCommonWire"
              :value="true"
            >
              Yes
            </FilterChip>
            <FilterChip
              v-model="hasCommonWire"
              :value="false"
            >
              No
            </FilterChip>
          </div>
        </div>

        <div class="bg-surface-container-low rounded-xl p-4">
          <h2 class="text-headline-small text-on-surface mb-4">Jumper Wires</h2>
          <p class="text-body-large text-on-surface mb-6">
            Are there any jumper wires installed?
          </p>
          <div class="flex gap-2">
            <FilterChip
              v-model="hasJumpers"
              :value="true"
            >
              Yes
            </FilterChip>
            <FilterChip
              v-model="hasJumpers"
              :value="false"
            >
              No
            </FilterChip>
          </div>
        </div>

        <div v-if="hasJumpers" class="bg-surface-container-low rounded-xl p-4">
          <label class="block">
            <span class="text-body-large text-on-surface block mb-2">
              Describe jumper wire locations
            </span>
            <textarea
              v-model="jumperNotes"
              rows="3"
              class="w-full bg-transparent border-2 border-outline rounded-lg p-3 text-body-large text-on-surface focus:border-primary focus:outline-none"
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
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AppHeader from '@/components/base/AppHeader.vue'
import AppButton from '@/components/base/AppButton.vue'
import RadioCell from '@/components/base/RadioCell.vue'
import FilterChip from '@/components/base/FilterChip.vue'

export default {
  name: 'WiringCheck',
  components: {
    AppHeader,
    AppButton,
    RadioCell,
    FilterChip
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    
    const hasCommonWire = ref(null)
    const hasJumpers = ref(null)
    const jumperNotes = ref('')

    const isValid = computed(() => {
      return hasCommonWire.value !== null && hasJumpers.value !== null && (!hasJumpers.value || (hasJumpers.value && jumperNotes.value.trim() !== ''))
    })

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
      handleNext
    }
  }
}
</script>

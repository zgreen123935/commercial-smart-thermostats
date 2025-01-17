<template>
  <BaseView title="Verify Installation">
    <div class="space-y-8">
      <InfoCard title="Installation Steps">
        <p class="font-roboto text-body-large text-on-surface-variant">
          Mount the thermostat back onto the wall plate and perform the following system checks:
        </p>
        <ul class="list-disc ml-6 mt-4 space-y-2 font-roboto text-body-large text-on-surface-variant">
          <li>Raise and lower the temperature setpoint</li>
          <li>Change between heating and cooling modes</li>
          <li>Adjust fan speed settings</li>
          <li>Verify that relays are engaging as expected</li>
        </ul>
      </InfoCard>

      <InfoCard title="System Verification">
        <p class="font-roboto text-body-large text-on-surface-variant mb-4">
          Verify the following are working correctly:
        </p>
        <div class="space-y-4">
          <label class="flex items-start">
            <input
              type="checkbox"
              v-model="displayWorking"
              class="mt-1 w-5 h-5 text-primary border-2 border-outline rounded"
            >
            <span class="ml-3 font-roboto text-body-large text-on-surface">
              Display is working correctly
            </span>
          </label>

          <label class="flex items-start">
            <input
              type="checkbox"
              v-model="heatingWorking"
              class="mt-1 w-5 h-5 text-primary border-2 border-outline rounded"
            >
            <span class="ml-3 font-roboto text-body-large text-on-surface">
              Heating is responding to changes
            </span>
          </label>

          <label class="flex items-start">
            <input
              type="checkbox"
              v-model="coolingWorking"
              class="mt-1 w-5 h-5 text-primary border-2 border-outline rounded"
            >
            <span class="ml-3 font-roboto text-body-large text-on-surface">
              Cooling is responding to changes
            </span>
          </label>
        </div>
      </InfoCard>

      <div class="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-outline-variant">
        <AppButton
          @click="handleComplete"
          :disabled="!isValid"
        >
          Complete Installation
        </AppButton>
      </div>
    </div>
  </BaseView>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import BaseView from '@/components/base/BaseView.vue'
import AppButton from '@/components/base/AppButton.vue'
import InfoCard from '@/components/base/InfoCard.vue'

export default {
  name: 'ConfirmWorking',
  components: {
    BaseView,
    AppButton,
    InfoCard
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    const displayWorking = ref(false)
    const heatingWorking = ref(false)
    const coolingWorking = ref(false)

    const isValid = computed(() => {
      const thermostat = store.getters.currentThermostat
      if (!thermostat) return false

      // Always require display check
      if (!displayWorking.value) return false

      // Only require heating check if heating is configured
      if (thermostat.heatingType !== 'none' && !heatingWorking.value) return false

      // Only require cooling check if cooling is configured
      if (thermostat.coolingType !== 'none' && !coolingWorking.value) return false

      return true
    })

    const handleComplete = () => {
      if (!isValid.value) return

      store.commit('updateThermostat', {
        index: parseInt(router.currentRoute.value.params.thermostatIndex),
        data: {
          verificationDetails: {
            displayWorking: displayWorking.value,
            heatingWorking: heatingWorking.value,
            coolingWorking: coolingWorking.value
          },
          isVerified: true
        }
      })

      // Navigate to the next thermostat or feedback screen
      const nextIndex = parseInt(router.currentRoute.value.params.thermostatIndex) + 1
      if (nextIndex < store.state.thermostats.length) {
        router.push(`/installer/${router.currentRoute.value.params.slug}/thermostat-photos/${nextIndex}`)
      } else {
        router.push(`/installer/${router.currentRoute.value.params.slug}/feedback`)
      }
    }

    return {
      displayWorking,
      heatingWorking,
      coolingWorking,
      isValid,
      handleComplete
    }
  }
}
</script>

<template>
  <SelectionScreen
    title="System Configuration"
    question="Does the system have Emergency Heat?"
    :options="options"
    :initial-value="currentValue"
    @next="handleNext"
  />
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import SelectionScreen from '@/components/base/SelectionScreen.vue'

export default {
  name: 'EmergencyHeat',
  components: {
    SelectionScreen
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const options = [
      {
        value: 'yes',
        label: 'Yes',
        description: 'System has emergency/auxiliary heat'
      },
      {
        value: 'no',
        label: 'No',
        description: 'No emergency heat available'
      }
    ]

    const currentValue = computed(() => {
      const thermostat = store.getters.currentThermostat
      return thermostat?.hasEmergencyHeat
    })

    const handleNext = (value) => {
      store.commit('updateThermostat', {
        index: parseInt(router.currentRoute.value.params.thermostatIndex),
        data: {
          hasEmergencyHeat: value
        }
      })

      router.push(`/installer/${router.currentRoute.value.params.slug}/config/reversing-valve/${router.currentRoute.value.params.thermostatIndex}`)
    }

    return {
      options,
      currentValue,
      handleNext
    }
  }
}
</script>

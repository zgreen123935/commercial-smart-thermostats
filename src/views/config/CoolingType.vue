<template>
  <SelectionScreen
    title="System Configuration"
    question="Select Cooling Type"
    :options="coolingTypes"
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
  name: 'CoolingType',
  components: {
    SelectionScreen
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const coolingTypes = [
      {
        value: '1stage',
        label: '1-Stage',
        description: 'Single stage cooling system'
      },
      {
        value: '2stage',
        label: '2-Stage',
        description: 'Two stage cooling system for better efficiency'
      },
      {
        value: 'none',
        label: 'None',
        description: 'No cooling capability'
      }
    ]

    const currentValue = computed(() => {
      const thermostat = store.getters.currentThermostat
      return thermostat?.coolingType
    })

    const handleNext = (value) => {
      store.commit('updateThermostat', {
        index: parseInt(router.currentRoute.value.params.thermostatIndex),
        data: {
          coolingType: value
        }
      })

      router.push(`/installer/${router.currentRoute.value.params.slug}/config/fan-control/${router.currentRoute.value.params.thermostatIndex}`)
    }

    return {
      coolingTypes,
      currentValue,
      handleNext
    }
  }
}
</script>

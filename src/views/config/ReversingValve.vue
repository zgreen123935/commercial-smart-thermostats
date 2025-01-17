<template>
  <SelectionScreen
    title="System Configuration"
    question="Select Reversing Valve Type"
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
  name: 'ReversingValve',
  components: {
    SelectionScreen
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const options = [
      {
        value: 'b_type',
        label: 'B-Type',
        description: 'Energizing valve = calls for heat'
      },
      {
        value: 'o_type',
        label: 'O-Type',
        description: 'Energizing valve = calls for cool'
      }
    ]

    const currentValue = computed(() => {
      const thermostat = store.getters.currentThermostat
      return thermostat?.reversingValveType
    })

    const handleNext = (value) => {
      store.commit('updateThermostat', {
        index: parseInt(router.currentRoute.value.params.thermostatIndex),
        data: {
          reversingValveType: value
        }
      })

      router.push(`/installer/${router.currentRoute.value.params.slug}/config-code/${router.currentRoute.value.params.thermostatIndex}`)
    }

    return {
      options,
      currentValue,
      handleNext
    }
  }
}
</script>

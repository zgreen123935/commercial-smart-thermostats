<template>
  <SelectionScreen
    title="System Configuration"
    question="Select Fan Control"
    :options="fanControls"
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
  name: 'FanControl',
  components: {
    SelectionScreen
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const fanControls = [
      {
        value: 'none',
        label: 'None',
        description: 'No fan control'
      },
      {
        value: '1speed',
        label: '1-Speed',
        description: 'Single speed fan'
      },
      {
        value: '2speed',
        label: '2-Speed',
        description: 'Two speed fan control'
      },
      {
        value: '3speed',
        label: '3-Speed',
        description: 'Three speed fan control'
      }
    ]

    const currentValue = computed(() => {
      const thermostat = store.getters.currentThermostat
      return thermostat?.fanControl
    })

    const handleNext = (value) => {
      store.commit('updateThermostat', {
        index: parseInt(router.currentRoute.value.params.thermostatIndex),
        data: {
          fanControl: value
        }
      })

      const thermostat = store.getters.currentThermostat
      if (thermostat?.systemType === 'heat_pump') {
        router.push(`/installer/${router.currentRoute.value.params.slug}/config/emergency-heat/${router.currentRoute.value.params.thermostatIndex}`)
      } else {
        router.push(`/installer/${router.currentRoute.value.params.slug}/config-code/${router.currentRoute.value.params.thermostatIndex}`)
      }
    }

    return {
      fanControls,
      currentValue,
      handleNext
    }
  }
}
</script>

<template>
  <SelectionScreen
    title="System Configuration"
    question="Select Heating Type"
    :options="heatingTypes"
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
  name: 'HeatingType',
  components: {
    SelectionScreen
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const heatingTypes = [
      {
        value: '1stage',
        label: '1-Stage',
        description: 'Single stage heating system'
      },
      {
        value: '2stage',
        label: '2-Stage',
        description: 'Two stage heating system for better efficiency'
      },
      {
        value: 'none',
        label: 'None',
        description: 'No heating capability'
      }
    ]

    const currentValue = computed(() => {
      const thermostat = store.getters.currentThermostat
      return thermostat?.heatingType
    })

    const handleNext = (value) => {
      store.commit('updateThermostat', {
        index: parseInt(router.currentRoute.value.params.thermostatIndex),
        data: {
          heatingType: value
        }
      })

      router.push(`/installer/${router.currentRoute.value.params.slug}/config/cooling-type/${router.currentRoute.value.params.thermostatIndex}`)
    }

    return {
      heatingTypes,
      currentValue,
      handleNext
    }
  }
}
</script>

<template>
  <SelectionScreen
    title="System Configuration"
    question="Select HVAC System Type"
    :options="systemTypes"
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
  name: 'SystemType',
  components: {
    SelectionScreen
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const systemTypes = [
      {
        value: 'oil_gas',
        label: 'Oil/Gas',
        description: 'Heating system that uses oil or gas as fuel'
      },
      {
        value: 'electric',
        label: 'Electric',
        description: 'All-electric heating system'
      },
      {
        value: 'heat_pump',
        label: 'Heat Pump',
        description: 'System that can both heat and cool by transferring heat'
      },
      {
        value: 'hydronic',
        label: 'Hydronic',
        description: 'Hot water based heating system'
      },
      {
        value: 'fcu',
        label: 'FCU (Fan Coil Unit)',
        description: 'Uses a fan to circulate air through a heating/cooling coil'
      }
    ]

    const currentValue = computed(() => {
      const thermostat = store.getters.currentThermostat
      return thermostat?.systemType
    })

    const handleNext = (value) => {
      store.commit('updateThermostat', {
        index: parseInt(router.currentRoute.value.params.thermostatIndex),
        data: {
          systemType: value
        }
      })

      router.push(`/installer/${router.currentRoute.value.params.slug}/config/heating-type/${router.currentRoute.value.params.thermostatIndex}`)
    }

    return {
      systemTypes,
      currentValue,
      handleNext
    }
  }
}
</script>

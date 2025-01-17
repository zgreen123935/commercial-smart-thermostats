import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export function useThermostat() {
  const store = useStore()
  const route = useRoute()

  const currentIndex = computed(() => parseInt(route.params.thermostatIndex))
  
  const thermostat = computed(() => store.getters['thermostats/getCurrentThermostat'])
  
  const isLastThermostat = computed(() => 
    currentIndex.value === store.state.site.numThermostats - 1
  )

  const updateThermostat = (data) => {
    store.dispatch('thermostats/updateThermostat', {
      index: currentIndex.value,
      data
    })
  }

  return {
    currentIndex,
    thermostat,
    isLastThermostat,
    updateThermostat
  }
}

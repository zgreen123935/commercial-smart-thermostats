<template>
  <div class="min-h-screen bg-background">
    <AppHeader 
      headline="Thermostat Configuration" 
      configuration="small"
    />
    
    <div class="pt-16 px-4">
      <h2 class="font-roboto text-headline-small text-on-surface mb-6">Select HVAC System Type</h2>
      <div class="space-y-2">
        <RadioCell
          v-model="currentValue"
          value="oil-gas"
          header="Oil/Gas"
          helper="Heating system that uses oil or gas as fuel"
        />
        <RadioCell
          v-model="currentValue"
          value="electric"
          header="Electric"
          helper="All-electric heating system"
        />
        <RadioCell
          v-model="currentValue"
          value="heat-pump"
          header="Heat Pump"
          helper="System that can both heat and cool by transferring heat"
        />
        <RadioCell
          v-model="currentValue"
          value="hydronic"
          header="Hydronic"
          helper="Hot water based heating system"
        />
        <RadioCell
          v-model="currentValue"
          value="fcu"
          header="FCU (Fan Coil Unit)"
          helper="Uses a fan to circulate air through a heating/cooling coil"
        />
      </div>

      <div class="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-outline-variant">
        <AppButton
          @click="handleNext"
          :disabled="!currentValue"
        >
          Continue
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AppHeader from '@/components/base/AppHeader.vue'
import RadioCell from '@/components/base/RadioCell.vue'
import AppButton from '@/components/base/AppButton.vue'

export default {
  name: 'SystemType',
  components: {
    AppHeader,
    RadioCell,
    AppButton
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    
    const currentValue = ref(null)

    const handleNext = () => {
      store.commit('site/setSystemType', currentValue.value)
      router.push(`/installer/${router.currentRoute.value.params.slug}/config/heating-type/${router.currentRoute.value.params.thermostatIndex}`)
    }

    return {
      currentValue,
      handleNext
    }
  }
}
</script>

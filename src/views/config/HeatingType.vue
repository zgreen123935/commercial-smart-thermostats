<template>
  <div class="min-h-screen bg-background">
    <AppHeader 
      headline="Thermostat Configuration" 
      configuration="small"
    />
    
    <div class="pt-16 px-4">
      <h2 class="font-roboto text-headline-small text-on-surface mb-6">Select Heating Type</h2>
      <div class="space-y-2">
        <RadioCell
          v-model="currentValue"
          value="single-stage"
          header="Single Stage"
          helper="System has one heating stage"
        />
        <RadioCell
          v-model="currentValue"
          value="two-stage"
          header="Two Stage"
          helper="System has two heating stages"
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
  name: 'HeatingType',
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
      store.commit('site/setHeatingType', currentValue.value)
      router.push(`/installer/${router.currentRoute.value.params.slug}/config/cooling-type/${router.currentRoute.value.params.thermostatIndex}`)
    }

    return {
      currentValue,
      handleNext
    }
  }
}
</script>

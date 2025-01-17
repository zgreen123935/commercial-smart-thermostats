<template>
  <div class="min-h-screen bg-background pb-20">
    <AppHeader 
      headline="Select HVAC System Type" 
      configuration="small"
    />
    
    <div class="pt-16 px-4">
      <div class="space-y-2">
        <RadioCell
          v-model="systemType"
          value="oil-gas"
          header="Oil/Gas"
          helper="Heating system that uses oil or gas as fuel"
        />
        <RadioCell
          v-model="systemType"
          value="electric"
          header="Electric"
          helper="All-electric heating system"
        />
        <RadioCell
          v-model="systemType"
          value="heat-pump"
          header="Heat Pump"
          helper="System that can both heat and cool by transferring heat"
        />
        <RadioCell
          v-model="systemType"
          value="hydronic"
          header="Hydronic"
          helper="Hot water based heating system"
        />
        <RadioCell
          v-model="systemType"
          value="fcu"
          header="FCU (Fan Coil Unit)"
          helper="Uses a fan to circulate air through a heating/cooling coil"
        />
      </div>

      <div class="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-outline-variant">
        <AppButton
          @click="handleNext"
          :disabled="!isValid"
        >
          Continue
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AppHeader from '@/components/base/AppHeader.vue'
import AppButton from '@/components/base/AppButton.vue'
import RadioCell from '@/components/base/RadioCell.vue'

export default {
  name: 'HvacConfiguration',
  components: {
    AppHeader,
    AppButton,
    RadioCell
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    
    const systemType = ref(null)

    const isValid = computed(() => systemType.value !== null)

    const handleNext = () => {
      if (!isValid.value) return

      store.commit('setHvacSystem', {
        type: systemType.value
      })
      
      router.push('/wiring-check')
    }

    return {
      systemType,
      isValid,
      handleNext
    }
  }
}
</script>

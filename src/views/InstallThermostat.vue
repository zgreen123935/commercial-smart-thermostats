<template>
  <div class="min-h-screen bg-background pb-20">
    <AppHeader 
      headline="Install Thermostat" 
      configuration="small"
    />
    
    <div class="pt-16 px-4">
      <h2 class="font-roboto text-headline-small text-on-surface mb-6">Installation Steps</h2>
      
      <div class="space-y-6">
        <InfoCard
          title="Step 1"
          value="Remove Old Thermostat"
          description="Carefully remove the existing thermostat from the wall."
        />

        <InfoCard
          title="Step 2"
          value="Install Mysa HQ"
          description="Follow the provided installation guide to mount and wire the new thermostat."
        />

        <InfoCard
          title="Step 3"
          value="Double Check Wiring"
          description="Ensure all wires are securely connected according to your earlier photos."
        />

        <div class="bg-surface-container-low rounded-lg p-4">
          <label class="block">
            <span class="font-roboto text-body-large text-on-surface block mb-2">Installation Notes</span>
            <textarea
              v-model="installNotes"
              rows="4"
              class="w-full bg-transparent border-2 border-outline rounded-lg p-3 font-roboto text-body-large text-on-surface focus:border-primary focus:outline-none"
              placeholder="Add any notes about the installation..."
            ></textarea>
          </label>
        </div>

        <div class="bg-surface-container-low rounded-lg p-4">
          <label class="flex items-center">
            <input
              type="checkbox"
              v-model="installationComplete"
              class="w-5 h-5 text-primary border-2 border-outline rounded"
            >
            <span class="ml-3 font-roboto text-body-large text-on-surface">
              I confirm the thermostat is properly installed
            </span>
          </label>
        </div>
      </div>

      <div class="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-outline-variant">
        <AppButton
          @click="handleNext"
          :disabled="!installationComplete"
        >
          Continue to Configuration
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/base/AppHeader.vue'
import AppButton from '@/components/base/AppButton.vue'
import InfoCard from '@/components/base/InfoCard.vue'

export default {
  name: 'InstallThermostat',
  components: {
    AppHeader,
    AppButton,
    InfoCard
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const installNotes = ref('')
    const installationComplete = ref(false)

    const handleNext = () => {
      if (!installationComplete.value) return

      store.commit('updateThermostat', {
        index: parseInt(router.currentRoute.value.params.thermostatIndex),
        data: {
          installNotes: installNotes.value,
          installationComplete: true
        }
      })
      
      router.push(`/installer/${router.currentRoute.value.params.slug}/config/system-type/${router.currentRoute.value.params.thermostatIndex}`)
    }

    return {
      installNotes,
      installationComplete,
      handleNext
    }
  }
}
</script>

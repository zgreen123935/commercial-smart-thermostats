<template>
  <div class="min-h-screen bg-background pb-20">
    <AppHeader title="Welcome" :showBack="false" />
    
    <div class="pt-16 px-4">
      <h2 class="font-roboto text-headline-small text-on-surface mb-6">Welcome to Mysa HQ Installer</h2>
      
      <div class="bg-surface-container-low rounded-lg p-4 mb-6">
        <p class="font-roboto text-body-large text-on-surface">
          This installation is for <span class="font-medium">{{ siteName }}</span>. 
          Please confirm you have the correct product before continuing.
        </p>
      </div>

      <InfoCard
        title="Site Details"
        :value="address"
        description="Installation Address"
      />

      <InfoCard
        title="Number of Thermostats"
        :value="numThermostats.toString()"
        description="Thermostats to be installed"
      />

      <div class="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-outline-variant">
        <AppButton
          variant="warning"
          class="mb-4"
          @click="reportIssue"
        >
          This is not the correct site
        </AppButton>

        <AppButton
          @click="handleNext"
        >
          Confirm and Continue
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/base/AppHeader.vue'
import InfoCard from '@/components/base/InfoCard.vue'
import AppButton from '@/components/base/AppButton.vue'

export default {
  name: 'SiteDetails',
  components: {
    AppHeader,
    InfoCard,
    AppButton
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    // In a real app, these would be loaded from the store or API
    const siteName = computed(() => store.state.siteDetails?.siteName || 'Demo Site')
    const address = computed(() => store.state.siteDetails?.address || '123 Main St, Demo City')
    const numThermostats = computed(() => store.state.siteDetails?.numThermostats || 2)

    const handleNext = () => {
      router.push(`/installer/${router.currentRoute.value.params.slug}/installer-info`)
    }

    const reportIssue = () => {
      // Handle reporting wrong site
      console.log('Reporting wrong site')
    }

    return {
      siteName,
      address,
      numThermostats,
      handleNext,
      reportIssue
    }
  }
}
</script>

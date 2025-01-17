<template>
  <div class="min-h-screen bg-background pb-20">
    <AppHeader title="HVAC Configuration" />
    
    <div class="pt-16 px-4">
      <h2 class="font-roboto text-headline-small text-on-surface mb-6">Here is our best match!</h2>
      
      <InfoCard
        title="Config Code"
        value="71B"
        description="We recommend writing this code down but we will automatically apply it to your Mysa."
      >
        <template #description>
          <p class="text-sm text-gray-600 mt-2">
            {{ description }}
          </p>
        </template>
      </InfoCard>

      <InfoCard
        title="Heating Type"
        value="Two-stage, Electric"
      />

      <InfoCard
        title="Cooling Type"
        value="Single Stage"
      />

      <InfoCard
        title="Emergency Heating"
        value="None"
      />

      <InfoCard
        title="Reversing Valve"
        value="None"
      />

      <div class="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-outline-variant">
        <AppButton
          variant="warning"
          class="mb-4"
          @click="reportIssue"
        >
          Something doesn't look right
        </AppButton>

        <AppButton
          @click="handleNext"
        >
          Next
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/base/AppHeader.vue'
import InfoCard from '@/components/base/InfoCard.vue'
import AppButton from '@/components/base/AppButton.vue'

export default {
  name: 'HvacConfiguration',
  components: {
    AppHeader,
    InfoCard,
    AppButton
  },
  methods: {
    handleNext() {
      // Navigate to next screen
      this.$router.push('/installer/' + this.$route.params.slug + '/confirm-working')
    },
    reportIssue() {
      // Handle reporting issues
      console.log('Reporting issue')
    }
  }
}
</script>

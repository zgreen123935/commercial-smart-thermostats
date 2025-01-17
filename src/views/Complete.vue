<template>
  <BaseView title="Installation Complete">
    <div class="space-y-8">
      <InfoCard>
        <div class="text-center">
          <h2 class="font-roboto text-headline-small text-on-surface mb-4">Installation Complete!</h2>
          <p class="font-roboto text-body-large text-on-surface-variant">
            Thank you for installing Mysa HQ. Your thermostat is now ready to use.
          </p>
        </div>
      </InfoCard>

      <div class="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-outline-variant">
        <AppButton @click="handleFinish">
          Finish
        </AppButton>
      </div>
    </div>
  </BaseView>
</template>

<script>
import { useRouter } from 'vue-router'
import BaseView from '@/components/base/BaseView.vue'
import AppButton from '@/components/base/AppButton.vue'
import InfoCard from '@/components/base/InfoCard.vue'

export default {
  name: 'Complete',
  components: {
    BaseView,
    AppButton,
    InfoCard
  },
  setup() {
    const router = useRouter()

    const handleFinish = () => {
      // Navigate back to the start for a new installation
      router.push('/')
    }

    return {
      handleFinish
    }
  }
}
</script>

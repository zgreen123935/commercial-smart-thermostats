<template>
  <BaseView title="Installation Feedback">
    <div class="space-y-8">
      <InfoCard>
        <div class="text-center">
          <h2 class="font-roboto text-headline-small text-on-surface mb-4">How was your installation experience?</h2>
          <div class="flex justify-center space-x-4 mb-8">
            <button
              v-for="star in 5"
              :key="star"
              @click="setRating(star)"
              class="focus:outline-none"
            >
              <svg
                class="w-10 h-10"
                :class="star <= rating ? 'text-primary' : 'text-outline'"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </button>
          </div>
          <p class="font-roboto text-body-large text-on-surface-variant">
            {{ ratingText }}
          </p>
        </div>
      </InfoCard>

      <InfoCard>
        <label class="block">
          <span class="font-roboto text-body-large text-on-surface block mb-2">Additional Feedback (Optional)</span>
          <textarea
            v-model="feedback"
            rows="4"
            class="w-full bg-transparent border-2 border-outline rounded-lg p-3 font-roboto text-body-large text-on-surface focus:border-primary focus:outline-none"
            placeholder="Share your thoughts about the installation process..."
          ></textarea>
        </label>
      </InfoCard>

      <div class="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-outline-variant space-y-4">
        <AppButton
          @click="handleSkip"
          variant="secondary"
          full-width
        >
          Skip
        </AppButton>
        <AppButton
          @click="handleSubmit"
          :disabled="!rating"
        >
          Submit Feedback
        </AppButton>
      </div>
    </div>
  </BaseView>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import BaseView from '@/components/base/BaseView.vue'
import AppButton from '@/components/base/AppButton.vue'
import InfoCard from '@/components/base/InfoCard.vue'

export default {
  name: 'Feedback',
  components: {
    BaseView,
    AppButton,
    InfoCard
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    
    const rating = ref(0)
    const feedback = ref('')

    const ratingText = computed(() => {
      switch (rating.value) {
        case 1: return 'Poor'
        case 2: return 'Fair'
        case 3: return 'Good'
        case 4: return 'Very Good'
        case 5: return 'Excellent'
        default: return 'Tap to rate'
      }
    })

    const setRating = (value) => {
      rating.value = value
    }

    const handleSubmit = () => {
      store.commit('setFeedback', {
        rating: rating.value,
        comments: feedback.value
      })
      router.push(`/installer/${router.currentRoute.value.params.slug}/complete`)
    }

    const handleSkip = () => {
      router.push(`/installer/${router.currentRoute.value.params.slug}/complete`)
    }

    return {
      rating,
      feedback,
      ratingText,
      setRating,
      handleSubmit,
      handleSkip
    }
  }
}
</script>

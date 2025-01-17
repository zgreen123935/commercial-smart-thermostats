<template>
  <BaseView title="Installer Information">
    <h2 class="font-roboto text-headline-small text-on-surface mb-6">Please enter your details</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <BaseInput
        id="name"
        v-model="formData.name"
        label="Your Name"
        placeholder="Enter your full name"
      >
        <template #icon>
          <svg class="w-5 h-5 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </template>
      </BaseInput>

      <BaseInput
        id="company"
        v-model="formData.company"
        label="Company"
        placeholder="Enter your company name"
      >
        <template #icon>
          <svg class="w-5 h-5 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2zM9 7h6a2 2 0 012 2v9a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2z" />
          </svg>
        </template>
      </BaseInput>

      <BaseInput
        id="phone"
        v-model="formData.phone"
        label="Phone Number"
        type="tel"
        required
        placeholder="Enter your phone number"
        :error="!isValidPhone && formData.phone.length > 0"
        helperText="10 digit phone number including area code"
      >
        <template #icon>
          <svg class="w-5 h-5 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </template>
      </BaseInput>

      <div class="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-outline-variant">
        <AppButton
          type="submit"
          :disabled="!isFormValid"
        >
          Next
        </AppButton>
      </div>
    </form>
  </BaseView>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import BaseView from '@/components/base/BaseView.vue'
import AppButton from '@/components/base/AppButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'

export default {
  name: 'InstallerInfo',
  components: {
    BaseView,
    AppButton,
    BaseInput
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const formData = ref({
      name: '',
      company: '',
      phone: ''
    })

    const isValidPhone = computed(() => {
      // Remove all non-digits
      const phone = formData.value.phone.replace(/\D/g, '')
      // Must be exactly 10 digits
      return phone.length === 10
    })

    const isFormValid = computed(() => {
      return formData.value.name.length > 0 &&
             formData.value.company.length > 0 &&
             isValidPhone.value
    })

    const handleSubmit = () => {
      if (!isFormValid.value) return

      // Format phone number before saving
      const phone = formData.value.phone.replace(/\D/g, '')
      formData.value.phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')

      store.commit('site/setInstallerInfo', {
        name: formData.value.name,
        company: formData.value.company,
        phone: formData.value.phone
      })
      
      router.push(`/installer/${router.currentRoute.value.params.slug}/thermostat-photos/0`)
    }

    return {
      formData,
      isValidPhone,
      isFormValid,
      handleSubmit
    }
  }
}
</script>

<template>
  <AppDialog 
    v-model="showDialog"
    title="Need Help?"
    description="Would you like to speak with Mysa Commercial HVAC Support Team?"
  >
    <template #icon>
      <div class="w-12 h-12 flex items-center justify-center text-on-surface-variant">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </div>
    </template>

    <p class="text-on-surface-variant text-center mb-4">
      Monday - Friday, 9:00 AM to 5:00 PM EST
    </p>
    <p class="text-on-surface font-medium text-center">
      (709) 330-3160
    </p>

    <template #actions>
      <AppButton
        variant="secondary"
        @click="showDialog = false"
      >
        Close
      </AppButton>
      <AppButton
        @click="callSupport"
        class="text-primary"
      >
        Call Now
      </AppButton>
    </template>
  </AppDialog>
</template>

<script>
import { computed } from 'vue'
import AppButton from '@/components/base/AppButton.vue'
import AppDialog from '@/components/base/AppDialog.vue'

export default {
  name: 'HelpDialog',
  components: {
    AppDialog,
    AppButton
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const showDialog = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    })

    const callSupport = () => {
      window.location.href = 'tel:+17093303160'
    }

    return {
      showDialog,
      callSupport
    }
  }
}
</script>

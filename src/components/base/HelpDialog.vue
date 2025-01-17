<template>
  <AppDialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <div class="space-y-6">
      <h2 class="text-xl font-medium text-on-surface">Need Help?</h2>
      <p class="text-on-surface-variant">
        Would you like to speak with Mysa Commercial HVAC Support Team?
      </p>
      <p class="text-on-surface font-medium">
        (709) 330-3160
      </p>
      <div class="flex justify-end space-x-4">
        <AppButton
          variant="text"
          @click="$emit('update:modelValue', false)"
        >
          Close
        </AppButton>
        <AppButton
          @click="callSupport"
        >
          Call Now
        </AppButton>
      </div>
    </div>
  </AppDialog>
</template>

<script>
import AppButton from '@/components/base/AppButton.vue'

export default {
  name: 'HelpDialog',
  components: {
    AppButton
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup() {
    const callSupport = () => {
      window.location.href = 'tel:+17093303160'
    }

    return {
      callSupport
    }
  }
}
</script>

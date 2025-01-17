<template>
  <AppCard>
    <h3 class="text-lg font-medium text-on-surface mb-2">{{ label }}:</h3>
    <p class="text-on-surface-variant">{{ value }}</p>
  </AppCard>
</template>

<script>
import AppCard from '@/components/base/AppCard.vue'

export default {
  name: 'ConfigItem',
  components: {
    AppCard
  },
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }
}
</script>

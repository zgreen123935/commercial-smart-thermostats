<template>
  <div class="bg-surface-container rounded-lg p-6">
    <h3 v-if="title" class="text-lg font-medium text-on-surface mb-2">{{ title }}</h3>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AppCard',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

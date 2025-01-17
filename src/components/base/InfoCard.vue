<template>
  <div class="bg-surface-container-low rounded-lg p-6">
    <template v-if="title">
      <h3 class="font-roboto text-headline-small text-on-surface mb-2">{{ title }}</h3>
    </template>
    <div class="space-y-2">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoCard',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.text-headline-small {
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
}

.text-body-large {
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.5px;
}

.text-body-medium {
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.25px;
}
</style>

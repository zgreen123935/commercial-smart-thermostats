<template>
  <button
    class="
      px-4 h-8 rounded-lg inline-flex items-center gap-2
      font-roboto text-[14px] leading-[20px] font-medium
      transition-colors duration-200
      hover:bg-surface-container-high
      focus:outline-none focus:ring-2 focus:ring-primary
    "
    :class="{
      'bg-primary-container text-on-primary-container': modelValue === value,
      'bg-surface-container text-on-surface': modelValue !== value
    }"
    @click="$emit('update:modelValue', value)"
  >
    <svg v-if="modelValue === value" class="w-[18px] h-[18px]" viewBox="0 0 18 18" fill="none">
      <path d="M16 5L7 14L2 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'FilterChip',
  props: {
    modelValue: {
      type: [String, Boolean, Number],
      required: true
    },
    value: {
      type: [String, Boolean, Number],
      required: true
    }
  },
  emits: ['update:modelValue']
}
</script>

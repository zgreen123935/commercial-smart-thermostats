<template>
  <button
    :class="[
      'w-full rounded-lg px-4 py-3 font-roboto text-body-large transition-colors',
      variant === 'primary' && !disabled ? 'bg-primary text-on-primary' :
      variant === 'secondary' && !disabled ? 'bg-primary-container text-on-primary-container' :
      variant === 'warning' && !disabled ? 'bg-error-container text-on-error-container' :
      'bg-surface-disabled text-on-surface-disabled cursor-not-allowed opacity-50'
    ]"
    @click="$emit('click')"
    :disabled="disabled || variant === 'disabled'"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary', 'warning', 'disabled'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

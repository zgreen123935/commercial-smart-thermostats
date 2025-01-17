<template>
  <button
    class="w-full bg-surface-container-low rounded-2xl p-4 text-left relative"
    @click="$emit('update:modelValue', value)"
  >
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <div class="text-[22px] font-roboto text-on-surface">
          {{ header }}
        </div>
        <div v-if="helper" class="mt-0.5 text-[16px] text-on-surface-variant font-roboto">
          {{ helper }}
        </div>
      </div>
      
      <!-- Checkmark for selected state -->
      <div v-if="modelValue === value" class="absolute right-4 top-4">
        <svg class="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
        </svg>
      </div>
    </div>
  </button>
</template>

<script>
export default {
  name: 'RadioCell',
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      required: true
    },
    value: {
      type: [String, Number, Boolean],
      required: true
    },
    header: {
      type: String,
      required: true
    },
    helper: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue']
}
</script>

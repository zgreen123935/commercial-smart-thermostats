<template>
  <div class="mb-8">
    <label v-if="label" class="font-roboto text-sm text-primary block mb-1">
      {{ label }}
    </label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3">
        <slot name="icon"></slot>
      </div>
      <input
        :id="id"
        :value="modelValue"
        @input="handleInput"
        :type="type"
        :required="required"
        :placeholder="placeholder"
        :pattern="pattern"
        class="w-full pl-10 pr-3 py-2 font-roboto text-lg text-on-surface bg-transparent border-0 border-b-2 border-primary focus:border-primary focus:outline-none placeholder-on-surface-variant"
      >
    </div>
    <p v-if="helperText" class="font-roboto text-xs text-on-surface-variant mt-2">
      {{ helperText }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    id: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    required: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    pattern: {
      type: String,
      default: ''
    },
    helperText: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'input'],
  methods: {
    handleInput(event) {
      this.$emit('update:modelValue', event.target.value)
      this.$emit('input', event)
    }
  }
}
</script>

<template>
  <div class="mb-8">
    <label 
      v-if="label" 
      class="
        font-roboto text-[12px] leading-[16px] tracking-[0.4px] 
        text-primary block mb-2
      "
    >
      {{ label }}
    </label>
    <div 
      class="relative transition-colors duration-200 rounded-t-[4px]"
      :class="{ 
        'bg-white': focused,
        'bg-[#F8F9FC]': !focused && !error,
        'bg-error-container': error && !focused
      }"
    >
      <div class="absolute inset-y-0 left-3 flex items-center">
        <slot name="icon">
          <div class="w-6 h-6 text-on-surface-variant">
            <slot name="icon"></slot>
          </div>
        </slot>
      </div>
      <input
        :id="id"
        :value="modelValue"
        @input="handleInput"
        :type="type"
        :required="required"
        :placeholder="placeholder"
        class="
          w-full pl-12 pr-12 py-2 
          font-roboto text-[16px] leading-[24px] text-on-surface 
          bg-transparent
          border-b-2 border-solid
          focus:outline-none
          placeholder:text-on-surface-variant
          rounded-t-[4px]
          h-[56px]
          transition-all duration-200
        "
        :class="{
          'border-error': error,
          'border-primary': !error && focused,
          'border-outline-variant': !error && !focused
        }"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <!-- Clear button -->
      <button
        v-if="modelValue && !disabled"
        type="button"
        class="absolute inset-y-0 right-3 flex items-center"
        @click="clearInput"
      >
        <svg 
          class="w-6 h-6"
          :class="error ? 'text-error' : 'text-on-surface-variant'"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
    <p 
      v-if="helperText" 
      class="font-roboto text-[12px] leading-[16px] mt-1"
      :class="{
        'text-error': error,
        'text-on-surface-variant': !error
      }"
    >
      {{ helperText }}
    </p>
  </div>
</template>

<script>
import { ref } from 'vue'

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
    helperText: {
      type: String,
      default: ''
    },
    error: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'input'],
  setup(props, { emit }) {
    const focused = ref(false)

    const handleInput = (event) => {
      emit('update:modelValue', event.target.value)
      emit('input', event)
    }

    const clearInput = () => {
      emit('update:modelValue', '')
    }

    const handleFocus = () => {
      focused.value = true
    }

    const handleBlur = () => {
      focused.value = false
    }

    return {
      focused,
      handleInput,
      clearInput,
      handleFocus,
      handleBlur
    }
  }
}
</script>

<style scoped>
input::placeholder {
  opacity: 1;
}

input:focus::placeholder {
  opacity: 0.7;
}
</style>

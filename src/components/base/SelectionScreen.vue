<template>
  <div class="min-h-screen bg-background pb-20">
    <AppHeader :title="title" />
    
    <div class="pt-16 px-4">
      <h2 class="font-roboto text-headline-small text-on-surface mb-6">{{ question }}</h2>
      
      <div class="space-y-4">
        <button
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option.value)"
          :class="[
            'w-full p-4 rounded-lg font-roboto text-body-large text-left transition-colors',
            selectedValue === option.value
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container text-on-surface border border-outline'
          ]"
        >
          <div class="flex items-center">
            <div class="flex-grow">
              <div class="font-medium">{{ option.label }}</div>
              <div v-if="option.description" class="text-sm mt-1 opacity-80">
                {{ option.description }}
              </div>
            </div>
            <svg
              v-if="selectedValue === option.value"
              class="w-6 h-6 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </button>
      </div>

      <div class="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-outline-variant">
        <AppButton
          @click="$emit('next', selectedValue)"
          :disabled="!selectedValue"
        >
          Continue
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import AppHeader from '@/components/base/AppHeader.vue'
import AppButton from '@/components/base/AppButton.vue'

export default {
  name: 'SelectionScreen',
  components: {
    AppHeader,
    AppButton
  },
  props: {
    title: {
      type: String,
      required: true
    },
    question: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true,
      validator: (options) => {
        return options.every(option => 
          'value' in option && 
          'label' in option
        )
      }
    },
    initialValue: {
      type: String,
      default: null
    }
  },
  emits: ['next'],
  setup(props) {
    const selectedValue = ref(props.initialValue)

    const selectOption = (value) => {
      selectedValue.value = value
    }

    return {
      selectedValue,
      selectOption
    }
  }
}
</script>

<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 h-[64px] bg-surface-container-low"
  >
    <div class="flex items-center justify-between h-full px-1 py-2 gap-[6px]">
      <div class="w-12 h-12 flex items-center justify-center">
        <button 
          v-if="configuration !== 'center-aligned'" 
          @click="$router.back()" 
          class="text-on-surface-variant"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <h1 
        class="font-roboto text-[22px] leading-[28px] font-normal text-on-surface text-center flex-1"
      >
        {{ headline }}
      </h1>

      <div class="w-12 h-12 flex items-center justify-center">
        <slot name="actions">
          <button 
            v-if="showHelp"
            @click="helpDialog.openHelpDialog()"
            class="text-on-surface-variant"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </slot>
      </div>
    </div>
  </header>
  <!-- Spacer to prevent content from going under the fixed header -->
  <div class="h-[64px]"></div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'AppHeader',
  props: {
    headline: {
      type: String,
      required: true
    },
    configuration: {
      type: String,
      default: 'center-aligned',
      validator: value => ['center-aligned', 'small', 'medium', 'large'].includes(value)
    },
    showHelp: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const helpDialog = inject('helpDialog')
    return {
      helpDialog
    }
  }
}
</script>

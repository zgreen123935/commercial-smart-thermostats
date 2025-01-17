<template>
  <header class="bg-on-primary fixed top-0 left-0 right-0 z-50">
    <div class="flex items-center h-14 px-4">
      <button 
        v-if="showBack" 
        @click="$router.back()" 
        class="mr-4 text-on-surface-variant"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="font-roboto text-[22px] leading-[28px] font-normal flex-1 text-center text-on-surface">{{ title }}</h1>
      <button 
        v-if="showHelp"
        @click="helpDialog.openHelpDialog()"
        class="ml-4 text-on-surface-variant"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </button>
    </div>
  </header>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'AppHeader',
  props: {
    title: {
      type: String,
      required: true
    },
    showBack: {
      type: Boolean,
      default: true
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

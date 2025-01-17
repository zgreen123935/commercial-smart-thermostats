<template>
  <div class="min-h-screen bg-white">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <AppDialog v-model="showHelpDialog">
      <div class="space-y-6">
        <h2 class="text-xl font-medium text-on-surface">Need Help?</h2>
        <p class="text-on-surface-variant">
          Would you like to speak with Mysa Commercial HVAC Support Team?
        </p>
        <p class="text-on-surface-variant mb-2">
          Monday - Friday, 9:00 AM to 5:00 PM EST
        </p>
        <p class="text-on-surface font-medium">
          (709) 330-3160
        </p>
        <div class="flex justify-end space-x-4">
          <AppButton
            variant="secondary"
            @click="showHelpDialog = false"
          >
            Close
          </AppButton>
          <AppButton
            @click="callSupport"
          >
            Call Now
          </AppButton>
        </div>
      </div>
    </AppDialog>
  </div>
</template>

<script>
import { ref, provide } from 'vue'
import AppDialog from '@/components/base/AppDialog.vue'
import AppButton from '@/components/base/AppButton.vue'

export default {
  name: 'App',
  components: {
    AppDialog,
    AppButton
  },
  setup() {
    const showHelpDialog = ref(false)

    const openHelpDialog = () => {
      showHelpDialog.value = true
    }

    const callSupport = () => {
      window.location.href = 'tel:+17093303160'
    }

    // Provide the help dialog state and methods to all child components
    provide('helpDialog', {
      showHelpDialog,
      openHelpDialog
    })

    return {
      showHelpDialog,
      callSupport
    }
  }
}
</script>

<style>
@import './assets/tailwind.css';

/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

/* Base styles */
body {
  @apply text-on-surface antialiased bg-white;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Fix iOS button styles */
button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>

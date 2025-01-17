<template>
  <div class="min-h-screen bg-background">
    <AppHeader 
      :title="title"
      :show-back="showBack"
      :show-help="true"
      @help-click="showHelpDialog = true"
    />
    
    <div class="pt-16 px-4">
      <slot></slot>
    </div>

    <HelpDialog v-model="showHelpDialog" />
  </div>
</template>

<script>
import { ref } from 'vue'
import AppHeader from '@/components/base/AppHeader.vue'
import HelpDialog from '@/components/base/HelpDialog.vue'

export default {
  name: 'BaseView',
  components: {
    AppHeader,
    HelpDialog
  },
  props: {
    title: {
      type: String,
      required: true
    },
    showBack: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const showHelpDialog = ref(false)
    return {
      showHelpDialog
    }
  }
}
</script>

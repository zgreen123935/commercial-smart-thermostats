import { ref } from 'vue'

const showHelpDialog = ref(false)

export function useHelpDialog() {
  const openHelpDialog = () => {
    showHelpDialog.value = true
  }

  const closeHelpDialog = () => {
    showHelpDialog.value = false
  }

  const callSupport = () => {
    window.location.href = 'tel:+17093303160'
  }

  return {
    showHelpDialog,
    openHelpDialog,
    closeHelpDialog,
    callSupport
  }
}

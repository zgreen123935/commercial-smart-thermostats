import { ref } from 'vue'
import HelpDialog from '@/components/base/HelpDialog.vue'

export default {
  components: {
    HelpDialog
  },
  setup() {
    const showHelpDialog = ref(false)
    return {
      showHelpDialog
    }
  }
}

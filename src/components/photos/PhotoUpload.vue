<template>
  <div class="space-y-4">
    <div v-if="!modelValue" class="relative">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        @change="handleUpload"
      >
      <div 
        class="
          border-2 border-dashed border-outline-variant rounded-lg p-8
          flex flex-col items-center justify-center space-y-4
          bg-surface-container-low hover:bg-surface-container transition-colors
          min-h-[200px]
        "
      >
        <svg class="w-8 h-8 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <div class="text-center">
          <h3 class="text-headline-small text-on-surface font-medium mb-1">{{ label }}</h3>
          <p class="text-on-surface-variant">{{ description }}</p>
        </div>
      </div>
    </div>

    <div v-else class="relative">
      <img :src="modelValue" :alt="label" class="w-full max-h-[250px] object-contain rounded-lg">
      <button
        @click="handleRemove"
        class="absolute top-2 right-2 p-2 bg-surface-container-high rounded-full"
      >
        <svg class="w-5 h-5 text-on-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhotoUpload',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  methods: {
    handleUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        this.$emit('update:modelValue', e.target.result)
      }
      reader.readAsDataURL(file)
    },
    handleRemove() {
      this.$emit('update:modelValue', '')
    }
  }
}
</script>

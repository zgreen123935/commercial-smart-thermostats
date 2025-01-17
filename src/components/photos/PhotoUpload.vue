<template>
  <div class="border-2 border-dashed border-outline rounded-lg p-4 text-center">
    <div v-if="!modelValue" class="space-y-4">
      <slot name="icon">
        <svg class="w-12 h-12 mx-auto text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
      </slot>
      <div>
        <p class="font-roboto text-body-large text-on-surface">{{ label }}</p>
        <p class="font-roboto text-body-medium text-on-surface-variant mt-1">
          {{ description }}
        </p>
      </div>
      <button
        @click="$refs.fileInput.click()"
        class="px-4 py-2 bg-primary text-on-primary rounded-full font-roboto text-label-large"
      >
        Upload Photo
      </button>
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleUpload"
      >
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
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.$emit('update:modelValue', e.target.result)
        }
        reader.readAsDataURL(file)
      }
    },
    handleRemove() {
      this.$emit('update:modelValue', '')
    }
  }
}
</script>

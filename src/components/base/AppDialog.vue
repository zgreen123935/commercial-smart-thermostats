<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          class="fixed inset-0 bg-black/50"
          @click="$emit('update:modelValue', false)"
        ></div>
        
        <div 
          class="relative bg-surface-container rounded-[28px] w-[312px] min-w-[280px] max-w-[560px] shadow-xl"
        >
          <!-- Hero Icon -->
          <div v-if="icon" class="flex justify-center pt-6">
            <slot name="icon">
              <div class="w-12 h-12 flex items-center justify-center text-on-surface-variant">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </slot>
          </div>

          <!-- Title & Description -->
          <div class="p-6">
            <slot name="title">
              <h2 v-if="title" class="text-[24px] leading-[32px] font-normal text-on-surface text-center mb-4">
                {{ title }}
              </h2>
            </slot>
            
            <slot name="description">
              <p v-if="description" class="text-body-large text-on-surface-variant text-center">
                {{ description }}
              </p>
            </slot>

            <slot></slot>
          </div>

          <!-- Actions -->
          <div v-if="$slots.actions" class="flex justify-end gap-2 p-6 pt-0">
            <slot name="actions"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
export default {
  name: 'AppDialog',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    icon: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue']
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

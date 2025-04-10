<template>
  <Teleport to="body">
    <transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
        @click="handleBackdropClick"
      >
        <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

        <div
          class="relative bg-white rounded-lg shadow-xl max-w-md mx-auto w-full max-h-[90vh] flex flex-col overflow-hidden transition-all"
          @click.stop
        >
          <!-- Header -->
          <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">
              <slot name="header">{{ title }}</slot>
            </h3>
            <button
              v-if="showCloseButton"
              type="button"
              class="text-gray-400 hover:text-gray-500 focus:outline-none"
              @click="close"
            >
              <span class="sr-only">Close</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="flex-1 px-4 py-5 overflow-y-auto">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="px-4 py-3 bg-gray-50 border-t border-gray-200">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  showCloseButton: {
    type: Boolean,
    default: true
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['update:modelValue', 'close']);

const close = () => {
  emit('update:modelValue', false);
  emit('close');
};

const handleBackdropClick = (event: MouseEvent) => {
  if (props.closeOnBackdrop && event.target === event.currentTarget) {
    close();
  }
};
</script>

<script lang="ts">
export default {
  name: 'ModalDialog'
};
</script>

<style scoped>
/* Transition animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.95);
  opacity: 0;
}
</style>

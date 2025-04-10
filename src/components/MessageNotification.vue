<template>
  <Teleport to="body">
    <div v-if="visible" class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div :class="[
        'message-notification px-4 py-3 rounded-lg shadow-md flex items-center',
        typeClass
      ]">
        <span class="mr-2">
          <svg v-if="type === 'success'" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <svg v-else-if="type === 'error'" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <svg v-else-if="type === 'warning'" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <svg v-else class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z" clip-rule="evenodd" />
          </svg>
        </span>
        <span>{{ message }}</span>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

type MessageType = 'success' | 'error' | 'warning' | 'info';

const props = defineProps<{
  message: string;
  type: MessageType;
  duration?: number;
}>();

const visible = ref(true);
const timer = ref<number | null>(null);

const typeClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-50 text-green-700 border-l-4 border-green-500';
    case 'error':
      return 'bg-red-50 text-red-700 border-l-4 border-red-500';
    case 'warning':
      return 'bg-yellow-50 text-yellow-700 border-l-4 border-yellow-500';
    case 'info':
    default:
      return 'bg-blue-50 text-blue-700 border-l-4 border-blue-500';
  }
});

onMounted(() => {
  if (props.duration !== 0) {
    timer.value = window.setTimeout(() => {
      visible.value = false;
    }, props.duration || 3000);
  }
});

onUnmounted(() => {
  if (timer.value) {
    clearTimeout(timer.value);
  }
});
</script>

<style scoped>
.message-notification {
  min-width: 280px;
  max-width: 80vw;
  animation: slideDown 0.3s ease-out forwards;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
}

@keyframes slideDown {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>

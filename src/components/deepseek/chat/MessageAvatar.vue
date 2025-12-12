<template>
  <div v-if="role === 'user'" class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-purple-200">
    <img src="@/assets/user.jpg" alt="User" class="w-full h-full object-cover" />
  </div>
  <div v-else class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-lg">
    🤖
  </div>
</template>

<script setup lang="ts">
defineProps<{
  role: 'user' | 'assistant' | 'system';
}>();
</script>

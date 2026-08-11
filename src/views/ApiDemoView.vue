<template>
  <div class="api-demo-container flex-1 min-h-0 w-full flex flex-col py-4 md:py-6">
    <DeepseekDemo />
  </div>
</template>

<script setup lang="ts">
import DeepseekDemo from '../components/DeepseekDemo.vue';
</script>

<style scoped>
.api-demo-container {
  min-height: 0;
}
</style>

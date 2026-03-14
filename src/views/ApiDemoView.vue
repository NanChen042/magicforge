<template>
  <div class="api-demo-container">
    <DeepseekDemo />
  </div>
</template>

<script setup lang="ts">
import DeepseekDemo from '../components/DeepseekDemo.vue';
</script>

<style scoped>
.api-demo-container {
  width: 100%;
  height: calc(100vh - 5rem);
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>

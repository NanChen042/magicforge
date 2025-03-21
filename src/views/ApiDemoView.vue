<template>
  <div class="api-demo-container">
    <DeepseekDemo :api-base-url="apiUrl" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DeepseekDemo from '../components/DeepseekDemo.vue';
import { useApiStore } from '../stores/api';

const apiStore = useApiStore();
const apiUrl = ref(apiStore.apiUrl);

onMounted(() => {
  // 从本地存储加载API URL
  const savedApiUrl = localStorage.getItem('apiUrl');
  if (savedApiUrl) {
    apiUrl.value = savedApiUrl;
    apiStore.setApiUrl(savedApiUrl);
  }
});
</script>

<style scoped>
.api-demo-container {
  width: 100%;
  height: 100%;
}
</style>

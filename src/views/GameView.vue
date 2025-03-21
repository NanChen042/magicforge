<script setup lang="ts">
import { ref, onMounted } from 'vue';
import GiaoGame from '../components/GiaoGame.vue';
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

<template>
  <div class="game-view-container">
    <GiaoGame :api-base-url="apiUrl" />
  </div>
</template>

<style scoped>
.game-view-container {
  width: 100%;
  height: 100%;
}
</style>

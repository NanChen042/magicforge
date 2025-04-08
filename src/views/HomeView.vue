<template>
  <div class="home-view-container">
    <HomePage @change-tab="handleTabChange" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import HomePage from '../components/HomePage.vue';

const router = useRouter();

const handleTabChange = (tab: string) => {
  switch (tab) {
    case 'api-demo':
      router.push('/api-demo');
      break;
    case 'game':
      router.push('/game');
      break;
    case 'prompt-library':
      router.push('/prompt-library');
      break;
    default:
      router.push('/');
      break;
  }
};
</script>

<style scoped>
.home-view-container {
  width: 100%;
  height: 100%;
}
</style>

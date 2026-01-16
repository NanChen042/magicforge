<template>
  <div class="api-demo-container">
    <DeepseekDemo />
  </div>
</template>

<script setup lang="ts">
import DeepseekDemo from '../components/DeepseekDemo.vue';
// DeepseekDemo 内部通过 useDeepseekApi 自行管理 API 配置
// 无需在此处重复管理状态
</script>

<style scoped>
.api-demo-container {
  width: 100%;
  height: 100vh;
  min-height: 0;
  overflow: hidden;
}
</style>

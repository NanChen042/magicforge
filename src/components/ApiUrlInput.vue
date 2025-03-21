<template>
  <div class="api-url-input">
<!--     <div class="input-wrapper">
      <span class="input-icon">🔗</span>
      <input
        type="text"
        v-model="localApiUrl"
        placeholder="输入 API 地址（例如 http://106.14.176.242:9998/v1/chat/completions）"
        @keyup.enter="updateUrl"
      />
    </div>
    <button @click="updateUrl">更新 API</button> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useApiStore } from '../stores/api';
import { updateApiConfig } from '../services/deepseekService';

const apiStore = useApiStore();
const localApiUrl = ref(apiStore.apiUrl);

// 监听全局API URL的变化
watch(() => apiStore.apiUrl, (newUrl) => {
  localApiUrl.value = newUrl;
});

// 初始化时从本地存储加载API URL
onMounted(() => {
  const savedApiUrl = localStorage.getItem('apiUrl');
  if (savedApiUrl) {
    localApiUrl.value = savedApiUrl;
    apiStore.setApiUrl(savedApiUrl);
  }
});

// 更新API URL
const updateUrl = () => {
  apiStore.setApiUrl(localApiUrl.value);
  updateApiConfig({ baseUrl: localApiUrl.value });
};
</script>

<style scoped>
.api-url-input {
  max-width: 800px;
  margin: 0 auto 2rem auto;
  display: flex;
  gap: 1rem;
}

.input-wrapper {
  flex: 1;
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
}

.api-url-input input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

.api-url-input button {
  padding: 0.75rem 1.5rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.api-url-input button:hover {
  background-color: #4338ca;
}
</style>

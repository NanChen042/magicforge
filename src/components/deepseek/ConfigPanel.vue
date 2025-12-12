<template>
  <div class="bg-white rounded-xl shadow-md border border-gray-100 p-4 md:p-6 lg:w-full min-h-[500px] md:min-h-[650px] order-2 lg:order-1">
    <div class="flex items-center space-x-3 mb-6">
      <div class="bg-purple-100 p-2 rounded-lg">
        <SettingsIcon />
      </div>
      <h2 class="text-xl font-semibold text-gray-800">系统配置</h2>
    </div>

    <ApiSettings
      :apiKey="apiKey"
      :apiUrl="apiUrl"
      @update:apiKey="$emit('update:apiKey', $event)"
      @update:apiUrl="$emit('update:apiUrl', $event)"
    />

    <ModelSelector
      :modelName="modelName"
      :showSuccess="showingModelSuccess"
      @update:modelName="$emit('update:modelName', $event)"
      @update="handleModelUpdate"
    />

    <ApiStyleSelector
      :apiStyle="apiStyle"
      @update:apiStyle="$emit('update:apiStyle', $event)"
    />

    <ParameterControls
      :streaming="streaming"
      :temperature="temperature"
      :maxTokens="maxTokens"
      @update:streaming="$emit('update:streaming', $event)"
      @update:temperature="$emit('update:temperature', $event)"
      @update:maxTokens="$emit('update:maxTokens', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ApiSettings from './config/ApiSettings.vue';
import ModelSelector from './config/ModelSelector.vue';
import ApiStyleSelector from './config/ApiStyleSelector.vue';
import ParameterControls from './config/ParameterControls.vue';
import SettingsIcon from './icons/SettingsIcon.vue';

defineProps<{
  apiKey: string;
  apiUrl: string;
  modelName: string;
  apiStyle: 'openai' | 'adapter';
  streaming: boolean;
  temperature: number;
  maxTokens: number;
}>();

const emit = defineEmits<{
  'update:apiKey': [value: string];
  'update:apiUrl': [value: string];
  'update:modelName': [value: string];
  'update:apiStyle': [value: 'openai' | 'adapter'];
  'update:streaming': [value: boolean];
  'update:temperature': [value: number];
  'update:maxTokens': [value: number];
}>();

const showingModelSuccess = ref(false);

const handleModelUpdate = () => {
  showingModelSuccess.value = true;
  setTimeout(() => {
    showingModelSuccess.value = false;
  }, 2000);
};
</script>

<template>
  <div class="p-3 md:p-4 border-t border-gray-200 mt-auto bg-gray-50">
    <div class="flex flex-col">
      <InputTextarea
        :modelValue="modelValue"
        :disabled="isProcessing"
        @update:modelValue="$emit('update:modelValue', $event)"
        @send="$emit('send')"
      />

      <div class="flex flex-wrap md:flex-nowrap justify-between items-center gap-2">
        <div class="w-full md:w-auto order-2 md:order-1">
          <button
            class="w-full md:w-auto inline-flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            title="清空对话"
            @click="$emit('clear')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <span>清空对话</span>
          </button>
        </div>

        <ActionButtons
          :canSend="canSend"
          :isProcessing="isProcessing"
          :isSearching="isSearching"
          :isTransforming="isTransforming"
          :enableWebSearch="enableWebSearch"
          @update:enableWebSearch="$emit('update:enableWebSearch', $event)"
          @send="$emit('send')"
          @stop="$emit('stop')"
          @optimize="$emit('optimize')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputTextarea from './input/InputTextarea.vue';
import ActionButtons from './input/ActionButtons.vue';

defineProps<{
  modelValue: string;
  canSend: boolean;
  isProcessing: boolean;
  isSearching: boolean;
  isTransforming: boolean;
  enableWebSearch: boolean;
}>();

defineEmits<{
  'update:modelValue': [value: string];
  'update:enableWebSearch': [value: boolean];
  send: [];
  clear: [];
  optimize: [];
  stop: [];
}>();
</script>

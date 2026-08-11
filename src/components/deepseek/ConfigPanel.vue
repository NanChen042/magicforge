<template>
  <div class="p-5 space-y-6 bg-white overflow-y-auto h-full text-zinc-900 font-sans">
    
    <!-- Section 1: API 凭证与端点配置 -->
    <div class="space-y-4 pb-6 border-b border-zinc-200">
      <h3 class="text-xs font-bold text-zinc-400 font-sans">API 密钥与服务端点</h3>

      <!-- Secret Key -->
      <div>
        <label class="block text-xs font-bold text-zinc-800 mb-1.5">API Secret Key</label>
        <div class="relative">
          <input
            type="password"
            :value="apiKey"
            @input="$emit('update:apiKey', ($event.target as HTMLInputElement).value)"
            placeholder="sk-..."
            class="w-full pl-3 pr-8 py-2 bg-zinc-50 border border-zinc-300 rounded-sm text-xs font-mono text-zinc-900 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 focus:outline-none transition-all shadow-2xs"
          />
        </div>
        <p class="text-[11px] text-zinc-500 mt-1 font-light">
          获取专属密钥：<a href="https://cloud.siliconflow.cn/account/ak" target="_blank" class="text-zinc-900 font-medium underline hover:text-blue-600">SiliconFlow 云控制台</a>
        </p>
      </div>


    </div>

    <!-- Section 2: 核心采样参数 -->
    <div class="space-y-4 pb-6 border-b border-zinc-200">
      <h3 class="text-xs font-bold text-zinc-400 font-sans">模型响应采样</h3>

      <!-- 流式输出 -->
      <div class="flex items-center justify-between">
        <div>
          <span class="text-xs font-bold text-zinc-900">流式实时响应 (Streaming)</span>
          <p class="text-[11px] text-zinc-400 font-light mt-0.5">字符打字机效果渐进式输出</p>
        </div>
        <el-switch
          :model-value="streaming"
          @change="$emit('update:streaming', $event)"
          active-color="#18181b"
        />
      </div>

      <!-- Temperature -->
      <div>
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-xs font-bold text-zinc-900">随机发散度 (Temperature)</span>
          <span class="text-xs font-mono font-bold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded-sm border border-zinc-200">{{ temperature.toFixed(1) }}</span>
        </div>
        <input
          type="range"
          :value="temperature"
          @input="$emit('update:temperature', parseFloat(($event.target as HTMLInputElement).value))"
          min="0"
          max="2"
          step="0.1"
          class="w-full h-1.5 bg-zinc-200 rounded-sm appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      <!-- Max Tokens -->
      <div>
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-xs font-bold text-zinc-900">最大生成长度 (Max Tokens)</span>
          <span class="text-xs font-mono font-bold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded-sm border border-zinc-200">{{ maxTokens }}</span>
        </div>
        <input
          type="range"
          :value="maxTokens"
          @input="$emit('update:maxTokens', parseInt(($event.target as HTMLInputElement).value))"
          min="500"
          max="8000"
          step="500"
          class="w-full h-1.5 bg-zinc-200 rounded-sm appearance-none cursor-pointer accent-blue-600"
        />
      </div>
    </div>

    <!-- Section 3: 高级参数控制 (可折叠) -->
    <div>
      <el-collapse v-model="showAdvancedParams" class="border-none">
        <el-collapse-item name="advanced" title="高级采样控制 (Top P / Penalty)">
          <div class="space-y-4 pt-3">
            <div>
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs font-semibold text-zinc-700">Top P 核采样</span>
                <span class="text-xs font-mono text-zinc-800">{{ topP.toFixed(2) }}</span>
              </div>
              <input
                type="range"
                :value="topP"
                @input="$emit('update:topP', parseFloat(($event.target as HTMLInputElement).value))"
                min="0"
                max="1"
                step="0.05"
                class="w-full h-1.5 bg-zinc-200 rounded-sm appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs font-semibold text-zinc-700">Top K 候选池</span>
                <span class="text-xs font-mono text-zinc-800">{{ topK }}</span>
              </div>
              <input
                type="range"
                :value="topK"
                @input="$emit('update:topK', parseInt(($event.target as HTMLInputElement).value))"
                min="0"
                max="100"
                step="5"
                class="w-full h-1.5 bg-zinc-200 rounded-sm appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs font-semibold text-zinc-700">频率惩罚 Frequency Penalty</span>
                <span class="text-xs font-mono text-zinc-800">{{ frequencyPenalty.toFixed(1) }}</span>
              </div>
              <input
                type="range"
                :value="frequencyPenalty"
                @input="$emit('update:frequencyPenalty', parseFloat(($event.target as HTMLInputElement).value))"
                min="-2"
                max="2"
                step="0.1"
                class="w-full h-1.5 bg-zinc-200 rounded-sm appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs font-semibold text-zinc-700">存在惩罚 Presence Penalty</span>
                <span class="text-xs font-mono text-zinc-800">{{ presencePenalty.toFixed(1) }}</span>
              </div>
              <input
                type="range"
                :value="presencePenalty"
                @input="$emit('update:presencePenalty', parseFloat(($event.target as HTMLInputElement).value))"
                min="-2"
                max="2"
                step="0.1"
                class="w-full h-1.5 bg-zinc-200 rounded-sm appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  apiKey: string;
  modelName: string;
  streaming: boolean;
  temperature: number;
  maxTokens: number;
  topP: number;
  topK: number;
  frequencyPenalty: number;
  presencePenalty: number;
}>();

defineEmits<{
  'update:apiKey': [value: string];
  'update:modelName': [value: string];
  'update:streaming': [value: boolean];
  'update:temperature': [value: number];
  'update:maxTokens': [value: number];
  'update:topP': [value: number];
  'update:topK': [value: number];
  'update:frequencyPenalty': [value: number];
  'update:presencePenalty': [value: number];
}>();

const showAdvancedParams = ref<string[]>([]);
</script>
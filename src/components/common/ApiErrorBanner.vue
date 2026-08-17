<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  code?: string
  message?: string
  details?: {
    title?: string
    reason?: string
    solution?: string
  } | null
  showClose?: boolean
  showRetry?: boolean
  showSettings?: boolean
  showSwitchFree?: boolean
}>()

const emit = defineEmits<{
  close: []
  retry: []
  settings: []
  'switch-free': []
}>()

const displayTitle = computed(() => {
  if (props.details?.title) return props.details.title
  if (props.code === '402') return 'SiliconFlow 账户余额不足 (HTTP 402)'
  if (props.code === '401') return 'API Key 授权失败 (HTTP 401)'
  if (props.code === '403') return '模型访问受限 (HTTP 403)'
  if (props.code === '429') return '请求过于频繁 (HTTP 429)'
  if (props.code === 'NETWORK_ERROR') return '网络连接异常'
  return 'API 请求异常'
})

const displayMessage = computed(() => {
  if (props.code === '402') {
    return '您当前调用的模型需要消耗 SiliconFlow 账户额度。您当前配置的 API Key 余额已用尽。建议一键切换为全免费模型或在设置中更换 API Key。'
  }
  if (props.code === '401') {
    return '当前填写的 API Key 无法通过平台鉴权，请检查密钥是否正确或已过期。'
  }
  if (props.code === '403') {
    return '您当前使用的 API Key 没有权限访问该模型，可能是模型已下线或未开通权限。'
  }
  return props.message || '请求无法完成，请检查网络连接或稍后重试。'
})
</script>

<template>
  <div class="p-3.5 bg-red-50/70 border border-red-200/90 rounded-xs space-y-2.5">
    <div class="flex items-start gap-2.5">
      <div class="w-5 h-5 rounded-xs bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
        !
      </div>
      <div class="flex-1 space-y-1">
        <div class="flex items-center justify-between">
          <h4 class="text-xs font-bold text-red-700">
            {{ displayTitle }}
          </h4>
          <div class="flex items-center gap-2">
            <span v-if="code" class="text-[10px] font-mono text-red-400">错误码: {{ code }}</span>
            <button v-if="showClose" @click="emit('close')" class="text-xs text-red-400 hover:text-red-600 cursor-pointer">✕ 关闭</button>
          </div>
        </div>
        <p class="text-xs text-red-600/90 leading-relaxed">
          {{ displayMessage }}
        </p>

        <!-- 详细排查建议 -->
        <div v-if="details" class="bg-white rounded-xs p-3 mt-2 text-xs space-y-1.5 border border-red-200/70 text-zinc-700">
          <div v-if="details.reason" class="flex gap-2">
            <span class="text-red-600 font-semibold shrink-0">排查原因:</span>
            <span>{{ details.reason }}</span>
          </div>
          <div v-if="details.solution" class="flex gap-2">
            <span class="text-emerald-600 font-semibold shrink-0">解决建议:</span>
            <span>{{ details.solution }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 快捷操作按钮 -->
    <div v-if="showRetry || showSettings || showSwitchFree" class="flex flex-wrap items-center gap-2 pt-1 border-t border-red-100 text-xs font-mono">
      <button
        v-if="showSwitchFree"
        type="button"
        @click="emit('switch-free')"
        class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xs font-bold transition-colors shadow-2xs cursor-pointer flex items-center gap-1 text-[11px]"
      >
        <span>✦ 一键切换为免费模型</span>
      </button>
      <button
        v-if="showRetry"
        type="button"
        @click="emit('retry')"
        class="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-xs font-bold transition-colors shadow-2xs cursor-pointer flex items-center gap-1 text-[11px]"
      >
        <span>↻ 重试请求</span>
      </button>
      <button
        v-if="showSettings"
        type="button"
        @click="emit('settings')"
        class="px-2.5 py-1 bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 rounded-xs font-medium transition-colors shadow-2xs cursor-pointer flex items-center gap-1 text-[11px]"
      >
        <span>⚙️ 检查配置</span>
      </button>
    </div>
  </div>
</template>

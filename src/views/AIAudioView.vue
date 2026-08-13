<template>
  <div class="mx-auto flex w-full max-w-5xl flex-col gap-6 py-6 md:py-10">
    <header class="border-b border-zinc-200 pb-5">
      <p class="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">SiliconFlow Audio</p>
      <h1 class="mt-2 text-2xl font-semibold text-zinc-900">语音工具</h1>
      <p class="mt-1 text-sm text-zinc-500">使用与聊天和图像生成相同的 API Key 与连接配置。</p>
    </header>
    <el-tabs v-model="activeTab" class="audio-tabs">
      <el-tab-pane label="文本转语音" name="speech">
        <section class="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div class="space-y-4">
            <textarea v-model="speechText" class="min-h-56 w-full resize-y rounded-sm border border-zinc-300 bg-white p-4 text-sm leading-7 text-zinc-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10" placeholder="输入需要朗读的文本" />
            <div class="flex flex-wrap items-center gap-3"><el-button type="primary" :loading="speechLoading" :disabled="!speechText.trim()" @click="generateSpeech">生成语音</el-button><a v-if="speechUrl" :href="speechUrl" download="siliconflow-speech.mp3" class="text-sm font-medium text-blue-700 hover:text-blue-800">下载音频</a></div>
            <audio v-if="speechUrl" :src="speechUrl" controls class="w-full" />
          </div>
          <aside class="space-y-4 border border-zinc-200 bg-zinc-50 p-4"><label class="block text-xs font-medium text-zinc-700">语音模型</label><el-input v-model="speechModel" placeholder="例如 FunAudioLLM/CosyVoice2-0.5B" /><label class="block text-xs font-medium text-zinc-700">音色</label><el-input v-model="voice" placeholder="例如 alex" /><label class="block text-xs font-medium text-zinc-700">语速</label><el-slider v-model="speed" :min="0.5" :max="2" :step="0.1" show-input /></aside>
        </section>
      </el-tab-pane>
      <el-tab-pane label="语音转写" name="transcription">
        <section class="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div class="space-y-4"><el-upload :auto-upload="false" :limit="1" accept="audio/*" :on-change="handleAudioChange" :on-remove="clearAudio"><el-button>选择音频文件</el-button></el-upload><div class="flex items-center gap-3"><el-button type="primary" :loading="transcriptionLoading" :disabled="!audioFile" @click="transcribe">开始转写</el-button><el-button v-if="transcription" text @click="copyTranscription">复制文本</el-button></div><textarea v-model="transcription" readonly class="min-h-56 w-full resize-y rounded-sm border border-zinc-300 bg-zinc-50 p-4 text-sm leading-7 text-zinc-800 outline-none" placeholder="转写结果会显示在这里" /></div>
          <aside class="space-y-4 border border-zinc-200 bg-zinc-50 p-4"><label class="block text-xs font-medium text-zinc-700">转写模型</label><el-input v-model="transcriptionModel" placeholder="例如 TeleAI/TeleSpeechASR" /><p class="text-xs leading-5 text-zinc-500">模型名称以当前 API Key 的可用模型列表为准。</p></aside>
        </section>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { ElMessage, type UploadFile } from 'element-plus';
import { useApiStore } from '@/stores/api';
import { SiliconFlowClient } from '@/services/siliconFlowClient';
const apiStore = useApiStore(); const activeTab = ref('speech'); const speechText = ref(''); const speechModel = ref('FunAudioLLM/CosyVoice2-0.5B'); const voice = ref('alex'); const speed = ref(1); const speechLoading = ref(false); const speechUrl = ref(''); const audioFile = ref<File | null>(null); const transcriptionModel = ref('TeleAI/TeleSpeechASR'); const transcriptionLoading = ref(false); const transcription = ref('');
const createClient = () => new SiliconFlowClient({ apiUrl: apiStore.apiUrl, apiKey: apiStore.apiKey });
const generateSpeech = async () => { speechLoading.value = true; try { const blob = await createClient().createSpeech({ model: speechModel.value, input: speechText.value, voice: voice.value, speed: speed.value, response_format: 'mp3' }); if (speechUrl.value) URL.revokeObjectURL(speechUrl.value); speechUrl.value = URL.createObjectURL(blob); } catch (error) { ElMessage.error(error instanceof Error ? error.message : '语音生成失败'); } finally { speechLoading.value = false; } };
const handleAudioChange = (file: UploadFile) => { audioFile.value = file.raw || null; }; const clearAudio = () => { audioFile.value = null; };
const transcribe = async () => { if (!audioFile.value) return; transcriptionLoading.value = true; try { const result = await createClient().transcribeAudio(audioFile.value, transcriptionModel.value); transcription.value = result.text || ''; } catch (error) { ElMessage.error(error instanceof Error ? error.message : '语音转写失败'); } finally { transcriptionLoading.value = false; } };
const copyTranscription = async () => { await navigator.clipboard.writeText(transcription.value); ElMessage.success('已复制'); };
onUnmounted(() => { if (speechUrl.value) URL.revokeObjectURL(speechUrl.value); });
</script>

<style scoped>
:deep(.audio-tabs .el-tabs__item.is-active) { color: #2563eb; }
:deep(.audio-tabs .el-tabs__active-bar) { background-color: #2563eb; }
</style>

<template>
  <div class="min-h-[calc(100vh-60px)] w-full bg-[#f8fafc] text-zinc-800 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 font-sans select-none">
    <div class="max-w-6xl mx-auto space-y-6">
      
      <!-- Studio Header -->
      <header class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200/80">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2 py-0.5 rounded-xs bg-blue-50 text-blue-700 border border-blue-200/80 font-mono text-[11px] font-bold">
              语音工坊
            </span>
            <span class="text-xs text-zinc-400 font-mono">SiliconFlow 原生驱动</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
            智能语音工作站
          </h1>
          <p class="text-xs sm:text-sm text-zinc-500 mt-1">
            基于 CosyVoice2 与 SenseVoice 深度构建，支持超拟人文本转语音与高精度全语种转写。
          </p>
        </div>

        <!-- Connection Status Pill -->
        <div class="flex items-center gap-2 self-start sm:self-center">
          <div
            class="px-3 py-1.5 rounded-xs border text-xs font-mono flex items-center gap-2 shadow-2xs"
            :class="apiStore.apiKey ? 'bg-white border-emerald-200 text-emerald-700' : 'bg-amber-50 border-amber-200 text-amber-800'"
          >
            <span class="w-2 h-2 rounded-full" :class="apiStore.apiKey ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'"></span>
            <span>{{ apiStore.apiKey ? 'API 密钥已连接' : '未配置 API 密钥' }}</span>
          </div>
        </div>
      </header>

      <!-- Main Tabs (TTS vs ASR) -->
      <div class="flex items-center gap-2 p-1 bg-zinc-200/60 rounded-xs w-fit border border-zinc-200/80 text-xs font-bold">
        <button
          @click="activeTab = 'speech'"
          class="px-4 py-2 rounded-xs transition-all cursor-pointer flex items-center gap-2"
          :class="activeTab === 'speech' ? 'bg-white text-blue-600 shadow-2xs border border-zinc-200/60' : 'text-zinc-600 hover:text-zinc-900'"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="23"></line>
            <line x1="8" y1="23" x2="16" y2="23"></line>
          </svg>
          <span>文本转语音 (TTS)</span>
        </button>
        <button
          @click="activeTab = 'transcription'"
          class="px-4 py-2 rounded-xs transition-all cursor-pointer flex items-center gap-2"
          :class="activeTab === 'transcription' ? 'bg-white text-blue-600 shadow-2xs border border-zinc-200/60' : 'text-zinc-600 hover:text-zinc-900'"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <span>语音转写 (ASR)</span>
        </button>
      </div>

      <!-- TAB 1: TEXT-TO-SPEECH (TTS) -->
      <div v-if="activeTab === 'speech'" class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- Left: Input & Audio Output Deck (7 cols) -->
        <div class="lg:col-span-7 space-y-4">
          
          <!-- Text Input Card -->
          <div class="bg-white rounded-xs border border-zinc-200 p-4 sm:p-5 shadow-2xs space-y-3">
            <div class="flex items-center justify-between">
              <label class="text-xs font-bold text-zinc-700 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                <span>待合成文本</span>
              </label>
              <span class="text-[11px] font-mono text-zinc-400">
                {{ speechText.length }}/4096 字符
              </span>
            </div>

            <textarea
              v-model="speechText"
              rows="6"
              class="w-full resize-none rounded-xs border border-zinc-200 bg-white p-3 text-sm leading-relaxed text-zinc-800 placeholder-zinc-400 shadow-2xs outline-none transition-all hover:border-zinc-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10 custom-scrollbar"
              placeholder="在此输入需要合成语音的中英文文本，支持故事叙述、新闻播报、角色台词等..."
            ></textarea>

            <!-- Quick Presets -->
            <div class="flex flex-wrap items-center gap-1.5 pt-1">
              <span class="text-[11px] text-zinc-400 mr-1">快捷示例:</span>
              <button
                v-for="p in speechPresets"
                :key="p.label"
                type="button"
                @click="speechText = p.text"
                class="px-2 py-0.5 rounded-xs bg-zinc-50 hover:bg-blue-50 text-zinc-600 hover:text-blue-700 border border-zinc-200/80 hover:border-blue-200 text-[11px] transition-all cursor-pointer"
              >
                {{ p.label }}
              </button>
            </div>

            <!-- Action Button -->
            <div class="pt-2">
              <button
                @click="generateSpeech"
                :disabled="speechLoading || !speechText.trim()"
                class="w-full py-3 px-6 rounded-xs bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm tracking-wide shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="speechLoading" class="flex items-center gap-2">
                  <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>正在端到端生成高拟真语音...</span>
                </span>
                <span v-else class="flex items-center gap-2">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  </svg>
                  <span>开始合成语音</span>
                </span>
              </button>
            </div>
          </div>

          <!-- Studio Audio Player Card (Visible when audio generated) -->
          <div v-if="speechUrl" class="bg-[#0b101c] rounded-xs border border-slate-800 p-5 shadow-xl text-white space-y-4 animate-fade-in">
            <div class="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-xs bg-blue-600 flex items-center justify-center text-xs">
                  ▶
                </div>
                <div>
                  <h3 class="text-xs font-bold text-slate-100 font-mono">
                    合成音频试听
                  </h3>
                  <p class="text-[10px] text-slate-400 font-mono">
                    模型: {{ speechModel.split('/')?.[1] || speechModel }} · 音色: {{ currentVoiceMeta?.name || voice }}
                  </p>
                </div>
              </div>

              <!-- Download Button -->
              <a
                :href="speechUrl"
                download="siliconflow-audio.mp3"
                class="px-3 py-1.5 rounded-xs bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 text-xs text-slate-200 hover:text-cyan-300 font-mono transition-all flex items-center gap-1.5 shadow-xs"
              >
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>下载 MP3</span>
              </a>
            </div>

            <!-- Waveform Simulation Visualizer -->
            <div class="h-10 bg-slate-900/90 rounded-xs border border-slate-800 flex items-center justify-center gap-1 px-4 overflow-hidden">
              <span
                v-for="i in 36"
                :key="i"
                class="w-1 bg-cyan-400/80 rounded-full transition-all duration-300"
                :style="{ height: `${Math.max(12, ((i * 17) % 32) + 4)}px` }"
              ></span>
            </div>

            <!-- Native Audio Player Controls -->
            <div class="pt-1">
              <audio :src="speechUrl" controls autoplay class="w-full h-10 rounded-xs"></audio>
            </div>
          </div>

          <!-- Error Alert Card -->
          <div v-if="speechError" class="p-3.5 rounded-xs bg-red-50 border border-red-200 text-red-700 text-xs space-y-1">
            <div class="font-bold flex items-center gap-1.5">
              <span>语音合成发生异常</span>
            </div>
            <p class="text-red-600 font-mono leading-relaxed">{{ speechError }}</p>
          </div>

        </div>

        <!-- Right: Studio Parameters & Voice Palette (5 cols) -->
        <aside class="lg:col-span-5 bg-white rounded-xs border border-zinc-200 p-4 sm:p-5 shadow-2xs space-y-5">
          
          <div class="flex items-center justify-between border-b border-zinc-100 pb-3">
            <span class="text-xs font-mono font-bold text-zinc-700 uppercase tracking-wider">
              声音与模型配置
            </span>
          </div>

          <!-- 1. Model Selector -->
          <div class="space-y-2">
            <label class="text-xs font-semibold text-zinc-700 block">
              语音合成模型
            </label>
            <div class="space-y-1.5">
              <div
                v-for="m in ttsModelOptions"
                :key="m.id"
                @click="speechModel = m.id"
                class="p-2.5 rounded-xs border transition-all cursor-pointer flex items-center justify-between"
                :class="speechModel === m.id ? 'border-blue-600 bg-blue-50/40 text-blue-950 ring-1 ring-blue-600/30' : 'border-zinc-200 hover:border-zinc-300 bg-white'"
              >
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold">{{ m.name }}</span>
                    <span v-if="m.badge" class="px-1.5 py-0.2 rounded-xs bg-blue-100 text-blue-700 text-[10px] font-mono font-bold">
                      {{ m.badge }}
                    </span>
                  </div>
                  <p class="text-[11px] text-zinc-500 mt-0.5">{{ m.desc }}</p>
                </div>
                <span v-if="speechModel === m.id" class="text-blue-600 font-bold text-xs">✓</span>
              </div>
            </div>
          </div>

          <!-- 2. Voice Palette (音色选择) -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="text-xs font-semibold text-zinc-700">
                角色音色
              </label>
              <span class="text-[11px] font-mono text-zinc-400">
                当前: {{ currentVoiceMeta?.name || voice }}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div
                v-for="v in voicePresets"
                :key="v.id"
                @click="voice = v.id"
                class="p-2 rounded-xs border transition-all cursor-pointer text-left relative"
                :class="voice === v.id ? 'border-blue-600 bg-blue-50/50 text-blue-900 ring-1 ring-blue-600/30' : 'border-zinc-200 hover:border-zinc-300 bg-white text-zinc-700'"
              >
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold">{{ v.name }}</span>
                  <span class="text-[10px] font-mono px-1 rounded-xs bg-zinc-100 text-zinc-500">{{ v.gender }}</span>
                </div>
                <p class="text-[10px] text-zinc-400 mt-0.5 truncate">{{ v.desc }}</p>
              </div>
            </div>
          </div>

          <!-- 3. Speed & Audio Format Slider -->
          <div class="space-y-3 pt-2 border-t border-zinc-100">
            <div class="space-y-1.5">
              <div class="flex items-center justify-between">
                <label class="text-xs font-semibold text-zinc-700">朗读语速</label>
                <span class="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  {{ speed }}x
                </span>
              </div>
              <input
                type="range"
                v-model.number="speed"
                min="0.5"
                max="2.0"
                step="0.1"
                class="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div class="flex items-center justify-between text-xs pt-1">
              <span class="text-zinc-600 font-semibold">采样率</span>
              <span class="font-mono text-zinc-500">32,000 Hz / 高清</span>
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="text-zinc-600 font-semibold">音频格式</span>
              <span class="font-mono text-zinc-500">MP3 (标准音频)</span>
            </div>
          </div>

        </aside>

      </div>

      <!-- TAB 2: SPEECH-TO-TEXT (ASR) -->
      <div v-else-if="activeTab === 'transcription'" class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- Left: Upload & Output (7 cols) -->
        <div class="lg:col-span-7 space-y-4">
          
          <!-- File Dropzone Card -->
          <div class="bg-white rounded-xs border border-zinc-200 p-5 sm:p-6 shadow-2xs space-y-4">
            <div class="flex items-center justify-between">
              <label class="text-xs font-bold text-zinc-700 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                <span>音频文件上传</span>
              </label>
            </div>

            <div
              class="border-2 border-dashed rounded-xs p-6 text-center transition-all cursor-pointer relative"
              :class="audioFile ? 'border-blue-500 bg-blue-50/20' : 'border-zinc-300 hover:border-blue-400 bg-zinc-50/50'"
              @click="triggerFileInput"
            >
              <input
                ref="fileInputRef"
                type="file"
                accept="audio/*"
                class="hidden"
                @change="handleFileInputChange"
              />

              <div v-if="audioFile" class="space-y-2">
                <div class="w-10 h-10 mx-auto rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="18" cy="16" r="3"></circle>
                  </svg>
                </div>
                <div class="text-sm font-bold text-zinc-800">{{ audioFile.name }}</div>
                <div class="text-xs font-mono text-zinc-500">
                  {{ (audioFile.size / 1024 / 1024).toFixed(2) }} MB · {{ audioFile.type || 'audio/unknown' }}
                </div>
                <button
                  type="button"
                  @click.stop="clearAudio"
                  class="text-xs text-rose-600 hover:underline font-semibold cursor-pointer"
                >
                  移除并更换文件
                </button>
              </div>

              <div v-else class="space-y-2">
                <div class="w-10 h-10 mx-auto rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <div class="text-xs font-bold text-zinc-700">点击上传音频或拖拽至此</div>
                <div class="text-[11px] text-zinc-400 font-mono">支持 MP3, WAV, M4A, OGG, AAC (最大 50MB)</div>
              </div>
            </div>

            <button
              @click="transcribe"
              :disabled="transcriptionLoading || !audioFile"
              class="w-full py-3 px-6 rounded-xs bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm tracking-wide shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="transcriptionLoading" class="flex items-center gap-2">
                <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>正在高精度转写文本...</span>
              </span>
              <span v-else class="flex items-center gap-2">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                <span>开始语音转写</span>
              </span>
            </button>
          </div>

          <!-- Output Transcription Textarea -->
          <div class="bg-white rounded-xs border border-zinc-200 p-4 sm:p-5 shadow-2xs space-y-3">
            <div class="flex items-center justify-between">
              <label class="text-xs font-bold text-zinc-700 uppercase tracking-wider font-mono">
                转写结果
              </label>
              <button
                v-if="transcription"
                @click="copyTranscription"
                class="text-xs font-mono text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 cursor-pointer"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>一键复制文本</span>
              </button>
            </div>

            <textarea
              v-model="transcription"
              rows="6"
              readonly
              class="w-full resize-none rounded-xs border border-zinc-200 bg-zinc-50 p-3 text-sm leading-relaxed text-zinc-800 placeholder-zinc-400 outline-none custom-scrollbar"
              placeholder="转写后的文本内容将在此实时呈现..."
            ></textarea>
          </div>

        </div>

        <!-- Right: ASR Configuration Deck (5 cols) -->
        <aside class="lg:col-span-5 bg-white rounded-xs border border-zinc-200 p-4 sm:p-5 shadow-2xs space-y-5">
          <div class="flex items-center justify-between border-b border-zinc-100 pb-3">
            <span class="text-xs font-mono font-bold text-zinc-700 uppercase tracking-wider">
              转写模型配置
            </span>
          </div>

          <div class="space-y-2">
            <label class="text-xs font-semibold text-zinc-700 block">
              语音识别模型
            </label>
            <div class="space-y-1.5">
              <div
                v-for="m in asrModelOptions"
                :key="m.id"
                @click="transcriptionModel = m.id"
                class="p-2.5 rounded-xs border transition-all cursor-pointer flex items-center justify-between"
                :class="transcriptionModel === m.id ? 'border-blue-600 bg-blue-50/40 text-blue-950 ring-1 ring-blue-600/30' : 'border-zinc-200 hover:border-zinc-300 bg-white'"
              >
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold">{{ m.name }}</span>
                    <span v-if="m.badge" class="px-1.5 py-0.2 rounded-xs bg-blue-100 text-blue-700 text-[10px] font-mono font-bold">
                      {{ m.badge }}
                    </span>
                  </div>
                  <p class="text-[11px] text-zinc-500 mt-0.5">{{ m.desc }}</p>
                </div>
                <span v-if="transcriptionModel === m.id" class="text-blue-600 font-bold text-xs">✓</span>
              </div>
            </div>
          </div>

          <div class="p-3 bg-zinc-50 rounded-xs border border-zinc-200 text-xs text-zinc-500 space-y-1">
            <div class="font-bold text-zinc-700 flex items-center gap-1">
              <svg class="w-3.5 h-3.5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>转写提示</span>
            </div>
            <p>SenseVoiceSmall 模型在多语种识别和带情绪语音转写上具有出色的表现与极低的延迟响应。</p>
          </div>
        </aside>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useApiStore } from '@/stores/api';
import { SiliconFlowClient } from '@/services/siliconFlowClient';

const apiStore = useApiStore();
const activeTab = ref<'speech' | 'transcription'>('speech');

// TTS State
const speechText = ref('欢迎使用 MagicForge 智能语音工作站，这里融合了深度推理与超拟人声音合成。');
const speechModel = ref('FunAudioLLM/CosyVoice2-0.5B');
const voice = ref('alex');
const speed = ref(1.0);
const speechLoading = ref(false);
const speechUrl = ref('');
const speechError = ref('');

// ASR State
const fileInputRef = ref<HTMLInputElement | null>(null);
const audioFile = ref<File | null>(null);
const transcriptionModel = ref('FunAudioLLM/SenseVoiceSmall');
const transcriptionLoading = ref(false);
const transcription = ref('');

// TTS Model Options
const ttsModelOptions = [
  {
    id: 'FunAudioLLM/CosyVoice2-0.5B',
    name: 'CosyVoice2 (0.5B)',
    badge: '推荐 · 阿里超拟人',
    desc: '端到端超拟人多风格多情感语音合成，音质自然流畅'
  },
  {
    id: 'fishaudio/fish-speech-1.5',
    name: 'Fish Speech 1.5',
    badge: '高表现力',
    desc: '极高拟真度的开源中英文自回归音频大模型'
  }
];

// Voice Preset Personas
const voicePresets = [
  { id: 'alex', name: '沉稳青年 (Alex)', gender: '男声', desc: '科技解说 / 沉着清晰' },
  { id: 'bella', name: '温柔女声 (Bella)', gender: '女声', desc: '情感故事 / 治愈甜美' },
  { id: 'benjamin', name: '磁性大叔 (Benjamin)', gender: '男声', desc: '纪录片 / 浑厚低沉' },
  { id: 'claire', name: '干练知性 (Claire)', gender: '女声', desc: '新闻播报 / 职场助理' },
  { id: 'david', name: '活力阳光 (David)', gender: '男声', desc: '短视频解说 / 热情灵动' },
  { id: 'diana', name: '高冷优雅 (Diana)', gender: '女声', desc: '旁白解说 / 优雅清冷' }
];

// ASR Model Options
const asrModelOptions = [
  {
    id: 'FunAudioLLM/SenseVoiceSmall',
    name: 'SenseVoice Small',
    badge: '极速推荐',
    desc: '阿里开源多语言模型，富文本多情感高精度识别'
  },
  {
    id: 'TeleAI/TeleSpeechASR',
    name: 'TeleSpeech ASR',
    badge: '电信开源',
    desc: '中文普通话及多方言稳健识别'
  }
];

const speechPresets = [
  { label: '欢迎致辞', text: '欢迎使用 MagicForge 智能工坊，探索思维链推理与多模态创作的无限可能。' },
  { label: '科技解说', text: '大语言模型正在重构软件工程，从流式交互到智能体协作，代码正在赋予机器思考的能力。' },
  { label: '情感独白', text: '雨滴落在窗台，那些关于未来的代码与梦想，在夜色中渐渐清晰。' }
];

const currentVoiceMeta = computed(() => {
  return voicePresets.find(v => v.id === voice.value);
});

const triggerFileInput = () => {
  fileInputRef.value?.click();
};

const handleFileInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    if (file.size > 50 * 1024 * 1024) {
      ElMessage.warning('音频文件大小不能超过 50MB');
      return;
    }
    audioFile.value = file;
  }
};

const clearAudio = () => {
  audioFile.value = null;
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
};

const generateSpeech = async () => {
  if (!speechText.value.trim()) {
    ElMessage.warning('请输入需要合成的文本内容');
    return;
  }
  if (!apiStore.apiKey.trim()) {
    ElMessage.warning('请先在顶部设置中配置 SiliconFlow API Key');
    return;
  }

  speechLoading.value = true;
  speechError.value = '';

  if (speechUrl.value) {
    URL.revokeObjectURL(speechUrl.value);
    speechUrl.value = '';
  }

  try {
    const client = new SiliconFlowClient({
      apiUrl: apiStore.apiUrl,
      apiKey: apiStore.apiKey
    });

    const audioBlob = await client.createSpeech({
      model: speechModel.value,
      input: speechText.value.trim(),
      voice: voice.value,
      response_format: 'mp3',
      speed: speed.value
    });

    speechUrl.value = URL.createObjectURL(audioBlob);
    ElMessage.success('语音合成成功！');
  } catch (err: any) {
    console.error('语音合成失败:', err);
    speechError.value = err.message || '语音合成失败，请检查 API Key 或模型配额';
    ElMessage.error(speechError.value);
  } finally {
    speechLoading.value = false;
  }
};

const transcribe = async () => {
  if (!audioFile.value) {
    ElMessage.warning('请先上传需要转写的音频文件');
    return;
  }
  if (!apiStore.apiKey.trim()) {
    ElMessage.warning('请先在顶部设置中配置 SiliconFlow API Key');
    return;
  }

  transcriptionLoading.value = true;
  transcription.value = '';

  try {
    const client = new SiliconFlowClient({
      apiUrl: apiStore.apiUrl,
      apiKey: apiStore.apiKey
    });

    const text = await client.createTranscription({
      file: audioFile.value,
      model: transcriptionModel.value
    });

    transcription.value = text;
    ElMessage.success('音频转写完成！');
  } catch (err: any) {
    console.error('音频转写失败:', err);
    ElMessage.error(err.message || '音频转写失败，请检查文件格式或网络');
  } finally {
    transcriptionLoading.value = false;
  }
};

const copyTranscription = async () => {
  if (!transcription.value) return;
  try {
    await navigator.clipboard.writeText(transcription.value);
    ElMessage.success('转写文本已复制到剪贴板');
  } catch {
    ElMessage.error('复制失败，请手动选择复制');
  }
};

onUnmounted(() => {
  if (speechUrl.value) {
    URL.revokeObjectURL(speechUrl.value);
  }
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
</style>

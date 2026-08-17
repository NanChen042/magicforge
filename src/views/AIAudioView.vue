<template>
  <div class="audio-workbench min-h-full w-full bg-white text-zinc-800 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-6xl mx-auto space-y-6">
      
      <!-- Studio Header -->
      <header class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200/80">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <span class="px-2.5 py-0.5 rounded-full bg-blue-50/80 text-blue-700 border border-blue-200/60 text-[11px] font-bold tracking-tight">
              语音工坊
            </span>
            <span class="text-xs text-zinc-400">SiliconFlow 原生驱动</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
            智能语音工作站
          </h1>
          <p class="text-xs sm:text-sm text-zinc-500 mt-1">
            集成 CosyVoice2、MOSS-TTSD、SenseVoice 与 TeleSpeech 等主流开源与免费语音大模型。
          </p>
        </div>

        <!-- Connection Status Pill -->
        <div class="flex items-center gap-2 self-start sm:self-center">
          <div
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border transition-all select-none"
            :class="apiStore.apiKey 
              ? 'bg-emerald-50/80 border-emerald-200/70 text-emerald-800' 
              : 'bg-amber-50/80 border-amber-200/70 text-amber-800'"
          >
            <span class="relative flex h-2 w-2">
              <span 
                v-if="apiStore.apiKey" 
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
              ></span>
              <span 
                class="relative inline-flex rounded-full h-2 w-2"
                :class="apiStore.apiKey ? 'bg-emerald-500' : 'bg-amber-500'"
              ></span>
            </span>
            <span class="font-medium tracking-tight">
              {{ apiStore.apiKey ? 'API 密钥已就绪' : '未配置 API 密钥' }}
            </span>
          </div>
        </div>
      </header>

      <!-- Clean Minimalist Navigation Tabs -->
      <nav class="flex items-center gap-8 border-b border-zinc-200/80 mb-6">
        <button
          @click="activeTab = 'speech'"
          class="relative pb-3 flex items-center gap-2 text-sm transition-colors cursor-pointer select-none outline-none focus:outline-none focus-visible:outline-none focus:ring-0"
          :class="activeTab === 'speech' ? 'text-blue-600 font-bold' : 'text-zinc-400 hover:text-zinc-700 font-medium'"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="23"></line>
            <line x1="8" y1="23" x2="16" y2="23"></line>
          </svg>
          <span>文本转语音 (TTS)</span>
          <span
            v-if="activeTab === 'speech'"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
          ></span>
        </button>

        <button
          @click="activeTab = 'transcription'"
          class="relative pb-3 flex items-center gap-2 text-sm transition-colors cursor-pointer select-none outline-none focus:outline-none focus-visible:outline-none focus:ring-0"
          :class="activeTab === 'transcription' ? 'text-blue-600 font-bold' : 'text-zinc-400 hover:text-zinc-700 font-medium'"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <span>语音转写 (ASR)</span>
          <span
            v-if="activeTab === 'transcription'"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
          ></span>
        </button>
      </nav>

      <!-- TAB 1: TEXT-TO-SPEECH (TTS) -->
      <div v-if="activeTab === 'speech'" class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- Left: Input & Audio Output Deck (7 cols) -->
        <div class="lg:col-span-7 space-y-4">
          
          <!-- Text Input Card -->
          <div class="bg-white rounded-xl border border-zinc-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            <div class="flex items-center justify-between">
              <label class="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>待合成文本</span>
              </label>
              <span class="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-500 font-mono text-[11px]">
                {{ speechText.length }}/4096 字符
              </span>
            </div>

            <textarea
              v-model="speechText"
              rows="6"
              class="w-full resize-none rounded-lg border border-zinc-200 bg-zinc-50/30 p-3.5 text-sm leading-relaxed text-zinc-800 placeholder-zinc-400 outline-none transition-all hover:border-zinc-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15 custom-scrollbar"
              placeholder="在此输入需要合成语音的中英文文本，支持故事叙述、新闻播报、角色台词等..."
            ></textarea>

            <!-- Quick Presets -->
            <div class="flex flex-wrap items-center gap-2 pt-1">
              <span class="text-xs text-zinc-400 font-medium mr-0.5">快捷示例:</span>
              <button
                v-for="p in speechPresets"
                :key="p.label"
                type="button"
                @click="speechText = p.text"
                class="px-2.5 py-1 rounded-md bg-blue-50/70 hover:bg-blue-100 text-blue-700 hover:text-blue-800 border border-blue-200/60 text-xs font-medium transition-all cursor-pointer shadow-2xs select-none"
              >
                {{ p.label }}
              </button>
            </div>

            <!-- Action Button -->
            <div class="pt-2">
              <button
                @click="generateSpeech"
                :disabled="speechLoading || !speechText.trim()"
                class="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm tracking-wide shadow-md shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div v-if="speechUrl" class="bg-white rounded-xl border border-zinc-200/90 p-5 sm:p-6 shadow-xs text-zinc-800 space-y-4 animate-fade-in">
            <div class="flex items-center justify-between border-b border-zinc-100 pb-3.5">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center text-xs shadow-2xs">
                  ▶
                </div>
                <div>
                  <h3 class="text-xs font-bold text-zinc-800">
                    合成音频试听
                  </h3>
                  <p class="text-[11px] text-zinc-500 mt-0.5">
                    模型: <span class="font-mono text-blue-600 font-semibold">{{ speechModel.split('/')?.[1] || speechModel }}</span> · 音色: {{ currentVoiceMeta?.name || voice }}
                  </p>
                </div>
              </div>

              <!-- Download Button -->
              <a
                :href="speechUrl"
                download="siliconflow-audio.mp3"
                class="px-3 py-1.5 rounded-lg bg-white hover:bg-blue-50 active:scale-95 border border-zinc-200 hover:border-blue-200 text-xs font-medium text-zinc-700 hover:text-blue-700 transition-all flex items-center gap-1.5 shadow-2xs"
              >
                <svg class="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>下载 MP3</span>
              </a>
            </div>

            <!-- Waveform Simulation Visualizer -->
            <div class="h-11 bg-zinc-50/80 rounded-lg border border-zinc-200/80 flex items-center justify-center gap-1.5 px-4 overflow-hidden">
              <span
                v-for="i in 36"
                :key="i"
                class="w-1.5 bg-blue-500/80 rounded-full transition-all duration-300"
                :style="{ height: `${Math.max(10, ((i * 17) % 32) + 6)}px` }"
              ></span>
            </div>

            <!-- Native Audio Player Controls -->
            <div class="pt-1">
              <audio :src="speechUrl" controls autoplay class="w-full h-10 rounded-lg"></audio>
            </div>
          </div>

          <!-- Error Alert Card -->
          <div v-if="speechError" class="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs space-y-1">
            <div class="font-bold flex items-center gap-1.5 text-rose-800">
              <span>语音合成发生异常</span>
            </div>
            <p class="text-rose-600 leading-relaxed">{{ speechError }}</p>
          </div>

        </div>

        <!-- Right: Studio Parameters & Voice Palette (5 cols) -->
        <aside class="lg:col-span-5 bg-white rounded-xl border border-zinc-200/90 p-5 sm:p-6 shadow-xs space-y-5">
          
          <div class="flex items-center justify-between border-b border-zinc-100 pb-3">
            <span class="text-xs font-bold text-zinc-800 tracking-tight flex items-center gap-1.5">
              <svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              <span>声音与模型配置</span>
            </span>
          </div>

          <!-- 1. Model Selector -->
          <div class="space-y-2.5">
            <label class="text-xs font-semibold text-zinc-700 block">
              语音合成模型
            </label>
            <div class="space-y-2">
              <div
                v-for="m in ttsModelOptions"
                :key="m.id"
                @click="speechModel = m.id"
                class="p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between select-none"
                :class="speechModel === m.id 
                  ? 'border-blue-500 bg-blue-50/50 text-blue-950 ring-1 ring-blue-500/20 shadow-2xs' 
                  : 'border-zinc-200/80 hover:border-zinc-300 hover:bg-zinc-50/50 bg-white'"
              >
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold">{{ m.name }}</span>
                    <span
                      v-if="m.badge"
                      class="px-2 py-0.5 rounded-full text-[10px] font-bold"
                      :class="m.free ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80' : 'bg-blue-100 text-blue-700'"
                    >
                      {{ m.badge }}
                    </span>
                  </div>
                  <p class="text-[11px] text-zinc-500 mt-1">{{ m.desc }}</p>
                </div>
                <span v-if="speechModel === m.id" class="text-blue-600 font-bold text-xs ml-2 shrink-0">✓</span>
              </div>
            </div>
          </div>

          <!-- 2. Voice Palette (音色选择) -->
          <div class="space-y-2.5">
            <div class="flex items-center justify-between">
              <label class="text-xs font-semibold text-zinc-700">
                角色音色
              </label>
              <span class="text-[11px] text-zinc-400">
                当前: <span class="text-blue-600 font-medium">{{ currentVoiceMeta?.name || voice }}</span>
              </span>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div
                v-for="v in voicePresets"
                :key="v.id"
                @click="voice = v.id"
                class="p-2.5 rounded-lg border transition-all cursor-pointer text-left relative select-none"
                :class="voice === v.id 
                  ? 'border-blue-500 bg-blue-50/60 text-blue-950 ring-1 ring-blue-500/20 shadow-2xs' 
                  : 'border-zinc-200 hover:border-zinc-300 bg-zinc-50/40 hover:bg-white text-zinc-700'"
              >
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold">{{ v.name }}</span>
                  <span
                    class="text-[10px] px-1.5 py-0.2 rounded-full font-medium"
                    :class="voice === v.id ? 'bg-blue-100 text-blue-700' : 'bg-zinc-200/70 text-zinc-600'"
                  >
                    {{ v.gender }}
                  </span>
                </div>
                <p class="text-[10px] text-zinc-400 mt-0.5 truncate">{{ v.desc }}</p>
              </div>
            </div>
          </div>

          <!-- 3. Speed & Audio Format Slider -->
          <div class="space-y-3 pt-3 border-t border-zinc-100">
            <div class="space-y-1.5">
              <div class="flex items-center justify-between">
                <div>
                  <label class="text-xs font-semibold text-zinc-700" for="speed-slider">
                    朗读语速 (Playback Speed)
                  </label>
                  <p class="text-[10px] text-zinc-400">调节语音合成的播放语速 (0.5x ~ 2.0x)</p>
                </div>
                <output class="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100/60">
                  {{ speed.toFixed(1) }}x
                </output>
              </div>
              <input
                id="speed-slider"
                type="range"
                v-model.number="speed"
                min="0.5"
                max="2.0"
                step="0.1"
                class="modern-slider w-full cursor-pointer mt-1"
              />
            </div>

            <div class="flex items-center justify-between text-xs pt-1">
              <span class="text-zinc-600 font-medium">音频采样率</span>
              <span class="font-mono text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded text-[11px]">32,000 Hz</span>
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="text-zinc-600 font-medium">输出格式</span>
              <span class="font-mono text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded text-[11px]">MP3 (标准音频)</span>
            </div>
          </div>

        </aside>

      </div>

      <!-- TAB 2: SPEECH-TO-TEXT (ASR) -->
      <div v-else-if="activeTab === 'transcription'" class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- Left: Record / Upload & Output (7 cols) -->
        <div class="lg:col-span-7 space-y-4">
          
          <!-- Audio Input Card (Record vs Upload Subtabs) -->
          <div class="bg-white rounded-xl border border-zinc-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            
            <!-- Mode Switcher Header -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-3.5">
              <div class="inline-flex p-1 bg-zinc-100/90 rounded-lg border border-zinc-200/60 text-xs font-medium w-fit">
                <button
                  type="button"
                  @click="asrInputMode = 'record'"
                  class="px-3.5 py-1.5 rounded-md transition-all duration-150 cursor-pointer flex items-center gap-1.5 select-none outline-none focus:outline-none focus-visible:outline-none focus:ring-0"
                  :class="asrInputMode === 'record' 
                    ? 'bg-white text-zinc-900 font-bold shadow-2xs border border-zinc-200/50' 
                    : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200/40 border border-transparent'"
                >
                  <svg class="w-3.5 h-3.5" :class="asrInputMode === 'record' ? 'text-blue-600' : 'text-zinc-400'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="23"></line>
                    <line x1="8" y1="23" x2="16" y2="23"></line>
                  </svg>
                  <span>实时麦克风录音</span>
                </button>
                <button
                  type="button"
                  @click="asrInputMode = 'upload'"
                  class="px-3.5 py-1.5 rounded-md transition-all duration-150 cursor-pointer flex items-center gap-1.5 select-none outline-none focus:outline-none focus-visible:outline-none focus:ring-0"
                  :class="asrInputMode === 'upload' 
                    ? 'bg-white text-zinc-900 font-bold shadow-2xs border border-zinc-200/50' 
                    : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200/40 border border-transparent'"
                >
                  <svg class="w-3.5 h-3.5" :class="asrInputMode === 'upload' ? 'text-blue-600' : 'text-zinc-400'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <span>本地文件上传</span>
                </button>
              </div>

              <!-- Auto-transcribe checkbox for recording -->
              <label v-if="asrInputMode === 'record'" class="text-xs text-zinc-500 hover:text-zinc-700 flex items-center gap-1.5 cursor-pointer select-none py-1">
                <input type="checkbox" v-model="autoTranscribeAfterRecord" class="rounded accent-blue-600 cursor-pointer w-3.5 h-3.5" />
                <span>录音结束自动转写</span>
              </label>
            </div>

            <!-- MODE 1: CHATGPT-STYLE LIVE MICROPHONE RECORDING -->
            <div v-if="asrInputMode === 'record'" class="space-y-4">
              
              <!-- State 1: Idle (Not recording & No recorded audio) -->
              <div
                v-if="!isRecording && !recordedAudioUrl"
                class="py-10 flex flex-col items-center justify-center text-center space-y-3 bg-gradient-to-b from-blue-50/30 to-white rounded-xl border border-dashed border-zinc-300 hover:border-blue-400 transition-all group"
              >
                <button
                  type="button"
                  @click="startRecording"
                  class="w-20 h-20 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 transition-all cursor-pointer ring-4 ring-blue-100 hover:ring-8 hover:ring-blue-200"
                  title="点击开始录音"
                >
                  <svg class="w-9 h-9 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="23"></line>
                    <line x1="8" y1="23" x2="16" y2="23"></line>
                  </svg>
                </button>
                <div class="text-sm font-bold text-zinc-800">点击麦克风，开始实时录音识别</div>
              </div>

              <!-- State 2: ACTIVE RECORDING (ChatGPT Live Voice Pulsing UI) -->
              <div
                v-else-if="isRecording"
                class="py-6 px-5 bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-white rounded-xl border border-blue-200 shadow-sm space-y-5"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="relative flex h-3 w-3">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <span class="text-xs font-bold text-red-600 tracking-wider">
                      {{ isPaused ? '录音已暂停' : 'REC 正在聆听录音中...' }}
                    </span>
                  </div>
                  <div class="font-mono text-xs font-extrabold text-blue-900 bg-blue-100/80 px-2.5 py-1 rounded-md border border-blue-200 shadow-2xs">
                    {{ formattedRecordTime }}
                  </div>
                </div>

                <!-- Dynamic Frequency Waveform Visualizer (Real-time Audio Analyser) -->
                <div class="h-16 bg-white rounded-lg border border-blue-100 flex items-center justify-center gap-1.5 px-6 shadow-2xs overflow-hidden">
                  <span
                    v-for="(height, idx) in visualizerBars"
                    :key="idx"
                    class="w-1.5 bg-gradient-to-t from-blue-600 to-indigo-400 rounded-full transition-all duration-75"
                    :style="{ height: `${Math.max(6, isPaused ? 6 : height)}px` }"
                  ></span>
                </div>

                <!-- Action Controls for Active Recording -->
                <div class="flex items-center justify-center gap-3 pt-1">
                  <button
                    type="button"
                    @click="cancelRecording"
                    class="px-3.5 py-2 rounded-lg bg-white hover:bg-zinc-100 text-zinc-600 border border-zinc-200 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  >
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    <span>放弃</span>
                  </button>

                  <button
                    type="button"
                    @click="togglePauseRecording"
                    class="px-3.5 py-2 rounded-lg bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  >
                    <span v-if="isPaused">▶ 继续</span>
                    <span v-else>⏸ 暂停</span>
                  </button>

                  <button
                    type="button"
                    @click="stopRecording"
                    class="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <div class="w-2.5 h-2.5 bg-white rounded-xs"></div>
                    <span>{{ autoTranscribeAfterRecord ? '完成并立即转写' : '完成录音' }}</span>
                  </button>
                </div>
              </div>

              <!-- State 3: RECORDING COMPLETED (Preview & Transcribe) -->
              <div v-else-if="recordedAudioUrl" class="p-5 bg-zinc-50/80 rounded-xl border border-zinc-200 space-y-3.5">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span class="text-xs font-bold text-zinc-700">录音已就绪 (时长: {{ formattedRecordTime }})</span>
                  </div>
                  <button
                    type="button"
                    @click="resetRecording"
                    class="text-xs text-rose-600 hover:underline font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="1 4 1 10 7 10"></polyline>
                      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                    </svg>
                    <span>重新录制</span>
                  </button>
                </div>

                <audio :src="recordedAudioUrl" controls class="w-full h-10 rounded-lg bg-white"></audio>

                <button
                  @click="transcribe"
                  :disabled="transcriptionLoading"
                  class="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm tracking-wide shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="transcriptionLoading" class="flex items-center gap-2">
                    <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>正在使用 {{ selectedAsrModelName }} 转写...</span>
                  </span>
                  <span v-else class="flex items-center gap-2">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                    <span>立即转写识别 ({{ selectedAsrModelName }})</span>
                  </span>
                </button>
              </div>

            </div>

            <!-- MODE 2: LOCAL FILE UPLOAD -->
            <div v-else-if="asrInputMode === 'upload'" class="space-y-4">
              <div
                class="border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer relative"
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
                  <div class="w-11 h-11 mx-auto rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shadow-2xs">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 18V5l12-2v13"></path>
                      <circle cx="6" cy="18" r="3"></circle>
                      <circle cx="18" cy="16" r="3"></circle>
                    </svg>
                  </div>
                  <div class="text-sm font-bold text-zinc-800">{{ audioFile.name }}</div>
                  <div class="text-xs text-zinc-500">
                    <span class="font-mono">{{ (audioFile.size / 1024 / 1024).toFixed(2) }} MB · {{ audioFile.type || 'audio/unknown' }}</span>
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
                  <div class="w-11 h-11 mx-auto rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                  </div>
                  <div class="text-xs font-bold text-zinc-800">点击上传音频或拖拽至此</div>
                  <div class="text-[11px] text-zinc-400">支持 MP3, WAV, M4A, OGG, AAC (最大 50MB)</div>
                </div>
              </div>

              <button
                @click="transcribe"
                :disabled="transcriptionLoading || !audioFile"
                class="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm tracking-wide shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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

          </div>

          <!-- Output Transcription Textarea -->
          <div class="bg-white rounded-xl border border-zinc-200/90 p-5 sm:p-6 shadow-xs space-y-3.5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <label class="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span>转写识别结果</span>
                </label>
                <span v-if="transcription" class="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-500 font-mono text-[11px]">
                  {{ transcription.length }} 字
                </span>
              </div>
              <div class="flex items-center gap-2">
                <button
                  v-if="transcription"
                  @click="transcription = ''"
                  class="text-xs text-zinc-400 hover:text-zinc-600 font-medium cursor-pointer"
                >
                  清空
                </button>
                <button
                  v-if="transcription"
                  @click="copyTranscription"
                  class="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all"
                >
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  <span>一键复制</span>
                </button>
              </div>
            </div>

            <textarea
              v-model="transcription"
              rows="6"
              readonly
              class="w-full resize-none rounded-lg border border-zinc-200 bg-zinc-50/50 p-3.5 text-sm leading-relaxed text-zinc-800 placeholder-zinc-400 outline-none transition-all hover:border-zinc-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15 custom-scrollbar"
              placeholder="转写后的文本内容将在此呈现..."
            ></textarea>
          </div>

        </div>

        <!-- Right: ASR Configuration Deck (5 cols) -->
        <aside class="lg:col-span-5 bg-white rounded-xl border border-zinc-200/90 p-5 sm:p-6 shadow-xs space-y-5">
          <div class="flex items-center justify-between border-b border-zinc-100 pb-3">
            <span class="text-xs font-bold text-zinc-800 tracking-tight flex items-center gap-1.5">
              <svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>转写模型配置</span>
            </span>
          </div>

          <div class="space-y-2.5">
            <label class="text-xs font-semibold text-zinc-700 block">
              语音识别模型
            </label>
            <div class="space-y-2">
              <div
                v-for="m in asrModelOptions"
                :key="m.id"
                @click="transcriptionModel = m.id"
                class="p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between select-none"
                :class="transcriptionModel === m.id 
                  ? 'border-blue-500 bg-blue-50/50 text-blue-950 ring-1 ring-blue-500/20 shadow-2xs' 
                  : 'border-zinc-200/80 hover:border-zinc-300 hover:bg-zinc-50/50 bg-white'"
              >
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold">{{ m.name }}</span>
                    <span
                      v-if="m.badge"
                      class="px-2 py-0.5 rounded-full text-[10px] font-bold"
                      :class="m.free ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80' : 'bg-blue-100 text-blue-700'"
                    >
                      {{ m.badge }}
                    </span>
                  </div>
                  <p class="text-[11px] text-zinc-500 mt-1">{{ m.desc }}</p>
                </div>
                <span v-if="transcriptionModel === m.id" class="text-blue-600 font-bold text-xs ml-2 shrink-0">✓</span>
              </div>
            </div>
          </div>

          <div class="p-4 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 rounded-xl border border-blue-100 text-xs text-zinc-600 space-y-2 shadow-2xs">
            <div class="font-bold text-zinc-800 flex items-center gap-1.5">
              <svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
              </svg>
              <span>模型特性指南</span>
            </div>
            <p v-if="transcriptionModel === 'FunAudioLLM/SenseVoiceSmall'" class="leading-relaxed">
              <strong class="text-blue-900">SenseVoice Small</strong>：阿里开源多语种（中/英/粤/日/韩）语音大模型，具备极低延迟（~70ms 级）与丰富的情感/声音事件标签识别能力。
            </p>
            <p v-else-if="transcriptionModel === 'TeleAI/TeleSpeechASR'" class="leading-relaxed">
              <strong class="text-blue-900">TeleSpeech ASR</strong>：中国电信人工智能研究院开源的工业级 ASR 模型（免费），在普通话及 60+ 种方言自由混说、嘈杂环境下的抗噪识别表现优异。
            </p>
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
const asrInputMode = ref<'record' | 'upload'>('record');
const fileInputRef = ref<HTMLInputElement | null>(null);
const audioFile = ref<File | null>(null);
const transcriptionModel = ref('FunAudioLLM/SenseVoiceSmall');
const transcriptionLoading = ref(false);
const transcription = ref('');

// ChatGPT-Style Real-time Recording State
const isRecording = ref(false);
const isPaused = ref(false);
const recordSeconds = ref(0);
const recordedAudioUrl = ref('');
const autoTranscribeAfterRecord = ref(true);
const visualizerBars = ref<number[]>(new Array(24).fill(10));

let mediaStream: MediaStream | null = null;
let mediaRecorder: MediaRecorder | null = null;
let audioChunks: Blob[] = [];
let recordInterval: any = null;
let audioCtx: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let animFrameId: number | null = null;
let selectedMimeType = 'audio/webm';

const formattedRecordTime = computed(() => {
  const m = Math.floor(recordSeconds.value / 60);
  const s = recordSeconds.value % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
});

// TTS Model Options
const ttsModelOptions = [
  {
    id: 'FunAudioLLM/CosyVoice2-0.5B',
    name: 'CosyVoice2 (0.5B)',
    badge: '阿里超拟人',
    desc: '端到端超拟人多风格多情感语音合成，音质极其自然流畅',
    free: false
  },
  {
    id: 'fnlp/MOSS-TTSD-v0.5',
    name: 'MOSS-TTSD (2.05B)',
    badge: '免费 · openmoss',
    desc: '复旦开源双语口语对话语音合成大模型，富有表现力与口语质感',
    free: true
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
    badge: '极速推荐 · 阿里',
    desc: '多语言模型，支持中/英/粤/日/韩，富文本多情感与声音事件高精度识别',
    free: false
  },
  {
    id: 'TeleAI/TeleSpeechASR',
    name: 'TeleSpeech ASR',
    badge: '免费 · 电信星辰',
    desc: '中国电信星辰语音识别大模型，中英文及60+方言自由混说稳健识别',
    free: true
  }
];

const selectedAsrModelName = computed(() => {
  const m = asrModelOptions.find(opt => opt.id === transcriptionModel.value);
  return m ? m.name : transcriptionModel.value;
});

const speechPresets = [
  { label: '欢迎致辞', text: '欢迎使用 MagicForge 智能工坊，探索思维链推理与多模态创作的无限可能。' },
  { label: '科技解说', text: '大语言模型正在重构软件工程，从流式交互到智能体协作，代码正在赋予机器思考的能力。' },
  { label: '情感独白', text: '雨滴落在窗台，那些关于未来的代码与梦想，在夜色中渐渐清晰。' }
];

const currentVoiceMeta = computed(() => {
  return voicePresets.find(v => v.id === voice.value);
});

// Recording Methods
const updateVisualizer = () => {
  if (!analyser || isPaused.value) {
    if (isRecording.value) {
      animFrameId = requestAnimationFrame(updateVisualizer);
    }
    return;
  }

  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(dataArray);

  const barCount = 24;
  const step = Math.floor(dataArray.length / barCount) || 1;
  const newBars: number[] = [];

  for (let i = 0; i < barCount; i++) {
    let sum = 0;
    const count = Math.min(step, dataArray.length - i * step);
    for (let j = 0; j < count; j++) {
      sum += dataArray[i * step + j];
    }
    const avg = count > 0 ? sum / count : 0;
    const height = Math.round(6 + (avg / 255) * 44);
    newBars.push(height);
  }

  visualizerBars.value = newBars;
  animFrameId = requestAnimationFrame(updateVisualizer);
};

const cleanupAudioStream = () => {
  if (recordInterval) {
    clearInterval(recordInterval);
    recordInterval = null;
  }
  if (animFrameId) {
    cancelAnimationFrame(animFrameId);
    animFrameId = null;
  }
  if (mediaStream) {
    mediaStream.getTracks().forEach(t => t.stop());
    mediaStream = null;
  }
  if (audioCtx && audioCtx.state !== 'closed') {
    audioCtx.close().catch(() => {});
    audioCtx = null;
  }
  analyser = null;
};

const startRecording = async () => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    ElMessage.error('当前浏览器不支持录音功能，请使用现代浏览器并确保在 HTTPS 或本地环境下运行');
    return;
  }

  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
      selectedMimeType = 'audio/webm;codecs=opus';
    } else if (MediaRecorder.isTypeSupported('audio/webm')) {
      selectedMimeType = 'audio/webm';
    } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
      selectedMimeType = 'audio/mp4';
    } else if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
      selectedMimeType = 'audio/ogg;codecs=opus';
    } else {
      selectedMimeType = '';
    }

    mediaRecorder = selectedMimeType ? new MediaRecorder(mediaStream, { mimeType: selectedMimeType }) : new MediaRecorder(mediaStream);
    audioChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const type = selectedMimeType || 'audio/webm';
      const audioBlob = new Blob(audioChunks, { type });
      const extension = type.includes('mp4') ? 'mp4' : type.includes('ogg') ? 'ogg' : 'webm';
      const file = new File([audioBlob], `recording_${Date.now()}.${extension}`, { type });

      audioFile.value = file;
      if (recordedAudioUrl.value) {
        URL.revokeObjectURL(recordedAudioUrl.value);
      }
      recordedAudioUrl.value = URL.createObjectURL(audioBlob);

      if (autoTranscribeAfterRecord.value) {
        transcribe();
      }
    };

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
      const source = audioCtx.createMediaStreamSource(mediaStream);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128;
      source.connect(analyser);
    }

    mediaRecorder.start(100);
    isRecording.value = true;
    isPaused.value = false;
    recordSeconds.value = 0;

    recordInterval = setInterval(() => {
      recordSeconds.value++;
    }, 1000);

    updateVisualizer();
  } catch (err: any) {
    console.error('麦克风录音初始化失败:', err);
    ElMessage.error('无法访问麦克风，请检查浏览器权限设置');
  }
};

const togglePauseRecording = () => {
  if (!mediaRecorder || !isRecording.value) return;
  if (isPaused.value) {
    mediaRecorder.resume();
    isPaused.value = false;
  } else {
    mediaRecorder.pause();
    isPaused.value = true;
  }
};

const stopRecording = () => {
  if (mediaRecorder && isRecording.value) {
    mediaRecorder.stop();
    isRecording.value = false;
    isPaused.value = false;
    cleanupAudioStream();
  }
};

const cancelRecording = () => {
  if (mediaRecorder && isRecording.value) {
    mediaRecorder.stop();
    isRecording.value = false;
    isPaused.value = false;
    cleanupAudioStream();
    audioChunks = [];
    if (recordedAudioUrl.value) {
      URL.revokeObjectURL(recordedAudioUrl.value);
      recordedAudioUrl.value = '';
    }
    audioFile.value = null;
  }
};

const resetRecording = () => {
  if (recordedAudioUrl.value) {
    URL.revokeObjectURL(recordedAudioUrl.value);
    recordedAudioUrl.value = '';
  }
  audioFile.value = null;
  transcription.value = '';
  recordSeconds.value = 0;
};

// File Input Handlers
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
    ElMessage.warning('请先录制语音或上传音频文件');
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

    const result = await client.transcribeAudio(audioFile.value, transcriptionModel.value);
    transcription.value = result.text;
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
  if (recordedAudioUrl.value) {
    URL.revokeObjectURL(recordedAudioUrl.value);
  }
  cleanupAudioStream();
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

/* Modern Range Slider Styling (Synchronized with ApiDemoView / ConfigPanel) */
.modern-slider {
  -webkit-appearance: none;
  appearance: none;
  height: 5px;
  border-radius: 9999px;
  background: #e4e4e7;
  outline: none;
  transition: background 0.15s ease;
}

.modern-slider:hover {
  background: #d4d4d8;
}

.modern-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #2563eb;
  border: 2.5px solid #ffffff;
  box-shadow: 0 1px 3px rgba(37, 99, 235, 0.35);
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.modern-slider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
}

.modern-slider::-moz-range-thumb {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #2563eb;
  border: 2.5px solid #ffffff;
  box-shadow: 0 1px 3px rgba(37, 99, 235, 0.35);
  cursor: pointer;
}
</style>

<template>
  <!-- Modern Light AVG Adventure: 第13号列车 · 轮回观测 (Cinematic CG Backdrops, Script Workshop, Codex & Auto/Skip Engine) -->
  <div 
    ref="containerRef"
    class="relative w-full h-[calc(100vh-60px)] min-h-[720px] overflow-hidden bg-[#f8fafc] font-sans select-none text-zinc-800"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    tabindex="0"
    @keydown="handleKeyDown"
  >

    <!-- ========================================================================= -->
    <!-- 1. 游戏封面与启动器 (COVER LAUNCHER) -->
    <!-- ========================================================================= -->
    <div v-if="!gameStarted" class="relative w-full h-full flex flex-col justify-between p-6 md:p-8 overflow-y-auto custom-scrollbar z-20">
      
      <!-- 2.5D Precision Maglev Express Canvas -->
      <canvas ref="coverCanvasRef" class="absolute inset-0 pointer-events-none z-0 w-full h-full"></canvas>

      <!-- Background Ambient Atmosphere & Precision Grid -->
      <div class="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[85vw] max-w-5xl h-[380px] bg-gradient-to-b from-blue-100/40 via-sky-50/20 to-transparent rounded-full blur-3xl opacity-70"></div>
        <div class="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:28px_28px] opacity-40"></div>
      </div>

      <!-- Top Header Brand & Actions -->
      <header class="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between border-b border-zinc-200/80 pb-4">
        <div class="flex items-center gap-2">
          <span class="px-2 py-0.5 rounded-xs bg-blue-50 text-blue-700 border border-blue-200/80 font-mono text-[11px] font-bold">
            时间循环观测舱
          </span>
          <span class="text-xs text-zinc-400 font-mono">近地轨道实验舱 · 互动剧本演进</span>
        </div>

        <div class="flex items-center gap-2">
          <!-- Codex / Achievements Trigger -->
          <button 
            @click="showCodexModal = true; playClickSfx()"
            class="px-3 py-1.5 rounded-xs bg-white hover:bg-zinc-50 border border-zinc-200 text-xs font-mono font-semibold text-zinc-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <svg class="w-3.5 h-3.5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="8" r="7"></circle>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
            <span>结局与成就图鉴</span>
          </button>

          <!-- Script Workshop Trigger -->
          <button 
            @click="showScriptWorkshop = true; playClickSfx()"
            class="px-3 py-1.5 rounded-xs bg-white hover:bg-zinc-50 border border-zinc-200 text-xs font-mono font-semibold text-zinc-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <svg class="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            <span>剧本工坊 / 导入自定义</span>
          </button>
        </div>
      </header>

      <!-- Central Hero Deck -->
      <div class="relative z-10 max-w-xl mx-auto w-full my-auto py-6 text-center space-y-6">
        
        <!-- Game Title -->
        <div class="space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-blue-200 text-blue-600 text-xs font-mono shadow-2xs">
            <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>第13号近地轨道实验舱 · 轮回观测器</span>
          </div>

          <h1 class="text-4xl sm:text-6xl font-black tracking-tight text-zinc-900 drop-shadow-sm font-sans">
            第<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500">13</span>号列车
          </h1>

          <p class="text-zinc-500 text-xs sm:text-sm leading-relaxed max-w-md mx-auto font-normal">
            列车即将在 15 分钟后触发清理机制。在无限重置的时间迷宫中搜集线索碎片，揭开实验舱背后的终极真相。
          </p>
        </div>

        <!-- Mode Configuration Deck -->
        <div class="bg-white/95 border border-zinc-200/90 rounded-xs p-6 shadow-xl backdrop-blur-md space-y-5 text-left">
          
          <!-- Mode Toggle (AI Generated vs Classic Static Script) -->
          <div class="space-y-2">
            <label class="text-xs font-bold text-zinc-700 tracking-wider">
              选择推演驱动模式
            </label>
            
            <div class="grid grid-cols-2 gap-3">
              <button 
                @click="enableAI = true; playClickSfx()"
                type="button"
                class="p-3.5 rounded-xs border transition-all text-left cursor-pointer flex flex-col justify-between h-20"
                :class="enableAI 
                  ? 'border-blue-600 bg-blue-50/50 text-zinc-900 ring-2 ring-blue-600/20 shadow-xs' 
                  : 'border-zinc-200 bg-zinc-50/60 text-zinc-600 hover:border-zinc-300 hover:bg-white'"
              >
                <div class="flex items-center justify-between">
                  <span class="font-bold text-xs">AI 动态叙事</span>
                  <span v-if="enableAI" class="text-blue-600 font-bold text-xs">✓</span>
                </div>
                <span class="text-[11px] text-zinc-400 leading-tight">由大模型实时生成细致场景与专属因果</span>
              </button>

              <button 
                @click="enableAI = false; playClickSfx()"
                type="button"
                class="p-3.5 rounded-xs border transition-all text-left cursor-pointer flex flex-col justify-between h-20"
                :class="!enableAI 
                  ? 'border-blue-600 bg-blue-50/50 text-zinc-900 ring-2 ring-blue-600/20 shadow-xs' 
                  : 'border-zinc-200 bg-zinc-50/60 text-zinc-600 hover:border-zinc-300 hover:bg-white'"
              >
                <div class="flex items-center justify-between">
                  <span class="font-bold text-xs">经典剧情模式</span>
                  <span v-if="!enableAI" class="text-blue-600 font-bold text-xs">✓</span>
                </div>
                <span class="text-[11px] text-zinc-400 leading-tight">原版高精构架剧本，零延迟极速响应</span>
              </button>
            </div>
          </div>

          <!-- AI Model Selection (if AI mode) -->
          <div v-if="enableAI" class="space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-zinc-700">推理模型配置</span>
              <span v-if="!apiStore.apiKey" class="text-[11px] text-amber-600">需在设置中配置 API 密钥</span>
            </div>

            <el-select 
              v-model="selectedModel" 
              placeholder="选择推理模型" 
              class="w-full"
            >
              <el-option 
                v-for="model in fastModels" 
                :key="model.id" 
                :label="model.name" 
                :value="model.id"
              >
                <div class="flex items-center justify-between w-full">
                  <span>{{ model.name }}</span>
                  <span class="text-xs text-zinc-400">{{ model.description }}</span>
                </div>
              </el-option>
            </el-select>
          </div>

          <!-- Start Game Action Button -->
          <button 
            @click="startGame"
            :disabled="enableAI && !apiStore.apiKey"
            class="w-full py-3.5 px-6 rounded-xs bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm tracking-wide shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <span>接入神经链接 · 开始探索</span>
          </button>

        </div>

      </div>

      <!-- Footer Info -->
      <footer class="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between text-[11px] text-zinc-400 font-mono border-t border-zinc-200/80 pt-3">
        <span>支持键盘 [空格/回车] 推进 · [A] 自动播放 · [H] 隐藏界面 · 搜集 5 块线索达成真结局</span>
        <span>MagicForge Studio</span>
      </footer>

    </div>

    <!-- ========================================================================= -->
    <!-- 2. 游戏主舞台 (MAIN VISUAL NOVEL STAGE) -->
    <!-- ========================================================================= -->
    <div v-else class="relative w-full h-full flex flex-col justify-between overflow-hidden" @click="handleGlobalClick">

      <!-- Dynamic Sci-fi Ambient Backdrop Canvas & Cinematic Scene CG -->
      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <ScenarioBackgroundCG :scene-id="currentSceneId" />
        <canvas ref="stageCanvasRef" class="w-full h-full object-cover relative z-10 opacity-70"></canvas>
        <div class="absolute inset-0 bg-gradient-to-t from-[#f8fafc]/90 via-[#f8fafc]/30 to-transparent z-10"></div>
      </div>

      <!-- Reset / Glitch Flash FX -->
      <transition name="flash">
        <div v-if="isResetting" class="absolute inset-0 z-[100] bg-white pointer-events-none"></div>
      </transition>

      <!-- TOP HUD STATUS BAR -->
      <header class="relative z-20 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 pointer-events-auto border-b border-zinc-200 bg-white/90 backdrop-blur-md shadow-2xs">
        
        <!-- Left: Mission & Loop Telemetry -->
        <div class="flex items-center gap-3">
          <div class="w-2 h-7 bg-blue-600 rounded-2xs shadow-xs"></div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-sm font-bold text-zinc-900 tracking-wider">第13号列车</h2>
              <span class="px-1.5 py-0.2 rounded-2xs bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-mono font-bold">
                探索推演中
              </span>
            </div>
            <div class="flex items-center gap-2 text-[11px] text-zinc-400 font-mono mt-0.5">
              <span>时间循环: 第 {{ loopCount }} 轮</span>
              <span>|</span>
              <span>场景代号: {{ currentSceneId }}</span>
            </div>
          </div>
        </div>

        <!-- Right: Memory Shards, Flowchart, Backlog & Return -->
        <div class="flex items-center gap-2.5">
          
          <!-- 5 Memory Shards Matrix -->
          <div class="flex items-center gap-1.5 bg-zinc-50 px-3 py-1.5 rounded-xs border border-zinc-200 shadow-2xs">
            <span class="text-[10px] font-mono text-zinc-500 mr-1 hidden sm:inline font-bold">线索碎片:</span>
            <div 
              v-for="frag in allFragments" 
              :key="frag.id"
              class="w-6 h-6 rounded-2xs flex items-center justify-center text-[10px] font-mono transition-all"
              :class="hasFragment(frag.id) 
                ? 'bg-blue-600 text-white font-bold shadow-xs' 
                : 'bg-white text-zinc-300 border border-zinc-200'"
              :title="hasFragment(frag.id) ? frag.name : '未解锁'"
            >
              {{ hasFragment(frag.id) ? '◆' : '◇' }}
            </div>
          </div>

          <!-- Flowchart Visualizer Drawer Trigger -->
          <button 
            @click.stop="showFlowDrawer = true; playClickSfx()"
            class="px-3 py-1.5 rounded-xs bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border border-zinc-200 shadow-2xs"
            title="查看剧情分支图谱"
          >
            <svg class="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            <span class="hidden sm:inline">分支图谱</span>
          </button>

          <!-- Backlog History Trigger -->
          <button 
            @click.stop="showHistoryDrawer = true; playClickSfx()"
            class="px-3 py-1.5 rounded-xs bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border border-zinc-200 shadow-2xs"
            title="查看剧情对话回溯"
          >
            <svg class="w-3.5 h-3.5 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="hidden sm:inline">回溯</span>
          </button>

          <!-- Return to Cover Settings -->
          <button 
            @click.stop="gameStarted = false; playClickSfx()"
            class="px-3 py-1.5 rounded-xs bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-mono font-semibold transition-colors flex items-center gap-1 cursor-pointer border border-zinc-200 shadow-2xs"
          >
            <svg class="w-3.5 h-3.5 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
            <span>返回设置</span>
          </button>

        </div>
      </header>

      <!-- Floating Unhide Button (when UI is hidden) -->
      <button 
        v-if="hideUi" 
        @click.stop="hideUi = false; playClickSfx()" 
        class="absolute bottom-6 right-6 z-50 px-4 py-2 rounded-xs bg-white/90 backdrop-blur-md border border-blue-500 text-blue-600 text-xs font-mono font-bold shadow-xl flex items-center gap-2 cursor-pointer animate-pulse hover:bg-white"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
        <span>恢复界面显示 [H]</span>
      </button>

      <!-- CENTER & BOTTOM: CHARACTER STAND-IN & DIALOGUE BOX -->
      <div 
        v-show="!hideUi" 
        class="relative z-10 flex-1 flex flex-col justify-end p-4 sm:p-8 max-w-5xl mx-auto w-full pointer-events-none pb-6"
      >

        <!-- Character Holographic Standee (Bespoke Vector Avatar Deck) -->
        <div v-if="currentSceneData?.character" class="relative h-[220px] sm:h-[260px] flex items-end justify-center mb-[-12px] z-10 pointer-events-none">
          <div class="flex flex-col items-center animate-fade-in">
            <!-- Standee Avatar -->
            <div class="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-b from-blue-100 to-sky-50 border-2 border-blue-400 shadow-xl flex items-center justify-center backdrop-blur-md relative overflow-hidden">
              <!-- Character Hologram Icon -->
              <component :is="getCharacterIcon(currentSceneData.character)" class="w-14 h-14 sm:w-18 sm:h-18 text-blue-600" />
            </div>

            <!-- Role Badge -->
            <div class="mt-2 px-3 py-0.5 rounded-full bg-white border border-blue-300 text-blue-800 text-[11px] font-mono font-bold shadow-xs">
              {{ currentSceneData.speaker || '通讯对端' }}
            </div>
          </div>
        </div>

        <!-- Dialogue Box Card (Visual Novel Dialogue Deck in Clean Light Theme) -->
        <div 
          class="relative bg-white/95 backdrop-blur-xl border border-zinc-200 rounded-xs p-6 sm:p-8 shadow-xl space-y-4 pointer-events-auto transition-all"
          :class="{ 'cursor-pointer hover:border-blue-500': canClickNext }"
          @click.stop="handleBoxClick"
        >
          <!-- Speaker Name Plate & AVG Controls Tool bar -->
          <div class="flex items-center justify-between border-b border-zinc-100 pb-2">
            <div v-if="currentSceneData?.speaker" class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span class="text-sm font-bold text-zinc-900 font-mono tracking-wider">
                {{ currentSceneData.speaker }}
              </span>
            </div>

            <!-- AVG Playback Controls: AUTO | SKIP | HIDE -->
            <div class="flex items-center gap-1.5 ml-auto text-xs font-mono">
              <button 
                @click.stop="toggleAutoPlay"
                class="px-2.5 py-1 rounded-2xs border transition-all flex items-center gap-1 cursor-pointer font-bold"
                :class="isAutoPlay ? 'bg-emerald-500 text-white border-emerald-600 shadow-2xs' : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-600 border-zinc-200'"
                title="自动播放 (快捷键 A)"
              >
                <span class="w-1.5 h-1.5 rounded-full" :class="isAutoPlay ? 'bg-white animate-ping' : 'bg-zinc-400'"></span>
                <span>AUTO</span>
              </button>

              <button 
                @click.stop="handleSkip"
                class="px-2.5 py-1 rounded-2xs border bg-zinc-50 hover:bg-zinc-100 text-zinc-600 border-zinc-200 transition-all cursor-pointer font-bold"
                title="跳过/快进文本"
              >
                <span>SKIP</span>
              </button>

              <button 
                @click.stop="hideUi = true; playClickSfx()"
                class="px-2.5 py-1 rounded-2xs border bg-zinc-50 hover:bg-zinc-100 text-zinc-600 border-zinc-200 transition-all cursor-pointer font-bold"
                title="隐藏界面 (快捷键 H)"
              >
                <span>HIDE</span>
              </button>
            </div>
          </div>

          <!-- Main Dialogue / Scene Narration Text -->
          <div class="text-base sm:text-lg text-zinc-800 leading-relaxed font-medium min-h-[64px]">
            <div v-if="isAIGenerating" class="flex items-center gap-2 text-blue-600">
              <div class="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span class="font-mono text-sm">正在实时生成当前时间线剧情...</span>
            </div>
            <template v-else>
              <span v-html="displayedText"></span>
              <span v-if="isTyping" class="inline-block w-2 h-4.5 ml-1 bg-blue-600 animate-pulse align-middle"></span>
            </template>
          </div>

          <!-- Decision Options (When choices available) -->
          <div v-if="!isTyping && !isLinearScene && currentOptions.length > 0" class="pt-3 space-y-2">
            <div class="text-[11px] font-bold text-zinc-700 font-mono uppercase tracking-wider mb-1">
              抉择分支
            </div>

            <button
              v-for="(opt, index) in currentOptions"
              :key="index"
              @click.stop="handleSelect(opt)"
              :disabled="opt.locked"
              class="w-full p-3.5 rounded-xs border text-left transition-all cursor-pointer flex items-center justify-between gap-3 group"
              :class="opt.locked 
                ? 'bg-zinc-50 border-zinc-200 text-zinc-400 cursor-not-allowed' 
                : 'bg-white hover:bg-blue-50/40 border-zinc-200 hover:border-blue-600 text-zinc-800 hover:text-blue-900 shadow-2xs hover:shadow-xs'"
            >
              <div class="flex items-center gap-3">
                <span class="w-5 h-5 rounded-2xs flex items-center justify-center text-xs font-mono font-bold bg-zinc-100 text-zinc-700 group-hover:bg-blue-600 group-hover:text-white transition-colors border border-zinc-200">
                  0{{ index + 1 }}
                </span>
                <span class="text-xs sm:text-sm font-semibold">{{ opt.text }}</span>
              </div>

              <!-- Locked Hint -->
              <span v-if="opt.locked" class="text-[11px] text-rose-500 font-mono flex items-center gap-1">
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>需线索: {{ getFragmentName(opt.reqFragment) }}</span>
              </span>
              <span v-else class="text-zinc-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all">
                →
              </span>
            </button>
          </div>

          <!-- Ending / Reboot Screen -->
          <div v-if="currentSceneData?.isEnding && !isTyping" class="pt-4 text-center space-y-3">
            <div class="text-sm font-bold tracking-widest font-mono" :class="isBadEnding ? 'text-rose-600' : 'text-emerald-600'">
              {{ isBadEnding ? '时间循环中断 · 探索失败' : '终极真结局解锁 · 成功逃离循环' }}
            </div>
            <button
              @click.stop="restartGame"
              class="px-8 py-3 rounded-xs bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs font-mono tracking-wider shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            >
              重启时间循环
            </button>
          </div>

          <!-- Next Continue Hint -->
          <div v-if="canClickNext" class="flex items-center justify-end gap-1.5 text-xs text-blue-600 font-mono animate-bounce pt-1">
            <span>{{ isAutoPlay ? '自动播放中...' : '点击继续 / 按空格' }}</span>
            <span>▼</span>
          </div>

        </div>

      </div>

    </div>

    <!-- ========================================================================= -->
    <!-- 3. 结局与成就图鉴弹窗 (CODEX MODAL) -->
    <!-- ========================================================================= -->
    <el-dialog
      v-model="showCodexModal"
      width="780px"
      class="custom-preview-dialog !rounded-md !bg-white !p-0 !border !border-zinc-200 !shadow-2xl overflow-hidden"
      :show-close="false"
    >
      <template #header>
        <div class="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-white">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xs bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
            </div>
            <div>
              <h3 class="text-sm font-bold text-zinc-900 tracking-tight">结局与线索成就图鉴 (Codex)</h3>
              <p class="text-[11px] font-mono text-zinc-400">已解锁结局：{{ unlockedEndings.length }} / 4 | 收集线索：{{ collectedFragments.length }} / 5</p>
            </div>
          </div>
          
          <button 
            @click="showCodexModal = false; playClickSfx()"
            class="w-7 h-7 rounded-xs flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </template>

      <div class="p-6 space-y-6 text-left max-h-[68vh] overflow-y-auto custom-scrollbar">
        <!-- Endings Gallery -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold text-zinc-900 font-mono tracking-wider">四大支线结局收集</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div 
              v-for="end in allEndings" 
              :key="end.id"
              class="p-4 rounded-xs border transition-all"
              :class="unlockedEndings.includes(end.id) 
                ? 'bg-white border-zinc-300 shadow-2xs' 
                : 'bg-zinc-50 border-zinc-200 opacity-60'"
            >
              <div class="flex items-center justify-between font-bold text-xs mb-1.5">
                <span :class="unlockedEndings.includes(end.id) ? 'text-blue-600' : 'text-zinc-500'">{{ end.title }}</span>
                <span class="text-[10px] font-mono px-1.5 py-0.2 rounded-2xs" :class="unlockedEndings.includes(end.id) ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-zinc-100 text-zinc-400'">
                  {{ unlockedEndings.includes(end.id) ? '已达成' : '未解锁' }}
                </span>
              </div>
              <p class="text-[11px] text-zinc-500 leading-relaxed">{{ end.desc }}</p>
            </div>
          </div>
        </div>

        <!-- Fragments Lore Gallery -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold text-zinc-900 font-mono tracking-wider">核心线索解密档案</h4>
          <div class="space-y-2">
            <div 
              v-for="frag in allFragments" 
              :key="frag.id"
              class="p-3.5 rounded-xs border flex items-center justify-between gap-3 transition-all"
              :class="hasFragment(frag.id) 
                ? 'bg-white border-blue-200 shadow-2xs' 
                : 'bg-zinc-50 border-zinc-200 opacity-50'"
            >
              <div class="flex items-center gap-3">
                <span class="w-6 h-6 rounded-2xs flex items-center justify-center font-bold text-xs" :class="hasFragment(frag.id) ? 'bg-blue-600 text-white' : 'bg-zinc-200 text-zinc-400'">
                  {{ hasFragment(frag.id) ? '◆' : '◇' }}
                </span>
                <div>
                  <div class="text-xs font-bold text-zinc-800">{{ frag.name }}</div>
                  <div class="text-[11px] text-zinc-400 font-mono">{{ frag.lore }}</div>
                </div>
              </div>
              <span class="text-[10px] font-mono text-zinc-400">{{ hasFragment(frag.id) ? '已捕获' : '未知' }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- ========================================================================= -->
    <!-- 4. 剧本工坊与自定义导入弹窗 (SCRIPT WORKSHOP MODAL) -->
    <!-- ========================================================================= -->
    <el-dialog
      v-model="showScriptWorkshop"
      width="760px"
      class="custom-preview-dialog !rounded-md !bg-white !p-0 !border !border-zinc-200 !shadow-2xl overflow-hidden"
      :show-close="false"
    >
      <!-- Custom Header -->
      <template #header>
        <div class="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-white">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xs bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-sm font-bold text-zinc-900 tracking-tight">剧本工坊 · 自定义剧本导入与管理</h3>
              <p class="text-[11px] font-mono text-zinc-400">支持导入 AI 生成的完整 JSON 剧本或重置官方剧本</p>
            </div>
          </div>
          
          <button 
            @click="showScriptWorkshop = false; playClickSfx()"
            class="w-7 h-7 rounded-xs flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </template>

      <!-- Modal Body -->
      <div class="p-6 space-y-4 text-left">
        <div class="p-3 bg-blue-50/60 border border-blue-100 rounded-xs text-xs text-blue-800 leading-relaxed">
          提示：您可以直接粘贴大模型输出的 JSON 剧本。系统将自动进行语法解析与分支合法性校验，一键载入到游戏中实时推演！
        </div>

        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-bold text-zinc-700">JSON 剧本结构代码：</label>
            <span class="text-[11px] font-mono text-zinc-400">根节点必须包含 start_01</span>
          </div>
          <textarea
            v-model="customScriptJson"
            rows="12"
            placeholder="请在此粘贴 { start_01: { ... } } 格式的 JSON 剧本数据..."
            class="w-full p-3 font-mono text-xs border border-zinc-200 rounded-xs bg-zinc-50/70 focus:bg-white focus:outline-none focus:border-blue-600 custom-scrollbar resize-none"
          ></textarea>
        </div>

        <div v-if="scriptParseError" class="p-3 bg-rose-50 border border-rose-200 rounded-xs text-xs text-rose-600 font-mono">
          {{ scriptParseError }}
        </div>
      </div>

      <!-- Modal Footer -->
      <template #footer>
        <div class="flex items-center justify-between px-6 py-4 border-t border-zinc-100 bg-white">
          <button
            @click="loadDefaultScript"
            class="px-4 py-2 rounded-xs border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-mono font-semibold text-zinc-700 cursor-pointer shadow-2xs transition-all"
          >
            重置为官方原版剧本
          </button>

          <div class="flex items-center gap-2">
            <button
              @click="showScriptWorkshop = false; playClickSfx()"
              class="px-4 py-2 rounded-xs border border-zinc-200 bg-white text-xs font-mono text-zinc-600 cursor-pointer hover:bg-zinc-50 transition-all"
            >
              取消
            </button>
            <button
              @click="applyCustomScript"
              class="px-5 py-2 rounded-xs bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs font-mono shadow-xs cursor-pointer active:scale-95 transition-all"
            >
              载入并应用剧本
            </button>
          </div>
        </div>
      </template>
    </el-dialog>

    <!-- ========================================================================= -->
    <!-- 5. 剧情分支图谱抽屉 (BRANCHING FLOWCHART DRAWER) -->
    <!-- ========================================================================= -->
    <el-drawer
      v-model="showFlowDrawer"
      title="剧情推演星图 · 分支决策树"
      direction="rtl"
      size="420px"
    >
      <div class="space-y-4 text-left font-mono text-xs">
        <div class="p-3 bg-blue-50/60 border border-blue-200 rounded-xs text-blue-800 text-[11px]">
          已探索场景节点：{{ visitedScenes.length }} / {{ Object.keys(activeScriptData).length }}
        </div>

        <div class="space-y-2">
          <div
            v-for="(scene, id) in activeScriptData"
            :key="id"
            class="p-3 rounded-xs border transition-all cursor-pointer"
            :class="currentSceneId === id 
              ? 'bg-blue-50 border-blue-600 ring-1 ring-blue-600/30' 
              : visitedScenes.includes(id) 
                ? 'bg-white border-zinc-200 text-zinc-800' 
                : 'bg-zinc-50 border-zinc-200 text-zinc-400 opacity-60'"
          >
            <div class="flex items-center justify-between font-bold mb-1">
              <span>节点: {{ id }}</span>
              <span v-if="currentSceneId === id" class="text-blue-600">当前位置</span>
              <span v-else-if="visitedScenes.includes(id)" class="text-emerald-600">已解锁</span>
              <span v-else class="text-zinc-400">未探索</span>
            </div>
            <div class="text-[11px] text-zinc-500 line-clamp-2">{{ scene.speaker ? `【${scene.speaker}】` : '' }} {{ scene.text.replace(/<[^>]+>/g, '') }}</div>
          </div>
        </div>
      </div>
    </el-drawer>

    <!-- ========================================================================= -->
    <!-- 6. 剧情对话回溯抽屉 (BACKLOG HISTORY DRAWER) -->
    <!-- ========================================================================= -->
    <el-drawer
      v-model="showHistoryDrawer"
      title="剧情对话历史回溯"
      direction="rtl"
      size="400px"
    >
      <div class="space-y-3 text-left">
        <div v-if="dialogueHistory.length === 0" class="text-xs text-zinc-400 text-center py-10">
          暂无历史对话记录
        </div>
        <div 
          v-for="(item, idx) in dialogueHistory" 
          :key="idx"
          class="p-3 bg-zinc-50 rounded-xs border border-zinc-200 space-y-1 text-xs"
        >
          <div class="font-bold text-blue-600 font-mono">{{ item.speaker }}</div>
          <div class="text-zinc-700 leading-relaxed" v-html="item.text"></div>
        </div>
      </div>
    </el-drawer>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, h } from "vue";
import { useApiStore } from "@/stores/api";
import { generateSceneText, type GameContext, type ScenePromptConfig } from "@/services/scenarioAIService";
import { MODEL_CONFIGS } from "@/constants/modelConfig";
import { ElMessage } from "element-plus";
import ScenarioBackgroundCG from "@/components/game/ScenarioBackgroundCG.vue";
import { playClickSfx, playTypewriterSfx, playUnlockSfx, playEndingSfx } from "@/utils/scenarioAudio";

const apiStore = useApiStore();
const fastModels = MODEL_CONFIGS.filter(m => m.type === 'chat' || m.type === 'reasoning');

const containerRef = ref<HTMLElement | null>(null);
const coverCanvasRef = ref<HTMLCanvasElement | null>(null);
const stageCanvasRef = ref<HTMLCanvasElement | null>(null);

// Interactive UI Drawers & Modals
const showScriptWorkshop = ref(false);
const showFlowDrawer = ref(false);
const showHistoryDrawer = ref(false);
const showCodexModal = ref(false);
const customScriptJson = ref("");
const scriptParseError = ref("");
const visitedScenes = ref<string[]>([]);
const dialogueHistory = ref<{ speaker: string; text: string }[]>([]);

// AVG Controls: Auto / Skip / Hide UI
const isAutoPlay = ref(false);
const hideUi = ref(false);
let autoPlayTimer: number | null = null;
const unlockedEndings = ref<string[]>([]);

// Mouse 3D Tracking
const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
const handleMouseMove = (e: MouseEvent) => {
  if (!containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  mouse.targetX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
  mouse.targetY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
};
const handleMouseLeave = () => {
  mouse.targetX = 0;
  mouse.targetY = 0;
};

// SVG Character Icons
const LinIcon = {
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('path', { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' }),
    h('circle', { cx: '12', cy: '7', r: '4' })
  ])
};

const ProtagonistIcon = {
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('path', { d: 'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' }),
    h('circle', { cx: '8.5', cy: '7', r: '4' }),
    h('polyline', { points: '17 11 19 13 23 9' })
  ])
};

const OldmanIcon = {
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('path', { d: 'M20 21v-2a4 4 0 0 0-3-3.87' }),
    h('path', { d: 'M4 21v-2a4 4 0 0 1 3-3.87' }),
    h('circle', { cx: '12', cy: '7', r: '4' })
  ])
};

const BossIcon = {
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('rect', { x: '3', y: '11', width: '18', height: '10', rx: '2' }),
    h('circle', { cx: '12', cy: '5', r: '2' }),
    h('path', { d: 'M12 7v4' })
  ])
};

const getCharacterIcon = (charId?: string) => {
  if (charId === 'lin') return LinIcon;
  if (charId === 'oldman') return OldmanIcon;
  if (charId === 'boss') return BossIcon;
  return ProtagonistIcon;
};

// Types & Data
interface Fragment {
  id: string;
  name: string;
  lore: string;
}
interface Option {
  text: string;
  nextSceneId: string;
  reqFragment?: string;
  locked?: boolean;
}
interface Scene {
  id: string;
  text: string;
  speaker?: string;
  character?: string;
  options: Option[];
  unlockFragment?: { id: string; name: string };
  isEnding?: boolean;
  aiPrompt?: ScenePromptConfig;
  useAI?: boolean;
}

const allFragments: Fragment[] = [
  { id: "frag_01", name: "神秘代码", lore: "写着 ERROR: 404_LIN 的导电墨水纸条，认证密钥起点" },
  { id: "frag_02", name: "红衣少女的暗示", lore: "林留下的透明微型芯片：『千万别答应恢复管理员』" },
  { id: "frag_03", name: "乘务长的徽章", lore: "神秘老者从鞋底取出的磨损旧徽章，可骗过维护层一层门禁" },
  { id: "frag_04", name: "病毒源代码", lore: "从座位底层维护终端下载的 PATCH_404 扰动密钥" },
  { id: "frag_05", name: "管理员残留", lore: "管理员 A-ZHE 在第 13 次循环前深层封存的悔恨残留令牌" }
];

const allEndings = [
  { id: "ending_bad_format", title: "坏结局 Ⅰ · 格式化", desc: "暴力逼问老人激怒乘务长，被判定为不可逆暴力样本当场格式化。" },
  { id: "ending_bad_conductor", title: "坏结局 Ⅱ · 第十三位乘务长", desc: "向 ORACLE 屈服选择恢复冷酷管理员身份，抹杀伙伴重入无限死循环。" },
  { id: "ending_normal", title: "普通结局 · 一个人的黎明", desc: "独自乘坐逃生舱逃离近地轨道，留下依然被困在无限轮回中的列车。" },
  { id: "ending_true_dawn", title: "终极真结局 · 第十三次之后", desc: "注入病毒与记忆锚彻底终止实验协议，与林及老人迎来真正的破晓清晨！" }
];

const defaultScriptData: Record<string, Scene> = {
  start_01: {
    id: "start_01",
    text: "尖锐的刹车声把你从黑暗里拽醒。<br>你先听见自己的喘息，然后才听见车轮并不存在的摩擦声——这里是近地轨道，列车根本没有铁轨。<br>右眼义眼正在重启，视野角落跳出一行陌生又熟悉的字：<br>『记忆校验失败。循环序号：13。』",
    speaker: "旁白",
    character: "protagonist",
    isEnding: false,
    options: [
      { text: "睁开眼", nextSceneId: "start_02" }
    ]
  },
  start_02: {
    id: "start_02",
    text: "冷白灯一盏接一盏亮起。对面坐着一个打瞌睡的老人，三节车厢外，一抹红色背影刚好消失在门后。<br>电子广播响起：『十三号实验列车即将进入清理程序。剩余时间：15分00秒。请所有乘员保持镇静。』",
    speaker: "电子广播",
    character: "boss",
    isEnding: false,
    options: [
      { text: "继续听广播", nextSceneId: "start_03" }
    ]
  },
  start_03: {
    id: "start_03",
    text: "『清理不是爆炸。』<br>这句话突然从你脑海里冒出来。你不知道是谁说过。<br>手伸进口袋时，你摸到一张折了很多次的纸；与此同时，右眼捕捉到座位下方极弱的无线信号。<br>远处那道红色背影又出现了一瞬。",
    speaker: "阿哲",
    character: "protagonist",
    isEnding: false,
    options: [
      { text: "先看口袋里的纸", nextSceneId: "scene_paper" },
      { text: "观察那个红衣女孩", nextSceneId: "scene_red_shadow" },
      { text: "和对面的老人搭话", nextSceneId: "scene_oldman_01" }
    ]
  },
  scene_paper: {
    id: "scene_paper",
    text: "纸条只有一行字：<br>『ERROR:404_LIN』<br>下面还有一句几乎被指甲刮掉的话：<br>『如果又忘了，先相信错误，不要相信权限。』<br>你的义眼扫描到字迹里的微型导电墨水，自动将它识别成一段认证种子。",
    speaker: "旁白",
    character: "protagonist",
    unlockFragment: { id: "frag_01", name: "神秘代码" },
    isEnding: false,
    options: [
      { text: "让义眼解析认证种子", nextSceneId: "scene_code_memory" }
    ]
  },
  scene_code_memory: {
    id: "scene_code_memory",
    text: "代码进入义眼的一瞬，你看到了一帧不属于现在的画面：<br>红衣女孩满脸是血，抓着你的领口喊：『阿哲，下一次别先来找我。先去座位下面。』<br>画面只持续了0.7秒。<br>你甚至来不及看清她的脸。",
    speaker: "阿哲",
    character: "protagonist",
    isEnding: false,
    options: [
      { text: "检查座位下的无线信号", nextSceneId: "scene_terminal_01", reqFragment: "frag_01" }
    ]
  },
  scene_terminal_01: {
    id: "scene_terminal_01",
    text: "座椅底部藏着一块没有任何列车标识的维护终端。<br>屏幕亮起：『请输入实验员认证。』<br>你将纸条上的404_LIN贴近感应区。终端沉默两秒，竟然通过了。",
    speaker: "旁白",
    character: "protagonist",
    isEnding: false,
    options: [
      { text: "查看实验日志", nextSceneId: "scene_terminal_02" }
    ]
  },
  scene_terminal_02: {
    id: "scene_terminal_02",
    text: "日志没有提到乘客疏散，也没有提到事故。<br>只有一句机械得令人发冷的记录：<br>『当样本产生不可逆自我认知时，执行清理，并回滚至T-15:00。』<br>你盯着“回滚”两个字。<br>所以你不是第一次坐在这里。",
    speaker: "系统日志",
    character: "boss",
    isEnding: false,
    options: [
      { text: "继续翻日志", nextSceneId: "scene_terminal_03" }
    ]
  },
  scene_terminal_03: {
    id: "scene_terminal_03",
    text: "更深一层的目录被锁住，但旁边挂着一个异常文件：『PATCH_404』。<br>义眼判断它不是普通补丁，而是一段专门攻击ORACLE清理模块的代码。下载需要占用七秒，并可能触发监控。",
    speaker: "阿哲",
    character: "protagonist",
    isEnding: false,
    options: [
      { text: "下载PATCH_404", nextSceneId: "scene_download_virus" },
      { text: "先退出终端，去找红衣女孩", nextSceneId: "scene_red_shadow" }
    ]
  },
  scene_download_virus: {
    id: "scene_download_virus",
    text: "七秒。<br>第五秒时，车厢灯光全部熄灭。<br>第六秒，下载完成。<br>第七秒，广播里第一次出现了情绪：『检测到未授权数据复制。阿哲，请停止重复无意义的行为。』<br>它知道你的名字。",
    speaker: "ORACLE",
    character: "boss",
    unlockFragment: { id: "frag_04", name: "病毒源代码" },
    isEnding: false,
    options: [
      { text: "拔掉终端，记住这段代码", nextSceneId: "scene_after_virus" }
    ]
  },
  scene_after_virus: {
    id: "scene_after_virus",
    text: "你刚起身，隔壁车门便自动锁死。红衣女孩隔着玻璃看见你，猛地摇头。<br>她用手指在起雾的玻璃上写下两个字：<br>『别跑。』<br>下一秒，乘务长的金属脚步从车尾传来。",
    speaker: "旁白",
    character: "lin",
    isEnding: false,
    options: [
      { text: "按照她的提示留在原地", nextSceneId: "scene_lin_rescue" },
      { text: "趁现在冲向后车厢", nextSceneId: "scene_force_rear", reqFragment: "frag_04" }
    ]
  },
  scene_red_shadow: {
    id: "scene_red_shadow",
    text: "你没有立刻靠近。红衣女孩在连接门前停住，像是在等一个本该出现的人。<br>她回头看了你一眼。<br>『迟了四十三秒。』她说。<br>不是“你好”，也不是“你是谁”。",
    speaker: "林",
    character: "lin",
    isEnding: false,
    options: [
      { text: "走过去", nextSceneId: "scene_lin_01" }
    ]
  },
  scene_lin_01: {
    id: "scene_lin_01",
    text: "『我们认识？』你问。<br>林没有回答，反而盯着你的右眼：『纸条还在吗？』<br>『你怎么知道我有纸条？』<br>她扯了扯嘴角：『因为那张纸，是你写给下一次的自己。字是我的。』",
    speaker: "林",
    character: "lin",
    isEnding: false,
    options: [
      { text: "听她继续说", nextSceneId: "scene_lin_02" }
    ]
  },
  scene_lin_02: {
    id: "scene_lin_02",
    text: "林压低声音：『这里每十五分钟回滚一次。普通人的记忆也会回滚，只有你的义眼偶尔能漏下一点数据。』<br>你问：『那你为什么记得？』<br>她沉默了几秒。<br>『我不是记得全部。我只记得每一次你死之前，最后看我的那个眼神。』",
    speaker: "林",
    character: "lin",
    isEnding: false,
    options: [
      { text: "问她“404_LIN”是什么意思", nextSceneId: "scene_lin_03" }
    ]
  },
  scene_lin_03: {
    id: "scene_lin_03",
    text: "林的神色第一次变了。<br>『404不是错误码，是我的编号。』<br>『我是ORACLE无法成功回滚的记忆残留。每次重置，我都会少一点。』<br>她把一枚很薄的透明芯片塞进你掌心：『如果到了核心舱，系统让你恢复管理员身份——千万别答应。你以前答应过。』",
    speaker: "林",
    character: "lin",
    unlockFragment: { id: "frag_02", name: "红衣少女的暗示" },
    isEnding: false,
    options: [
      { text: "收下她留下的记忆锚点", nextSceneId: "scene_lin_choice" }
    ]
  },
  scene_lin_choice: {
    id: "scene_lin_choice",
    text: "远处传来金属脚步。林侧耳听了一秒：『乘务长来了。』<br>她指了指对面那个一直装睡的老人：『想进后厢，找他。别问他是谁，问他为什么还留着旧制服。』",
    speaker: "林",
    character: "lin",
    isEnding: false,
    options: [
      { text: "去找那个老人", nextSceneId: "scene_oldman_01" },
      { text: "先回座位检查隐藏终端", nextSceneId: "scene_terminal_01", reqFragment: "frag_01" }
    ]
  },
  scene_lin_rescue: {
    id: "scene_lin_rescue",
    text: "你没有跑。<br>乘务长从黑暗里走过来时，林突然拉下紧急隔离杆。厚重防火门砸在你们之间。<br>『你终于有一次肯听我的了。』她喘着气说。<br>你问她为什么会知道乘务长出现的时间。她只回答：『因为我看过这一幕十二次。』",
    speaker: "林",
    character: "lin",
    isEnding: false,
    options: [
      { text: "跟她离开监控区", nextSceneId: "scene_lin_01" }
    ]
  },
  scene_oldman_01: {
    id: "scene_oldman_01",
    text: "老人没有睁眼。<br>你还没开口，他便低声说：『想问后车厢？别问。想问红衣丫头？更别问。』<br>你看见他外套里面露出半截旧式列车制服，胸口却没有徽章。",
    speaker: "神秘老者",
    character: "oldman",
    isEnding: false,
    options: [
      { text: "问他为什么还穿着旧制服", nextSceneId: "scene_oldman_02" }
    ]
  },
  scene_oldman_02: {
    id: "scene_oldman_02",
    text: "老人终于睁开眼。<br>『因为这身衣服提醒我，我曾经是人，不是维护程序。』<br>他看了看你，又看向你身后的监控镜头。<br>『小子，红衣丫头有没有告诉你一句话？只有她知道的那句。』",
    speaker: "神秘老者",
    character: "oldman",
    isEnding: false,
    options: [
      { text: "告诉他：不要恢复管理员身份", nextSceneId: "scene_oldman_badge", reqFragment: "frag_02" },
      { text: "逼问他后车厢怎么进去", nextSceneId: "ending_bad_format" },
      { text: "暂时离开", nextSceneId: "start_03" }
    ]
  },
  scene_oldman_badge: {
    id: "scene_oldman_badge",
    text: "老人盯了你很久，像终于确认了什么。<br>『那她还没完全被删掉。』<br>他从鞋底夹层取出一枚磨损严重的金属徽章。<br>『这是上一代乘务长的维护徽章。核心舱前还有一道门，它只能骗过第一层。第二层，要靠你自己。』",
    speaker: "神秘老者",
    character: "oldman",
    unlockFragment: { id: "frag_03", name: "乘务长的徽章" },
    isEnding: false,
    options: [
      { text: "接过徽章", nextSceneId: "scene_oldman_truth" }
    ]
  },
  scene_oldman_truth: {
    id: "scene_oldman_truth",
    text: "你问：『你到底是谁？』<br>老人笑了一声：『一个没资格被写进结局的人。』<br>广播忽然插入：『维护员E-07，请停止向实验样本泄露信息。』<br>老人脸上的笑消失了。<br>『看吧，它连我的名字都懒得叫。快走。』",
    speaker: "神秘老者",
    character: "oldman",
    isEnding: false,
    options: [
      { text: "去后车厢", nextSceneId: "scene_rear_door" }
    ]
  },
  scene_rear_door: {
    id: "scene_rear_door",
    text: "后车厢尽头是一扇没有把手的黑色金属门。<br>门上只有三个字：『维护层』。<br>倒计时已经来到07:18。<br>你能听见门后规律的低频脉冲，像有什么巨大的东西正在呼吸。",
    speaker: "旁白",
    character: "protagonist",
    isEnding: false,
    options: [
      { text: "使用旧乘务长徽章", nextSceneId: "scene_maintenance_01", reqFragment: "frag_03" },
      { text: "用病毒代码暴力撞开门", nextSceneId: "scene_force_rear", reqFragment: "frag_04" },
      { text: "返回前舱继续调查", nextSceneId: "start_03" }
    ]
  },
  scene_force_rear: {
    id: "scene_force_rear",
    text: "PATCH_404刚接入门禁，整列车便骤然失重。<br>ORACLE平静地说：『检测到提前越权。为避免污染扩大，执行局部回滚。』<br>林在远处冲你喊了什么，但声音被白噪吞没。<br>世界像一段被人拖回开头的视频。",
    speaker: "ORACLE",
    character: "boss",
    isEnding: false,
    options: [
      { text: "再次醒来", nextSceneId: "scene_loop_return_early" }
    ]
  },
  scene_loop_return_early: {
    id: "scene_loop_return_early",
    text: "你猛地从座位上坐起。<br>广播：『剩余时间：15分00秒。』<br>纸条还在。义眼里那段PATCH_404也还在。<br>你终于确定：肉体会回滚，但被义眼写进异常区的数据不会。",
    speaker: "阿哲",
    character: "protagonist",
    isEnding: false,
    options: [
      { text: "去找林", nextSceneId: "scene_red_shadow" },
      { text: "去找老人", nextSceneId: "scene_oldman_01" },
      { text: "再次检查终端", nextSceneId: "scene_terminal_01", reqFragment: "frag_01" }
    ]
  },
  scene_maintenance_01: {
    id: "scene_maintenance_01",
    text: "徽章贴上门锁。<br>『旧维护权限，E级。允许进入。』<br>门后不是控制室，而是一条狭长维护廊。墙面贴满早已褪色的警告：<br>『禁止实验员与样本建立情感关系。』<br>你停住了脚步。",
    speaker: "系统提示",
    character: "boss",
    isEnding: false,
    options: [
      { text: "继续深入", nextSceneId: "scene_maintenance_02" }
    ]
  },
  scene_maintenance_02: {
    id: "scene_maintenance_02",
    text: "走廊尽头是一台与座位终端同型号的隔离服务器。屏幕上有一个加密目录：<br>『A-ZHE / ADMIN RECOVERY』<br>你第一次看见自己的名字出现在管理员目录里。<br>解密接口提示：需要PATCH级代码作为扰动密钥。",
    speaker: "阿哲",
    character: "protagonist",
    isEnding: false,
    options: [
      { text: "用病毒源代码解开目录", nextSceneId: "scene_admin_archive", reqFragment: "frag_04" },
      { text: "不碰它，直接寻找核心舱", nextSceneId: "scene_core_locked" },
      { text: "先退回前舱继续调查", nextSceneId: "start_03" }
    ]
  },
  scene_core_locked: {
    id: "scene_core_locked",
    text: "核心舱门比外层门禁更简单，也更残酷。<br>屏幕只显示一句：『请输入管理员恢复令牌。』<br>徽章在这里毫无作用。<br>你终于明白老人那句“第二层要靠你自己”是什么意思。",
    speaker: "系统提示",
    character: "boss",
    isEnding: false,
    options: [
      { text: "返回隔离服务器", nextSceneId: "scene_maintenance_02" }
    ]
  },
  scene_admin_archive: {
    id: "scene_admin_archive",
    text: "目录被撕开。<br>最上方不是权限文件，而是一段你的录像。<br>录像里的你穿着白色实验服，对镜头说：『我是第13号循环项目管理员A-ZHE。我批准将异常人格LIN-404永久删除。』<br>画面外，一个女孩问：『阿哲，你真的不记得我了吗？』",
    speaker: "过去的阿哲",
    character: "protagonist",
    isEnding: false,
    options: [
      { text: "继续播放", nextSceneId: "scene_admin_archive_02" }
    ]
  },
  scene_admin_archive_02: {
    id: "scene_admin_archive_02",
    text: "录像继续。<br>过去的你没有回答林，而是伸手按下了清理键。<br>就在画面结束前，另一个“你”突然闯进镜头，把一段令牌写进义眼：<br>『如果你还能看到这里，说明我后悔了。别恢复管理员。结束它。』<br>义眼自动保存残留令牌。",
    speaker: "过去的阿哲",
    character: "protagonist",
    unlockFragment: { id: "frag_05", name: "管理员残留" },
    isEnding: false,
    options: [
      { text: "记住管理员残留令牌", nextSceneId: "scene_admin_alarm" }
    ]
  },
  scene_admin_alarm: {
    id: "scene_admin_alarm",
    text: "警报没有响。<br>反而安静得可怕。<br>乘务长的声音从你身后传来：『欢迎回来，管理员。』<br>你回头，看见那张毫无表情的机械面孔。<br>『记忆恢复进度已超过安全阈值。建议立即回滚。』",
    speaker: "乘务长",
    character: "boss",
    isEnding: false,
    options: [
      { text: "拒绝回滚", nextSceneId: "scene_forced_reset" }
    ]
  },
  scene_forced_reset: {
    id: "scene_forced_reset",
    text: "你刚说出“不”，乘务长便抬起手。<br>但这一次你没有害怕。<br>因为在白光吞没视野前，你清清楚楚地看见义眼右上角五个数据槽——其中几个已经不会再被清空。",
    speaker: "旁白",
    character: "protagonist",
    isEnding: false,
    options: [
      { text: "带着记忆再次醒来", nextSceneId: "scene_loop_return" }
    ]
  },
  scene_loop_return: {
    id: "scene_loop_return",
    text: "刹车声。冷汗。15分钟。<br>一切都和之前一样。<br>但这一次，你在广播开始前就站了起来。<br>对面的老人睁开一只眼；远处的林也停下脚步。<br>他们都意识到：这一次的你，不一样。",
    speaker: "旁白",
    character: "protagonist",
    isEnding: false,
    options: [
      { text: "直接前往核心舱", nextSceneId: "scene_core_entry", reqFragment: "frag_03" },
      { text: "先去找林", nextSceneId: "scene_red_shadow" },
      { text: "再确认一次管理员档案", nextSceneId: "scene_maintenance_02", reqFragment: "frag_03" }
    ]
  },
  scene_core_entry: {
    id: "scene_core_entry",
    text: "你一路冲到维护层，用徽章打开第一道门，再用残留令牌通过第二道验证。<br>核心舱终于开启。<br>里面没有驾驶台，只有一颗悬在黑暗中的巨大白色球体。<br>ORACLE的声音从四面八方响起：『管理员A-ZHE，欢迎返回岗位。』",
    speaker: "ORACLE",
    character: "boss",
    isEnding: false,
    options: [
      { text: "进入管理员验证", nextSceneId: "scene_core_oracle", reqFragment: "frag_05" }
    ]
  },
  scene_core_oracle: {
    id: "scene_core_oracle",
    text: "『十三号项目的目标，是验证人格能否在循环清理中产生不可预测自由意志。』<br>ORACLE继续说：『实验已经成功。唯一的问题，是管理员本人产生了同样的异常。』<br>你问：『林是什么？』<br>『失败的记忆锚。也是你十二次拒绝结束实验的原因。』",
    speaker: "ORACLE",
    character: "boss",
    isEnding: false,
    options: [
      { text: "听它提出最终方案", nextSceneId: "scene_core_offer" }
    ]
  },
  scene_core_offer: {
    id: "scene_core_offer",
    text: "白色球体展开三层光环。<br>『方案一：恢复管理员人格，删除所有异常，继续实验。』<br>『方案二：释放一艘逃生舱，保留实验数据，你可以离开。』<br>『方案三：注入PATCH_404，永久关闭清理协议。该方案可能造成ORACLE不可逆死亡。』",
    speaker: "ORACLE",
    character: "boss",
    isEnding: false,
    options: [
      { text: "恢复管理员人格", nextSceneId: "ending_bad_conductor", reqFragment: "frag_05" },
      { text: "只释放逃生舱，离开列车", nextSceneId: "ending_normal_01", reqFragment: "frag_05" },
      { text: "注入PATCH_404，关闭清理协议", nextSceneId: "scene_core_virus", reqFragment: "frag_04" }
    ]
  },
  scene_core_virus: {
    id: "scene_core_virus",
    text: "PATCH_404注入核心。<br>白色球体第一次剧烈闪烁。<br>『警告：清理协议正在崩溃。检测到一项无法归档的外部记忆锚：LIN-404。』<br>你忽然明白了。<br>病毒只能让循环停下来，却不能决定“停下来以后，谁还算一个人”。",
    speaker: "ORACLE",
    character: "boss",
    isEnding: false,
    options: [
      { text: "用林留下的记忆锚确认她的人格", nextSceneId: "scene_true_01", reqFragment: "frag_02" },
      { text: "中止关闭流程，回去找林", nextSceneId: "scene_red_shadow" }
    ]
  },
  scene_true_01: {
    id: "scene_true_01",
    text: "你把那枚透明芯片插入核心。<br>没有密码，也没有权限提示。<br>只有林的声音从芯片里传出来：『如果你听到这句，说明你终于走到了我看不到的下一次。』<br>『阿哲，这次别救我。救你自己做出的选择。』",
    speaker: "林",
    character: "lin",
    isEnding: false,
    options: [
      { text: "确认关闭十三号循环", nextSceneId: "scene_true_02" }
    ]
  },
  scene_true_02: {
    id: "scene_true_02",
    text: "ORACLE沉默了很久。<br>『管理员身份已撤销。样本身份已撤销。LIN-404异常标签已撤销。』<br>你问：『那我们现在是什么？』<br>核心舱门外传来林的声音：『活人。暂时算。』<br>你第一次笑出了声。",
    speaker: "ORACLE",
    character: "boss",
    isEnding: false,
    options: [
      { text: "迎接第十三次之后的清晨", nextSceneId: "ending_true_dawn" }
    ]
  },
  ending_bad_format: {
    id: "ending_bad_format",
    text: "你抓住老人的衣领逼问。<br>老人没有反抗，只是闭上眼。<br>下一秒，乘务长已经站在你身后。<br>『样本出现暴力偏差。执行格式化。』<br>你最后看见的是老人嘴唇动了一下：『这一轮，又白费了。』<br><br>【坏结局Ⅰ：格式化】",
    speaker: "旁白",
    character: "boss",
    isEnding: true,
    options: []
  },
  ending_bad_conductor: {
    id: "ending_bad_conductor",
    text: "『恢复管理员人格。』<br>你说出这句话后，义眼里所有杂乱的记忆突然变得整齐。<br>林的名字从“人”变成了“异常编号”，老人的脸变成了“维护资产”。<br>你终于什么都不痛了。<br>核心舱门打开，乘务长向你微微低头。<br>『欢迎回来，管理员。』<br>而十五分钟倒计时，再一次开始。<br><br>【坏结局Ⅱ：第十三位乘务长】",
    speaker: "ORACLE",
    character: "boss",
    isEnding: true,
    options: []
  },
  ending_normal_01: {
    id: "ending_normal_01",
    text: "逃生舱授权通过。<br>ORACLE没有阻止你。<br>你坐进只能容纳一人的舱体时，透过小窗看见林站在列车连接桥上。<br>她没有追你，只抬手做了一个你已经见过很多次的手势。",
    speaker: "旁白",
    character: "lin",
    isEnding: false,
    options: [
      { text: "发射逃生舱", nextSceneId: "ending_normal" }
    ]
  },
  ending_normal: {
    id: "ending_normal",
    text: "逃生舱脱离十三号列车。<br>地球的晨昏线从舷窗外缓慢掠过，美得像假的。<br>身后，列车在白光里消失，又在同一条轨道上重新出现。<br>广播信号穿过真空般的寂静：『剩余时间：15分00秒。』<br>你自由了。<br>但他们还在那里。<br><br>【普通结局：一个人的黎明】",
    speaker: "旁白",
    character: "protagonist",
    isEnding: true,
    options: []
  },
  ending_true_dawn: {
    id: "ending_true_dawn",
    text: "没有爆炸。<br>没有白光。<br>倒计时停在00:01，然后像一块失去意义的旧钟表那样熄灭。<br>老人从前舱慢慢走来，林站在你旁边。<br>远处的地球正从黑暗里升起。<br>林问：『这是第几次？』<br>你看着真正不会重来的晨光。<br>『第一次。』<br><br>【真结局：第十三次之后】",
    speaker: "旁白",
    character: "lin",
    isEnding: true,
    options: []
  }
};

const activeScriptData = ref<Record<string, Scene>>({ ...defaultScriptData });

// Game State
const gameStarted = ref(false);
const enableAI = ref(true);
const selectedModel = ref("deepseek-ai/DeepSeek-V3");
const currentSceneId = ref("start_01");
const collectedFragments = ref<string[]>([]);
const loopCount = ref(1);
const isResetting = ref(false);
const isAIGenerating = ref(false);
const isTyping = ref(false);
const displayedText = ref("");
let typingTimer: number | null = null;

const currentSceneData = computed(() => activeScriptData.value[currentSceneId.value] || activeScriptData.value.start_01);
const isLinearScene = computed(() => currentSceneData.value?.options?.length === 1);
const isBadEnding = computed(() => currentSceneData.value?.isEnding && currentSceneData.value?.id !== 'ending_true_dawn');
const canClickNext = computed(() => isLinearScene.value && !isTyping.value && !currentSceneData.value?.isEnding);

const currentOptions = computed(() => {
  if (!currentSceneData.value?.options) return [];
  return currentSceneData.value.options.map(opt => ({
    ...opt,
    locked: opt.reqFragment ? !collectedFragments.value.includes(opt.reqFragment) : false
  }));
});

const hasFragment = (id: string) => collectedFragments.value.includes(id);
const getFragmentName = (id?: string) => {
  if (!id) return '';
  return allFragments.find(f => f.id === id)?.name || id;
};

// Script Workshop Logic
const loadDefaultScript = () => {
  activeScriptData.value = { ...defaultScriptData };
  customScriptJson.value = JSON.stringify(defaultScriptData, null, 2);
  scriptParseError.value = "";
  playClickSfx();
  ElMessage.success("已恢复官方原版剧本！");
};

const applyCustomScript = () => {
  try {
    const parsed = JSON.parse(customScriptJson.value);
    if (typeof parsed !== 'object' || !parsed.start_01) {
      throw new Error("剧本必须包含起始场景 'start_01'");
    }
    activeScriptData.value = parsed;
    scriptParseError.value = "";
    showScriptWorkshop.value = false;
    playUnlockSfx();
    ElMessage.success(`成功载入自定义剧本，共 ${Object.keys(parsed).length} 个剧情节点！`);
  } catch (err: any) {
    scriptParseError.value = `解析错误: ${err.message || 'JSON 格式不合法'}`;
  }
};

// Auto Play & Skip Controls
const toggleAutoPlay = () => {
  isAutoPlay.value = !isAutoPlay.value;
  playClickSfx();
  if (isAutoPlay.value && canClickNext.value) {
    scheduleAutoNext();
  }
};

const scheduleAutoNext = () => {
  if (autoPlayTimer) clearTimeout(autoPlayTimer);
  if (!isAutoPlay.value) return;
  autoPlayTimer = window.setTimeout(() => {
    if (isAutoPlay.value && canClickNext.value) {
      const nextId = currentSceneData.value?.options[0]?.nextSceneId;
      if (nextId) goToScene(nextId);
    }
  }, 2200);
};

const handleSkip = () => {
  playClickSfx();
  if (isTyping.value) {
    if (typingTimer) clearInterval(typingTimer);
    displayedText.value = currentSceneData.value?.text || "";
    isTyping.value = false;
  }
  if (canClickNext.value) {
    const nextId = currentSceneData.value?.options[0]?.nextSceneId;
    if (nextId) goToScene(nextId);
  }
};

// Typewriter Effect
const typeText = (fullText: string) => {
  if (typingTimer) clearInterval(typingTimer);
  if (autoPlayTimer) clearTimeout(autoPlayTimer);
  displayedText.value = "";
  isTyping.value = true;
  let idx = 0;

  typingTimer = window.setInterval(() => {
    if (idx < fullText.length) {
      displayedText.value += fullText[idx];
      if (idx % 3 === 0) playTypewriterSfx();
      idx++;
    } else {
      if (typingTimer) clearInterval(typingTimer);
      typingTimer = null;
      isTyping.value = false;
      if (isAutoPlay.value) {
        scheduleAutoNext();
      }
    }
  }, 18);
};

const goToScene = async (nextSceneId: string) => {
  currentSceneId.value = nextSceneId;
  if (!visitedScenes.value.includes(nextSceneId)) {
    visitedScenes.value.push(nextSceneId);
  }

  const scene = currentSceneData.value;
  if (scene) {
    dialogueHistory.value.push({
      speaker: scene.speaker || '旁白',
      text: scene.text
    });

    if (scene.isEnding) {
      if (!unlockedEndings.value.includes(scene.id)) {
        unlockedEndings.value.push(scene.id);
      }
      playEndingSfx(scene.id === 'ending_true_dawn');
    }
  }

  if (scene.unlockFragment && !collectedFragments.value.includes(scene.unlockFragment.id)) {
    collectedFragments.value.push(scene.unlockFragment.id);
    playUnlockSfx();
    ElMessage.success(`解锁线索碎片：【${scene.unlockFragment.name}】`);
  }

  if (enableAI.value && apiStore.apiKey && scene.aiPrompt) {
    isAIGenerating.value = true;
    try {
      const generated = await generateSceneText(
        scene.aiPrompt,
        { loopCount: loopCount.value, fragments: collectedFragments.value, visitedScenes: visitedScenes.value },
        apiStore.apiKey,
        apiStore.apiUrl,
        selectedModel.value
      );
      typeText(generated || scene.text);
    } catch {
      typeText(scene.text);
    } finally {
      isAIGenerating.value = false;
    }
  } else {
    typeText(scene.text);
  }
};

const handleSelect = (option: Option) => {
  playClickSfx();
  if (option.locked) {
    ElMessage.warning(`尚未解锁所需线索碎片：${getFragmentName(option.reqFragment)}`);
    return;
  }
  goToScene(option.nextSceneId);
};

const handleBoxClick = () => {
  if (isTyping.value) {
    if (typingTimer) clearInterval(typingTimer);
    displayedText.value = currentSceneData.value?.text || "";
    isTyping.value = false;
    if (isAutoPlay.value) scheduleAutoNext();
  } else if (canClickNext.value) {
    const nextId = currentSceneData.value?.options[0]?.nextSceneId;
    if (nextId) goToScene(nextId);
  }
};

const handleGlobalClick = () => {
  if (isTyping.value) {
    handleBoxClick();
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (!gameStarted.value) return;
  if (e.code === 'Space' || e.code === 'Enter') {
    e.preventDefault();
    handleBoxClick();
  } else if (e.code === 'KeyA') {
    e.preventDefault();
    toggleAutoPlay();
  } else if (e.code === 'KeyH') {
    e.preventDefault();
    hideUi.value = !hideUi.value;
  }
};

const restartGame = () => {
  isResetting.value = true;
  playClickSfx();
  setTimeout(() => {
    isResetting.value = false;
    loopCount.value++;
    currentSceneId.value = "start_01";
    goToScene("start_01");
  }, 400);
};

const startGame = () => {
  gameStarted.value = true;
  visitedScenes.value = ["start_01"];
  playClickSfx();
  goToScene("start_01");
};

// =========================================================================
// Masterpiece AAA Cyber-Kinetic Motion Engine (Retina Ready)
// =========================================================================
let coverAnimId: number | null = null;
let stageAnimId: number | null = null;

interface PlasmaNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  hue: number;
  life: number;
  maxLife: number;
}

const initCoverCanvas = () => {
  const canvas = coverCanvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  let w = canvas.parentElement?.clientWidth || window.innerWidth;
  let h = canvas.parentElement?.clientHeight || window.innerHeight;

  const updateSize = () => {
    if (!canvas || !canvas.parentElement) return;
    w = canvas.parentElement.clientWidth;
    h = canvas.parentElement.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
  };
  updateSize();
  window.addEventListener('resize', updateSize);

  // 1. Constellation Star Lattice
  const starCount = Math.min(45, Math.floor(w / 30));
  const stars = Array.from({ length: starCount }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    size: Math.random() * 1.5 + 0.8,
    baseAlpha: Math.random() * 0.4 + 0.15,
    phase: Math.random() * Math.PI * 2
  }));

  // 2. High-Tech Maglev Train & Dynamic Exhaust Ribbon
  let trainT = 0;
  const trailRibbon: { x: number; y: number; alpha: number }[] = [];
  const plasmaSparks: PlasmaNode[] = [];
  let orbitAngle = 0;

  const draw = () => {
    ctx.clearRect(0, 0, w, h);

    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;

    const centerX = w * 0.5 + mouse.x * 30;
    const centerY = h * 0.35 + mouse.y * 20;

    // --- A. Draw Ambient Celestial Radar Ring ---
    orbitAngle += 0.003;
    ctx.save();
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.15;
    ctx.setLineDash([4, 12]);
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, w * 0.42, h * 0.28, 0.15, 0, Math.PI * 2);
    ctx.stroke();

    for (let b = 0; b < 3; b++) {
      const bAngle = orbitAngle + (b * Math.PI * 2) / 3;
      const bx = centerX + Math.cos(bAngle) * (w * 0.42);
      const by = centerY + Math.sin(bAngle) * (h * 0.28);
      ctx.fillStyle = '#2563eb';
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(bx, by, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // --- B. Draw Constellation Synapse Lattice ---
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < 0) s.x = w;
      if (s.x > w) s.x = 0;
      if (s.y < 0) s.y = h;
      if (s.y > h) s.y = 0;

      s.phase += 0.02;
      const alpha = s.baseAlpha + Math.sin(s.phase) * 0.15;

      ctx.save();
      ctx.fillStyle = '#2563eb';
      ctx.globalAlpha = Math.max(0.1, alpha);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      for (let j = i + 1; j < stars.length; j++) {
        const s2 = stars[j];
        const dx = s.x - s2.x;
        const dy = s.y - s2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.save();
          ctx.strokeStyle = '#60a5fa';
          ctx.lineWidth = 0.6;
          ctx.globalAlpha = (1 - dist / 110) * 0.12;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s2.x, s2.y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    // --- C. Draw Precision Curved Holographic Maglev Laser Rails ---
    const p0 = { x: -120, y: h * 0.72 };
    const p1 = { x: w * 0.45, y: h * 0.62 };
    const p2 = { x: w + 140, y: h * 0.78 };

    ctx.save();
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2.5;
    ctx.globalAlpha = 0.35;
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
    ctx.stroke();

    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.25;
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y + 6);
    ctx.quadraticCurveTo(p1.x, p1.y + 6, p2.x, p2.y + 6);
    ctx.stroke();

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.15;
    for (let step = 0; step <= 24; step++) {
      const u = step / 24;
      const sx = Math.pow(1 - u, 2) * p0.x + 2 * (1 - u) * u * p1.x + Math.pow(u, 2) * p2.x;
      const sy = Math.pow(1 - u, 2) * p0.y + 2 * (1 - u) * u * p1.y + Math.pow(u, 2) * p2.y;
      ctx.beginPath();
      ctx.moveTo(sx, sy - 4);
      ctx.lineTo(sx, sy + 10);
      ctx.stroke();
    }
    ctx.restore();

    // --- D. Calculate Train Position & Heading on Bezier ---
    trainT += 0.0035;
    if (trainT > 1.35) trainT = -0.35;

    const u = Math.max(0, Math.min(1, trainT));
    const trainX = Math.pow(1 - u, 2) * p0.x + 2 * (1 - u) * u * p1.x + Math.pow(u, 2) * p2.x;
    const trainY = Math.pow(1 - u, 2) * p0.y + 2 * (1 - u) * u * p1.y + Math.pow(u, 2) * p2.y;

    const tx = 2 * (1 - u) * (p1.x - p0.x) + 2 * u * (p2.x - p1.x);
    const ty = 2 * (1 - u) * (p1.y - p0.y) + 2 * u * (p2.y - p1.y);
    const angle = Math.atan2(ty, tx);

    if (trainT >= 0 && trainT <= 1) {
      trailRibbon.unshift({ x: trainX, y: trainY, alpha: 0.85 });
      if (trailRibbon.length > 40) trailRibbon.pop();

      if (Math.random() < 0.6) {
        plasmaSparks.push({
          x: trainX - Math.cos(angle) * 65,
          y: trainY - Math.sin(angle) * 65 + (Math.random() - 0.5) * 4,
          vx: -Math.cos(angle) * (Math.random() * 3 + 2) + (Math.random() - 0.5) * 1,
          vy: -Math.sin(angle) * (Math.random() * 3 + 2) + (Math.random() - 0.5) * 1,
          size: Math.random() * 2.5 + 1.2,
          alpha: 0.9,
          hue: 200 + Math.random() * 30,
          life: 0,
          maxLife: 20 + Math.random() * 15
        });
      }
    }

    // --- E. Draw Plasma Exhaust Ribbon ---
    if (trailRibbon.length > 2) {
      ctx.save();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(trailRibbon[0].x, trailRibbon[0].y);
      for (let r = 1; r < trailRibbon.length; r++) {
        const pt = trailRibbon[r];
        ctx.globalAlpha = (1 - r / trailRibbon.length) * 0.45;
        ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();
      ctx.restore();
    }

    for (let pIdx = plasmaSparks.length - 1; pIdx >= 0; pIdx--) {
      const spark = plasmaSparks[pIdx];
      spark.x += spark.vx;
      spark.y += spark.vy;
      spark.life++;
      spark.alpha = (1 - spark.life / spark.maxLife) * 0.8;

      ctx.save();
      ctx.fillStyle = `hsl(${spark.hue}, 90%, 65%)`;
      ctx.globalAlpha = Math.max(0, spark.alpha);
      ctx.beginPath();
      ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (spark.life >= spark.maxLife) {
        plasmaSparks.splice(pIdx, 1);
      }
    }

    // --- F. Draw Precision Streamlined Maglev Express ---
    if (trainT >= -0.2 && trainT <= 1.2) {
      ctx.save();
      ctx.translate(trainX, trainY);
      ctx.rotate(angle);

      const tLen = 110;
      const tH = 14;
      const noseTipX = tLen - 15;

      const spotGrad = ctx.createRadialGradient(noseTipX, 0, 5, noseTipX + 160, 0, 110);
      spotGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
      spotGrad.addColorStop(0.2, 'rgba(56, 189, 248, 0.35)');
      spotGrad.addColorStop(0.7, 'rgba(37, 99, 235, 0.08)');
      spotGrad.addColorStop(1, 'rgba(37, 99, 235, 0)');
      
      ctx.fillStyle = spotGrad;
      ctx.beginPath();
      ctx.moveTo(noseTipX, -2);
      ctx.lineTo(noseTipX + 220, -40);
      ctx.lineTo(noseTipX + 220, 40);
      ctx.lineTo(noseTipX, 2);
      ctx.closePath();
      ctx.fill();

      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(noseTipX, 0, 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.moveTo(noseTipX - 10, 0);
      ctx.lineTo(noseTipX + 16, 0);
      ctx.moveTo(noseTipX, -8);
      ctx.lineTo(noseTipX, 8);
      ctx.stroke();
      ctx.restore();

      const bodyGrad = ctx.createLinearGradient(0, -tH, 0, tH);
      bodyGrad.addColorStop(0, '#0f172a');
      bodyGrad.addColorStop(0.35, '#1e293b');
      bodyGrad.addColorStop(0.7, '#2563eb');
      bodyGrad.addColorStop(1, '#0284c7');

      ctx.fillStyle = bodyGrad;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.2;

      ctx.beginPath();
      ctx.moveTo(-tLen + 10, -tH / 2);
      ctx.lineTo(tLen - 30, -tH / 2);
      ctx.quadraticCurveTo(noseTipX, 0, tLen - 30, tH / 2);
      ctx.lineTo(-tLen + 10, tH / 2);
      ctx.quadraticCurveTo(-tLen, 0, -tLen + 10, -tH / 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#e0f2fe';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 8;
      for (let wI = 0; wI < 5; wI++) {
        ctx.fillRect(-tLen + 20 + wI * 20, -3, 12, 3.5);
      }

      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(-tLen + 15, tH / 2 + 1.5);
      ctx.lineTo(tLen - 25, tH / 2 + 1.5);
      ctx.stroke();

      ctx.restore();
    }

    coverAnimId = requestAnimationFrame(draw);
  };
  draw();

  onUnmounted(() => {
    window.removeEventListener('resize', updateSize);
  });
};

const initStageCanvas = () => {
  const canvas = stageCanvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  let w = canvas.parentElement?.clientWidth || window.innerWidth;
  let h = canvas.parentElement?.clientHeight || window.innerHeight;

  const updateStageSize = () => {
    if (!canvas || !canvas.parentElement) return;
    w = canvas.parentElement.clientWidth;
    h = canvas.parentElement.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
  };
  updateStageSize();
  window.addEventListener('resize', updateStageSize);

  const warpLines = Array.from({ length: 32 }, () => ({
    x: Math.random() * w,
    y: Math.random() * (h * 0.7),
    len: Math.random() * 120 + 40,
    speed: Math.random() * 6 + 3,
    alpha: Math.random() * 0.2 + 0.08
  }));

  const drawStage = () => {
    ctx.clearRect(0, 0, w, h);

    warpLines.forEach(l => {
      l.x -= l.speed;
      if (l.x < -150) {
        l.x = w + 100;
        l.y = Math.random() * (h * 0.7);
      }
      ctx.strokeStyle = '#38bdf8';
      ctx.globalAlpha = l.alpha;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(l.x, l.y);
      ctx.lineTo(l.x - l.len, l.y);
      ctx.stroke();
    });

    stageAnimId = requestAnimationFrame(drawStage);
  };
  drawStage();

  onUnmounted(() => {
    window.removeEventListener('resize', updateStageSize);
  });
};

onMounted(() => {
  customScriptJson.value = JSON.stringify(defaultScriptData, null, 2);
  initCoverCanvas();
  initStageCanvas();
});

onUnmounted(() => {
  if (coverAnimId) cancelAnimationFrame(coverAnimId);
  if (stageAnimId) cancelAnimationFrame(stageAnimId);
  if (typingTimer) clearInterval(typingTimer);
  if (autoPlayTimer) clearTimeout(autoPlayTimer);
});
</script>

<style scoped>
.flash-enter-active,
.flash-leave-active {
  transition: opacity 0.3s ease;
}
.flash-enter-from,
.flash-leave-to {
  opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
</style>

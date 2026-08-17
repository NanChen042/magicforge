<template>
  <!-- 5. 代码展示：开发者工坊 IDE (现代化多 Tab 交互、专业高对比度语法高亮与一键复制) -->
  <section class="max-w-5xl mx-auto pt-12 pb-16 sm:pt-16 sm:pb-24 px-3.5 sm:px-6 relative z-20 font-sans select-none">
    
    <!-- 标题区 (告别断头标签，极简高端层次) -->
    <div class="text-center mb-8 sm:mb-10 space-y-2.5">
      <div class="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
        DEVELOPER EXPERIENCE
      </div>

      <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
        几行代码，接入
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600">
          全栈 AI 能力
        </span>
      </h2>

      <p class="text-slate-500 text-xs sm:text-base max-w-xl mx-auto font-normal leading-relaxed">
        从流式对话到多模态理解，API 设计遵循直觉，让你专注于产品而非基础设施。
      </p>
    </div>

    <!-- IDE 容器外围环境辉光与卡片 -->
    <div class="relative">
      
      <!-- 背景环境弥散辉光 (Ambient Glow) -->
      <div class="absolute -inset-1 bg-gradient-to-r from-blue-600/15 via-indigo-600/10 to-cyan-500/15 rounded-2xl blur-xl -z-10"></div>

      <!-- IDE 核心窗口 (现代化深色暗调) -->
      <div class="bg-[#090d16] rounded-xl shadow-2xl shadow-slate-950/40 overflow-hidden border border-slate-800/90">

        <!-- 模拟 IDE 顶部导航栏与 Tab 切换 (移动端自适应两行排版，桌面端优雅单行并列) -->
        <div class="px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0d1322] border-b border-slate-800/80 space-y-2.5 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-3">
          
          <!-- 第一行（移动端左右对齐）：Mac 圆点 + 文件名标签 + 移动端复制按钮 -->
          <div class="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="flex items-center gap-1.5">
                <div class="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50"></div>
                <div class="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50"></div>
                <div class="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50"></div>
              </div>
              <div class="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-800 text-[11px] sm:text-xs font-mono text-slate-300">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>{{ activeSnippet.filename }}</span>
              </div>
            </div>

            <!-- 移动端右上角复制代码按钮 -->
            <button
              @click="copyCode"
              class="sm:hidden px-2.5 py-1 rounded-md bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-slate-300 hover:text-white border border-slate-700/80 text-[11px] font-mono transition-all flex items-center gap-1 cursor-pointer shadow-xs shrink-0 select-none"
            >
              <template v-if="copied">
                <svg class="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span class="text-emerald-400 font-medium">已复制</span>
              </template>
              <template v-else>
                <svg class="w-3 h-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>复制</span>
              </template>
            </button>
          </div>

          <!-- 第二行（移动端横向无阻滑动，绝不被压成坚排文字）：4 个功能 Tab 切换 -->
          <div class="overflow-x-auto custom-scrollbar flex items-center gap-1 bg-slate-950/90 p-1 rounded-lg border border-slate-800 text-xs font-mono w-full sm:w-auto">
            <button
              v-for="item in snippets"
              :key="item.id"
              @click="activeTab = item.id"
              class="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 select-none"
              :class="activeTab === item.id 
                ? 'bg-blue-600 text-white font-medium shadow-xs' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'"
            >
              <!-- 矢量 SVG 图标 -->
              <component :is="item.iconComponent" class="w-3.5 h-3.5 shrink-0" />
              <span>{{ item.tabName }}</span>
            </button>
          </div>

          <!-- 桌面端最右侧：一键复制代码 -->
          <button
            @click="copyCode"
            class="hidden sm:flex px-3 py-1.5 rounded-md bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-mono transition-all items-center gap-1.5 cursor-pointer shadow-xs select-none"
          >
            <template v-if="copied">
              <svg class="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span class="text-emerald-400 font-medium">已复制</span>
            </template>
            <template v-else>
              <svg class="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span>复制代码</span>
            </template>
          </button>

        </div>

        <!-- 代码编辑器内容区 (基于 highlight.js 真实高亮，带精确行号与舒适行高) -->
        <div class="p-3 sm:p-6 overflow-x-auto custom-scrollbar font-mono text-[12px] sm:text-[13px] leading-5 sm:leading-6 text-slate-300 bg-[#060911]">
          <pre class="font-mono m-0 p-0"><code class="grid grid-cols-[auto_1fr] gap-x-3 sm:gap-x-4"><template v-for="(line, idx) in formattedLines" :key="idx"><span class="text-slate-600 select-none text-right font-mono pr-2 sm:pr-3 border-r border-slate-800/80">{{ idx + 1 }}</span><span class="code-line pl-2 whitespace-pre" v-html="line || '&nbsp;'"></span></template></code></pre>
        </div>

        <!-- IDE 底部状态栏 -->
        <div class="px-3 sm:px-4 py-2 bg-[#090d16] border-t border-slate-800/80 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-500">
          <div class="flex items-center gap-2 sm:gap-3">
            <span class="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              TypeScript 5.0
            </span>
            <span class="text-slate-700">|</span>
            <span>UTF-8</span>
            <span class="hidden sm:inline text-slate-700">|</span>
            <span class="hidden sm:inline">LF</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-slate-400">MagicForge SDK</span>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'
import hljs from 'highlight.js'

const activeTab = ref('stream')
const copied = ref(false)

// 矢量 SVG 组件定义 (彻底消除雷霆图标，改用专业 Terminal / Code Spark 符号)
const StreamIcon = {
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('polyline', { points: '4 17 10 11 4 5' }),
    h('line', { x1: '12', y1: '19', x2: '20', y2: '19' })
  ])
}

const VisionIcon = {
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' }),
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' })
  ])
}

const AudioIcon = {
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' })
  ])
}

const GameIcon = {
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M6 11h4M8 9v4M15 12h.01M18 10h.01' }),
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M17.32 5H6.68a4 4 0 00-3.978 3.59 4.004 4.004 0 003.35 4.225l1.042.174a2 2 0 011.666 1.706l.24 1.722A2 2 0 0011 18.5h2a2 2 0 001.986-1.926l.24-1.722a2 2 0 011.666-1.706l1.042-.174a4.004 4.004 0 003.35-4.225A4 4 0 0017.32 5z' })
  ])
}

const snippets = [
  {
    id: 'stream',
    tabName: '流式推理',
    iconComponent: StreamIcon,
    filename: 'StreamReasoning.ts',
    rawCode: `import { DeepseekClient } from '@/services/DeepseekClient';

// 初始化推理客户端
const client = new DeepseekClient({
  apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxx',
  baseURL: 'https://api.siliconflow.cn/v1'
});

// 发起深度推理流式对话（支持 DeepSeek-R1 思维链实时透出）
const stream = await client.streamChat({
  model: 'deepseek-ai/DeepSeek-R1',
  messages: [{ role: 'user', content: '设计一个支持百万高并发的分布式任务队列' }],
  temperature: 0.6,
  onThinking: (reasoningChunk) => {
    // 实时捕获 AI 深度思考轨迹
    process.stdout.write(reasoningChunk);
  },
  onContent: (answerChunk) => {
    // 逐字输出最终推理方案
    renderText(answerChunk);
  }
});`
  },
  {
    id: 'vision',
    tabName: '视觉与多模态',
    iconComponent: VisionIcon,
    filename: 'MultimodalVision.ts',
    rawCode: `import { siliconFlowClient } from '@/services/siliconFlowClient';

// 1. 文生图 (Text-to-Image 4K)
const image = await siliconFlowClient.generateImage({
  prompt: '赛博朋克风格的未来东方机械都市, 4k resolution, cinematic lighting',
  model: 'Kwai-Kolors/Kolors',
  image_size: '1024x1024'
});

// 2. 视觉理解与 OCR 智能解析
const documentAnalysis = await siliconFlowClient.chatCompletion({
  model: 'THUDM/glm-4v-9b',
  messages: [
    {
      role: 'user',
      content: [
        { type: 'text', text: '提取并格式化图中的表格数据为 Markdown' },
        { type: 'image_url', image_url: { url: 'https://example.com/invoice.png' } }
      ]
    }
  ]
});`
  },
  {
    id: 'audio',
    tabName: '拟真语音合成',
    iconComponent: AudioIcon,
    filename: 'VoiceSynthesis.ts',
    rawCode: `import { siliconFlowClient } from '@/services/siliconFlowClient';

// 调用 CosyVoice 生成高保真超拟真语音 (Text-to-Speech)
const audioResponse = await siliconFlowClient.textToSpeech({
  model: 'FunAudioLLM/CosyVoice2-0.5B',
  input: '欢迎使用 MagicForge 智能创作工坊，探索灵感与代码的全新交汇。',
  voice: 'FunAudioLLM/CosyVoice2-0.5B:alex',
  response_format: 'mp3'
});

// 播放返回的语音流
const audio = new Audio(URL.createObjectURL(audioResponse));
audio.play();`
  },
  {
    id: 'game',
    tabName: '互动叙事引擎',
    iconComponent: GameIcon,
    filename: 'NarrativeEngine.ts',
    rawCode: `import { DeepseekService } from '@/services/deepseekService';
import { GAME_SCRIPTS } from '@/constants/gameScripts';

// 加载《失序回响 · 零号城》战役模组
const script = GAME_SCRIPTS.find(s => s.id === 'lost_echo_zero')!;
DeepseekService.setActiveScript(script);

// 根据玩家在第 1 幕的抉择实时推演第 2 幕剧情分支
const nextScene = await DeepseekService.generateScene({
  currentSceneId: 1,
  choiceText: '截取终端刚才出现的 ZERO-07 异常记录，反向追踪黑色车辆信号',
  playerName: '代号·ZERO-07',
  storyProgress: { mainQuests: { gaming: 10, study: 25, social: 10, other: 10 } }
});`
  }
]

const activeSnippet = computed(() => {
  return snippets.find(s => s.id === activeTab.value) || snippets[0]
})

// 使用 highlight.js 进行标准代码高亮，避免任何正则表达式替换副作用
const formattedLines = computed(() => {
  const code = activeSnippet.value.rawCode
  try {
    const highlighted = hljs.highlight(code, { language: 'typescript', ignoreIllegals: true }).value
    return highlighted.split('\n')
  } catch {
    return code.split('\n')
  }
})

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(activeSnippet.value.rawCode)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #080d17;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #334155;
}

/* VS Code Dark+ / Tokyo Night 高对比度语法配色 */
:deep(.hljs-keyword),
:deep(.hljs-selector-tag),
:deep(.hljs-type) {
  color: #60a5fa !important; /* Tailwind blue-400 */
  font-weight: 600;
}

:deep(.hljs-string),
:deep(.hljs-template-variable) {
  color: #34d399 !important; /* Tailwind emerald-400 */
}

:deep(.hljs-comment) {
  color: #64748b !important; /* Tailwind slate-500 */
  font-style: italic;
}

:deep(.hljs-number),
:deep(.hljs-literal),
:deep(.hljs-boolean) {
  color: #fbbf24 !important; /* Tailwind amber-400 */
}

:deep(.hljs-title),
:deep(.hljs-title.function_),
:deep(.hljs-title.class_) {
  color: #38bdf8 !important; /* Tailwind sky-400 */
  font-weight: 600;
}

:deep(.hljs-attr),
:deep(.hljs-property),
:deep(.hljs-variable) {
  color: #93c5fd !important; /* Tailwind blue-300 */
}

:deep(.hljs-punctuation),
:deep(.hljs-operator) {
  color: #94a3b8 !important; /* Tailwind slate-400 */
}
</style>

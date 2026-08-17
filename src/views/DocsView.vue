<template>
  <div class="min-h-[calc(100vh-4rem)] bg-white font-sans select-none text-slate-800 flex flex-col">
    
    <!-- 移动端顶部目录触发栏 (仅小屏展示) -->
    <div class="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-2.5 flex items-center justify-between">
      <button 
        @click="mobileSidebarOpen = true" 
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
      >
        <svg class="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        <span>目录 ({{ currentDoc.title }})</span>
      </button>

      <span class="text-xs text-slate-400 font-mono">帮助中心 · 用户指南</span>
    </div>

    <!-- 主布局：现代化无缝三栏式排版 (左侧目录 + 中间正文 + 右侧大纲) -->
    <div class="max-w-7xl mx-auto w-full flex flex-1">

      <!-- =========================================================================
           1. 左侧目录树 (Sidebar)
           ========================================================================= -->
      <aside class="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-0 h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar border-r border-slate-200/80 bg-slate-50/40 p-4 space-y-6">
        
        <!-- 搜索过滤框 -->
        <div class="relative">
          <svg class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="搜索使用指南与常见问题..." 
            class="w-full pl-9 pr-7 py-1.5 rounded-lg bg-white border border-slate-200/90 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all shadow-2xs"
          />
          <button 
            v-if="searchQuery" 
            @click="searchQuery = ''" 
            class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>

        <!-- 目录分组列表 (纯净专业排版，不使用任何 Emoji) -->
        <div v-for="section in filteredNavSections" :key="section.title" class="space-y-1.5">
          <div class="text-[11px] font-bold font-mono uppercase tracking-wider text-slate-400 px-2.5 flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span>{{ section.title }}</span>
          </div>

          <div class="space-y-0.5">
            <button
              v-for="item in section.items"
              :key="item.id"
              @click="selectDoc(item.id)"
              class="w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between cursor-pointer select-none"
              :class="currentDocId === item.id 
                ? 'bg-blue-50 text-blue-600 font-semibold' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'"
            >
              <span class="truncate">{{ item.title }}</span>
              <span v-if="item.badge" class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-100 text-blue-700 font-bold shrink-0 ml-1">
                {{ item.badge }}
              </span>
            </button>
          </div>
        </div>

      </aside>

      <!-- 移动端侧边栏抽屉 -->
      <Teleport to="body">
        <div v-if="mobileSidebarOpen" class="fixed inset-0 z-50 lg:hidden" @click.self="mobileSidebarOpen = false">
          <div class="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>
          <div class="absolute left-0 top-0 bottom-0 w-72 bg-white p-5 shadow-2xl overflow-y-auto space-y-5">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-blue-600"></span>
                <span class="text-sm font-bold text-slate-900">使用指南目录</span>
              </div>
              <button @click="mobileSidebarOpen = false" class="p-1 rounded text-slate-400 hover:text-slate-600 text-sm">✕</button>
            </div>
            
            <div class="relative">
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="搜索指南..." 
                class="w-full px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div v-for="section in filteredNavSections" :key="section.title" class="space-y-1.5">
              <div class="text-[11px] font-bold font-mono uppercase text-slate-400 px-2 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                <span>{{ section.title }}</span>
              </div>
              <div class="space-y-0.5">
                <button
                  v-for="item in section.items"
                  :key="item.id"
                  @click="selectDoc(item.id); mobileSidebarOpen = false"
                  class="w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all"
                  :class="currentDocId === item.id ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-100'"
                >
                  {{ item.title }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Teleport>

      <!-- =========================================================================
           2. 中间文档正文阅读区
           ========================================================================= -->
      <main class="flex-1 min-w-0 px-5 sm:px-10 lg:px-12 py-6 space-y-8 min-h-[calc(100vh-4rem)]">
        
        <!-- 面包屑导航 -->
        <div class="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <router-link to="/" class="hover:text-blue-600 transition-colors">HOME</router-link>
          <span>/</span>
          <span class="text-slate-500">HELP</span>
          <span>/</span>
          <span>{{ currentDoc.sectionTitle }}</span>
          <span>/</span>
          <span class="text-blue-600 font-semibold">{{ currentDoc.title }}</span>
        </div>

        <!-- 页面主标题与描述 -->
        <div class="border-b border-slate-100 pb-5 space-y-2">
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {{ currentDoc.title }}
          </h1>
          <p class="text-sm text-slate-500 leading-relaxed font-normal">
            {{ currentDoc.description }}
          </p>
        </div>

        <!-- 文档正文内容动态渲染 -->
        <div class="space-y-7 text-slate-700 leading-relaxed text-sm select-text">
          
          <div v-for="(block, idx) in currentDoc.blocks" :key="idx" class="space-y-3.5">
            
            <!-- H2 标题 -->
            <h2 v-if="block.type === 'h2'" :id="block.id" class="text-lg sm:text-xl font-bold text-slate-900 pt-5 border-t border-slate-100 flex items-center gap-2 scroll-mt-20">
              <span class="w-1 h-4 rounded-full bg-blue-600"></span>
              <span>{{ block.content }}</span>
            </h2>

            <!-- H3 标题 -->
            <h3 v-else-if="block.type === 'h3'" :id="block.id" class="text-base font-bold text-slate-800 pt-2 scroll-mt-20">
              {{ block.content }}
            </h3>

            <!-- 普通文本段落 -->
            <p v-else-if="block.type === 'p'" class="text-slate-600 leading-relaxed text-sm">
              {{ block.content }}
            </p>

            <!-- 步骤说明列表 (带有数字编号) -->
            <div v-else-if="block.type === 'steps'" class="space-y-3">
              <div v-for="(step, sIdx) in block.items" :key="sIdx" class="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 shadow-2xs">
                <div class="w-6 h-6 rounded-full bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-blue-600/20">
                  {{ sIdx + 1 }}
                </div>
                <div class="space-y-1">
                  <p class="font-bold text-slate-900 text-sm">{{ step.title }}</p>
                  <p class="text-slate-600 text-xs leading-relaxed">{{ step.desc }}</p>
                </div>
              </div>
            </div>

            <!-- Tip/Alert 提示卡片 -->
            <div v-else-if="block.type === 'tip'" class="p-4 rounded-xl bg-blue-50/80 border border-blue-200/80 text-xs text-blue-950 flex gap-3.5 items-start">
              <div class="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-xs font-bold font-mono shadow-xs">i</div>
              <div class="space-y-0.5">
                <p class="font-bold text-blue-900">{{ block.title || '操作技巧' }}</p>
                <p class="text-blue-800/90 leading-relaxed">{{ block.content }}</p>
              </div>
            </div>

            <!-- 代码/示例块 (带高亮与一键复制) -->
            <div v-else-if="block.type === 'code'" class="rounded-xl overflow-hidden border border-slate-800 bg-[#090d16] font-mono text-xs shadow-md">
              <div class="px-4 py-2 bg-[#0d1322] border-b border-slate-800 flex items-center justify-between text-slate-400 select-none">
                <span class="text-[11px] text-blue-400 font-bold uppercase">{{ block.lang }}</span>
                <button 
                  @click="copyCode(block.code, idx)" 
                  class="px-2.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                >
                  <span v-if="copiedIndex === idx" class="text-emerald-400 font-bold">已复制 ✓</span>
                  <span v-else>复制代码</span>
                </button>
              </div>
              <div class="p-4 overflow-x-auto custom-scrollbar text-slate-300 leading-5">
                <pre class="m-0"><code v-html="highlightCode(block.code, block.lang)"></code></pre>
              </div>
            </div>

            <!-- 参数对照/说明表 -->
            <div v-else-if="block.type === 'table'" class="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                    <th v-for="th in block.headers" :key="th" class="p-3.5 font-sans">{{ th }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr v-for="(row, rIdx) in block.rows" :key="rIdx" class="hover:bg-slate-50/60 transition-colors">
                    <td class="p-3.5 font-sans text-blue-600 font-bold whitespace-nowrap">{{ row[0] }}</td>
                    <td class="p-3.5 text-slate-700 font-medium whitespace-nowrap">{{ row[1] }}</td>
                    <td class="p-3.5 text-slate-500 text-xs">{{ row[2] }}</td>
                    <td class="p-3.5 text-slate-600 text-xs">{{ row[3] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

        </div>

        <!-- 底部上一页 / 下一页快捷导航卡片 -->
        <div class="pt-8 border-t border-slate-100 flex items-center justify-between gap-4">
          <button 
            v-if="prevDoc" 
            @click="selectDoc(prevDoc.id)" 
            class="flex flex-col items-start p-3.5 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all text-left group cursor-pointer max-w-[48%]"
          >
            <span class="text-[10px] text-slate-400 font-mono">← 上一篇</span>
            <span class="text-xs font-bold text-slate-800 group-hover:text-blue-600 truncate w-full">{{ prevDoc.title }}</span>
          </button>
          <div v-else></div>

          <button 
            v-if="nextDoc" 
            @click="selectDoc(nextDoc.id)" 
            class="flex flex-col items-end p-3.5 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all text-right group cursor-pointer max-w-[48%]"
          >
            <span class="text-[10px] text-slate-400 font-mono">下一篇 →</span>
            <span class="text-xs font-bold text-slate-800 group-hover:text-blue-600 truncate w-full">{{ nextDoc.title }}</span>
          </button>
        </div>

      </main>

      <!-- =========================================================================
           3. 右侧当前页面大纲 (TOC · On This Page)
           ========================================================================= -->
      <aside class="hidden xl:block w-56 shrink-0 sticky top-0 h-[calc(100vh-4rem)] overflow-y-auto pl-6 py-6 border-l border-slate-100 space-y-3">
        <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
          本页大纲
        </div>
        <nav class="space-y-1 text-xs">
          <button
            v-for="heading in currentHeadings"
            :key="heading.id"
            @click="scrollToHeading(heading.id)"
            class="w-full text-left py-1.5 px-2 rounded-md transition-all duration-200 truncate cursor-pointer select-none flex items-center gap-1.5"
            :class="[
              activeHeadingId === heading.id 
                ? 'bg-blue-50 text-blue-600 font-semibold border-l-2 border-blue-600 pl-2 shadow-2xs' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 border-l-2 border-transparent',
              heading.type === 'h3' ? 'pl-4 text-[11px]' : ''
            ]"
          >
            <span class="truncate">{{ heading.content }}</span>
          </button>
        </nav>
      </aside>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import 'highlight.js/styles/atom-one-dark.css'

hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('json', json)

const searchQuery = ref('')
const mobileSidebarOpen = ref(false)
const copiedIndex = ref<number | null>(null)
const currentDocId = ref('overview')

// 文档分类大纲导航
const docSections = [
  {
    title: '新手入门指南',
    items: [
      { id: 'overview', title: '平台功能总览', badge: '指南' },
      { id: 'api-key-setup', title: '配置与管理 API Key' },
      { id: 'quickstart-guide', title: '3分钟极速上手创作' }
    ]
  },
  {
    title: '核心功能使用手册',
    items: [
      { id: 'chat-guide', title: '智能对话 · 深度思考使用', badge: '核心' },
      { id: 'image-guide', title: '灵感画板 · AI 绘画指南' },
      { id: 'voice-guide', title: '智能语音 · 音频合成' },
      { id: 'prompt-guide', title: '提示词工程宝库' }
    ]
  },
  {
    title: '互动体验与推演',
    items: [
      { id: 'scenario-guide', title: '第13号列车 · 剧情推演' },
      { id: 'game-guide', title: '永恒之刃 · 游戏体验' }
    ]
  },
  {
    title: '帮助与排错',
    items: [
      { id: 'faq', title: '常见问题与排错 (FAQ)' },
      { id: 'feedback', title: '联系与技术交流' }
    ]
  }
]

// 详尽、全面、工业级的高质量文档正文内容
const docContents: Record<string, any> = {
  overview: {
    title: '平台功能总览',
    sectionTitle: '新手入门指南',
    description: '欢迎来到 MagicForge 多模态智能工坊！本平台深度整合大语言模型深度推理、图像生成、拟真语音与沉浸式推演剧情。',
    blocks: [
      { type: 'h2', id: 'what-is', content: '关于 MagicForge 智能工坊' },
      { type: 'p', content: 'MagicForge 是面向创作者与开发者的多模态 AI 生产力工坊。平台基于分布式推理集群与现代前端架构，为你提供从逻辑推理、视觉艺术创作到语音配音的一站式解决方案。无需繁琐的环境搭建，在浏览器中即可直接体验前沿 AI 的强大能力。' },
      { type: 'h2', id: 'matrix', content: '五大多模态核心功能' },
      { type: 'table', headers: ['功能模块', '核心模型 / 引擎', '主要特性', '典型应用场景'], rows: [
        ['智能对话 (Chat)', 'DeepSeek-R1 / V3', '思维链实时推演、多轮上下文记忆、Markdown 完美渲染与公式解析', '高等数学推导、代码调试、学术论文润色、商业策划'],
        ['灵感画板 (Image)', 'Flux / SD-3.5', '文生图渲染、负向提示词优化、多画幅比例切换与高清下载', '插画创作、概念设计、游戏原画、自媒体封面配图'],
        ['智能语音 (Audio)', 'CosyVoice-300M', '高保真拟真语音合成 (TTS)、多角色发音人音色、情感语气微调', '有声小说录制、短视频口播配音、虚拟角色旁白合成'],
        ['提示词工程 (Prompts)', 'Prompt Engine', '工业级分类提示词库、标签检索、一键复制与一键注入对话工坊', '提示词学习、工作流模版复用、系统级人设构建'],
        ['第13号列车 (Story)', 'Narrative State Engine', '悬疑科幻 AVG 互动推演、线索收集、多分支抉择与动态结局', '沉浸式叙事体验、剧本推演、AI 互动小说创作']
      ]},
      { type: 'h2', id: 'arch-design', content: '平台架构与性能亮点' },
      { type: 'p', content: '平台采用现代轻量化响应式架构，具备多项工业级优化：' },
      { type: 'steps', items: [
        { title: '极速流式打字机 (Server-Sent Events)', desc: '模型输出采用逐字流式协议分发，首字响应低于 50ms，带来丝滑流畅的交互打字机体验。' },
        { title: '多模态数据本地安全存储', desc: '用户的 API Key 与创作历史完全保存在浏览器本地 LocalStorage，不经中间服务器转存，隐私安全无忧。' },
        { title: '全终端响应式自适应', desc: '专为桌面端大屏、iPad 平板与移动端手机进行了深度排版适配，在任何设备上皆能舒适创作。' }
      ]}
    ]
  },
  'api-key-setup': {
    title: '配置与管理 API Key',
    sectionTitle: '新手入门指南',
    description: 'MagicForge 使用 SiliconFlow (硅基流动) 作为底层模型推理引擎。只需简单几步即可配置并开始免费创作。',
    blocks: [
      { type: 'h2', id: 'why-key', content: '为什么需要配置 API Key？' },
      { type: 'p', content: '为了让每位创作者拥有独立的算力通道与自定义模型参数权限，平台直连 SiliconFlow 官方推理集群。使用自己的 API Key 可以享受稳定的专属配额，避免公共通道拥堵。' },
      { type: 'h2', id: 'step-by-step', content: '三步获取与配置 API Key' },
      { type: 'steps', items: [
        { title: '步骤一：注册并登录平台', desc: '前往 SiliconFlow 官网 (cloud.siliconflow.cn)，使用手机号或邮箱完成注册登录。新用户通常获赠免费体验额度。' },
        { title: '步骤二：创建并复制专属密钥', desc: '在左侧菜单栏进入「API 密钥」，点击「新建 API 密钥」，输入名称后生成 sk-xxxxxxx 格式的密钥字符串，点击复制。' },
        { title: '步骤三：在 MagicForge 中保存', desc: '回到 MagicForge 页面，点击顶部右上角的「模型配置」或对话输入框下方的齿轮按钮，在弹出面板中粘贴密钥并点击保存。' }
      ]},
      { type: 'tip', title: '本地加密安全说明', content: 'MagicForge 严格遵守隐私保护准则：您的 API Key 将直接加密储存在当前浏览器的 LocalStorage 中，所有请求直接由浏览器向 SiliconFlow API 发起，绝不经过任何第三方服务器中转。' },
      { type: 'h2', id: 'verify', content: '验证连通性与常见报错' },
      { type: 'p', content: '保存后可在「模型配置」面板中点击「测试连接」。若提示「401 Unauthorized」，请检查密钥前后是否有空格，或确认账号额度是否正常。' }
    ]
  },
  'quickstart-guide': {
    title: '3分钟极速上手创作',
    sectionTitle: '新手入门指南',
    description: '跟随简单的实战演练，立即完成第一场涵盖对话推理、视觉插画与拟真语音的多模态创作体验。',
    blocks: [
      { type: 'h2', id: 'workflow-intro', content: '多模态端到端创作流' },
      { type: 'p', content: '通过 MagicForge，你可以将一个灵感概念贯穿到所有模块中，实现从文字构思到视听作品的完整转化。' },
      { type: 'h2', id: 'demo-walkthrough', content: '实战操作演示' },
      { type: 'steps', items: [
        { title: '第一步：用 DeepSeek-R1 构思故事设定', desc: '进入「产品 ∨ -> 智能对话」，开启「深度思考」，输入 Prompt：“请为我设计一个赛博朋克深海侦探的故事背景与主角人设”。查看 R1 的深度思考过程并获得细腻的世界观设定。' },
        { title: '第二步：在灵感画板中绘制主角插画', desc: '进入「产品 ∨ -> 灵感画板」，提取第一步中的主角外貌描述（如：穿长风衣的机械义眼侦探，雨夜霓虹街头，8k高清），选择 16:9 画幅，点击生成专属插画。' },
        { title: '第三步：用智能语音为旁白配音', desc: '进入「产品 ∨ -> 智能语音」，输入主角开场独白：“霓虹雨水顺着义眼流下，第13号车厢的钟声再次敲响...”，选择「沉稳故事男声」，生成高保真音频并试听下载。' }
      ]},
      { type: 'tip', title: '创作小贴士', content: '你可以将优质的 Prompt 保存或分享到「提示词工程」库中，供日后一键调取与复用！' }
    ]
  },
  'chat-guide': {
    title: '智能对话 · 深度思考使用',
    sectionTitle: '核心功能使用手册',
    description: '深入掌握 DeepSeek-R1 深度思考推理机制、对话参数调优技巧与多轮会话管理。',
    blocks: [
      { type: 'h2', id: 'r1-reasoning', content: 'DeepSeek-R1 深度思考原理解析' },
      { type: 'p', content: 'DeepSeek-R1 是新一代通过大规模强化学习训练的深度推理模型。与传统大语言模型直接输出答案不同，R1 在回答前会先开展多步自我求证、假设检验与逻辑纠错，从而大幅提升在数学、代码与复杂决策场景中的准确率。' },
      { type: 'h2', id: 'how-to-toggle', content: '如何开启与查看思维链？' },
      { type: 'p', content: '在智能对话输入框下方，勾选「深度思考 (DeepSeek-R1)」开关即可开启。AI 输出时将呈现一个带有淡蓝高光的「思考过程」气泡：' },
      { type: 'code', lang: 'typescript', code: `// R1 深度思考流式输出数据结构示例
interface ChatStreamChunk {
  // 思维链推理步骤（包含模型的自我质疑与多步推导）
  reasoning_content?: string;
  // 正式答案内容
  content?: string;
}` },
      { type: 'h2', id: 'params-guide', content: '对话控制核心参数对照表' },
      { type: 'table', headers: ['参数名称', '推荐范围', '作用机制', '适用业务场景'], rows: [
        ['温度 (Temperature)', '0.2 ~ 0.8', '控制输出结果的随机性与发散度。值越低越严谨确定，值越高越富有创意', '0.2 适用于代码编写与数学计算；0.7 适用于文案创作与头脑风暴'],
        ['最大令牌 (Max Tokens)', '1024 ~ 8192', '限制单次回复的最大 Token 上限，避免超出上下文窗口', '长篇论文大纲建议设为 4096，日常单问单答设为 2048'],
        ['系统人设 (System Prompt)', '自定义文本', '为 AI 注入专有职业角色定位与严格的行为规范规则', '学术顾问、资深前端架构师、悬疑小说家等角色设定']
      ]},
      { type: 'h2', id: 'features', content: '会话管理与快捷操作' },
      { type: 'p', content: '① 复制代码块：点击代码右上角的「复制」按钮；② 重新生成：对回答不满意可一键重新推演；③ 导出 Markdown：完整导出当前多轮会话记录。' }
    ]
  },
  'image-guide': {
    title: '灵感画板 · AI 绘画指南',
    sectionTitle: '核心功能使用手册',
    description: '掌握现代扩散模型提示词构建公式，熟练运用负向提示词与画幅参数创作惊艳视觉作品。',
    blocks: [
      { type: 'h2', id: 'diffusion-intro', content: 'AI 绘画原理与工作流' },
      { type: 'p', content: '灵感画板搭载领先的扩散模型（Stable Diffusion / Flux 系列），通过文本引导在纯高斯噪声中经过数十步迭代去噪，最终渲染出高清晰度、构图严谨的艺术画面。' },
      { type: 'h2', id: 'formula', content: '五维黄金 Prompt 编写公式' },
      { type: 'steps', items: [
        { title: '1. 画面主体 (Subject)', desc: '明确描绘核心对象。例如：a cyberpunk white cat with robotic wings, golden mechanical eyes.' },
        { title: '2. 场景与环境 (Environment)', desc: '交代空间与背景。例如：standing on the rooftop of a skyscraper in futuristic Tokyo, rain puddles.' },
        { title: '3. 艺术风格 (Art Style)', desc: '定义画风媒介。例如：concept art, anime style, oil painting, cinematic photo.' },
        { title: '4. 光影与色彩 (Lighting & Color)', desc: '渲染情绪氛围。例如：volumetric neon lighting, cinematic rim light, deep blue and orange palette.' },
        { title: '5. 画质修饰 (Quality Booster)', desc: '拉高细节精度。例如：8k resolution, highly detailed, Unreal Engine 5, masterpiece.' }
      ]},
      { type: 'h2', id: 'negative-prompts', content: '负向提示词 (Negative Prompt) 实战指南' },
      { type: 'p', content: '负向提示词是排除画面瑕疵的核心工具。系统已内置专业过滤库，你也可以自定义补充：' },
      { type: 'code', lang: 'bash', code: `# 常用通用负向词推荐清单：
blurry, low quality, distorted, extra limbs, bad anatomy, missing fingers, deformed, watermark, text, out of frame, pixelated` },
      { type: 'h2', id: 'aspect-ratios', content: '画布比例适用场景' },
      { type: 'table', headers: ['比例尺寸', '像素分辨率', '最佳用途'], rows: [
        ['1:1 正方形', '1024 x 1024', '头像、社交媒体方图、图标徽章设计'],
        ['16:9 宽屏', '1024 x 576', '壁纸背景、视频横版封面、电影概念镜头'],
        ['9:16 竖屏', '576 x 1024', '手机壁纸、短视频封面、人物全身立绘']
      ]}
    ]
  },
  'voice-guide': {
    title: '智能语音 · 音频合成',
    sectionTitle: '核心功能使用手册',
    description: '使用 CosyVoice 拟真语音引擎，将文字转化为富有情感韵律的自然人声。',
    blocks: [
      { type: 'h2', id: 'tts-intro', content: 'CosyVoice 语音合成核心特性' },
      { type: 'p', content: 'MagicForge 智能语音模块基于 CosyVoice 架构构建，具备高音质声学特征建模与自然语流韵律控制，能够精准还原人类说话时的细微停顿、重音起伏与情绪共鸣。' },
      { type: 'h2', id: 'tts-steps', content: '语音合成完整操作流程' },
      { type: 'steps', items: [
        { title: '第一步：准备文本内容', desc: '在输入框中粘贴待朗读文字。建议单次合成长度在 10~500 字之间，以获得最佳韵律表现。' },
        { title: '第二步：选择预设发音人', desc: '在音色列表中根据场景挑选：如「沉稳男声」适合新闻与故事讲述，「元气女声」适合解说与日常对话。' },
        { title: '第三步：试听与导出音频', desc: '点击「开始合成」，几秒内即可在内置播放器中即时试听，并支持一键下载标准 MP3 音频文件。' }
      ]},
      { type: 'h2', id: 'tts-tips', content: '利用标点符号调控说话停顿' },
      { type: 'tip', title: '韵律技巧', content: '语音引擎对标点符号极为敏感：使用逗号「，」可产生 0.3 秒自然轻停顿；使用省略号「……」或破折号「——」可制造情绪悬念与深呼吸效果。' }
    ]
  },
  'prompt-guide': {
    title: '提示词工程宝库',
    sectionTitle: '核心功能使用手册',
    description: '如何利用分类提示词库快速赋能日常工作，以及编写高质量 System Prompt 的工业级方法论。',
    blocks: [
      { type: 'h2', id: 'crispe-framework', content: '工业级 CRISPE 提示词框架' },
      { type: 'p', content: '想要让 AI 输出达到专业水准，推荐遵循业界成熟的 CRISPE 结构化构建方法：' },
      { type: 'steps', items: [
        { title: 'C (Capacity / 角色)', desc: '你是一名拥有 10 年经验的高级前端技术架构师。' },
        { title: 'R (Role / 人设)', desc: '精通 Vue 3 源码、TypeScript 类型系统与高性能渲染调优。' },
        { title: 'I (Insight / 背景)', desc: '我们正在重构一个高并发的多模态 Web 平台。' },
        { title: 'S (Statement / 任务)', desc: '请分析现有代码中的状态同步问题并提供重构方案。' },
        { title: 'P (Personality / 风格)', desc: '语言风格严谨专业，按条目罗列，附带可直接运行的代码示例。' },
        { title: 'E (Experiment / 示例)', desc: '例如输入某个错误示例时，请按 [原因分析] -> [修复代码] -> [防范建议] 呈现。' }
      ]},
      { type: 'h2', id: 'library-features', content: '提示词库实用功能' },
      { type: 'p', content: '进入「提示词工程」页面后，你可以：' },
      { type: 'steps', items: [
        { title: '多维度标签筛选', desc: '按「编程开发」、「学术科研」、「文案策划」、「角色扮演」即时过滤。' },
        { title: '一键载入对话工坊', desc: '点击卡片上的「立即使用」，系统将自动打开智能对话页面并填入该 Prompt，立即可用。' }
      ]}
    ]
  },
  'scenario-guide': {
    title: '第13号列车 · 剧情推演',
    sectionTitle: '互动体验与推演',
    description: '沉浸式科幻悬疑 AVG 互动推演。探索永夜列车的秘密，收集线索碎片并决定全车人的命运。',
    blocks: [
      { type: 'h2', id: 'story-worldview', content: '世界观与剧本背景' },
      { type: 'p', content: '在无尽行驶于永夜冰原的极光列车上，封闭了整整十年的第13号车厢突发异常震动。你作为持有特别调查令的研究员登车，在狭窄昏暗的车厢走廊中，与多位各怀心事的 NPC 展开智谋交锋与心理博弈。' },
      { type: 'h2', id: 'gameplay-rules', content: '互动推演核心机制' },
      { type: 'steps', items: [
        { title: '1. 分支抉择 (Branching Choices)', desc: '每一次对话选择都会记录在状态机中，影响 NPC 对你的信任度（Trust Value）。' },
        { title: '2. 线索碎片收集 (Clue Inventory)', desc: '在不同车厢调查可发现日志残页、磁卡与录音带，集齐线索可解锁隐藏质询选项。' },
        { title: '3. 多结局达成 (Multiple Endings)', desc: '故事包含【真相大白】、【永恒迷航】、【深渊协议】等多个正统与隐藏结局。' }
      ]},
      { type: 'tip', title: '体验建议', content: '推荐佩戴耳机游玩，沉浸式音效与打字机节奏将为你带来身临其境的视听小说体验。' }
    ]
  },
  'game-guide': {
    title: '永恒之刃 · 游戏体验',
    sectionTitle: '互动体验与推演',
    description: '探索 AI 驱动的动态战斗与数值对决引擎。',
    blocks: [
      { type: 'h2', id: 'game-intro', content: '游戏机制与战斗系统' },
      { type: 'p', content: '在「永恒之刃」中体验实时技能组合、属性克制与伤害结算。引擎采用事件驱动架构，支持角色状态动态计算与华丽视觉动效。' }
    ]
  },
  faq: {
    title: '常见问题与排错 (FAQ)',
    sectionTitle: '帮助与排错',
    description: '遇到问题？在此查找高频问题的排查与解决方法。',
    blocks: [
      { type: 'h2', id: 'faq-1', content: 'Q1：点击发送后提示「401 Unauthorized」怎么办？' },
      { type: 'p', content: '这表示你的 API Key 无效或未正确填写。请前往「模型配置」面板，检查填入的 SiliconFlow API Key 是否完整且无多余空格。同时确认在平台注册时是否已激活免费额度。' },
      { type: 'h2', id: 'faq-2', content: 'Q2：为什么生成有时候会变慢？' },
      { type: 'p', content: '深度思考模型（如 R1）在处理复杂问题时需要经过多轮反思推演；同时在高峰期由于算力节点负载较高可能会稍有延迟，建议稍候重试。' },
      { type: 'h2', id: 'faq-3', content: 'Q3：可以在手机端使用全部功能吗？' },
      { type: 'p', content: '可以！MagicForge 全站均已完成移动端响应式深度适配，在手机浏览器中打开可畅享对话、画板、语音与剧本推演全部能力。' },
      { type: 'h2', id: 'faq-4', content: 'Q4：生成的内容如何导出保存？' },
      { type: 'p', content: '对话内容支持一键复制 Markdown 源码；生成的插画支持直接点击「下载高清图」；语音合成支持直接下载为 MP3 音频文件。' }
    ]
  },
  feedback: {
    title: '联系与技术交流',
    sectionTitle: '帮助与排错',
    description: '欢迎提出功能建议、汇报 Bug 或与开发者社区交流互动。',
    blocks: [
      { type: 'h2', id: 'channels', content: '官方交流与支持渠道' },
      { type: 'p', content: '你可以通过以下官方渠道与我们取得联系：' },
      { type: 'steps', items: [
        { title: '官方技术博客', desc: '访问 CSDN 博客 (blog.csdn.net/nanchen_J) 查阅深度开发架构与大模型实战技术文章。' },
        { title: '微信技术交流群', desc: '在页脚点击「微信交流」扫码添加开发者微信 SouthernWind_J 申请加入交流群。' },
        { title: '开源代码仓库', desc: '访问 GitHub 仓库 (github.com/NanChen042/magicforge) 提交 Issue、提出 Pull Request 或点亮 Star 支持！' }
      ]}
    ]
  }
}

// 搜索过滤
const filteredNavSections = computed(() => {
  if (!searchQuery.value.trim()) return docSections
  const query = searchQuery.value.toLowerCase()
  return docSections
    .map(section => ({
      ...section,
      items: section.items.filter(item => 
        item.title.toLowerCase().includes(query) ||
        (docContents[item.id] && docContents[item.id].description.toLowerCase().includes(query))
      )
    }))
    .filter(section => section.items.length > 0)
})

const currentDoc = computed(() => {
  return docContents[currentDocId.value] || docContents['overview']
})

const currentHeadings = computed(() => {
  return currentDoc.value.blocks.filter((b: any) => b.type === 'h2' || b.type === 'h3')
})

const activeHeadingId = ref('')

watch(currentDocId, () => {
  nextTick(() => {
    activeHeadingId.value = currentHeadings.value[0]?.id || ''
  })
}, { immediate: true })

function scrollToHeading(id: string) {
  activeHeadingId.value = id
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// 扁平化所有文章以计算上一篇/下一篇
const allDocsList = computed(() => {
  const list: { id: string; title: string }[] = []
  docSections.forEach(sec => {
    sec.items.forEach(it => list.push(it))
  })
  return list
})

const currentIndex = computed(() => {
  return allDocsList.value.findIndex(d => d.id === currentDocId.value)
})

const prevDoc = computed(() => {
  if (currentIndex.value > 0) return allDocsList.value[currentIndex.value - 1]
  return null
})

const nextDoc = computed(() => {
  if (currentIndex.value < allDocsList.value.length - 1) return allDocsList.value[currentIndex.value + 1]
  return null
})

function selectDoc(id: string) {
  currentDocId.value = id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function highlightCode(code: string, lang: string) {
  try {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  } catch (e) {
    return code
  }
}

function copyCode(code: string, index: number) {
  navigator.clipboard.writeText(code)
  copiedIndex.value = index
  setTimeout(() => {
    if (copiedIndex.value === index) copiedIndex.value = null
  }, 2000)
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.4);
  border-radius: 4px;
}
</style>

<template>
  <!-- Modern High-End RPG Adventure Dashboard (Pure Vector SVGs & Optical Ambient Theme) -->
  <div 
    ref="containerRef"
    class="relative min-h-[calc(100vh-64px)] w-full bg-[#f8fafc] text-slate-800 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 font-sans select-none overflow-x-hidden flex flex-col justify-between"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >

    <!-- 1. 背景光能流体环境光 (Ambient Soft Aurora) -->
    <div class="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[85vw] max-w-5xl h-[400px] bg-gradient-to-b from-blue-100/30 via-sky-50/20 to-transparent rounded-full blur-3xl opacity-70"></div>
      <div class="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-100/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-100/20 rounded-full blur-[100px] pointer-events-none"></div>
    </div>

    <!-- 2. 顶部工坊导航栏 -->
    <header class="relative z-10 max-w-6xl w-full mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xs font-bold text-blue-600 tracking-wider font-mono uppercase">
            RPG NARRATIVE STUDIO
          </span>
          <span class="text-slate-300">|</span>
          <span class="text-xs text-slate-400 font-medium">动态分支与因果命运推演</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          交互叙事推演工坊
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">
          在多重世界线中做出你的抉择，由 DeepSeek 智能引擎实时推演因果命运与专属结局。
        </p>
      </div>

      <!-- 剧本工坊按钮 -->
      <button
        @click="showScriptWorkshop = true"
        class="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-all flex items-center gap-2 cursor-pointer shadow-xs self-start sm:self-center hover:border-blue-300 hover:shadow-md"
      >
        <svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
        <span>剧本工坊 / 导入自定义</span>
      </button>
    </header>

    <!-- 3. 主体内容区 -->
    <main class="relative z-10 max-w-6xl w-full mx-auto my-auto py-6 space-y-6">
      
      <!-- 剧本选择卡片群 (4 大世界线模组展台) -->
      <section class="space-y-3">
        <div class="flex items-center justify-between text-xs text-slate-600 px-1">
          <span class="tracking-wide flex items-center gap-2 font-bold font-mono">
            <span class="w-1 h-3.5 bg-blue-600 rounded-full"></span>
            <span>选择剧情世界线模组</span>
          </span>
          <span class="text-[11px] font-mono text-slate-400">
            共 {{ availableScripts.length }} 套推演剧本
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div
            v-for="(s, index) in availableScripts"
            :key="s.id"
            @click="selectedScriptId = s.id"
            class="group relative p-3.5 rounded-lg border transition-all duration-200 cursor-pointer select-none bg-white flex flex-col justify-between min-h-[105px]"
            :class="selectedScriptId === s.id 
              ? 'border-blue-600 bg-gradient-to-b from-blue-50/50 to-white shadow-xs border-l-4 border-l-blue-600' 
              : 'border-slate-200 hover:border-slate-300 text-slate-700'"
          >
            <!-- 顶部标题与标签 -->
            <div class="flex items-start justify-between gap-2 mb-1.5">
              <div class="flex items-center gap-2 min-w-0">
                <span 
                  class="font-mono text-xs font-bold px-1.5 py-0.5 rounded shrink-0"
                  :class="selectedScriptId === s.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'"
                >
                  0{{ index + 1 }}
                </span>
                <span class="font-bold text-xs tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                  {{ s.title.split('·')[0] }}
                </span>
              </div>
              <span 
                class="text-[10px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0"
                :class="selectedScriptId === s.id ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-500'"
              >
                {{ s.badge }}
              </span>
            </div>

            <!-- 故事悬念梗概 -->
            <p class="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
              {{ s.subtitle }}
            </p>
          </div>
        </div>
      </section>

      <!-- 激活剧本详情展台 (RPG Character & Worldview Dossier) -->
      <section class="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-900/5 space-y-6">
        
        <!-- 故事背景与世界观 -->
        <div class="space-y-3 border-b border-slate-100 pb-6">
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/80 text-xs font-mono font-bold">
              {{ currentScript.genre }}
            </span>
            <span class="text-xs text-slate-400 font-mono">剧情题材: {{ currentScript.tag }}</span>
          </div>

          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {{ currentScript.title }}
          </h2>

          <!-- 背景设定文案 (舒适呼吸感排版) -->
          <div class="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
            {{ currentScript.description }}
          </div>
        </div>

        <!-- 四维战术属性量化仪表 (Tactical Stat Telemetry - No Repetitive Boilerplate Icons) -->
        <div class="space-y-3">
          <div class="flex items-center justify-between text-xs text-slate-700 font-mono">
            <span class="font-bold tracking-wider uppercase text-blue-600">
              // 初始四维推演属性矩阵
            </span>
            <span class="text-slate-400 text-[11px]">属性将直接影响剧情分支判定概率</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div
              v-for="(attr, key, idx) in currentScript.attributeNames"
              :key="key"
              class="bg-slate-50 border border-slate-200/90 rounded-lg p-3 space-y-2 transition-all hover:bg-white hover:border-blue-400 hover:shadow-xs"
            >
              <!-- 属性名与段位 -->
              <div class="flex items-center justify-between">
                <span class="font-bold text-xs text-slate-900 font-mono">{{ attr.label }}</span>
                <span 
                  class="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
                  :class="idx === 0 ? 'bg-blue-100 text-blue-800' : idx === 1 ? 'bg-indigo-100 text-indigo-800' : idx === 2 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'"
                >
                  {{ idx === 0 ? '85 · 极意' : idx === 1 ? '78 · 洞悉' : idx === 2 ? '65 · 隐秘' : '92 · 极境' }}
                </span>
              </div>

              <!-- 微距战术属性量化进度条 -->
              <div class="w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden">
                <div 
                  class="h-full rounded-full transition-all duration-500"
                  :class="idx === 0 ? 'bg-blue-600 w-[85%]' : idx === 1 ? 'bg-indigo-600 w-[78%]' : idx === 2 ? 'bg-amber-500 w-[65%]' : 'bg-emerald-500 w-[92%]'"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 角色定制与特质选择器 -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-slate-100 items-start">
          
          <!-- 主角姓名定制 (5 cols) -->
          <div class="md:col-span-5 space-y-3">
            <div class="flex items-center justify-between">
              <label class="text-xs font-bold text-slate-800 tracking-wide font-mono uppercase">
                // 主角身份代号
              </label>
              <button
                type="button"
                @click="rollRandomName"
                class="text-xs text-blue-600 hover:text-blue-700 font-mono font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                title="随机生成专属角色名"
              >
                <svg class="w-3.5 h-3.5" :class="{ 'animate-spin': isRolling }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="23 4 23 10 17 10"></polyline>
                  <polyline points="1 20 1 14 7 14"></polyline>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                </svg>
                <span>掷骰随机代号</span>
              </button>
            </div>

            <!-- 战术终端输入框 -->
            <div class="relative flex items-center">
              <span class="absolute left-3.5 text-blue-600 font-mono font-bold text-sm pointer-events-none">&gt;</span>
              <input
                v-model="playerName"
                type="text"
                maxlength="16"
                class="w-full bg-slate-50 focus:bg-white text-slate-900 font-mono font-semibold text-sm py-3 pl-8 pr-4 rounded-lg border border-slate-200 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10 transition-all placeholder-slate-400"
                placeholder="输入角色姓名（如：代号·ZERO-07）"
                @keyup.enter="handleStartGame"
              />
            </div>
            
            <div class="bg-slate-50 p-3 rounded-lg border border-slate-200/70 text-xs text-slate-500 space-y-1 font-mono">
              <div class="flex items-center justify-between text-slate-700 font-bold text-[11px]">
                <span>状态: 身份待激活</span>
                <span class="text-blue-600">全因果分支加载就绪</span>
              </div>
              <p class="text-[11px] leading-relaxed text-slate-500 font-sans">
                AI 将在剧情推演中为该主角动态生成专属 NPC 对话、战斗判定与多重命运终局。
              </p>
            </div>
          </div>

          <!-- 初始命途特质选择器 (7 cols) - 告别千篇一律的星星图标与臃肿圆角 -->
          <div class="md:col-span-7 space-y-3">
            <label class="text-xs font-bold text-slate-800 tracking-wide font-mono uppercase block">
              // 初始命途流派 (选择 1 项专属特质)
            </label>

            <div class="space-y-2">
              <div
                v-for="(t, index) in currentScript.traits"
                :key="t.id"
                @click="selectedTraitId = t.id"
                class="p-3.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 bg-white"
                :class="selectedTraitId === t.id 
                  ? 'border-blue-500 bg-blue-50/40 text-slate-900 border-l-4 border-l-blue-600 shadow-xs' 
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'"
              >
                <div class="min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="font-bold text-xs text-slate-900">{{ t.name }}</span>
                    <span 
                      class="text-[10px] font-mono px-2 py-0.5 rounded font-bold"
                      :class="index === 0 ? 'bg-blue-100 text-blue-800' : index === 1 ? 'bg-indigo-100 text-indigo-800' : 'bg-emerald-100 text-emerald-800'"
                    >
                      {{ t.badge }}
                    </span>
                  </div>
                  <p class="text-xs text-slate-500 leading-relaxed">
                    {{ t.desc }}
                  </p>
                </div>

                <div 
                  class="w-5 h-5 rounded flex items-center justify-center text-xs font-bold shrink-0 transition-colors"
                  :class="selectedTraitId === t.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-transparent border border-slate-200'"
                >
                  ✓
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- 启动推演终极行动按钮 -->
        <div class="pt-4 border-t border-slate-100">
          <button
            @click="handleStartGame"
            :disabled="!playerName.trim()"
            class="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.99] text-white font-bold text-sm tracking-widest shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed group uppercase font-mono"
          >
            <span>[ ✦ 启动因果推演 · 踏入世界线 ➔ ]</span>
          </button>
        </div>

      </section>

    </main>

    <!-- 4. 底部 HUD -->
    <footer class="relative z-10 max-w-6xl w-full mx-auto flex items-center justify-between text-xs text-slate-400 font-mono pt-4 border-t border-slate-200/80">
      <div class="flex items-center gap-2">
        <span>全链路就绪 · 已连接 DeepSeek / SiliconFlow 推理引擎</span>
      </div>
      <span>MagicForge Platform v3.0</span>
    </footer>

    <!-- 剧本工坊弹窗 (JSON Script Importer) -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-150"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showScriptWorkshop"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          @click.self="showScriptWorkshop = false"
        >
          <div class="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl p-6 space-y-4 shadow-2xl text-slate-800 font-sans">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
                <svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span>剧本工坊 · 导入自定义 RPG 世界线</span>
              </h3>
              <button @click="showScriptWorkshop = false" class="text-slate-400 hover:text-slate-600 cursor-pointer text-lg">×</button>
            </div>
            
            <p class="text-xs text-slate-500">
              您可以粘贴符合规范的 JSON 剧本模组，快速装载自定义剧情与专属特质分支。
            </p>

            <textarea
              v-model="customScriptJson"
              rows="8"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 font-mono text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
              placeholder="在此粘贴剧本 JSON..."
            ></textarea>

            <div class="flex justify-end gap-3 pt-2">
              <button
                @click="showScriptWorkshop = false"
                class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                取消
              </button>
              <button
                @click="handleImportCustomScript"
                class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer shadow-sm"
              >
                验证并载入剧本
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { GAME_SCRIPTS, type GameScript } from '@/constants/gameScripts'
import { DeepseekService } from '@/services/deepseekService'

const emit = defineEmits<{
  (e: 'startGame', name: string, trait: string, scriptId: string): void
}>()

const availableScripts = ref<GameScript[]>([...GAME_SCRIPTS])
const selectedScriptId = ref<string>('lost_echo_zero')
const selectedTraitId = ref<string>('gaming')
const playerName = ref<string>('代号·ZERO-07')
const isRolling = ref<boolean>(false)
const showScriptWorkshop = ref<boolean>(false)
const customScriptJson = ref<string>('')

const currentScript = computed(() => {
  return availableScripts.value.find(s => s.id === selectedScriptId.value) || availableScripts.value[0]
})

// 随机角色名生成器
const rollRandomName = () => {
  isRolling.value = true
  setTimeout(() => { isRolling.value = false }, 350)

  if (selectedScriptId.value === 'lost_echo_zero') {
    const prefixes = ['代号·ZERO-', '观测者·', '执行官·', '幽灵·', '回声·']
    const nums = ['07', '09', '404', 'X', '99', 'Omega']
    playerName.value = prefixes[Math.floor(Math.random() * prefixes.length)] + nums[Math.floor(Math.random() * nums.length)]
  } else if (selectedScriptId.value === 'sword_master_gaokao') {
    const names = ['绝剑·萧炎', '狂风·凌空', '御剑·问天', '极意·无极', '暗裔·夜行']
    playerName.value = names[Math.floor(Math.random() * names.length)]
  } else {
    const cyberNames = ['夜客·零', 'V-701', '银翼·九', 'Matrix·Kai', '深潜·Ghost']
    playerName.value = cyberNames[Math.floor(Math.random() * cyberNames.length)]
  }
}

const handleStartGame = () => {
  if (!playerName.value.trim()) {
    alert('请输入角色代号或主角姓名')
    return
  }
  DeepseekService.setActiveScript(currentScript.value)
  emit('startGame', playerName.value.trim(), selectedTraitId.value, selectedScriptId.value)
}

const handleImportCustomScript = () => {
  if (!customScriptJson.value.trim()) {
    alert('请输入剧本 JSON 文本')
    return
  }
  try {
    const parsed = JSON.parse(customScriptJson.value.trim())
    if (!parsed.id || !parsed.title || !parsed.initialScene) {
      throw new Error('缺少必要字段: id, title, 或 initialScene')
    }
    availableScripts.value.unshift(parsed)
    selectedScriptId.value = parsed.id
    selectedTraitId.value = parsed.traits?.[0]?.id || 'gaming'
    showScriptWorkshop.value = false
    customScriptJson.value = ''
    alert(`成功载入自定义剧本《${parsed.title}》！`)
  } catch (err: any) {
    alert('JSON 格式错误: ' + (err.message || '请检查格式'))
  }
}
const handleMouseMove = () => {}
const handleMouseLeave = () => {}
</script>

<style scoped>
/* 叙事工坊专属样式 */
</style>
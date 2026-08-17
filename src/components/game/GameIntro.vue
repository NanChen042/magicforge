<template>
  <!-- Modern High-Precision RPG Interactive Narrative Studio (Clean Editorial Theme) -->
  <div 
    class="relative min-h-[calc(100vh-64px)] w-full bg-white text-zinc-800 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 font-sans select-none overflow-x-hidden flex flex-col justify-between"
  >


    <!-- 顶部工坊导航栏 -->
    <header class="relative z-30 max-w-5xl w-full mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200/90">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="px-2 py-0.5 rounded-xs bg-blue-50 text-blue-700 border border-blue-200/80 text-xs font-semibold tracking-wider uppercase">
            NARRATIVE STUDIO
          </span>
          <span class="text-xs text-zinc-400">多世界线因果分支推演</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
          交互叙事推演工坊
        </h1>
        <p class="text-xs sm:text-sm text-zinc-500 mt-0.5">
          选择剧情世界线并创建你的主角，由 DeepSeek 智能引擎推演专属于你的因果结局。
        </p>
      </div>

      <!-- 顶部操作栏 -->
      <div class="flex items-center gap-2 self-start sm:self-center">
        <!-- 剧本工坊按钮 -->
        <button
          @click="showScriptWorkshop = true"
          class="px-3 py-1.5 rounded-xs bg-white hover:bg-zinc-50 border border-zinc-200 text-xs font-semibold text-zinc-700 hover:text-blue-600 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs hover:border-blue-300"
        >
          <svg class="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
          <span>导入剧本</span>
        </button>

        <!-- 现代化模型选择器 (与智能对话 100% 一致) -->
        <ModelSelector
          :model-value="apiStore.modelName"
          placement="right"
          @update:model-value="apiStore.setModelName($event)"
        />
      </div>
    </header>

    <!-- 主体内容区 -->
    <main class="relative z-10 max-w-5xl w-full mx-auto my-auto py-5 space-y-5">
      
      <!-- 1. 剧本选择卡片群 (4 大世界线) -->
      <section class="space-y-2">
        <div class="flex items-center justify-between text-xs text-zinc-600 px-0.5">
          <span class="font-bold text-zinc-900 flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span>选择剧本世界线</span>
          </span>
          <span class="text-xs text-zinc-400 font-normal">
            共 {{ availableScripts.length }} 套剧本
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          <div
            v-for="(s, index) in availableScripts"
            :key="s.id"
            @click="handleSelectScript(s.id)"
            class="group relative p-3.5 rounded-xs border transition-all duration-150 cursor-pointer select-none bg-white flex flex-col justify-between gap-2 min-h-[100px] shadow-2xs"
            :class="selectedScriptId === s.id 
              ? 'border-blue-600 bg-blue-50/20 ring-1 ring-blue-600' 
              : 'border-zinc-200/90 hover:border-blue-300 hover:bg-slate-50/40 text-zinc-700'"
          >
            <!-- 顶部标题与标签 -->
            <div class="flex items-start justify-between gap-1.5">
              <div class="flex items-center gap-1.5 min-w-0">
                <span 
                  class="text-xs font-bold px-1.5 py-0.5 rounded-xs shrink-0 transition-colors tabular-nums"
                  :class="selectedScriptId === s.id ? 'bg-blue-600 text-white' : 'bg-zinc-50 text-zinc-700 border border-zinc-200/70'"
                >
                  0{{ index + 1 }}
                </span>
                <span class="font-bold text-xs tracking-tight text-zinc-900 group-hover:text-blue-600 transition-colors truncate">
                  {{ s.title.split('·')[0] }}
                </span>
              </div>
              <span 
                class="text-xs px-1.5 py-0.5 rounded-xs font-medium shrink-0"
                :class="selectedScriptId === s.id ? 'bg-blue-50 text-blue-700 border border-blue-200/80' : 'bg-zinc-50 text-zinc-600 border border-zinc-200/60'"
              >
                {{ s.badge }}
              </span>
            </div>

            <!-- 故事悬念梗概 -->
            <p class="text-xs text-zinc-500 line-clamp-2 leading-relaxed font-normal">
              {{ s.subtitle }}
            </p>
          </div>
        </div>
      </section>

      <!-- 2. 激活剧本背景与角色定制展台 -->
      <section class="bg-white border border-zinc-200/90 rounded-xs p-5 sm:p-6 shadow-2xs space-y-5">
        
        <!-- A. 故事背景与世界观梗概 -->
        <div class="space-y-2.5 border-b border-zinc-100 pb-4">
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-2 py-0.5 rounded-xs bg-blue-50 text-blue-700 border border-blue-200/80 text-xs font-semibold">
              {{ currentScript.genre }}
            </span>
            <span class="text-xs text-zinc-400">题材标签：{{ currentScript.tag }}</span>
          </div>

          <h2 class="text-lg sm:text-xl font-extrabold text-zinc-900 tracking-tight">
            {{ currentScript.title }}
          </h2>

          <!-- 背景设定文案 (清爽通透的引述排版，去除脏灰底色) -->
          <p class="text-xs sm:text-sm text-zinc-600 leading-relaxed text-justify font-normal pl-3.5 border-l-2 border-blue-500/50 py-1">
            {{ currentScript.description }}
          </p>
        </div>

        <!-- B. 角色设定与初始天赋倾向 (2 栏清晰布局) -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          
          <!-- 左栏 (5 cols): 角色名字 + 初始能力值预览 (与选择特质实时动态联动！) -->
          <div class="md:col-span-5 space-y-4">
            
            <!-- 姓名输入 -->
            <div class="space-y-1.5">
              <div class="flex items-center justify-between">
                <label class="text-xs font-bold text-zinc-900 tracking-wide">
                  主角姓名 / 代号
                </label>
                <button
                  type="button"
                  @click="rollRandomName"
                  class="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  title="随机生成专属角色名"
                >
                  <svg class="w-3.5 h-3.5" :class="{ 'animate-spin': isRolling }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <polyline points="1 20 1 14 7 14"></polyline>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                  </svg>
                  <span>随机起名</span>
                </button>
              </div>

              <input
                v-model="playerName"
                type="text"
                maxlength="16"
                class="w-full bg-white hover:border-zinc-300 text-zinc-900 font-bold text-sm py-2 px-3 rounded-xs border border-zinc-200 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all placeholder-zinc-400"
                placeholder="输入角色姓名（如：代号·ZERO-07）"
                @keyup.enter="handleStartGame"
              />
            </div>

            <!-- 初始能力倾向预览 (清爽纯白卡片，去除脏灰色块) -->
            <div class="bg-white p-3.5 rounded-xs border border-zinc-200/90 space-y-3 shadow-2xs">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-zinc-800">
                  初始能力倾向
                </span>
                <span class="text-xs text-zinc-400 font-normal">
                  基准 50 点 + 天赋加成
                </span>
              </div>

              <!-- 4 项属性动态展示 -->
              <div class="space-y-2.5">
                <div 
                  v-for="(attr, key) in currentScript.attributeNames" 
                  :key="key"
                  class="space-y-1"
                >
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-zinc-700 flex items-center gap-2 font-medium">
                      <span class="w-1.5 h-1.5 rounded-full shrink-0 shadow-2xs" :class="currentStatColors[key] || 'bg-blue-600'"></span>
                      <span>{{ attr.label }}</span>
                    </span>
                    <div class="flex items-center gap-1">
                      <span class="font-bold text-zinc-900 tabular-nums">{{ currentComputedStats[key] }} 点</span>
                      <span 
                        v-if="currentTraitBonus[key]" 
                        class="text-xs text-emerald-600 font-semibold tabular-nums"
                      >
                        (+{{ currentTraitBonus[key] }})
                      </span>
                    </div>
                  </div>

                  <!-- 进度条 -->
                  <div class="w-full h-1.5 bg-zinc-100 rounded-xs overflow-hidden">
                    <div 
                      class="h-full rounded-xs transition-all duration-300"
                      :class="currentStatColors[key] || 'bg-blue-600'"
                      :style="`width: ${currentComputedStats[key]}%`"
                    ></div>
                  </div>
                </div>
              </div>

              <p class="text-xs text-zinc-400 leading-relaxed pt-1.5 border-t border-zinc-100 font-normal">
                数值越高，后续剧情中遇到对应挑战时的成功率越高。
              </p>
            </div>

          </div>

          <!-- 右栏 (7 cols): 初始特质选择 (3 选 1) -->
          <div class="md:col-span-7 space-y-2">
            <div class="flex items-center justify-between">
              <label class="text-xs font-bold text-zinc-900 tracking-wide block">
                选择初始天赋倾向（3 选 1）
              </label>
              <span class="text-xs text-zinc-400 font-normal">决定主角擅长的应对方式</span>
            </div>

            <div class="space-y-2">
              <div
                v-for="t in currentScript.traits"
                :key="t.id"
                @click="selectedTraitId = t.id"
                class="p-3 rounded-xs border transition-all cursor-pointer flex items-start justify-between gap-3 bg-white shadow-2xs"
                :class="selectedTraitId === t.id 
                  ? 'border-blue-600 bg-blue-50/20 text-zinc-900 ring-1 ring-blue-600' 
                  : 'border-zinc-200/90 hover:border-blue-300 hover:bg-slate-50/30 text-zinc-700'"
              >
                <div class="min-w-0 space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-xs text-zinc-900">{{ t.name }}</span>
                    <span 
                      class="text-xs px-1.5 py-0.5 rounded-xs font-medium"
                      :class="selectedTraitId === t.id ? 'bg-blue-50 text-blue-700 border border-blue-200/80' : 'bg-zinc-50 text-zinc-600 border border-zinc-200/70'"
                    >
                      {{ t.badge }}
                    </span>
                    
                    <!-- 加成提示 -->
                    <span class="text-xs text-emerald-600 font-semibold tabular-nums">
                      {{ formatTraitBonus(t.bonus) }}
                    </span>
                  </div>
                  <p class="text-xs text-zinc-500 leading-relaxed font-normal">
                    {{ t.desc }}
                  </p>
                </div>

                <!-- 单选圈 -->
                <div 
                  class="w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors mt-0.5 border"
                  :class="selectedTraitId === t.id ? 'border-blue-600 bg-blue-600' : 'bg-white border-zinc-300'"
                >
                  <div v-if="selectedTraitId === t.id" class="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- 启动推演行动按钮 -->
        <div class="pt-3 border-t border-zinc-100">
          <button
            @click="handleStartGame"
            :disabled="!playerName.trim()"
            class="w-full py-3.5 px-6 rounded-xs bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm tracking-wide shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed group font-sans"
          >
            <span>开始推演 · 进入剧情</span>
            <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

      </section>

    </main>

    <!-- 底部状态 -->
    <footer class="relative z-10 max-w-5xl w-full mx-auto flex items-center justify-between text-xs text-zinc-400 font-sans pt-3 border-t border-zinc-200/90">
      <div class="flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        <span>推理引擎：<strong class="text-zinc-700 font-semibold">{{ currentActiveModelName }}</strong></span>
      </div>
      <span class="tabular-nums">MagicForge Studio v3.0</span>
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
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
          @click.self="showScriptWorkshop = false"
        >
          <div class="bg-white border border-zinc-200 rounded-xs w-full max-w-2xl p-5 space-y-4 shadow-xl text-zinc-800 font-sans">
            <div class="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 class="text-sm font-bold text-zinc-900 flex items-center gap-2">
                <svg class="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
                <span>导入自定义剧本 (JSON 结构)</span>
              </h3>
              <button @click="showScriptWorkshop = false" class="text-zinc-400 hover:text-zinc-600 text-xs font-semibold cursor-pointer">✕ 关闭</button>
            </div>
            
            <p class="text-xs text-zinc-500 leading-relaxed font-normal">
              你可以将按规范编写的 JSON 故事树粘贴在下方。导入后即可在上方世界线卡片中选中并开始推演。
            </p>

            <textarea
              v-model="customScriptJson"
              rows="9"
              placeholder="请在此粘贴符合 GameScript 结构的 JSON..."
              class="w-full bg-zinc-50 border border-zinc-200 rounded-xs p-3 font-mono text-xs text-zinc-800 focus:outline-none focus:border-blue-600 focus:bg-white"
            ></textarea>

            <div class="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100">
              <button
                @click="showScriptWorkshop = false"
                class="px-3.5 py-1.5 rounded-xs text-xs font-semibold text-zinc-600 hover:bg-zinc-100 cursor-pointer"
              >
                取消
              </button>
              <button
                @click="handleImportCustomScript"
                class="px-3.5 py-1.5 rounded-xs bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer shadow-2xs font-sans"
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
import { useApiStore } from '@/stores/api'
import { getModelConfig } from '@/constants/modelConfig'
import ModelSelector from '@/components/deepseek/ModelSelector.vue'

const emit = defineEmits<{
  (e: 'startGame', name: string, trait: string, scriptId: string): void
}>()

const apiStore = useApiStore()

const availableScripts = ref<GameScript[]>([...GAME_SCRIPTS])
const selectedScriptId = ref<string>('lost_echo_zero')
const selectedTraitId = ref<string>('gaming')
const playerName = ref<string>('代号·ZERO-07')
const isRolling = ref<boolean>(false)
const showScriptWorkshop = ref<boolean>(false)
const customScriptJson = ref<string>('')

const currentActiveModelName = computed(() => {
  const conf = getModelConfig(apiStore.modelName)
  return conf ? conf.name : (apiStore.modelName || '').split('/').pop() || '未选择模型'
})

const currentScript = computed(() => {
  return availableScripts.value.find(s => s.id === selectedScriptId.value) || availableScripts.value[0]
})

const handleSelectScript = (id: string) => {
  selectedScriptId.value = id
  const target = availableScripts.value.find(s => s.id === id)
  if (target && target.traits?.length > 0) {
    selectedTraitId.value = target.traits[0].id
  }
  rollRandomName()
}

// 选中特质的加成
const currentTrait = computed(() => {
  return currentScript.value.traits?.find(t => t.id === selectedTraitId.value) || currentScript.value.traits?.[0]
})

const currentTraitBonus = computed(() => {
  return currentTrait.value?.bonus || {}
})

// 计算初始属性（基准 50 点 + 特质加成）
const currentComputedStats = computed(() => {
  const bonus = currentTraitBonus.value as Record<string, number>
  return {
    gaming: 50 + (bonus.gaming || 0),
    study: 50 + (bonus.study || 0),
    social: 50 + (bonus.social || 0),
    other: 50 + (bonus.other || 0)
  }
})

const currentStatColors: Record<string, string> = {
  gaming: 'bg-blue-600',
  study: 'bg-cyan-600',
  social: 'bg-amber-500',
  other: 'bg-purple-600'
}

// 格式化加成展示文案
const formatTraitBonus = (bonus: Record<string, number | undefined>) => {
  const parts: string[] = []
  if (bonus.gaming) parts.push(`+${bonus.gaming} 行动`)
  if (bonus.study) parts.push(`+${bonus.study} 解析`)
  if (bonus.social) parts.push(`+${bonus.social} 关系`)
  if (bonus.other) parts.push(`+${bonus.other} 感知`)
  return parts.length > 0 ? parts.join(' / ') : '全属性均衡'
}

// 随机角色名生成器
const rollRandomName = () => {
  isRolling.value = true
  setTimeout(() => { isRolling.value = false }, 300)

  if (selectedScriptId.value === 'lost_echo_zero') {
    const prefixes = ['代号·ZERO-', '观测者·', '执行官·', '幽灵·', '回声·']
    const nums = ['07', '09', '404', 'X', '99', 'Omega']
    playerName.value = prefixes[Math.floor(Math.random() * prefixes.length)] + nums[Math.floor(Math.random() * nums.length)]
  } else if (selectedScriptId.value === 'sword_gaokao') {
    const names = ['最强剑魔·小明', '暗裔·萧凌', '狂风·凌空', '绝剑·问天', '极意·无极']
    playerName.value = names[Math.floor(Math.random() * names.length)]
  } else if (selectedScriptId.value === 'cyber_sword') {
    const cyberNames = ['林断·零式', '夜客·V-701', '银翼·九', '矩阵·Kai', '深潜·Ghost']
    playerName.value = cyberNames[Math.floor(Math.random() * cyberNames.length)]
  } else {
    const abyssNames = ['陆远·渡鸦', '调查员·Alpha', '特勤·卡特', '深潜者·03', '先知·零']
    playerName.value = abyssNames[Math.floor(Math.random() * abyssNames.length)]
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
</script>

<style scoped>
</style>

<template>
  <!-- 全屏容器 -->
<div class="relative w-screen h-screen overflow-hidden bg-slate-900 font-sans select-none" @click="handleGlobalClick">  
    
    <!-- 1. 背景层 (带淡入淡出过渡) -->
    <transition name="fade-slow">
      <div :key="currentSceneData?.bgImage || 'default-bg'" class="absolute inset-0 z-0">
        <!-- 图片背景 -->
        <img 
          v-if="currentSceneData?.bgImage" 
          :src="currentSceneData.bgImage" 
          class="w-full h-full object-cover opacity-60 scale-105 animate-slow-pan"
          alt="Background"
        />
        <!-- 默认深色渐变 -->
        <div v-else class="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950"></div>
        <!-- 统一遮罩，保证文字可读性 -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>
      </div>
    </transition>

    <!-- 2. 重启特效层 (闪白/故障) -->
    <transition name="flash">
      <div v-if="isResetting" class="absolute inset-0 z-[100] bg-white pointer-events-none"></div>
    </transition>

    <!-- 3. HUD 顶部状态栏 -->
    <div class="absolute top-0 left-0 w-full z-20 p-6 flex justify-between items-start pointer-events-none">
      <!-- 左上角：章节信息 -->
      <div class="flex flex-col gap-1 animate-fade-in-down">
        <div class="flex items-center gap-2">
          <div class="w-1.5 h-6 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]"></div>
          <h1 class="text-2xl font-bold text-white tracking-widest uppercase drop-shadow-md">第13号列车</h1>
        </div>
        <div class="flex items-center gap-2 text-xs text-amber-200/60 font-mono tracking-widest pl-3.5">
          <span>LOOP: {{ loopCount }}</span>
          <span>|</span>
          <span>SCENE: {{ currentSceneId }}</span>
        </div>
      </div>

      <!-- 右上角：碎片收集 -->
      <div class="flex gap-3 pointer-events-auto">
        <el-tooltip 
          v-for="frag in allFragments" 
          :key="frag.id"
          :content="hasFragment(frag.id) ? frag.name : '未解锁'"
          placement="bottom"
          effect="dark"
        >
          <div 
            class="relative flex items-center justify-center w-10 h-10 rounded-lg border backdrop-blur-md transition-all duration-500"
            :class="hasFragment(frag.id) 
              ? 'border-amber-400/50 bg-amber-500/10 shadow-[0_0_15px_rgba(251,191,36,0.2)]' 
              : 'border-white/10 bg-black/20 grayscale'"
          >
            <component :is="hasFragment(frag.id) ? 'Key' : 'Lock'" class="w-4 h-4 text-amber-100" />
          </div>
        </el-tooltip>
      </div>
    </div>

    <!-- 4. 主舞台 (立绘与对话) -->
<div class="absolute inset-0 z-10 flex flex-col justify-end pb-8 md:pb-12 px-4 md:px-20 lg:px-40 pointer-events-none">
      
      <!-- 人物立绘区 (Character Layer) -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <transition name="slide-fade">
          <div v-if="currentSceneData?.character" class="absolute bottom-0 right-0 md:right-[10%] h-[70vh] md:h-[85vh] w-auto drop-shadow-2xl filter brightness-90 contrast-110">
             <!-- 这里使用了 DiceBear API 作为占位，实际项目替换为你的 PNG 图片 -->
             <img 
               :src="getCharacterImage(currentSceneData.character)" 
               class="h-full w-auto object-contain animate-float" 
               alt="Character"
             />
          </div>
        </transition>
      </div>

      <!-- 对话框容器 -->
    <div class="relative w-full max-w-5xl mx-auto z-30 pointer-events-auto">
        
        <!-- 名字条 (Name Tag) -->
        <transition name="fade">
          <div v-if="currentSceneData?.speaker" class="absolute -top-10 left-0 md:left-4 z-40">
            <div class="px-6 py-2 bg-slate-900/90 border-l-4 border-amber-500 text-white font-bold tracking-widest text-lg shadow-lg skew-x-[-10deg]">
              <span class="skew-x-[10deg] inline-block">{{ currentSceneData.speaker }}</span>
            </div>
          </div>
        </transition>

        <!-- 对话框本体 -->
        <div 
          class="relative bg-gradient-to-b from-slate-900/90 to-slate-950/95 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-tr-3xl rounded-bl-3xl shadow-2xl transition-all duration-300 min-h-[180px] flex flex-col justify-between group active:scale-[0.99]"
          :class="{ 'cursor-pointer hover:border-amber-500/30': canClickNext }"
          @click.stop="handleBoxClick"
        >
          <!-- 装饰线 -->
          <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          <!-- 剧情文本 -->
          <div class="text-lg md:text-xl text-slate-200 leading-relaxed font-medium tracking-wide font-sans text-shadow-sm min-h-[80px]">
            <span v-html="displayedText"></span>
            <span v-if="isTyping" class="inline-block w-2 h-5 ml-1 bg-amber-400 animate-pulse align-middle shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span>
          </div>

          <!-- 下一步提示 (仅在线性剧情且打字结束时显示) -->
         <div v-if="canClickNext" class="absolute bottom-4 right-6 flex items-center gap-2 animate-bounce text-amber-400/80">
            <span class="text-xs font-mono tracking-widest uppercase opacity-70">Click to Continue</span>
            <el-icon class="text-2xl"><CaretBottom /></el-icon>
          </div>
        </div>

        <!-- 5. 选项面板 (悬浮在对话框上方) -->
       <transition name="slide-up-fade">
          <!-- 只有当不是线性剧情时，才显示选项按钮 -->
          <div v-if="!isTyping && !isLinearScene && currentOptions.length > 0" class="absolute bottom-[105%] left-0 w-full flex flex-col items-center gap-3 z-50">
            <button 
              v-for="(opt, index) in currentOptions" 
              :key="index"
              class="relative w-full md:w-3/4 max-w-2xl group overflow-hidden transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              :disabled="opt.locked"
              @click.stop="handleSelect(opt)"
            >
              <!-- 按钮背景 -->
              <div 
                class="absolute inset-0 border transition-all duration-300"
                :class="opt.locked 
                  ? 'bg-slate-800/80 border-slate-700' 
                  : 'bg-black/60 backdrop-blur-md border-amber-500/30 group-hover:bg-amber-600/90 group-hover:border-amber-400'"
              ></div>
              
              <!-- 按钮内容 -->
              <div class="relative px-6 py-4 flex items-center justify-between text-left">
                <span 
                  class="text-base md:text-lg font-medium tracking-wider transition-colors duration-300 flex items-center gap-3"
                  :class="opt.locked ? 'text-slate-500' : 'text-slate-100 group-hover:text-white'"
                >
                  <span class="text-xs opacity-50 font-mono border border-current px-1.5 rounded">0{{ index + 1 }}</span>
                  {{ opt.text }}
                </span>
                
                <!-- 锁定状态 -->
                <span v-if="opt.locked" class="flex items-center text-xs text-red-400 gap-1 bg-black/40 px-2 py-1 rounded border border-red-900/50">
                  <el-icon><Lock /></el-icon> 需: {{ getFragmentName(opt.reqFragment) }}
                </span>
                
                <!-- 箭头 (Hover) -->
                <span v-else class="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white">
                  <el-icon><Right /></el-icon>
                </span>
              </div>
            </button>
          </div>
        </transition>

        <!-- 结局 - 重启按钮 -->
        <transition name="zoom-in">
          <div v-if="currentSceneData?.isEnding && !isTyping" class="absolute bottom-[130%] w-full flex flex-col items-center gap-4 z-50">
            <div class="text-6xl animate-pulse">
               {{ isBadEnding ? '💀' : '🔓' }}
            </div>
            <button 
              @click.stop="restartGame"
              class="px-12 py-4 bg-red-600 hover:bg-red-500 text-white font-bold tracking-[0.2em] text-lg uppercase rounded shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all transform hover:scale-105 hover:rotate-1 flex items-center gap-3 border border-red-400"
            >
              <el-icon class="animate-spin-slow"><Refresh /></el-icon> 
              Reboot System
            </button>
          </div>
        </transition>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Key, Lock, CaretBottom, Right, Refresh } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// --- 类型定义 ---
interface Fragment { id: string; name: string; }
interface Option { text: string; nextSceneId: string; reqFragment?: string; locked?: boolean; }
interface Scene {
  id: string;
  text: string;
  speaker?: string; // 发言者
  character?: string; // 立绘 ID (protagonist, lin, oldman...)
  bgImage?: string; // 背景图 URL
  options: Option[];
  unlockFragment?: Fragment;
  isEnding?: boolean;
}

// --- 静态资源映射 (模拟立绘) ---
const getCharacterImage = (charId: string) => {
  const map: Record<string, string> = {
    'lin': 'https://api.dicebear.com/7.x/micah/svg?seed=Lin&backgroundColor=b6e3f4', // 少女
    'protagonist': 'https://api.dicebear.com/7.x/micah/svg?seed=Felix&backgroundColor=ffdfbf', // 主角
    'oldman': 'https://api.dicebear.com/7.x/micah/svg?seed=Grandpa&backgroundColor=c0aede', // 老头
    'boss': 'https://api.dicebear.com/7.x/bottts/svg?seed=Boss&backgroundColor=ff0000' // 机械BOSS
  }
  return map[charId] || ''
}

// --- 游戏数据 (你的剧本) ---
const allFragments: Fragment[] = [
  { id: 'frag_01', name: '神秘代码' },
  { id: 'frag_02', name: '红衣少女的暗示' },
  { id: 'frag_03', name: '乘务长的徽章' },
  { id: 'frag_04', name: '病毒源代码' }
];

const scriptData: Record<string, Scene> = {
  'start_01': {
    id: 'start_01',
    text: "尖锐的刹车声把你硬生生拽醒，冷汗把衬衫贴在背上。<br>睁眼一看，满车厢霓虹乱闪，空气一股子烧电路板的焦味……<br>你又回到这趟鬼列车了。",
    speaker: "旁白",
    bgImage: "https://images.unsplash.com/photo-1517639493569-5666a7488662?q=80&w=2070&auto=format&fit=crop",
    options: [{ text: "我这是第几次醒了……", nextSceneId: "start_02" }]
  },
  'start_02': {
    id: 'start_02',
    text: "「欢迎乘坐K-13次列车，本次列车终点站——地狱。倒计时15分钟，请享受旅程。」<br>甜得发腻的女声广播又准时响起。",
    speaker: "电子广播",
    bgImage: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?q=80&w=2070&auto=format&fit=crop",
    options: [
      { text: "低头摸口袋（老规矩）", nextSceneId: "scene_investigate" },
      { text: "跳起来大喊“要炸了！”", nextSceneId: "end_death_guard" },
      { text: "四处看有没有奇怪的人", nextSceneId: "scene_meet_lin" },
      { text: "直接往后车厢冲", nextSceneId: "scene_explore_cars", reqFragment: 'frag_04' } // 增加一点难度，比如需要代码才能开门，或者改为 locked: false
    ]
  },
  'scene_investigate': {
    id: 'scene_investigate',
    text: "你把手伸进上衣内兜，果然又摸到那张皱巴巴的纸条。<br>右眼义眼一闪：<span class='text-amber-400 font-bold'>【神秘代码】已收集！</span>",
    speaker: "阿哲",
    character: "protagonist",
    unlockFragment: { id: 'frag_01', name: '神秘代码' },
    options: [
      { text: "看纸条写的是啥", nextSceneId: "scene_paper_content" },
      { text: "直接弯腰看座位底下", nextSceneId: "scene_seat_check" }
    ]
  },
  'scene_paper_content': {
    id: 'scene_paper_content',
    text: "纸条上只有一行字：<span class='text-red-500 font-mono text-xl'>ERROR: 404_LIN</span><br>义眼同时扫到座位底下有微弱信号，像藏了个小设备。",
    speaker: "系统提示",
    options: [
      { text: "伸手去掏（找死模式）", nextSceneId: "scene_bomb_check" },
      { text: "问问旁边大爷", nextSceneId: "scene_ask_passenger" },
      { text: "算了先不想了", nextSceneId: "start_02" }
    ]
  },
  'scene_ask_passenger': {
    id: 'scene_ask_passenger',
    text: "你小声问旁边老头：“大爷，乘务长的徽章在哪？”<br>老头眼珠子全是雪花屏，塞给你一枚冰冷的金属徽章：<br>“别让那丫头骗了你……”",
    speaker: "神秘老头",
    character: "oldman",
    unlockFragment: { id: 'frag_03', name: '乘务长的徽章' },
    options: [
      { text: "拿了徽章就跑路", nextSceneId: "start_02" },
      { text: "还想再问两句", nextSceneId: "end_death_suspicion" }
    ]
  },
  // ... (由于篇幅限制，这里只展示核心修复逻辑，其他场景数据保持你提供的即可)
  'end_death_guard': {
    id: 'end_death_guard',
    text: "乘务长手臂变刀：“异常数据，格式化。”<br>咔嚓。<br>你没了。",
    speaker: "乘务长",
    character: "boss",
    isEnding: true,
    options: []
  },
  'scene_seat_check': { 
    id: 'scene_seat_check', 
    text: "你弯腰一看，果然有个闪烁的小终端，屏幕上写着「需要授权码」。", 
    speaker: "旁白", 
    bgImage: "https://images.unsplash.com/photo-1504198266287-1659872e6590?q=80&w=2070&auto=format&fit=crop", 
    options: [ 
      { text: "用纸条上的代码试试", nextSceneId: "scene_hack_terminal", reqFragment: 'frag_01' }, 
      { text: "不敢碰，回去", nextSceneId: "start_02" } 
    ] 
  },
  'scene_hack_terminal': {
    id: 'scene_hack_terminal',
    text: "代码输进去，屏幕一亮：<br>「列车本身就是病毒，爆炸只是清理机制。」<br>一大堆数据疯狂往下刷，你手速起飞全下载了！",
    speaker: "系统提示",
    unlockFragment: { id: 'frag_04', name: '病毒源代码' },
    options: [
      { text: "下载完成！", nextSceneId: "scene_download_success" }
    ]
  },
  'scene_download_success': {
    id: 'scene_download_success',
    text: "义眼提示：【病毒源代码】已收集！<br>老子现在有底气了！",
    speaker: "阿哲",
    character: "protagonist",
    options: [{ text: "去后车厢继续找线索", nextSceneId: "start_02" }] // 简化循环回退演示
  },
  'scene_meet_lin': {
    id: 'scene_meet_lin',
    text: "一个穿红衣服的短发少女突然拉住你，小声说：<br>“嘘，别出声，跟我来，我知道怎么活下去。”",
    speaker: "林",
    character: "lin",
    unlockFragment: { id: 'frag_02', name: '红衣少女的暗示' },
    options: [
      { text: "跟她走", nextSceneId: "end_true" }, // 简化演示直接跳转结局
      { text: "你谁啊？！", nextSceneId: "end_death_guard" }
    ]
  },
  'scene_bomb_check': {
    id: 'scene_bomb_check',
    text: "你手贱碰了装置。轰！全车升天。<br>第100次循环，启动！",
    isEnding: true,
    options: []
  },
  'end_death_suspicion': {
    id: 'end_death_suspicion',
    text: "老头突然变脸按警报。乘务长秒到：“知道太多的人，都得死。”<br>寄。",
    isEnding: true,
    options: []
  },
  'end_true': {
    id: 'end_true',
    text: "System Reboot... Success.<br>Welcome back, Administrator.",
    bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    isEnding: true,
    options: []
  }
};

// --- 状态管理 ---
const currentSceneId = ref('start_01')
const displayedText = ref('')
const isTyping = ref(false)
const isResetting = ref(false)
const userFragments = ref<Set<string>>(new Set())
const loopCount = ref(1)

const currentSceneData = computed(() => scriptData[currentSceneId.value])


// 计算当前场景是否是“线性”的（只有一个选项，且不是结局）
const isLinearScene = computed(() => {
  if (!currentSceneData.value) return false
  const opts = currentSceneData.value.options
  // 条件：不是结局 且 只有一个选项 且 该选项没有被锁定
  if (currentSceneData.value.isEnding) return false
  if (opts.length !== 1) return false
  
  // 检查这唯一的选项是否被锁定
  const soleOption = opts[0]
  if (soleOption.reqFragment && !userFragments.value.has(soleOption.reqFragment)) {
    return false // 如果唯一的选项被锁定了，也不能算线性（虽然这种情况很少见）
  }
  
  return true
})
// ★★★ 新增：判断当前是否可以点击下一步 ★★★
const canClickNext = computed(() => {
  return !isTyping.value && isLinearScene.value
})

// 计算是否为坏结局 (用于显示不同图标)
const isBadEnding = computed(() => {
  const text = currentSceneData.value?.text || ''
  return text.includes('寄') || text.includes('死') || text.includes('轰')
})

const currentOptions = computed(() => {
  if (!currentSceneData.value) return []
  
  return currentSceneData.value.options.map(opt => ({
    ...opt,
    locked: opt.reqFragment ? !userFragments.value.has(opt.reqFragment) : false
  }))
})

// --- 逻辑方法 ---
const getFragmentName = (id?: string) => allFragments.find(f => f.id === id)?.name || '未知碎片'
const hasFragment = (id: string) => userFragments.value.has(id)
// 1. 全局点击（处理背景点击）
const handleGlobalClick = () => {
  handleBoxClick()
}

// 2. 对话框点击（核心逻辑）
const handleBoxClick = () => {
  // 情况A：正在打字 -> 瞬间显示全文
  if (isTyping.value) {
    finishTyping()
    return
  }

  // 情况B：打字结束 且 是线性剧情 -> 进入下一场景
  if (isLinearScene.value) {
    const nextId = currentSceneData.value!.options[0].nextSceneId
    loadScene(nextId)
  }
  
  // 情况C：打字结束 但 有多个分支选项 -> 不做动作，等待用户点击具体按钮
}

// 打字机逻辑 (支持点击加速)
let typeInterval: any = null
const fullText = ref('')


const typeWriter = async (text: string) => {
  isTyping.value = true
  displayedText.value = ''
  fullText.value = text 
  let i = 0
  const speed = 40 

  return new Promise<void>((resolve) => {
    if (typeInterval) clearInterval(typeInterval)
    typeInterval = setInterval(() => {
      if (i < text.length) {
        if (text[i] === '<') {
          const tagEnd = text.indexOf('>', i)
          if (tagEnd !== -1) {
            displayedText.value += text.substring(i, tagEnd + 1)
            i = tagEnd + 1
          }
        } else {
          displayedText.value += text[i]
          i++
        }
      } else {
        finishTyping(resolve)
      }
    }, speed)
  })
}

const finishTyping = (resolve?: () => void) => {
  if (typeInterval) clearInterval(typeInterval)
  displayedText.value = fullText.value
  isTyping.value = false
  if (resolve) resolve()
}

// 屏幕点击处理
const handleScreenClick = () => {
  // 1. 如果正在打字，点击瞬间显示全文
  if (isTyping) {
    finishTyping()
    return
  }

  // 2. 如果是线性剧情（只有一个选项），点击屏幕进入下一段
  if (isLinearScene.value) {
    const nextId = currentSceneData.value!.options[0].nextSceneId
    loadScene(nextId)
  }
}

const loadScene = async (sceneId: string) => {
  const scene = scriptData[sceneId]
  if (!scene) return

  currentSceneId.value = sceneId
  
  // 解锁碎片逻辑
  if (scene.unlockFragment && !userFragments.value.has(scene.unlockFragment.id)) {
    userFragments.value.add(scene.unlockFragment.id)
    ElMessage.success({
      message: `获得记忆碎片: [${scene.unlockFragment.name}]`,
      type: 'success',
      duration: 3000,
      offset: 100
    })
  }

  await typeWriter(scene.text)
}

const handleSelect = (option: Option) => {
  if (option.locked) return
  loadScene(option.nextSceneId)
}

const restartGame = () => {
  isResetting.value = true // 触发白屏闪光
  loopCount.value++
  
  setTimeout(() => {
    displayedText.value = ''
    loadScene('start_01')
    isResetting.value = false
  }, 800) // 配合动画时长
}

onMounted(() => {
  loadScene('start_01')
})
</script>

<style scoped>
/* 背景缓慢移动效果 */
.animate-slow-pan {
  animation: pan 20s infinite alternate ease-in-out;
}
@keyframes pan {
  0% { transform: scale(1.05) translate(0, 0); }
  100% { transform: scale(1.15) translate(-1%, -1%); }
}

/* 浮动动画 (立绘) */
.animate-float {
  animation: float 6s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* 简单的淡入 */
.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out;
}
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Vue Transitions */
/* 1. 背景淡入淡出 (慢) */
.fade-slow-enter-active, .fade-slow-leave-active { transition: opacity 1.5s ease; }
.fade-slow-enter-from, .fade-slow-leave-to { opacity: 0; }

/* 2. 重启白屏闪光 */
.flash-enter-active, .flash-leave-active { transition: opacity 0.5s ease-out; }
.flash-enter-from, .flash-leave-to { opacity: 0; }

/* 3. 选项面板上滑 */
.slide-up-fade-enter-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-up-fade-leave-active { transition: all 0.2s ease-in; }
.slide-up-fade-enter-from { opacity: 0; transform: translateY(20px); }
.slide-up-fade-leave-to { opacity: 0; transform: translateY(10px); }

/* 4. 立绘侧滑淡入 */
.slide-fade-enter-active, .slide-fade-leave-active { transition: all 0.6s ease; }
.slide-fade-enter-from, .slide-fade-leave-to { opacity: 0; transform: translateX(20px); }

/* 5. 通用淡入 */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* 6. 结局按钮放大 */
.zoom-in-enter-active { transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.zoom-in-enter-from { opacity: 0; transform: scale(0.5); }

/* 文字阴影增强可读性 */
.text-shadow-sm {
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}
</style>

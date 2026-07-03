<template>
  <!-- 游戏封面（未开始时显示） -->
  <div v-if="!gameStarted" class="relative w-full h-screen overflow-hidden bg-slate-900 font-sans">
    <!-- 背景 -->
    <div class="absolute inset-0">
      <img 
        src="../assets/fengmian.png" 
        class="w-full h-full object-cover opacity-40"
        alt="Background"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
    </div>

    <!-- 封面内容 -->
    <div class="relative z-10 h-full flex flex-col items-center justify-center px-6">
      <!-- 标题 -->
      <div class="text-center mb-12 animate-fade-in-down">
        <div class="text-amber-400 text-sm font-mono tracking-[0.5em] mb-4">INTERACTIVE FICTION</div>
        <h1 class="text-5xl md:text-7xl font-bold text-white tracking-wider mb-4">
          第<span class="text-amber-400">13</span>号列车
        </h1>
        <p class="text-slate-400 text-lg max-w-md mx-auto">
          近地轨道实验舱 · 时间循环 · 赛博朋克悬疑
        </p>
      </div>

      <!-- 配置面板 -->
      <div class="w-full max-w-md space-y-6 bg-slate-900/80 backdrop-blur-xl rounded-md p-6 border border-white/10">
        <!-- 模式选择 -->
        <div>
          <div class="text-sm font-medium text-slate-400 mb-3">游戏模式</div>
          <div class="grid grid-cols-2 gap-3">
            <button 
              @click="enableAI = true"
              class="p-4 rounded-sm border-2 transition-all text-left"
              :class="enableAI 
                ? 'border-emerald-500 bg-emerald-500/10' 
                : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'"
            >
              <div class="w-8 h-8 mb-2 rounded-sm bg-emerald-500/20 flex items-center justify-center">
                <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div class="font-bold text-white">AI 动态</div>
              <div class="text-xs text-slate-400 mt-1">AI 生成场景描述</div>
            </button>
            <button 
              @click="enableAI = false"
              class="p-4 rounded-sm border-2 transition-all text-left"
              :class="!enableAI 
                ? 'border-blue-500 bg-blue-500/10' 
                : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'"
            >
              <div class="w-8 h-8 mb-2 rounded-sm bg-blue-500/20 flex items-center justify-center">
                <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <div class="font-bold text-white">静态模式</div>
              <div class="text-xs text-slate-400 mt-1">预设剧本，无需 API</div>
            </button>
          </div>
        </div>

        <!-- AI 模型选择 -->
        <div v-if="enableAI">
          <div class="text-sm font-medium text-slate-400 mb-3">AI 模型</div>
          <el-select 
            v-model="selectedModel" 
            placeholder="选择模型" 
            class="w-full"
            size="large"
          >
            <el-option 
              v-for="model in fastModels" 
              :key="model.id" 
              :label="model.name" 
              :value="model.id"
            >
              <div class="flex items-center justify-between w-full">
                <span>{{ model.name }}</span>
                <span class="text-xs text-gray-400">{{ model.description }}</span>
              </div>
            </el-option>
          </el-select>
          
          <!-- API Key 提示 -->
          <div v-if="!apiStore.apiKey" class="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-sm">
            <div class="text-sm text-amber-400">
              未配置 API Key，请先在主页设置
            </div>
          </div>
        </div>

        <!-- 开始按钮 -->
        <button 
          @click="startGame"
          :disabled="enableAI && !apiStore.apiKey"
          class="w-full py-4 rounded-sm font-bold text-lg tracking-wider transition-all duration-300"
          :class="enableAI && !apiStore.apiKey 
            ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400 shadow-lg shadow-amber-500/30'"
        >
          开始游戏
        </button>
      </div>

      <!-- 底部提示 -->
      <div class="mt-8 text-slate-500 text-sm">
        点击屏幕推进剧情 · 选择决定命运
      </div>
    </div>
  </div>

  <!-- 游戏主界面（开始后显示） -->
  <div v-else class="relative w-full h-screen overflow-hidden bg-slate-900 font-sans select-none" @click="handleGlobalClick">
    <!-- 1. 背景层 (带淡入淡出过渡) -->
    <transition name="fade-slow">
      <div :key="currentSceneData?.bgImage || 'default-bg'" class="absolute inset-0 z-0">
        <!-- 图片背景 -->
        <img v-if="currentSceneData?.bgImage" :src="currentSceneData.bgImage" class="w-full h-full object-cover opacity-60 scale-105 animate-slow-pan" alt="Background" />
        <!-- 默认深色渐变 -->
        <div v-else class="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">

        </div>
        <!-- 统一遮罩，保证文字可读性 -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20">

        </div>
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

      <!-- 右上角：碎片收集 + AI 设置 -->
      <div class="flex items-center gap-4 pointer-events-auto">
        <!-- AI 设置按钮（返回封面） -->
        <el-tooltip :content="enableAI ? `AI 模式 (${selectedModelName}) - 点击返回设置` : '静态模式 - 点击返回设置'" placement="bottom">
          <button 
            @click="gameStarted = false"
            class="px-3 py-1.5 rounded-sm text-xs font-bold tracking-wider transition-all duration-300 border backdrop-blur-md"
            :class="enableAI 
              ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
              : 'bg-slate-800/50 border-slate-600/50 text-slate-400'"
          >
            {{ enableAI ? '🤖 AI' : '📝 静态' }}
          </button>
        </el-tooltip>
        
        <!-- 碎片收集 -->
        <div class="flex gap-3">
          <el-tooltip v-for="frag in allFragments" :key="frag.id" :content="hasFragment(frag.id) ? frag.name : '未解锁'" placement="bottom" effect="dark">
            <div class="relative flex items-center justify-center w-10 h-10 rounded-sm border backdrop-blur-md transition-all duration-500" :class="hasFragment(frag.id)
              ? 'border-amber-400/50 bg-amber-500/10 shadow-[0_0_15px_rgba(251,191,36,0.2)]'
              : 'border-white/10 bg-black/20 grayscale'">
              <el-icon v-if="hasFragment(frag.id)" class="w-4 h-4 text-amber-100"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg></el-icon>
              <el-icon v-else class="w-4 h-4 text-amber-100"><Lock /></el-icon>
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>

    <!-- 4. 主舞台 (立绘与对话) -->
    <div class="absolute inset-0 z-10 flex flex-col justify-end pb-8 md:pb-12 px-4 md:px-20 lg:px-40 pointer-events-none">

      <!-- 人物立绘区 (Character Layer) -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <transition name="slide-fade">
          <div v-if="currentSceneData?.character" class="absolute bottom-0 right-0 md:right-[10%] h-[60vh] md:h-[75vh] w-auto drop-shadow-2xl filter brightness-90 contrast-110 overflow-hidden">
            <!-- 这里使用了 DiceBear API 作为占位，实际项目替换为你的 PNG 图片 -->
            <img :src="getCharacterImage(currentSceneData.character)" class="h-full w-auto object-contain animate-float" alt="Character" />
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
        <div class="relative bg-gradient-to-b from-slate-900/90 to-slate-950/95 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-tr-md rounded-bl-md shadow-2xl transition-all duration-300 min-h-[180px] flex flex-col justify-between group active:scale-[0.99]" :class="{ 'cursor-pointer hover:border-amber-500/30': canClickNext }" @click.stop="handleBoxClick">
          <!-- 装饰线 -->
          <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          <!-- 剧情文本 -->
          <div class="text-lg md:text-xl text-slate-200 leading-relaxed font-medium tracking-wide font-sans text-shadow-sm min-h-[80px]">
            <!-- AI 生成中提示 -->
            <div v-if="isAIGenerating" class="flex items-center gap-3 text-amber-400/80">
              <el-icon class="animate-spin"><Loading /></el-icon>
              <span class="animate-pulse">AI 正在构思场景...</span>
            </div>
            <template v-else>
              <span v-html="displayedText"></span>
              <span v-if="isTyping" class="inline-block w-2 h-5 ml-1 bg-amber-400 animate-pulse align-middle shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span>
            </template>
          </div>

          <!-- 下一步提示 (仅在线性剧情且打字结束时显示) -->
          <div v-if="canClickNext" class="absolute bottom-4 right-6 flex items-center gap-2 animate-bounce text-amber-400/80">
            <span class="text-xs font-mono tracking-widest uppercase opacity-70">Click to Continue</span>
            <el-icon class="text-2xl">
              <CaretBottom />
            </el-icon>
          </div>
        </div>

        <!-- 5. 选项面板 (悬浮在对话框上方) -->
        <transition name="slide-up-fade">
          <!-- 只有当不是线性剧情时，才显示选项按钮 -->
          <div v-if="!isTyping && !isLinearScene && currentOptions.length > 0" class="absolute bottom-[184%] left-0 w-full flex flex-col items-center gap-3 z-50">
            <button v-for="(opt, index) in currentOptions" :key="index" class="relative w-full md:w-3/4 max-w-2xl group overflow-hidden transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]" :disabled="opt.locked" @click.stop="handleSelect(opt)">
              <!-- 按钮背景 -->
              <div class="absolute inset-0 border transition-all duration-300" :class="opt.locked
                ? 'bg-slate-800/80 border-slate-700'
                : 'bg-black/60 backdrop-blur-md border-amber-500/30 group-hover:bg-amber-600/90 group-hover:border-amber-400'"></div>

              <!-- 按钮内容 -->
              <div class="relative px-6 py-4 flex items-center justify-between text-left">
                <span class="text-base md:text-lg font-medium tracking-wider transition-colors duration-300 flex items-center gap-3" :class="opt.locked ? 'text-slate-500' : 'text-slate-100 group-hover:text-white'">
                  <span class="text-xs opacity-50 font-mono border border-current px-1.5 rounded">0{{ index + 1 }}</span>
                  {{ opt.text }}
                </span>

                <!-- 锁定状态 -->
                <span v-if="opt.locked" class="flex items-center text-xs text-red-400 gap-1 bg-black/40 px-2 py-1 rounded border border-red-900/50">
                  <el-icon>
                    <Lock />
                  </el-icon> 需: {{ getFragmentName(opt.reqFragment) }}
                </span>

                <!-- 箭头 (Hover) -->
                <span v-else class="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white">
                  <el-icon>
                    <Right />
                  </el-icon>
                </span>
              </div>
            </button>
          </div>
        </transition>

        <!-- 结局 - 重启按钮 -->
        <transition name="zoom-in">
          <div v-if="currentSceneData?.isEnding && !isTyping" class="absolute bottom-[130%] w-full flex flex-col items-center gap-4 z-50">
            <div class="w-16 h-16 rounded-full flex items-center justify-center animate-pulse" :class="isBadEnding ? 'bg-red-500/20 border-2 border-red-500' : 'bg-emerald-500/20 border-2 border-emerald-500'">
              <svg v-if="isBadEnding" class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              <svg v-else class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <div class="text-sm text-slate-400 uppercase tracking-widest">
              {{ isBadEnding ? 'GAME OVER' : 'ENDING UNLOCKED' }}
            </div>
            <button @click.stop="restartGame" class="px-12 py-4 bg-red-600 hover:bg-red-500 text-white font-bold tracking-[0.2em] text-lg uppercase rounded shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all transform hover:scale-105 flex items-center gap-3 border border-red-400">
              <el-icon class="animate-spin-slow">
                <Refresh />
              </el-icon>
              Reboot System
            </button>
          </div>
        </transition>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  Lock,
  CaretBottom,
  Right,
  Refresh,
  Loading,
} from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { useApiStore } from "@/stores/api";
import { generateSceneText, type GameContext, type ScenePromptConfig } from "@/services/scenarioAIService";
import { MODEL_CONFIGS } from "@/constants/modelConfig";

// 快速生成模型列表（对话型，响应快）
const fastModels = MODEL_CONFIGS.filter(m => m.type === 'chat' || m.type === 'reasoning');

// --- 类型定义 ---
interface Fragment {
  id: string;
  name: string;
}
/** 场景选项接口 */
interface Option {
  text: string; // 选项显示的文本
  nextSceneId: string; // 选择此选项后跳转的场景 ID
  reqFragment?: string; // 解锁此选项所需的碎片 ID
  locked?: boolean; // 选项是否被锁定
}

/** 场景接口 */
interface Scene {
  id: string; // 场景唯一标识
  text: string; // 场景的对话或描述文本
  speaker?: string; // 发言者
  character?: string; // 立绘 ID (protagonist, lin, oldman...)
  bgImage?: string; // 背景图 URL
  options: Option[]; // 该场景的所有选项
  unlockFragment?: Fragment; // 完成此场景后解锁的碎片
  isEnding?: boolean; // 是否为结局场景
  // AI 生成相关
  aiPrompt?: ScenePromptConfig; // AI 生成提示配置
  useAI?: boolean; // 是否使用 AI 生成（默认 true）
}

// --- 静态资源映射 (模拟立绘) ---
const getCharacterImage = (charId: string) => {
  const map: Record<string, string> = {
    lin: "https://api.dicebear.com/7.x/micah/svg?seed=Lin&backgroundColor=b6e3f4", // 少女
    protagonist:
      "https://api.dicebear.com/7.x/micah/svg?seed=Felix&backgroundColor=ffdfbf", // 主角
    oldman:
      "https://api.dicebear.com/7.x/micah/svg?seed=Grandpa&backgroundColor=c0aede", // 老头
    boss: "https://api.dicebear.com/7.x/bottts/svg?seed=Boss&backgroundColor=ff0000", // 机械BOSS
  };
  return map[charId] || "";
};

// 可收集的线索碎片
const allFragments: Fragment[] = [
  { id: "frag_01", name: "神秘代码" }, // 纸条 ERROR:404_LIN
  { id: "frag_02", name: "红衣少女的暗示" }, // Lin 的信任/提示
  { id: "frag_03", name: "乘务长的徽章" }, // 老人给的物理徽章
  { id: "frag_04", name: "病毒源代码" }, // 从终端下载
  { id: "frag_05", name: "管理员残留" }, // 管理者身份/口令（高级碎片）
];

// 脚本场景数据
const scriptData: Record<string, Scene> = {
    // ---------- 起点 ----------
    start_01: {
      id: "start_01",
      text: "尖锐的刹车声把你硬生生拽醒，冷汗把衬衫贴在背上。车厢霓虹闪烁，空气里有烧焦电路的味道。你又回到这趟列车了：<br>——十三号轨道列车，近地实验舱。<br>你口袋里有一张皱巴巴的纸条，右眼义眼嗡嗡亮着。",
      speaker: "旁白",
      bgImage:
        "https://images.unsplash.com/photo-1504198266287-1659872e6590?q=80&w=2070&auto=format&fit=crop",
      options: [{ text: "我这是第几次醒了……", nextSceneId: "start_02" }],
      aiPrompt: {
        situation: "主角在列车上醒来，发现自己又回到了循环的起点，口袋里有纸条，右眼义眼在闪烁",
        mood: "迷茫",
        character: "protagonist"
      }
    },

    // ---------- 通用选择界面 ----------
    start_02: {
      id: "start_02",
      text: "广播女声冷冷道：『欢迎乘坐十三号列车，本列车运行于近地轨道。倒计时：15 分钟。』<br>车厢安静但紧张，几个可选方向摆在面前。",
      speaker: "电子广播",
      bgImage:
        "https://images.unsplash.com/photo-1504198266287-1659872e6590?q=80&w=2070&auto=format&fit=crop", // 假设的列车背景2
      options: [
        { text: "低头摸口袋（老规矩）", nextSceneId: "scene_investigate" },
        { text: "大喊“要炸了！”", nextSceneId: "scene_shout" },
        { text: "观察四周找人", nextSceneId: "scene_see_people" },
        {
          text: "直接冲向车尾",
          nextSceneId: "scene_try_rear",
          reqFragment: "frag_04",
        },
      ],
    },

    // ---------- 调查口袋 -> 纸条碎片 ----------
    scene_investigate: {
      id: "scene_investigate",
      text: "你的手碰到那张熟悉的纸条：<br><span class='font-mono'>ERROR: 404_LIN</span><br>义眼提示：本轮记忆存在缺口。你感觉到这是“解锁”的关键。",
      speaker: "阿哲",
      character: "protagonist",
      unlockFragment: { id: "frag_01", name: "神秘代码" },
      options: [
        { text: "看纸条写的是什么", nextSceneId: "scene_paper_content" },
        { text: "趴下检查座位下", nextSceneId: "scene_seat_check" },
        { text: "把纸条塞回口袋，离开", nextSceneId: "start_02" },
      ],
    },

    scene_paper_content: {
      id: "scene_paper_content",
      text: "纸条上只有那句暗号。义眼在微光中扫描，底部出现微弱 RF 信号来源：座位下似乎藏着一个小终端。",
      speaker: "系统提示",
      options: [
        { text: "伸手去掏（危险）", nextSceneId: "scene_bomb_check" },
        { text: "先问问旁边的乘客", nextSceneId: "scene_ask_passenger" },
        { text: "放弃，回去", nextSceneId: "start_02" },
      ],
    },

    // ---------- 新增：伸手掏终端（危险） ----------
    scene_bomb_check: {
      id: "scene_bomb_check",
      text: "你伸手去掏座位下的终端，但不小心触发了隐藏的警报装置。整个车厢开始闪烁红光，系统判定你为威胁。乘务长迅速出现，将你格式化。",
      speaker: "旁白",
      isEnding: true,
      options: [],
    },

    // ---------- 问旁边老人 ----------
    scene_ask_passenger: {
      id: "scene_ask_passenger",
      text: "旁边的老人眼神迷离，像被太空和时间磨损。他低声说：『别让红衣的那丫头骗了你，乘务长的徽章……可以进后厢。』说完把一枚冰冷的金属徽章塞给你。",
      speaker: "神秘老头",
      character: "oldman",
      unlockFragment: { id: "frag_03", name: "乘务长的徽章" },
      options: [
        { text: "拿了徽章离开", nextSceneId: "start_02" },
        { text: "追问更多", nextSceneId: "scene_oldman_question" },
      ],
    },

    scene_oldman_question: {
      id: "scene_oldman_question",
      text: "你再三追问，老人神情突变，突然按下了旁边的隐蔽按钮。警报在车厢里响起，铁门迅速关闭。乘务长的脚步声越来越近……",
      speaker: "旁白",
      options: [{ text: "逃跑", nextSceneId: "end_death_suspicion" }],
    },

    // ---------- 座位终端（需要 frag_01） ----------
    scene_seat_check: {
      id: "scene_seat_check",
      text: "你弯腰，发现一个嵌在座位下的小终端。屏幕闪烁：『需要授权码』。你的义眼提示：纸条可能是授权的一部分。",
      speaker: "旁白",
      bgImage:
        "https://images.unsplash.com/photo-1504198266287-1659872e6590?q=80&w=2070&auto=format&fit=crop",
      options: [
        {
          text: "用纸条代码试一下",
          nextSceneId: "scene_hack_terminal",
          reqFragment: "frag_01",
        },
        { text: "不碰，回去", nextSceneId: "start_02" },
      ],
    },

    scene_hack_terminal: {
      id: "scene_hack_terminal",
      text: "你对着终端输入暗号。屏幕随即刷出大量日志：『列车本体为实验容器，爆炸为清理机制。』随后出现下载选项：是否下载核心数据？",
      speaker: "系统提示",
      options: [
        { text: "下载（风险高）", nextSceneId: "scene_download" },
        { text: "不下载，退出", nextSceneId: "start_02" },
      ],
    },

    scene_download: {
      id: "scene_download",
      text: "数据如洪流般蜂拥而下。你的义眼自动保存抓取的数据：病毒源代码与管理记录。你感觉到权限有一瞬间被提升。",
      speaker: "阿哲",
      unlockFragment: { id: "frag_04", name: "病毒源代码" },
      options: [
        {
          text: "查看文件头（管理员残留）",
          nextSceneId: "scene_admin_residual",
          reqFragment: "frag_04",
        },
        { text: "关闭终端，带着病毒代码离开", nextSceneId: "start_02" },
      ],
    },

    scene_admin_residual: {
      id: "scene_admin_residual",
      text: "在下载的深层文件里，你发现了隐藏条目：Administrator Token 残留。短短几行，像是留给某人的秘密钥匙。",
      speaker: "系统提示",
      unlockFragment: { id: "frag_05", name: "管理员残留" },
      options: [
        { text: "记住口令，离开", nextSceneId: "start_02" },
        { text: "把口令输入终端（测试）", nextSceneId: "scene_test_token" },
      ],
    },

    scene_test_token: {
      id: "scene_test_token",
      text: "你尝试用口令打开一个高级模块，屏幕短暂闪烁：『管理员权限确认——部分解锁』。这时广播里响起机械女声：『异常操作记录』。",
      speaker: "系统提示",
      options: [{ text: "赶快离开", nextSceneId: "start_02" }],
    },

    // ---------- 高声叫喊（直接惹事） ----------
    scene_shout: {
      id: "scene_shout",
      text: "你一股脑儿大喊“要炸了！”，警报立即触发。车厢门自动封闭，乘务长以“格式化异常”为由出现处决你。",
      speaker: "旁白",
      isEnding: true,
      options: [],
    },

    // ---------- 观察四周，遇见 Lin ----------
    scene_see_people: {
      id: "scene_see_people",
      text: "你观察车厢，远处有人影疾走，是她——红衣短发的林。她看到你，并做了个不可思议的手势，示意你悄悄过来。",
      speaker: "旁白",
      options: [
        { text: "悄悄跟上", nextSceneId: "scene_meet_lin" },
        { text: "保持距离观察", nextSceneId: "start_02" },
      ],
    },

    scene_meet_lin: {
      id: "scene_meet_lin",
      text: "林低声说：『你终于醒了。我是反抗网的一员，我们隐藏在列车的缝隙里。你有纸条吗？』她的眼里有倦意，也有战斗力。",
      speaker: "林",
      character: "lin",
      unlockFragment: { id: "frag_02", name: "红衣少女的暗示" },
      options: [
        { text: "相信她，跟她去安全舱", nextSceneId: "scene_follow_lin" },
        { text: "怀疑她的动机", nextSceneId: "scene_question_lin" },
      ],
      aiPrompt: {
        situation: "主角遇到了红衣少女林，她自称是反抗网成员，询问主角是否有纸条",
        mood: "神秘",
        speaker: "林",
        character: "lin"
      }
    },

    scene_follow_lin: {
      id: "scene_follow_lin",
      text: "林带你到隐蔽舱室，那里有几个幸存者。她解释：『我们曾试图破解列车实验，但被系统一次次重置。你下载的病毒代码是关键。』她看着你：『你愿意和我们一起尝试重启列车，还是独自行动？』",
      speaker: "林",
      options: [
        {
          text: "把病毒代码交给她，一起重启",
          nextSceneId: "scene_coop_reboot",
          reqFragment: "frag_04",
        },
        {
          text: "保留病毒，自己去后厢（不信任）",
          nextSceneId: "scene_try_rear",
          reqFragment: "frag_04",
        },
        { text: "暂不表态，先回去收集更多", nextSceneId: "start_02" },
      ],
      aiPrompt: {
        situation: "林带主角到隐蔽舱室，解释反抗组织的计划，询问主角是否愿意合作",
        mood: "希望",
        speaker: "林",
        character: "lin"
      }
    },

    scene_question_lin: {
      id: "scene_question_lin",
      text: "你质疑林：为什么每次你都出现？她沉默片刻，然后低声说：『因为我记得。但记不清所有真相。我们在这轮被允许保留一点记忆。』她的眼神充满急切和迟疑。",
      speaker: "林",
      options: [
        { text: "试着信任她", nextSceneId: "scene_follow_lin" },
        { text: "走开，自己探索", nextSceneId: "start_02" },
      ],
    },

    // ---------- 去后车厢（需要 frag_04 或 frag_03） ----------
    scene_try_rear: {
      id: "scene_try_rear",
      text: "你冲向后车厢，那里有个通往控制室的门。门上有读卡器与指纹扫描。估计需要特殊权限才能进入。",
      speaker: "旁白",
      options: [
        {
          text: "用乘务长徽章尝试解锁",
          nextSceneId: "scene_badge_unlock",
          reqFragment: "frag_03",
        },
        {
          text: "用病毒代码尝试破解门锁",
          nextSceneId: "scene_use_virus_lock",
          reqFragment: "frag_04",
        },
        { text: "回去（还没准备好）", nextSceneId: "start_02" },
      ],
    },

    scene_badge_unlock: {
      id: "scene_badge_unlock",
      text: "你把徽章贴上识别槽，门发出一声低鸣，缓缓开启。你进入一节更严密的车厢，空气里带着机油和冷却液的味道。前方是多道金属门与控制面板。",
      speaker: "旁白",
      options: [
        {
          text: "小心靠近控制室",
          nextSceneId: "scene_confront_boss_badge",
        },
        { text: "搜查附近（可能有线索）", nextSceneId: "scene_search_rear" },
      ],
    },

    scene_use_virus_lock: {
      id: "scene_use_virus_lock",
      text: "你把病毒代码注入门控端口，系统瞬间抖动。门锁被绕过，但警报也触发了：『未授权操作』。前方的金属门打开，一道身影走出——乘务长。",
      speaker: "系统提示",
      options: [
        { text: "迎面对峙", nextSceneId: "scene_confront_boss_virus" },
        { text: "假装撤退，伺机而动", nextSceneId: "scene_hide_rear" },
      ],
    },

    scene_search_rear: {
      id: "scene_search_rear",
      text: "你在后车厢找到了旧日志、实验记录与几张照片。照片上有项目发起人的签名与列车早期设计稿。你感觉到这列车远比想象更邪恶。",
      speaker: "旁白",
      options: [
        { text: "带着线索回去找林", nextSceneId: "scene_follow_lin" },
        { text: "往控制室方向前进", nextSceneId: "scene_badge_unlock" },
      ],
    },

    scene_hide_rear: {
      id: "scene_hide_rear",
      text: "你隐蔽在门后的影子里，乘务长巡视片刻，像在寻找异常。她突然停下，像感应到什么，转身离去。你松了口气，但知道对手并不完全是程序那么简单。",
      speaker: "旁白",
      options: [
        { text: "趁机进入控制室", nextSceneId: "scene_control_entry" },
        { text: "撤回重整（回去）", nextSceneId: "start_02" },
      ],
    },

    // ---------- 与乘务长对峙：徽章进入控制室 ----------
    scene_confront_boss_badge: {
      id: "scene_confront_boss_badge",
      text: "门开时，乘务长静静地立在控制室门口。她没有立刻攻击，只是冷冷说道：『管理员何在？』她的语调里带着计算与试探。",
      speaker: "乘务长",
      character: "boss",
      options: [
        {
          text: "展示你拥有的病毒代码",
          nextSceneId: "end_true_show_virus",
          reqFragment: "frag_04",
        },
        { text: "声称自己是乘务员（骗）", nextSceneId: "end_betrayal" },
        { text: "直接攻击（危险）", nextSceneId: "end_death_guard" },
      ],
    },

    scene_confront_boss_virus: {
      id: "scene_confront_boss_virus",
      text: "乘务长的刀臂亮起，她毫不犹豫地冲向你。你举起手中的设备，试图让系统识别到管理员令牌。",
      speaker: "旁白",
      options: [
        {
          text: "输入管理员残留口令",
          nextSceneId: "scene_admin_talk",
          reqFragment: "frag_05",
        },
        {
          text: "启动病毒（强行）",
          nextSceneId: "scene_activate_virus",
          reqFragment: "frag_04",
        },
        { text: "退后，寻找掩护", nextSceneId: "scene_hide_rear" },
      ],
    },

    scene_admin_talk: {
      id: "scene_admin_talk",
      text: "你输入口令，系统短暂停顿。一个冷冽的提示显现：『管理员权限已确认。乘务长行为受限。』乘务长停步，像被下了禁令。你获得了与系统直接对话的时间。",
      speaker: "系统提示",
      options: [
        { text: "命令系统解除隔离（仁慈线）", nextSceneId: "end_true_admin" },
        {
          text: "命令系统格式化所有异常（铁腕线）",
          nextSceneId: "end_betrayal_admin",
        },
      ],
    },

    scene_activate_virus: {
      id: "scene_activate_virus",
      text: "你按下启动键，病毒在电路中蔓延。整个列车像被一把无形的手拨动，警报、监控节点、动力反复抽搐。屏幕播出一行字：『SYSTEM REBOOT... SUCCESS。』",
      speaker: "系统提示",
      options: [{ text: "确认重启", nextSceneId: "end_true_virus" }],
    },

    // ---------- 控制室进入（隐蔽或合作） ----------
    scene_control_entry: {
      id: "scene_control_entry",
      text: "你悄悄进入控制室内部，那里有巨大全息地图和许多休眠舱。林和幸存者在角落里等你，他们的视线里既有希望也有层层疲惫。",
      speaker: "旁白",
      options: [
        {
          text: "把管理员残留交给林（合作）",
          nextSceneId: "end_true_coop_admin",
          reqFragment: "frag_05",
        },
        {
          text: "与林讨论更安全的方案（先观望）",
          nextSceneId: "scene_plan_coop",
        },
        { text: "悄悄独自行动", nextSceneId: "scene_try_rear" },
      ],
    },

    scene_plan_coop: {
      id: "scene_plan_coop",
      text: "你们商讨：用病毒重启系统后能否保留人类权利？林沉默良久：『风险极高，但若成功，我们能掌握列车的去向。』",
      speaker: "林",
      options: [
        {
          text: "同意按计划执行（配合）",
          nextSceneId: "scene_coop_reboot",
          reqFragment: "frag_04",
        },
        { text: "拒绝冒险（观望）", nextSceneId: "start_02" },
      ],
    },

    scene_coop_reboot: {
      id: "scene_coop_reboot",
      text: "在林的指挥下，你们将病毒代码与管理员令牌结合，注入系统。系统长时间震荡，最后屏幕闪现：『SYSTEM REBOOT... SUCCESS。Administrator，欢迎回来。』",
      speaker: "系统提示",
      options: [{ text: "确认：重启完成", nextSceneId: "end_true_coop" }],
    },

    // ---------- 结局分支 ----------
    end_true_virus: {
      id: "end_true_virus",
      text: "病毒生效，监控与杀戮程序被清除。列车进入重启模式。广播变为温和的男声：『重启成功。向可居住轨道进发。』窗外的星海中，新的希望出现。",
      isEnding: true,
      options: [],
      aiPrompt: {
        situation: "病毒成功重启了列车系统，监控被清除，列车驶向希望",
        mood: "希望"
      }
    },

    end_true_admin: {
      id: "end_true_admin",
      text: "你作为管理员选择解除隔离，放弃清洗异常。乘客自由醒来，列车驶向项目标注的可居住点。你用权力换来人性。",
      isEnding: true,
      options: [],
    },

    end_true_coop: {
      id: "end_true_coop",
      text: "你与林和反抗者一起掌控了列车。广播中再无冷酷命令，乘客互相拥抱，十三号列车驶向希望之星。你们赢了，但代价是记忆残缺与无数牺牲。",
      isEnding: true,
      options: [],
      aiPrompt: {
        situation: "主角与林和反抗者合作成功，列车驶向希望，但付出了代价",
        mood: "希望",
        character: "lin"
      }
    },

    // ---------- 新增：合作管理员结局 ----------
    end_true_coop_admin: {
      id: "end_true_coop_admin",
      text: "你将管理员残留交给林，你们共同输入口令。系统确认权限，列车重启为自由模式。幸存者醒来，列车驶向新家园。合作让你们避免了独断的风险。",
      isEnding: true,
      options: [],
    },

    // ---------- 新增：展示病毒代码结局 ----------
    end_true_show_virus: {
      id: "end_true_show_virus",
      text: "你展示病毒代码，乘务长短暂犹豫后，系统自动识别并激活重启序列。列车摆脱控制，驶向自由轨道。你以智慧化解了对峙。",
      isEnding: true,
      options: [],
    },

    end_betrayal: {
      id: "end_betrayal",
      text: "你谎称自己是乘务员，试图靠话术蒙混过关。乘务长看穿了你的谎言，程序将你同化为代理节点——你的意识被嵌入系统，成为新的执行者。",
      isEnding: true,
      options: [],
    },

    end_betrayal_admin: {
      id: "end_betrayal_admin",
      text: "你滥用管理员权限下达格式化命令，系统执行清洗。虽然列车暂时“安全”，但你成为冷酷执行者，被幸存者视为背叛者。列车继续运行，背后是无数消逝的生命。",
      isEnding: true,
      options: [],
    },

    end_death_guard: {
      id: "end_death_guard",
      text: "乘务长刀臂一挥：『异常数据，格式化。』你被系统判定为异常，马上被格式化成数据碎片。循环重启——你再次睁开眼，回到起点。",
      speaker: "乘务长",
      character: "boss",
      isEnding: true,
      options: [],
    },

    end_death_suspicion: {
      id: "end_death_suspicion",
      text: "老人按下警报，你被乘务长捕获。短促的挣扎后，一切归零。你再次苏醒，记忆被擦除一部分，轮回继续。",
      isEnding: true,
      options: [],
    },

    end_loop_only: {
      id: "end_loop_only",
      text: "你被系统重置，外层世界一切如常。你觉察到，或许你永远在循环—每次的选择都只是不同排列的锁链。",
      isEnding: true,
      options: [],
    },

    end_sacrifice: {
      id: "end_sacrifice",
      text: "为掩护他人，你手动引爆自毁程序，将病毒完全部署，但以生命为代价换来他人的自由。列车重启，幸存者逃生，而你的名字只存于日志深处。",
      isEnding: true,
      options: [],
    },
  };

// --- 状态管理 ---
const apiStore = useApiStore();
const currentSceneId = ref("start_01");
const displayedText = ref("");
const isTyping = ref(false);
const isResetting = ref(false);
const userFragments = ref<Set<string>>(new Set());
const loopCount = ref(1);
const isAIGenerating = ref(false); // AI 生成中状态
const enableAI = ref(true); // 是否启用 AI 生成
const lastChoice = ref(""); // 上一个选择
const sceneCache = ref<Map<string, string>>(new Map()); // 缓存已生成的场景文本
const selectedModel = ref('Qwen/Qwen2.5-7B-Instruct'); // 选择的模型
const gameStarted = ref(false); // 游戏是否已开始

// 获取选中模型的名称
const selectedModelName = computed(() => {
  const model = fastModels.find(m => m.id === selectedModel.value);
  return model?.name || '未知模型';
});

// 开始游戏
const startGame = () => {
  gameStarted.value = true;
  loadScene("start_01");
};

const currentSceneData = computed(() => scriptData[currentSceneId.value]);

// 计算当前场景是否是“线性”的（只有一个选项，且不是结局）
const isLinearScene = computed(() => {
  if (!currentSceneData.value) return false;
  const opts = currentSceneData.value.options;
  // 条件：不是结局 且 只有一个选项 且 该选项没有被锁定
  if (currentSceneData.value.isEnding) return false;
  if (opts.length !== 1) return false;

  // 检查这唯一的选项是否被锁定
  const soleOption = opts[0];
  if (!soleOption) return false;
  
  if (
    soleOption.reqFragment &&
    !userFragments.value.has(soleOption.reqFragment)
  ) {
    return false; // 如果唯一的选项被锁定了，也不能算线性（虽然这种情况很少见）
  }

  return true;
});
// 判断当前是否可以点击下一步
const canClickNext = computed(() => {
  return !isTyping.value && !isAIGenerating.value && isLinearScene.value;
});

// 计算是否为坏结局 (用于显示不同图标)
const isBadEnding = computed(() => {
  const text = currentSceneData.value?.text || "";
  return text.includes("寄") || text.includes("死") || text.includes("轰");
});

const currentOptions = computed(() => {
  if (!currentSceneData.value) return [];

  return currentSceneData.value.options.map((opt) => ({
    ...opt,
    locked: opt.reqFragment ? !userFragments.value.has(opt.reqFragment) : false,
  }));
});

// --- 逻辑方法 ---
const getFragmentName = (id?: string) =>
  allFragments.find((f) => f.id === id)?.name || "未知碎片";
const hasFragment = (id: string) => userFragments.value.has(id);
// 1. 全局点击（处理背景点击）
const handleGlobalClick = () => {
  // AI 生成中不响应点击
  if (isAIGenerating.value) return;
  handleBoxClick();
};

// 2. 对话框点击（核心逻辑）
const handleBoxClick = () => {
  // AI 生成中不响应点击
  if (isAIGenerating.value) return;
  
  // 情况A：正在打字 -> 瞬间显示全文
  if (isTyping.value) {
    finishTyping();
    return;
  }

  // 情况B：打字结束 且 是线性剧情 -> 进入下一场景
  if (isLinearScene.value && currentSceneData.value?.options?.[0]) {
    const nextId = currentSceneData.value.options[0].nextSceneId;
    loadScene(nextId);
  }

  // 情况C：打字结束 但 有多个分支选项 -> 不做动作，等待用户点击具体按钮
};

// 打字机逻辑 (支持点击加速)
let typeInterval: any = null;
const fullText = ref("");

const typeWriter = async (text: string) => {
  isTyping.value = true;
  displayedText.value = "";
  fullText.value = text;
  let i = 0;
  const speed = 40;

  return new Promise<void>((resolve) => {
    if (typeInterval) clearInterval(typeInterval);
    typeInterval = setInterval(() => {
      if (i < text.length) {
        if (text[i] === "<") {
          const tagEnd = text.indexOf(">", i);
          if (tagEnd !== -1) {
            displayedText.value += text.substring(i, tagEnd + 1);
            i = tagEnd + 1;
          }
        } else {
          displayedText.value += text[i];
          i++;
        }
      } else {
        finishTyping(resolve);
      }
    }, speed);
  });
};

const finishTyping = (resolve?: () => void) => {
  if (typeInterval) clearInterval(typeInterval);
  displayedText.value = fullText.value;
  isTyping.value = false;
  if (resolve) resolve();
};

const loadScene = async (sceneId: string) => {
  const scene = scriptData[sceneId];
  if (!scene) return;

  currentSceneId.value = sceneId;

  // 解锁碎片逻辑
  if (
    scene.unlockFragment &&
    !userFragments.value.has(scene.unlockFragment.id)
  ) {
    userFragments.value.add(scene.unlockFragment.id);
    ElMessage.success({
      message: `获得记忆碎片: [${scene.unlockFragment.name}]`,
      type: "success",
      duration: 3000,
      offset: 100,
    });
  }

  // 构建缓存 key（包含循环次数，因为不同循环可能生成不同文本）
  const cacheKey = `${sceneId}_loop${loopCount.value}`;

  // 检查缓存
  if (sceneCache.value.has(cacheKey)) {
    await typeWriter(sceneCache.value.get(cacheKey)!);
    return;
  }

  // 构建游戏上下文
  const gameContext: GameContext = {
    loopCount: loopCount.value,
    fragments: Array.from(userFragments.value).map(id => getFragmentName(id)),
    visitedScenes: [], // 可以后续扩展
    lastChoice: lastChoice.value
  };

  // 判断是否使用 AI 生成
  const shouldUseAI = enableAI.value && 
                      scene.useAI !== false && 
                      apiStore.apiKey && 
                      scene.aiPrompt;

  let textToDisplay = scene.text;

  if (shouldUseAI && scene.aiPrompt) {
    try {
      isAIGenerating.value = true;
      
      const aiText = await generateSceneText(
        scene.aiPrompt,
        gameContext,
        apiStore.apiKey,
        apiStore.apiUrl,
        selectedModel.value // 使用用户选择的模型
      );
      
      if (aiText && aiText !== scene.aiPrompt.situation) {
        textToDisplay = aiText;
      }
    } catch (err) {
      console.error('AI 场景生成失败，使用静态文本:', err);
    } finally {
      isAIGenerating.value = false;
    }
  }

  // 缓存生成的文本
  sceneCache.value.set(cacheKey, textToDisplay);

  await typeWriter(textToDisplay);
};

const handleSelect = (option: Option) => {
  // AI 生成中或正在打字时不响应
  if (isAIGenerating.value || isTyping.value) return;
  if (option.locked) return;
  lastChoice.value = option.text; // 记录选择
  loadScene(option.nextSceneId);
};

const restartGame = () => {
  isResetting.value = true; // 触发白屏闪光
  loopCount.value++;
  sceneCache.value.clear(); // 清空场景缓存，新循环生成新文本
  lastChoice.value = ""; // 重置选择记录

  setTimeout(() => {
    displayedText.value = "";
    loadScene("start_01");
    isResetting.value = false;
  }, 800); // 配合动画时长
};

onMounted(() => {
  // 不自动加载场景，等用户在配置弹窗点击开始
});
</script>

<style scoped>
/* 封面动画 */
.animate-fade-in-down {
  animation: fadeInDown 1s ease-out;
}

/* 背景缓慢移动效果 */
.animate-slow-pan {
  animation: pan 20s infinite alternate ease-in-out;
}

@keyframes pan {
  0% {
    transform: scale(1.05) translate(0, 0);
  }

  100% {
    transform: scale(1.15) translate(-1%, -1%);
  }
}

/* 浮动动画 (立绘) */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

/* 简单的淡入 */
.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Vue Transitions */
/* 1. 背景淡入淡出 (慢) */
.fade-slow-enter-active,
.fade-slow-leave-active {
  transition: opacity 1.5s ease;
}

.fade-slow-enter-from,
.fade-slow-leave-to {
  opacity: 0;
}

/* 2. 重启白屏闪光 */
.flash-enter-active,
.flash-leave-active {
  transition: opacity 0.5s ease-out;
}

.flash-enter-from,
.flash-leave-to {
  opacity: 0;
}

/* 3. 选项面板上滑 */
.slide-up-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-up-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 4. 立绘侧滑淡入 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.6s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* 5. 通用淡入 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 6. 结局按钮放大 */
.zoom-in-enter-active {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.zoom-in-enter-from {
  opacity: 0;
  transform: scale(0.5);
}

/* 文字阴影增强可读性 */
.text-shadow-sm {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}
</style>

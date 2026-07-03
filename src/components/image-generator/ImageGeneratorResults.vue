<template>
  <!-- 
    主容器修复：
    h-full: 强制占满父容器高度 (前提是你的父级容器也是 h-full 或者有高度)
    w-full: 占满宽度
    relative: 为内部绝对定位提供锚点
  -->
  <div class="relative w-full h-full bg-white rounded-md shadow-xl shadow-slate-200/50 overflow-hidden font-sans text-slate-700 flex flex-col">

<transition
    enter-active-class="transition duration-700 ease-out"
    enter-from-class="opacity-0 scale-95 blur-sm"
    enter-to-class="opacity-100 scale-100 blur-0"
    leave-active-class="transition duration-300 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div v-if="!generatedImages.length && !loading" class="absolute inset-0 overflow-hidden flex flex-col items-center justify-center">
      
      <!-- 1. 沉浸式背景墙 (Visual Noise & Gallery) -->
      <!-- 使用 mask-image 让边缘柔和淡出，不抢主体视线 -->
      <div class="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-30">
        <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white z-10"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10"></div>
        
        <!-- 模拟图片瀑布流 (这里用颜色块代替，实际请换成你的高清示例图 url) -->
        <div class="grid grid-cols-4 gap-4 transform -rotate-6 scale-110 opacity-60">
           <div v-for="n in 12" :key="n" class="aspect-[2/3] rounded-sm bg-slate-200 shadow-lg overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
              <!-- 占位图：实际项目中请替换为真实的 AI 生成图 -->
              <img :src="`https://picsum.photos/seed/${n * 123}/300/500`" class="w-full h-full object-cover" alt="AI Example" />
           </div>
        </div>
      </div>

      <!-- 2. 核心内容区 (Glass Container) -->
      <div class="relative z-20 w-full max-w-4xl px-6 flex flex-col items-center gap-8">
        
        <!-- 品牌光环与标题 -->
        <div class="text-center space-y-4 relative">
            <!-- 背后发光 -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-indigo-100 shadow-sm backdrop-blur-md mb-2">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <span class="text-[10px] font-bold tracking-widest text-indigo-600 uppercase">Ready to Create</span>
            </div>

            <h1 class="text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight">
              让想象力 <br/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">触手可及</span>
            </h1>
            <p class="text-slate-500 max-w-md mx-auto text-sm leading-relaxed">
              输入提示词，选择风格，剩下的交给 AI。无论是赛博朋克还是水墨山水，都在一念之间。
            </p>
        </div>

        <!-- 3. 灵感风格卡片 (Inspiration Cards) -->
        <!-- 替换原本枯燥的步骤条，改为带图的风格推荐，解决“图片少”的问题 -->
        <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          
          <!-- Card 1: 3D Render -->
          <button class="group relative h-32 rounded-md overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left">
            <img src="https://picsum.photos/seed/3d/400/200" class="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-4 text-white">
               <div class="flex items-center gap-2 mb-1">
                 <div class="p-1 bg-white/20 backdrop-blur rounded text-xs">🎨 3D 渲染</div>
               </div>
               <p class="text-[10px] text-white/70 line-clamp-1">软萌盲盒风格，C4D 材质...</p>
            </div>
          </button>

          <!-- Card 2: Cyberpunk -->
          <button class="group relative h-32 rounded-md overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left">
            <img src="https://picsum.photos/seed/cyber/400/200" class="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent"></div>
             <div class="absolute bottom-0 left-0 p-4 text-white">
               <div class="flex items-center gap-2 mb-1">
                 <div class="p-1 bg-white/20 backdrop-blur rounded text-xs">🌃 赛博朋克</div>
               </div>
               <p class="text-[10px] text-white/70 line-clamp-1">霓虹灯光，未来城市街道...</p>
            </div>
          </button>

          <!-- Card 3: Watercolor -->
          <button class="group relative h-32 rounded-md overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left">
            <img src="https://picsum.photos/seed/art/400/200" class="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-transparent to-transparent"></div>
             <div class="absolute bottom-0 left-0 p-4 text-white">
               <div class="flex items-center gap-2 mb-1">
                 <div class="p-1 bg-white/20 backdrop-blur rounded text-xs">🖌️ 水彩插画</div>
               </div>
               <p class="text-[10px] text-white/70 line-clamp-1">清透质感，治愈系风景...</p>
            </div>
          </button>
        </div>

       <!-- 替换原来的底部 div -->
<div class="mt-12 group cursor-pointer">
  <div class="flex flex-col items-center gap-2">
    <!-- 文字 -->
    <span class="text-[10px] font-mono text-slate-400 uppercase tracking-[0.2em] group-hover:text-indigo-500 transition-colors duration-300">
      Start Creation
    </span>
    
    <!-- 动态箭头 -->
    <div class="flex flex-col items-center gap-[-4px]">
      <svg class="w-4 h-4 text-slate-300 group-hover:text-indigo-400 transition-colors animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
      <!-- 第二个箭头增加层次感 -->
      <svg class="w-4 h-4 text-slate-200 group-hover:text-indigo-300 transition-colors -mt-2 animate-bounce animation-delay-150">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  </div>
</div>


      </div>
    </div>
  </transition>

<!-- ==========================================
     2. 加载状态 (Cyber Runner Loader)
     ========================================== -->
<transition
  enter-active-class="transition duration-500 ease-out"
  enter-from-class="opacity-0 backdrop-blur-none"
  enter-to-class="opacity-100 backdrop-blur-md"
  leave-active-class="transition duration-300 ease-in"
  leave-from-class="opacity-100 backdrop-blur-md"
  leave-to-class="opacity-0 backdrop-blur-none"
>
  <div v-if="loading" class="absolute inset-0 z-30 flex items-center justify-center bg-white/90 backdrop-blur-md overflow-hidden">
    
    <!-- A. 背景装饰 (动态流云/网格) -->
    <div class="absolute inset-0 opacity-40 pointer-events-none">
      <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_500px_at_50%_200px,#4E54C81a,transparent)]"></div>
      <!-- 漂浮的云朵/代码块装饰 -->
      <div class="absolute top-1/4 left-1/4 w-12 h-1 bg-slate-200 rounded-full opacity-50 animate-[float_8s_infinite]"></div>
      <div class="absolute top-1/3 right-1/3 w-20 h-1 bg-slate-200 rounded-full opacity-50 animate-[float_10s_infinite_reverse]"></div>
    </div>

    <div class="relative w-full max-w-lg px-8 flex flex-col items-center">
      
      <!-- B. 趣味交互区 -->
      <div class="relative w-full mb-2">
        
        <!-- 奔跑的主角 (跟随进度条移动) -->
        <!-- calc(100% - 32px) 是为了防止跑到最右边溢出 -->
        <div 
          class="absolute bottom-0 z-10 transition-all duration-300 ease-out will-change-left"
          :style="{ left: `calc(${progress}% - 20px)` }"
        >
          <!-- 1. 对话气泡 (趣味文案) -->
          <div class="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 bg-slate-800 text-white text-[10px] font-bold rounded-sm shadow-lg animate-bounce-slight opacity-90 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[6px] after:border-transparent after:border-t-slate-800">
            {{ loadingTip }}
          </div>

         <!-- 2. 奔跑的机械猫 SVG -->
<!-- 容器增加 animate-run 实现奔跑颠簸 -->
<div class="relative w-14 h-14 text-[#4E54C8] filter drop-shadow-lg animate-run">
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- 身体 (流线型) -->
    <path d="M14 24C14 24 18 20 26 20C34 20 38 24 38 24V29C38 29 34 32 26 32C18 32 14 29 14 29V24Z" fill="currentColor"/>
    
    <!-- 头部 (带尖耳朵) -->
    <path d="M36 24L38 18L41 21L44 19L43 25C43 25 45 26 45 28C45 30 43 32 41 32C39 32 37 30 37 28" fill="currentColor"/>
    
    <!-- 赛博眼罩 (红色扫描光) -->
    <path d="M41 26H44" stroke="#FF4D4D" stroke-width="2" stroke-linecap="round" class="animate-pulse"/>
    
    <!-- 腿 (前后交替摆动) -->
    <!-- 后腿 -->
    <path d="M16 29L12 34" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="animate-[leg-back_0.6s_infinite]"/>
    <path d="M18 29L19 35" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="animate-[leg-back_0.6s_infinite_0.3s]"/>
    <!-- 前腿 -->
    <path d="M34 30L36 36" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="animate-[leg-front_0.6s_infinite]"/>
    <path d="M30 31L28 36" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="animate-[leg-front_0.6s_infinite_0.3s]"/>

    <!-- 尾巴 (动态摆动) -->
    <path d="M14 22C10 22 6 18 6 14" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="animate-[tail-wag_1s_ease-in-out_infinite]"/>
  </svg>
</div>


          <!-- 3. 奔跑的尘土 (粒子效果) -->
          <div class="absolute bottom-1 -left-4 flex gap-1">
             <div class="w-1.5 h-1.5 bg-slate-300 rounded-full animate-[dust_0.6s_infinite_0.1s]"></div>
             <div class="w-1 h-1 bg-slate-200 rounded-full animate-[dust_0.6s_infinite_0.3s]"></div>
          </div>
        </div>

      </div>

      <!-- C. 进度条 (跑道) -->
      <div class="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-6 shadow-inner border border-slate-200/60">
        <!-- 填充色 -->
        <div 
          class="h-full bg-gradient-to-r from-[#4E54C8] to-[#8F94FB] rounded-full transition-all duration-300 relative"
          :style="{ width: `${progress}%` }"
        >
          <!-- 跑道纹理 -->
          <div class="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:10px_10px] animate-[slide_1s_linear_infinite]"></div>
        </div>
      </div>

      <!-- D. 底部状态信息 -->
      <div class="flex flex-col items-center gap-2">
        <h3 class="text-lg font-bold text-slate-700 animate-pulse">
          正在构建您的创意...
        </h3>
        <div class="flex items-center gap-3 text-xs text-slate-400 font-medium font-mono uppercase tracking-widest">
          <span class="flex items-center gap-1">
            <el-icon class="animate-spin"><Loading /></el-icon> Rendering
          </span>
          <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
          <span class="text-[#4E54C8]">{{ progress }}%</span>
          <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
          <span>{{ estimatedTime }}s Left</span>
        </div>
      </div>

    </div>
  </div>
</transition>


    <!-- ==========================================
     3. 生成结果 (Ambient Gallery Mode)
     ========================================== -->
    <transition enter-active-class="transition duration-700 cubic-bezier(0.2, 0.8, 0.2, 1)" enter-from-class="opacity-0 scale-[0.98]" enter-to-class="opacity-100 scale-100">
      <div v-if="generatedImages.length > 0" class="absolute inset-0 z-20 flex flex-col bg-[#F8F9FC] overflow-hidden">

        <!-- A. 顶栏 (Gallery Header) -->
        <div class="shrink-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 py-3 flex items-center justify-between shadow-sm">
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-8 h-8 rounded-sm bg-[#4E54C8] text-white shadow-lg shadow-[#4E54C8]/30">
              <el-icon>
                <Picture />
              </el-icon>
            </div>
            <div>
              <h2 class="text-sm font-bold text-slate-800 tracking-wide">AI 画廊</h2>
              <p class="text-[10px] text-slate-400">共 {{ generatedImages.length }} 张 • 原始比例展示</p>
            </div>
          </div>

          <!-- 顶部数据 -->
          <div class="flex gap-2">
            <div class="flex items-center gap-2 px-3 py-1 bg-slate-100/50 rounded-full text-[10px] text-slate-500 font-mono border border-slate-200">
              <el-icon>
                <Timer />
              </el-icon>{{ generationTime }}s
            </div>
            <div class="flex items-center gap-2 px-3 py-1 bg-slate-100/50 rounded-full text-[10px] text-slate-500 font-mono border border-slate-200 cursor-pointer hover:border-[#4E54C8] hover:text-[#4E54C8] transition-colors" @click="$emit('use-seed')">
              <el-icon>
                <Key />
              </el-icon>{{ lastSeed }}
            </div>
          </div>
        </div>

        <!-- B. 画廊主体 (Ambient Grid) -->
        <div class="flex-1 p-4 w-full h-full overflow-hidden">

          <!-- 动态网格容器 -->
          <div class="w-full h-full grid gap-4 transition-all duration-500 ease-out" :class="gridClass">

            <div v-for="(image, index) in generatedImages" :key="index" class="group relative w-full h-full rounded-md overflow-hidden bg-slate-100 ring-1 ring-black/5 shadow-sm hover:shadow-2xl transition-all duration-500" :class="{ 'md:col-span-2 md:row-span-2': generatedImages.length === 3 && index === 0 }">

              <!-- 1. 氛围背景层 (Blur Background) -->
              <!-- 这一层负责撑满盒子，用模糊的图片做背景 -->
              <div class="absolute inset-0 overflow-hidden">
                <img :src="image.url" class="w-full h-full object-cover blur-2xl opacity-60 scale-110 transition-transform duration-700 group-hover:scale-125" />
                <!-- 叠加一层白色遮罩，防止背景太花 -->
                <div class="absolute inset-0 bg-white/30"></div>
              </div>

              <!-- 2. 真实图片层 (Real Image Stage) -->
              <!-- flex + object-contain 保证完整显示且居中 -->
              <div class="absolute inset-0 flex items-center justify-center p-4 md:p-6 z-10 transition-all duration-500 group-hover:scale-[1.02]">
                <img :src="image.url" alt="AI Art" loading="lazy" class="max-w-full max-h-full object-contain rounded-sm shadow-xl shadow-black/10 cursor-zoom-in ring-1 ring-black/5" @click="$emit('show-preview', image.url)" />
              </div>

              <!-- 3. 悬浮交互层 (HUD) -->

              <!-- 左上角编号 -->
              <div class="absolute top-4 left-4 z-20 px-2 py-1 rounded bg-white/20 backdrop-blur-md border border-white/20 text-[10px] text-slate-700 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                IMG_0{{ index + 1 }}
              </div>

              <!-- 右上角预览 -->
              <div class="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0">
                <button class="w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-white/40 text-slate-600 hover:bg-white hover:text-[#4E54C8] shadow-sm transition-all" @click.stop="$emit('show-preview', image.url)">
                  <el-icon>
                    <ZoomIn />
                  </el-icon>
                </button>
              </div>

              <!-- 底部操作栏 -->
              <div class="absolute bottom-6 left-0 w-full flex justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 px-4">
                <div class="flex items-center gap-1 p-1.5 rounded-full bg-white/90 backdrop-blur-xl shadow-2xl border border-white/60">

                  <el-tooltip content="下载原图" placement="top" :hide-after="0" :offset="8">
                    <button class="w-9 h-9 flex items-center justify-center rounded-full text-slate-600 hover:bg-[#4E54C8] hover:text-white transition-colors" @click.stop="$emit('download-image', image.url, index)">
                      <el-icon class="text-lg">
                        <Download />
                      </el-icon>
                    </button>
                  </el-tooltip>

                  <el-tooltip content="复制种子" placement="top" :hide-after="0" :offset="8">
                    <button class="w-9 h-9 flex items-center justify-center rounded-full text-slate-600 hover:bg-[#8F94FB] hover:text-white transition-colors" @click.stop="$emit('use-seed')">
                      <el-icon class="text-lg">
                        <CopyDocument />
                      </el-icon>
                    </button>
                  </el-tooltip>

                  <div class="w-px h-4 bg-slate-300 mx-1"></div>

                  <el-tooltip content="重新生成" placement="top" :hide-after="0" :offset="8">
                    <button class="w-9 h-9 flex items-center justify-center rounded-full text-slate-600 hover:bg-slate-800 hover:text-white transition-colors" @click.stop="$emit('regenerate')">
                      <el-icon class="text-lg">
                        <Refresh />
                      </el-icon>
                    </button>
                  </el-tooltip>

                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </transition>



  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch,computed } from 'vue';
import { Loading, ZoomIn, Download, CopyDocument, Edit, Star, Timer, Key, Refresh, Picture } from "@element-plus/icons-vue";

interface Props {
  generatedImages: { url: string }[];
  loading: boolean;
  progress: number;
  estimatedTime: number;
  generationTime: number | null;
  lastSeed: number | null;
  imageSize: string;
}

const props = defineProps<Props>();

defineEmits<{
  (e: "show-preview", url: string): void;
  (e: "download-image", url: string, index: number): void;
  (e: "use-seed"): void;
  (e: "regenerate"): void;
  (e: "apply-random-template"): void;
}>();

const getAspectRatioStyle = () => {
  const sizeValue = props.imageSize;
  const dimensions = sizeValue.split("x");
  if (dimensions.length === 2) {
    const width = parseInt(dimensions[0]);
    const height = parseInt(dimensions[1]);
    const ratio = (height / width) * 100;
    return { paddingBottom: `${ratio}%`, height: "0" };
  }
  return { paddingBottom: "100%", height: "0" };
};

const scrollToPrompt = () => {
  const promptElement = document.querySelector(".atomic-input textarea");
  if (promptElement) {
    promptElement.scrollIntoView({ behavior: "smooth", block: "center" });
    promptElement.focus();
  }
};
// 动态计算智能网格布局
const gridClass = computed(() => {
  const count = props.generatedImages.length;
  // 核心逻辑：无论几张图，都占满整个容器
  switch (count) {
    case 1:
      // 1张图：全屏
      return 'grid-cols-1 grid-rows-1';
    case 2:
      // 2张图：横向排列 (竖屏可改为 grid-rows-2)
      return 'grid-cols-1 md:grid-cols-2 grid-rows-1';
    case 3:
      // 3张图：左边一张大图，右边两张小图
      return 'grid-cols-1 md:grid-cols-2 md:grid-rows-2';
    case 4:
      // 4张图：标准的田字格
      return 'grid-cols-2 grid-rows-2';
    default:
      return 'grid-cols-2 grid-rows-2';
  }
});


// --- 趣味文案逻辑 ---
const loadingTip = ref("AI 正在思考...");
let tipInterval: any = null;

const funTips = [
  "正在混合像素...",
  "教 AI 学习画画...",
  "正在捕捉灵感...",
  "注入赛博能量...",
  "调整光影细节...",
  "猫咪正在加速...",
  "构建梦境中..."
];

// 当 loading 状态变为 true 时开始轮播文案
watch(() => props.loading, (newVal) => {
  if (newVal) {
    let index = 0;
    loadingTip.value = funTips[0]; // 重置
    tipInterval = setInterval(() => {
      index = (index + 1) % funTips.length;
      loadingTip.value = funTips[index];
    }, 1500); // 每1.5秒换一句话
  } else {
    clearInterval(tipInterval);
  }
});

onUnmounted(() => {
  clearInterval(tipInterval);
});
</script>

<style scoped>
/* 必要的动画定义 */
@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes reverse-spin {
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }

  33% {
    transform: translate(30px, -50px) scale(1.1);
  }

  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }

  100% {
    transform: translate(0px, 0px) scale(1);
  }
}
@keyframes leg-back {
  0% { transform: rotate(0deg) translate(0, 0); }
  50% { transform: rotate(30deg) translate(-2px, -2px); }
  100% { transform: rotate(0deg) translate(0, 0); }
}

/* 2. 前腿迈步 */
@keyframes leg-front {
  0% { transform: rotate(0deg) translate(0, 0); }
  50% { transform: rotate(-30deg) translate(2px, -2px); }
  100% { transform: rotate(0deg) translate(0, 0); }
}

/* 3. 尾巴保持平衡的摆动 */
@keyframes tail-wag {
  0%, 100% { d: path("M14 22C10 22 6 18 6 14"); }
  50% { d: path("M14 22C10 22 6 20 6 18"); }
}

/* 覆盖之前的 run 动画，让身体起伏更像猫 */
.animate-run {
  animation: run-bounce 0.6s ease-in-out infinite;
}

@keyframes run-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-shimmer {
  animation: shimmer 2s linear infinite;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-reverse-spin {
  animation: reverse-spin 25s linear infinite;
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animate-float-delayed-1 {
  animation: float 7s ease-in-out infinite;
  animation-delay: 0s;
}

.animate-float-delayed-2 {
  animation: float 8s ease-in-out infinite;
  animation-delay: 2s;
}

/* 自定义滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 6px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #94a3b8;
}

/* 图片加载前的背景色，防止闪烁 */
.bg-slate-200 {
  background-color: #e2e8f0;
}
</style>

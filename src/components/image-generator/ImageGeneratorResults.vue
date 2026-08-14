<template>
  <!-- Results Deck: MagicForge High-End Visual Studio Workspace -->
  <div class="relative w-full h-full bg-white overflow-hidden font-sans text-zinc-700 flex flex-col select-none">
    
    <!-- 1. EMPTY STATE / INSPIRATION STUDIO (When no image generated yet) -->
    <div v-if="!generatedImages.length && !loading" class="h-full w-full overflow-y-auto custom-scrollbar p-6 sm:p-8 flex flex-col justify-between space-y-6">
      
      <!-- Top Studio Hero Banner -->
      <div class="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <h3 class="text-base font-extrabold text-zinc-900 tracking-tight">
              灵感画廊 · 视觉工坊
            </h3>
            <span class="text-[10px] font-mono px-2 py-0.2 rounded-2xs bg-blue-50 text-blue-700 border border-blue-200/60 font-bold">
              STUDIO CANVAS
            </span>
          </div>
          <p class="text-xs text-zinc-400">
            在左侧调整参数即可实时生成；或点击下方精选艺术风格模板，一键载入前沿提示词与调优参数。
          </p>
        </div>

        <div class="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span>支持 1~4 张批量并行渲染</span>
        </div>
      </div>

      <!-- Inspiration Visual Art Grid (2x3 Balanced Masterpiece Gallery with Rich Graphic Art) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-1">
        <div
          v-for="card in inspirationPresets"
          :key="card.title"
          @click="selectInspiration(card)"
          class="group rounded-xs border border-zinc-200 hover:border-blue-500 bg-white hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
        >
          <!-- Art Header Preview Artwork Window (Rich Vector Illustrated Cover) -->
          <div 
            class="h-36 w-full relative overflow-hidden flex items-end p-3 transition-transform duration-500 group-hover:scale-[1.02]"
            :class="card.gradient"
          >
            <!-- High-quality network background image -->
            <img 
              :src="card.image" 
              :alt="card.title" 
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              crossorigin="anonymous"
              loading="lazy"
              @error="(e: any) => { e.target.style.display = 'none'; }"
            />


            <!-- Gradient Mask for Badges -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>
            
            <!-- Category Tag Badge -->
            <span class="relative z-10 text-[10px] font-mono font-bold px-2 py-0.5 rounded-2xs bg-black/60 text-white backdrop-blur-md border border-white/20">
              {{ card.tag }}
            </span>

            <!-- Top Right Visual Ratio Hint -->
            <span class="absolute top-2.5 right-2.5 z-10 text-[10px] font-mono text-white px-2 py-0.5 rounded-2xs bg-black/50 backdrop-blur-md border border-white/10 font-bold">
              {{ card.ratio }}
            </span>
          </div>

          <!-- Card Body -->
          <div class="p-3.5 flex-1 flex flex-col justify-between space-y-2.5 bg-zinc-50/40 group-hover:bg-blue-50/20 transition-colors">
            <div>
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">
                  {{ card.title }}
                </span>
                <span class="text-blue-600 text-xs font-bold transition-transform group-hover:translate-x-1">→</span>
              </div>
              <p class="text-[11px] text-zinc-500 leading-relaxed line-clamp-2 mt-1">
                {{ card.desc }}
              </p>
            </div>

            <!-- Footer Action & Parameters -->
            <div class="flex items-center justify-between pt-1 border-t border-zinc-200/50 text-[10px] font-mono">
              <span class="text-blue-600 font-bold flex items-center gap-1">
                <span>一键载入此灵感</span>
              </span>
              <span class="text-zinc-400">CFG: {{ card.cfg }} · {{ card.steps }}步</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Studio Capabilities Showcase Bar -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-zinc-100 pt-3">
        <div class="p-3 rounded-xs bg-zinc-50/70 border border-zinc-200/70 flex items-center gap-3">
          <div class="w-8 h-8 rounded-xs bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <div class="text-xs font-bold text-zinc-800">多模态模型集群</div>
            <div class="text-[10px] font-mono text-zinc-400">集成 Kolors、Flux、SD3 引擎</div>
          </div>
        </div>

        <div class="p-3 rounded-xs bg-zinc-50/70 border border-zinc-200/70 flex items-center gap-3">
          <div class="w-8 h-8 rounded-xs bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
          <div>
            <div class="text-xs font-bold text-zinc-800">全画幅比例适配</div>
            <div class="text-[10px] font-mono text-zinc-400">支持 1:1 / 16:9 / 9:16 / 3:4 等构图</div>
          </div>
        </div>

        <div class="p-3 rounded-xs bg-zinc-50/70 border border-zinc-200/70 flex items-center gap-3">
          <div class="w-8 h-8 rounded-xs bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div>
            <div class="text-xs font-bold text-zinc-800">种子级精准复现</div>
            <div class="text-[10px] font-mono text-zinc-400">支持固定 Seed 进行多轮迭代微调</div>
          </div>
        </div>
      </div>

    </div>

    <!-- 2. LOADING STATE (In-progress generation) -->
    <div v-else-if="loading" class="h-full w-full flex flex-col items-center justify-center p-6 space-y-6 text-center">
      <div class="relative w-20 h-20 flex items-center justify-center">
        <!-- Spinning Ambient Ring -->
        <div class="absolute inset-0 rounded-full border-2 border-blue-100 border-t-blue-600 animate-spin"></div>
        <div class="w-10 h-10 rounded-xs bg-blue-50 flex items-center justify-center text-blue-600">
          <svg class="w-5 h-5 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>
      </div>

      <div class="space-y-2 max-w-sm">
        <h4 class="text-sm font-bold text-zinc-900 tracking-wider">
          图像正在渲染生成中
        </h4>
        <p class="text-xs text-zinc-500">
          正在计算隐空间去噪向量，预计耗时约 {{ estimatedTime }} 秒...
        </p>

        <!-- Progress Bar -->
        <div class="w-64 mx-auto bg-zinc-100 rounded-full h-1.5 overflow-hidden border border-zinc-200/80">
          <div 
            class="bg-blue-600 h-full transition-all duration-300 rounded-full"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
        <span class="text-[11px] font-mono text-zinc-400">{{ progress }}%</span>
      </div>
    </div>

    <!-- 3. RESULT STATE (Display generated images: 1 ~ 4 images grid) -->
    <div v-else class="h-full w-full flex flex-col">
      
      <!-- Top Gallery Header -->
      <div class="shrink-0 h-14 px-5 border-b border-zinc-100 flex items-center justify-between bg-white text-xs font-mono">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span class="font-bold text-zinc-800">渲染完成 · 共 {{ generatedImages.length }} 张</span>
          <span v-if="generationTime" class="text-zinc-400">({{ generationTime.toFixed(1) }}秒)</span>
        </div>

        <div class="flex items-center gap-2">
          <span v-if="lastSeed !== null" class="text-zinc-400 hidden sm:inline">Seed: {{ lastSeed }}</span>
          <button 
            @click="$emit('regenerate')" 
            class="px-2.5 py-1 rounded-xs bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-mono text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            <span>重新生成</span>
          </button>
        </div>
      </div>

      <!-- Center Image Preview Area (Flexible Grid for 1, 2, 3, 4 images) -->
      <div class="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-6 bg-zinc-50/50 flex items-center justify-center">
        <div 
          class="w-full max-w-5xl grid gap-4 items-center justify-center"
          :class="[
            generatedImages.length === 1 ? 'grid-cols-1 max-w-2xl' : '',
            generatedImages.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-4xl' : '',
            generatedImages.length >= 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl' : ''
          ]"
        >
          <div 
            v-for="(img, idx) in generatedImages" 
            :key="idx"
            class="group relative w-full rounded-xs overflow-hidden border border-zinc-200 bg-white shadow-md hover:shadow-xl transition-all"
          >
            <img 
              :src="img.url" 
              alt="AI Generated Artwork" 
              class="w-full h-auto max-h-[calc(100vh-280px)] object-cover cursor-pointer transition-transform duration-300 group-hover:scale-[1.01]"
              @click="$emit('show-preview', img.url)"
            />

            <!-- Hover Action Overlay -->
            <div class="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2.5 p-4">
              <button
                @click.stop="$emit('show-preview', img.url)"
                class="p-2 rounded-xs bg-white/90 hover:bg-white text-slate-800 shadow-md transition-all cursor-pointer"
                title="全屏查看"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <polyline points="9 21 3 21 3 15"></polyline>
                  <line x1="21" y1="3" x2="14" y2="10"></line>
                  <line x1="3" y1="21" x2="10" y2="14"></line>
                </svg>
              </button>

              <button
                @click.stop="$emit('download-image', img.url, idx)"
                class="p-2 rounded-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all cursor-pointer"
                title="下载原图"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>

              <button
                v-if="lastSeed !== null"
                @click.stop="$emit('use-seed')"
                class="p-2 rounded-xs bg-white/90 hover:bg-white text-slate-800 shadow-md transition-all cursor-pointer"
                title="使用当前种子"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  generatedImages: { url: string }[];
  loading: boolean;
  progress: number;
  estimatedTime: number;
  generationTime?: number;
  lastSeed: number | null;
  imageSize: string;
}>();

const emit = defineEmits<{
  showPreview: [url: string];
  downloadImage: [url: string, index: number];
  useSeed: [];
  regenerate: [];
  applyInspiration: [prompt: string, negative?: string, cfg?: number, steps?: number];
}>();

const inspirationPresets = [
  {
    type: "cyberpunk",
    title: "赛博东方霓虹夜市",
    tag: "CYBERPUNK",
    desc: "未来科技都市雨夜，全息广告与高频等离子反光，4k电影级光影与湿润路面反射。",
    prompt: "A futuristic cyberpunk oriental night market, neon reflections on wet asphalt, holographic dragons, volumetric fog, cinematic lighting, 8k resolution, Unreal Engine 5 render",
    negative: "blurry, low quality, distorted, extra limbs",
    gradient: "bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-900",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    ratio: "16:9",
    cfg: 7.5,
    steps: 30
  },
  {
    type: "anime",
    title: "新海诚风光晕云海",
    tag: "ANIME",
    desc: "温暖灿烂的黄昏光晕，积雨云与电线杆，唯美动画美学与澄澈蓝天。",
    prompt: "Makoto Shinkai style, breathtaking cumulonimbus clouds, warm golden hour sunlight, railway crossing, cinematic anime aesthetic, ultra-detailed masterpiece",
    negative: "ugly, deformed, photorealistic, noise",
    gradient: "bg-gradient-to-br from-sky-600 via-blue-600 to-amber-500",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop",
    ratio: "16:9",
    cfg: 8.0,
    steps: 28
  },
  {
    type: "ink",
    title: "写意新国风水墨",
    tag: "INK-ART",
    desc: "极简写意山水，浓淡干湿水墨交融，晨雾弥漫，留白与空灵意境深远。",
    prompt: "Traditional Chinese ink wash painting, ethereal mountain landscape in morning mist, minimalist aesthetic, poetic atmosphere, elegant brush strokes, Xuan paper texture",
    negative: "western style, oil painting, 3d, saturated colors",
    gradient: "bg-gradient-to-br from-stone-900 via-neutral-800 to-zinc-700",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    ratio: "4:3",
    cfg: 6.5,
    steps: 35
  },
  {
    type: "scifi",
    title: "超现实量子神殿",
    tag: "SCI-FI",
    desc: "悬浮于星云之中的几何数字架构，微光流转，虚幻引擎5渲染极度精密质感。",
    prompt: "Surreal colossal sci-fi temple floating in deep cosmic nebula, glowing geometric crystalline structures, dark reflective glass floor, epic scale, 8k",
    negative: "lowres, messy, cartoon, overexposed",
    gradient: "bg-gradient-to-br from-slate-950 via-cyan-950 to-blue-950",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    ratio: "16:9",
    cfg: 7.0,
    steps: 30
  },
  {
    type: "film",
    title: "胶片特写微距摄影",
    tag: "FILM-PHOTO",
    desc: "35mm胶片相机真实颗粒感，自然浅景深背景虚化与柔和漫反射光泽。",
    prompt: "Close-up macro photography, delicate dew drops on wild flora, natural soft bokeh, 35mm film grain, Hasselblad medium format camera quality, authentic colors",
    negative: "digital noise, artificial, plastic look",
    gradient: "bg-gradient-to-br from-emerald-950 via-teal-950 to-stone-950",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=800&auto=format&fit=crop",
    ratio: "3:2",
    cfg: 7.0,
    steps: 25
  },
  {
    type: "3d",
    title: "3D治愈系黏土盲盒",
    tag: "3D-RENDER",
    desc: "可爱治愈的3D微缩玩偶，柔和黏土光泽与漫反射全局光照，Octane渲染。",
    prompt: "Cute 3D isometric miniature character figurine, soft pastel colors, smooth clay texture, studio lighting, Octane render, trending on ArtStation",
    negative: "creepy, realistic skin, deformed, flat",
    gradient: "bg-gradient-to-br from-pink-600 via-rose-500 to-amber-400",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    ratio: "1:1",
    cfg: 7.5,
    steps: 30
  }
];

const selectInspiration = (card: typeof inspirationPresets[0]) => {
  emit('applyInspiration', card.prompt, card.negative, card.cfg, card.steps);
};
</script>

<style scoped>
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

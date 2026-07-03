<script setup lang="ts">
const props = defineProps<{
  gameProgress: {
    gaming: number
    study: number
    social: number
    other: number
  }
}>()

// 辅助函数：定义“静谧奢华”风格的颜色逻辑
const getTheme = (value: number, type: 'blue' | 'green' | 'purple' | 'amber') => {
  const isMax = value >= 100;
  
  const styles = {
    blue: {
      // 莫兰迪蓝 / 雾霾蓝
      text: 'text-slate-700',
      accent: 'text-blue-500',
      bar: 'bg-gradient-to-r from-blue-300 to-blue-500',
      shadow: 'group-hover:shadow-blue-100',
      icon: 'text-blue-200'
    },
    green: {
      // 鼠尾草绿
      text: 'text-slate-700',
      accent: 'text-emerald-500',
      bar: 'bg-gradient-to-r from-emerald-300 to-emerald-500',
      shadow: 'group-hover:shadow-emerald-100',
      icon: 'text-emerald-200'
    },
    purple: {
      // 香芋紫
      text: 'text-slate-700',
      accent: 'text-violet-500',
      bar: 'bg-gradient-to-r from-violet-300 to-violet-500',
      shadow: 'group-hover:shadow-violet-100',
      icon: 'text-violet-200'
    },
    amber: {
      // 香槟金
      text: 'text-slate-700',
      accent: 'text-amber-500',
      bar: 'bg-gradient-to-r from-amber-300 to-amber-500',
      shadow: 'group-hover:shadow-amber-100',
      icon: 'text-amber-200'
    }
  };

  const s = styles[type];
  
  return {
    // 卡片：纯白，极柔和阴影，移除边框，改用悬浮感
    card: `bg-white rounded-md p-6 relative overflow-hidden transition-all duration-500 hover:-translate-y-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] ${s.shadow} group`,
    // 文字颜色
    textColor: s.text,
    accentColor: s.accent,
    // 进度条
    barClass: `${s.bar} h-full rounded-full relative overflow-hidden`,
    // 背景大图标
    bgIcon: `absolute -right-4 -bottom-6 text-[5rem] opacity-20 transform rotate-12 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6 ${s.icon}`
  };
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-4 gap-6 font-sans">

    <!-- 1. 游戏技能 -->
    <div :class="getTheme(gameProgress.gaming, 'blue').card">
      <!-- 装饰背景水印 -->
      <div :class="getTheme(gameProgress.gaming, 'blue').bgIcon">🎮</div>
      
      <div class="relative z-10 flex flex-col h-full justify-between min-h-[100px]">
        <!-- 头部：标签 -->
        <div class="flex justify-between items-center mb-2">
          <span class="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">Combat Skills</span>
          <span v-if="gameProgress.gaming >= 100" class="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full tracking-wider">MAX</span>
        </div>

        <!-- 中部：主要数值 (极简大字) -->
        <div class="flex items-baseline gap-1 mt-1 mb-4">
          <span class="text-4xl font-light tracking-tight text-slate-800">
            {{ gameProgress.gaming }}
          </span>
          <span class="text-sm font-medium text-slate-400">%</span>
        </div>

        <!-- 底部：说明与进度条 -->
        <div>
          <div class="flex justify-between items-end mb-2">
            <span class="text-sm font-medium text-slate-600">武学修为</span>
          </div>
          
          <!-- 极细进度条轨道 -->
          <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div :class="getTheme(gameProgress.gaming, 'blue').barClass" :style="`width: ${gameProgress.gaming}%`">
               <!-- 进度条内部流光 (Shimmer) -->
               <div class="absolute top-0 left-0 bottom-0 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. 学习能力 -->
    <div :class="getTheme(gameProgress.study, 'green').card">
      <div :class="getTheme(gameProgress.study, 'green').bgIcon">📚</div>
      
      <div class="relative z-10 flex flex-col h-full justify-between min-h-[100px]">
        <div class="flex justify-between items-center mb-2">
          <span class="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">Wisdom</span>
          <span v-if="gameProgress.study >= 100" class="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full tracking-wider">MAX</span>
        </div>

        <div class="flex items-baseline gap-1 mt-1 mb-4">
          <span class="text-4xl font-light tracking-tight text-slate-800">
            {{ gameProgress.study }}
          </span>
          <span class="text-sm font-medium text-slate-400">%</span>
        </div>

        <div>
          <div class="flex justify-between items-end mb-2">
            <span class="text-sm font-medium text-slate-600">心法悟性</span>
          </div>
          <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div :class="getTheme(gameProgress.study, 'green').barClass" :style="`width: ${gameProgress.study}%`">
               <div class="absolute top-0 left-0 bottom-0 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. 社交关系 -->
    <div :class="getTheme(gameProgress.social, 'purple').card">
      <div :class="getTheme(gameProgress.social, 'purple').bgIcon">👥</div>
      
      <div class="relative z-10 flex flex-col h-full justify-between min-h-[100px]">
        <div class="flex justify-between items-center mb-2">
          <span class="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">Reputation</span>
          <span v-if="gameProgress.social >= 100" class="text-[10px] font-bold text-violet-500 bg-violet-50 px-2 py-0.5 rounded-full tracking-wider">MAX</span>
        </div>

        <div class="flex items-baseline gap-1 mt-1 mb-4">
          <span class="text-4xl font-light tracking-tight text-slate-800">
            {{ gameProgress.social }}
          </span>
          <span class="text-sm font-medium text-slate-400">%</span>
        </div>

        <div>
          <div class="flex justify-between items-end mb-2">
            <span class="text-sm font-medium text-slate-600">江湖名望</span>
          </div>
          <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div :class="getTheme(gameProgress.social, 'purple').barClass" :style="`width: ${gameProgress.social}%`">
               <div class="absolute top-0 left-0 bottom-0 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. 神秘能力 -->
    <div :class="getTheme(gameProgress.other, 'amber').card">
      <div :class="getTheme(gameProgress.other, 'amber').bgIcon">✨</div>
      
      <div class="relative z-10 flex flex-col h-full justify-between min-h-[100px]">
        <div class="flex justify-between items-center mb-2">
          <span class="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">Fortune</span>
          <span v-if="gameProgress.other >= 100" class="text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full tracking-wider">MAX</span>
        </div>

        <div class="flex items-baseline gap-1 mt-1 mb-4">
          <span class="text-4xl font-light tracking-tight text-slate-800">
            {{ gameProgress.other }}
          </span>
          <span class="text-sm font-medium text-slate-400">%</span>
        </div>

        <div>
          <div class="flex justify-between items-end mb-2">
            <span class="text-sm font-medium text-slate-600">天道气运</span>
          </div>
          <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div :class="getTheme(gameProgress.other, 'amber').barClass" :style="`width: ${gameProgress.other}%`">
               <div class="absolute top-0 left-0 bottom-0 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
@keyframes shimmer {
  100% { transform: translateX(100%); }
}
.animate-shimmer {
  animation: shimmer 1.5s infinite;
}
</style>

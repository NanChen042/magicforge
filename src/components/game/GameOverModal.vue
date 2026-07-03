<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  show: boolean
  title: string
  message: string
  type: string // gaming, study, social, other, death, success
}>()

const emit = defineEmits<{
  close: []
}>()

// 图标映射：使用更有代入感的 Emoji 或图标
const icon = computed(() => {
  switch (props.type) {
    case 'death': return '🪦'; // 墓碑，更具武侠死亡感
    case 'success': return '🏆';
    case 'gaming': return '⚔️'; // 剑
    case 'study': return '📜'; // 卷轴
    case 'social': return '🍶'; // 酒壶
    case 'other': return '🔮'; // 水晶球/奇遇
    default: return '✨';
  }
})

// 主题映射：返回一套完整的颜色方案
const theme = computed(() => {
  switch (props.type) {
    case 'death':
      return {
        wrapperBorder: 'border-red-900/50',
        wrapperShadow: 'shadow-[0_0_50px_rgba(220,38,38,0.2)]',
        bgGradient: 'from-red-950/90 to-[#0F1115]',
        iconBg: 'bg-red-900/20',
        iconBorder: 'border-red-500/30',
        iconGlow: 'bg-red-600/30',
        titleColor: 'text-red-500',
        buttonClass: 'bg-gradient-to-r from-red-800 to-red-600 hover:from-red-700 hover:to-red-500 text-red-100 shadow-red-900/50'
      }
    case 'success':
      return {
        wrapperBorder: 'border-emerald-500/30',
        wrapperShadow: 'shadow-[0_0_50px_rgba(16,185,129,0.2)]',
        bgGradient: 'from-emerald-950/90 to-[#0F1115]',
        iconBg: 'bg-emerald-900/20',
        iconBorder: 'border-emerald-400/30',
        iconGlow: 'bg-emerald-500/30',
        titleColor: 'text-emerald-400',
        buttonClass: 'bg-gradient-to-r from-emerald-700 to-emerald-500 hover:from-emerald-600 hover:to-emerald-400 text-emerald-50 shadow-emerald-900/50'
      }
    case 'gaming': // 战斗/武学
      return {
        wrapperBorder: 'border-cyan-500/30',
        wrapperShadow: 'shadow-[0_0_50px_rgba(6,182,212,0.2)]',
        bgGradient: 'from-cyan-950/90 to-[#0F1115]',
        iconBg: 'bg-cyan-900/20',
        iconBorder: 'border-cyan-400/30',
        iconGlow: 'bg-cyan-500/30',
        titleColor: 'text-cyan-400',
        buttonClass: 'bg-gradient-to-r from-cyan-700 to-blue-600 hover:from-cyan-600 hover:to-blue-500 text-cyan-50 shadow-cyan-900/50'
      }
    case 'study': // 修炼
      return {
        wrapperBorder: 'border-teal-500/30',
        wrapperShadow: 'shadow-[0_0_50px_rgba(20,184,166,0.2)]',
        bgGradient: 'from-teal-950/90 to-[#0F1115]',
        iconBg: 'bg-teal-900/20',
        iconBorder: 'border-teal-400/30',
        iconGlow: 'bg-teal-500/30',
        titleColor: 'text-teal-400',
        buttonClass: 'bg-gradient-to-r from-teal-700 to-teal-500 hover:from-teal-600 hover:to-teal-400 text-teal-50 shadow-teal-900/50'
      }
    case 'social': // 江湖
      return {
        wrapperBorder: 'border-violet-500/30',
        wrapperShadow: 'shadow-[0_0_50px_rgba(139,92,246,0.2)]',
        bgGradient: 'from-violet-950/90 to-[#0F1115]',
        iconBg: 'bg-violet-900/20',
        iconBorder: 'border-violet-400/30',
        iconGlow: 'bg-violet-500/30',
        titleColor: 'text-violet-400',
        buttonClass: 'bg-gradient-to-r from-violet-700 to-purple-600 hover:from-violet-600 hover:to-purple-500 text-violet-50 shadow-violet-900/50'
      }
    case 'other': // 奇遇/默认
    default:
      return {
        wrapperBorder: 'border-amber-500/30',
        wrapperShadow: 'shadow-[0_0_50px_rgba(245,158,11,0.2)]',
        bgGradient: 'from-amber-950/90 to-[#0F1115]',
        iconBg: 'bg-amber-900/20',
        iconBorder: 'border-amber-400/30',
        iconGlow: 'bg-amber-500/30',
        titleColor: 'text-amber-400',
        buttonClass: 'bg-gradient-to-r from-amber-700 to-orange-600 hover:from-amber-600 hover:to-orange-500 text-amber-50 shadow-amber-900/50'
      }
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <!-- 遮罩层：更深的黑色，强调沉浸感 -->
      <div
        v-if="show"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      >
        <Transition
          enter-active-class="transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)"
          enter-from-class="opacity-0 scale-90 translate-y-8"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <!-- 卡片本体 -->
          <div
            v-if="show"
            class="relative w-full max-w-md overflow-hidden rounded-md border backdrop-blur-xl"
            :class="[theme.wrapperBorder, theme.wrapperShadow]"
          >
            <!-- 背景光效 -->
            <div class="absolute inset-0 bg-gradient-to-b" :class="theme.bgGradient"></div>
            
            <!-- 噪点纹理 -->
            <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none"></div>

            <div class="relative p-8 text-center flex flex-col items-center">
              
              <!-- 图标容器：徽章风格 -->
              <div class="relative w-24 h-24 mb-6 group cursor-default">
                 <!-- 呼吸光环 -->
                 <div class="absolute inset-0 rounded-full blur-xl animate-pulse-slow" :class="theme.iconGlow"></div>
                 <!-- 核心 -->
                 <div class="relative w-full h-full rounded-full border-2 flex items-center justify-center text-5xl shadow-2xl" 
                   :class="[theme.iconBg, theme.iconBorder]"
                 >
                    <span class="filter drop-shadow-md transform group-hover:scale-110 transition-transform duration-500">{{ icon }}</span>
                 </div>
              </div>

              <!-- 标题：增加装饰线 -->
              <div class="flex items-center gap-3 w-full mb-4 opacity-80">
                 <div class="h-[1px] flex-1 bg-gradient-to-r from-transparent to-slate-500/50"></div>
                 <h2 class="text-2xl font-bold tracking-wider" :class="theme.titleColor">{{ title }}</h2>
                 <div class="h-[1px] flex-1 bg-gradient-to-l from-transparent to-slate-500/50"></div>
              </div>

              <!-- 消息文本 -->
              <p class="text-slate-300 text-sm leading-relaxed mb-8 whitespace-pre-line font-medium opacity-90">
                {{ message }}
              </p>

              <!-- 操作按钮：流光效果 -->
              <button
                @click="emit('close')"
                class="relative w-full py-3.5 rounded-sm font-bold text-sm uppercase tracking-[0.1em] transition-all transform hover:-translate-y-1 hover:shadow-xl active:scale-[0.98] overflow-hidden group shadow-lg"
                :class="theme.buttonClass"
              >
                <!-- 按钮内容 -->
                <span class="relative z-10 flex items-center justify-center gap-2">
                   <span>{{ type === 'death' ? '胜败乃兵家常事' : '继续征程' }}</span>
                   <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                </span>
                
                <!-- 内部流光 -->
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine"></div>
              </button>

            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* 慢速呼吸 */
@keyframes pulseSlow {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.8; }
}
.animate-pulse-slow {
  animation: pulseSlow 3s ease-in-out infinite;
}

/* 按钮扫光 */
@keyframes shine {
  100% { transform: translateX(100%); }
}
.animate-shine {
  animation: shine 0.6s linear;
}
</style>

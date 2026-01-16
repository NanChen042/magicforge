<script setup lang="ts">
import { ref } from 'vue'

// 定义事件
const emit = defineEmits<{
  startGame: [playerName: string]
  updateApiConfig: [config: { apiKey: string; model: string }]
}>()

// 状态
const playerName = ref('')
const apiKey = ref('')
const modelName = ref('Qwen/Qwen2.5-7B-Instruct')
const customModelName = ref('')
const showConfig = ref(false)

// 设置模型
const setModel = (model: string) => {
  modelName.value = model
  emit('updateApiConfig', { apiKey: apiKey.value, model })
}

// 设置自定义模型
const setCustomModel = () => {
  if (customModelName.value?.trim()) {
    setModel(customModelName.value.trim())
    customModelName.value = ''
  }
}

// 开始游戏
const handleStartGame = () => {
  if (!playerName.value) {
    return
  }
  emit('updateApiConfig', { apiKey: apiKey.value, model: modelName.value })
  emit('startGame', playerName.value)
}
</script>
<template>
  <div class="relative min-h-screen w-full overflow-hidden bg-[#F2F3F5] text-slate-900 font-sans selection:bg-amber-600 selection:text-white flex items-center justify-center">
    
    <!-- ==================== 1. 沉浸式氛围背景 ==================== -->
    <div class="absolute inset-0 pointer-events-none z-0">
      <!-- 水墨/烟雾流动底图 -->
      <img 
        src="https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?q=80&w=2592&auto=format&fit=crop" 
        class="absolute inset-0 w-full h-full object-cover opacity-[0.08] mix-blend-multiply filter contrast-125 grayscale animate-slow-pan"
        alt="Texture"
      />
      
      <!-- 动态粒子 (模拟空中的尘埃/剑气) -->
      <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      
      <!-- 装饰性大字背景 -->
      <div class="absolute top-10 left-10 text-[12rem] font-black text-slate-900/[0.03] leading-none select-none" style="font-family: 'Times New Roman', serif;">
        SWORD
      </div>
      <div class="absolute bottom-[-5%] right-0 text-[15rem] font-black text-slate-900/[0.03] leading-none select-none" style="font-family: 'Times New Roman', serif;">
        LEGEND
      </div>
    </div>

    <!-- ==================== 2. 游戏主界面 UI ==================== -->
    <div class="relative z-10 w-full max-w-[480px] p-6">
      
      <!-- 主容器：游戏风格的切角卡片 -->
      <div class="relative bg-white shadow-2xl transition-all duration-500 animate-slide-up group">
        
        <!-- 装饰：四角边框 (Corner Brackets) -->
        <div class="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-slate-900 transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:border-amber-500/50"></div>
        <div class="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-slate-900 transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:border-amber-500/50"></div>

        <div class="relative p-10 sm:p-12 overflow-hidden">
          <!-- 内部装饰线 -->
          <div class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <!-- A. 标题区域 -->
          <div class="text-center mb-12">
            <div class="mb-4 flex justify-center">
              <!-- Logo 图标 -->
              <div class="w-16 h-16 bg-slate-900 text-white flex items-center justify-center text-3xl shadow-lg transform rotate-45 border-4 border-white outline outline-1 outline-slate-200">
                <span class="-rotate-45">⚔️</span>
              </div>
            </div>
            
            <h1 class="text-5xl font-black text-slate-900 tracking-tighter mb-2 font-serif">
              剑道<span class="text-amber-600">传奇</span>
            </h1>
            <div class="flex items-center justify-center gap-3 text-xs font-bold tracking-[0.3em] text-slate-400 uppercase">
              <span class="w-4 h-[2px] bg-amber-500"></span>
              The Awakening
              <span class="w-4 h-[2px] bg-amber-500"></span>
            </div>
          </div>

          <!-- B. 输入区域 -->
          <div class="space-y-8">
            <div class="relative group/input">
              <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Identity Verification
              </label>
              <div class="relative">
                <input
                  v-model="playerName"
                  type="text"
                  class="peer w-full bg-slate-50 text-slate-900 text-center font-bold text-xl py-4 px-4 border-b-2 border-slate-200 focus:border-amber-500 focus:bg-white outline-none transition-all duration-300 placeholder:text-slate-300 placeholder:font-normal"
                  placeholder="ENTER YOUR NAME"
                  @keyup.enter="handleStartGame"
                />
                <!-- 输入框下面的扫描线 -->
                <div class="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-600 transition-all duration-500 peer-focus:w-full"></div>
                <!-- 右侧的小状态灯 -->
                <div class="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-colors duration-300"
                  :class="playerName ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-slate-300'"
                ></div>
              </div>
            </div>

            <!-- C. 启动按钮 -->
            <button
              @click="handleStartGame"
              :disabled="!playerName"
              class="relative w-full h-16 bg-slate-900 text-white font-bold text-lg uppercase tracking-widest transition-all duration-300 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-900 group/btn overflow-hidden"
              style="clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);"
            >
              <!-- 按钮内部动画 -->
              <span class="relative z-10 flex items-center justify-center gap-3 group-hover/btn:scale-105 transition-transform">
                START JOURNEY
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </span>
              <!-- 扫光特效 -->
              <div class="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
            </button>
          </div>

          <!-- D. 系统状态 / 高级设置 -->
          <div class="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
            <div class="flex items-center gap-2">
              <div class="flex space-x-1">
                <span class="w-1 h-3 bg-slate-900 animate-pulse"></span>
                <span class="w-1 h-2 bg-slate-900/50"></span>
                <span class="w-1 h-4 bg-slate-900/30"></span>
              </div>
              <span class="text-[10px] font-mono text-slate-400">SYSTEM READY</span>
            </div>

            <button 
              @click="showConfig = !showConfig"
              class="text-[10px] font-bold text-slate-400 hover:text-amber-600 uppercase tracking-wider transition-colors flex items-center gap-1"
            >
              <span class="text-lg leading-none" :class="{ 'rotate-90': showConfig }">⚙</span>
              Config
            </button>
          </div>

          <!-- 折叠的配置面板 -->
          <div v-show="showConfig" class="mt-4 bg-slate-50 p-4 border border-slate-200 animate-fade-in text-left" style="clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);">
             <div class="space-y-3">
                <div>
                   <label class="text-[10px] font-bold text-slate-400 block mb-1">API MODEL</label>
                   <select v-model="modelName" class="w-full bg-white border border-slate-200 text-xs py-2 px-2 font-mono outline-none focus:border-amber-500">
                      <option value="deepseek-ai/DeepSeek-R1-Distill-Qwen-7B">DeepSeek-R1-Distill</option>
                      <option value="deepseek-r1">DeepSeek-R1-Native</option>
                   </select>
                </div>
                <div>
                   <label class="text-[10px] font-bold text-slate-400 block mb-1">API KEY</label>
                   <input v-model="apiKey" type="password" placeholder="SECRET_KEY..." class="w-full bg-white border border-slate-200 text-xs py-2 px-2 font-mono outline-none focus:border-amber-500">
                </div>
             </div>
          </div>

        </div>
      </div>
      
      <!-- 底部版权 -->
      <div class="text-center mt-8 opacity-40 hover:opacity-100 transition-opacity duration-500">
         <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" class="h-4 inline-block grayscale mr-2" />
         <span class="text-[10px] font-mono text-slate-900">POWERED BY VUE 3 & DEEPSEEK</span>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* 背景缓慢平移 */
@keyframes slowPan {
  0% { transform: scale(1.1) translate(0, 0); }
  50% { transform: scale(1.15) translate(-1%, -1%); }
  100% { transform: scale(1.1) translate(0, 0); }
}
.animate-slow-pan {
  animation: slowPan 30s ease-in-out infinite;
}

/* 进场动画 */
.animate-slide-up {
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(40px);
}
@keyframes slideUp {
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
<template>
  <div class="absolute inset-0 w-full h-full pointer-events-none overflow-hidden transition-all duration-700">
    <!-- 1. 默认列车客舱背景 (Train Carriage) -->
    <div 
      v-if="cgType === 'carriage'" 
      class="absolute inset-0 w-full h-full animate-fade-in"
    >
      <!-- Panoramic Window Earth View -->
      <div class="absolute top-0 left-0 right-0 h-[60%] bg-gradient-to-b from-[#0f172a] via-[#1e3a8a] to-[#38bdf8]/30 flex items-center justify-center overflow-hidden">
        <!-- Distant Glowing Earth Arc -->
        <div class="absolute -top-[120px] w-[900px] h-[550px] rounded-[100%] bg-gradient-to-b from-[#38bdf8] via-[#0284c7] to-[#0f172a] opacity-80 blur-[2px] border-b-4 border-cyan-200/60 shadow-[0_0_80px_rgba(56,189,248,0.6)]"></div>
        <div class="absolute top-12 left-1/4 w-32 h-16 bg-white/20 rounded-full blur-xl"></div>
      </div>

      <!-- Carriage Interior Perspective Frame -->
      <svg class="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 1000 600" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#cbd5e1" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#64748b" stop-opacity="0.6"/>
          </linearGradient>
        </defs>
        <!-- Window Pillars -->
        <line x1="200" y1="0" x2="150" y2="600" stroke="#334155" stroke-width="4" />
        <line x1="500" y1="0" x2="500" y2="600" stroke="#334155" stroke-width="6" />
        <line x1="800" y1="0" x2="850" y2="600" stroke="#334155" stroke-width="4" />
        <!-- Neon Roof Beam -->
        <rect x="0" y="20" width="1000" height="8" fill="#38bdf8" opacity="0.6"/>
      </svg>
    </div>

    <!-- 2. 维护层狭窄机械走廊 (Maintenance Corridor) -->
    <div 
      v-else-if="cgType === 'corridor'" 
      class="absolute inset-0 w-full h-full bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#090d16] animate-fade-in"
    >
      <svg class="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 1000 600" preserveAspectRatio="none">
        <!-- Tunnel Perspective Lines -->
        <line x1="500" y1="280" x2="0" y2="0" stroke="#0284c7" stroke-width="2" stroke-dasharray="6,6"/>
        <line x1="500" y1="280" x2="1000" y2="0" stroke="#0284c7" stroke-width="2" stroke-dasharray="6,6"/>
        <line x1="500" y1="280" x2="0" y2="600" stroke="#f59e0b" stroke-width="3"/>
        <line x1="500" y1="280" x2="1000" y2="600" stroke="#f59e0b" stroke-width="3"/>
        <!-- Amber Caution Lighting -->
        <circle cx="500" cy="280" r="40" fill="#f59e0b" opacity="0.15" filter="blur(10px)"/>
        <circle cx="500" cy="280" r="10" fill="#fef08a" opacity="0.4"/>
      </svg>
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
    </div>

    <!-- 3. ORACLE 核心控制舱 (Core Chamber / Oracle Sphere) -->
    <div 
      v-else-if="cgType === 'core'" 
      class="absolute inset-0 w-full h-full bg-gradient-to-b from-[#030712] via-[#0b1329] to-[#020617] animate-fade-in flex items-center justify-center"
    >
      <!-- Gigantic Glowing White Holographic Sphere -->
      <div class="relative w-[360px] h-[360px] rounded-full bg-gradient-to-br from-white via-cyan-100 to-blue-300 shadow-[0_0_120px_rgba(56,189,248,0.7)] flex items-center justify-center animate-pulse">
        <div class="w-[300px] h-[300px] rounded-full border border-cyan-300/60 animate-spin" style="animation-duration: 20s;"></div>
        <div class="absolute w-[440px] h-[440px] rounded-full border border-blue-400/30 animate-spin" style="animation-duration: 35s; animation-direction: reverse;"></div>
      </div>
      <div class="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-cyan-950/40 to-transparent"></div>
    </div>

    <!-- 4. 逃生舱脱离俯瞰晨昏线 (Escape Pod Window) -->
    <div 
      v-else-if="cgType === 'escape'" 
      class="absolute inset-0 w-full h-full bg-[#030712] animate-fade-in flex items-center justify-center"
    >
      <!-- Circular Porthole Frame -->
      <div class="w-[520px] h-[520px] rounded-full border-[18px] border-slate-800 shadow-[inset_0_0_80px_rgba(0,0,0,0.8),0_0_100px_rgba(56,189,248,0.3)] overflow-hidden relative flex items-center justify-center bg-gradient-to-b from-[#0f172a] via-[#1e3a8a] to-[#38bdf8]">
        <!-- Earth Curve in Porthole -->
        <div class="absolute bottom-[-100px] w-[700px] h-[400px] rounded-full bg-gradient-to-t from-[#0284c7] via-[#38bdf8] to-white opacity-85 blur-[1px]"></div>
        <!-- Distant Train Light Dot -->
        <div class="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_12px_#38bdf8] animate-ping"></div>
      </div>
    </div>

    <!-- 5. 终极真结局 · 破晓晨光 (True Dawn Miracle) -->
    <div 
      v-else-if="cgType === 'dawn'" 
      class="absolute inset-0 w-full h-full bg-gradient-to-b from-[#1e1b4b] via-[#ea580c]/30 to-[#fde047]/50 animate-fade-in overflow-hidden flex items-end justify-center"
    >
      <!-- Majestic Golden Sunrise Sunburst -->
      <div class="absolute -bottom-32 w-[900px] h-[500px] rounded-full bg-gradient-to-t from-[#fef08a] via-[#fdba74] to-transparent blur-2xl opacity-90"></div>
      <!-- Golden God Rays -->
      <svg class="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 1000 600" preserveAspectRatio="none">
        <polygon points="500,600 0,0 200,0" fill="#fef08a"/>
        <polygon points="500,600 350,0 550,0" fill="#fef08a"/>
        <polygon points="500,600 700,0 900,0" fill="#fde047"/>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  sceneId: string;
}>();

const cgType = computed(() => {
  const id = props.sceneId;
  if (id.includes('dawn') || id === 'scene_true_02' || id === 'ending_true_dawn') return 'dawn';
  if (id.includes('escape') || id.includes('ending_normal')) return 'escape';
  if (id.includes('core') || id.includes('oracle') || id.includes('ending_bad_conductor')) return 'core';
  if (id.includes('maintenance') || id.includes('corridor') || id.includes('rear') || id.includes('archive')) return 'corridor';
  return 'carriage';
});
</script>

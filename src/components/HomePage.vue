<template>
  <div class="min-h-screen bg-[#F8FAFC] selection:bg-indigo-500/30 text-slate-800 font-sans w-full">
    <!-- 1. 全宽首屏 Hero 区域 (背景 100% 视口满屏无缝铺满，文字居中) -->
    <HeroSection />

    <!-- 2. 核心内容标准版心容器 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <ValueShowcase />
      <CoreArchitecture />
      <CapabilitiesMatrix />
      <CodeShowcase />
    </div>
    <MainFooter />
  </div>
</template>

<script setup lang="ts">
import HeroSection from './home/HeroSection.vue'
import ValueShowcase from './home/ValueShowcase.vue'
import CoreArchitecture from './home/CoreArchitecture.vue'
import CapabilitiesMatrix from './home/CapabilitiesMatrix.vue'
import CodeShowcase from './home/CodeShowcase.vue'
import MainFooter from './home/MainFooter.vue'
</script>

<style>
/* 
   === 3. 铁轨飞逝动画 === 
   模拟地面纹理高速向后移动
*/
.track-lines {
  animation: trackMove 0.5s linear infinite;
  /* 0.5s 极快循环 */
  transform-origin: bottom;
  transform: perspective(100px) rotateX(45deg);
  /* 3D 透视效果 */
}

@keyframes trackMove {
  from {
    background-position: 0 0;
  }

  to {
    background-position: 0 40px;
  }

  /* 对应 bg-size 的高度 */
}

/* 之前其他的动画(star-bg, speed-line)请保留 */
.perspective-track {
  perspective: 200px;
  transform-style: preserve-3d;
}

/* ============================================================================
   全局动画定义 (非 scoped，避免 Vue 哈希冲突)
   ============================================================================ */

/* 1. 星空移动动画 */
.star-bg {
  animation: moveStars 60s linear infinite;
}

@keyframes moveStars {
  from {
    background-position: 0 0;
  }

  to {
    background-position: -1000px 0;
  }
}

/* 2. 速度线飞逝动画 */
.speed-line {
  transform: translateX(100%);
  animation: flyLines 2s linear infinite;
}

@keyframes flyLines {
  0% {
    transform: translateX(100%) scaleX(0.5);
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  100% {
    transform: translateX(-150%) scaleX(1.5);
    opacity: 0;
  }
}

/* 3. 悬浮动画 */
@keyframes floatSlow {

  0%,
  100% {
    transform: translateY(0) rotate(-6deg);
  }

  50% {
    transform: translateY(-15px) rotate(-3deg);
  }
}

.animate-float-slow {
  animation: floatSlow 6s ease-in-out infinite;
}

/* 4. 极慢速旋转 (顺时针) */
@keyframes spinSlower {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slower {
  animation: spinSlower 20s linear infinite;
}

/* 5. 极慢速旋转 (逆时针) */
@keyframes reverseSpin {
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
}

.animate-reverse-spin {
  animation: reverseSpin 25s linear infinite;
}

/* 6. 淡入上升动画 */
.animate-fade-in-up {
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(15px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 7. 延迟类 */
.animation-delay-200 {
  animation-delay: 0.15s;
}

.animation-delay-400 {
  animation-delay: 0.3s;
}

.animation-delay-600 {
  animation-delay: 0.45s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* 8. 文字流光动画 */
.animate-gradient-x {
  background-size: 200% auto;
  animation: gradientX 3s linear infinite;
}

@keyframes gradientX {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 200% 50%;
  }
}

/* 9. Blob 动画 */
.animate-blob {
  animation: blob 7s infinite;
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

/* 10. 扫描线动画 */
@keyframes scan {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}

.animate-scan {
  animation: scan 4s linear infinite;
}

/* 11. 快速扫描动画 */
@keyframes scan-fast {
  0% {
    transform: translateX(-100%);
  }

  50%,
  100% {
    transform: translateX(100%);
  }
}

/* 12. 缓慢缩放动画 */
@keyframes slowZoom {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

.animate-slow-zoom {
  animation: slowZoom 20s ease-in-out infinite;
}

/* 13. 微光划过动画 */
@keyframes shine {
  100% {
    transform: translateX(100%);
  }
}

/* 14. 网格流动动画 */
@keyframes gridFlow {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 0 40px;
  }
}

.animate-grid-flow {
  animation: gridFlow 3s linear infinite;
}

/* 15. 数据流下落动画 */
@keyframes drop {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(500%);
  }
}

.animate-drop {
  animation: drop 4s cubic-bezier(0.4, 0.26, 0, 0.97) infinite;
}

/* 16. 滚动条样式 (用于代码块) */
pre::-webkit-scrollbar {
  height: 6px;
}

pre::-webkit-scrollbar-track {
  background: transparent;
}

pre::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}
</style>

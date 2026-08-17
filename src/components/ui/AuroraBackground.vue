<template>
  <div 
    ref="containerRef"
    class="relative w-full overflow-hidden bg-white text-slate-950 flex flex-col items-center justify-center min-h-[85vh] lg:min-h-[92vh]"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    @mouseenter="handleMouseEnter"
    @click="handleClick"
  >
    <!-- 背景流体渐变与 ASMR 物理交互点阵层 (Pure White + Light Blue Theme) -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden select-none">
      
      <!-- 柔和淡蓝弥散环境光晕 (Soft Light Blue Ambient Gradients) -->
      <div class="absolute -top-[12%] left-[12%] w-[620px] h-[620px] rounded-full bg-gradient-to-br from-sky-200/35 via-blue-100/25 to-transparent blur-[110px] pointer-events-none" />
      <div class="absolute top-[25%] right-[10%] w-[680px] h-[680px] rounded-full bg-gradient-to-bl from-blue-200/30 via-indigo-100/20 to-transparent blur-[120px] pointer-events-none" />
      <div class="absolute -bottom-[8%] left-[28%] w-[520px] h-[420px] rounded-full bg-gradient-to-t from-sky-100/35 to-transparent blur-[100px] pointer-events-none" />

      <!-- 鼠标互动聚光光晕 (Interactive Ambient Spotlight) -->
      <div 
        class="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        :style="spotlightStyle"
      />

      <!-- ASMR 物理弹性推力点阵 Canvas -->
      <canvas 
        ref="canvasRef" 
        class="absolute inset-0 w-full h-full pointer-events-none"
      />

    </div>

    <!-- 前景内容插槽 -->
    <div class="relative z-10 w-full">
      <slot />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const containerRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

// 鼠标位置与交互状态
const mouse = ref({
  x: -1000,
  y: -1000,
  targetX: -1000,
  targetY: -1000,
  active: false,
  radius: 130,       // 影响半径
  pushForce: 45      // 弹性排斥力度 (ASMR 质感)
})

// 点击冲击波涟漪列表
interface Ripple {
  x: number
  y: number
  radius: number
  maxRadius: number
  strength: number
  alpha: number
}
let ripples: Ripple[] = []

const spotlightStyle = computed(() => {
  if (!mouse.value.active) {
    return { opacity: '0' }
  }
  return {
    opacity: '1',
    background: `radial-gradient(circle 380px at ${mouse.value.x}px ${mouse.value.y}px, rgba(56, 189, 248, 0.12), rgba(59, 130, 246, 0.03) 60%, transparent 80%)`
  }
})

function handleMouseMove(e: MouseEvent) {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  mouse.value.targetX = e.clientX - rect.left
  mouse.value.targetY = e.clientY - rect.top
  mouse.value.active = true
}

function handleMouseEnter(e: MouseEvent) {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  mouse.value.x = e.clientX - rect.left
  mouse.value.y = e.clientY - rect.top
  mouse.value.targetX = mouse.value.x
  mouse.value.targetY = mouse.value.y
  mouse.value.active = true
}

function handleMouseLeave() {
  mouse.value.active = false
  mouse.value.targetX = -1000
  mouse.value.targetY = -1000
}

function handleClick(e: MouseEvent) {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const clickX = e.clientX - rect.left
  const clickY = e.clientY - rect.top

  ripples.push({
    x: clickX,
    y: clickY,
    radius: 5,
    maxRadius: 220,
    strength: 35,
    alpha: 1
  })
}

// ASMR 物理网格点对象定义
interface ASMRDot {
  originX: number
  originY: number
  x: number
  y: number
  vx: number
  vy: number
  baseRadius: number
  radius: number
  alpha: number
  color: string
}

let dots: ASMRDot[] = []
let animationFrameId: number | null = null

// 初始化整齐阵列的点阵网格
function initDotGrid(width: number, height: number) {
  dots = []
  const spacing = 30 // 点与点间距 (px)
  const cols = Math.ceil(width / spacing) + 1
  const rows = Math.ceil(height / spacing) + 1

  const startX = (width - (cols - 1) * spacing) / 2
  const startY = (height - (rows - 1) * spacing) / 2

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const originX = startX + c * spacing
      const originY = startY + r * spacing

      dots.push({
        originX,
        originY,
        x: originX,
        y: originY,
        vx: 0,
        vy: 0,
        baseRadius: 1.6,
        radius: 1.6,
        alpha: 0.28,
        color: '#94a3b8'
      })
    }
  }
}

function render() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1
  const width = canvas.width / dpr
  const height = canvas.height / dpr

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.save()
  ctx.scale(dpr, dpr)

  // 鼠标位置阻尼平滑逼近 (Smooth Lerp)
  mouse.value.x += (mouse.value.targetX - mouse.value.x) * 0.25
  mouse.value.y += (mouse.value.targetY - mouse.value.y) * 0.25

  // 更新与推进涟漪
  for (let i = ripples.length - 1; i >= 0; i--) {
    const rip = ripples[i]
    rip.radius += 5
    rip.alpha = 1 - (rip.radius / rip.maxRadius)
    if (rip.radius >= rip.maxRadius) {
      ripples.splice(i, 1)
    }
  }

  const spring = 0.08      // 回弹弹力常数
  const friction = 0.82    // 阻尼摩擦系数

  // 物理模拟与绘制每个点
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i]

    let targetX = dot.originX
    let targetY = dot.originY
    let isDisplaced = false

    // 1. 鼠标排斥磁场 (ASMR 触感推挤效果)
    if (mouse.value.active) {
      const dx = mouse.value.x - dot.x
      const dy = mouse.value.y - dot.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < mouse.value.radius && dist > 0) {
        const force = (1 - dist / mouse.value.radius)
        const pushDist = force * mouse.value.pushForce
        targetX = dot.originX - (dx / dist) * pushDist
        targetY = dot.originY - (dy / dist) * pushDist
        isDisplaced = true
      }
    }

    // 2. 涟漪波纹物理推挤
    for (let r = 0; r < ripples.length; r++) {
      const rip = ripples[r]
      const rdx = dot.x - rip.x
      const rdy = dot.y - rip.y
      const rdist = Math.sqrt(rdx * rdx + rdy * rdy)
      const ringDist = Math.abs(rdist - rip.radius)

      if (ringDist < 25 && rdist > 0) {
        const rForce = (1 - ringDist / 25) * rip.alpha * rip.strength
        targetX += (rdx / rdist) * rForce
        targetY += (rdy / rdist) * rForce
        isDisplaced = true
      }
    }

    // 弹簧物理方程 (Hooke's Law with damping)
    const ax = (targetX - dot.x) * spring
    const ay = (targetY - dot.y) * spring

    dot.vx = (dot.vx + ax) * friction
    dot.vy = (dot.vy + ay) * friction

    dot.x += dot.vx
    dot.y += dot.vy

    // 动态计算位移偏移量
    const currentDisplacement = Math.sqrt(
      Math.pow(dot.x - dot.originX, 2) + Math.pow(dot.y - dot.originY, 2)
    )

    // 动态渐变颜色与大小过渡 (由静止淡蓝灰平滑升温为极光科技蓝)
    const activeFactor = Math.min(currentDisplacement / 25, 1)
    
    // 半径随位移与鼠标距离放大
    dot.radius = dot.baseRadius + activeFactor * 1.8
    dot.alpha = 0.22 + activeFactor * 0.65

    // 绘制圆点
    ctx.beginPath()
    ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)

    if (activeFactor > 0.15) {
      // 受挤压点亮：高亮淡蓝 / 天青渐变光斑
      ctx.fillStyle = `rgba(37, 99, 235, ${dot.alpha})`
      ctx.shadowColor = 'rgba(56, 189, 248, 0.6)'
      ctx.shadowBlur = 8 * activeFactor
    } else {
      // 静态未被挤压：柔和淡蓝灰
      ctx.fillStyle = `rgba(148, 163, 184, ${dot.alpha})`
      ctx.shadowBlur = 0
    }

    ctx.fill()
  }

  ctx.restore()
  animationFrameId = requestAnimationFrame(render)
}

function handleResize() {
  const canvas = canvasRef.value
  const container = containerRef.value
  if (!canvas || !container) return

  const rect = container.getBoundingClientRect()
  const dpr = window.devicePixelRatio || 1

  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr

  initDotGrid(rect.width, rect.height)
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  animationFrameId = requestAnimationFrame(render)
})

onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
</style>

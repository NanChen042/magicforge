<template>
  <main class="w-full">
    <div
      class="relative flex flex-col min-h-[85vh] lg:h-[100vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition-colors w-full overflow-hidden"
      :class="className"
    >
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          class="aurora-element absolute -inset-[10px] opacity-50 will-change-transform pointer-events-none"
          :class="{ 'has-radial-gradient': showRadialGradient }"
        ></div>
      </div>
      <slot />
    </div>
  </main>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    className?: string;
    showRadialGradient?: boolean;
  }>(),
  {
    className: '',
    showRadialGradient: true,
  }
);
</script>

<style scoped>
.aurora-element {
  --white: #ffffff;
  --black: #000000;
  --transparent: transparent;
  --blue-500: #3b82f6;
  --indigo-300: #a5b4fc;
  --blue-300: #93c5fd;
  --violet-200: #ddd6fe;
  --blue-400: #60a5fa;

  --white-gradient: repeating-linear-gradient(100deg, var(--white) 0%, var(--white) 7%, var(--transparent) 10%, var(--transparent) 12%, var(--white) 16%);
  --dark-gradient: repeating-linear-gradient(100deg, var(--black) 0%, var(--black) 7%, var(--transparent) 10%, var(--transparent) 12%, var(--black) 16%);
  --aurora: repeating-linear-gradient(100deg, var(--blue-500) 10%, var(--indigo-300) 15%, var(--blue-300) 20%, var(--violet-200) 25%, var(--blue-400) 30%);

  background-image: var(--white-gradient), var(--aurora);
  background-size: 300% 200%;
  background-position: 50% 50%, 50% 50%;
  filter: blur(10px) invert(1);
}

.aurora-element.has-radial-gradient {
  mask-image: radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%);
}

.aurora-element::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: var(--white-gradient), var(--aurora);
  background-size: 200% 100%;
  background-attachment: fixed;
  mix-blend-mode: difference;
  animation: aurora 60s linear infinite;
}

@keyframes aurora {
  from {
    background-position: 50% 50%, 50% 50%;
  }
  to {
    background-position: 350% 50%, 350% 50%;
  }
}
</style>

<template>
  <div class="relative h-screen flex items-center justify-center">
    <div class="gradient" />
    <AppLogo class="absolute top-4" />
    <slot />
  </div>
</template>

<style scoped>
.gradient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(50% 50% at 50% 50%, rgb(var(--color-primary-500) / 25%) 0, #fff 100%);
}
.dark {
  .gradient {
    background: radial-gradient(50% 50% at 50% 50%, rgb(var(--color-primary-400) / 10%) 0, rgb(var(--color-gray-950)) 100%);
  }
}
</style>

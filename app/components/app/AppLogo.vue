<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <NuxtLink :to="localePath('/')">
    <SvgLogo class="w-auto h-6" />
  </NuxtLink>
</template>

<script setup lang="ts">
useHead({
  link: [{ rel: "icon", href: "/favicon.ico" }],
  titleTemplate: (title) => (title ? `${title} | Equinuxt` : "Event AI"),
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

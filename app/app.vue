<script setup lang="ts">
const head = useLocaleHead({ addDirAttribute: true, identifierAttribute: "id", addSeoAttributes: true });
useHead({
  htmlAttrs: { ...head.value.htmlAttrs },
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

<script setup lang="ts">
import { description } from "../package.json";

const colorMode = useColorMode();
const color = computed(() => (colorMode.value === "dark" ? "#171717" : "white"));

const head = useLocaleHead({ addDirAttribute: true, identifierAttribute: "id", addSeoAttributes: true });
useHead({
  htmlAttrs: { ...head.value.htmlAttrs },
  link: [{ rel: "icon", href: "/favicon.ico" }],
  meta: [{ key: "theme-color", name: "theme-color", content: color }],
  titleTemplate: (title) => (title ? `${title} | ${description}` : description),
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UModals />
    <UNotifications />
  </div>
</template>

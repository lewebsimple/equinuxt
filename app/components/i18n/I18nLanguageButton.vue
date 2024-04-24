<script setup lang="ts">
const { locale: currentLocale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== currentLocale.value);
});
</script>

<template>
  <UButton
    v-for="locale in availableLocales"
    :key="locale.code"
    color="gray"
    variant="ghost"
    :label="locale.name"
    :to="switchLocalePath(locale.code)"
    :lang="locale.code"
    :hreflang="locale.code"
  />
</template>

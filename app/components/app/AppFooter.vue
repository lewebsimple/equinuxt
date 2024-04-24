<script setup lang="ts"></script>

<template>
  <UFooter>
    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        © {{ new Date().getFullYear() }}.
        {{ $t("components.AppFooter.allRightsReserved") }}
      </p>
    </template>
    <template #right>
      <I18nLanguageButton />
      <UColorModeButton size="sm" />
    </template>
  </UFooter>
</template>

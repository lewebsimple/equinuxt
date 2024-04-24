<script setup lang="ts">
const { isAuthenticated } = useAuth();
const localePath = useLocalePath();
</script>

<template>
  <UHeader>
    <template #left>
      <AppLogo />
    </template>
    <template #right>
      <UButton v-if="isAuthenticated" :label="$t('pages.admin.index.title')" :to="localePath('/admin')" />
      <UButton v-else color="gray" icon="i-heroicons-arrow-right" trailing :label="$t('pages.auth.login.title')" :to="localePath('/auth/login')" />
    </template>
  </UHeader>
</template>

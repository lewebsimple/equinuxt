<script setup lang="ts">
definePageMeta({ layout: "auth" });

useSeoMeta({ title: $t("pages.auth.logout.title") });

const { logout } = useAuth();
</script>

<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UAuthForm
      :fields="[{ name: 'logout', label: '', type: 'hidden' }]"
      :title="$t('pages.auth.logout.title')"
      :description="$t('pages.auth.logout.description')"
      icon="i-heroicons-lock-closed"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ label: $t('forms.auth.logout.submit'), trailingIcon: 'i-heroicons-arrow-right' }"
      @submit="logout"
    />
  </UCard>
</template>

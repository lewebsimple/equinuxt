<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "is-authenticated" });
useHead({ title: $t("pages.admin.index.title") });
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar :title="$t('pages.admin.index.title')" />
    </UDashboardPanel>
  </UDashboardPage>
</template>

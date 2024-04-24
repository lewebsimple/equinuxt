<script setup lang="ts">
const localePath = useLocalePath();
const links = computed(() => [
  {
    id: "dashboard",
    label: $t("pages.admin.index.title"),
    icon: "i-heroicons-home",
    to: localePath("/"),
  },
]);
</script>

<template>
  <UDashboardSidebarLinks :links="links" />
</template>

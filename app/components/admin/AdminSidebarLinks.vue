<script setup lang="ts">
const { hasUserRole } = useAuth();
const localePath = useLocalePath();
const links = computed(() => [
  {
    id: "dashboard",
    label: $t("pages.admin.index.title"),
    icon: "i-heroicons-squares-2x2",
    to: localePath("/admin"),
  },
  ...(hasUserRole("Administrator")
    ? [
        {
          id: "users",
          label: $t("pages.admin.users.title"),
          icon: "i-heroicons-user-group",
          to: localePath("/admin/users"),
        },
      ]
    : []),
]);
</script>

<template>
  <UDashboardSidebarLinks :links="links" />
</template>

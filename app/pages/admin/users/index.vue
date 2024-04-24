<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "has-user-role", hasUserRole: "Administrator" });
useHead({ title: $t("pages.admin.users.index.title") });
const { sort, users, total, page, pageCount, showPagination } = await useUserFindMany();
const columns = [
  {
    key: "fullName",
    label: $t("fields.fullName"),
    sortable: true,
  },
  {
    key: "email",
    label: $t("fields.email"),
    sortable: true,
  },
  {
    key: "role",
    label: $t("fields.role"),
    sortable: true,
  },
];
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar :title="$t('pages.admin.users.index.title')" />
      <UTable v-model:sort="sort" :columns="columns" :rows="users" sort-mode="manual" />
      <UPagination v-if="showPagination" v-model="page" :page-count="pageCount" :total="total" />
    </UDashboardPanel>
  </UDashboardPage>
</template>

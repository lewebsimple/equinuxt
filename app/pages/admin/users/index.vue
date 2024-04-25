<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "has-user-role", hasUserRole: "Administrator" });
useHead({ title: $t("pages.admin.users.index.title") });
const { filters, sort, users, total, page, pageCount, showPagination } = await useUserFindMany();
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
const selected = ref<UserFragment[]>([]);
const onSelect = onSelectById(selected);
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar :title="$t('pages.admin.users.index.title')" :badge="total">
        <template #right> Actions </template>
      </UDashboardNavbar>
      <UDashboardToolbar>
        <template #left>
          <AdminUsersFilters v-model="filters" />
        </template>
      </UDashboardToolbar>
      <UTable v-model="selected" v-model:sort="sort" :columns="columns" :rows="users" sort-mode="manual" @select="onSelect" />
      <UPagination v-if="showPagination" v-model="page" :page-count="pageCount" :total="total" />
    </UDashboardPanel>
  </UDashboardPage>
</template>

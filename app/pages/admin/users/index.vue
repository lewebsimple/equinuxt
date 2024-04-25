<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "has-user-role", hasUserRole: "Administrator" });
useHead({ title: $t("pages.admin.users.index.title") });
const { filters, sort, users, fetching, total, page, pageCount, showPagination } = await useUserFindMany();
const columns = [
  {
    key: "fullName",
    label: $t("fields.user.fullName"),
    sortable: true,
  },
  {
    key: "email",
    label: $t("fields.user.email"),
    sortable: true,
  },
  {
    key: "role",
    label: $t("fields.user.role"),
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
      <UTable v-model="selected" v-model:sort="sort" :columns="columns" :rows="users" :loading="fetching" sort-mode="manual" @select="onSelect">
        <template #fullName-data="{ row }">
          <span class="text-gray-900 dark:text-white font-medium">{{ row.fullName }}</span>
        </template>
      </UTable>
      <UPagination v-if="showPagination" v-model="page" :page-count="pageCount" :total="total" />
    </UDashboardPanel>
  </UDashboardPage>
</template>

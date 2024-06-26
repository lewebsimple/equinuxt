<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "has-user-role", hasUserRole: "Administrator" });
useHead({ title: $t("pages.admin.users.title") });
const { filters, sort, users, fetching, refetch, total, page, pageCount } = await useUserFindMany();
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
  {
    key: "actions",
    class: "w-0",
  },
];
const selected = ref<UserFragment[]>([]);
const onSelect = onSelectById(selected);
function onRefetch() {
  selected.value = [];
  refetch();
}
function onUpdateSort(newSort: UserSortInput) {
  Object.assign(sort, newSort);
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar :title="$t('pages.admin.users.title')" :badge="total">
        <template #right>
          <AdminUsersDeleteButton :users="selected" @refetch="onRefetch" />
          <AdminUsersCreateButton />
        </template>
      </UDashboardNavbar>
      <UDashboardToolbar>
        <template #left>
          <AdminUsersFilters v-model="filters" />
        </template>
        <template #right>
          <UButton color="gray" variant="ghost" icon="i-heroicons-arrow-path" @click="onRefetch" />
        </template>
      </UDashboardToolbar>
      <UTable v-model="selected" :sort="sort" :columns="columns" :rows="users" :loading="fetching" sort-mode="manual" @select="onSelect" @update:sort="onUpdateSort">
        <template #fullName-data="{ row }">
          <span class="text-gray-900 dark:text-white font-medium">{{ row.fullName }}</span>
        </template>
        <template #role-data="{ row }">
          <UBadge color="gray" variant="soft" :label="$t(`enums.UserRole.${row.role}`)" />
        </template>
        <template #actions-data="{ row }">
          <AdminUserActions :user="row" @refetch="onRefetch" />
        </template>
      </UTable>
      <div class="flex-1" />
      <AdminPaginationToolbar v-model="page" :total="total" :page-count="pageCount" />
    </UDashboardPanel>
  </UDashboardPage>
</template>

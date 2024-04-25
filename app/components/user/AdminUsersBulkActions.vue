<script setup lang="ts">
defineProps<{ users: UserFragment[] }>();
const showUserCreateModal = ref(false);
</script>

<template>
  <UButton v-if="users.length" color="red" variant="outline" icon="i-heroicons-trash" :label="$t('ui.delete')" />
  <UButton color="gray" icon="i-heroicons-plus" :label="$t('ui.create')" @click="showUserCreateModal = true" />
  <UDashboardModal v-model="showUserCreateModal" :title="$t('forms.user.create.title')">
    <AdminUserForm @success="showUserCreateModal = false" @dismiss="showUserCreateModal = false" />
  </UDashboardModal>
</template>

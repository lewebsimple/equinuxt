<script setup lang="ts">
const showUserCreateModal = ref(false);
</script>

<template>
  <UButton color="gray" icon="i-heroicons-plus" :label="$t('ui.create')" @click="showUserCreateModal = true" />
  <UDashboardModal v-model="showUserCreateModal" :title="$t('forms.user.create.title')">
    <AdminUserForm @close="showUserCreateModal = false" />
  </UDashboardModal>
</template>

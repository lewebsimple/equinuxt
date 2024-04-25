<script setup lang="ts">
const filters = defineModel<UserFiltersInput>({ required: true });
const roles = useUserRoles();
</script>

<template>
  <USelect
    v-model="filters.role"
    :options="roles"
    icon="i-heroicons-shield-check"
    :placeholder="$t('components.AdminUsersFilters.role.placeholder')"
    :ui="{ icon: { trailing: { pointer: '' } } }"
  >
    <template #trailing>
      <UButton v-if="!!filters.role" color="gray" variant="link" :padded="false" icon="i-heroicons-x-mark" @click.stop="filters.role = null" />
    </template>
  </USelect>
</template>

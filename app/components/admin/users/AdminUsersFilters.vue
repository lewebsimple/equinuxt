<script setup lang="ts">
const filters = defineModel<UserFiltersInput>({ required: true });
</script>

<template>
  <UserRoleSelect v-model="filters.role" />
</template>

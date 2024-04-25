<script setup lang="ts">
import { type UserRoleEnum } from "~/graphql/utils/graphql";

const selected = defineModel<UserRoleEnum | null | undefined>({ required: true });
const roles = useUserRoles();
</script>

<template>
  <USelect
    v-model="selected"
    :options="roles"
    icon="i-heroicons-shield-check"
    :placeholder="$t('components.UserRoleSelect.placeholder')"
    :ui="{ icon: { trailing: { pointer: '' } } }"
  >
    <template #trailing>
      <UButton v-if="!!selected" color="gray" variant="link" :padded="false" icon="i-heroicons-x-mark" @click.stop="selected = null" />
    </template>
  </USelect>
</template>

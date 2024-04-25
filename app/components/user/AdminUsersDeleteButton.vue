<script setup lang="ts">
const props = defineProps<{ users: UserFragment[] }>();
const emit = defineEmits<{ success: [] }>();

const { userDeleteMany } = useUserMutations();

async function onClick() {
  await userDeleteMany(props.users.map(({ id }) => id));
  emit("success");
}
</script>

<template>
  <UButton v-if="users.length" color="red" variant="outline" icon="i-heroicons-trash" :label="$t('ui.delete')" @click="onClick" />
</template>

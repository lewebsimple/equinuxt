<script setup lang="ts">
const props = defineProps<{ user: UserFragment }>();
const emit = defineEmits<{ refetch: [] }>();

const { userDeleteMany } = useUserMutations();

const items = [
  [
    {
      label: $t("ui.delete"),
      icon: "i-heroicons-trash",
      click: async () => {
        if (await userDeleteMany([props.user.id])) emit("refetch");
      },
    },
  ],
];
</script>

<template>
  <UDropdown :items="items" @click.stop>
    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-vertical" />
  </UDropdown>
</template>

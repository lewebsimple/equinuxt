<script setup lang="ts">
const props = defineProps<{ user: UserFragment }>();
const emit = defineEmits<{ refetch: [] }>();

const { userDeleteMany } = useUserMutations();

const showUserEditModal = ref(false);

const items = [
  [
    {
      label: $t("ui.edit"),
      icon: "i-heroicons-pencil",
      click: () => (showUserEditModal.value = true),
    },
  ],
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
  <UDashboardModal v-model="showUserEditModal" title="Edit User">
    <AdminUserForm :user="user" @close="showUserEditModal = false" />
  </UDashboardModal>
</template>

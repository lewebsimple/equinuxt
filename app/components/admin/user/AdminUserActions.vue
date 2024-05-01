<script setup lang="ts">
const props = defineProps<{ user: UserFragment }>();
const emit = defineEmits<{ refetch: [] }>();

const { userDeleteMany } = useUserMutations();

const showUserModifyModal = ref(false);

const items = [
  [
    {
      label: $t("ui.modify"),
      icon: "i-heroicons-pencil",
      click: () => (showUserModifyModal.value = true),
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
  <UDashboardModal v-model="showUserModifyModal" :title="$t('components.AdminUserActions.modify')">
    <AdminUserForm :user="user" @close="showUserModifyModal = false" />
  </UDashboardModal>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const { user } = await useUserCurrent();
const items = [
  [
    {
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: $t("pages.auth.logout.title"),
      icon: "i-heroicons-arrow-left-on-rectangle",
      to: localePath("/auth/logout"),
    },
  ],
];
</script>

<template>
  <UDropdown
    v-if="user"
    :items="items"
    :ui="{ width: 'w-full', item: { disabled: 'cursor-text select-text' } }"
    :popper="{ strategy: 'absolute', placement: 'top' }"
    class="w-full"
  >
    <template #default="{ open }">
      <UButton
        color="gray"
        variant="ghost"
        :label="user.fullName"
        class="w-full text-ellipsis"
        :class="[open && 'bg-gray-50 dark:bg-gray-800']"
        icon="i-heroicons-ellipsis-vertical "
        :ui="{ icon: { base: 'ml-auto' } }"
        trailing
        truncate
      />
    </template>
    <template #account>
      <div class="max-w-full text-left">
        <p>{{ $t("components.AdminSidebarUserDropdown.loggedInAs") }}</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">{{ user.email }}</p>
      </div>
    </template>
  </UDropdown>
</template>

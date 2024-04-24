<script setup lang="ts">
const localePath = useLocalePath();
const { authUser } = useAuth();
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
    v-if="authUser"
    :items="items"
    :ui="{ width: 'w-full', item: { disabled: 'cursor-text select-text' } }"
    :popper="{ strategy: 'absolute', placement: 'top' }"
    class="w-full"
  >
    <template #default="{ open }">
      <UButton
        color="gray"
        variant="ghost"
        :label="authUser.email"
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
        <p>{{ $t("components.AppSidebarUserDropdown.loggedInAs") }}</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">{{ authUser.email }}</p>
      </div>
    </template>
  </UDropdown>
</template>

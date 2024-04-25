<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    description: string;
    variant?: "default" | "danger";
  }>(),
  { variant: "default" },
);
defineEmits<{ cancel: []; confirm: [] }>();

const attrs = computed(() => {
  switch (props.variant) {
    case "danger":
      return {
        icon: "i-heroicons-exclamation-circle",
        iconBase: "text-red-500 dark:text-red-400",
        color: "red",
      };
    default:
      return {
        icon: "i-heroicons-question-mark-circle",
      };
  }
});
</script>

<template>
  <UDashboardModal :title="title" :description="description" :icon="attrs.icon" :ui="{ icon: { base: attrs.iconBase } as any }">
    <template #footer>
      <UButton :label="$t('ui.cancel')" color="gray" variant="ghost" @click="$emit('cancel')" />
      <UButton :label="$t('ui.confirm')" :color="attrs.color" @click="$emit('confirm')" />
    </template>
  </UDashboardModal>
</template>

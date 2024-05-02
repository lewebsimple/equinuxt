<script setup lang="ts">
const page = defineModel<number>({ default: 1 });
const props = defineProps<{ total: number; pageCount: number }>();
const showPagination = computed(() => props.total > props.pageCount);
</script>

<template>
  <UDashboardToolbar v-if="showPagination" class="border-t">
    <template #right>
      <UPagination v-model="page" :page-count="pageCount" :total="total" />
    </template>
  </UDashboardToolbar>
</template>

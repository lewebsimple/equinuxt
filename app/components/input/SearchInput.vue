<script setup lang="ts">
const search = defineModel<string | null | undefined>({ required: true });
</script>

<template>
  <UInput v-model="search" type="search" icon="i-heroicons-magnifying-glass" :placeholder="$t('components.SearchInput.placeholder')" :ui="{ icon: { trailing: { pointer: '' } } }">
    <template #trailing>
      <UButton v-show="!!search" color="gray" variant="link" :padded="false" icon="i-heroicons-x-mark" @click.stop="search = null" />
    </template>
  </UInput>
</template>

<script setup lang="ts">
const password = defineModel<string>({ required: true });
const showPassword = ref(false);
</script>

<template>
  <UInput v-model="password" :type="showPassword ? 'text' : 'password'" :ui="{ icon: { trailing: { pointer: '' } } }">
    <template #trailing>
      <UButton color="gray" variant="ghost" :icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" :padded="false" @click="showPassword = !showPassword" />
    </template>
  </UInput>
</template>

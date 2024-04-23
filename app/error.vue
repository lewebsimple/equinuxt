<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();
useSeoMeta({ title: props.error.message });
</script>

<template>
  <div>
    <UMain>
      <UContainer>
        <UPage>
          <UPageError :error="error" :ui="{ default: { clearButton: { label: $t('ui.goBackHome') } as any } }" />
        </UPage>
      </UContainer>
    </UMain>
    <UModals />
    <UNotifications />
  </div>
</template>

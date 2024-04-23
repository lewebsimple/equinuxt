<script setup lang="ts">
import { loginFormSchema } from "~/auth/composables/auth";

definePageMeta({ layout: "auth" });

useSeoMeta({ title: $t("pages.auth.login.title") });

const refAuthForm = ref();
const fields = [
  { type: "email", name: "email", label: $t("fields.email"), required: true },
  { type: "password", name: "password", label: $t("fields.password"), required: true },
];
const { login } = useAuth();
async function onSubmit(data: LoginForm) {
  try {
    await login(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : $t("errors.auth.invalid_login");
    refAuthForm.value.formRef.setErrors([{ message, path: "password" }]);
  }
}
</script>

<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UAuthForm
      ref="refAuthForm"
      :fields="fields"
      :schema="loginFormSchema"
      :title="$t('pages.auth.login.title')"
      :description="$t('pages.auth.login.description')"
      icon="i-heroicons-lock-closed"
      :ui="{ base: 'text-center' }"
      :submit-button="{ label: $t('forms.auth.login.submit'), trailingIcon: 'i-heroicons-arrow-right' }"
      @submit="onSubmit"
    />
  </UCard>
</template>

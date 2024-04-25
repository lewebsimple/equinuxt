<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";

const props = defineProps<{ user?: UserFragment }>();
const emit = defineEmits<{ close: [] }>();

const { userFormSchema, userCreate, userUpdate } = useUserMutations();
const roles = useUserRoles();

const formRef = ref();
const state = reactive<UserFormOutput>({
  email: props.user?.email || "",
  password: "",
  role: props.user?.role || UserRoleEnum.Guest,
  profile: {
    firstName: props.user?.profile.firstName || "",
    lastName: props.user?.profile.lastName || "",
  },
});

async function onSubmit(event: FormSubmitEvent<UserFormOutput>) {
  try {
    props.user ? await userUpdate(props.user.id, event.data) : await userCreate(event.data);
    emit("close");
  } catch (error) {
    const message = error instanceof Error ? error.message : $t("errors.generic");
    formRef.value?.setErrors([{ path: "submit", message }]);
  }
}
</script>

<template>
  <UForm ref="formRef" :schema="userFormSchema" :state="state" class="space-y-6" @submit="onSubmit">
    <div class="grid grid-cols-2 gap-3">
      <UFormGroup name="profile.firstName" :label="$t('fields.user.profile.firstName')">
        <UInput v-model="state.profile.firstName" />
      </UFormGroup>
      <UFormGroup name="profile.lastName" :label="$t('fields.user.profile.lastName')">
        <UInput v-model="state.profile.lastName" />
      </UFormGroup>
    </div>
    <UFormGroup name="email" :label="$t('fields.user.email')">
      <UInput v-model="state.email" />
    </UFormGroup>
    <UFormGroup name="password" :label="$t('fields.user.password')">
      <PasswordInput v-model="state.password" />
    </UFormGroup>
    <UFormGroup name="role" :label="$t('fields.user.role')">
      <USelect v-model="state.role" :options="roles" />
    </UFormGroup>
    <UFormGroup name="submit" />
    <div class="flex justify-end items-center gap-x-1.5">
      <UButton :label="$t('ui.cancel')" color="gray" variant="ghost" @click="emit('close')" />
      <UButton :label="user ? $t('ui.save') : $t('ui.create')" type="submit" />
    </div>
  </UForm>
</template>

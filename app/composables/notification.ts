import defu from "defu";

import { type Notification } from "#ui/types";

export function useNotification() {
  const { t } = useI18n();
  const toast = useToast();

  const defaults: Partial<Notification> = {
    timeout: 2000,
  };

  function notificationError(notification: Partial<Notification>) {
    toast.add(
      defu(notification, {
        ...defaults,
        color: "red",
        icon: "i-heroicons-exclamation-circle",
      }) as Partial<Notification>,
    );
  }

  function notificationSuccess(notification: Partial<Notification>) {
    toast.add(
      defu(notification, {
        ...defaults,
        color: "green",
        icon: "i-heroicons-check-circle",
      }) as Partial<Notification>,
    );
  }

  return { notificationError, notificationSuccess };
}

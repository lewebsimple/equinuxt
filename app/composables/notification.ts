import { useSubscription } from "@urql/vue";
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

export function useNotificationListen() {
  const toast = useToast();
  const defaults: Partial<Notification> = {
    color: "primary",
    icon: undefined,
    timeout: 2000,
  };
  useSubscription(
    {
      query: graphql(`
        subscription NotificationListen {
          notificationListen {
            title
            description
            icon
            timeout
            color
          }
        }
      `),
    },
    (_previous: any, data) => toast.add(<Notification>defu(data.notificationListen, defaults)),
  );
}

import { useMutation, useSubscription } from "@urql/vue";

export function useHealthcheck() {
  // Trigger healthcheck
  const { executeMutation: healthcheck } = useMutation(
    graphql(`
      mutation HealthcheckTrigger {
        healthcheck
      }
    `),
  );

  // Listen for healthcheck
  const toast = useToast();
  useSubscription(
    {
      query: graphql(`
        subscription HealthcheckListen {
          healthcheck
        }
      `),
    },
    () => {
      toast.add({ title: "Healthcheck", description: "Healthcheck successful" });
    },
  );

  return { healthcheck };
}

// Healthcheck mutations
export const healthcheckMutations = builder.mutationFields((t) => ({
  healthcheck: t.field({
    type: "String",
    resolve: (_root, _args, { pubsub }) => {
      const message = "Healthcheck successful";
      pubsub.publish("healthcheck", { message });
      return message;
    },
  }),
}));

// Healthcheck subscriptions
export const healthcheckSubscriptions = builder.subscriptionFields((t) => ({
  healthcheck: t.field({
    type: "String",
    subscribe: (_root, _args, { pubsub }) => pubsub.subscribe("healthcheck"),
    resolve: (payload) => payload.message,
  }),
}));

declare module "~/graphql/server/utils/pubsub" {
  interface PubSubChannels {
    healthcheck: [{ message: string }];
  }
}

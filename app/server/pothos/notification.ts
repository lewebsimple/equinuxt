import { type Notification } from "~/graphql/utils/graphql";

// Notification object
const notificationObject = builder.simpleObject("Notification", {
  fields: (t) => ({
    title: t.string(),
    description: t.string({ nullable: true }),
    icon: t.string({ nullable: true }),
    timeout: t.int({ nullable: true }),
    color: t.string({ nullable: true }),
  }),
});

// Notification subscriptions
export const notificationSubscriptions = builder.subscriptionFields((t) => ({
  notificationListen: t.field({
    type: notificationObject,
    subscribe: (_root, _args) => pubsub.subscribe("notification"),
    resolve: (payload) => payload,
  }),
}));

declare module "~/graphql/server/utils/pubsub" {
  interface PubSubChannels {
    notification: [Notification];
  }
}

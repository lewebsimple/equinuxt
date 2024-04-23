import { createPubSub } from "graphql-yoga";

type PubSubPublishArgsByKey = { [key: string]: [] | [any] | [number | string, any] };
export interface PubSubChannels extends PubSubPublishArgsByKey {}

export const pubsub = createPubSub<PubSubChannels>();

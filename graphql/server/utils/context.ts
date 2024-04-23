import { type H3Event } from "h3";

// GraphQL Context
export function getContext(event: H3Event) {
  const { authSession, authUser } = event.context;
  return { prisma, pubsub, authSession, authUser };
}

export type Context = ReturnType<typeof getContext>;

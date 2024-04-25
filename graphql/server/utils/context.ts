import { type H3Event } from "h3";

// GraphQL Context
export async function getContext(event: H3Event) {
  const { authSession, authUser } = event.context;
  const t = await useTranslation(event);
  return { prisma, pubsub, authSession, authUser, t };
}

type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never;
export type Context = PromiseType<ReturnType<typeof getContext>>;

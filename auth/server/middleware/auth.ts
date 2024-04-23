import type { Session, User } from "lucia";
import { verifyRequestOrigin } from "lucia";

export default defineEventHandler(async (event) => {
  if (event.method !== "GET") {
    const originHeader = getHeader(event, "Origin") ?? null;
    const hostHeader = getHeader(event, "Host") ?? null;
    if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
      return event.node.res.writeHead(403).end();
    }
  }

  const sessionId = getCookie(event, lucia.sessionCookieName) ?? null;
  if (!sessionId) {
    event.context.authSession = null;
    event.context.authUser = null;
    return;
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    appendResponseHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
  }
  if (!session) {
    appendResponseHeader(event, "Set-Cookie", lucia.createBlankSessionCookie().serialize());
  }
  event.context.authUser = user;
  event.context.authSession = session;
});

declare module "h3" {
  interface H3EventContext {
    authUser: User | null;
    authSession: Session | null;
  }
}

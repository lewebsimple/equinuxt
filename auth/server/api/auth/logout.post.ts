export default defineEventHandler(async (event) => {
  if (!event.context.authSession) {
    throw createError({ statusCode: 403 });
  }
  await lucia.invalidateSession(event.context.authSession.id);
  appendHeader(event, "Set-Cookie", lucia.createBlankSessionCookie().serialize());
});

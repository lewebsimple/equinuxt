import { type LoginFormOutput, loginFormSchema } from "~/auth/composables/auth";

export default defineEventHandler(async (event) => {
  const t = await useTranslation(event);
  const { email, password } = loginFormSchema.parse(await readBody<LoginFormOutput>(event));

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (!existingUser) {
    throw createError({ message: t("errors.auth.invalid_login"), statusCode: 400 });
  }

  const validPassword = await authVerifyPassword(password, existingUser.password);
  if (!validPassword) {
    throw createError({ message: t("errors.auth.invalid_login"), statusCode: 400 });
  }

  const session = await lucia.createSession(existingUser.id, {});
  appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
});

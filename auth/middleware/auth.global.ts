export default defineNuxtRouteMiddleware(async () => {
  const { authUser } = useAuth();
  const data = await useRequestFetch()("/api/auth/user");
  authUser.value = data || null;
});

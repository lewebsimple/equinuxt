export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated } = useAuth();
  const localePath = useLocalePath();
  if (isAuthenticated.value) {
    return navigateTo(localePath("/auth/logout"));
  }
});

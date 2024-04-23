export default defineNuxtRouteMiddleware((to) => {
  const localePath = useLocalePath();
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated.value) {
    return navigateTo(`${localePath("/auth/login")}?redirect=${to.fullPath}`);
  }
});

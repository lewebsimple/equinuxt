import { UserRole } from "@prisma/client";

export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, hasUserRole } = useAuth();
  const localePath = useLocalePath();
  if (!isAuthenticated.value) {
    return navigateTo(`${localePath("/auth/login")}?redirect=${to.fullPath}`);
  } else if (!hasUserRole(to.meta.hasUserRole || UserRole.Administrator)) {
    abortNavigation({ statusCode: 403 });
  }
});

declare module "#app" {
  interface PageMeta {
    hasUserRole?: UserRole;
  }
}

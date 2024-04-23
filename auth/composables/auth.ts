import { UserRole } from "@prisma/client";
import type { User } from "lucia";
import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type LoginForm = z.infer<typeof loginFormSchema>;

export function useAuth() {
  const localePath = useLocalePath();

  // Current authenticated user state
  const authUser = useState<User | null>("authUser", () => null);

  // Authentication helpers
  const isAuthenticated = computed(() => !!authUser.value);
  const hasUserRole = (role: UserRole) => authUser.value && [role, UserRole.Administrator].includes(authUser.value.role);

  // Login helper
  async function login(body: LoginForm) {
    try {
      await $fetch("/api/auth/login", { method: "POST", body });
    } catch (error) {
      const message = (error as unknown as any).response._data.message;
      throw new Error(message);
    }
    const redirect = useRoute().query.redirect?.toString() || localePath("/");
    await navigateTo(redirect);
  }

  // Logout helper
  async function logout() {
    await $fetch("/api/auth/logout", { method: "POST" });
    await navigateTo(localePath("/"));
    authUser.value = null;
  }

  return { authUser, isAuthenticated, hasUserRole, login, logout };
}

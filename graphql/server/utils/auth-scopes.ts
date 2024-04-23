import { UserRole } from "@prisma/client";

export type AuthScopes = {
  public: boolean;
  isAuthenticated: boolean;
  hasUserRole: UserRole;
};

export const authScopes = async (context: Context) => ({
  public: true,
  isAuthenticated: !!context.authUser,
  hasUserRole: (role: UserRole) => (context.authUser ? [UserRole.Administrator, role].includes(context.authUser.role) : false),
});

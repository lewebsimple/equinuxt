import { UserRole } from "@prisma/client";

// UserRole enum
export const userRoleEnum = builder.enumType(UserRole, { name: "UserRoleEnum" });

// UserProfile Prisma object
export const userProfilePrismaObject = builder.prismaObject("UserProfile", {
  fields: (t) => ({
    id: t.exposeID("id"),
    firstName: t.exposeString("firstName"),
    lastName: t.exposeString("lastName"),
  }),
});

// User Prisma object
export const userPrismaObject = builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    role: t.expose("role", { type: userRoleEnum }),
    profile: t.relation("profile"),
    fullName: t.string({
      select: { profile: { select: { firstName: true, lastName: true } } },
      resolve: ({ profile }) => `${profile.firstName} ${profile.lastName}`,
    }),
  }),
});

// User queries
export const userQueries = builder.queryFields((t) => ({
  // Current user
  userCurrent: t.prismaField({
    type: "User",
    nullable: true,
    resolve: async (query, _root, _args, { authUser, prisma }) => {
      if (!authUser) return null;
      return await prisma.user.findUnique({ ...query, where: { id: authUser.id } });
    },
  }),
}));

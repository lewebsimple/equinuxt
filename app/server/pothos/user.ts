import { queryFromInfo } from "@pothos/plugin-prisma";
import { type Prisma, UserRole } from "@prisma/client";

import { paginationInput, paginationInterface } from "~/graphql/server/pothos/pagination";
import { sortOrderEnum } from "~/graphql/server/pothos/prisma";
import { type UserFiltersInput, UserSortColumn, type UserSortInput } from "~/graphql/utils/graphql";

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

// User filters input
export const userFiltersInput = builder.inputType("UserFiltersInput", {
  fields: (t) => ({
    role: t.field({ type: userRoleEnum, required: false }),
  }),
});
function userFiltersWhere(filters: UserFiltersInput) {
  const where: Prisma.UserWhereInput = {};
  if (filters.role) {
    where.role = filters.role;
  }
  return where;
}

// User sort input
export const userSortInput = builder.inputType("UserSortInput", {
  fields: (t) => ({
    column: t.field({ type: builder.enumType("UserSortColumn", { values: ["fullName", "email", "role"] }), required: true }),
    direction: t.field({ type: sortOrderEnum, required: true }),
  }),
});
function userSortOrderBy(sort: UserSortInput) {
  let orderBy: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[] = {};
  switch (sort.column) {
    case UserSortColumn.FullName:
      orderBy = [{ profile: { firstName: sort.direction } }, { profile: { lastName: sort.direction } }];
      break;
    case UserSortColumn.Email:
      orderBy.email = sort.direction;
      break;
    case UserSortColumn.Role:
      orderBy.role = sort.direction;
      break;
  }
  return orderBy;
}

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
  // Find many users
  userFindMany: t.field({
    type: builder.simpleObject("UserPaginated", {
      interfaces: [paginationInterface],
      fields: (t) => ({
        users: t.field({ type: [userPrismaObject], nullable: false }),
      }),
    }),
    args: {
      filters: t.arg({ type: userFiltersInput, required: true }),
      sort: t.arg({ type: userSortInput, required: true }),
      pagination: t.arg({ type: paginationInput, required: true }),
    },
    resolve: async (_root, { filters, sort, pagination }, context, info) => {
      const where = userFiltersWhere(<UserFiltersInput>filters);
      const orderBy = userSortOrderBy(<UserSortInput>sort);
      return {
        total: await context.prisma.user.count({ where }),
        users: await context.prisma.user.findMany({
          ...queryFromInfo({ context, info, path: ["users"] }),
          where,
          orderBy,
          ...pagination,
        }),
      };
    },
  }),
}));

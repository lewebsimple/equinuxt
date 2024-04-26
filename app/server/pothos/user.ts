import { queryFromInfo } from "@pothos/plugin-prisma";
import { Prisma, UserRole } from "@prisma/client";

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
    search: t.field({ type: "String", required: false }),
    role: t.field({ type: userRoleEnum, required: false }),
  }),
});
function userFiltersWhere(filters: UserFiltersInput) {
  const where: Prisma.UserWhereInput = {};
  if (filters.search) {
    where.OR = [{ email: { contains: filters.search } }, { profile: { firstName: { contains: filters.search } } }, { profile: { lastName: { contains: filters.search } } }];
  }
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
  // Find users
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
    authScopes: { hasUserRole: "Administrator" },
  }),
}));

// UserProfile input
export const userProfileInput = builder.inputType("UserProfileInput", {
  fields: (t) => ({
    firstName: t.string({ required: true }),
    lastName: t.string({ required: true }),
  }),
});

// User create input
const userCreateInput = builder.prismaCreate("User", {
  name: "UserCreateInput",
  fields: (t) => ({
    email: t.field({ type: "String", required: true }),
    password: t.field({ type: "String", required: true }),
    role: t.field({ type: userRoleEnum, required: true }),
    profile: builder.prismaCreateRelation("User", "profile", {
      fields: (t) => ({ create: userProfileInput }),
    }),
  }),
});

// User update input
const userUpdateInput = builder.prismaUpdate("User", {
  name: "UserUpdateInput",
  fields: (t) => ({
    email: t.field({ type: "String", required: false }),
    password: t.field({ type: "String", required: false }),
    role: t.field({ type: userRoleEnum, required: false }),
    profile: builder.prismaUpdateRelation("User", "profile", {
      fields: (t) => ({ update: userProfileInput }),
    }),
  }),
});

// User mutations
export const userMutations = builder.mutationFields((t) => ({
  // Create user
  userCreate: t.prismaField({
    type: "User",
    nullable: true,
    args: {
      data: t.arg({ type: userCreateInput, required: true }),
    },
    resolve: async (query, _root, { data }, { prisma, t }) => {
      try {
        return await prisma.user.create({ ...query, data: { ...data, id: authGenerateUserId(), password: await authHashPassword(data.password) } });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") throw new Error(t("errors.user.alreadyExists"));
        throw error;
      }
    },
    authScopes: { hasUserRole: "Administrator" },
  }),
  // Update user
  userUpdate: t.prismaField({
    type: "User",
    nullable: true,
    args: {
      userId: t.arg.string({ required: true }),
      data: t.arg({ type: userUpdateInput, required: true }),
    },
    resolve: async (query, _root, { userId, data }, { prisma, t }) => {
      if (data.password) data.password = await authHashPassword(<string>data.password);
      try {
        return await prisma.user.update({ ...query, where: { id: userId }, data });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") throw new Error(t("errors.user.alreadyExists"));
        throw error;
      }
    },
    authScopes: { hasUserRole: "Administrator" },
  }),
  // Delete users
  userDeleteMany: t.field({
    type: "Int",
    args: {
      userIds: t.arg.stringList({ required: true }),
    },
    resolve: async (_root, { userIds }, { prisma }) => {
      const { count } = await prisma.userProfile.deleteMany({ where: { user: { id: { in: userIds } } } });
      return count;
    },
    authScopes: { hasUserRole: "Administrator" },
  }),
}));

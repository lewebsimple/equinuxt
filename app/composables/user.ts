import { useMutation, useQuery } from "@urql/vue";
import { z } from "zod";

// User fragment
graphql(`
  fragment User on User {
    id
    email
    role
    fullName
    profile {
      firstName
      lastName
    }
  }
`);

// User form schema
const userFormSchema = z.object({
  email: z.string().email().default(""),
  password: z.string().min(1).default(""),
  role: z.nativeEnum(UserRoleEnum).default(UserRoleEnum.Guest),
  profile: z.object({
    firstName: z.string().min(1).default(""),
    lastName: z.string().min(1).default(""),
  }),
});
export type UserFormInput = z.input<typeof userFormSchema>;
export type UserFormOutput = z.output<typeof userFormSchema>;

// User roles
export function useUserRoles() {
  const { t } = useI18n();
  return [
    {
      value: UserRoleEnum.Guest,
      label: t("enums.UserRole.Guest"),
    },
    {
      value: UserRoleEnum.Administrator,
      label: t("enums.UserRole.Administrator"),
    },
  ];
}

// Currently logged in user
export async function useUserCurrent() {
  const { data } = await useQuery({
    query: graphql(`
      query UserCurrent {
        userCurrent {
          ...User
        }
      }
    `),
  });
  return { user: data.value?.userCurrent || null };
}

// Find many users
export async function useUserFindMany() {
  const filters = ref<UserFiltersInput>({ role: null });
  const sort = ref<UserSortInput>({ column: UserSortColumn.FullName, direction: SortOrderEnum.Asc });
  const pagination = ref<PaginationInput>({ skip: 0, take: 10 });
  watch([filters, sort], () => (pagination.value.skip = 0));
  const { data, fetching } = await useQuery<UserFindManyQuery>({
    query: graphql(`
      query UserFindMany($filters: UserFiltersInput!, $sort: UserSortInput!, $pagination: PaginationInput!) {
        userFindMany(filters: $filters, sort: $sort, pagination: $pagination) {
          total
          users {
            ...User
          }
        }
      }
    `),
    variables: { filters, sort, pagination },
  });
  const users = computed<UserFragment[]>(() => data.value?.userFindMany.users || []);
  const total = computed<number>(() => data.value?.userFindMany.total || 0);
  const page = computed<number>({
    get: () => pagination.value.skip / pagination.value.take + 1,
    set: (value) => (pagination.value.skip = (value - 1) * pagination.value.take),
  });
  const pageCount = computed<number>(() => pagination.value.take);
  const showPagination = computed<boolean>(() => total.value > pagination.value.take);
  return { filters, sort, users, fetching, total, page, pageCount, showPagination };
}

// User mutations
export function useUserMutations() {
  // Create user
  const { executeMutation: executeUserCreate } = useMutation(
    graphql(`
      mutation UserCreate($data: UserCreateInput!) {
        userCreate(data: $data) {
          ...User
        }
      }
    `),
  );
  async function userCreate(data: UserFormOutput) {
    const { profile, ...userData } = data;
    const result = await executeUserCreate({ data: { ...userData, profile: { create: profile } } });
    if (result.error) {
      throw new Error(urqlErrorMessage(result.error));
    }
    return result;
  }

  // Update user
  const { executeMutation: executeUserUpdate } = useMutation(
    graphql(`
      mutation UserUpdate($userId: String!, $data: UserUpdateInput!) {
        userUpdate(userId: $userId, data: $data) {
          ...User
        }
      }
    `),
  );
  async function userUpdate(userId: string, data: UserFormOutput) {
    const { profile, ...userData } = data;
    const result = await executeUserUpdate({ userId, data: { ...userData, profile: { update: profile } } });
    if (result.error) {
      throw new Error(urqlErrorMessage(result.error));
    }
    return result;
  }

  // Delete users
  const { executeMutation: executeUserDeleteMany } = useMutation(
    graphql(`
      mutation UsersDeleteMany($userIds: [String!]!) {
        userDeleteMany(userIds: $userIds)
      }
    `),
  );
  async function userDeleteMany(userIds: string[]) {
    const result = await executeUserDeleteMany({ userIds });
    if (result.error) {
      throw new Error(urqlErrorMessage(result.error));
    }
    return result;
  }

  return { userFormSchema, userCreate, userUpdate, userDeleteMany };
}

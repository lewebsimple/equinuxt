import { useQuery } from "@urql/vue";

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
  const { data } = await useQuery<UserFindManyQuery>({
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
  return { filters, sort, users, total, page, pageCount, showPagination };
}

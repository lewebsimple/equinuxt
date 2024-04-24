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

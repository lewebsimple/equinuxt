import { useQuery } from "@urql/vue";

export async function useVersion() {
  // Application version
  const { data } = await useQuery({
    query: graphql(`
      query Version {
        version
      }
    `),
  });

  return { version: data.value?.version || null };
}

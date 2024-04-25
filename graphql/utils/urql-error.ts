import type { CombinedError } from "@urql/vue";

export function urqlErrorMessage(error: CombinedError) {
  return (<any>error.graphQLErrors[0]?.extensions.originalError).message || error.message;
}

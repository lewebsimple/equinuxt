import { version } from "~/package.json";

// Version queries
export const versionQueries = builder.queryFields((t) => ({
  version: t.field({
    type: "String",
    resolve: () => `v${version}`,
  }),
}));

import type { IGraphQLConfig } from "graphql-config";

export default {
  projects: {
    default: {
      schema: "graphql/schema.graphql",
      documents: ["{app,graphql}/composables/*.ts"],
      extensions: {
        codegen: {
          generates: {
            "graphql/utils/": {
              preset: "client",
              ignoreNoDocuments: true,
              config: {
                scalars: {
                  DateTime: "string",
                  Upload: "File",
                },
                useTypeImports: true,
              },
              presetConfig: { fragmentMasking: false },
            },
          },
        },
      },
    },
  },
} satisfies IGraphQLConfig;

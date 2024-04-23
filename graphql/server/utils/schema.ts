import { writeFileSync } from "fs";
import { lexicographicSortSchema, printSchema } from "graphql";

// Initialize builder
builder.queryType();
builder.mutationType();
builder.subscriptionType();

Function.prototype(pothosTypes);

export const schema = builder.toSchema();

// Save GraphQL schema to file
if (process.env.NODE_ENV !== "production") {
  const schemaAsString = printSchema(lexicographicSortSchema(schema));
  writeFileSync("graphql/schema.graphql", schemaAsString);
}

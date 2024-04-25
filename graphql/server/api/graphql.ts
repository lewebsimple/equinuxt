import { createYoga } from "graphql-yoga";

export default defineEventHandler(async (event) => {
  const yoga = createYoga({
    schema,
    context: await getContext(event),
    graphqlEndpoint: "/api/graphql",
    graphiql: { subscriptionsProtocol: "WS" },
  });
  const { req, res } = event.node;
  return yoga.handle(req, res);
});

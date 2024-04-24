import urql, { cacheExchange, fetchExchange, type SSRData, ssrExchange, subscriptionExchange } from "@urql/vue";
import { createClient as createWSClient } from "graphql-ws";
import { WebSocket } from "ws";

import { useState } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const { origin } = useRequestURL();
  const url = `${origin}/api/graphql`;
  const ssr = ssrExchange({ isClient: process.client });
  const urqlState = useState<SSRData>("urql");

  // Extract SSR payload on the server
  if (process.server) {
    nuxtApp.hook("app:rendered", () => {
      urqlState.value = ssr.extractData();
    });
  }

  // Restore SSR payload on the client
  if (process.client) {
    nuxtApp.hook("app:created", () => {
      ssr.restoreData(urqlState.value);
    });
  }

  // Subscription over WebSocket exchange
  const wsClient = createWSClient({
    url: `${origin}/api/graphql`.replace("http", "ws"),
    webSocketImpl: process.server && WebSocket,
  });
  const wsExchange = subscriptionExchange({
    forwardSubscription(request) {
      const input = { ...request, query: request.query || "" };
      return {
        subscribe(sink) {
          const unsubscribe = wsClient.subscribe(input, sink);
          return { unsubscribe };
        },
      };
    },
  });

  // Custom exchanges
  const exchanges = [cacheExchange, ssr, fetchExchange, wsExchange];

  // Provide urql client
  const headers = { ...useRequestHeaders(), origin: useRequestURL().origin };
  nuxtApp.vueApp.use(urql, { url, exchanges, fetchOptions: { headers } });
});

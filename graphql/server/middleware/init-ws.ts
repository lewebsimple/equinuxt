import consola from "consola";
import { execute, subscribe } from "graphql";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";

let wsServer: WebSocketServer;

export default defineEventHandler((event) => {
  if (wsServer) return;
  consola.info("Initializing WebSocket server");
  // @ts-expect-error Get HTTP server from H3 event
  const server = event.node.res.socket?.server;
  wsServer = new WebSocketServer({ server, path: "/api/graphql" });
  useServer({ context: getContext(event), execute, subscribe, schema }, wsServer);
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  barrel: { tasks: "server/tasks/*.ts" },
  runtimeConfig: {
    bullmq: {
      connection: {
        host: "localhost",
        port: parseInt(process.env.NUXT_REDIS_PORT || "6379"),
      },
    },
  },
});

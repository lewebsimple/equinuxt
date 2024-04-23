// https://nuxt.com/docs/api/configuration/nuxt-config
import codegen from "vite-plugin-graphql-codegen";

export default defineNuxtConfig({
  build: { transpile: ["@urql/vue"] },
  vite: { plugins: [codegen()] },
  barrel: {
    pothosTypes: "server/pothos/*.ts",
  },
});

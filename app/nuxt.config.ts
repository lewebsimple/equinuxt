// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: [
    { path: "~/app/components", pathPrefix: false },
    { path: "~/app/assets/svg", extensions: ["svg"], prefix: "Svg" },
  ],
});

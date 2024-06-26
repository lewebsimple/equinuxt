// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["./app", "./auth", "./bullmq", "./graphql", "./prisma", "@nuxt/ui-pro"],
  modules: ["@lewebsimple/nuxt-barrel", "@nuxt/ui", "@nuxtjs/i18n", "@lewebsimple/nuxt3-svg"],
  i18n: {
    baseUrl: process.env.NUXT_I18N_BASE_URL || "http://localhost:3000",
    defaultLocale: "fr",
    langDir: "locales",
    locales: [
      { code: "en", iso: "en-CA", name: "English", files: ["en.json"] },
      { code: "fr", iso: "fr-CA", name: "Français", files: ["fr.json"] },
    ],
    strategy: "prefix_except_default",
    types: "composition",
    experimental: {
      localeDetector: "./app/server/i18n/locale-detector.ts",
      autoImportTranslationFunctions: true,
    },
  },
  tailwindcss: {
    quiet: true,
    viewer: false,
  },
});

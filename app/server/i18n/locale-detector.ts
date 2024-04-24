export default defineI18nLocaleDetector((event) => {
  return event.path.startsWith("/en") ? "en" : "fr";
});

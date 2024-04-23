export default defineI18nLocaleDetector((event) => {
  console.log(event.path);
  return event.path.startsWith("/en") ? "en" : "fr";
});

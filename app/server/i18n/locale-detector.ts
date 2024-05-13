export default defineI18nLocaleDetector((event) => (event.path.startsWith("/en") ? "en" : "fr"));

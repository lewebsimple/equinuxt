export default defineEventHandler((event) => {
  return event.context.authUser;
});

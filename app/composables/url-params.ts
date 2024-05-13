export function useUrlParams<T extends Record<string, string | number | null>>(defaults: T) {
  const params = reactive<T>({ ...defaults }) as T;

  watch(
    () => useRoute().query,
    (newQuery) => {
      // console.log(`Query changed:`, { ...newQuery });
      for (const key in params) {
        if (newQuery[key] !== undefined) {
          switch (typeof defaults[key]) {
            case "number":
              params[key] = Number(newQuery[key]) as any;
              break;
            default:
              params[key] = newQuery[key] as any;
          }
        } else {
          params[key] = defaults[key];
        }
      }
    },
    { immediate: true },
  );

  watch(
    () => params,
    (newParams) => {
      // console.log(`Params changed:`, { ...newParams });
      const query = { ...useRoute().query };
      for (const key in defaults) {
        if (!newParams[key] || newParams[key] === defaults[key]) {
          delete query[key];
        } else {
          query[key] = <string>newParams[key];
        }
      }
      navigateTo({ query });
    },
    { deep: true },
  );

  return params;
}

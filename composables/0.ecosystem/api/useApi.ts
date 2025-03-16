import type { UseFetchOptions } from 'nuxt/app'

export const useApi = <T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>,
) => {
  const { $api } = useNuxtApp()

  return useFetch(url, {
    ...options,
    $fetch: $api as typeof $fetch,
  })
}

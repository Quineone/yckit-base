export const useApiClient = () => {
  const runtimeConfig = useRuntimeConfig()
  const route = useRoute()
  const { $events } = useNuxtApp()

  const api = $fetch.create({
    baseURL: runtimeConfig.public.apiEndpoint,

    onRequest({ options }) {
      // handle reload
      options.query ||= {}
      const { reload } = route.query || {}

      if (reload) {
        options.query.reload = reload
      }
    },

    onResponse() {},

    async onResponseError({ response }) {
      if (response.status === 401) {
        $events.emit(EventName.Api401)
      }
    },
  })

  return {
    api,
  }
}

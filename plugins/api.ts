export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const route = useRoute()

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

    onResponse() {
    },

    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/login'))
      }
    },
  })

  return {
    provide: {
      api,
    },
  }
})

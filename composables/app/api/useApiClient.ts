import type { FetchContext } from 'ofetch'

export const useApiClient = () => {
  const runtimeConfig = useRuntimeConfig()
  const { onRequest, onResponse, onResponseError } = useApiInterceptors()

  const api = $fetch.create({
    baseURL: runtimeConfig.public.apiEndpoint,

    async onRequest(ctx: FetchContext) {
      await onRequest(ctx)
    },
    async onResponse(ctx: FetchContext) {
      if (ctx.response) {
        await onResponse(ctx.response)
      }
    },
    async onResponseError(ctx: FetchContext) {
      if (ctx.error) {
        await onResponseError(ctx.error)
      }
    },
  })

  return {
    api,
  }
}

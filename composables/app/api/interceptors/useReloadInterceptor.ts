import type { FetchContext } from 'ofetch'
import type { Interceptor } from './types'

export const useReloadInterceptor = (): Interceptor => {
  const { query } = useRoute()

  const onRequest = async (req: FetchContext): Promise<FetchContext> => {
    req.options.query ||= {}

    if (query.reload) {
      req.options.query.reload = query.reload
    }

    return req
  }

  return { onRequest }
}

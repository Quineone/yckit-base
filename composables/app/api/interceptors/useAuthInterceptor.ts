import type { FetchContext, FetchResponse, FetchError } from 'ofetch'
import type { Interceptor } from './types'

export const useAuthInterceptor = (): Interceptor => {
  const { $events } = useNuxtApp()

  const onRequest = async (req: FetchContext): Promise<FetchContext> => {
    return req
  }

  const onResponse = async <T>(res: FetchResponse<T>): Promise<FetchResponse<T>> => {
    return res
  }

  const onResponseError = async (err: FetchError): Promise<FetchError> => {
    if (err.response?.status === 401) {
      $events.emit(EventName.Api401)
    }
    return err
  }

  return { onRequest, onResponse, onResponseError }
}

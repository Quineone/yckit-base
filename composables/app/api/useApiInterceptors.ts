import type { FetchContext, FetchResponse, FetchError } from 'ofetch'
import type { Interceptor } from './interceptors/types'

export const useApiInterceptors = () => {
  const interceptors: Interceptor[] = [
    useAuthInterceptor(),
    useReloadInterceptor(),
  ]

  const onRequestInterceptors = interceptors.filter(interceptor => interceptor.onRequest)
  const onResponseInterceptors = interceptors.filter(interceptor => interceptor.onResponse)
  const onResponseErrorInterceptors = interceptors.filter(interceptor => interceptor.onResponseError)

  const onRequest = async (req: FetchContext): Promise<FetchContext> => {
    return onRequestInterceptors.reduce(async (acc, interceptor) => {
      return interceptor.onRequest!(await acc)
    }, Promise.resolve(req))
  }

  const onResponse = async <T>(res: FetchResponse<T>): Promise<FetchResponse<T>> => {
    return onResponseInterceptors.reduce(async (acc, interceptor) => {
      return interceptor.onResponse!(await acc)
    }, Promise.resolve(res))
  }

  const onResponseError = async (err: FetchError): Promise<FetchError> => {
    return onResponseErrorInterceptors.reduce(async (acc, interceptor) => {
      return interceptor.onResponseError!(await acc)
    }, Promise.resolve(err))
  }

  return { onRequest, onResponse, onResponseError }
}

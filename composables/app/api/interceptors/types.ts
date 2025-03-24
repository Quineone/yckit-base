import type { FetchContext, FetchResponse, FetchError } from 'ofetch'

export interface Interceptor {
  onRequest?: (req: FetchContext) => FetchContext | Promise<FetchContext>
  onResponse?: <T>(res: FetchResponse<T>) => FetchResponse<T> | Promise<FetchResponse<T>>
  onResponseError?: (err: FetchError) => FetchError | Promise<FetchError>
}

export type HttpResponse = {
  statusCode: number
  body: any
}

export type FetchResponse = {
  message: string
  payload?: any
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete'

export type HttpRequest = {
  url: string
  method: HttpMethod
  headers?: any
  body?: any
  params?: any
}

export interface IHttpClient {
  request: (data: HttpRequest) => Promise<HttpResponse>
}

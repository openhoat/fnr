export interface HttpServer {
  readonly baseUrl: string | undefined
  configure: () => Promise<void>
  start: () => Promise<void>
  stop: () => Promise<void>
}

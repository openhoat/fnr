import type { UserDomain } from '../domain/user'
import type { HttpServer } from '../interfaces/http/server'
import type { Logger } from '../util/logger'
import type { Config } from './config'

export interface IocContainer {
  readonly config: Config
  readonly httpServer: HttpServer
  readonly logger: Logger
  readonly userDomain: UserDomain
}

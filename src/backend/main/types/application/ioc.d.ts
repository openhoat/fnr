import type { UserDomain } from '../domain/user'
import type { Orm } from '../infra/orm'
import type { HttpServer } from '../interfaces/http/server'
import type { Logger } from '../util/logger'
import type { Config } from './config'

export interface IocContainer {
  readonly config: Config
  readonly httpServer: HttpServer
  readonly logger: Logger
  readonly orm: Orm
  readonly userDomain: UserDomain
}

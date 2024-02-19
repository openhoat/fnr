import { Container } from 'inversify'

import { SimpleUserDomain } from '../../../domain/simple-user.domain'
import { AppLogger } from '../../../infra/logger/app-logger'
import { FastifyHttpServer } from '../../../interfaces/http/fastify/fastify-http-server'
import type { Config } from '../../../types/application/config'
import type { IocContainer } from '../../../types/application/ioc'
import type { UserDomain } from '../../../types/domain/user'
import type { HttpServer } from '../../../types/interfaces/http/server'
import type { Logger } from '../../../types/util/logger'
import { recordToString } from '../../../util/helper'
import { IOC_TYPES } from '../ioc-types'

class InversifyIocContainer implements IocContainer {
  readonly #container: Container

  get config(): Config {
    return this.#container.get(IOC_TYPES.Config)
  }

  get httpServer(): HttpServer {
    return this.#container.get(IOC_TYPES.HttpServer)
  }

  get logger(): Logger {
    return this.#container.get(IOC_TYPES.Logger)
  }

  get userDomain(): UserDomain {
    return this.#container.get(IOC_TYPES.UserDomain)
  }

  constructor(config: Config) {
    this.#container = new Container()
    const logger = new AppLogger(config)
    logger.debug(`Loaded config:\n\t${recordToString(config)}`)
    logger.debug('Initializing IoC container…')
    this.#registerConfig(config)
    this.#registerLogger(logger)
    this.#registerUserDomain(config)
    this.#registerHttpServer(logger)
    logger.info('IoC container initialized.')
  }

  #registerConfig(config: Config): void {
    this.#container.bind(IOC_TYPES.Config).toConstantValue(config)
  }

  #registerHttpServer(logger: AppLogger): void {
    this.#container
      .bind(IOC_TYPES.HttpServer)
      .toConstantValue(new FastifyHttpServer(this, logger.logger))
  }

  #registerLogger(logger: Logger): void {
    this.#container.bind(IOC_TYPES.Logger).toConstantValue(logger)
  }

  #registerUserDomain(config: Config): void {
    const simpleUserDomain = new SimpleUserDomain(config)
    this.#container.bind(IOC_TYPES.UserDomain).toConstantValue(simpleUserDomain)
  }
}

export { InversifyIocContainer }

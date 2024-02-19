import { Container } from 'inversify'

import { RepositoryUserDomain } from '../../../domain/repo-user.domain'
import { AppLogger } from '../../../infra/logger/app-logger'
import { PrismaOrm } from '../../../infra/orm/prisma-client'
import { UsersPrismaRepository } from '../../../infra/orm/repositories/users.prisma.repository'
import { FastifyHttpServer } from '../../../interfaces/http/fastify/fastify-http-server'
import type { Config } from '../../../types/application/config'
import type { IocContainer } from '../../../types/application/ioc'
import type { UsersRepository } from '../../../types/domain/repositories/users.repository'
import type { UserDomain } from '../../../types/domain/user'
import type { Orm } from '../../../types/infra/orm'
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

  get orm(): Orm {
    return this.#container.get(IOC_TYPES.Orm)
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
    const prismaOrm = new PrismaOrm(logger)
    this.#registerOrm(prismaOrm)
    const usersRepository = new UsersPrismaRepository(prismaOrm.prisma)
    this.#registerUsersRepository(usersRepository)
    this.#registerUserDomain(usersRepository)
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

  #registerOrm(orm: Orm): void {
    this.#container.bind(IOC_TYPES.Orm).toConstantValue(orm)
  }

  #registerUserDomain(usersRepository: UsersRepository): void {
    const simpleUserDomain = new RepositoryUserDomain(usersRepository)
    this.#container.bind(IOC_TYPES.UserDomain).toConstantValue(simpleUserDomain)
  }

  #registerUsersRepository(usersRepository: UsersRepository): void {
    this.#container
      .bind(IOC_TYPES.UsersRepository)
      .toConstantValue(usersRepository)
  }
}

export { InversifyIocContainer }

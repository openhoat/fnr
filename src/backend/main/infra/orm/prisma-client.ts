import { PrismaClient } from '@prisma/client'

import type { Orm } from '../../types/infra/orm'
import type { Logger } from '../../types/util/logger'

class PrismaOrm implements Orm {
  readonly #logger: Logger
  readonly #prisma: PrismaClient

  get prisma(): PrismaClient {
    return this.#prisma
  }

  constructor(logger: Logger) {
    this.#logger = logger
    const prisma = new PrismaClient({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
      ],
    })
    this.#prisma = prisma
    prisma.$on('query', (e) => {
      logger.trace(`prisma query: ${e.query} [${e.params}] (${e.duration}ms)`)
    })
    prisma.$on('error', (e) => {
      logger.error(e.message)
    })
    prisma.$on('warn', (e) => {
      logger.warn(e.message)
    })
    prisma.$on('info', (e) => {
      logger.info(e.message)
    })
  }

  async start(): Promise<void> {
    this.#logger.debug('Starting ORM client…')
    await this.#prisma.$connect()
    this.#logger.debug('ORM client started.')
  }

  async stop(): Promise<void> {
    this.#logger.debug('Stopping ORM client…')
    await this.#prisma.$disconnect()
    this.#logger.debug('ORM client stopped.')
  }
}

export { PrismaOrm }

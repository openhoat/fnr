import type {
  FastifyInstance,
  FastifyListenOptions,
  FastifyServerOptions,
} from 'fastify'
import Fastify from 'fastify'
import type pino from 'pino'

import type { IocContainer } from '../../../types/application/ioc'
import type { HttpServer } from '../../../types/interfaces/http/server'
import { toLocalhostIfLinux } from '../../../util/url-helper'
import { buildErrorHandler } from './errors/error.handler'
import { boomErrorNormalizer } from './errors/normalizers/boom.error.normalizer'
import { fastifyErrorNormalizer } from './errors/normalizers/fastify.error.normalizer'
import { prismaErrorNormalizer } from './errors/normalizers/prisma.error.normalizer'
import { plugins } from './plugins'
import { routes } from './routes'
import { notFoundHandler } from './util/not-found.handler'

declare module 'fastify' {
  export interface FastifyInstance {
    iocContainer: IocContainer
  }
}

class FastifyHttpServer implements HttpServer {
  readonly #fastify: FastifyInstance
  #baseUrl?: string

  get baseUrl(): string | undefined {
    return this.#baseUrl
  }

  get fastify(): FastifyInstance {
    return this.#fastify
  }

  constructor(iocContainer: IocContainer, logger: pino.Logger) {
    const fastifyOptions: FastifyServerOptions = {
      logger,
      disableRequestLogging: true,
      exposeHeadRoutes: false,
      forceCloseConnections: 'idle',
      requestTimeout: 3000,
    }
    this.#fastify = Fastify(fastifyOptions)
    this.#fastify.iocContainer = iocContainer
  }

  async configure(): Promise<void> {
    const fastify = this.#fastify
    const { log } = fastify
    fastify.addHook('onRoute', (route) => {
      log.debug(`Registered route: ${route.method.toString()} ${route.url}`)
    })
    fastify.setNotFoundHandler(notFoundHandler)
    fastify.setErrorHandler(
      buildErrorHandler(
        prismaErrorNormalizer,
        fastifyErrorNormalizer,
        boomErrorNormalizer,
      ),
    )
    fastify.addHook('onRequest', (request) => {
      log.debug(
        `Incoming request (#${request.id}): ${request.method} ${request.url}`,
      )
      return Promise.resolve()
    })
    fastify.addHook('onResponse', (request, reply) => {
      const { elapsedTime } = reply
      const time = Math.round(elapsedTime)
      log.info(
        `Request completed (#${request.id}): ${request.method} ${request.url} [HTTP ${reply.statusCode}] (${time}ms)`,
      )
      return Promise.resolve()
    })
    await fastify.register(plugins)
    await fastify.register(routes)
    await fastify.ready()
    log.trace(`Plugins registration details:\n${fastify.printPlugins()}`)
  }

  async start(): Promise<void> {
    const fastify = this.#fastify
    const { iocContainer, log } = fastify
    const { config } = iocContainer
    const fastifyListenOptions: FastifyListenOptions = {
      ...(config.host && { host: config.host }),
      listenTextResolver: () => 'Server is listening',
      port: config.port,
    }
    log.trace(
      `Fastify listen options : ${JSON.stringify(fastifyListenOptions)}`,
    )
    const address = await fastify.listen(fastifyListenOptions)
    const baseUrl = toLocalhostIfLinux(address)
    log.info(`Server is ready: visit ${baseUrl}/`)
    this.#baseUrl = baseUrl
  }

  async stop(): Promise<void> {
    const fastify = this.#fastify
    const { log } = fastify
    log.info('Stopping server…')
    await fastify.close()
    log.trace('Server stopped')
  }
}

export { FastifyHttpServer }

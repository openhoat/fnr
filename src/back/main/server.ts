import type {
  FastifyInstance,
  FastifyListenOptions,
  FastifyServerOptions,
  preHandlerAsyncHookHandler,
} from 'fastify'
import Fastify from 'fastify'
import type { Logger } from 'pino'
import pino from 'pino'

import type { Config } from './config'
import config from './config'
import { plugins } from './plugins'
import { routes } from './routes'
import { errorHandler } from './util/error.handler'
import { isKey } from './util/helper'
import { notFoundHandler } from './util/not-found.handler'

declare module 'fastify' {
  export interface FastifyInstance {
    config: Config
    verifyJWT?: preHandlerAsyncHookHandler
    vite: { ready: () => Promise<void> }
  }
  export interface FastifyReply {
    html: () => void
  }
}

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    userId: string
  }
}

const newLogger = (): Logger =>
  pino({
    level: config.logLevel,
    transport: {
      target: 'pino-pretty',
    },
  })

const init: () => FastifyInstance = () => {
  const fastifyOptions: FastifyServerOptions = {
    disableRequestLogging: true,
    exposeHeadRoutes: false,
    logger: newLogger(),
  }
  return Fastify(fastifyOptions)
}

const configure = async (fastify: FastifyInstance): Promise<void> => {
  const { log } = fastify
  fastify.config = config
  log.debug(
    `Loaded config:\n\t${Object.keys(config)
      .sort()
      .reduce(
        (lines: string[], key: string) =>
          isKey(config, key)
            ? [...lines, [key, config[key]].join(': ')]
            : lines,
        [],
      )
      .join('\n\t')}`,
  )
  fastify.addHook('onRoute', (route) => {
    log.debug(`Registered route: ${route.method.toString()} ${route.url}`)
  })
  fastify.setNotFoundHandler(notFoundHandler)
  fastify.setErrorHandler(errorHandler)
  fastify.addHook('onRequest', (request): Promise<void> => {
    log.info(
      `Incoming request (#${request.id}): ${request.method} ${request.url}`,
    )
    return Promise.resolve()
  })
  fastify.addHook('onResponse', (request, reply) => {
    const time = reply.getResponseTime()
    log.debug(
      `Request completed (#${request.id}): ${request.method} ${request.url} [HTTP ${reply.statusCode}] (${time}ms)`,
    )
    return Promise.resolve()
  })
  await fastify.register(plugins)
  await fastify.register(routes)
  await fastify.ready()
  log.trace(`Plugins registration details:\n${fastify.printPlugins()}`)
}

const start = async (fastify: FastifyInstance): Promise<void> => {
  const { log } = fastify
  const fastifyListenOptions: FastifyListenOptions = {
    ...(config.host && { host: config.host }),
    listenTextResolver: (address) => {
      const addressToConnect =
        process.platform === 'linux'
          ? address.replace('127.0.0.1', 'localhost')
          : address
      return `Server listening at ${addressToConnect}`
    },
    port: config.port,
  }
  log.trace(`Fastify listen options : ${JSON.stringify(fastifyListenOptions)}`)
  await fastify.listen(fastifyListenOptions)
}

const stop = async (fastify: FastifyInstance): Promise<void> => {
  await fastify.close()
}

export default { configure, init, start, stop }

import type {
  FastifyInstance,
  FastifyListenOptions,
  FastifyServerOptions,
} from 'fastify'
import Fastify from 'fastify'
import type { Logger } from 'pino'
import pino from 'pino'

import config from './config'
import { plugins } from './plugins'
import { routes } from './routes'
import { errorHandler } from './util/error.handler'
import { generateBaseUrl, isKey } from './util/helper'
import { notFoundHandler } from './util/not-found.handler'

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
  fastify.addHook('onRequest', (request) => {
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

const start = async (fastify: FastifyInstance): Promise<string> => {
  const { log } = fastify
  const fastifyListenOptions: FastifyListenOptions = {
    ...(config.host && { host: config.host }),
    listenTextResolver: () => 'Server is listening',
    port: config.port,
  }
  log.trace(`Fastify listen options : ${JSON.stringify(fastifyListenOptions)}`)
  const address = await fastify.listen(fastifyListenOptions)
  const baseUrl = generateBaseUrl(address)
  log.info(`Server is ready: visit ${baseUrl}/`)
  return baseUrl
}

const stop = async (fastify: FastifyInstance): Promise<void> => {
  const { log } = fastify
  log.info('Stopping server…')
  await fastify.close()
  log.trace('Server stopped')
}

export default { configure, init, start, stop }

import type { FastifyPluginAsync } from 'fastify'

const configRouter: FastifyPluginAsync = (fastify) => {
  const { config } = fastify
  const { corsOrigin, isDevelopment, logLevel } = config
  const exposedConfig = {
    corsOrigin,
    isDevelopment,
    logLevel,
  }
  fastify.get('/', () => exposedConfig)
  return Promise.resolve()
}

export { configRouter }

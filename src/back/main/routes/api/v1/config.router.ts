import type { FastifyPluginAsync } from 'fastify'

const configRouter: FastifyPluginAsync = (fastify) => {
  const { config } = fastify
  const { corsOrigin, isDevelopment, logLevel } = config
  fastify.get('/', () => ({
    corsOrigin,
    isDevelopment,
    logLevel,
  }))
  return Promise.resolve()
}

export { configRouter }

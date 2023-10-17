import type { FastifyInstance } from 'fastify'

const configRouter = (fastify: FastifyInstance): Promise<void> => {
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

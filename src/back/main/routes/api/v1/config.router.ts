import type { FastifyInstance } from 'fastify'

const configRouter = (fastify: FastifyInstance) => {
  const { config } = fastify
  const { isDevelopment } = config
  const exposedConfig = {
    isDevelopment,
  }
  fastify.get('/', () => exposedConfig)
  return Promise.resolve()
}

export { configRouter }

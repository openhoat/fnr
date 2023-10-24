import type { FastifyPluginAsync } from 'fastify'

const healthcheckRouter: FastifyPluginAsync = (fastify) => {
  fastify.get('/health', () => ({ web: { status: 'up' } }))
  return Promise.resolve()
}

export { healthcheckRouter }

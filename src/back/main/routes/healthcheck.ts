import type { FastifyInstance } from 'fastify'

const healthcheckRouter = (fastify: FastifyInstance): Promise<void> => {
  fastify.get('/health', () => ({ web: { status: 'up' } }))
  return Promise.resolve()
}

export { healthcheckRouter }

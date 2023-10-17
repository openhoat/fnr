import type { FastifyInstance } from 'fastify'

import { apiV1Router } from './v1'

const apiRouter = async (fastify: FastifyInstance): Promise<void> => {
  await fastify.register(apiV1Router, { prefix: '/v1' })
}

export { apiRouter }

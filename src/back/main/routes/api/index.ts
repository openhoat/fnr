import type { FastifyInstance } from 'fastify'

import { apiV1Router } from './v1'

const apiRouter = async (fastify: FastifyInstance) => {
  await fastify.register(apiV1Router, { prefix: '/v1' })
}

export { apiRouter }

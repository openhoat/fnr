import type { FastifyPluginAsync } from 'fastify'

import { apiV1Router } from './v1'

const apiRouter: FastifyPluginAsync = async (fastify) => {
  await fastify.register(apiV1Router, { prefix: '/v1' })
}

export { apiRouter }

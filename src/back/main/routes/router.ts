import type { FastifyInstance } from 'fastify'

import { apiRouter } from './api/api.router'
import { healthcheckRouter } from './healthcheck'

const registerRoutes = async (fastify: FastifyInstance) => {
  await fastify.register(healthcheckRouter)
  await fastify.register(apiRouter, { prefix: '/api/v1' })
}

export { registerRoutes }

import type { FastifyInstance } from 'fastify'

import { apiRouter } from './api'
import { authRouter } from './auth'
import { healthcheckRouter } from './healthcheck'

const routes = async (fastify: FastifyInstance) => {
  await fastify.register(healthcheckRouter)
  await fastify.register(authRouter, { prefix: '/auth' })
  await fastify.register(apiRouter, { prefix: '/api' })
}

export { routes }

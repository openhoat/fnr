import type { FastifyPluginAsync } from 'fastify'

import { apiRouter } from './api'
import { healthcheckRouter } from './healthcheck'

const routes: FastifyPluginAsync = async (fastify) => {
  await fastify.register(healthcheckRouter)
  await fastify.register(apiRouter, { prefix: '/api' })
}

export { routes }

import type { FastifyInstance } from 'fastify'

import { aboutRouter } from './about.router'
import { configRouter } from './config.router'

const apiRouter = async (fastify: FastifyInstance) => {
  await fastify.register(aboutRouter)
  await fastify.register(configRouter)
}

export { apiRouter }

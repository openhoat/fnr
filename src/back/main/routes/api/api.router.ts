import type { FastifyInstance } from 'fastify'

import { needJwt } from '../../features/jwt.feature'
import { aboutRouter } from './about.router'
import { configRouter } from './config.router'

const apiRouter = async (fastify: FastifyInstance) => {
  needJwt(fastify)
  await fastify.register(aboutRouter)
  await fastify.register(configRouter)
}

export { apiRouter }

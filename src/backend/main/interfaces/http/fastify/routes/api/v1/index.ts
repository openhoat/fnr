import type { FastifyPluginAsync } from 'fastify'

import { aboutRouter } from './about.router'
import { configRouter } from './config.router'

const apiV1Router: FastifyPluginAsync = async (fastify) => {
  await fastify.register(aboutRouter, { prefix: '/about' })
  await fastify.register(configRouter, { prefix: '/config' })
}

export { apiV1Router }

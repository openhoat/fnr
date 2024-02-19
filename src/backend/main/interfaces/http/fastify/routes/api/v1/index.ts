import type { FastifyPluginAsync } from 'fastify'

import { aboutRouter } from './about.router'
import { configRouter } from './config.router'
import { usersRouter } from './users.router'

const apiV1Router: FastifyPluginAsync = async (fastify) => {
  await fastify.register(aboutRouter, { prefix: '/about' })
  await fastify.register(configRouter, { prefix: '/config' })
  await fastify.register(usersRouter, { prefix: '/users' })
}

export { apiV1Router }

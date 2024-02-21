import type { FastifyPluginAsync } from 'fastify'

import { aboutRouter } from './about.router'

const apiV1Router: FastifyPluginAsync = async (fastify) => {
  await fastify.register(aboutRouter, { prefix: '/about' })
}

export { apiV1Router }

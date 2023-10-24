import type { FastifyPluginAsync } from 'fastify'

import { needJwt } from '../../../plugins/jwt.plugin'
import { aboutRouter } from './about.router'
import { configRouter } from './config.router'

const apiV1Router: FastifyPluginAsync = async (fastify) => {
  const { config } = fastify
  if (config.authUsername) {
    await fastify.register(needJwt)
  }
  await fastify.register(aboutRouter, { prefix: '/about' })
  await fastify.register(configRouter, { prefix: '/config' })
}

export { apiV1Router }

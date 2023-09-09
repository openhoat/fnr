import type { FastifyInstance } from 'fastify'

import { needJwt } from '../../../plugins/jwt.plugin'
import { aboutRouter } from './about.router'
import { configRouter } from './config.router'

const apiV1Router = async (fastify: FastifyInstance) => {
  const { config } = fastify
  if (config.authUsername) {
    needJwt(fastify)
  }
  await fastify.register(aboutRouter, { prefix: '/about' })
  await fastify.register(configRouter, { prefix: '/config' })
}

export { apiV1Router }

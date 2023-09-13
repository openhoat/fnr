import type { FastifyInstance } from 'fastify'

import { authTokenRouter } from './token.router'

const authRouter = async (fastify: FastifyInstance) => {
  await fastify.register(authTokenRouter)
}

export { authRouter }

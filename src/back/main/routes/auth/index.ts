import type { FastifyInstance } from 'fastify'

import { tokenRouter } from './token.router'

const authRouter = async (fastify: FastifyInstance) => {
  await fastify.register(tokenRouter, { prefix: '/token' })
}

export { authRouter }

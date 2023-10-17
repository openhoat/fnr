import type { FastifyInstance } from 'fastify'

import { signInRouter } from './sign-in.router'
import { signOutRouter } from './sign-out.router'

const authRouter = async (fastify: FastifyInstance): Promise<void> => {
  await fastify.register(signInRouter, { prefix: '/sign-in' })
  await fastify.register(signOutRouter, { prefix: '/sign-out' })
}

export { authRouter }

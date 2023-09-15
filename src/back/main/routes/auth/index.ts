import type { FastifyInstance } from 'fastify'

import { signInRouter } from './sign-in.router'
import { signOutRouter } from './sign-out.router'

const authRouter = async (fastify: FastifyInstance) => {
  await fastify.register(signInRouter, { prefix: '/signin' })
  await fastify.register(signOutRouter, { prefix: '/signout' })
}

export { authRouter }

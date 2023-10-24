import type { FastifyPluginAsync } from 'fastify'

import { signInRouter } from './sign-in.router'
import { signOutRouter } from './sign-out.router'

const authRouter: FastifyPluginAsync = async (fastify) => {
  await fastify.register(signInRouter, { prefix: '/sign-in' })
  await fastify.register(signOutRouter, { prefix: '/sign-out' })
}

export { authRouter }

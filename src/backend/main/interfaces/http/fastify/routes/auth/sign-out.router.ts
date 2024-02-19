import type { FastifyPluginAsync } from 'fastify'
import HttpStatusCodes from 'http-status-codes'

const signOutRouter: FastifyPluginAsync = (fastify) => {
  fastify.post('/', async (__, reply) => {
    void reply.cookie('token', '', {
      maxAge: -1,
      path: '/',
    })
    void reply.cookie('authenticated', '', {
      maxAge: -1,
      path: '/',
    })
    void reply.status(HttpStatusCodes.NO_CONTENT)
    await reply.send()
  })
  return Promise.resolve()
}

export { signOutRouter }

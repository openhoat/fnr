import type { FastifyPluginAsync } from 'fastify'

const authTokenRouter: FastifyPluginAsync = (fastify) => {
  const { log } = fastify
  fastify.post('/token', async (request) => {
    const payload = request.body
    const token = fastify.jwt.sign({ payload })
    log.trace(`generated jwt token: ${token}`)
    return { token }
  })
  return Promise.resolve()
}

export { authTokenRouter }

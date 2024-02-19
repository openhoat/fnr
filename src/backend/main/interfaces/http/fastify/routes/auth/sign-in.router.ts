import type { FastifyPluginAsync } from 'fastify'

const signInRouter: FastifyPluginAsync = (fastify) => {
  const { iocContainer, jwt, log } = fastify
  const { userDomain } = iocContainer
  fastify.post<{ Body: { password?: string; username?: string } | undefined }>(
    '/',
    (request, reply) => {
      const { username = '', password = '' } = request.body ?? {}
      userDomain.signIn(username, password)
      const token = jwt.sign({ username })
      log.trace(`Generated jwt token: ${token}`)
      void reply.cookie('token', token, {
        httpOnly: true,
        path: '/',
        sameSite: true,
        signed: true,
      })
      void reply.cookie('authenticated', 'true', {
        httpOnly: false,
        path: '/',
        sameSite: true,
        signed: true,
      })
      return { token }
    },
  )
  return Promise.resolve()
}

export { signInRouter }

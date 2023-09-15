import Boom from '@hapi/boom'
import type { FastifyPluginAsync } from 'fastify'

import type { Config } from '../../config'

const signIn = (config: Config, username?: string, password?: string) => {
  if (
    config.authUsername &&
    (username !== config.authUsername || password !== config.authPassword)
  ) {
    throw Boom.unauthorized()
  }
}

const signInRouter: FastifyPluginAsync = (fastify) => {
  const { config, log } = fastify
  fastify.post<{ Body: { username?: string; password?: string } | undefined }>(
    '/',
    (request, reply) => {
      const { username, password } = request.body || {}
      signIn(config, username, password)
      const token = fastify.jwt.sign({ username })
      log.trace(`generated jwt token: ${token}`)
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

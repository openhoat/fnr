import type { FastifyJWTOptions, VerifyPayloadType } from '@fastify/jwt'
import fastifyJwt from '@fastify/jwt'
import Boom from '@hapi/boom'
import type {
  FastifyInstance,
  FastifyRequest,
  preHandlerAsyncHookHandler,
} from 'fastify'
import type { FastifyPluginAsync } from 'fastify/types/plugin'
import fastifyPlugin from 'fastify-plugin'

import type { JwtPayload } from '../../../../types/interfaces/http/fastify/plugins/jwt.plugin'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    payload: JwtPayload
  }
}

declare module 'fastify' {
  export interface FastifyInstance {
    verifyJWT?: preHandlerAsyncHookHandler
  }
}

const jwtPreHandler: preHandlerAsyncHookHandler = async function (
  this: FastifyInstance,
  request: FastifyRequest,
): Promise<VerifyPayloadType> {
  try {
    const jwtPayload = await request.jwtVerify<JwtPayload>()
    this.log.trace({ jwtPayload }, `JWT payload in jwtPreHandler`)
    return jwtPayload
  } catch {
    throw Boom.unauthorized()
  }
}

const jwtPlugin: FastifyPluginAsync = fastifyPlugin(
  async (fastify: FastifyInstance) => {
    const { iocContainer, log } = fastify
    const { config } = iocContainer
    const { jwtSecret } = config
    if (!jwtSecret) {
      throw new Error('Missing jwtSecret in config')
    }
    log.trace('Registering jwt plugin')
    const jwtOptions: FastifyJWTOptions = {
      cookie: { cookieName: 'token', signed: true },
      secret: jwtSecret,
    }
    await fastify.register(fastifyJwt, jwtOptions)
    fastify.decorate('verifyJWT', jwtPreHandler)
    log.debug('Jwt plugin successfully registered')
  },
)

const needJwt: FastifyPluginAsync = fastifyPlugin(
  (fastify: FastifyInstance) => {
    const { log, verifyJWT } = fastify
    if (!verifyJWT) {
      return Promise.reject(
        new Error(
          'Cannot use JWT authentication because verifiJWT is missing in fastify instance',
        ),
      )
    }
    log.debug('Adding onRequest hook for JWT')
    fastify.addHook('onRequest', async (request, reply) => {
      await verifyJWT.call(fastify, request, reply)
    })
    return Promise.resolve()
  },
)

export { jwtPlugin, jwtPreHandler, needJwt }

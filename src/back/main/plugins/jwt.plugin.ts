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

const jwtPreHandler: preHandlerAsyncHookHandler = async function (
  this: FastifyInstance,
  request: FastifyRequest,
): Promise<VerifyPayloadType> {
  try {
    const jwtPayload = await request.jwtVerify()
    this.log.trace({ jwtPayload }, `JWT payload in jwtPreHandler`)
    return jwtPayload
  } catch {
    throw Boom.unauthorized()
  }
}

const jwtPlugin: FastifyPluginAsync = fastifyPlugin(
  async (fastify: FastifyInstance) => {
    const { config, log } = fastify
    const { jwtSecret } = config
    if (!jwtSecret) {
      throw new Error('missing jwtSecret in config')
    }
    log.trace('Registering jwt plugin')
    const jwtOptions: FastifyJWTOptions = {
      cookie: { cookieName: 'token', signed: true },
      secret: jwtSecret,
    }
    await fastify.register(
      fastifyJwt as FastifyPluginAsync<FastifyJWTOptions>,
      jwtOptions,
    )
    fastify.decorate('verifyJWT', jwtPreHandler)
    log.debug('Jwt plugin successfully registered')
  },
)

const needJwt: FastifyPluginAsync = fastifyPlugin(
  (fastify: FastifyInstance) => {
    const { log, verifyJWT } = fastify
    if (verifyJWT) {
      log.debug('Adding onRequest hook for JWT')
      fastify.addHook('onRequest', async (request, reply) => {
        await verifyJWT.call(fastify, request, reply)
      })
    }
    return Promise.resolve()
  },
)

export { jwtPlugin, needJwt }

import type { FastifyJWTOptions, VerifyPayloadType } from '@fastify/jwt'
import fastifyJwt from '@fastify/jwt'
import Boom from '@hapi/boom'
import type {
  FastifyInstance,
  FastifyRequest,
  preHandlerAsyncHookHandler,
} from 'fastify'
import type { FastifyPluginAsync } from 'fastify/types/plugin'

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

const registerJwtFeature = async (fastify: FastifyInstance) => {
  const { config, log } = fastify
  log.trace('Registering jwt plugin')
  const jwtOptions: FastifyJWTOptions = {
    secret: config.jwtSecret,
  }
  await fastify.register(
    fastifyJwt as FastifyPluginAsync<FastifyJWTOptions>,
    jwtOptions,
  )
  fastify.decorate('verifyJWT', jwtPreHandler)
  log.debug('Jwt plugin successfully registered')
}

const needJwt = (fastify: FastifyInstance) => {
  const { verifyJWT } = fastify
  if (verifyJWT) {
    fastify.addHook('onRequest', async (request, reply) => {
      await verifyJWT.call(fastify, request, reply)
    })
  }
}

export { needJwt, registerJwtFeature }

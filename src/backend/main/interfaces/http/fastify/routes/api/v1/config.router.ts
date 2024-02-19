import type { FastifyPluginAsync } from 'fastify'

import { needJwt } from '../../../plugins/jwt.plugin'

const configRouter: FastifyPluginAsync = async (fastify) => {
  const { iocContainer, log } = fastify
  const { config } = iocContainer
  if (config.authUsername) {
    log.debug('Register needJwt plugin')
    await fastify.register(needJwt)
  }
  const { corsOrigin, isDevelopment, logLevel } = config
  fastify.get('/', () => ({
    corsOrigin,
    isDevelopment,
    logLevel,
  }))
}

export { configRouter }

import type { FastifyInstance } from 'fastify'

import { registerAcceptsFeature } from './accept.feature'
import { registerCookieFeature } from './cookie.feature'
import { registerFormBodyParserFeature } from './form-body-parser.feature'
import { registerHomePageFeature } from './home-page.feature.'
import { registerJwtFeature } from './jwt.feature'

const registerFeatures = async (fastify: FastifyInstance) => {
  const { log } = fastify
  await registerFormBodyParserFeature(fastify)
  await registerAcceptsFeature(fastify)
  await registerCookieFeature(fastify)
  await registerHomePageFeature(fastify)
  await registerJwtFeature(fastify)
  log.debug('All features registered')
}

export { registerFeatures }

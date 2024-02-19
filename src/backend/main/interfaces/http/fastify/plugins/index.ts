import fastifyAccepts from '@fastify/accepts'
import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyFormbody from '@fastify/formbody'
import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import fastifyGracefulShutdown from 'fastify-graceful-shutdown'
import fastifyPlugin from 'fastify-plugin'

import { registerPlugin } from '../util/fastify-plugin.registerer'
import { apidocPlugin } from './apidoc.plugin'
import { homePagePlugin } from './home-page.plugin'
import { jwtPlugin } from './jwt.plugin'
import { swaggerUiPlugin } from './swagger-ui.plugin'

const plugins: FastifyPluginAsync = fastifyPlugin(
  async (fastify: FastifyInstance) => {
    const { iocContainer, log } = fastify
    const { config } = iocContainer
    log.info('Registering plugins')
    await registerPlugin(fastify, 'gracefulShutdown', fastifyGracefulShutdown, {
      timeout: 5000,
    })
    await registerPlugin(fastify, 'formBodyParser', fastifyFormbody)
    await registerPlugin(fastify, 'accepts', fastifyAccepts)
    await registerPlugin(fastify, 'cookie', fastifyCookie, {
      secret: config.cookieSecret,
    })
    if (config.corsOrigin) {
      await registerPlugin(fastify, 'cors', fastifyCors, {
        origin: config.corsOrigin,
      })
    }
    if (config.jwtSecret) {
      await registerPlugin(fastify, 'jwt', jwtPlugin)
    }
    await registerPlugin(fastify, 'apidoc', apidocPlugin)
    await registerPlugin(fastify, 'swaggerUi', swaggerUiPlugin)
    await registerPlugin(fastify, 'homePage', homePagePlugin)
    log.info('All plugins registered')
  },
)

export { plugins }

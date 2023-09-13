import fastifyAccepts from '@fastify/accepts'
import fastifyCookie from '@fastify/cookie'
import fastifyFormbody from '@fastify/formbody'
import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

import { registerPlugin } from '../util/fastify-plugin.registerer'
import { apidocPlugin } from './apidoc.plugin'
import { homePagePlugin } from './home-page.plugin.'
import { jwtPlugin } from './jwt.plugin'
import { swaggerUiPlugin } from './swagger-ui.plugin'

const plugins: FastifyPluginAsync = fastifyPlugin(
  async (fastify: FastifyInstance) => {
    const { log } = fastify
    log.info('Registering plugins')
    await registerPlugin(fastify, 'formBodyParser', fastifyFormbody)
    await registerPlugin(fastify, 'accepts', fastifyAccepts)
    await registerPlugin(fastify, 'cookie', fastifyCookie)
    await registerPlugin(fastify, 'homePage', homePagePlugin)
    await registerPlugin(fastify, 'jwt', jwtPlugin)
    await registerPlugin(fastify, 'apidoc', apidocPlugin)
    await registerPlugin(fastify, 'swaggerUi', swaggerUiPlugin)
    log.info('All plugins registered')
  },
)

export { plugins }

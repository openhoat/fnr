import { join } from 'node:path'

import type { FastifyBasicAuthOptions } from '@fastify/basic-auth'
import fastifyBasicAuth from '@fastify/basic-auth'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import Boom from '@hapi/boom'
import type { FastifyPluginAsync } from 'fastify'

const swaggerUiPlugin: FastifyPluginAsync = async (fastify) => {
  const { config } = fastify.iocContainer
  const { baseDir, authUsername, authPassword } = config
  const swaggerBaseDir = join(baseDir, 'swagger')
  const validate = authUsername
    ? (username: string, password: string): Promise<void> => {
        if (username !== authUsername || password !== authPassword) {
          throw Boom.unauthorized()
        }
        return Promise.resolve()
      }
    : undefined
  if (validate) {
    const basicAuthOptions: FastifyBasicAuthOptions = {
      validate,
      authenticate: { realm: 'Swagger console' },
    }
    void fastify.register(fastifyBasicAuth, basicAuthOptions)
    await fastify.after()
    fastify.addHook('onRequest', fastify.basicAuth)
  }
  await fastify.register(fastifySwagger, {
    mode: 'static',
    specification: {
      baseDir: swaggerBaseDir,
      path: join(swaggerBaseDir, 'openapi.yaml'),
    },
  })
  await fastify.register(fastifySwaggerUi, {
    baseDir: swaggerBaseDir,
    routePrefix: '/swagger',
    uiConfig: {
      deepLinking: false,
      docExpansion: 'list',
      tryItOutEnabled: true,
    },
  })
}

export { swaggerUiPlugin }

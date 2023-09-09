import type { FastifyBasicAuthOptions } from '@fastify/basic-auth'
import fastifyBasicAuth from '@fastify/basic-auth'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import Boom from '@hapi/boom'
import type { FastifyPluginAsync } from 'fastify'
import { join } from 'path'

import baseDir from '../base-dir'

const swaggerUiPlugin: FastifyPluginAsync = async (fastify) => {
  const { config } = fastify
  const validate = config.authUsername
    ? (username: string, password: string): Promise<void> => {
        if (
          username !== config.authUsername ||
          password !== config.authPassword
        ) {
          throw Boom.unauthorized()
        }
        return Promise.resolve()
      }
    : undefined
  const swaggerBaseDir = join(baseDir, 'swagger')
  if (validate) {
    const basicAuthOptions: FastifyBasicAuthOptions = {
      validate,
      authenticate: { realm: 'Swagger console' },
    }
    void fastify.register(fastifyBasicAuth, basicAuthOptions)
    await fastify.after()
    fastify.addHook('onRequest', fastify.basicAuth)
  }
  void fastify.register(fastifySwagger, {
    mode: 'static',
    specification: {
      baseDir: swaggerBaseDir,
      path: join(swaggerBaseDir, 'openapi.yaml'),
    },
  })
  void fastify.register(fastifySwaggerUi, {
    baseDir: swaggerBaseDir,
    routePrefix: '/swagger',
    uiConfig: {
      deepLinking: false,
      docExpansion: 'list',
      tryItOutEnabled: true,
    },
  })
  return Promise.resolve()
}

export { swaggerUiPlugin }

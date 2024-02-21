import { join } from 'node:path'

import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import type { FastifyPluginAsync } from 'fastify'

const swaggerUiPlugin: FastifyPluginAsync = async (fastify) => {
  const { config } = fastify.iocContainer
  const { baseDir } = config
  const swaggerBaseDir = join(baseDir, 'swagger')
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

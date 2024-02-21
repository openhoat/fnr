import { join } from 'node:path'

import type { FastifyStaticOptions } from '@fastify/static'
import fastifyStatic from '@fastify/static'
import type { FastifyViteOptions } from '@fastify/vite'
import fastifyVite from '@fastify/vite'
import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

const homePagePlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const { config } = fastify.iocContainer
  const { baseDir, isDevelopment } = config
  fastify.get('/', (__, reply) => {
    void reply.redirect('/app')
  })
  if (isDevelopment) {
    const fastifyViteOptions: FastifyViteOptions = {
      dev: true,
      root: baseDir,
      spa: true,
    }
    fastify.log.trace(
      `Vite plugin options: ${JSON.stringify(fastifyViteOptions)}`,
    )
    fastify.log.trace('Registering vite plugin')
    await fastify.register(fastifyVite, fastifyViteOptions)
    fastify.get('/app', (__, reply) => {
      reply.html()
    })
    fastify.get('/app/*', (__, reply) => {
      reply.html()
    })
    await fastify.vite.ready()
    fastify.log.debug('Vite plugin successfully registered')
    return
  }
  const fastifyStaticOptions: FastifyStaticOptions = {
    prefix: '/app/assets',
    root: join(baseDir, 'dist', 'client', 'assets'),
  }
  const homePageFile = join('dist', 'client', 'index.html')
  fastify.get('/app', async (__, reply) => {
    void reply.type('text/html')
    await reply.sendFile(homePageFile, baseDir)
  })
  fastify.get('/app/*', async (__, reply) => {
    void reply.type('text/html')
    await reply.sendFile(homePageFile, baseDir)
  })
  await fastify.register(fastifyStatic, fastifyStaticOptions)
}

export { homePagePlugin }

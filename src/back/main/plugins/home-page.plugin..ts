import { join } from 'node:path'

import type { FastifyStaticOptions } from '@fastify/static'
import fastifyStatic from '@fastify/static'
import type { FastifyViteOptions } from '@fastify/vite'
import fastifyVite from '@fastify/vite'
import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

import baseDir from '../base-dir'

const homePagePlugin: FastifyPluginAsync = fastifyPlugin(
  async (fastify: FastifyInstance) => {
    const { config, log } = fastify
    fastify.get('/', (__, reply) => {
      void reply.redirect('/app')
    })
    if (config.isDevelopment) {
      const fastifyViteOptions: FastifyViteOptions = {
        dev: true,
        root: baseDir,
        spa: true,
      }
      log.trace(`Vite plugin options: ${JSON.stringify(fastifyViteOptions)}`)
      log.trace('Registering vite plugin')
      await fastify.register(fastifyVite, fastifyViteOptions)
      fastify.get('/app', (__, reply) => {
        reply.html()
      })
      fastify.get('/app/*', (__, reply) => {
        reply.html()
      })
      await fastify.vite.ready()
      log.debug('Vite plugin successfully registered')
      return
    }
    const fastifyStaticOptions: FastifyStaticOptions = {
      decorateReply: false,
      prefix: '/app/assets',
      root: join(baseDir, 'dist', 'client', 'assets'),
    }
    await fastify.register(fastifyStatic, fastifyStaticOptions)
    const homePageFile = join(baseDir, 'dist', 'client', 'index.html')
    fastify.get('/app', (__, reply) => {
      void reply.type('text/html')
      void reply.sendFile(homePageFile)
    })
    fastify.get('/app/*', (__, reply) => {
      void reply.type('text/html')
      void reply.sendFile(homePageFile)
    })
  },
)

export { homePagePlugin }

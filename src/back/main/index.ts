import type { FastifyInstance } from 'fastify'

import server from './server'

const bootstrap = async (): Promise<void> => {
  let fastify: FastifyInstance | undefined
  try {
    fastify = server.init()
    await server.configure(fastify)
    await server.start(fastify)
  } catch (err) {
    if (fastify) {
      fastify.log.error(err)
    } else {
      console.error(err)
    }
    process.exit(1)
  }
}

void bootstrap()

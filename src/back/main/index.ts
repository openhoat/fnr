import type { FastifyInstance } from 'fastify'

import server from './server'

const bootstrap = async (): Promise<void> => {
  let fastify: FastifyInstance | undefined
  try {
    fastify = server.init()
    await server.configure(fastify)
    await server.start(fastify)
  } catch (error) {
    if (fastify) {
      fastify.log.error(error)
    } else {
      console.error(error)
    }
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  }
}

void bootstrap()

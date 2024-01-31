import type { preHandlerAsyncHookHandler } from 'fastify'

import type { Config } from './config'
import server from './server'

declare module 'fastify' {
  export interface FastifyInstance {
    config: Config
    verifyJWT?: preHandlerAsyncHookHandler
    vite: { ready: () => Promise<void> }
  }
  export interface FastifyReply {
    html: () => void
  }
}

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    userId: string
  }
}

const bootstrap = async (): Promise<void> => {
  try {
    const fastify = server.init()
    const { log } = fastify
    log.debug('Register process "SIGINT" signal handling')
    const signalHandler = (signal: string): void => {
      log.debug(`Detected process signal: ${signal}`)
      void server.stop(fastify).then(() => {
        log.info('Nothing more to do: exiting…')
        // eslint-disable-next-line unicorn/no-process-exit
        process.exit(0)
      })
    }
    process.once('SIGINT', signalHandler)
    process.once('SIGTERM', signalHandler)
    await server.configure(fastify)
    await server.start(fastify)
  } catch (error) {
    console.error(error)
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  }
}

void bootstrap()

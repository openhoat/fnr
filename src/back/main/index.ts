import server from './server'

const bootstrap = async (): Promise<void> => {
  try {
    const fastify = server.init()
    const { log } = fastify
    log.debug('Register process "SIGINT" signal handling')
    process.once('SIGINT', (signal): void => {
      log.debug(`Detected process signal: ${signal}`)
      void server.stop(fastify).then(() => {
        log.info('Nothing more to do: exiting…')
        // eslint-disable-next-line unicorn/no-process-exit
        process.exit(0)
      })
    })
    await server.configure(fastify)
    await server.start(fastify)
  } catch (error) {
    console.error(error)
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  }
}

void bootstrap()

import { PrismaClient } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import type { FastifyPluginAsync } from 'fastify/types/plugin'
import fastifyPlugin from 'fastify-plugin'

const prismaPlugin: FastifyPluginAsync = fastifyPlugin(
  (fastify: FastifyInstance) => {
    const { log } = fastify
    const prisma = new PrismaClient({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
      ],
    })
    prisma.$on('query', (e) => {
      log.trace(`prisma query: ${e.query} [${e.params}] (${e.duration}ms)`)
    })
    prisma.$on('error', (e) => {
      log.error(e.message)
    })
    prisma.$on('warn', (e) => {
      log.warn(e.message)
    })
    prisma.$on('info', (e) => {
      log.info(e.message)
    })
    fastify.prisma = prisma
    fastify.addHook('onReady', async () => {
      log.debug('Connecting prisma…')
      await prisma.$connect()
      log.debug('Prisma connected')
    })
    fastify.addHook('onClose', async () => {
      log.debug('Disconnecting prisma…')
      await prisma.$disconnect()
      log.debug('Prisma disconnected')
    })
    return Promise.resolve()
  },
)

export { prismaPlugin }

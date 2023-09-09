import fastifyAccepts from '@fastify/accepts'
import type { FastifyInstance } from 'fastify'

const registerAcceptsFeature = async (fastify: FastifyInstance) => {
  const { log } = fastify
  log.trace('Registering accepts plugin')
  await fastify.register(fastifyAccepts)
  log.debug('Accepts plugin successfully registered')
}

export { registerAcceptsFeature }

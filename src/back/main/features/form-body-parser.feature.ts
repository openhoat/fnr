import fastifyFormbody from '@fastify/formbody'
import type { FastifyInstance } from 'fastify'

const registerFormBodyParserFeature = async (fastify: FastifyInstance) => {
  const { log } = fastify
  log.trace('Registering form body parser plugin')
  await fastify.register(fastifyFormbody)
  log.debug('Form body parser plugin successfully registered')
}

export { registerFormBodyParserFeature }

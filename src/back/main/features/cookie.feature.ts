import fastifyCookie from '@fastify/cookie'
import type { FastifyInstance } from 'fastify'

const registerCookieFeature = async (fastify: FastifyInstance) => {
  const { log } = fastify
  log.trace('Registering cookie plugin')
  await fastify.register(fastifyCookie, {})
  log.debug('Cookie plugin successfully registered')
}

export { registerCookieFeature }

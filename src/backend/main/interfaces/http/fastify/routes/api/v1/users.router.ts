import Boom from '@hapi/boom'
import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

import { needJwt } from '../../../plugins/jwt.plugin'

const usersRouter: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const { iocContainer, log } = fastify
  const { config, userDomain } = iocContainer
  if (config.authUsername) {
    log.debug('Register needJwt plugin')
    await fastify.register(needJwt)
  }
  fastify.get('/', async () => {
    const users = await userDomain.fetchAllUsers()
    log.trace(`Fetched users: ${JSON.stringify(users)}`)
    return users
  })
  fastify.get('/me', async (request) => {
    const userDto = await userDomain.findUserById(request.user.userId)
    log.trace(`Fetched user: ${JSON.stringify(userDto)}`)
    return userDto
  })
  fastify.get<{ Params: { id: string } }>('/:id', async (request) => {
    const { id } = request.params
    const userDto = await userDomain.findUserById(id)
    if (!userDto) {
      throw Boom.notFound()
    }
    log.trace(`Fetched user: ${JSON.stringify(userDto)}`)
    return userDto
  })
  fastify.post<{
    Body: { email: string; password: string; role: string; username: string }
  }>('/', async (request) => {
    const { email, username, password, role } = request.body
    const data = { email, password, role, username }
    const userDto = await userDomain.createUser(data)
    log.trace(`Created user: ${JSON.stringify(userDto)}`)
    return userDto
  })
  fastify.delete<{ Params: { id: string } }>('/:id', async (request) => {
    const { id } = request.params
    const userDto = await userDomain.deleteUser(id)
    if (!userDto) {
      throw Boom.notFound()
    }
    log.trace(`Deleted user: ${JSON.stringify(userDto)}`)
    return userDto
  })
}

export { usersRouter }

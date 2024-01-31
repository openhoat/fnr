import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

const usersRouter: FastifyPluginAsync = (fastify: FastifyInstance) => {
  const { log, prisma } = fastify
  if (!prisma) {
    log.warn('Prisma is not initialized: ignore users API route')
    return Promise.resolve()
  }
  fastify.get('/', async () => {
    const users = await prisma.user.findMany()
    log.trace(`Fetched users: ${JSON.stringify(users)}`)
    return users
  })
  fastify.get<{ Params: { id: string } }>('/:id', async (request) => {
    const { id } = request.params
    const user = await prisma.user.findUnique({ where: { id } })
    log.trace(`Fetched user: ${JSON.stringify(user)}`)
    return user
  })
  fastify.post<{ Body: { email: string; name: string } }>(
    '/',
    async (request) => {
      const { email, name } = request.body
      const data = { email, name }
      const user = await prisma.user.create({ data })
      log.trace(`Created user: ${JSON.stringify(user)}`)
      return user
    },
  )
  fastify.delete<{ Params: { id: string } }>('/:id', async (request) => {
    const { id } = request.params
    const user = await prisma.user.delete({ where: { id } })
    log.trace(`Deleted user: ${JSON.stringify(user)}`)
    return user
  })
  return Promise.resolve()
}

export { usersRouter }

import Boom from '@hapi/boom'
import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

import { createUserMutation } from '../../../../../../../../common/graphql/mutations/create-user.mutation'
import { deleteUserMutation } from '../../../../../../../../common/graphql/mutations/delete-user.mutation'
import { meQuery } from '../../../../../../../../common/graphql/queries/me.query'
import { userByIdQuery } from '../../../../../../../../common/graphql/queries/user-by-id.query'
import { usersQuery } from '../../../../../../../../common/graphql/queries/users.query'
import type { UserDto } from '../../../../../../types/domain/user'
import { executeGql } from '../../../../graphql/util/helper'

const usersRouter: FastifyPluginAsync = (fastify: FastifyInstance) => {
  fastify.get('/', async (__, reply) => {
    const { users } = await executeGql<{ users: UserDto[] }>(reply, usersQuery)
    return users
  })
  fastify.get('/me', async (__, reply) => {
    const { me } = await executeGql<{ me: UserDto | null }>(reply, meQuery)
    if (!me) {
      throw Boom.notFound()
    }
    return me
  })
  fastify.get<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const { id } = request.params
    const { user } = await executeGql<{ user: UserDto | null }>(
      reply,
      userByIdQuery,
      {
        variables: { id },
      },
    )
    if (!user) {
      throw Boom.notFound()
    }
    return user
  })
  fastify.post<{ Body: { email: string; password: string; username: string } }>(
    '/',
    async (request, reply) => {
      const { email, username, password } = request.body
      const { newUser } = await executeGql<{ newUser: UserDto }>(
        reply,
        createUserMutation,
        {
          variables: {
            email,
            password,
            username,
          },
        },
      )
      return newUser
    },
  )
  fastify.delete<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const { id } = request.params
    const { deletedUser } = await executeGql<{ deletedUser: UserDto }>(
      reply,
      deleteUserMutation,
      {
        variables: { id },
      },
    )
    return deletedUser
  })
  return Promise.resolve()
}

export { usersRouter }

import type { IResolvers } from '@graphql-tools/utils'
import type { MercuriusContext } from 'mercurius'

import type { UserPayload } from '../../../../types/domain/user'

const usersResolver: IResolvers<unknown, MercuriusContext> = {
  Mutation: {
    createUser: (__, args: UserPayload, context) => {
      const { app } = context
      const { iocContainer } = app
      const { userDomain } = iocContainer
      const { username, password, email, role } = args
      return userDomain.createUser({
        email,
        password,
        role,
        username,
      })
    },
    deleteUser: (__, args: { id: string }, context) => {
      const { app } = context
      const { iocContainer } = app
      const { userDomain } = iocContainer
      const { id } = args
      return userDomain.deleteUser(id)
    },
  },
  Query: {
    me: (__, ___, context) => {
      const { app, auth } = context
      if (!auth?.user) {
        throw new Error('No userId in authenticated context')
      }
      const { iocContainer } = app
      const { userDomain } = iocContainer
      return userDomain.findUserById(auth.user.id)
    },
    user: (__, args: { id: string }, context) => {
      const userId = args.id
      const { app } = context
      const { iocContainer } = app
      const { userDomain } = iocContainer
      return userDomain.findUserById(userId)
    },
    users: (__, ___, context) => {
      const { app } = context
      const { iocContainer } = app
      const { userDomain } = iocContainer
      return userDomain.fetchAllUsers()
    },
  },
}

export { usersResolver }

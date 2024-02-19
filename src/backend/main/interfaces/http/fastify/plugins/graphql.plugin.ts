import { makeExecutableSchema } from '@graphql-tools/schema'
import Boom from '@hapi/boom'
import type { FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import type { MercuriusOptions } from 'mercurius'
import mercurius from 'mercurius'
import type { ApplyPolicyHandler, AuthContextHandler } from 'mercurius-auth'
import mercuriusAuth from 'mercurius-auth'

import type { UserDto } from '../../../../types/domain/user'
import type { JwtPayload } from '../../../../types/interfaces/http/fastify/plugins/jwt.plugin'
import resolvers from '../../graphql/resolvers'
import typeDefs from '../../graphql/typedefs'
import { buildGraphqlError } from '../../graphql/util/graphql-boom-error-wrapper'

declare module 'mercurius-auth' {
  export interface MercuriusAuthContext {
    user: UserDto
  }
}

interface NamedValue<T> {
  name: string
  value: T
}

const applyPolicy: ApplyPolicyHandler = (
  policy: {
    arguments: NamedValue<{ value: string }>[]
  },
  ___,
  ____,
  context,
) => {
  const { user } = context.auth ?? {}
  const requires = policy.arguments[0]?.value.value.toLowerCase()
  if (user && (!requires || requires === user.role)) {
    return Promise.resolve(true)
  }
  return Promise.reject(buildGraphqlError(Boom.unauthorized()))
}

const authContext: AuthContextHandler = async (context) => {
  const { app, reply } = context
  const { iocContainer, log } = app
  const { userDomain } = iocContainer
  let user: UserDto | undefined
  try {
    const { userId } = await reply.request.jwtVerify<JwtPayload>()
    user = await userDomain.findUserById(userId)
  } catch (error) {
    log.debug(error)
  }
  return { user }
}

const graphqlPlugin: FastifyPluginAsync = fastifyPlugin(async (fastify) => {
  const mercuriusOptions: MercuriusOptions = {
    graphiql: true,
    schema: makeExecutableSchema({
      resolvers,
      typeDefs,
    }),
  }
  await fastify.register(mercurius, mercuriusOptions)
  await fastify.register(mercuriusAuth, {
    applyPolicy,
    authContext,
    authDirective: 'auth',
  })
})

export { applyPolicy, graphqlPlugin }

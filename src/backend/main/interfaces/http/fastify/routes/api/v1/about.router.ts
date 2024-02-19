import type { FastifyPluginAsync } from 'fastify'

import { aboutQuery } from '../../../../../../../../common/graphql/queries/about.query'
import type { AboutResolverResponse } from '../../../../../../types/interfaces/graphql/resolvers/about.resolver'
import { executeGql } from '../../../../graphql/util/helper'

const aboutRouter: FastifyPluginAsync = (fastify) => {
  fastify.get('/', async (__, reply) => {
    const { about } = await executeGql<{ about: AboutResolverResponse }>(
      reply,
      aboutQuery,
    )
    return about
  })
  return Promise.resolve()
}

export { aboutRouter }

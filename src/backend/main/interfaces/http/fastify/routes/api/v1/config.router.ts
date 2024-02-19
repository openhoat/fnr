import type { FastifyPluginAsync } from 'fastify'

import { configQuery } from '../../../../../../../../common/graphql/queries/config.query'
import type { ConfigResolverResponse } from '../../../../../../types/interfaces/graphql/resolvers/config.resolver'
import { executeGql } from '../../../../graphql/util/helper'

const configRouter: FastifyPluginAsync = (fastify) => {
  fastify.get('/', async (__, reply) => {
    const { config } = await executeGql<{
      config: ConfigResolverResponse
    }>(reply, configQuery)
    return config
  })
  return Promise.resolve()
}

export { configRouter }

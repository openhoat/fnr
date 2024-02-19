import type { IResolvers } from '@graphql-tools/utils'
import type { MercuriusContext } from 'mercurius'

import type { ConfigResolverResponse } from '../../../../types/interfaces/graphql/resolvers/config.resolver'

const configResolver: IResolvers<unknown, MercuriusContext> = {
  Query: {
    config: (__, ___, context): Promise<ConfigResolverResponse> => {
      const { app } = context
      const { iocContainer } = app
      const { config } = iocContainer
      const { corsOrigin, isDevelopment, logLevel } = config
      return Promise.resolve({
        corsOrigin,
        isDevelopment,
        logLevel,
      })
    },
  },
}

export { configResolver }

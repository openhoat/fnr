import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import type { IResolvers } from '@graphql-tools/utils'
import type { MercuriusContext } from 'mercurius'

import type { AboutResolverResponse } from '../../../../types/interfaces/graphql/resolvers/about.resolver'

const aboutResolver: IResolvers<unknown, MercuriusContext> = {
  Query: {
    about: async (__, ___, context): Promise<AboutResolverResponse> => {
      const { app } = context
      const { iocContainer } = app
      const { config } = iocContainer
      const { baseDir } = config
      const { version } = JSON.parse(
        await readFile(join(baseDir, 'package.json'), 'utf8'),
      ) as AboutResolverResponse
      return { version }
    },
  },
}

export { aboutResolver }

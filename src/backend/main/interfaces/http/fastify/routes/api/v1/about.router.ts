import type { FastifyPluginAsync } from 'fastify'

import { getPackageVersion } from '../../../../../../util/package-version'

const aboutRouter: FastifyPluginAsync = async (fastify) => {
  const { iocContainer } = fastify
  const { config } = iocContainer
  const { baseDir } = config
  const version = await getPackageVersion(baseDir)
  fastify.get('/', () => ({ version }))
}

export { aboutRouter }

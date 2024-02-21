import { stat } from 'node:fs/promises'
import { join } from 'node:path'

import fastifyStatic from '@fastify/static'
import type { FastifyPluginAsync } from 'fastify'

import { ignoreRejection } from '../../../../util/error-helper'

const apidocPlugin: FastifyPluginAsync = async (fastify) => {
  const { iocContainer, log } = fastify
  const { config } = iocContainer
  const { baseDir } = config
  const root = join(baseDir, 'dist', 'apidoc')
  const fileStats = await ignoreRejection(stat(root), log)
  if (!fileStats?.isDirectory()) {
    throw new Error(
      `Cannot register apidoc plugin: directory does not exist (${root})`,
    )
  }
  const prefix = '/apidoc'
  void fastify.register(fastifyStatic, {
    prefix,
    root,
  })
  fastify.get(prefix, async (__, reply) => {
    await reply.sendFile('index.html', root)
  })
}

export { apidocPlugin }

import { stat } from 'node:fs/promises'
import { join } from 'node:path'

import fastifyStatic from '@fastify/static'
import type { FastifyPluginAsync } from 'fastify'

import { ignoreRejection } from '../util/helper'

const apidocPlugin: FastifyPluginAsync = async (fastify) => {
  const { config, log } = fastify
  const { baseDir } = config
  const root = join(baseDir, 'dist', 'apidoc')
  const fileStats = await ignoreRejection(stat(root), log)
  if (!fileStats?.isDirectory()) {
    log.warn(`Directory does not exist (${root}): ignore api doc plugin`)
    return
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

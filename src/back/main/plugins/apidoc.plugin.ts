import { stat } from 'node:fs/promises'
import { join } from 'node:path'

import fastifyStatic from '@fastify/static'
import type { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

import baseDir from '../base-dir'
import { ignoreRejection } from '../util/helper'

const apidocPlugin = fastifyPlugin(async (fastify: FastifyInstance) => {
  const { log } = fastify
  const root = join(baseDir, 'dist', 'apidoc')
  if (!(await ignoreRejection(stat(root), log))?.isDirectory()) {
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
})

export { apidocPlugin }

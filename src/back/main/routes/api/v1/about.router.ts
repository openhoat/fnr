import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import type { FastifyInstance } from 'fastify'

import baseDir from '../../../base-dir'

const aboutRouter = async (fastify: FastifyInstance) => {
  const { version } = JSON.parse(
    await readFile(join(baseDir, 'package.json'), 'utf8'),
  )
  fastify.get('/', () => ({ version }))
  return Promise.resolve()
}

export { aboutRouter }

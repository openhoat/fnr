import { resolve } from 'node:path'

import type { Config as JestConfig } from 'jest'

import baseDir from '../../../back/main/base-dir'
import { buildReporters } from '../../../jest-config-helper'
import jestBaseConfig from '../jest.config'

const jestConfig: JestConfig = {
  ...jestBaseConfig,
  coverageDirectory: resolve(baseDir, 'dist', 'coverage', 'front', 'e2e'),
  reporters: buildReporters('e2e'),
  testMatch: [resolve(__dirname, '**/*.test.ts(x)?')],
}

export default jestConfig

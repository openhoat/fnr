import type { Config as JestConfig } from 'jest'
import { resolve } from 'path'

import { baseDir, buildReporters } from '../../../jest-config-helper'
import jestBaseConfig from '../jest.config'

const jestConfig: JestConfig = {
  ...jestBaseConfig,
  coverageDirectory: resolve(baseDir, 'dist', 'coverage', 'back', 'e2e'),
  reporters: buildReporters('e2e'),
  testMatch: [resolve(__dirname, '**/*.test.[jt]s')],
}

export default jestConfig

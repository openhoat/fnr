import { resolve } from 'node:path'

import type { Config as JestConfig } from 'jest'

import { baseDir, buildReporters } from '../../../jest-config-helper'
import jestBaseConfig from '../jest.config'

const jestConfig: JestConfig = {
  ...jestBaseConfig,
  coverageDirectory: resolve(
    baseDir,
    'dist',
    'coverage',
    'front',
    'integration',
  ),
  reporters: buildReporters('integration'),
  testMatch: [resolve(__dirname, '**/*.test.[jt]s(x)?')],
}

export default jestConfig

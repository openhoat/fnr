import type { Config as JestConfig } from 'jest'
import { resolve } from 'path'

import { baseDir, buildReporters } from '../../../back/test/jest-config-helper'
import jestBaseConfig from '../jest.config'

const jestConfig: JestConfig = {
  ...jestBaseConfig,
  coverageDirectory: resolve(baseDir, 'dist', 'coverage', 'front', 'unit'),
  reporters: buildReporters('unit'),
  testMatch: [resolve(__dirname, '**/*.test.[jt]s')],
}

export default jestConfig

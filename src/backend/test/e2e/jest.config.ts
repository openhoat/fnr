import { resolve } from 'node:path'

import type { Config as JestConfig } from 'jest'

import { buildReporters } from '../../../jest-config-helper'
import baseDir from '../../main/base-dir'
import jestBaseConfig from '../jest.config'

const jestConfig: JestConfig = {
  ...jestBaseConfig,
  coverageDirectory: resolve(baseDir, 'dist', 'coverage', 'backend', 'e2e'),
  reporters: buildReporters('backend-e2e'),
  testMatch: ['<rootDir>/src/backend/test/e2e/**/*.test.ts'],
}

export default jestConfig

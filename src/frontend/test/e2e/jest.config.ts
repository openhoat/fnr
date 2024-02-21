import type { Config as JestConfig } from 'jest'

import { buildReporters } from '../../../jest-config-helper'
import jestBaseConfig from '../jest.config'

const jestConfig: JestConfig = {
  ...jestBaseConfig,
  reporters: buildReporters('frontend-e2e'),
  testMatch: ['<rootDir>/src/frontend/test/e2e/**/*.e2e.test.ts(x)?'],
}

export default jestConfig

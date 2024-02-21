import type { Config as JestConfig } from 'jest'

import { buildReporters } from '../../../jest-config-helper'
import jestBaseConfig from '../jest.config'

const jestConfig: JestConfig = {
  ...jestBaseConfig,
  reporters: buildReporters('frontend-unit'),
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/frontend/test/unit/**/*.unit.test.ts(x)?'],
}

export default jestConfig

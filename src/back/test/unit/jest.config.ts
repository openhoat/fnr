import { resolve } from 'node:path'

import type { Config as JestConfig } from 'jest'

import { buildReporters } from '../../../jest-config-helper'
import baseDir from '../../main/base-dir'
import jestBaseConfig from '../jest.config'

const jestConfig: JestConfig = {
  ...jestBaseConfig,
  collectCoverageFrom: ['src/back/main/unit/**/!(*.d)*.ts'],
  coverageDirectory: resolve(baseDir, 'dist', 'coverage', 'back', 'unit'),
  reporters: buildReporters('unit'),
  testMatch: ['<rootDir>/src/back/test/unit/**/*.test.ts'],
}

export default jestConfig

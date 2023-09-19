import type { Config as JestConfig } from 'jest'
import { join } from 'path'

import globalJestConfig from '../../jest.config'
import baseDir from '../main/base-dir'

const jestConfig: JestConfig = {
  ...globalJestConfig,
  collectCoverageFrom: ['src/back/main/**/!(*.d)*.ts'],
  coverageDirectory: join(baseDir, 'dist', 'coverage', 'back', 'all'),
  coverageReporters: ['text', 'json', 'cobertura', 'lcov', 'html'],
  testMatch: ['<rootDir>/src/back/test/**/*.test.[jt]s'],
  transform: {
    '^.+\\.(t|j)s?$': '@swc/jest',
  },
  verbose: false,
}

export default jestConfig

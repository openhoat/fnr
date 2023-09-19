import type { Config as JestConfig } from 'jest'
import { join } from 'path'

import baseDir from '../../back/main/base-dir'
import globalJestConfig from '../../jest.config'

const jestConfig: JestConfig = {
  ...globalJestConfig,
  collectCoverageFrom: ['src/front/main/**/!(*.d)*.ts(x)?'],
  coverageDirectory: join(baseDir, 'dist', 'coverage', 'front', 'all'),
  testMatch: ['<rootDir>/src/front/test/**/*.test.[jt]s(x)?'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
}

export default jestConfig

import { join } from 'node:path'

import type { Config as JestConfig } from 'jest'

import baseDir from '../../back/main/base-dir'
import globalJestConfig from '../../jest.config'

const jestConfig: JestConfig = {
  ...globalJestConfig,
  collectCoverageFrom: ['src/front/main/**/!(*.d)*.ts(x)?'],
  coverageDirectory: join(baseDir, 'dist', 'coverage', 'front', 'all'),
  testMatch: ['<rootDir>/src/front/test/**/*.test.[jt]s(x)?'],
  transform: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
}

export default jestConfig

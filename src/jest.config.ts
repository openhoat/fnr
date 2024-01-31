import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import type { Config as JestConfig } from 'jest'

import baseDir from './back/main/base-dir'
import { buildReporters, ci } from './jest-config-helper'

const { name } = JSON.parse(
  readFileSync(join(baseDir, 'package.json'), 'utf8'),
) as { name: string }

const jestConfig: JestConfig = {
  ci,
  clearMocks: true,
  collectCoverageFrom: [
    'src/back/main/**/!(*.d)*.ts',
    'src/front/main/**/!(*.d)*.ts(x)?',
  ],
  coverageDirectory: join(baseDir, 'dist', 'coverage', 'all'),
  coverageReporters: ['text', 'json', 'cobertura', 'lcov', 'html'],
  displayName: name,
  globalSetup: join(baseDir, 'src', 'jest-global-setup.ts'),
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/lib/',
    '<rootDir>/tmp/',
  ],
  reporters: buildReporters(),
  rootDir: baseDir,
  setupFilesAfterEnv: [join(baseDir, 'src', 'jest-custom.ts')],
  silent: true,
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/back/test/**/*.test.[jt]s',
    '<rootDir>/src/front/test/**/*.test.[jt]s(x)?',
  ],
  transform: {
    '^.+\\.tsx?$': '@swc/jest',
  },
  verbose: false,
}

export default jestConfig

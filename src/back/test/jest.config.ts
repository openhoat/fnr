import { readFileSync } from 'fs'
import type { Config as JestConfig } from 'jest'
import { join } from 'path'

import baseDir from '../main/base-dir'
import { buildReporters, ci } from './jest-config-helper'

const { name } = JSON.parse(readFileSync(join(baseDir, 'package.json'), 'utf8'))

const jestConfig: JestConfig = {
  ci,
  clearMocks: true,
  collectCoverageFrom: ['src/back/main/**/!(*.d)*.ts'],
  coverageDirectory: join(baseDir, 'dist', 'coverage', 'back', 'all'),
  coverageReporters: ['text', 'json', 'cobertura', 'lcov', 'html'],
  displayName: name,
  globalSetup: join(baseDir, 'src', 'back', 'test', 'jest-global-setup.ts'),
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/lib/',
    '<rootDir>/tmp/',
  ],
  reporters: buildReporters(),
  rootDir: baseDir,
  setupFilesAfterEnv: [join(baseDir, 'src', 'back', 'test', 'jest-custom.ts')],
  silent: false,
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/back/test/**/*.test.[jt]s'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  verbose: false,
}

export default jestConfig

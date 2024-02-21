import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import type { Config as JestConfig } from 'jest'

import { buildReporters, ci } from '../../jest-config-helper'
import baseDir from '../main/base-dir'

const { name } = JSON.parse(
  readFileSync(join(baseDir, 'package.json'), 'utf8'),
) as { name: string }

const displayName = `${name} backend tests`

const jestConfig: JestConfig = {
  ci,
  displayName,
  clearMocks: true,
  collectCoverageFrom: ['src/backend/main/**/!(*.d)*.ts'],
  coverageDirectory: join(baseDir, 'dist', 'coverage', 'backend', 'all'),
  coverageReporters: ['text', 'json', 'cobertura', 'lcov', 'html'],
  globalSetup: join(baseDir, 'src', 'jest-global-setup.ts'),
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/lib/',
    '<rootDir>/tmp/',
  ],
  reporters: buildReporters('backend'),
  rootDir: baseDir,
  setupFilesAfterEnv: [join(baseDir, 'src', 'jest-custom.ts')],
  silent: true,
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/backend/test/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': '@swc/jest',
  },
  verbose: false,
}

export default jestConfig

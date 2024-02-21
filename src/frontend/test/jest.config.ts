import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import type { Config as JestConfig } from 'jest'

import baseDir from '../../backend/main/base-dir'
import { buildReporters, ci } from '../../jest-config-helper'

const { name } = JSON.parse(
  readFileSync(join(baseDir, 'package.json'), 'utf8'),
) as { name: string }

const displayName = `${name} frontend tests`

const jestConfig: JestConfig = {
  ci,
  displayName,
  clearMocks: true,
  globalSetup: join(baseDir, 'src', 'jest-global-setup.ts'),
  moduleNameMapper: {
    '\\.css$': '<rootDir>/src/frontend/test/styleMock.js',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/lib/',
    '<rootDir>/tmp/',
  ],
  reporters: buildReporters('frontend'),
  rootDir: baseDir,
  setupFilesAfterEnv: [join(baseDir, 'src', 'jest-custom.ts')],
  silent: true,
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/frontend/test/**/*.test.ts(x)?'],
  transform: {
    '^.+\\.tsx?$': '@swc/jest',
  },
  verbose: false,
}

export default jestConfig

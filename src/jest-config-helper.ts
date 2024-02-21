import { join } from 'node:path'

import type { Config } from '@jest/types'

import baseDir from './backend/main/base-dir'

const ci = process.env.CI === 'true'

const buildReporters = (prefix = 'all'): [string, Config.ReporterConfig] => [
  'default',
  ci
    ? [
        'jest-junit',
        {
          outputDirectory: join(baseDir, 'dist', 'test'),
          outputName: `${prefix}-junit.xml`,
        },
      ]
    : [
        './node_modules/jest-html-reporter',
        {
          outputPath: join(
            baseDir,
            'dist',
            'test',
            `${prefix}-tests-report.html`,
          ),
          pageTitle: 'Test Report',
        },
      ],
]

export { buildReporters, ci }

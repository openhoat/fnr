import { join, resolve } from 'node:path'

import type { Config } from '@jest/types'

const baseDir = resolve(__dirname, '..', '..', '..')

const ci = process.env.CI === 'true'

const buildReporters = (prefix = 'all'): [string, Config.ReporterConfig] => [
  'default',
  ci
    ? [
        'jest-junit',
        {
          outputDirectory: join(baseDir, 'dist', 'test', 'back'),
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
            'back',
            `${prefix}-tests-report.html`,
          ),
          pageTitle: 'Test Report',
        },
      ],
]

export { baseDir, buildReporters, ci }

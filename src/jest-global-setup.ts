import { join } from 'node:path'

import { config as dotenvConfig } from 'dotenv'

import baseDir from './backend/main/base-dir'
import { deleteEnvVars } from './backend/test/util/env-utils'

const jestGlobalSetup = (): void => {
  deleteEnvVars('NODE_ENV', 'LOG_LEVEL', 'PORT')
  dotenvConfig({ path: join(baseDir, '.env.test') })
  dotenvConfig({ path: join(baseDir, '.env.local') })
  dotenvConfig({ path: join(baseDir, '.env') })
  process.env.NODE_ENV = 'test'
}

export default jestGlobalSetup

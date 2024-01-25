import { join } from 'node:path'

import { config as dotenvConfig } from 'dotenv'

import baseDir from './back/main/base-dir'
import { deleteEnvVars } from './back/test/util/env-utils'

const jestGlobalSetup = (): void => {
  deleteEnvVars('NODE_ENV', 'LOG_LEVEL')
  dotenvConfig({ path: join(baseDir, '.env.test') })
  dotenvConfig({ path: join(baseDir, '.env.local') })
  dotenvConfig({ path: join(baseDir, '.env') })
}

export default jestGlobalSetup

import { config as dotenvConfig } from 'dotenv'
import { join } from 'path'

import baseDir from '../main/base-dir'
import { deleteEnvVars } from './util/env-utils'

const jestGlobalSetup = () => {
  deleteEnvVars('NODE_ENV', 'LOG_LEVEL')
  dotenvConfig({ path: join(baseDir, '.env.test') })
  dotenvConfig({ path: join(baseDir, '.env.local') })
  dotenvConfig({ path: join(baseDir, '.env') })
}

export default jestGlobalSetup

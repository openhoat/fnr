import { join } from 'node:path'

import { camelCase } from 'change-case'
import { config as configDotenv } from 'dotenv'
import { levels } from 'pino'
import { boolean, number, object, string } from 'yup'

import baseDir from './base-dir'

const isDevelopment = process.env.NODE_ENV === 'development'

configDotenv({
  debug: isDevelopment,
  path: join(baseDir, '.env.local'),
})
configDotenv({
  debug: isDevelopment,
  path: join(baseDir, '.env'),
})

const logLevels = ['silent', ...Object.values(levels.labels)]

const defaultPort = 3000

const configSchema = object({
  authPassword: string().optional(),
  authUsername: string().optional(),
  cookieSecret: string().optional(),
  corsOrigin: string().optional(),
  host: string().optional(),
  isDevelopment: boolean().required(),
  jwtSecret: string().optional(),
  logLevel: string().oneOf(logLevels).default('info'),
  port: number().default(defaultPort),
})

const envVarNames = [
  'AUTH_PASSWORD',
  'AUTH_USERNAME',
  'COOKIE_SECRET',
  'CORS_ORIGIN',
  'HOST',
  'JWT_SECRET',
  'LOG_LEVEL',
  'PORT',
]

const envConfig = envVarNames.reduce(
  (acc, name) =>
    name ? { ...acc, [camelCase(name)]: process.env[name] } : acc,
  {
    // Custom values / env vars
  },
)

const rawConfig = configSchema.validateSync({
  ...envConfig,
  isDevelopment,
})

export type Config = typeof rawConfig

const config: Config = Object.keys(rawConfig).reduce(
  (acc, key) => ({
    ...acc,
    [key]: (rawConfig as Record<string, unknown>)[key],
  }),
  {} as Config,
)

export default config

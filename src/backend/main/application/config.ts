import { join } from 'node:path'

import { config as configDotenv } from 'dotenv'
import Joi from 'joi'
import { levels } from 'pino'

import baseDir from '../base-dir'
import type { Config, ConfigEnvVars } from '../types/application/config'
import { pickFromDict, toCamelCase } from '../util/helper'
import { validate } from '../util/schema-validator'

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
const defaultPort = 0
const configSchema: Joi.ObjectSchema<Config> = Joi.object({
  authPassword: Joi.string().optional(),
  authUsername: Joi.string().optional(),
  baseDir: Joi.string().required(),
  cookieSecret: Joi.string().optional(),
  corsOrigin: Joi.string().optional(),
  host: Joi.string().hostname().optional(),
  isDevelopment: Joi.boolean().required(),
  jwtSecret: Joi.string().optional(),
  logLevel: Joi.string()
    .valid(...logLevels)
    .default('info'),
  port: Joi.number().default(defaultPort),
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
const envConfig: ConfigEnvVars = pickFromDict(
  process.env,
  envVarNames,
  toCamelCase,
)
const configData: Config = {
  ...envConfig,
  baseDir,
  isDevelopment,
}
const config: Readonly<Config> = Object.freeze(
  validate(configData, configSchema),
)

export default config

export interface Config {
  authPassword?: string
  authUsername?: string
  baseDir: string
  cookieSecret?: string
  corsOrigin?: string
  defaultAdminEmail: string
  defaultAdminPassword: string
  defaultAdminUsername: string
  host?: string
  isDevelopment: boolean
  jwtSecret?: string
  logLevel: string
  port: number
}

export type ConfigEnvVars = Omit<Config, 'baseDir' | 'isDevelopment'>

export interface Config {
  baseDir: string
  corsOrigin?: string
  host?: string
  isDevelopment: boolean
  logLevel: string
  port: number
}

export type ConfigEnvVars = Omit<Config, 'baseDir' | 'isDevelopment'>

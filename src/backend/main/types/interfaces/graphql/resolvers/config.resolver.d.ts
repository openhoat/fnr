import type { Config } from '../../../application/config'

export type ConfigResolverResponse = Pick<
  Config,
  'corsOrigin' | 'isDevelopment' | 'logLevel'
>

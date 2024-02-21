import pino from 'pino'

import type { Config } from '../../types/application/config'
import type { Logger } from '../../types/util/logger'

const isLogger = (
  loggerOrConfig: Config | pino.Logger,
): loggerOrConfig is pino.Logger =>
  typeof (loggerOrConfig as pino.Logger).error === 'function'

class AppLogger implements Logger {
  readonly #logger: pino.Logger

  get logger(): pino.Logger {
    return this.#logger
  }

  constructor(loggerOrConfig: Config | pino.Logger) {
    this.#logger = isLogger(loggerOrConfig)
      ? loggerOrConfig
      : pino({
          level: loggerOrConfig.logLevel,
          transport: {
            target: 'pino-pretty',
          },
        })
  }

  debug(message: string): void {
    this.logger.debug(message)
  }

  error(message: string): void {
    this.logger.error(message)
  }

  info(message: string): void {
    this.logger.info(message)
  }

  trace(message: string): void {
    this.logger.trace(message)
  }

  warn(message: string): void {
    this.logger.warn(message)
  }
}

export { AppLogger }

import type pino from 'pino'

import { AppLogger } from '../../../../main/infra/logger/app-logger'

describe('backend unit tests', () => {
  describe('infra', () => {
    describe('logger', () => {
      describe('AppLogger', () => {
        describe('instance', () => {
          let logger: jest.Mocked<pino.Logger>
          let appLogger: AppLogger
          beforeAll(() => {
            logger = {
              debug: jest.fn(),
              error: jest.fn(),
              info: jest.fn(),
              trace: jest.fn(),
              warn: jest.fn(),
            } as unknown as jest.Mocked<pino.Logger>
            appLogger = new AppLogger(logger)
          })
          afterAll(() => {
            jest.restoreAllMocks()
          })
          describe('logger', () => {
            test('should return internal logger instance', () => {
              // Then
              expect(appLogger.logger).toBe(logger)
            })
          })
          describe('debug', () => {
            test('should call debug of internal logger instance', () => {
              // Given
              const logMessage = 'hello'
              // When
              appLogger.debug(logMessage)
              // Then
              expect(logger.debug).toHaveBeenCalledTimes(1)
              expect(logger.debug).toHaveBeenCalledWith(logMessage)
            })
          })
          describe('error', () => {
            test('should call error of internal logger instance', () => {
              // Given
              const logMessage = 'hello'
              // When
              appLogger.error(logMessage)
              // Then
              expect(logger.error).toHaveBeenCalledTimes(1)
              expect(logger.error).toHaveBeenCalledWith(logMessage)
            })
          })
          describe('info', () => {
            test('should call info of internal logger instance', () => {
              // Given
              const logMessage = 'hello'
              // When
              appLogger.info(logMessage)
              // Then
              expect(logger.info).toHaveBeenCalledTimes(1)
              expect(logger.info).toHaveBeenCalledWith(logMessage)
            })
          })
          describe('trace', () => {
            test('should call trace of internal logger instance', () => {
              // Given
              const logMessage = 'hello'
              // When
              appLogger.trace(logMessage)
              // Then
              expect(logger.trace).toHaveBeenCalledTimes(1)
              expect(logger.trace).toHaveBeenCalledWith(logMessage)
            })
          })
          describe('warn', () => {
            test('should call warn of internal logger instance', () => {
              // Given
              const logMessage = 'hello'
              // When
              appLogger.warn(logMessage)
              // Then
              expect(logger.warn).toHaveBeenCalledTimes(1)
              expect(logger.warn).toHaveBeenCalledWith(logMessage)
            })
          })
        })
      })
    })
  })
})

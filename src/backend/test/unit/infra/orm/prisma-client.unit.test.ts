import { when } from 'jest-when'

import type { Logger } from '../../../../main/types/util/logger'

describe('backend unit tests', () => {
  describe('infra', () => {
    describe('orm', () => {
      describe('prisma client', () => {
        let PrismaClientMock: jest.SpyInstance
        let prismaMock: jest.Mocked<{
          $on: (eventType: string, callback: (e: unknown) => void) => void
        }>
        type MockedPrismaOrm = new (logger: Logger) => typeof prismaMock
        let PrismaOrm: MockedPrismaOrm
        beforeAll(() => {
          prismaMock = {
            $on: jest.fn(),
          }
          PrismaClientMock = jest.fn().mockImplementation(() => prismaMock)
          jest.doMock('@prisma/client', () => ({
            PrismaClient: PrismaClientMock,
          }))
          // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-unsafe-assignment
          const prismaClient = require('../../../../main/infra/orm/prisma-client')
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
          PrismaOrm = prismaClient.PrismaOrm
        })
        afterEach(() => {
          jest.resetAllMocks()
        })
        afterAll(() => {
          jest.restoreAllMocks()
        })
        describe('PrismaOrm', () => {
          describe('instance', () => {
            test('should log error given prisma received an error event', () => {
              // Given
              const logger = {
                error: jest.fn(),
                info: jest.fn(),
                trace: jest.fn(),
                warn: jest.fn(),
              } as unknown as jest.Mocked<Logger>
              const message = 'This is a simple message'
              when(prismaMock.$on)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                .calledWith(expect.any(String), expect.any(Function))
                .mockImplementation(
                  (
                    __: string,
                    callback: (event: { message: string }) => void,
                  ) => {
                    callback({ message })
                  },
                )
              // When
              new PrismaOrm(logger)
              // Then
              expect(prismaMock.$on).toHaveBeenCalledWith(
                'query',
                expect.any(Function),
              )
              expect(prismaMock.$on).toHaveBeenCalledWith(
                'error',
                expect.any(Function),
              )
              expect(logger.error).toHaveBeenCalledWith(message)
              expect(prismaMock.$on).toHaveBeenCalledWith(
                'warn',
                expect.any(Function),
              )
              expect(logger.warn).toHaveBeenCalledWith(message)
              expect(prismaMock.$on).toHaveBeenCalledWith(
                'info',
                expect.any(Function),
              )
              expect(logger.info).toHaveBeenCalledWith(message)
            })
          })
        })
      })
    })
  })
})

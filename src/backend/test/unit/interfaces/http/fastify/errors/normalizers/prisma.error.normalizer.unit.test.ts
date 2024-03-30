import {
  isPrismaClientKnownRequestError,
  prismaErrorNormalizer,
} from '../../../../../../../main/interfaces/http/fastify/errors/normalizers/prisma.error.normalizer'

describe('backend unit tests', () => {
  describe('interfaces', () => {
    describe('http', () => {
      describe('fastify', () => {
        describe('errors', () => {
          describe('normalizers', () => {
            describe('prisma error normalizer', () => {
              describe('isPrismaClientKnownRequestError', () => {
                test('should return false given error is not a PrismaClientKnownRequestError', () => {
                  // Given
                  const error = {}
                  // When
                  const result = isPrismaClientKnownRequestError(error)
                  // Then
                  expect(result).toBe(false)
                })
                test('should return true given a PrismaClientKnownRequestError', () => {
                  // Given
                  const error = {
                    message: 'Sample error',
                    type: 'PrismaClientKnownRequestError',
                  }
                  // When
                  const result = isPrismaClientKnownRequestError(error)
                  // Then
                  expect(result).toBe(true)
                })
              })
              describe('prismaErrorNormalizer', () => {
                test('should return undefined given error is not a PrismaClientKnownRequestError', () => {
                  // Given
                  const error = {}
                  // When
                  const result = prismaErrorNormalizer(error)
                  // Then
                  expect(result).toBeUndefined()
                })
                test('should return a normalized error given a PrismaClientKnownRequestError', () => {
                  // Given
                  const error = {
                    message: 'Sample error',
                    name: 'PrismaError',
                    type: 'PrismaClientKnownRequestError',
                  }
                  // When
                  const result = prismaErrorNormalizer(error)
                  // Then
                  expect(result).toStrictEqual({
                    error: 'PrismaError',
                    message: 'Sample error',
                  })
                })
              })
            })
          })
        })
      })
    })
  })
})

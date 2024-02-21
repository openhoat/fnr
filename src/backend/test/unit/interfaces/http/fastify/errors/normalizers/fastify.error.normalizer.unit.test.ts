import {
  fastifyErrorNormalizer,
  isFastifyError,
} from '../../../../../../../main/interfaces/http/fastify/errors/normalizers/fastify.error.normalizer'

describe('backend unit tests', () => {
  describe('interfaces', () => {
    describe('http', () => {
      describe('fastify', () => {
        describe('errors', () => {
          describe('normalizers', () => {
            describe('fastify error normalizer', () => {
              describe('isFastifyError', () => {
                test('should return false given error is not a FastifyError', () => {
                  // Given
                  const error = {}
                  // When
                  const result = isFastifyError(error)
                  // Then
                  expect(result).toBe(false)
                })
                test('should return true given a FastifyError', () => {
                  // Given
                  const error = {
                    code: 'Error',
                    message: 'Sample error',
                    statusCode: 500,
                  }
                  // When
                  const result = isFastifyError(error)
                  // Then
                  expect(result).toBe(true)
                })
              })
              describe('fastifyErrorNormalizer', () => {
                test('should return undefined given error is not a BoomError', () => {
                  // Given
                  const error = {}
                  // When
                  const result = fastifyErrorNormalizer(error)
                  // Then
                  expect(result).toBeUndefined()
                })
                test('should return a normalized error given a BoomError', () => {
                  // Given
                  const error = {
                    code: 'Error',
                    message: 'Sample error',
                    statusCode: 500,
                  }
                  // When
                  const result = fastifyErrorNormalizer(error)
                  // Then
                  expect(result).toStrictEqual({
                    error: 'Error',
                    message: 'Sample error',
                    statusCode: 500,
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

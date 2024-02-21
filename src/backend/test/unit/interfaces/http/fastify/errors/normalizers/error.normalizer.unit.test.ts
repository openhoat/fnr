import {
  errorNormalizer,
  isError,
} from '../../../../../../../main/interfaces/http/fastify/errors/normalizers/error.normalizer'
import Boom from '@hapi/boom'

describe('backend unit tests', () => {
  describe('interfaces', () => {
    describe('http', () => {
      describe('fastify', () => {
        describe('errors', () => {
          describe('normalizers', () => {
            describe('error normalizer', () => {
              describe('isError', () => {
                test('should return false given error is not en BoomError', () => {
                  // Given
                  const error = {}
                  // When
                  const result = isError(error)
                  // Then
                  expect(result).toBe(false)
                })
                test('should return true given a BoomError', () => {
                  // Given
                  const error = Boom.internal('sample error')
                  // When
                  const result = isError(error)
                  // Then
                  expect(result).toBe(true)
                })
              })
              describe('errorNormalizer', () => {
                test('should return undefined given error is not en Error', () => {
                  // Given
                  const error = {}
                  // When
                  const result = errorNormalizer(error)
                  // Then
                  expect(result).toBeUndefined()
                })
                test('should return a normaized error given a BoomError', () => {
                  // Given
                  const error = new Error('sample error')
                  // When
                  const result = errorNormalizer(error)
                  // Then
                  expect(result).toStrictEqual({
                    error: 'Error',
                    message: 'sample error',
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

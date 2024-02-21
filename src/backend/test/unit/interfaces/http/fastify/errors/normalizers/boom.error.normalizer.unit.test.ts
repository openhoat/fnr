import Boom from '@hapi/boom'

import {
  boomErrorNormalizer,
  isBoomError,
} from '../../../../../../../main/interfaces/http/fastify/errors/normalizers/boom.error.normalizer'

describe('backend unit tests', () => {
  describe('interfaces', () => {
    describe('http', () => {
      describe('fastify', () => {
        describe('errors', () => {
          describe('normalizers', () => {
            describe('boom error normalizer', () => {
              describe('isBoomError', () => {
                test('should return false given error is not en BoomError', () => {
                  // Given
                  const error = {}
                  // When
                  const result = isBoomError(error)
                  // Then
                  expect(result).toBe(false)
                })
                test('should return true given a BoomError', () => {
                  // Given
                  const error = Boom.internal('sample error')
                  // When
                  const result = isBoomError(error)
                  // Then
                  expect(result).toBe(true)
                })
              })
              describe('boomErrorNormalizer', () => {
                test('should return undefined given error is not en BoomError', () => {
                  // Given
                  const error = {}
                  // When
                  const result = boomErrorNormalizer(error)
                  // Then
                  expect(result).toBeUndefined()
                })
                test('should return a normaized error given a BoomError', () => {
                  // Given
                  const error = Boom.internal('sample error')
                  // When
                  const result = boomErrorNormalizer(error)
                  // Then
                  expect(result).toStrictEqual({
                    error: 'Internal Server Error',
                    message: 'An internal server error occurred',
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

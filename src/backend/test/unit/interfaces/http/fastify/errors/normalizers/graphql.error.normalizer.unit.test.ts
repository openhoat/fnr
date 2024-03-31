import {
  graphqlErrorNormalizer,
  isGraphqlError,
} from '../../../../../../../main/interfaces/http/fastify/errors/normalizers/graphql.error.normalizer'

describe('backend unit tests', () => {
  describe('interfaces', () => {
    describe('http', () => {
      describe('fastify', () => {
        describe('errors', () => {
          describe('normalizers', () => {
            describe('graphql error normalizer', () => {
              describe('isGraphqlError', () => {
                test('should return false given error is not a GraphQLError', () => {
                  // Given
                  const error = {}
                  // When
                  const result = isGraphqlError(error)
                  // Then
                  expect(result).toBe(false)
                })
                test('should return true given a GraphQLError', () => {
                  // Given
                  const error = {
                    locations: [{ column: 2, line: 3 }],
                    message: 'Sample error',
                    path: 'any path',
                  }
                  // When
                  const result = isGraphqlError(error)
                  // Then
                  expect(result).toBe(true)
                })
              })
              describe('graphqlErrorNormalizer', () => {
                test('should return undefined given error is not a GraphQLError', () => {
                  // Given
                  const error = {}
                  // When
                  const result = graphqlErrorNormalizer(error)
                  // Then
                  expect(result).toBeUndefined()
                })
                test('should return a normalized error given a GraphQLError', () => {
                  // Given
                  const error = {
                    locations: [{ column: 2, line: 3 }],
                    message: 'Sample error',
                    name: 'GraphQLError',
                    path: 'any path',
                  }
                  // When
                  const result = graphqlErrorNormalizer(error)
                  // Then
                  expect(result).toStrictEqual({
                    error: 'GraphQLError',
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

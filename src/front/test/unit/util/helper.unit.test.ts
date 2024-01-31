import { getBaseUrl } from '../../../main/util/helper'

describe('frontend tests', () => {
  describe('frontend unit tests', () => {
    describe('util', () => {
      describe('getBaseUrl', () => {
        test('should return "https://local.io" given location protocol is "https:" and location host is "local.io"', () => {
          // Given
          const location = {
            host: 'local.io',
            protocol: 'https:',
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          // noinspection JSConstantReassignment,ES6ShorthandObjectProperty
          global.window = { location }
          // When
          const baseUrl = getBaseUrl()
          // Then
          expect(baseUrl).toBe('https://local.io')
        })
      })
    })
  })
})

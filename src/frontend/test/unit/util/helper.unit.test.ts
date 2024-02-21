import { getBaseUrl } from '../../../main/util/helper'

describe('frontend tests', () => {
  describe('frontend unit tests', () => {
    describe('util', () => {
      describe('getBaseUrl', () => {
        test('should return "https://local.io" given location protocol is "https:" and location host is "local.io"', () => {
          // Given
          Object.defineProperty(window, 'location', {
            configurable: true,
            writable: true,
          })
          window.location = { host: 'local.io', protocol: 'https:' } as Location
          // When
          const baseUrl = getBaseUrl()
          // Then
          expect(baseUrl).toBe('https://local.io')
        })
      })
    })
  })
})

import { getTestCase, registerHooks } from '../util/server-test-hooks'

describe('backend tests', () => {
  describe('backend server e2e tests', () => {
    registerHooks()
    describe('POST /auth/sign-out', () => {
      test('should respond an empty body with a deleted token cookie', async () => {
        // Given
        const testCase = getTestCase()
        await testCase
          .step('Delete a token')
          .spec()
          // When
          .post('/auth/sign-out')
          // Then
          .expectStatus(204)
          .expectCookiesLike({
            'Max-Age': '-1',
            Path: '/',
            // eslint-disable-next-line unicorn/no-null
            token: null,
          })
          .toss()
      })
    })
  })
})

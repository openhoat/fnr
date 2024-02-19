import { regex } from 'pactum-matchers'

import { getTestCase, registerHooks } from '../../util/server-test-hooks'

describe('backend tests', () => {
  describe('backend server e2e tests', () => {
    registerHooks()
    describe('GET /api/v1/config', () => {
      test('should respond an object including version', async () => {
        // Given
        const username = 'admin'
        const password = 'MyBigSecret'
        const testCase = getTestCase()
        await testCase
          .step('Create a token')
          .spec()
          // When
          .post('/auth/sign-in')
          .withBody({ password, username })
          // Then
          .expectStatus(200)
          .expectJsonMatch({
            token: regex(/^([\w=]+).([\w=]+).([\w+/=-]*)$/),
          })
          .stores('Token', 'token')
        await testCase
          .step('Get /api/v1/config')
          .spec()
          .withBearerToken('$S{Token}')
          // When
          .get('/api/v1/config')
          // Then
          .expectStatus(200)
          .expectJsonLike({
            isDevelopment: false,
            logLevel: 'silent',
          })
          .toss()
      })
      test('should respond a 401 error given a bad token', async () => {
        // Given
        const testCase = getTestCase()
        await testCase
          .step('Get /api/v1/config')
          .spec()
          .withBearerToken('badtoken')
          // When
          .get('/api/v1/config')
          // Then
          .expectStatus(401)
          .expectJsonLike({
            error: 'Unauthorized',
            message: 'Unauthorized',
            statusCode: 401,
          })
          .toss()
      })
    })
  })
})

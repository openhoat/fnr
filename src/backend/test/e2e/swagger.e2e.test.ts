import { getTestCase, registerHooks } from './util/server-test-hooks'

describe('backend tests', () => {
  describe('backend server e2e tests', () => {
    registerHooks()
    describe('GET /swagger', () => {
      test('should respond a redirect given a valid authorization', async () => {
        // Given
        const testCase = getTestCase()
        await testCase
          .step('Get Swagger with a valid authorization')
          .spec()
          .withAuth('johndoe', 'MyBigSecret')
          // When
          .get('/swagger')
          // Then
          .expectStatus(302)
          .expectHeader('location', './swagger/static/index.html')
          .toss()
      })
      test('should respond a 401 given a bad basic auth', async () => {
        // Given
        const testCase = getTestCase()
        await testCase
          .step('Try to get Swagger with a bad authorization')
          .spec()
          .withAuth('badusername', 'badpassword')
          // When
          .get('/swagger')
          // Then
          .expectStatus(401)
          .expectJsonLike({
            error: 'Unauthorized',
            message: 'Unauthorized',
            statusCode: 401,
          })
          .toss()
      })
      test('should respond a Swagger UI HTML page', async () => {
        // Given
        const testCase = getTestCase()
        await testCase
          .step('Get Swagger HTML page with a valid authorization')
          .spec()
          .withAuth('johndoe', 'MyBigSecret')
          // When
          .get('/swagger/static/index.html')
          // Then
          .expectStatus(200)
          .expectHeader('content-type', 'text/html; charset=utf-8')
          .expectBodyContains('Swagger UI')
          .toss()
      })
    })
  })
})

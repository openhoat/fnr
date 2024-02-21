import { getTestCase, registerHooks } from './util/server-test-hooks'

describe('backend tests', () => {
  describe('backend server e2e tests', () => {
    registerHooks()
    describe('GET /swagger', () => {
      test('should respond a redirect', async () => {
        // Given
        const testCase = getTestCase()
        await testCase
          .step('Get Swagger with a valid authorization')
          .spec()
          // When
          .get('/swagger')
          // Then
          .expectStatus(302)
          .expectHeader('location', './swagger/static/index.html')
          .toss()
      })
      test('should respond a Swagger UI HTML page', async () => {
        // Given
        const testCase = getTestCase()
        await testCase
          .step('Get Swagger HTML page')
          .spec()
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

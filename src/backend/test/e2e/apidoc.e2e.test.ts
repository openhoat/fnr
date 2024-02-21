import { getTestCase, registerHooks } from './util/server-test-hooks'

describe('backend tests', () => {
  describe('backend server e2e tests', () => {
    registerHooks()
    describe('GET /apidoc', () => {
      test('should respond an API doc HTML page', async () => {
        // Given
        const testCase = getTestCase()
        await testCase
          .step('Get API doc')
          .spec()
          // When
          .get('/apidoc')
          // Then
          .expectStatus(200)
          .expectHeader('content-type', 'text/html; charset=utf-8')
          .expectBodyContains('Fullstack Node React API Documentation')
          .toss()
      })
    })
  })
})

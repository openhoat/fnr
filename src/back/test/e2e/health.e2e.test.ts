import { getTestCase, registerHooks } from './util/server-test-hooks'

describe('backend tests', () => {
  describe('backend server e2e tests', () => {
    registerHooks()
    describe('GET /health', () => {
      test('should respond a healthy status object', async () => {
        // Given
        const testCase = getTestCase()
        await testCase
          .step('Get healthcheck')
          .spec()
          // When
          .get('/health')
          // Then
          .expectStatus(200)
          .expectJsonLike({
            web: { status: 'up' },
          })
          .toss()
      })
    })
  })
})

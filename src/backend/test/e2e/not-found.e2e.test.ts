import './util/pactum-helper'

import { getTestCase, registerHooks } from './util/server-test-hooks'

describe('backend tests', () => {
  describe('backend server e2e tests', () => {
    registerHooks()
    describe('GET /bad-resource', () => {
      test('should respond a 404', async () => {
        // Given
        const testCase = getTestCase()
        await testCase
          .step('Get 404')
          .spec()
          // When
          .get('/bad-resource')
          // Then
          .expect('NotFoundError', 'Route GET /bad-resource not found')
          .toss()
      })
    })
  })
})

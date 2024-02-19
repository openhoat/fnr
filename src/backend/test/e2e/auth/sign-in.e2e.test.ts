import '../util/pactum-helper'

import { authorizationStep } from '../util/pactum-helper'
import { getTestCase, registerHooks } from '../util/server-test-hooks'

describe('backend tests', () => {
  describe('backend server e2e tests', () => {
    registerHooks()
    describe('POST /auth/sign-in', () => {
      const authSignInUriPath = '/auth/sign-in'
      test('should respond a token with secured cookie given valid credentials', async () => {
        // Given
        const username = 'admin'
        const password = 'MyBigSecret'
        const testCase = getTestCase()
        await authorizationStep(testCase, { password, username })
      })
      test('should respond a 401 error given bad credentials', async () => {
        // Given
        const username = 'badusername'
        const password = 'badpassword'
        const testCase = getTestCase()
        await testCase
          .step('Fail to create a token because of bad credentials')
          .spec()
          // When
          .post(authSignInUriPath)
          .withBody({ password, username })
          // Then
          .expect('AuthorizationError')
          .toss()
      })
      test('should respond a 401 error given no credentials', async () => {
        // Given
        const testCase = getTestCase()
        await testCase
          .step('Fail to create a token because of bad credentials')
          .spec()
          // When
          .post(authSignInUriPath)
          // Then
          .expect('AuthorizationError')
          .toss()
      })
    })
  })
})

import '../../util/pactum-helper'

import type E2E from 'pactum/src/models/E2E'

import { REGEX_PATTERNS } from '../../util/regex-helper'
import { getTestCase, registerHooks } from '../../util/server-test-hooks'

describe('backend tests', () => {
  describe('backend server e2e tests', () => {
    let testCase: E2E
    let createdUsername: string | undefined
    registerHooks()
    beforeEach(async () => {
      createdUsername = undefined
      const username = 'admin'
      const password = 'MyBigSecret'
      testCase = getTestCase()
      await testCase
        .step('Create a token')
        .spec()
        // When
        .post('/auth/sign-in')
        .withBody({ password, username })
        // Then
        .expectStatus(200)
        .expectJsonLike({
          token: REGEX_PATTERNS.TOKEN,
        })
        .stores('Token', 'token')
    })
    afterEach(async () => {
      if (createdUsername) {
        await testCase
          .step('Delete /api/v1/users')
          .spec()
          .withBearerToken('$S{Token}')
          // When
          .delete('/api/v1/users/$S{UserId}')
          // Then
          .expectStatus(200)
          .expectJsonLike({
            email: `${createdUsername}@local.io`,
            id: REGEX_PATTERNS.UUID,
            role: 'user',
            username: createdUsername,
          })
          .toss()
      }
    })
    describe('GET /api/v1/users/me', () => {
      test('should respond current user details', async () => {
        // Given
        await testCase
          .step('Get /api/v1/users/me')
          .spec()
          .withBearerToken('$S{Token}')
          // When
          .get('/api/v1/users/me')
          // Then
          .expectStatus(200)
          .expectJsonLike({
            email: 'admin@local.io',
            id: REGEX_PATTERNS.UUID,
            role: 'admin',
            username: 'admin',
          })
          .toss()
      })
    })
    describe('GET /api/v1/users/badid', () => {
      test('should respond 404 given user ID does not exist', async () => {
        // Given
        await testCase
          .step('Get /api/v1/users/badid')
          .spec()
          .withBearerToken('$S{Token}')
          // When
          .get('/api/v1/users/badid')
          // Then
          .expectStatus(404)
          .expect('NotFoundError')
          .toss()
      })
    })
    describe('GET /api/v1/users', () => {
      test('should respond users details', async () => {
        // Given
        await testCase
          .step('Get /api/v1/users')
          .spec()
          .withBearerToken('$S{Token}')
          // When
          .get('/api/v1/users')
          // Then
          .expectStatus(200)
          .expectJsonLike([
            {
              email: 'admin@local.io',
              id: REGEX_PATTERNS.UUID,
              role: 'admin',
              username: 'admin',
            },
          ])
          .toss()
      })
    })
    describe('POST /api/v1/users', () => {
      test('should respond new user details', async () => {
        // Given
        createdUsername = `user${Date.now()}`
        const password = 'MyBigSecret'
        const email = `${createdUsername}@local.io`
        await testCase
          .step('Post /api/v1/users')
          .spec()
          .withBearerToken('$S{Token}')
          // When
          .post('/api/v1/users')
          .withJson({
            email,
            password,
            username: createdUsername,
          })
          // Then
          .expectStatus(200)
          .expectJsonLike({
            email,
            id: REGEX_PATTERNS.UUID,
            role: 'user',
            username: createdUsername,
          })
          .stores('UserId', 'id')
      })
    })
  })
})

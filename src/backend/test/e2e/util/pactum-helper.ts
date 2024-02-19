import HttpStatusCodes from 'http-status-codes'
import { handler } from 'pactum'
import type { PactumResponse } from 'pactum/src/exports/handler'
import type E2E from 'pactum/src/models/E2E'

import { REGEX_PATTERNS } from './regex-helper'

handler.addExpectHandler('AuthorizationError', (ctx) => {
  const { data: message = 'Unauthorized', res } = ctx as {
    data: string
    res: PactumResponse
  }
  expect(res.statusCode).toBe(HttpStatusCodes.UNAUTHORIZED)
  expect(res.json).toStrictEqual({
    message,
    error: 'Unauthorized',
    statusCode: HttpStatusCodes.UNAUTHORIZED,
  })
})

handler.addExpectHandler('NotFoundError', (ctx) => {
  const { data: message = 'Not Found', res } = ctx as {
    data: string
    res: PactumResponse
  }
  expect(res.statusCode).toBe(HttpStatusCodes.NOT_FOUND)
  expect(res.json).toStrictEqual({
    message,
    error: 'Not Found',
    statusCode: HttpStatusCodes.NOT_FOUND,
  })
})

const authorizationStep = (
  testCase: E2E,
  credentials: { password: string; username: string },
  name = 'Token',
): Promise<unknown> =>
  testCase
    .step('Get an authorization')
    .spec()
    .post('/auth/sign-in')
    .withJson(credentials)
    .expectStatus(HttpStatusCodes.OK)
    .expectJsonLike({
      token: REGEX_PATTERNS.TOKEN,
    })
    .stores(name, 'token')
    .toss()

export { authorizationStep }

import HttpStatusCodes from 'http-status-codes'
import { handler } from 'pactum'
import type E2E from 'pactum/src/models/E2E'
import { string } from 'pactum-matchers'

handler.addExpectHandler('BadRequestError', (ctx) => {
  const { data: message = 'Bad Request', res } = ctx
  expect(res.statusCode).toBe(HttpStatusCodes.BAD_REQUEST)
  expect(res.json).toStrictEqual({
    message,
    code: 'BAD_REQUEST',
    error: 'Bad Request',
    statusCode: HttpStatusCodes.BAD_REQUEST,
  })
})

handler.addExpectHandler('AuthorizationError', (ctx) => {
  const { data: message = 'Unauthorized', res } = ctx
  expect(res.statusCode).toBe(HttpStatusCodes.UNAUTHORIZED)
  expect(res.json).toStrictEqual({
    message,
    code: 'UNAUTHORIZED',
    error: 'Unauthorized',
    statusCode: HttpStatusCodes.UNAUTHORIZED,
  })
})

handler.addExpectHandler('NotFoundError', (ctx) => {
  const { data: message = 'Resource not found', res } = ctx
  expect(res.statusCode).toBe(HttpStatusCodes.NOT_FOUND)
  expect(res.json).toStrictEqual({
    message,
    code: 'NOT_FOUND',
    error: 'Not Found',
    statusCode: HttpStatusCodes.NOT_FOUND,
  })
})

handler.addSpecHandler('Authorization', (ctx) => {
  const { data: name = 'Token', spec } = ctx
  void spec.withHeaders('Authorization', `Bearer $S{${name}}`)
})

const authorizationStep = (
  testCase: E2E,
  credentials: { email: string; password: string },
  name = 'Token',
) =>
  testCase
    .step('Get an authorization')
    .spec()
    .post('/auth/token')
    .withJson(credentials)
    .expectStatus(HttpStatusCodes.OK)
    .expectJsonMatch({
      token: string(),
    })
    .stores(name, 'token')
    .toss()

const tokenForTest =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpYXQiOjE2OTQ3NjI5NDd9.Ea_SepqpnWLQzsv0S4_twmfhnvwfYNsUsoTCPt8LapI'

export { authorizationStep, tokenForTest }

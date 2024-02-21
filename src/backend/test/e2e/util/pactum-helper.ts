import HttpStatusCodes from 'http-status-codes'
import { handler } from 'pactum'
import type { PactumResponse } from 'pactum/src/exports/handler'

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

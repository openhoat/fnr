import type { Boom } from '@hapi/boom'
import { html } from 'common-tags'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import HttpStatusCodes from 'http-status-codes'

const isBoomType = (err: Boom | Error): err is Boom => {
  const boomError = err as { isBoom?: boolean }
  return !!boomError.isBoom
}

const errorHandler = function (
  this: FastifyInstance,
  err: Boom | Error,
  request: FastifyRequest,
  reply: FastifyReply,
): string | { error: string; message: string; statusCode: number } {
  this.log.trace(err)
  let statusCode
  let error
  let message
  if (isBoomType(err)) {
    statusCode = err.output.payload.statusCode
    error = err.output.payload.error
    message = err.output.payload.message
  }
  if (statusCode === undefined) {
    statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR
  }
  if (error === undefined) {
    error = err.name || 'Internal Error'
  }
  if (message === undefined) {
    message = err.message || 'Unknown error'
  }
  this.log.error(
    `Error: ${JSON.stringify({
      error,
      message,
      statusCode,
    })}`,
  )
  void reply.status(statusCode)
  const accept = request.accepts()
  if (accept.type('json', 'html') === 'html') {
    void reply.type('text/html')
    return html`
      <html lang="en">
        <body>
          <h2>${error}</h2>
          <h3>${message}</h3>
        </body>
      </html>
    `
  }
  return {
    error,
    message,
    statusCode,
  }
}

export { errorHandler }

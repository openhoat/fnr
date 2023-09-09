import type { Boom } from '@hapi/boom'
import { html } from 'common-tags'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import HttpStatusCodes from 'http-status-codes'

const isBoomType = (err: Error | Boom): err is Boom => {
  const boomError = err as { isBoom?: boolean }
  return !!boomError.isBoom
}

const errorHandler = function (
  this: FastifyInstance,
  err: Error | Boom,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  let statusCode
  let error
  let message
  if (isBoomType(err)) {
    statusCode = err.output.payload.statusCode
    if (typeof err.output.payload.error !== 'undefined') {
      error = err.output.payload.error
    }
    message = err.output.payload.message
  }
  if (typeof statusCode === 'undefined') {
    statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR
  }
  if (typeof error === 'undefined') {
    error = err.name || 'Internal Error'
  }
  if (typeof message === 'undefined') {
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
  switch (accept.type('json', 'html')) {
    case 'html':
      void reply.type('text/html')
      return html`<html lang="en">
        <body>
          <h2>${error}</h2>
          <h3>${message}</h3>
        </body>
      </html>`
    case 'json':
    default:
      return {
        error,
        message,
        statusCode,
      }
  }
}

export { errorHandler }

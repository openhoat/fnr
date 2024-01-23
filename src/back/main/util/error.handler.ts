import type { Boom } from '@hapi/boom'
import { html } from 'common-tags'
import type {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify'
import HttpStatusCodes from 'http-status-codes'

type SupportedError = Boom | Error | FastifyError

interface ErrorResponse {
  error: string
  message: string
  statusCode: number
}

const isBoomError = (err: SupportedError): err is Boom => {
  const boomError = err as { isBoom?: boolean }
  return !!boomError.isBoom
}

const isFastifyError = (err: SupportedError): err is FastifyError => {
  const fastifyError = err as Partial<FastifyError>
  return (
    typeof fastifyError.code === 'string' &&
    typeof fastifyError.name === 'string' &&
    typeof fastifyError.statusCode === 'number'
  )
}

const getBoomErrorResponse = (
  err: SupportedError,
): Partial<ErrorResponse> | undefined =>
  isBoomError(err)
    ? {
        error: err.output.payload.error,
        message: err.output.payload.message,
        statusCode: err.output.payload.statusCode,
      }
    : undefined

const getFastifyErrorResponse = (
  err: SupportedError,
): Partial<ErrorResponse> | undefined =>
  isFastifyError(err)
    ? {
        error: err.code,
        message: err.message,
        statusCode: err.statusCode,
      }
    : undefined

const errorHandler = function (
  this: FastifyInstance,
  err: Boom | Error | FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
): string | { error: string; message: string; statusCode: number } {
  this.log.trace(err)
  const { error, message, statusCode }: ErrorResponse = {
    error: err.name || 'Internal Error',
    message: err.message || 'Unknown error',
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    ...getFastifyErrorResponse(err),
    ...getBoomErrorResponse(err),
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

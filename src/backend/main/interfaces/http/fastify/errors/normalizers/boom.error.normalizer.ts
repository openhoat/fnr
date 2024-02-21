import type { Boom } from '@hapi/boom'

import type {
  ErrorNormalizer,
  ErrorResponse,
} from '../../../../../types/interfaces/http/fastify/errors'

const isBoomError = (error: unknown): error is Boom => {
  const boomError = error as { isBoom?: boolean }
  return !!boomError.isBoom
}

const boomErrorNormalizer: ErrorNormalizer = (
  error: unknown,
): Partial<ErrorResponse> | undefined => {
  return isBoomError(error)
    ? {
        error: error.output.payload.error,
        message: error.output.payload.message,
        statusCode: error.output.payload.statusCode,
      }
    : undefined
}

export { boomErrorNormalizer, isBoomError }

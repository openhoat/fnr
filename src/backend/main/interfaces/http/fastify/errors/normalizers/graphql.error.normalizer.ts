import type { GraphQLError } from 'graphql/error'

import type {
  ErrorNormalizer,
  ErrorResponse,
} from '../../../../../types/interfaces/http/fastify/errors'

const isGraphqlError = (error: unknown): error is GraphQLError => {
  const graphqlError = error as {
    locations?: { column: number; line: number }[]
    path?: string[]
  }
  return !!(graphqlError.locations && graphqlError.path)
}

const graphqlErrorNormalizer: ErrorNormalizer = (
  error: unknown,
): Partial<ErrorResponse> | undefined => {
  if (!isGraphqlError(error)) {
    return undefined
  }
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (error.extensions?.boomError) {
    return error.extensions.boomError
  }
  return {
    error: error.name,
    message: error.message,
  }
}

export { graphqlErrorNormalizer, isGraphqlError }

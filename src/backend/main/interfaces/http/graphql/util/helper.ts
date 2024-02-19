import Boom from '@hapi/boom'
import type { FastifyReply } from 'fastify'
import type { ExecutionResult } from 'graphql/execution'
import type { DocumentNode } from 'graphql/language'
import { print } from 'graphql/language'

const withData = async <
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  p: Promise<ExecutionResult<T>>,
): Promise<T> => {
  const { data, errors } = await p
  if (errors) {
    throw errors[0]
  }
  if (!data) {
    throw Boom.notFound()
  }
  return data
}

const executeGql = <T extends Record<string, unknown>>(
  reply: FastifyReply,
  gql: DocumentNode,
  options?: {
    context?: Record<string, unknown>
    operationName?: string
    variables?: Record<string, unknown>
  },
): Promise<T> => {
  const { context, variables, operationName } = options ?? {}
  return withData(
    reply.graphql<T>(print(gql), context, variables, operationName),
  )
}

export { executeGql, withData }

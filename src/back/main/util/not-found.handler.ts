import Boom from '@hapi/boom'
import type { FastifyRequest } from 'fastify'

const notFoundHandler = (request: FastifyRequest) => {
  const { method, url } = request
  throw Boom.notFound(`Route ${request.method} ${request.url} not found`, {
    method,
    url,
  })
}

export { notFoundHandler }

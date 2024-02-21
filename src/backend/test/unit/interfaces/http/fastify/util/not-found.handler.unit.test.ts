import type { FastifyRequest } from 'fastify'

import { notFoundHandler } from '../../../../../../main/interfaces/http/fastify/util/not-found.handler'

describe('backend unit tests', () => {
  describe('interfaces', () => {
    describe('http', () => {
      describe('fastify', () => {
        describe('util', () => {
          describe('not found handler', () => {
            describe('notFoundHandler', () => {
              test('should throw an error with request infos', () => {
                // Given
                const request = {
                  method: 'GET',
                  url: '/bad-uri-path',
                } as unknown as FastifyRequest
                const expectedErrorMessage = 'Route GET /bad-uri-path not found'
                // When
                const fn = (): void => {
                  notFoundHandler(request)
                }
                // Then
                expect(fn).toHaveFailedWith({ message: expectedErrorMessage })
              })
            })
          })
        })
      })
    })
  })
})

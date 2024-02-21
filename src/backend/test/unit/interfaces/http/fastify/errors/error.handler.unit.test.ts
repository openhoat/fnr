import '@fastify/accepts'

import { html } from 'common-tags'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import Fastify from 'fastify'
import { when } from 'jest-when'

import {
  buildErrorHandler,
  normalizeResponse,
} from '../../../../../../main/interfaces/http/fastify/errors/error.handler'
import type { ErrorNormalizer } from '../../../../../../main/types/interfaces/http/fastify/errors'
import type { ErrorResponse } from '../../../../../../main/types/interfaces/http/fastify/errors'

const fakeNormalizer: ErrorNormalizer = ():
  | Partial<ErrorResponse>
  | undefined => undefined

describe('backend unit tests', () => {
  describe('interfaces', () => {
    describe('http', () => {
      describe('fastify', () => {
        describe('errors', () => {
          describe('error handler', () => {
            const errorMessage = 'simple error'
            const error = new Error(errorMessage)
            describe('normalizeResponse', () => {
              test('should return a normalized response', () => {
                // Given
                const customErrorNormalizers: ErrorNormalizer[] = [
                  (): Partial<ErrorResponse> | undefined => undefined,
                ]
                // When
                const result = normalizeResponse(error, customErrorNormalizers)
                // Then
                expect(result).toStrictEqual({
                  error: 'Error',
                  message: errorMessage,
                  statusCode: 500,
                })
              })
            })
            describe('buildErrorHandler', () => {
              let fastify: FastifyInstance
              beforeAll(() => {
                fastify = Fastify()
              })
              test('should return an error handler function given user agent accepts html', () => {
                // Given
                const requestAccepts = jest.fn()
                const request = {
                  accepts: requestAccepts,
                } as unknown as jest.Mocked<FastifyRequest>
                const acceptType = jest.fn()
                const accept = {
                  type: acceptType,
                } as unknown as jest.Mocked<
                  ReturnType<FastifyRequest['accepts']>
                >
                when(requestAccepts).calledWith().mockReturnValue(accept)
                when(acceptType)
                  .calledWith('json', 'html')
                  .mockReturnValue('html')
                const replyStatus = jest.fn()
                const replyType = jest.fn()
                const reply = {
                  status: replyStatus,
                  type: replyType,
                } as unknown as jest.Mocked<FastifyReply>
                const expectedHtmlResult = html`
                  <html lang="en">
                    <body>
                      <h2>Error</h2>
                      <h3>${errorMessage}</h3>
                    </body>
                  </html>
                `
                // When
                const errorHandler = buildErrorHandler(fakeNormalizer)
                // Then
                expect(typeof errorHandler).toBe('function')
                const result = errorHandler.call(fastify, error, request, reply)
                expect(replyStatus).toHaveBeenCalledTimes(1)
                expect(replyStatus).toHaveBeenCalledWith(500)
                expect(replyType).toHaveBeenCalledTimes(1)
                expect(replyType).toHaveBeenCalledWith('text/html')
                expect(result).toStrictEqual(expectedHtmlResult)
              })
              test('should return an error handler function given user agent does not accept json', () => {
                // Given
                const requestAccepts = jest.fn()
                const request = {
                  accepts: requestAccepts,
                } as unknown as jest.Mocked<FastifyRequest>
                const acceptType = jest.fn()
                const accept = {
                  type: acceptType,
                } as unknown as jest.Mocked<
                  ReturnType<FastifyRequest['accepts']>
                >
                when(requestAccepts).calledWith().mockReturnValue(accept)
                when(acceptType)
                  .calledWith('json', 'html')
                  .mockReturnValue('json')
                const replyStatus = jest.fn()
                const replyType = jest.fn()
                const reply = {
                  status: replyStatus,
                  type: replyType,
                } as unknown as jest.Mocked<FastifyReply>
                const expectedResult = {
                  error: 'Error',
                  message: errorMessage,
                  statusCode: 500,
                }
                // When
                const errorHandler = buildErrorHandler(fakeNormalizer)
                // Then
                expect(typeof errorHandler).toBe('function')
                const result = errorHandler.call(fastify, error, request, reply)
                expect(replyStatus).toHaveBeenCalledTimes(1)
                expect(replyStatus).toHaveBeenCalledWith(500)
                expect(replyType).not.toHaveBeenCalled()
                expect(result).toStrictEqual(expectedResult)
              })
            })
          })
        })
      })
    })
  })
})

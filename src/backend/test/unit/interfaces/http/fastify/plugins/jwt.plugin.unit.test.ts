import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { when } from 'jest-when'

import {
  jwtPlugin,
  jwtPreHandler,
  needJwt,
} from '../../../../../../main/interfaces/http/fastify/plugins/jwt.plugin'
import type { IocContainer } from '../../../../../../main/types/application/ioc'

describe('backend unit tests', () => {
  describe('interfaces', () => {
    describe('http', () => {
      describe('fastify', () => {
        describe('plugins', () => {
          describe('jwt plugin', () => {
            describe('jwtPlugin', () => {
              test('should throw an error given config does not provide jwtSecret', async () => {
                // Given
                const iocContainer = {
                  config: {},
                } as unknown as jest.Mocked<IocContainer>
                const fastify = {
                  iocContainer,
                } as unknown as jest.Mocked<FastifyInstance>
                // When
                const promise = jwtPlugin(fastify, {})
                // Then
                await expect(promise).toBeRejectedWith({
                  message: 'Missing jwtSecret in config',
                })
              })
            })
            describe('jwtPreHandler', () => {
              test('should verify JWT and return payload', async () => {
                // Given
                const logTraceMock = jest.fn()
                const fastify = {
                  log: { trace: logTraceMock },
                } as unknown as FastifyInstance
                const requestJwtVerifyMock = jest.fn()
                const expectedPayload = { foo: 'bar' }
                when(requestJwtVerifyMock)
                  .calledWith()
                  .mockResolvedValue(expectedPayload)
                const request = {
                  jwtVerify: requestJwtVerifyMock,
                } as unknown as FastifyRequest
                const reply = {} as unknown as FastifyReply
                // When
                const result = await jwtPreHandler.call(fastify, request, reply)
                // Then
                expect(requestJwtVerifyMock).toHaveBeenCalledWith()
                expect(requestJwtVerifyMock).toHaveBeenCalledTimes(1)
                expect(result).toBe(expectedPayload)
              })
              test('should throw an unauthorized error given jwt verify failed', async () => {
                // Given
                const logTraceMock = jest.fn()
                const fastify = {
                  log: { trace: logTraceMock },
                } as unknown as FastifyInstance
                const requestJwtVerifyMock = jest.fn()
                when(requestJwtVerifyMock)
                  .calledWith()
                  .mockImplementation(() => {
                    throw new Error('oops')
                  })
                const request = {
                  jwtVerify: requestJwtVerifyMock,
                } as unknown as FastifyRequest
                const reply = {} as unknown as FastifyReply
                // When
                const promise = jwtPreHandler.call(fastify, request, reply)
                // Then
                expect(requestJwtVerifyMock).toHaveBeenCalledWith()
                expect(requestJwtVerifyMock).toHaveBeenCalledTimes(1)
                await expect(promise).toBeRejectedWith({
                  message: 'Unauthorized',
                })
              })
            })
            describe('needJwt', () => {
              test('should add a request hook to verify JWT', async () => {
                // Given
                const fastifyAddHookMock = jest.fn()
                const fastifyRequestMock = {} as FastifyRequest
                const fastifyReplyMock = {} as FastifyReply
                when(fastifyAddHookMock)
                  .calledWith('onRequest', expect.any(Function))
                  .mockImplementation(
                    async (
                      __: string,
                      hook: (
                        request: FastifyRequest,
                        reply: FastifyReply,
                      ) => Promise<void>,
                    ) => {
                      await hook(fastifyRequestMock, fastifyReplyMock)
                    },
                  )
                const logDebugMock = jest.fn()
                const verifyJWTMock = jest.fn()
                const fastify = {
                  addHook: fastifyAddHookMock,
                  log: { debug: logDebugMock },
                  verifyJWT: verifyJWTMock,
                } as unknown as jest.Mocked<FastifyInstance>
                // When
                await needJwt(fastify, {})
                // Then
                expect(fastifyAddHookMock).toHaveBeenCalledWith(
                  'onRequest',
                  expect.any(Function),
                )
                expect(verifyJWTMock).toHaveBeenCalledWith(
                  fastifyRequestMock,
                  fastifyReplyMock,
                )
                expect(verifyJWTMock).toHaveBeenCalledTimes(1)
              })
              test('should throw an error given fastify does not provide verifyJWT', async () => {
                // Given
                const fastify = {} as unknown as jest.Mocked<FastifyInstance>
                // When
                const promise = needJwt(fastify, {})
                // Then
                await expect(promise).toBeRejectedWith({
                  message:
                    'Cannot use JWT authentication because verifiJWT is missing in fastify instance',
                })
              })
            })
          })
        })
      })
    })
  })
})

import fastifyStatic from '@fastify/static'
import fastifyVite from '@fastify/vite'
import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteHandlerMethod,
  RouteShorthandOptionsWithHandler,
} from 'fastify'
import { when } from 'jest-when'

import type { AppLogger } from '../../../../../../main/infra/logger/app-logger'
import { homePagePlugin } from '../../../../../../main/interfaces/http/fastify/plugins/home-page.plugin'
import type { IocContainer } from '../../../../../../main/types/application/ioc'

describe('backend unit tests', () => {
  describe('interfaces', () => {
    describe('http', () => {
      describe('fastify', () => {
        describe('plugins', () => {
          describe('homepage plugin', () => {
            describe('homePagePlugin', () => {
              let logger: jest.Mocked<AppLogger>
              let fakeRequest: FastifyRequest
              let homePageFakeReply: jest.Mocked<FastifyReply>
              beforeAll(() => {
                logger = {
                  debug: jest.fn(),
                  trace: jest.fn(),
                } as unknown as jest.Mocked<AppLogger>
                fakeRequest = {} as unknown as FastifyRequest
                homePageFakeReply = {
                  redirect: jest.fn(),
                } as unknown as jest.Mocked<FastifyReply>
              })
              afterEach(() => {
                jest.resetAllMocks()
              })
              afterAll(() => {
                jest.restoreAllMocks()
              })
              test('should register vite plugin given server is in development mode', async () => {
                // Given
                const iocContainer = {
                  logger,
                  config: {
                    baseDir: '/tmp',
                    isDevelopment: true,
                  },
                } as unknown as jest.Mocked<IocContainer>
                const fastify = {
                  iocContainer,
                  get: jest.fn(),
                  log: logger,
                  register: jest.fn(),
                  vite: {
                    ready: jest.fn(),
                  },
                } as unknown as jest.Mocked<FastifyInstance>
                const homePageFakeRouteHandler = ((
                  __: string,
                  handler: RouteHandlerMethod,
                ): FastifyInstance => {
                  handler.call(fastify, fakeRequest, homePageFakeReply)
                  return fastify
                }) as unknown as jest.Mocked<RouteShorthandOptionsWithHandler>
                when(fastify.get)
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  .calledWith('/', expect.any(Function))
                  .mockImplementation(
                    homePageFakeRouteHandler as unknown as (
                      __: string,
                      handler: RouteShorthandOptionsWithHandler,
                    ) => FastifyInstance,
                  )
                const appFakeReply = {
                  html: jest.fn(),
                } as unknown as jest.Mocked<FastifyReply>
                const appFakeRouteHandler = (
                  __: string,
                  handler: RouteHandlerMethod,
                ): FastifyInstance => {
                  handler.call(fastify, fakeRequest, appFakeReply)
                  return fastify
                }
                when(fastify.get)
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  .calledWith('/app', expect.any(Function))
                  .mockImplementation(
                    appFakeRouteHandler as unknown as (
                      __: string,
                      handler: RouteShorthandOptionsWithHandler,
                    ) => FastifyInstance,
                  )
                const appAllFakeReply = {
                  html: jest.fn(),
                } as unknown as jest.Mocked<FastifyReply>
                const appAllFakeRouteHandler = (
                  __: string,
                  handler: RouteHandlerMethod,
                ): FastifyInstance => {
                  handler.call(fastify, fakeRequest, appAllFakeReply)
                  return fastify
                }
                when(fastify.get)
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  .calledWith('/app/*', expect.any(Function))
                  .mockImplementation(
                    appAllFakeRouteHandler as unknown as (
                      __: string,
                      handler: RouteShorthandOptionsWithHandler,
                    ) => FastifyInstance,
                  )
                // When
                await homePagePlugin(fastify, {})
                // Then
                expect(fastify.get).toHaveBeenCalledWith(
                  '/',
                  expect.any(Function),
                )
                expect(fastify.register).toHaveBeenCalledWith(
                  fastifyVite,
                  expect.anything(),
                )
                expect(fastify.get).toHaveBeenCalledWith(
                  '/app',
                  expect.any(Function),
                )
                expect(fastify.get).toHaveBeenCalledWith(
                  '/app/*',
                  expect.any(Function),
                )
                // eslint-disable-next-line @typescript-eslint/unbound-method
                expect(fastify.vite.ready).toHaveBeenCalled()
                // eslint-disable-next-line @typescript-eslint/unbound-method
                expect(homePageFakeReply.redirect).toHaveBeenCalledWith('/app')
                // eslint-disable-next-line @typescript-eslint/unbound-method
                expect(appFakeReply.html).toHaveBeenCalledWith()
                // eslint-disable-next-line @typescript-eslint/unbound-method
                expect(appAllFakeReply.html).toHaveBeenCalledWith()
              })
              test('should serve home page given server is not in development mode', async () => {
                // Given
                const iocContainer = {
                  logger,
                  config: {
                    baseDir: '/tmp',
                    isDevelopment: false,
                  },
                } as unknown as jest.Mocked<IocContainer>
                const fastify = {
                  iocContainer,
                  get: jest.fn(),
                  log: logger,
                  register: jest.fn(),
                  vite: {
                    ready: jest.fn(),
                  },
                } as unknown as jest.Mocked<FastifyInstance>
                const homePageFakeRouteHandler = ((
                  __: string,
                  handler: RouteHandlerMethod,
                ): FastifyInstance => {
                  handler.call(fastify, fakeRequest, homePageFakeReply)
                  return fastify
                }) as unknown as jest.Mocked<RouteShorthandOptionsWithHandler>
                when(fastify.get)
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  .calledWith('/', expect.any(Function))
                  .mockImplementation(
                    homePageFakeRouteHandler as unknown as (
                      __: string,
                      handler: RouteShorthandOptionsWithHandler,
                    ) => FastifyInstance,
                  )
                const appFakeReply = {
                  sendFile: jest.fn(),
                  type: jest.fn(),
                } as unknown as jest.Mocked<FastifyReply>
                const appFakeRouteHandler = (
                  __: string,
                  handler: RouteHandlerMethod,
                ): FastifyInstance => {
                  handler.call(fastify, fakeRequest, appFakeReply)
                  return fastify
                }
                when(fastify.get)
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  .calledWith('/app', expect.any(Function))
                  .mockImplementation(
                    appFakeRouteHandler as unknown as (
                      __: string,
                      handler: RouteShorthandOptionsWithHandler,
                    ) => FastifyInstance,
                  )
                const appAllFakeReply = {
                  sendFile: jest.fn(),
                  type: jest.fn(),
                } as unknown as jest.Mocked<FastifyReply>
                const appAllFakeRouteHandler = (
                  __: string,
                  handler: RouteHandlerMethod,
                ): FastifyInstance => {
                  handler.call(fastify, fakeRequest, appAllFakeReply)
                  return fastify
                }
                when(fastify.get)
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  .calledWith('/app/*', expect.any(Function))
                  .mockImplementation(
                    appAllFakeRouteHandler as unknown as (
                      __: string,
                      handler: RouteShorthandOptionsWithHandler,
                    ) => FastifyInstance,
                  )
                // When
                await homePagePlugin(fastify, {})
                // Then
                expect(fastify.get).toHaveBeenCalledWith(
                  '/',
                  expect.any(Function),
                )
                expect(fastify.get).toHaveBeenCalledWith(
                  '/app',
                  expect.any(Function),
                )
                expect(fastify.get).toHaveBeenCalledWith(
                  '/app/*',
                  expect.any(Function),
                )
                expect(fastify.register).toHaveBeenCalledWith(
                  fastifyStatic,
                  expect.anything(),
                )
                // eslint-disable-next-line @typescript-eslint/unbound-method
                expect(fastify.vite.ready).not.toHaveBeenCalled()
                // eslint-disable-next-line @typescript-eslint/unbound-method
                expect(homePageFakeReply.redirect).toHaveBeenCalledWith('/app')
                // eslint-disable-next-line @typescript-eslint/unbound-method
                expect(appFakeReply.type).toHaveBeenCalledWith('text/html')
                // eslint-disable-next-line @typescript-eslint/unbound-method
                expect(appFakeReply.sendFile).toHaveBeenCalledWith(
                  'dist/client/index.html',
                  iocContainer.config.baseDir,
                )
                // eslint-disable-next-line @typescript-eslint/unbound-method
                expect(appAllFakeReply.type).toHaveBeenCalledWith('text/html')
                // eslint-disable-next-line @typescript-eslint/unbound-method
                expect(appAllFakeReply.sendFile).toHaveBeenCalledWith(
                  'dist/client/index.html',
                  iocContainer.config.baseDir,
                )
              })
            })
          })
        })
      })
    })
  })
})

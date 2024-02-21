import config from '../../../../../main/application/config'
import { InversifyIocContainer } from '../../../../../main/application/ioc/inversify/inversify-ioc-container'
import { AppLogger } from '../../../../../main/infra/logger/app-logger'
import { FastifyHttpServer } from '../../../../../main/interfaces/http/fastify/fastify-http-server'
import type { IocContainer } from '../../../../../main/types/application/ioc'

describe('backend unit tests', () => {
  describe('interfaces', () => {
    describe('http', () => {
      describe('fastify', () => {
        describe('fastify http server', () => {
          describe('FastifyHttpServer', () => {
            describe('instance', () => {
              let iocContainer: IocContainer
              let logger: AppLogger
              let fastifyHttpServer: FastifyHttpServer
              beforeAll(() => {
                iocContainer = new InversifyIocContainer(config)
                logger = new AppLogger(config)
                fastifyHttpServer = new FastifyHttpServer(
                  iocContainer,
                  logger.logger,
                )
              })
              describe('fastify', () => {
                test('should provide fastify property', () => {
                  // When
                  const { fastify } = fastifyHttpServer
                  // Then
                  expect(fastify).toBeTruthy()
                  expect(typeof fastify).toBe('object')
                })
              })
            })
          })
        })
      })
    })
  })
})

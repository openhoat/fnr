import fastifyAccepts from '@fastify/accepts'
import fastifyCors from '@fastify/cors'
import fastifyFormbody from '@fastify/formbody'
import type { FastifyInstance } from 'fastify'
import fastifyGracefulShutdown from 'fastify-graceful-shutdown'

import type { AppLogger } from '../../../../../../main/infra/logger/app-logger'
import { plugins } from '../../../../../../main/interfaces/http/fastify/plugins'
import { apidocPlugin } from '../../../../../../main/interfaces/http/fastify/plugins/apidoc.plugin'
import { homePagePlugin } from '../../../../../../main/interfaces/http/fastify/plugins/home-page.plugin'
import { swaggerUiPlugin } from '../../../../../../main/interfaces/http/fastify/plugins/swagger-ui.plugin'
import type { Config } from '../../../../../../main/types/application/config'
import type { IocContainer } from '../../../../../../main/types/application/ioc'

describe('backend unit tests', () => {
  describe('interfaces', () => {
    describe('http', () => {
      describe('fastify', () => {
        describe('plugins', () => {
          test('should register all plugins', async () => {
            // Given
            const config = {
              corsOrigin: 'https://fake.domain.io',
            } as unknown as Config
            const logger = {
              debug: jest.fn(),
              info: jest.fn(),
              trace: jest.fn(),
            } as unknown as jest.Mocked<AppLogger>
            const iocContainer = {
              config,
              logger,
            } as unknown as jest.Mocked<IocContainer>
            const fastify = {
              iocContainer,
              log: logger,
              register: jest.fn(),
            } as unknown as jest.Mocked<FastifyInstance>
            // When
            await plugins(fastify, {})
            // Then
            expect(fastify.register).toHaveBeenCalledWith(
              fastifyGracefulShutdown,
              {
                timeout: 5000,
              },
            )
            expect(fastify.register).toHaveBeenCalledWith(
              fastifyFormbody,
              undefined,
            )
            expect(fastify.register).toHaveBeenCalledWith(
              fastifyAccepts,
              undefined,
            )
            expect(fastify.register).toHaveBeenCalledWith(fastifyCors, {
              origin: config.corsOrigin,
            })
            expect(fastify.register).toHaveBeenCalledWith(
              apidocPlugin,
              undefined,
            )
            expect(fastify.register).toHaveBeenCalledWith(
              swaggerUiPlugin,
              undefined,
            )
            expect(fastify.register).toHaveBeenCalledWith(
              homePagePlugin,
              undefined,
            )
          })
        })
      })
    })
  })
})

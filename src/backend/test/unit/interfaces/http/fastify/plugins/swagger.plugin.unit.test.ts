import { join } from 'node:path'

import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import type { FastifyInstance } from 'fastify'

import { swaggerUiPlugin } from '../../../../../../main/interfaces/http/fastify/plugins/swagger-ui.plugin'

describe('backend unit tests', () => {
  describe('interfaces', () => {
    describe('http', () => {
      describe('fastify', () => {
        describe('plugins', () => {
          describe('swagger plugin', () => {
            describe('swaggerUiPlugin', () => {
              test('should register swagger ui without basic auth given no authUsername in config', async () => {
                // Given
                const baseDir = '/tmp'
                const config = { baseDir }
                const swaggerBaseDir = join(baseDir, 'swagger')
                const iocContainer = { config }
                const fastifyRegister = jest.fn()
                const fastify = {
                  iocContainer,
                  register: fastifyRegister,
                } as unknown as FastifyInstance
                const options = {}
                // When
                await swaggerUiPlugin(fastify, options)
                // Then
                expect(fastifyRegister).toHaveBeenCalledWith(fastifySwagger, {
                  mode: 'static',
                  specification: {
                    baseDir: swaggerBaseDir,
                    path: join(swaggerBaseDir, 'openapi.yaml'),
                  },
                })
                expect(fastifyRegister).toHaveBeenCalledWith(fastifySwaggerUi, {
                  baseDir: swaggerBaseDir,
                  routePrefix: '/swagger',
                  uiConfig: {
                    deepLinking: false,
                    docExpansion: 'list',
                    tryItOutEnabled: true,
                  },
                })
                expect(fastifyRegister).toHaveBeenCalledTimes(2)
              })
            })
          })
        })
      })
    })
  })
})

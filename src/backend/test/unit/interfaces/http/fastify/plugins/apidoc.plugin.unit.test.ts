import type { FastifyInstance } from 'fastify'

import { apidocPlugin } from '../../../../../../main/interfaces/http/fastify/plugins/apidoc.plugin'

describe('backend unit tests', () => {
  describe('interfaces', () => {
    describe('http', () => {
      describe('fastify', () => {
        describe('plugins', () => {
          describe('apidoc plugin', () => {
            describe('apidocPlugin', () => {
              test('should throw an error given /dist/apidoc is not a directory', async () => {
                // Given
                const iocContainer = {
                  config: {
                    baseDir: '/tmp',
                  },
                }
                const fastifyGet = jest.fn()
                const fastifyRegister = jest.fn()
                const fastify = {
                  iocContainer,
                  get: fastifyGet,
                  register: fastifyRegister,
                } as unknown as FastifyInstance
                const options = {}
                // When
                const promise = apidocPlugin(fastify, options)
                // Then
                await expect(promise).toBeRejectedWith({
                  message:
                    'Cannot register apidoc plugin: directory does not exist (/tmp/dist/apidoc)',
                })
              })
            })
          })
        })
      })
    })
  })
})

import config from '../../../../../main/application/config'
import { InversifyIocContainer } from '../../../../../main/application/ioc/inversify/inversify-ioc-container'
import { AppLogger } from '../../../../../main/infra/logger/app-logger'
import type { IocContainer } from '../../../../../main/types/application/ioc'

describe('backend unit tests', () => {
  describe('application', () => {
    describe('ioc', () => {
      describe('inversify', () => {
        describe('inversify ioc container', () => {
          describe('InversifyIocContainer', () => {
            describe('instance', () => {
              let iocContainer: IocContainer
              beforeAll(() => {
                iocContainer = new InversifyIocContainer(config)
              })
              test('should provide logger property', () => {
                // When
                const { logger } = iocContainer
                // Then
                expect(logger).toBeInstanceOf(AppLogger)
              })
            })
          })
        })
      })
    })
  })
})

import { e2e, request } from 'pactum'
import type E2E from 'pactum/src/models/E2E'

import { startApp } from '../../../main/application/starter'
import type { IocContainer } from '../../../main/types/application/ioc'

let testCase: E2E

const getTestCase = (): E2E => testCase

const startTestServer = async (): Promise<void> => {
  registerHooks.iocContainer = await startApp()
  const { baseUrl } = registerHooks.iocContainer.httpServer
  if (baseUrl) {
    request.setBaseUrl(baseUrl)
  }
}

const registerHooks: (() => void) & {
  iocContainer?: IocContainer
} = (): void => {
  beforeAll(async () => {
    await startTestServer()
  })
  beforeEach(() => {
    const { currentTestName } = expect.getState()
    if (!currentTestName) {
      throw new Error('Impossible to get the current test name in expect state')
    }
    testCase = e2e(currentTestName)
  })
  afterEach(async () => {
    await testCase.cleanup()
  })
  afterAll(async () => {
    const { iocContainer } = registerHooks
    if (!iocContainer) {
      return
    }
    await iocContainer.httpServer.stop()
    delete registerHooks.iocContainer
  })
}

export { getTestCase, registerHooks, startTestServer }

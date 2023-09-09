import type { FastifyInstance } from 'fastify'
import { e2e, request } from 'pactum'
import type E2E from 'pactum/src/models/E2E'

import server from '../../../main/server'

let testCase: E2E

const getTestCase = () => testCase

const startTestServer = async () => {
  const fastify = server.init()
  registerHooks.fastify = fastify
  await server.configure(fastify)
  await server.start(fastify)
  request.setBaseUrl('http://127.0.0.1:3000')
}

const registerHooks: (() => void) & { fastify?: FastifyInstance } = () => {
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
    if (testCase) {
      await testCase.cleanup()
    }
  })
  afterAll(async () => {
    const { fastify } = registerHooks
    if (!fastify) {
      return
    }
    await server.stop(fastify)
    delete registerHooks.fastify
  })
}

export { getTestCase, registerHooks, startTestServer }

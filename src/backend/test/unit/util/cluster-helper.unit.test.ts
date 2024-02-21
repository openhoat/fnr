import { availableParallelism } from 'node:os'

import { when } from 'jest-when'

import {
  deleteEnvVars,
  restoreEnvVars,
  saveEnvVars,
} from '../../util/env-utils'

describe('backend unit tests', () => {
  describe('util', () => {
    describe('cluster helper', () => {
      describe('withCluster', () => {
        let clusterMock: {
          fork: jest.SpyInstance
          isPrimary: boolean
          isWorker: boolean
          on: jest.SpyInstance
        }
        let clusterHelper: {
          withCluster: (
            workerFn: () => Promise<unknown>,
            options?: { log: (msg: string) => void },
          ) => Promise<void>
        }
        beforeAll(() => {
          saveEnvVars('NODE_CLUSTER')
        })
        beforeEach(() => {
          deleteEnvVars('NODE_CLUSTER')
          clusterMock = {
            fork: jest.fn(),
            isPrimary: false,
            isWorker: false,
            on: jest.fn(),
          }
          jest.doMock('node:cluster', () => clusterMock)
          clusterHelper =
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            require('../../../main/util/cluster-helper') as typeof clusterHelper
        })
        afterEach(() => {
          jest.resetModules()
        })
        afterAll(() => {
          restoreEnvVars('NODE_CLUSTER')
        })
        test('should execute worker function given NODE_CLUSTER env var is not set', async () => {
          // Given
          const workerFn = jest.fn()
          // When
          await clusterHelper.withCluster(workerFn)
          // Then
          expect(workerFn).toHaveBeenCalledWith()
        })
        test('should execute worker function given NODE_CLUSTER env var is set and current process is worker', async () => {
          // Given
          process.env.NODE_CLUSTER = '1'
          clusterMock.isWorker = true
          const workerFn = jest.fn()
          const options = { log: jest.fn() }
          // When
          await clusterHelper.withCluster(workerFn, options)
          // Then
          expect(options.log).toHaveBeenCalledWith(
            `Starting worker (${process.pid})…`,
          )
          expect(workerFn).toHaveBeenCalledWith()
        })
        test('should throw an error given current process is not primary neither worker', async () => {
          // Given
          process.env.NODE_CLUSTER = '1'
          clusterMock.isWorker = false
          clusterMock.isPrimary = false
          const workerFn = jest.fn()
          const options = { log: jest.fn() }
          // When
          const promise = clusterHelper.withCluster(workerFn, options)
          // Then
          await expect(promise).toBeRejectedWith({
            message: 'Cluster error: should be primary worker',
          })
          expect(options.log).not.toHaveBeenCalled()
          expect(clusterMock.on).not.toHaveBeenCalled()
          expect(clusterMock.fork).not.toHaveBeenCalled()
        })
        test('should execute primary worker function given NODE_CLUSTER env var is set and current process is primary and signal SIGINT is thrown', async () => {
          // Given
          process.env.NODE_CLUSTER = '1'
          clusterMock.isWorker = false
          clusterMock.isPrimary = true
          const workerFn = jest.fn()
          const options = { log: jest.fn() }
          when(clusterMock.on)
            .calledWith('exit', expect.any(Function))
            .mockImplementation(
              (
                __: string,
                listener: (
                  worker: Worker,
                  code: number,
                  signal: string,
                ) => void,
              ) => {
                const worker = {
                  process: { pid: 1234 },
                } as unknown as Worker
                listener(worker, 0, 'SIGINT')
              },
            )
          when(clusterMock.on)
            .calledWith('online', expect.any(Function))
            .mockImplementation(
              (__string, listener: (worker: Worker) => void) => {
                const worker = {
                  process: { pid: 5678 },
                } as unknown as Worker
                listener(worker)
              },
            )
          // When
          await clusterHelper.withCluster(workerFn, options)
          // Then
          expect(options.log).toHaveBeenCalledWith(
            `Starting primary worker (${process.pid})…`,
          )
          expect(clusterMock.on).toHaveBeenCalledWith(
            'exit',
            expect.any(Function),
          )
          expect(clusterMock.on).toHaveBeenCalledWith(
            'online',
            expect.any(Function),
          )
          expect(clusterMock.on).toHaveBeenCalledTimes(2)
          expect(options.log).toHaveBeenCalledWith(
            // eslint-disable-next-line sonarjs/no-duplicate-string
            'Launching a new worker (#1)…',
          )
          expect(clusterMock.fork).toHaveBeenCalledWith()
          expect(clusterMock.fork).toHaveBeenCalledTimes(1)
          expect(options.log).toHaveBeenCalledWith(
            'Worker (1234) received signal: SIGINT.',
          )
          // eslint-disable-next-line sonarjs/no-duplicate-string
          expect(options.log).toHaveBeenCalledWith('Worker (5678) is online.')
        })
        test('should execute primary worker function given NODE_CLUSTER env var is true and current process is primary and signal SIGINT is thrown', async () => {
          // Given
          process.env.NODE_CLUSTER = 'true'
          clusterMock.isWorker = false
          clusterMock.isPrimary = true
          const workerFn = jest.fn()
          const options = { log: jest.fn() }
          when(clusterMock.on)
            .calledWith('exit', expect.any(Function))
            .mockImplementation(
              (
                __: string,
                listener: (
                  worker: Worker,
                  code: number,
                  signal: string,
                ) => void,
              ) => {
                const worker = {
                  process: { pid: 1234 },
                } as unknown as Worker
                listener(worker, 0, 'SIGINT')
              },
            )
          when(clusterMock.on)
            .calledWith('online', expect.any(Function))
            .mockImplementation(
              (__string, listener: (worker: Worker) => void) => {
                const worker = {
                  process: { pid: 5678 },
                } as unknown as Worker
                listener(worker)
              },
            )
          // When
          await clusterHelper.withCluster(workerFn, options)
          // Then
          expect(options.log).toHaveBeenCalledWith(
            `Starting primary worker (${process.pid})…`,
          )
          expect(clusterMock.on).toHaveBeenCalledWith(
            'exit',
            expect.any(Function),
          )
          expect(clusterMock.on).toHaveBeenCalledWith(
            'online',
            expect.any(Function),
          )
          expect(clusterMock.on).toHaveBeenCalledTimes(2)
          expect(options.log).toHaveBeenCalledWith(
            // eslint-disable-next-line sonarjs/no-duplicate-string
            'Launching a new worker (#1)…',
          )
          expect(clusterMock.fork).toHaveBeenCalledWith()
          expect(clusterMock.fork).toHaveBeenCalledTimes(availableParallelism())
          expect(options.log).toHaveBeenCalledWith(
            'Worker (1234) received signal: SIGINT.',
          )
          // eslint-disable-next-line sonarjs/no-duplicate-string
          expect(options.log).toHaveBeenCalledWith('Worker (5678) is online.')
        })
        test('should execute primary worker function given NODE_CLUSTER env var is set and current process is primary and exit code is 1', async () => {
          // Given
          process.env.NODE_CLUSTER = '1'
          clusterMock.isWorker = false
          clusterMock.isPrimary = true
          const workerFn = jest.fn()
          const options = { log: jest.fn() }
          when(clusterMock.on)
            .calledWith('exit', expect.any(Function))
            .mockImplementation(
              (
                __: string,
                listener: (
                  worker: Worker,
                  code: number,
                  signal: string,
                ) => void,
              ) => {
                const worker = {
                  process: { pid: 1234 },
                } as unknown as Worker
                listener(worker, 1, '')
              },
            )
          when(clusterMock.on)
            .calledWith('online', expect.any(Function))
            .mockImplementation(
              (__string, listener: (worker: Worker) => void) => {
                const worker = {
                  process: { pid: 5678 },
                } as unknown as Worker
                listener(worker)
              },
            )
          // When
          await clusterHelper.withCluster(workerFn, options)
          // Then
          expect(options.log).toHaveBeenCalledWith(
            `Starting primary worker (${process.pid})…`,
          )
          expect(clusterMock.on).toHaveBeenCalledWith(
            'exit',
            expect.any(Function),
          )
          expect(clusterMock.on).toHaveBeenCalledWith(
            'online',
            expect.any(Function),
          )
          expect(clusterMock.on).toHaveBeenCalledTimes(2)
          expect(options.log).toHaveBeenCalledWith(
            'Launching a new worker (#1)…',
          )
          expect(clusterMock.fork).toHaveBeenCalledWith()
          expect(clusterMock.fork).toHaveBeenCalledTimes(2)
          expect(options.log).toHaveBeenCalledWith(
            'Worker (1234) exited with error code: 1.',
          )
          expect(options.log).toHaveBeenCalledWith('Worker (5678) is online.')
        })
        test('should execute primary worker function given NODE_CLUSTER env var is set and current process is primary and exit code is 0', async () => {
          // Given
          process.env.NODE_CLUSTER = '1'
          clusterMock.isWorker = false
          clusterMock.isPrimary = true
          const workerFn = jest.fn()
          const options = { log: jest.fn() }
          when(clusterMock.on)
            .calledWith('exit', expect.any(Function))
            .mockImplementation(
              (
                __: string,
                listener: (
                  worker: Worker,
                  code: number,
                  signal: string,
                ) => void,
              ) => {
                const worker = {
                  process: { pid: 1234 },
                } as unknown as Worker
                listener(worker, 0, '')
              },
            )
          when(clusterMock.on)
            .calledWith('online', expect.any(Function))
            .mockImplementation(
              (__string, listener: (worker: Worker) => void) => {
                const worker = {
                  process: { pid: 5678 },
                } as unknown as Worker
                listener(worker)
              },
            )
          // When
          await clusterHelper.withCluster(workerFn, options)
          // Then
          expect(options.log).toHaveBeenCalledWith(
            `Starting primary worker (${process.pid})…`,
          )
          expect(clusterMock.on).toHaveBeenCalledWith(
            'exit',
            expect.any(Function),
          )
          expect(clusterMock.on).toHaveBeenCalledWith(
            'online',
            expect.any(Function),
          )
          expect(clusterMock.on).toHaveBeenCalledTimes(2)
          expect(options.log).toHaveBeenCalledWith(
            'Launching a new worker (#1)…',
          )
          expect(clusterMock.fork).toHaveBeenCalledWith()
          expect(clusterMock.fork).toHaveBeenCalledTimes(2)
          expect(options.log).toHaveBeenCalledWith(
            'Worker (1234) has been terminated.',
          )
          expect(options.log).toHaveBeenCalledWith('Worker (5678) is online.')
        })
      })
    })
  })
})

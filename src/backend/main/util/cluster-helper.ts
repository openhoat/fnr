import cluster from 'node:cluster'
import { availableParallelism } from 'node:os'

export const withCluster = async (
  workerFn: () => Promise<unknown>,
  options?: { log: (msg: string) => void },
): Promise<void> => {
  const { NODE_CLUSTER } = process.env
  const { log = console.log.bind(console) } = options ?? {}
  if (!NODE_CLUSTER) {
    await workerFn()
    return
  }
  if (cluster.isWorker) {
    log(`Starting worker (${process.pid})…`)
    await workerFn()
    return
  }
  if (!cluster.isPrimary) {
    throw new Error('Cluster error: should be primary worker')
  }
  log(`Starting primary worker (${process.pid})…`)
  const clusterWorkers = Number(NODE_CLUSTER)
  const numCPUs = Number.isNaN(clusterWorkers)
    ? availableParallelism()
    : clusterWorkers
  cluster.on('exit', (worker, code, signal) => {
    if (signal) {
      log(`Worker (${worker.process.pid}) received signal: ${signal}.`)
      return
    }
    if (code) {
      log(`Worker (${worker.process.pid}) exited with error code: ${code}.`)
    } else {
      log(`Worker (${worker.process.pid}) has been terminated.`)
    }
    log('Launching a new worker…')
    cluster.fork()
  })
  cluster.on('online', (worker) => {
    log(`Worker (${worker.process.pid}) is online.`)
  })
  for (let i = 0; i < numCPUs; i++) {
    log(`Launching a new worker (#${i + 1})…`)
    cluster.fork()
  }
}

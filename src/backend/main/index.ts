import { startApp } from './application/starter'
import { withCluster } from './util/cluster-helper'

const bootstrap = async (): Promise<void> => {
  try {
    await withCluster(startApp)
  } catch (error) {
    console.error(error)
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  }
}

void bootstrap()

export { bootstrap }

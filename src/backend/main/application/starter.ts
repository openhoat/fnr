import config from './config'
import { InversifyIocContainer } from './ioc/inversify/inversify-ioc-container'

const startApp = async (): Promise<InversifyIocContainer> => {
  const iocContainer = new InversifyIocContainer(config)
  const { httpServer } = iocContainer
  await httpServer.configure()
  await httpServer.start()
  return iocContainer
}

export { startApp }

import type { FastifyInstance } from 'fastify'
import type { FastifyPluginAsync } from 'fastify/types/plugin'
import fastifyPlugin from 'fastify-plugin'

const ormPlugin: FastifyPluginAsync = fastifyPlugin(
  (fastify: FastifyInstance) => {
    const { iocContainer, log } = fastify
    const { config, userDomain, orm } = iocContainer
    fastify.addHook('onReady', async () => {
      await orm.start()
      const existingAdminUser = await userDomain.findUserByUsername(
        config.defaultAdminUsername,
      )
      if (existingAdminUser) {
        return
      }
      log.debug('Missing admin user: creating default one…')
      const newAdminUser = await userDomain.createUser({
        email: config.defaultAdminEmail,
        password: config.defaultAdminPassword,
        role: 'admin',
        username: config.defaultAdminUsername,
      })
      log.info(newAdminUser, 'Created default admin user')
    })
    fastify.addHook('onClose', () => orm.stop())
    return Promise.resolve()
  },
)

export { ormPlugin }

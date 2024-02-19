import Boom from '@hapi/boom'

import type { Config } from '../types/application/config'
import type { UserDomain } from '../types/domain/user'

class SimpleUserDomain implements UserDomain {
  readonly #config: Config

  constructor(config: Config) {
    this.#config = config
  }

  signIn(username = '', password = ''): void {
    if (
      this.#config.authUsername &&
      (username !== this.#config.authUsername ||
        password !== this.#config.authPassword)
    ) {
      throw Boom.unauthorized()
    }
  }
}

export { SimpleUserDomain }

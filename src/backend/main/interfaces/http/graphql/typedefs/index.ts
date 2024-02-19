import { typeDefs as scalarTypeDefs } from 'graphql-scalars'

import { aboutTypedefs } from './about.typedefs'
import { authTypedefs } from './auth.typedefs'
import { configTypedefs } from './config.typedefs'
import { usersTypedefs } from './users.typedefs'

export default [
  aboutTypedefs,
  authTypedefs,
  configTypedefs,
  scalarTypeDefs,
  usersTypedefs,
]

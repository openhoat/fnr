import { gql } from 'graphql-tag'

const configTypedefs = gql`
  enum LogLevel {
    silent
    error
    warn
    info
    debug
    trace
  }
  type Config {
    corsOrigin: String
    isDevelopment: Boolean!
    logLevel: LogLevel!
  }
  type Query {
    config: Config @auth(requires: ADMIN)
  }
`

export { configTypedefs }

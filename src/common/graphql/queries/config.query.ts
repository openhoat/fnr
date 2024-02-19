import { gql } from 'graphql-tag'

const configQuery = gql`
  query Config {
    config {
      corsOrigin
      isDevelopment
      logLevel
    }
  }
`

export { configQuery }

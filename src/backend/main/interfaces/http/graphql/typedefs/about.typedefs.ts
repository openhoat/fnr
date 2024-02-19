import { gql } from 'graphql-tag'

const aboutTypedefs = gql`
  type About {
    version: String
  }
  type Query {
    about: About
  }
`

export { aboutTypedefs }

import { gql } from 'graphql-tag'

const authTypedefs = gql`
  directive @auth(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION

  enum Role {
    ADMIN
    USER
    UNKNOWN
  }
`

export { authTypedefs }

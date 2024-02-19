import { gql } from 'graphql-tag'

const usersTypedefs = gql`
  enum LogLevel {
    silent
    error
    warn
    info
    debug
    trace
  }
  enum Role {
    user
    admin
  }
  type User {
    id: UUID!
    username: String!
    email: EmailAddress!
    role: Role!
  }
  type Query {
    users: [User!] @auth(requires: admin)
    me: User! @auth
    user(id: UUID!): User @auth(requires: admin)
  }
  type Mutation {
    createUser(
      username: String!
      email: EmailAddress!
      password: String!
    ): User! @auth(requires: admin)
    deleteUser(id: UUID!): User! @auth(requires: admin)
  }
`

export { usersTypedefs }

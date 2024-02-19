import { gql } from 'graphql-tag'

import { userDetailsFragment } from '../fragments/user-details.fragment'

const createUserMutation = gql`
  ${userDetailsFragment}
  mutation CreateUser(
    $username: String!
    $email: EmailAddress!
    $password: String!
  ) {
    newUser: createUser(
      username: $username
      email: $email
      password: $password
    ) {
      ...UserDetails
    }
  }
`

export { createUserMutation }

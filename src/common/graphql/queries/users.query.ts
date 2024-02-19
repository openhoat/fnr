import { gql } from 'graphql-tag'

import { userDetailsFragment } from '../fragments/user-details.fragment'

const usersQuery = gql`
  ${userDetailsFragment}
  query Users {
    users {
      ...UserDetails
    }
  }
`

export { usersQuery }

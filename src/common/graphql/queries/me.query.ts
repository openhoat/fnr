import { gql } from 'graphql-tag'

import { userDetailsFragment } from '../fragments/user-details.fragment'

const meQuery = gql`
  ${userDetailsFragment}
  query Me {
    me {
      ...UserDetails
    }
  }
`

export { meQuery }

import { gql } from 'graphql-tag'

import { userDetailsFragment } from '../fragments/user-details.fragment'

const userByIdQuery = gql`
  ${userDetailsFragment}
  query UserById($id: UUID!) {
    user(id: $id) {
      ...UserDetails
    }
  }
`

export { userByIdQuery }

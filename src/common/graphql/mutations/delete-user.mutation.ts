import { gql } from 'graphql-tag'

import { userDetailsFragment } from '../fragments/user-details.fragment'

const deleteUserMutation = gql`
  ${userDetailsFragment}
  mutation DeleteUser($id: UUID!) {
    deletedUser: deleteUser(id: $id) {
      ...UserDetails
    }
  }
`

export { deleteUserMutation }

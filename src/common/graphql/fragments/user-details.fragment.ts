import { gql } from 'graphql-tag'

const userDetailsFragment = gql`
  fragment UserDetails on User {
    id
    username
    email
    role
  }
`

export { userDetailsFragment }

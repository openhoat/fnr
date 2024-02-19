import { gql } from 'graphql-tag'

const aboutQuery = gql`
  query About {
    about {
      version
    }
  }
`

export { aboutQuery }

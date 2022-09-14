import {gql} from '@apollo/client';

export const listUsers = gql`
query ListUsers(
  $filter: String!
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: {
    username: {
      contains: "sambulosenda"
    }
  } limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      username
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
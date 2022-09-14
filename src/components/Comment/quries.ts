import { gql } from '@apollo/client';

export const deleteComment  = gql`
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
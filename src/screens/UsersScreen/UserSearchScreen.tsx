import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TextInput } from 'react-native';
import { UsersByUsernameQuery, UsersByUsernameQueryVariables } from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage';
import UserListItem from '../../components/UserListItem/UserListItem';

export const usersByUsername = gql`
  query UsersByUsername(
    $username: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        email
        bio
        username
        website
        nofPosts
        nofFollowers
        nofFollowing
        image
        Posts {
          nextToken
          startedAt
        }
        Comments {
          nextToken
          startedAt
        }
        Likes {
          nextToken
          startedAt
        }
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

const UserSearchScreen = () => {
  const [text, onChangeText] = useState("sambulo")

  const { data, loading, error, refetch } = useQuery<
    UsersByUsernameQuery,
    UsersByUsernameQueryVariables
  >(usersByUsername);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <ApiErrorMessage title="Error fetching users" message={error.message} />
    );
  }

  const users = (data?.usersByUsername?.items || []).filter(
    user => user && !user._deleted,
  );
  return (
    <>
      <TextInput
        placeholder='Search user'
        onChangeText={onChangeText}
        value={text}
        style={styles.input}
        underlineColorAndroid="transparent"
      />
      
      <FlatList
        data={users}
        renderItem={({ item }) => item && <UserListItem user={item} />}
        onRefresh={() => refetch()}
        refreshing={loading}
      /></>

  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default UserSearchScreen;


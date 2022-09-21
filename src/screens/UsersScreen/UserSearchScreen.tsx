import { useQuery } from '@apollo/client';
import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { ListUsersQuery, ListUsersQueryVariables } from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage';
import UserListItem from '../../components/UserListItem/UserListItem';
import { listUsers } from './queries';

const UserSearchScreen = () => {
  const { data, loading, error, refetch } = useQuery<ListUsersQuery, ListUsersQueryVariables>(
    listUsers
  );

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <ApiErrorMessage title="Error fetching users" message={error.message} />;
  }

  const users = (data?.listUsers?.items || []).filter((user) => user && !user._deleted);

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => item && <UserListItem user={item} />}
      onRefresh={() => refetch()}
      refreshing={loading}
    />
  );
};

export default UserSearchScreen;

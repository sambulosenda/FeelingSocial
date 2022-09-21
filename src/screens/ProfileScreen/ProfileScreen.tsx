import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import Button from '../../components/Button/Button';

import { useNavigation, useRoute } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { GetUserQuery, GetUserQueryVariables } from '../../API';

import { useQuery } from '@apollo/client';
import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage';
import PersonalFeed from '../../components/PersonalFeed/PersonalFeed';
import { useAuthContext } from '../../contexts/AuthContext';
import {
  MyProfileNavigationProp,
  MyProfileRouteProp,
  UserProfileNavigationProp,
  UserProfileRouteProp,
} from '../../types/navigation';
import ProfileHeader from './ProfileHeader';
import { getUser } from './queries';

const ProfileScreen = () => {
  const route = useRoute<UserProfileRouteProp | MyProfileRouteProp>();
  const navigation = useNavigation<UserProfileNavigationProp | MyProfileNavigationProp>();

  const { userId: authUserId } = useAuthContext();

  const userId = route.params?.userId || authUserId;

  const { data, loading, error, refetch } = useQuery<GetUserQuery, GetUserQueryVariables>(getUser, {
    variables: { id: userId },
  });

  const user = data?.getUser;

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || !user) {
    return (
      <>
        <ApiErrorMessage
          title="Error fetching the user"
          message={error?.message || 'User not found'}
          onRetry={() => refetch()}
        />
        <Button onPress={() => Auth.signOut()} text="Sign out" inline />
      </>
    );
  }

  const myposts = (user.Posts?.items || []).filter((posts) => !posts?._deleted);
  console.log(myposts);

  return (
    <View style={styles.root}>
      <ProfileHeader user={user} />
      <FlatList
        data={myposts || []}
        renderItem={({ item }) => item && <PersonalFeed post={item} user={user} />}
        showsVerticalScrollIndicator={false}
        onRefresh={refetch}
        refreshing={loading}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  root: {
    padding: 10,
    flex: 1,
    backgroundColor: 'white',
  },
  name: {
    fontWeight: 'bold',
  },
  avatar: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
  },
  numberContainer: {
    alignItems: 'center',
  },
  numberText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

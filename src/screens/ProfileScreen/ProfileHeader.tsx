import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Auth, Storage } from 'aws-amplify';
import {
  CreateUserFollowMutation,
  CreateUserFollowMutationVariables,
  DeleteUserFeedPostMutationVariables,
  DeleteUserFollowMutation,
  User,
  UserFollowingsQuery,
  UserFollowingsQueryVariables,
} from '../../API';

import { useMutation, useQuery } from '@apollo/client';
import UserImage from '../../components/UserImage/UserImage';
import { useAuthContext } from '../../contexts/AuthContext';
import { ProfileNavigationProp } from '../../types/navigation';
import { createUserFollow, deleteUserFollow, userFollowings } from './queries';

interface IProfileHeader {
  user: User;
}

const ProfileHeader = ({ user }: IProfileHeader) => {
  //Store the image uri in a state
  const [imageUri, setImageUri] = useState<String | null>(null);
  const { userId } = useAuthContext();
  const navigation = useNavigation<ProfileNavigationProp>();

  const { data: userFollowingsData, loading: userFollowingsLoading } = useQuery<
    UserFollowingsQuery,
    UserFollowingsQueryVariables
  >(userFollowings, { variables: { followerID: userId, followeeID: { eq: user.id } } });

  const [doFollow, { loading: followingLoading }] = useMutation<
    CreateUserFollowMutation,
    CreateUserFollowMutationVariables
  >(createUserFollow, { variables: { input: { followeeID: user.id, followerID: userId } } });

  const [doUnfollow, { loading: unfollowingLoading }] = useMutation<
    DeleteUserFollowMutation,
    DeleteUserFeedPostMutationVariables
  >(deleteUserFollow);

  navigation.setOptions({ title: user?.username || 'Profile' });

  useEffect(() => {
    if (user.image) {
      Storage.get(user.image).then(setImageUri);
    }
  }, [user]);

  const userFollowObject = userFollowingsData?.UserFollowings?.items?.filter(
    (items) => !items?._deleted
  )[0];

  console.log(userFollowingsData);

  const onFollowPress = async () => {
    if (!!userFollowObject) {
      //delete it
      try {
        await doUnfollow({
          variables: { input: { id: userFollowObject.id, _version: userFollowObject._version } },
        });
      } catch (error) {
        Alert.alert('Failed to unfollow the user', (error as Error).message);
      }
    } else {
      //follow it
      try {
        await doFollow();
      } catch (error) {
        Alert.alert('Failed to follow the user', (error as Error).message);
      }
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.headerRow}>
        <UserImage imageKey={user.image || undefined} width={100} />

        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofPosts}</Text>
          <Text>Posts</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofFollowers}</Text>
          <Text>Followers</Text>
        </View>

        <Pressable style={styles.numberContainer} onPress={() => navigation.navigate('dsadasd')}>
          <Text style={styles.numberText}>{user.nofFollowing}</Text>
          <Text>Following</Text>
        </Pressable>
      </View>

      <View style={{ marginVertical: 20 }}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>

      {userId === user.id ? (
        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => Auth.signOut()}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={onFollowPress}
          disabled={userFollowingsLoading || followingLoading || unfollowingLoading}
        >
          <Text style={styles.buttonText}>{!!userFollowObject ? 'Unfollow' : 'Follow'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bio: {
    fontSize: 17,
    marginTop: 5,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '49%',
    alignItems: 'center',
    backgroundColor: '#e0e5ff',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#e0e5ff',
  },

  buttonText: {
    fontSize: 14,
    color: '#4b36cc',
    fontWeight: 'bold',
  },
  root: {
    padding: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
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
    fontSize: 22,
    fontWeight: 'bold',
  },
});

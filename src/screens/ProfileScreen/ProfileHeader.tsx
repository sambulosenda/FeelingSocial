import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Auth, Storage } from 'aws-amplify';
import { User } from '../../API';

import UserImage from '../../components/UserImage/UserImage';
import { useAuthContext } from '../../contexts/AuthContext';
import { ProfileNavigationProp } from '../../types/navigation';

interface IProfileHeader {
  user: User;
}

const ProfileHeader = ({ user }: IProfileHeader) => {
  //Store the image uri in a state
  const [imageUri, setImageUri] = useState<String | null>(null);
  const { userId } = useAuthContext();
  const navigation = useNavigation<ProfileNavigationProp>();
  navigation.setOptions({ title: user?.username || 'Profile' });

  useEffect(() => {
    if (user.image) {
      Storage.get(user.image).then(setImageUri);
    }
  }, [user]);

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

      {userId === user.id && (
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

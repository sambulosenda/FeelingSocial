import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Post, User } from '../../API';

import { Storage } from 'aws-amplify';
import relativeTime from 'dayjs/plugin/relativeTime';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useAuthContext } from '../../contexts/AuthContext';

import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import UserImage from '../UserImage/UserImage';

// somewhere in your app
interface PersonalPost {
  post: Post;
}

interface UserInterface {
  user: User;
}

const PersonalFeed = ({ post, user }) => {
  const { userId } = useAuthContext();
  dayjs.extend(relativeTime);

  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState<String | null>(null);

  useEffect(() => {
    if (user.image) {
      Storage.get(user.image).then(setImageUri);
    }
  }, [user]);

  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ flex: 1, marginHorizontal: 10 }}>
            {/* //Header */}
            <View style={styles.postHeaderContainer}>
              <View style={{marginRight: 10}}>
                <UserImage imageKey={user.image || undefined} width={40} />
              </View>
              

              <View style={styles.postHeaderNames}>
                <Pressable style={styles.username}>
                  <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{user.username}</Text>
                  <Text style={{ fontWeight: '200', fontSize: 11 }}>
                    {dayjs(user?.post?.createdAt).fromNow(true)} ago
                  </Text>
                </Pressable>
                <View></View>
              </View>
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.content}>{post.description}</Text>

          <View style={styles.iconContainer}>
            <Pressable style={{ flexDirection: 'row' }}>
              <AntDesign name={'hearto'} size={18} style={styles.icon} color={'#e0dcdc'} />
              <Text style={{ color: 'grey' }}>{}</Text>
            </Pressable>

            <Pressable style={{ flexDirection: 'row' }}>
              <Ionicons name="chatbubble-outline" size={18} style={styles.icon} color={'#e0dcdc'} />
              <Text style={{ color: 'grey' }}>{post.nofComments}</Text>
            </Pressable>

            <Pressable style={{ flexDirection: 'row' }}>
              <Feather name="send" size={18} style={styles.icon} color={'#e0dcdc'} />
            </Pressable>

            <Pressable style={{ flexDirection: 'row' }}>
              <Feather name="bookmark" size={18} color={'#e0dcdc'} />
            </Pressable>

            <View>
              <Image source={{ uri: post.User?.image }} style={{ width: 50, height: 50 }} />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  profilepicture: {
    marginTop: 10,
  },

  container: {
    flexDirection: 'column',
    borderBottomColor: '#EAEEEC',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#EAEEEC',
    marginTop: 10,
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },

  postHeaderContainer: {
    flexDirection: 'row',
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
  },

  postHeaderNames: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },

  username: {
    fontWeight: 'bold',
    flexDirection: 'column',
    fontSize: 22,
  },
  icon: {
    marginRight: 4,
  },
  content: {
    lineHeight: 22,
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },

  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
});

export default PersonalFeed;

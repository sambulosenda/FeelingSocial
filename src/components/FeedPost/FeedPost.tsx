import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  CreateLikeMutation,
  CreateLikeMutationVariables,
  DeleteLikeMutation,
  DeleteLikeMutationVariables,
  LikesForPostByUserQuery,
  LikesForPostByUserQueryVariables,
  Post,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from '../../API';
import Carousel from '../Carousel/Carousel';
import UserImage from '../UserImage/UserImage';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import PostMenu from './PostMenu';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useMutation, useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAuthContext } from '../../contexts/AuthContext';
import colors from '../../theme/colors';
import { createLike, deleteLike, likesForPostByUser, updatePost } from './queries';


// somewhere in your app
interface IFeedPost {
  post: Post;
}

const LeftSide = ({ post }: IFeedPost) => {
  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      <UserImage imageKey={post?.User?.image || undefined} width={40} />
    </View>
  );
};

const RightSide = ({ post }: IFeedPost) => {
  const navigation = useNavigation();

  dayjs.extend(relativeTime);
  const navigateToUser = () => {
    if (post.User) {
      navigation.navigate('UserProfile', { userId: post.User.id });
    }
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 10 }}>
      {/* //Header */}
      <View style={styles.postHeaderContainer}>
        <View style={styles.postHeaderNames}>
          <Pressable onPress={navigateToUser} style={styles.username}>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{post.User?.username}</Text>
            <Text style={{ fontWeight: '200', fontSize: 11 }}>
              {dayjs(post.createdAt).fromNow(true)} ago
            </Text>
          </Pressable>
          <View>
            <PostMenu post={post} />
          </View>
        </View>
      </View>
    </View>
  );
};

const FeedPost = ({ post }: IFeedPost) => {
  const { userId } = useAuthContext();


  const { data: usersLikeData } = useQuery<
    LikesForPostByUserQuery,
    LikesForPostByUserQueryVariables
  >(likesForPostByUser, { variables: { postID: post.id, userID: { eq: userId } } });

  console.log(usersLikeData);

  const userLike = (usersLikeData?.likesForPostByUser?.items || []).filter(
    (like) => !like?._deleted
  )?.[0];
  const postLikes = post.Likes?.items.filter((like) => !like?._deleted) || [];

  const [doCreateLike] = useMutation<CreateLikeMutation, CreateLikeMutationVariables>(createLike, {
    variables: { input: { userID: userId, postID: post.id } },
    refetchQueries: ['LikesForPostByUser'],
  });

  const [doDeleteLike] = useMutation<DeleteLikeMutation, DeleteLikeMutationVariables>(deleteLike, {
    refetchQueries: ['LikesForPostByUser'],
  });
  const [doUpdatePost] = useMutation<UpdatePostMutation, UpdatePostMutationVariables>(updatePost);

  const incrementNofLikes = (amount: 1 | -1) => {
    doUpdatePost({
      variables: {
        input: {
          id: post.id,
          _version: post._version,
          nofLikes: post.nofLikes + amount,
        },
      },
    });
  };

  const likePress = () => {
    if (userLike) {
      doDeleteLike({ variables: { input: { id: userLike.id, _version: userLike._version } } });
      incrementNofLikes(-1);
    } else {
      doCreateLike();
      incrementNofLikes(1);
    }
  };

  const navigation = useNavigation();

  const navigateToLikesPage = () => {
    navigation.navigate('LikesScreen', { id: post.id });
  };

  const navigateToComments = () => {
    navigation.navigate('CommentScreen', { postId: post.id });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <LeftSide post={post} />
          <RightSide post={post} />
        </View>

        <View>
          <Text style={styles.content}>{post.description}</Text>

          <View style={styles.iconContainer}>
            <Pressable style={{ flexDirection: 'row' }} onPress={likePress}>
              <AntDesign
                name={userLike ? 'heart' : 'hearto'}
                size={18}
                style={styles.icon}
                color={userLike ? colors.accent : '#e0dcdc'}
              />
              <Text style={{ color: 'grey' }}>{post.nofLikes}</Text>
            </Pressable>

            <Pressable style={{ flexDirection: 'row' }} onPress={navigateToComments}>
              <Ionicons name="chatbubble-outline" size={18} style={styles.icon} color={'#e0dcdc'} />
              <Text style={{ color: 'grey' }}>{post.nofComments}</Text>
            </Pressable>

            <Pressable style={{ flexDirection: 'row' }} onPress={navigateToComments}>
              <Feather name="send" size={18} style={styles.icon} color={'#e0dcdc'} />
            </Pressable>

            <Pressable style={{ flexDirection: 'row' }} onPress={navigateToComments}>
              <Feather name="bookmark" size={18} color={'#e0dcdc'} />
            </Pressable>
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
    paddingBottom: 10,
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

export default FeedPost;

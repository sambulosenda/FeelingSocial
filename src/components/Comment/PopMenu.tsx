import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo';
import { DeleteCommentMutation, DeleteCommentMutationVariables, DeletePostMutation, Comment } from '../../API';
import { useAuthContext } from '../../contexts/AuthContext';
import { BottomTabNavigatorParamList, FeedNavigationProp } from '../../types/navigation';
import { deleteComment } from './quries';

interface ICommentMenu {
  comment: Comment;
}

const CommentMenu = ({ comment }: ICommentMenu) => {
  const [DeleteCommentMutation] = useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(
    deleteComment,
    { variables: { input: { id: comment.id, _version: comment._version } } }
  );

  const navigation = useNavigation<BottomTabNavigatorParamList>()
  const { userId } = useAuthContext();
  const isMyComment = userId === comment.userID;

  const startDeletingPost = async () => {
    const response = await DeleteCommentMutation();
    console.log(response);
  };

  const onDeleteOptionPressed = () => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this comment?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            startDeletingPost();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const onEditOptionPressed = () => {
    console.log('delete option pressed');
    navigation.navigate('UpdatePost', {id: post.id})
  };

  return (
    <Menu renderer={renderers.SlideInMenu} style={styles.threeDots}>
      <MenuTrigger>
        <Entypo name="dots-three-horizontal" size={16} />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={() => Alert.alert(`Reporting`)}>
          <Text style={styles.optionText}>Report</Text>
        </MenuOption>

        {isMyComment && (
          <>
            <MenuOption onSelect={onDeleteOptionPressed}>
              <Text style={[styles.optionText, { color: 'red' }]}>Delete</Text>
            </MenuOption>
            <MenuOption onSelect={onEditOptionPressed}>
              <Text style={styles.optionText}> Edit</Text>
            </MenuOption>
          </>
        )}
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  threeDots: {
  },
  optionText: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
  },
});

export default CommentMenu;

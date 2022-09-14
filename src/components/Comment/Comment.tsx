import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Comment as CommentType } from '../../API';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import UserImage from '../UserImage/UserImage';
import PostMenu from './PopMenu';
interface ICommentProps {
  comment: CommentType;
}

const Comment = ({ comment }: ICommentProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const likePress = () => {
    setIsLiked((existingValue) => !existingValue);
  };

  return (
    <View style={styles.comment}>
      <UserImage imageKey={comment?.User?.image || undefined} width={40} />

      <View style={styles.middleColumn}>
        <Text style={styles.bold}>{comment.User?.username}</Text>
        <Text style={styles.commentText}>
        <Text style={styles.bold}></Text> {comment.comment}</Text>
        <PostMenu />

        <View style={styles.footer}>
          <Text style={styles.footerText}>2 days ago</Text>
          <Text style={styles.footerText}>4 likes</Text>
          <Text style={styles.footerText}>Reply</Text>
        </View>
      </View>

      <Pressable onPress={likePress}>
        <AntDesign
          name={isLiked ? 'heart' : 'hearto'}
          size={16}
          style={styles.icon}
          color={colors.black}
        />
      </Pressable>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bold: {
    fontWeight: fonts.weight.bold,
  },
  commentText: {
    color: colors.black,
    lineHeight: 18,
    marginHorizontal: 1
  },
  icon: {
    marginHorizontal: 5,
  },
  middleColumn: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  footerText: {
    marginHorizontal: 5,
  },
  new: {
    backgroundColor: colors.primary,
    color: colors.white,
    paddingHorizontal: 5,
    marginRight: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },

  text: {
    color: colors.black,
    lineHeight: 18,
  },
  avatar: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 25,
    marginHorizontal: 10,
  },
});
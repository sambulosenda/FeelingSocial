import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import useCommentsService from '../../services/CommentService/CommentService';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

interface IInput {
  postId: string
}

const Input = ({ postId }: IInput) => {
  const [newComment, setNewComment] = useState('');
  const { onCreateComment } = useCommentsService(postId)

  const onPost = async () => {
    onCreateComment(newComment)
    setNewComment('');
  };

  return (
    <View style={styles.root}>
      <Image
        source={{
          uri: 'https://i.pravatar.cc/300',
        }}
        style={styles.image}
      />
      <TextInput
        value={newComment}
        onChangeText={setNewComment}
        placeholder="Write your comment..."
        style={styles.input}
        multiline
      />

      <Text onPress={onPost} style={styles.button}>
        POST
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    padding: 5,
    borderTopWidth: 1,
    borderColor: '#ccc',
    alignItems: 'flex-end',
  },
  image: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 20,
  },
  input: {
    flex: 1,

    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,

    paddingVertical: 5,
    paddingRight: 50,
    paddingHorizontal: 10,
    marginLeft: 5,
  },
  button: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    fontSize: 15,
    fontWeight: fonts.weight.full,
    color: colors.primary,
  },
});

export default Input;

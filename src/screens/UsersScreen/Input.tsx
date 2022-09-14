import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { CreateCommentMutation, CreateCommentMutationVariables } from '../../API';
import { useAuthContext } from '../../contexts/AuthContext';
import useCommentsService from '../../services/CommentService/CommentService';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

interface IInput {
  postId: string
}

const Input = ({ postId }: IInput) => {
  const [newComment, setNewComment] = useState('');

  return (
    <View style={styles.root}>
   
      <TextInput
        value={newComment}
        onChangeText={setNewComment}
        placeholder="Search user"
        style={styles.input}
        multiline
      />

      <Text  style={styles.button}>
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

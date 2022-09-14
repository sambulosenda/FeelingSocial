import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Comment from '../../components/Comment/Comment';
import Input from './Input';
import { useRoute } from '@react-navigation/native';
import { CommentsRouteProp } from '../../types/navigation';
import { CommentsByPostQuery, CommentsByPostQueryVariables } from '../../API';
import { useQuery } from '@apollo/client';
import { commentsByPost } from './queries';
import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const CommentsScreen = () => {
  const route = useRoute<CommentsRouteProp>();
  const {postId} = route.params;

  const insets = useSafeAreaInsets()

  const {data, loading, error, fetchMore} = useQuery<
    CommentsByPostQuery,
    CommentsByPostQueryVariables
  >(commentsByPost, {
    variables: {
      postID: postId,
    },
  });

  const comments = data?.commentsByPost?.items.filter(comment => !comment?._deleted) || []

  if(loading) {
    return <ActivityIndicator />
}

if (error) {
  return (
    <ApiErrorMessage title='Error Fetching comment' message={error.message} />
  )
}
  
  return (
    <View style={{flex: 1,
      paddingBottom: insets.bottom,}}>
      <FlatList
        data={comments}
        renderItem={({ item }) => <Comment comment={item} includeDetails />}
        ListEmptyComponent = {() => (
          <Text>No comments. Be the first to add a comment</Text>
        )}
        style={{ padding: 10 }}
      />
      <Input postId={postId} />
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({});

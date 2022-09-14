import { useMutation, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  GetPostQuery,
  GetPostQueryVariables,
  UpdatePostMutation,
  UpdatePostMutationVariables
} from '../../API';
import { SafeAreaView } from 'react-native-safe-area-context';

import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage';
import { useAuthContext } from '../../contexts/AuthContext';
import { UpdatePostRouteProp } from '../../types/navigation';
import { getPost, updatePost } from './queries';


const UpdatePostScreen = () => {

  const [description, setDescription] = useState('');
  const { userId } = useAuthContext();

  const navigation = useNavigation();

  const route = useRoute<UpdatePostRouteProp>();
  const { id } = route.params;
  const { data, loading, error } = useQuery<GetPostQuery, GetPostQueryVariables>(getPost, {
    variables: { id },
  });

  const [doUpdatePost, { error: updateError, data: updateData }] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost);

  const post = data?.getPost;

  useEffect(() => {
    if (post) {
      setDescription(post.description || '');
    }
  }, [post]);

  useEffect(() => {
    if (updateData) {
      navigation.goBack();
    }
  }, [updateData, navigation])

  if (error || updateError) {
    return (
      <ApiErrorMessage
        title="failed to fetch the post"
        message={error?.message || updateError?.message}
      />
    );
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const submit = async () => {
    if (!post) {
      return;
    }
    doUpdatePost({ variables: { input: { id: post.id, _version: post._version, description } } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <AntDesign name="close" onPress={() => navigation.goBack()} size={30} color={"black"} />
        <TouchableOpacity style={styles.button} onPress={submit}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 10 }}>
        <TextInput
          value={description}
          onChangeText={(value) => setDescription(value)}
          multiline={true}
          maxLength={100}
          style={styles.postInput}          placeholder={'What is happening in your area'}
        />
      </View>

      <Text style={{ paddingTop: 30 }}>Character Left ：{description.length === null ? 0 : description.length}/100</Text>

    </SafeAreaView>
  )
}

export default UpdatePostScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 15,

  },
  postInput: {
    fontSize: 20,

  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: "#4c38ca",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold'
  }
})
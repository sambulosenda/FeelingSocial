import { useMutation } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { CreatePostMutation, CreatePostMutationVariables } from '../../API';
import { useAuthContext } from '../../contexts/AuthContext';
import { CreateRouteProp } from '../../types/navigation';
import { createPost } from './quieries';

const NewTweet = () => {
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const { userId } = useAuthContext();
  const [doCreatePost] = useMutation<CreatePostMutation, CreatePostMutationVariables>(createPost);
  const route = useRoute<CreateRouteProp>();

  const submit = async () => {
    try {
      const response = await doCreatePost({
        variables: {
          input: {
            type: 'POST',
            description,
            nofComments: 0,
            nofLikes: 0,
            userID: userId,
          },
        },
      });

      navigation.popToTop();

      //Navigate to home screen after submit
      //ToD
    } catch (e) {
      Alert.alert('Error uploading post', (e as Error).message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <AntDesign name="close" onPress={() => navigation.goBack()} size={30} color={'black'} />
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
          style={styles.postInput}
          placeholder={'What is happening in your area'}
        />
      </View>

      <Text style={{ paddingTop: 30 }}>
        Characters Left ：{description.length === null ? 0 : description.length}/100
      </Text>
    </SafeAreaView>
  );
};

export default NewTweet;

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
    backgroundColor: '#4c38ca',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

import { Image } from 'react-native';
import { HomeStackNavigatorParamList } from '../types/navigation';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import UpdatePostScreen from '../screens/UpdatePostScreen/UpdatePostScreen';
import PostLikesScreen from '../screens/PostLikesScreen/PostLikesScreen';



const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={HomeScreen} />
      <Stack.Screen name="UserProfile" component={ProfileScreen} options={{ title: 'Profile' }} />
      <Stack.Screen
        name="UpdatePost"
        component={UpdatePostScreen}
        options={{ title: 'Update Post' }}
      />
      <Stack.Screen
        name="PostLikes"
        component={PostLikesScreen}
        options={{ title: 'Post Likes' }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;

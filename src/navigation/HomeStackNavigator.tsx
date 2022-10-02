import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import PostLikesScreen from '../screens/PostLikesScreen/PostLikesScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import UpdatePostScreen from '../screens/UpdatePostScreen/UpdatePostScreen';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={HomeScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image style={{ width: 140, height: 35 }} source={require('./logo.png')} />
          ),
        }}
      />
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

const HeaderTitle = () => {
  return <Image source={'../assets/images/logo.png'} style={{ width: 150, height: 40 }} />;
};

export default HomeStackNavigator;

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UserFollowersScreen from '../screens/UserFollow/UserFollowersScreen';
import UserFollowingsScreen from '../screens/UserFollow/UserFollowingsScreen';
import colors from '../theme/colors';

const Tab = createMaterialTopTabNavigator();

const UserFollowTabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: colors.primary },
      }}
    >
      <Tab.Screen name="Followers" component={UserFollowersScreen} />
      <Tab.Screen name="Following" component={UserFollowingsScreen} />
    </Tab.Navigator>
  );
};

export default UserFollowTabNavigator;

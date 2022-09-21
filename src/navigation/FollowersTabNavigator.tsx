import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UserFollowers from '../screens/UserFollowers/UserFollowers';

import colors from '../theme/colors';

const Tab = createMaterialTopTabNavigator();

const FollowersTabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { paddingTop: insets.top },
        tabBarIndicatorStyle: { backgroundColor: colors.primary },
      }}
    >
      <Tab.Screen name="Followers" component={UserFollowers} />
      <Tab.Screen name="Following" component={UserFollowers} />
    </Tab.Navigator>
  );
};

export default FollowersTabNavigator;

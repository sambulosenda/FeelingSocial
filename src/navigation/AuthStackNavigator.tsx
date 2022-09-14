import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConfirmEmailScreen from '../screens/Auth/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/Auth/NewPasswordScreen';
import SignInScreen from '../screens/Auth/SignInScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Sign in" component={SignInScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Sign up" component={SignUpScreen} />
      <Stack.Screen name="Confirm email" component={ConfirmEmailScreen} />
      <Stack.Screen name="Forgot password" component={ForgotPasswordScreen} />
      <Stack.Screen name="New password" component={NewPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;

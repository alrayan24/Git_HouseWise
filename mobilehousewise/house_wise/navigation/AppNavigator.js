import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '../auth/AuthContext';

import OpenApp from '../components/OpenApp';
import ForgotPasswordScreen from '../components/ForgotPasswordScreen';
import LoginScreen from '../components/LoginScreen';
import SignUpScreen from '../components/SignUpScreen';
import BuildScreen from '../components/BuildScreen';
import OptionsBuild from '../components/OptionsBuild';
import HouseDimension from '../components/HouseDimension';
import CrScreen from '../components/CrScreen';
import ProfileScreen from '../components/ProfileScreen';
import Dashboard from '../components/Dashboard';
import MenuDashboard from '../components/MenuDashboard';
import RoomScreen from '../components/RoomScreen';
import FeedbackScreen from '../components/FeedBackScreen';
import EstimateScreen from '../components/EstimateScreen';
import BuildRecapScreen from '../components/BuildRecapScreen';
import RoofScreen from '../components/RoofScreen';


const Stack = createStackNavigator();


const AppNavigator = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='OpenApp'>
            <Stack.Screen name="OpenApp" component={OpenApp} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="Sign up" component={SignUpScreen} />
            <Stack.Screen name="MenuDashboard" component={MenuDashboard} />
            <Stack.Screen name="Build" component={BuildScreen} />
            <Stack.Screen name="Options" component={OptionsBuild} />
            <Stack.Screen name="HouseDimension" component={HouseDimension} />
            <Stack.Screen name="CrScreen" component={CrScreen} />
            <Stack.Screen name="BuildRecapScreen" component={BuildRecapScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="FeedBack" component={FeedbackScreen} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="RoomScreen" component={RoomScreen} />
            <Stack.Screen name="RoofScreen" component={RoofScreen} />
            <Stack.Screen name="Estimate" component={EstimateScreen} />
          </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default AppNavigator;

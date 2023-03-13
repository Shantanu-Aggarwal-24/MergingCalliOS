import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NewMessageScreen from "../Screens/NewMessageScreen";
import InboxScreen from "../Screens/InboxScreen";
import InboxDetailsScreen from "../Screens/InboxDetailsScreen";
import WelcomeScreen from "../Screens/WelcomeScreen";
import Settings from "../Screens/Settings";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import Profile from "../Screens/Profile";
import ContactUs from "../Screens/ContactUs";

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen
      name="WelcomeScreen"
      component={WelcomeScreen}
      // options={{ title: 'forLogout' }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{ title: "My Account" }}
    />
    {/* <Stack.Screen name='LoginScreen' component={LoginScreen}/>
        <Stack.Screen name='RegisterScreen' component={RegisterScreen}/> */}
    <Stack.Screen
      name="ContactUs"
      component={ContactUs}
      options={{ title: "Contact Us" }}
    />
  </Stack.Navigator>
);

const SettingsNavigator = () => {
  return <StackNavigator />;
};

export default SettingsNavigator;

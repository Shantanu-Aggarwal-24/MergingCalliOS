import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../Screens/WelcomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';


const Stack = createStackNavigator();
const WelcomeNavigator = (props) =>{
  
    return (
      <Stack.Navigator
        mode="modal" 
        screenOptions={{
          headerShown : false,
        }}
      >
        <Stack.Screen name="WelcomeScreen" component = {WelcomeScreen} />
        <Stack.Screen name="LoginScreen" >
          {() => <LoginScreen onPress={props.onPress} />}
        </Stack.Screen> 
        <Stack.Screen name="RegisterScreen">
          {() => <RegisterScreen onPress={props.onPress} />}
        </Stack.Screen> 
      </Stack.Navigator>
    ) 
}
export default WelcomeNavigator;
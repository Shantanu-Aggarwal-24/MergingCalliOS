import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';

import InboxNavigator from './InboxNavigator'
import DialerScreen from '../Screens/DialerScreen';
import SettingsNavigator from './SettingsNavigator';

// const Setting = () => (
//   <View style={{justifyContent: 'center', alignItems:'center', flex: 1}}>
//     <Text>Setting</Text>
//   </View>
// )
import RecentCall from '../Screens/RecentCallScreen';

const Tab = createBottomTabNavigator();
const BottomNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      activeTintColor: "#1970e2",
      inactiveTintColor: "#434547",
    }}
  >
    <Tab.Screen name="RecentCall" component={RecentCall}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Feather name="phone-call" size={size} color={color} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen name="DialerScreen" component={DialerScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="dialpad" size={size} color={color} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen name="Inbox" component={InboxNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="message-text" size={size} color={color} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen name="Setting" component={SettingsNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account-settings" size={size} color={color} />
        ),
        headerShown: false,

      }}
    />
  </Tab.Navigator>
)


export default BottomNavigator; 

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import NewMessageScreen from '../Screens/NewMessageScreen'
import InboxScreen from '../Screens/InboxScreen';
import InboxDetailsScreen from '../Screens/InboxDetailsScreen';

const Stack = createStackNavigator();
const StackNavigator = () => (
    <Stack.Navigator
        mode="modal"
    >
        <Stack.Screen name="InboxScreen" component={InboxScreen}
            options= {{ title: 'Inbox'}}
        />
        <Stack.Screen name="InboxDetailsScreen" component={InboxDetailsScreen}
            options ={ ({route}) => ({title : route.params.from})}
        />
        <Stack.Screen name="NewMessageScreen" component={NewMessageScreen}
            options = {{ title: 'Compose Message', 
            }}
        />
    </Stack.Navigator>
)

const InboxNavigator = () => {
    return (
        <StackNavigator />
    )
}

export default InboxNavigator;

import { NavigationContainer } from '@react-navigation/native';
import WelcomeNavigator from '../App/navigation/WelcomeNavigator';
import BottomNavigator from '../App/navigation/BottomNavigator';

import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Platform , StyleSheet, TextInput, Text} from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [isLogin , setIsLogin] = useState(false);

  
  const notificationListener = useRef();
  const responseListener = useRef();

  const navigationChangeHandler = () => {
    setIsLogin(true);
  }

  useEffect(() => {

    registerForPushNotificationsAsync().then(token => sendPushNotification(token));
    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // console.log(response);
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {});

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

//Navigation authentication part
  return (
        <NavigationContainer>
        { isLogin ? <BottomNavigator /> :
          <WelcomeNavigator onPress={navigationChangeHandler}/>
        }
      </NavigationContainer>
  );
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(token) {
    try{ 
      const payload = {
      deviceToken : token
      }
      fetch('https://2d9f-3-139-109-42.ngrok.io/api/deviceToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
        }).catch(err => console.log(err))
    } catch (error) {
    console.log("error while getting push token", error);
    }
}

async function registerForPushNotificationsAsync() {
  let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
  }
})

// +1 903 501 3305

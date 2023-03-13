import React, { useState } from "react";
import { StyleSheet, Text, View, } from "react-native";
import * as Yup from "yup";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from "../components/Button";
import { Form, FormField, SubmitButton } from "../components/forms/index";

import RegisterScreen from "./RegisterScreen";
import Screen from "../components/Screen";
import { getAllScheduledNotificationsAsync } from "expo-notifications";

import axios from 'axios';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().trim().email().label("Email"),
  password: Yup.string().required().trim().min(4).label("Password"),
});

function LoginScreen({ onPress }) {
    const [isSignup, setIsSignup] = useState(false);
    const baseUrl = ""
    const handleSignupPress = () => {
        setIsSignup(true);
    }
    const submitLogin = async (values) => {
      try {
        const payload = {
          password : values.password,
          email : values.email
        }
        const res = await axios.post(baseUrl+'api/auth/login',payload);
        const  {name, token} = res.data.user;
        console.log(name, token);
        if(token){
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('email', name);
          onPress();
        
            }
      } catch (error) {
        console.log("error from login",error.message)
      }
    }
  return (<>
      { isSignup ? <RegisterScreen onPress={onPress} /> : 
      <Screen style={styles.container}>
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => submitLogin(values)}
        validationSchema={validationSchema}
        >
        <Text style={styles.heading}>Account Login</Text>
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
          />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
          />
        <SubmitButton title="Login"/>
        <Button title="create account" onPress={handleSignupPress}/>
      </Form>
      </Screen>
      }
      </>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
      },
    heading : {
        fontSize: 25,
        fontWeight: "bold",
        alignSelf: "flex-start",
        color : "#4a4747"
  }
});

export default LoginScreen;

import React, {useState} from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms/index";
import Button from "../components/Button";
import LoginScreen from "./LoginScreen";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().trim().label("Name"),
  email: Yup.string().required().email().trim().label("Email"),
  password: Yup.string().required().trim().min(4).label("Password"),
  confirmPassword: Yup.string()
  .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  address : Yup.string().required().trim().label("Address"),
  messageLimit : Yup.string().required().label("Message Limit"),
  zip : Yup.string().required().trim().label("Zip Code"),
  country : Yup.string().required().trim().label("Country"),
  state : Yup.string().required().trim().label("State"),
  city: Yup.string().required().trim().label("City"),
});

function RegisterScreen({ onPress }) {
  const [isLogin, setIsLogin] = useState(false);
  const handleLoginPress = () => {
    setIsLogin(true);
  } 
  return ( <>
    { isLogin ? <LoginScreen onPress={onPress}/> : 
    <Screen style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
      >
      <Form
      initialValues={{ name: "", email: "", password: "",confirmPassword : "", 
      address : "", messageLimit:"", zip : "",country:"", state:"", city : ""
      }}
      onSubmit={(values) => onPress()}
      validationSchema={validationSchema}
      >
        <Text style={styles.heading}>Register</Text>
        <FormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
          />
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
          <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="confirmPassword"
          placeholder="Confirm Password"
          secureTextEntry
          />
          <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="home-city"
          name="address"
          placeholder="Address"
          />
          <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="home-city"
          name="city"
          placeholder="City"
          />
          <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="home-city"
          name="state"
          placeholder="State"
          />
          <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="home-city"
          name="country"
          placeholder="Country"
          
          />
          <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="home-city"
          name="zip"
          placeholder="Zip"Message limit
          />
          <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="message-text"
          name="messageLimit"
          placeholder="Message limit"
          />
        <SubmitButton title="Signup" />
        <Button title="Login" onPress={handleLoginPress}/>
      </Form>
      </ScrollView>
    </Screen>
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    overflow : "scroll"
  },
  heading : {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "flex-start",
    color : "#4a4747"
  },
});

export default RegisterScreen;

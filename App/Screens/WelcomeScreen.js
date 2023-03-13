import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";

import Button from "../components/Button";
import Screen from "../components/Screen";
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

function WelcomeScreen({ navigation }) {
  return (
    <Screen>
    <ImageBackground
      resizeMode="cover" 
      blurRadius={5}
      style={styles.background}
      source={require("../../assets/home-banner-bg2.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image resizeMode="contain" style={styles.logo} source={require("../../assets/logo.png")} />
        <Text style={styles.tagline}>With the power of Mergecall,
        you can now connect with your customers from 
        your desk or your Smartphone</Text>
      </View>
      <View style={styles.buttonsContainer}>
       <Button title="login" onPress={() => navigation.navigate("LoginScreen") }/>
       <Button title="signup" onPress={()=> navigation.navigate("RegisterScreen") }/>
      </View>
    </ImageBackground>
    </Screen>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 200,
    height:100,
  },
  logoContainer: {
    flex: 1,
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagline: {
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
    color : "#e6dcdc",
    lineHeight : 18
  },
  
});

export default WelcomeScreen;

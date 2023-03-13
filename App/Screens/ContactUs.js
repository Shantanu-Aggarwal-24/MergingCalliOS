import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Screen from "../components/Screen";
import AppButton from "../components/Button";
import { TouchableOpacity } from "react-native-gesture-handler";

const ContactUs = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phNumber, setPhNumber] = useState("");
  const [query, setQuery] = useState("");
  const baseUrl = ""

  const handleSubmit = async () => {
    if (firstName == "" || email == "" || phNumber == "" || query == "") {
      Alert.alert("All fields are Required!!");
    } else {
      try {
        const payload = {
          Source: "Mergecall",
          firstname: firstName,
          email: email,
          phoneno: phNumber,
          query: query,
        };
        const res = await axios.post(
          baseUrl+"/api/me/query",
          payload,
          {
            //   body: JSON.stringify(payload),
            headers: {
              "x-auth-token": await AsyncStorage.getItem("token"),
            },
          }
        );
        if (res.status == 200) {
          Alert.alert("Query has been sent successfully!!!");
          setFirstName("");
          setEmail("");
          setPhNumber("");
          setQuery("");
          //   console.log("Data is", res.data);
        } else {
          Alert.alert("Problem from Serverside");
          //   console.log("response is not good", res.status);
        }
      } catch (err) {
        console.log("error from querysubmit", err);
      }
    }
  };

  return (
    <Screen>
      <ScrollView>
        <View>
          <Text
            style={{ textAlign: "center", fontSize: 35, fontWeight: "bold" }}
          >
            MERGECALL
          </Text>
          <Text style={{ textAlign: "center", fontSize: 20, marginTop: 10 }}>
            We'd love to hear from you.
          </Text>
          <Text style={{ textAlign: "center", fontSize: 20, marginTop: 10 }}>
            Please fill in the form below so that we can get more insights of
            what you are looking
          </Text>
          <Text style={{ textAlign: "center", fontSize: 20 }}>
            for and we can take things from there!
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.inputHeading}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your First Name"
            onChangeText={(value) => setFirstName(value)}
            value={firstName}
            keyboardType="default"
          />

          <Text style={styles.inputHeading}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Email"
            onChangeText={(value) => setEmail(value)}
            value={email}
            keyboardType="default"
          />

          <Text style={styles.inputHeading}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Phone Number"
            onChangeText={(value) => setPhNumber(value)}
            value={phNumber}
            keyboardType="default"
          />

          <Text style={styles.inputHeading}>Your Query</Text>
          <TextInput
            multiline
            style={styles.input}
            placeholder="Enter your Query"
            onChangeText={(value) => setQuery(value)}
            value={query}
            keyboardType="default"
          />

          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: "#0000ff",
              width: "50%",
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              marginLeft:90,
              marginVertical:10
            }}
          >
            <Text
              style={{
                color: "#e6dcdc",
                fontSize: 15,
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 20,
            flex: 1,
            marginBottom: 30,
          }}
        >
          <Text style={{ color: "#0000ff", fontSize: 30, textAlign: "center" }}>
            Support
          </Text>

          <View style={{ display: "flex", flexDirection: "row" }}>
            <Image
              source={require("../../assets/phone_call.png")}
              style={{ height: 30, width: 30, marginLeft: 60 }}
            />
            <Text style={{ color: "#0000ff", fontSize: 25, marginLeft: 10 }}>
              +1 415-417-0410
            </Text>
          </View>

          <View
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Text style={{ marginTop: 20, fontSize: 20 }}>325 Front St W,</Text>
            <Text style={{ fontSize: 20 }}>Toronto, ON M5V 2Y1,</Text>
            <Text style={{ fontSize: 20 }}>Canada</Text>
          </View>

          <View
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Text style={{ marginTop: 20, fontSize: 20 }}>
              2035 Sunset Lake Rd SUITE B2,
            </Text>
            <Text style={{ fontSize: 20 }}>Newark,DE 19702,</Text>
            <Text style={{ fontSize: 20 }}>United States</Text>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 25,
  },
  inputHeading: {
    textAlign: "left",
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ContactUs;

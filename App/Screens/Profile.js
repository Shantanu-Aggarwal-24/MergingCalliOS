import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Screen from "../components/Screen";
import axios from "axios";

function Profile({ navigation }) {
  const [key, setKey] = useState(false);
  const [userData, setUserData] = useState({});
  const [fund, setFund] = useState(0);
  const [plan, setPlan] = useState("");
  const num = 1;
  const baseUrl = ""

  useEffect(() => {
    getProfile();
    getFund();
    getPlan();
  }, [num]);

  const getProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("token for profile", token);
      const res = await axios.get(baseUrl+"api/me/user", {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
      // console.log(res.data.data)
      setUserData(res.data.data);
    } catch (err) {
      console.log("error from profile ", err);
    }
  };

  const getFund = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("token for  fund in profile", token);
      const res = await axios.get(
        baseUrl+
        "api/payment/paymentdata",
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setFund((Math.round(res.data.data * 100) / 100).toFixed(2));
    } catch (er) {
      console.log("error from fund", er);
    }
  };

  const getPlan = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("token for plan", token);
      const res = await axios.get(
        baseUrl+
        "/api/payment/getplans",
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      // console.log(res.data.data)
      if (res.data.data.plan == "price_1Jjj2aGVMLEvSdQH0sXc4MRe") {
        setPlan("Premium");
      } else if (res.data.data.plan == "price_1Jjj7KGVMLEvSdQHq9ovpKMr") {
        setPlan("Premium Plus");
      } else {
        setPlan("No Active Plan");
      }
    } catch (e) {
      console.log("error from plan in profile", e);
    }
  };

  return (
    <Screen>
      <View style={{ marginBottom: 20, marginTop: 10 }}>
        <Text style={styles.nameHeading}>{userData.name}</Text>
      </View>
      <View style={styles.detailsView}>
        <Text style={styles.accProperty}>Email:</Text>
        <Text style={styles.accPropertyValue}>{userData.email}</Text>
      </View>
      <View style={styles.detailsView}>
        <Text style={styles.accProperty}>Fund:</Text>
        <Text style={styles.accPropertyValue}>$ {fund}</Text>
      </View>
      <View style={styles.detailsView}>
        <Text style={styles.accProperty}>Plan:</Text>
        <Text style={styles.accPropertyValue}>{plan}</Text>
      </View>
      <View style={styles.detailsView}>
        <Text style={styles.accProperty}>Key:</Text>
        {key == true ? (
          <TouchableOpacity onPress={() => setKey(false)}>
            <Text style={styles.accPropertyValue}>Close </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setKey(true)}>
            <Text style={styles.accPropertyValue}>Click here to see </Text>
          </TouchableOpacity>
        )}
      </View>
      {key == true ? (
        <View style={{ backgroundColor: "white", borderRadius: 20 }}>
          <Text>{userData.secrete}</Text>
        </View>
      ) : (
        <></>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  nameHeading: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  detailsView: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
  },
  accProperty: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  accPropertyValue: {
    fontSize: 20,
    marginLeft: 10,
  },
});

export default Profile;

import { View, Text, Image, Platform } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import PhoneInput from "react-native-phone-number-input";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNCallKeep from "react-native-callkeep";
import axios from "axios";
import {
  EventType,
  RNTwilioPhone,
  twilioPhoneEmitter,
} from "react-native-twilio-phone";
// import CountryPicker from '@islacel/react-native-country-picker-modal'
// import CountryPicker from "react-native-country-picker-modal";
import Screen from "../components/Screen";
import CountryCodeList from "../components/CountryCodeList";

// const getToken = async () => {
//   const token = await AsyncStorage.getItem("token");
//   console.log("gettoken function ka token is", token);
//   return token;
// };
const DialerScreen = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState();
  const [user, setUser] = useState({});
  const [phNumber, setPhNumber] = useState("");
  const [callInProgress, setCallInProgress] = useState(false);
  const phoneInput = useRef(null);
  const baseUrl = ""
  // const tok = getToken();

  // useEffect(() => {
  //   getUserData();
  // }, []);

  useEffect(() => {
    getUserData();
    return RNTwilioPhone.initializeCallKeep(
      callKeepOptions,
      fetchAccessToken,
      options
    );
  }, []);

  const getUserData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("the device storage  token from dialer screen is ", token);
      const res = await fetch(baseUrl+"/api/me/user", {
        method: "GET",
        headers: {
          // "Content-Type": "application/json",
          "x-auth-token": token,
        },
      })
        .then((rs) => rs.json())
        .then((dt) => {
          setUser(dt.data);
          console.log("USER DATA IS", JSON.stringify(dt, null, "\t"));
        });
      // setUser(res.data.data);
    } catch (err) {
      console.log("error from dial screen getting user data is", err);
    }
  };

  const callKeepOptions = {
    ios: {
      appName: "TwilioPhone Example",
      supportsVideo: false,
    },
    android: {
      alertTitle: "Permissions required",
      alertDescription: "This application needs to access your phone accounts",
      cancelButton: "Cancel",
      okButton: "OK",
      additionalPermissions: [],
      // Required to get audio in background when using Android 11
      foregroundService: {
        channelId: "com.example.reactnativetwiliophone",
        channelName: "Foreground service for my app",
        notificationTitle: "My app is running on background",
      },
    },
  };

  const fetchAccessToken = async () => {
    try {
      console.log("entering inside the fetchaccess token");
      const tok = await AsyncStorage.getItem("token");
      // console.log("the token  from working fetch device token is", tok);
      console.log("User id is", user._id);
      const response = await axios.get(
        baseUrl+
        "/api/deive-token?identity=" +
          user._id +
          "&os=" +
          Platform.OS,
        {
          // method:"GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": tok,
          },
        }
      );
      const accessToken = await response.data.token;
      // console.log(
      //   "the device token from backend through respionse is ",
      //   response.data.token
      // );
      console.log("RESPONSE OF ACCESS TOKEN FROM BACKGROUND IS ", accessToken);
      return accessToken;
    } catch (er) {
      console.log("error from fetchaccesstoken is", er);
    }
  };
  const options = {
    requestPermissionsOnInit: true,
  };

  useEffect(() => {
    const subscriptions = [
      twilioPhoneEmitter.addListener(EventType.CallConnected, () => {
        setCallInProgress(true);
      }),
      twilioPhoneEmitter.addListener(EventType.CallDisconnected, () => {
        setCallInProgress(RNTwilioPhone.calls.length > 0);
      }),
      twilioPhoneEmitter.addListener(
        EventType.CallDisconnectedError,
        (data) => {
          console.log(data);
          setCallInProgress(RNTwilioPhone.calls.length > 0);
        }
      ),
    ];

    return () => {
      subscriptions.map((subscription) => {
        subscription.remove();
      });
    };
  }, []);

  function hangup() {
    RNCallKeep.endAllCalls();
    setCallInProgress(false)
  }

  async function unregister() {
    try {
      await RNTwilioPhone.unregister();
    } catch (e) {
      console.log(e);
    }
  }

  const cdt = [
    { key: "1", value: "Developer" },
    { key: "2", value: "Test" },
  ];

  const ndt = [
    { key: "1", value: "New test" },
    { key: "2", value: "March 2023" },
    { key: "3", value: "Fund Check" },
    { key: "4", value: "New test number" },
  ];

  const countrydt = CountryCodeList;

  const handleCall = async () => {
    if (phNumber === "") {
      return;
    }

    try {
      console.log("to", phNumber);
      await RNTwilioPhone.startCall(phNumber);
      console.log("to1", phNumber);
      console.log("call ", RNTwilioPhone.calls);
    } catch (e) {
      console.log(e);
      setCallInProgress(false);
    }
  };

  const handleMessage = () => {};

  return (
    <Screen>
      <View
        style={{
          //   justifyContent: "flex-start",
          flexDirection: "row",
          marginLeft: 20,
          marginRight: 20,
          backgroundColor: "#fff",
          paddingBottom: 30,
          borderRadius: 10,
        }}
      >
        <View style={{ flexDirection: "column", marginLeft: 20 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginTop: 15,
              marginBottom: 15,
            }}
          >
            Select Company
          </Text>
          <SelectList
            setSelected={(val) => setSelectedCompany(val)}
            data={cdt}
            save="value"
          />
        </View>

        <View style={{ flexDirection: "column", marginLeft: 20 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginTop: 15,
              marginBottom: 15,
            }}
          >
            From Number
          </Text>
          <SelectList
            setSelected={(val) => setSelectedNumber(val)}
            data={ndt}
            save="value"
            // maxHeight={300}
          />
        </View>
      </View>

      <View
        style={{
          marginTop: 20,
          padding: 20,
          backgroundColor: "#fff",
          marginLeft: 20,
          marginRight: 20,
          borderRadius: 10,
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 30, fontWeight: "700" }}>
          Make a Call
        </Text>

        <PhoneInput
          containerStyle={{ marginTop: 15, marginBottom: 15 }}
          ref={phoneInput}
          defaultValue={phNumber}
          defaultCode="US"
          onChangeFormattedText={(text) => setPhNumber(text)}
          value={phNumber}
          withShadow
          autoFocus
        />

        <TouchableOpacity
          onPress={handleCall}
          style={{
            backgroundColor: "#0bf957",
            width: "50%",
            borderRadius: 15,
            // justifyContent: "flex-start",
            alignItems: "center",
            padding: 10,
            marginLeft: 90,
            marginVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{ height: 30, width: 30, marginRight: 10 }}
              source={require("../../assets/phone_call.png")}
            />
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Call
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleMessage}
          style={{
            backgroundColor: "#00008b",
            width: "50%",
            borderRadius: 15,
            // justifyContent: "flex-start",
            alignItems: "center",
            padding: 10,
            // marginLeft: 90,
            marginVertical: 10,
            marginLeft: 90,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{ height: 30, width: 30, marginRight: 10 }}
              source={require("../../assets/msg_envelope.png")}
            />
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Message
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default DialerScreen;
